import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { env } from './config/env';
import enquiryRoutes from './routes/enquiryRoutes';
import blogRoutes from './routes/blogRoutes';
import productRoutes from './routes/productRoutes';
import projectRoutes from './routes/projectRoutes';
import galleryRoutes from './routes/galleryRoutes';
import videoRoutes from './routes/videoRoutes';
import settingsRoutes from './routes/settingsRoutes';
import faqRoutes from './routes/faqRoutes';
import deliveryLocationRoutes from './routes/deliveryLocationRoutes';
import userRoutes from './routes/userRoutes';
import reviewRoutes from './routes/reviewRoutes';
import dashboardRoutes from './routes/dashboardRoutes';
import { errorHandler } from './middleware/errorHandler';

export const createApp = (): Application => {
  const app = express();

  // Security Middleware
  app.use(helmet());

  // CORS Middleware - allows localhost (dev) and live production domain
  const allowedOrigins = [
    env.FRONTEND_URL,
    // Local development
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:5174',
    'http://127.0.0.1:5174',
    'http://localhost:3000',
    // Live production domains
    'https://jupitergroups.in',
    'https://www.jupitergroups.in',
    'http://jupitergroups.in',
    'http://www.jupitergroups.in',
  ];

  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, curl, Postman, server-side calls)
        if (!origin) return callback(null, true);
        if (
          allowedOrigins.indexOf(origin) !== -1 ||
          env.NODE_ENV === 'development' ||
          process.env.NODE_ENV === 'development' ||
          // Allow any local IP (192.168.x.x, 10.x.x.x, 172.16-31.x.x, localhost, 127.0.0.1) on any port
          /^https?:\/\/(localhost|127\.0\.0\.1|192\.168\.\d+\.\d+|10\.\d+\.\d+\.\d+|172\.(1[6-9]|2\d|3[0-1])\.\d+\.\d+)(:\d+)?$/.test(origin) ||
          // Allow any subdomain of jupitergroups.in
          /https?:\/\/([\w-]+\.)?jupitergroups\.in(:\d+)?$/.test(origin)
        ) {
          return callback(null, true);
        }
        console.warn(`[CORS] Blocked origin: ${origin}`);
        return callback(new Error('Not allowed by CORS'));
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    })
  );

  // Rate Limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200, // limit each IP to 200 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      message: 'Too many requests from this IP, please try again after 15 minutes',
    },
  });
  app.use('/api', limiter);

  // Body Parser (allow up to 50MB for rich product specs, gallery photos, and base64 images)
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // Root route — API directory
  app.get('/', (req: Request, res: Response) => {
    res.json({
      message: 'Welcome to Jupiter Industries API',
      version: '2.0.0',
      endpoints: {
        health: '/api/health',
        enquiries: '/api/enquiries',
        products: '/api/products',
        projects: '/api/projects',
        gallery: '/api/gallery',
        videos: '/api/videos',
        blogs: '/api/blogs',
        faqs: '/api/faqs',
        reviews: '/api/reviews',
        settings: '/api/settings',
        users: '/api/users',
        deliveryLocations: '/api/delivery-locations',
        dashboard: '/api/dashboard/stats',
      },
    });
  });

  // Health check endpoint
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({ success: true, status: 'OK', timestamp: new Date().toISOString() });
  });

  // Core content routes
  app.use('/api', enquiryRoutes);
  app.use('/api', productRoutes);
  app.use('/api', projectRoutes);
  app.use('/api', galleryRoutes);
  app.use('/api', videoRoutes);
  app.use('/api', blogRoutes);

  // Admin & feature routes
  app.use('/api', settingsRoutes);
  app.use('/api', faqRoutes);
  app.use('/api', deliveryLocationRoutes);
  app.use('/api', userRoutes);
  app.use('/api', reviewRoutes);
  app.use('/api', dashboardRoutes);

  // 404 Handler
  app.use((req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      message: `Endpoint ${req.method} ${req.originalUrl} not found`,
    });
  });

  // Global Error Handler
  app.use(errorHandler);

  return app;
};

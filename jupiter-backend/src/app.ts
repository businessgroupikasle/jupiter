import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import fs from 'fs';
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
import authRoutes from './routes/authRoutes';
import uploadRoutes from './routes/uploadRoutes';
import { errorHandler } from './middleware/errorHandler';

export const createApp = (): Application => {
  const app = express();

  // Security Middleware
  app.use(helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' }
  }));

  // CORS Middleware - enables CORS only for the local frontend URL http://localhost:3026
  const allowedOrigins = [
    env.FRONTEND_URL,
    'http://localhost:3026',
    'http://127.0.0.1:3026',
  ];

  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, curl, Postman, server-side calls)
        if (!origin) return callback(null, true);
        if (
          allowedOrigins.indexOf(origin) !== -1 ||
          /^http:\/\/(localhost|127\.0\.0\.1|172\.\d+\.\d+\.\d+|192\.168\.\d+\.\d+)(:\d+)?$/.test(origin)
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
    max: 1000, // allow up to 1000 requests per windowMs for comprehensive tests & dashboards
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

  // Static uploads directory
  const uploadsDir = path.join(process.cwd(), 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  app.use('/uploads', express.static(uploadsDir));

  // Root route — API directory
  app.get('/', (req: Request, res: Response) => {
    res.json({
      message: 'Welcome to Jupiter Industries API',
      version: '2.0.0',
      endpoints: {
        health: '/api/health',
        auth: '/api/auth/login',
        forgotPassword: '/api/auth/forgot-password',
        resetPassword: '/api/auth/reset-password',
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
        upload: '/api/upload',
      },
    });
  });

  // Health check endpoint
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({ success: true, status: 'OK', timestamp: new Date().toISOString() });
  });

  // Core content routes
  app.use('/api', authRoutes);
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
  app.use('/api', uploadRoutes);

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

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
import { errorHandler } from './middleware/errorHandler';

export const createApp = (): Application => {
  const app = express();

  // Security Middleware
  app.use(helmet());

  // CORS Middleware
  const allowedOrigins = [
    env.FRONTEND_URL,
    'http://localhost:3026',
    'http://127.0.0.1:3026',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:5174',
    'http://127.0.0.1:5174'
  ];
  app.use(
    cors({
      origin: (origin, callback) => {
        // allow requests with no origin (like mobile apps, curl, postman)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
          return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
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

  // Body Parser
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Root redirect
  app.get('/', (req: Request, res: Response) => {
    res.json({
      message: 'Welcome to Jupiter Industries API',
      health: '/api/health',
      enquiries: '/api/enquiries',
      products: '/api/products',
      projects: '/api/projects',
      gallery: '/api/gallery',
      videos: '/api/videos',
      blogs: '/api/blogs',
    });
  });

  // Mount API Routes
  app.use('/api', enquiryRoutes);
  app.use('/api', productRoutes);
  app.use('/api', projectRoutes);
  app.use('/api', galleryRoutes);
  app.use('/api', videoRoutes);
  app.use('/api', blogRoutes);

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

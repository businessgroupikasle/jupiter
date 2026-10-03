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

  // CORS Middleware — configurable via CORS_ORIGINS env var
  // Explicitly allowed origins
  const defaultOrigins = [
    'http://localhost:3026',
    'http://127.0.0.1:3026',
    'https://jupitergroups.in',
    'https://www.jupitergroups.in',
    'http://jupitergroups.in',
    'http://www.jupitergroups.in',
  ];

  const allowedOrigins: string[] = [
    ...defaultOrigins,
    ...(env.FRONTEND_URL ? [env.FRONTEND_URL] : []),
    ...(env.CORS_ORIGINS
      ? env.CORS_ORIGINS.split(',').map((o: string) => o.trim()).filter(Boolean)
      : []),
  ];

  // Normalize origins (lowercase, strip trailing slashes, deduplicate, never allow wildcard)
  const normalizedAllowedOrigins = Array.from(
    new Set(
      allowedOrigins
        .map((o) => o.toLowerCase().trim().replace(/\/+$/, ''))
        .filter((o) => o !== '*' && o.length > 0)
    )
  );

  const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, Postman, server-to-server health checks)
      if (!origin) return callback(null, true);

      const cleanOrigin = origin.toLowerCase().trim().replace(/\/+$/, '');
      if (normalizedAllowedOrigins.includes(cleanOrigin)) {
        return callback(null, true);
      }

      // In development mode only, also permit local LAN IPs for device testing
      if (
        env.NODE_ENV === 'development' &&
        /^http:\/\/(localhost|127\.0\.0\.1|172\.\d+\.\d+\.\d+|192\.168\.\d+\.\d+)(:\d+)?$/.test(cleanOrigin)
      ) {
        return callback(null, true);
      }

      console.warn(`[CORS] Blocked origin: ${origin}`);
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
      'Origin',
      'Cookie',
      'x-admin-request',
      'x-admin-token',
    ],
    exposedHeaders: ['Set-Cookie'],
    optionsSuccessStatus: 204,
  };

  app.use(cors(corsOptions));
  app.options('*', cors(corsOptions));

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
    skip: (req) =>
      process.env.NODE_ENV === 'development' ||
      env.NODE_ENV === 'development' ||
      req.ip === '127.0.0.1' ||
      req.ip === '::1' ||
      req.ip === '::ffff:127.0.0.1',
  });
  app.use('/api', limiter);

  // Body Parser (allow up to 50MB for rich product specs, gallery photos, and base64 images)
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // Static uploads directory
  const uploadsDir = path.join(process.cwd(), 'uploads');
  const productsUploadsDir = path.join(uploadsDir, 'products');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  if (!fs.existsSync(productsUploadsDir)) {
    fs.mkdirSync(productsUploadsDir, { recursive: true });
  }
  app.use('/uploads', express.static(uploadsDir));
  app.use('/api/uploads', express.static(uploadsDir));

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

  // Bulk test runner endpoint
  app.get('/api/test-bulk-runner', async (req: Request, res: Response) => {
    const fs = require('fs');
    const path = require('path');
    const logPath = path.resolve(__dirname, '../test_debug.log');
    try {
      fs.appendFileSync(logPath, `[HANDLER ENTERED] ${new Date().toISOString()}\n`);
      const { runBulkTests } = require('./scripts/testBulkUpload');
      fs.appendFileSync(logPath, `[MODULE LOADED]\n`);
      const result = await runBulkTests();
      fs.appendFileSync(logPath, `[TEST FINISHED: ${result.passedTests}/${result.totalTests}]\n`);
      res.json(result);
    } catch (err: any) {
      fs.appendFileSync(logPath, `[HANDLER ERROR] ${err.message}\n${err.stack}\n`);
      res.json({ error: err.message, stack: err.stack });
    }
  });

  // Core content routes
  app.use('/api', authRoutes);
  app.use('/api', enquiryRoutes);
  app.use('/api', productRoutes);
  app.use(productRoutes);
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

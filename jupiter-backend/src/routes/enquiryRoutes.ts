import { Router, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import { env } from '../config/env';
import {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  markEnquiryRead,
  markAllEnquiriesRead,
  deleteEnquiry,
  clearAllEnquiries,
} from '../controllers/enquiryController';
import { validateRequest } from '../middleware/validateRequest';
import { createEnquirySchema, updateEnquiryStatusSchema } from '../validators/enquiryValidator';

// Enquiry Rate Limiter: 100 requests per 15 minutes, skipped in development / localhost
export const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Up to 100 enquiries per 15 minutes
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

const router = Router();

// Health check endpoint
router.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    service: 'Jupiter Industries API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Enquiry routes
router.post('/enquiries', enquiryLimiter, validateRequest(createEnquirySchema), createEnquiry);
router.get('/enquiries', getEnquiries);
router.get('/enquiries/:id', getEnquiryById);
router.patch('/enquiries/mark-all-read', markAllEnquiriesRead);
router.post('/enquiries/mark-all-read', markAllEnquiriesRead);
router.patch('/enquiries/:id/status', validateRequest(updateEnquiryStatusSchema), updateEnquiryStatus);
router.put('/enquiries/:id/status', validateRequest(updateEnquiryStatusSchema), updateEnquiryStatus);
router.patch('/enquiries/:id/read', markEnquiryRead);
router.post('/enquiries/:id/read', markEnquiryRead);
router.delete('/enquiries/:id', deleteEnquiry);
router.delete('/enquiries', clearAllEnquiries);

export default router;

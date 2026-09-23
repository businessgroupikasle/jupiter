import { Router, Request, Response } from 'express';
import {
  createEnquiry,
  getEnquiries,
  updateEnquiryStatus,
  markEnquiryRead,
  markAllEnquiriesRead,
  deleteEnquiry,
  clearAllEnquiries,
} from '../controllers/enquiryController';
import { validateRequest } from '../middleware/validateRequest';
import { createEnquirySchema, updateEnquiryStatusSchema } from '../validators/enquiryValidator';

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
router.post('/enquiries', validateRequest(createEnquirySchema), createEnquiry);
router.get('/enquiries', getEnquiries);
router.patch('/enquiries/mark-all-read', markAllEnquiriesRead);
router.post('/enquiries/mark-all-read', markAllEnquiriesRead);
router.patch('/enquiries/:id/status', validateRequest(updateEnquiryStatusSchema), updateEnquiryStatus);
router.put('/enquiries/:id/status', validateRequest(updateEnquiryStatusSchema), updateEnquiryStatus);
router.patch('/enquiries/:id/read', markEnquiryRead);
router.post('/enquiries/:id/read', markEnquiryRead);
router.delete('/enquiries/:id', deleteEnquiry);
router.delete('/enquiries', clearAllEnquiries);

export default router;

import { Router, Request, Response } from 'express';
import { createEnquiry, getEnquiries, deleteEnquiry, clearAllEnquiries } from '../controllers/enquiryController';
import { validateRequest } from '../middleware/validateRequest';
import { createEnquirySchema } from '../validators/enquiryValidator';

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
router.delete('/enquiries/:id', deleteEnquiry);
router.delete('/enquiries', clearAllEnquiries);

export default router;

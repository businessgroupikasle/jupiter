import { Router } from 'express';
import { handleUpload, listUploads } from '../controllers/uploadController';
import { requireAuth } from '../middleware/authMiddleware';
import { uploadProductImageOptional } from '../middleware/uploadMiddleware';

const router = Router();

// Protected upload endpoint (supports both multipart 'image' and base64)
router.post('/upload', requireAuth, uploadProductImageOptional, handleUpload);

// Public read endpoints
router.get('/upload', listUploads);
router.get('/uploads', listUploads);

export default router;

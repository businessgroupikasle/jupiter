import { Router } from 'express';
import { handleUpload, listUploads } from '../controllers/uploadController';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();

// Protected upload endpoint
router.post('/upload', requireAuth, handleUpload);

// Public read endpoints
router.get('/upload', listUploads);
router.get('/uploads', listUploads);

export default router;

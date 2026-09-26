import { Router } from 'express';
import { handleUpload, listUploads } from '../controllers/uploadController';

const router = Router();

router.post('/upload', handleUpload);
router.get('/upload', listUploads);
router.get('/uploads', listUploads);

export default router;

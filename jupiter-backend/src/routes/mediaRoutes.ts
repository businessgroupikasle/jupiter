import { Router } from 'express';
import { getMediaById, getMediaByFilename, listAllMedia } from '../controllers/mediaController';

const router = Router();

// Public media retrieval endpoints
router.get('/media', listAllMedia);
router.get('/media/:id', getMediaById);
router.get('/media/file/:filename', getMediaByFilename);

export default router;

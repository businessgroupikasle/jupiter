import { Router } from 'express';
import {
  getGalleryPhotos,
  createGalleryPhoto,
  deleteGalleryPhoto,
  clearAllGalleryPhotos,
} from '../controllers/galleryController';

const router = Router();

router.get('/gallery', getGalleryPhotos);
router.post('/gallery', createGalleryPhoto);
router.delete('/gallery/:id', deleteGalleryPhoto);
router.delete('/gallery', clearAllGalleryPhotos);

export default router;

import { Router } from 'express';
import {
  getGalleryPhotos,
  getGalleryPhotoById,
  createGalleryPhoto,
  updateGalleryPhoto,
  deleteGalleryPhoto,
  clearAllGalleryPhotos,
} from '../controllers/galleryController';

const router = Router();

router.get('/gallery', getGalleryPhotos);
router.get('/gallery/:id', getGalleryPhotoById);
router.post('/gallery', createGalleryPhoto);
router.put('/gallery/:id', updateGalleryPhoto);
router.delete('/gallery/:id', deleteGalleryPhoto);
router.delete('/gallery', clearAllGalleryPhotos);

export default router;

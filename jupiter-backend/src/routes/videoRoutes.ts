import { Router } from 'express';
import {
  getVideos,
  createVideo,
  updateVideo,
  deleteVideo,
  clearAllVideos,
} from '../controllers/videoController';

const router = Router();

router.get('/videos', getVideos);
router.post('/videos', createVideo);
router.put('/videos/:id', updateVideo);
router.delete('/videos/:id', deleteVideo);
router.delete('/videos', clearAllVideos);

export default router;

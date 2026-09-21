import { Router } from 'express';
import {
  getVideos,
  createVideo,
  deleteVideo,
  clearAllVideos,
} from '../controllers/videoController';

const router = Router();

router.get('/videos', getVideos);
router.post('/videos', createVideo);
router.delete('/videos/:id', deleteVideo);
router.delete('/videos', clearAllVideos);

export default router;

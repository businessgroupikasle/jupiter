import { Router } from 'express';
import {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
  clearAllBlogs,
} from '../controllers/blogController';

const router = Router();

router.get('/blogs', getBlogs);
router.get('/blogs/:slug', getBlogBySlug);
router.post('/blogs', createBlog);
router.put('/blogs/:id', updateBlog);
router.delete('/blogs', clearAllBlogs);
router.delete('/blogs/:id', deleteBlog);

export default router;

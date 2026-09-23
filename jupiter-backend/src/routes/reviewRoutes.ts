import { Router } from 'express';
import { getReviews, createReview, updateReview, deleteReview } from '../controllers/reviewController';

const router = Router();

router.get('/reviews', getReviews);
router.post('/reviews', createReview);
router.put('/reviews/:id', updateReview);
router.delete('/reviews/:id', deleteReview);

export default router;

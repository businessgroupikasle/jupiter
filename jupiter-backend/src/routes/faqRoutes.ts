import { Router } from 'express';
import { getFaqs, getFaqById, createFaq, updateFaq, deleteFaq, clearAllFaqs } from '../controllers/faqController';

const router = Router();

router.get('/faqs', getFaqs);
router.get('/faqs/:id', getFaqById);
router.post('/faqs', createFaq);
router.put('/faqs/:id', updateFaq);
router.delete('/faqs', clearAllFaqs);
router.delete('/faqs/:id', deleteFaq);

export default router;

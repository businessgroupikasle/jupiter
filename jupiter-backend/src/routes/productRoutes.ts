import { Router } from 'express';
import {
  getProducts,
  getProductByIdOrSlug,
  createProduct,
  updateProduct,
  toggleProductStatus,
  reorderProduct,
  getProductEnquiries,
  deleteProduct,
  clearAllProducts,
} from '../controllers/productController';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();

// Public read routes
router.get('/products', getProducts);
router.get('/products/:idOrSlug', getProductByIdOrSlug);
router.get('/products/:id/enquiries', getProductEnquiries);

// Admin-protected write routes
router.post('/products', requireAuth, createProduct);
router.put('/products/:id', requireAuth, updateProduct);
router.patch('/products/:id/toggle-status', requireAuth, toggleProductStatus);
router.post('/products/:id/toggle-status', requireAuth, toggleProductStatus);
router.patch('/products/:id/status', requireAuth, toggleProductStatus);
router.post('/products/:id/reorder', requireAuth, reorderProduct);
router.patch('/products/:id/reorder', requireAuth, reorderProduct);
router.delete('/products', requireAuth, clearAllProducts);
router.delete('/products/:id', requireAuth, deleteProduct);

export default router;


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

const router = Router();

// Product CRUD routes
router.get('/products', getProducts);
router.get('/products/:idOrSlug', getProductByIdOrSlug);
router.get('/products/:id/enquiries', getProductEnquiries);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.patch('/products/:id/toggle-status', toggleProductStatus);
router.post('/products/:id/toggle-status', toggleProductStatus);
router.patch('/products/:id/status', toggleProductStatus);
router.post('/products/:id/reorder', reorderProduct);
router.patch('/products/:id/reorder', reorderProduct);
router.delete('/products', clearAllProducts);
router.delete('/products/:id', deleteProduct);

export default router;

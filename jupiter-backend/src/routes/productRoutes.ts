import { Router } from 'express';
import {
  getProducts,
  getProductByIdOrSlug,
  createProduct,
  updateProduct,
  deleteProduct,
  clearAllProducts,
  triggerSeed,
} from '../controllers/productController';

const router = Router();

router.get('/products', getProducts);
router.get('/products/seed', triggerSeed);
router.post('/products/seed', triggerSeed);
router.get('/products/:idOrSlug', getProductByIdOrSlug);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products', clearAllProducts);
router.delete('/products/:id', deleteProduct);

export default router;

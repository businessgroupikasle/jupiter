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
  uploadProductImageHandler,
  bulkImportProducts,
  getCsvTemplate,
} from '../controllers/productController';
import {
  getBulkProductTemplate,
  validateBulkProducts,
  importBulkProducts,
} from '../controllers/productBulkController';
import { requireAuth } from '../middleware/authMiddleware';
import {
  upload,
  uploadProductImagesArray,
  uploadProductImagesOptional,
  uploadCsvFile,
} from '../middleware/uploadMiddleware';

const router = Router();

// CSV Bulk Upload API endpoints (must be defined before /products/:idOrSlug)
router.get('/products/bulk/template', getBulkProductTemplate);
router.post('/products/bulk/validate', requireAuth, uploadCsvFile, validateBulkProducts);
router.post('/products/bulk/import', requireAuth, uploadCsvFile, importBulkProducts);

// Legacy CSV import template endpoints (preserved for backwards compatibility)
router.get('/products/csv-template', getCsvTemplate);
router.get('/products/bulk-import/template', getCsvTemplate);

// Legacy bulk product import using CSV (field name: 'file')
router.post('/products/bulk-import', requireAuth, uploadCsvFile, bulkImportProducts);

// Dedicated product images upload endpoint (field name: 'images', accepts up to 10 files)
// Supports upload.array('images', 10) natively
router.post('/products/upload', requireAuth, uploadProductImagesOptional, uploadProductImageHandler);

// Public read routes
router.get('/products', getProducts);
router.get('/products/:idOrSlug', getProductByIdOrSlug);
router.get('/products/:id/enquiries', getProductEnquiries);

// Admin-protected write routes with multer support for 'images' (up to 10 files)
router.post('/products', requireAuth, uploadProductImagesOptional, createProduct);
router.put('/products/:id', requireAuth, uploadProductImagesOptional, updateProduct);
router.patch('/products/:id/toggle-status', requireAuth, toggleProductStatus);
router.post('/products/:id/toggle-status', requireAuth, toggleProductStatus);
router.patch('/products/:id/status', requireAuth, toggleProductStatus);
router.post('/products/:id/reorder', requireAuth, reorderProduct);
router.patch('/products/:id/reorder', requireAuth, reorderProduct);
router.delete('/products', requireAuth, clearAllProducts);
router.delete('/products/:id', requireAuth, deleteProduct);

export default router;

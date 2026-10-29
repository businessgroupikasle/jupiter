import { Router } from 'express';
import {
  getAllAncillaryEquipment,
  getAncillaryEquipmentById,
  createAncillaryEquipment,
  updateAncillaryEquipment,
  deleteAncillaryEquipment,
  toggleAncillaryEquipmentStatus,
  reorderAncillaryEquipment,
  getAncillaryEnabledCategories,
  updateAncillaryEnabledCategories,
  resetAncillaryEquipment,
} from '../controllers/ancillaryEquipmentController';

const router = Router();

router.get('/ancillary-equipment/categories', getAncillaryEnabledCategories);
router.put('/ancillary-equipment/categories', updateAncillaryEnabledCategories);

router.get('/ancillary-equipment', getAllAncillaryEquipment);
router.post('/ancillary-equipment/reset', resetAncillaryEquipment);
router.get('/ancillary-equipment/:id', getAncillaryEquipmentById);
router.post('/ancillary-equipment', createAncillaryEquipment);
router.put('/ancillary-equipment/reorder', reorderAncillaryEquipment);
router.put('/ancillary-equipment/:id', updateAncillaryEquipment);
router.delete('/ancillary-equipment/:id', deleteAncillaryEquipment);
router.patch('/ancillary-equipment/:id/toggle', toggleAncillaryEquipmentStatus);

export default router;

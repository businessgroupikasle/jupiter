import { Router } from 'express';
import {
  getDeliveryLocations,
  getDeliveryLocationById,
  createDeliveryLocation,
  updateDeliveryLocation,
  deleteDeliveryLocation,
  clearAllDeliveryLocations,
} from '../controllers/deliveryLocationController';

const router = Router();

router.get('/delivery-locations', getDeliveryLocations);
router.get('/delivery-locations/:id', getDeliveryLocationById);
router.post('/delivery-locations', createDeliveryLocation);
router.put('/delivery-locations/:id', updateDeliveryLocation);
router.delete('/delivery-locations', clearAllDeliveryLocations);
router.delete('/delivery-locations/:id', deleteDeliveryLocation);

export default router;

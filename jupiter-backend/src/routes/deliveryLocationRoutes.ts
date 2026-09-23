import { Router } from 'express';
import {
  getDeliveryLocations,
  createDeliveryLocation,
  updateDeliveryLocation,
  deleteDeliveryLocation,
} from '../controllers/deliveryLocationController';

const router = Router();

router.get('/delivery-locations', getDeliveryLocations);
router.post('/delivery-locations', createDeliveryLocation);
router.put('/delivery-locations/:id', updateDeliveryLocation);
router.delete('/delivery-locations/:id', deleteDeliveryLocation);

export default router;

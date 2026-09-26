import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  validateUserAccess,
} from '../controllers/userController';

const router = Router();

router.get('/users', getUsers);
router.post('/users', createUser);
router.post('/users/login', loginUser);
router.post('/users/validate-access', validateUserAccess);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;

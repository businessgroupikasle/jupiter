import { Router } from 'express';
import {
  loginUser,
  validateUserAccess,
  forgotPassword,
  resetPassword,
} from '../controllers/userController';

const router = Router();

// Authentication & Access Routes
router.post('/auth/login', loginUser);
router.post('/auth/validate', validateUserAccess);

// Password Reset Routes
router.post('/auth/forgot-password', forgotPassword);
router.post('/auth/reset-password', resetPassword);

// Aliases for frontend convenience
router.post('/users/forgot-password', forgotPassword);
router.post('/users/reset-password', resetPassword);

export default router;

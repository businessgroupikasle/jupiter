import { Router } from 'express';
import {
  loginUser,
  validateUserAccess,
  forgotPassword,
  resetPassword,
  getMe,
} from '../controllers/userController';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();

// Authentication & Access Routes
router.post('/auth/login', loginUser);
router.post('/auth/validate', validateUserAccess);
router.get('/auth/me', requireAuth, getMe);

// Password Reset Routes
router.post('/auth/forgot-password', forgotPassword);
router.post('/auth/reset-password', resetPassword);

// Aliases for convenience
router.post('/users/login', loginUser);
router.post('/users/validate-access', validateUserAccess);
router.post('/users/forgot-password', forgotPassword);
router.post('/users/reset-password', resetPassword);

export default router;

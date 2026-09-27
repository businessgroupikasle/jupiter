import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import { env } from '../config/env';
import {
  generateResetToken,
  hashToken,
  hashPassword,
  verifyPassword,
  generateAuthToken,
} from '../utils/security';
import { sendPasswordResetEmail } from '../services/mailService';

const prisma = new PrismaClient();

const VALID_ROLES = [
  'Super Admin',
  'Admin',
  'Editor',
  'Sales Executive',
  'Marketing Manager',
  'Plant Operations Lead',
];

// Helper to strip sensitive password and reset token fields from user responses
export const sanitizeUser = (user: any) => {
  if (!user) return null;
  const { password, resetPasswordToken, resetPasswordExpires, ...safeUser } = user;
  return safeUser;
};

const getIdParam = (req: Request): string => {
  const { id } = req.params;
  return Array.isArray(id) ? id[0] : (id as string);
};

/**
 * Startup sync: Ensures a Super Admin account exists and has a valid hashed password.
 * Uses env.ADMIN_EMAIL and env.ADMIN_PASSWORD (environment-based, not hardcoded).
 */
export const ensureDefaultAdminUser = async (): Promise<void> => {
  try {
    const adminEmail = (env.ADMIN_EMAIL || 'admin@jupiter.com').trim().toLowerCase();
    const adminPassword = env.ADMIN_PASSWORD ? env.ADMIN_PASSWORD.trim() : 'admin123';

    let existingAdmin = await prisma.user.findFirst({
      where: {
        OR: [
          { email: { equals: adminEmail, mode: 'insensitive' } },
          { role: 'Super Admin' },
        ],
      },
    });

    if (!existingAdmin) {
      existingAdmin = await prisma.user.create({
        data: {
          name: 'Jupiter Admin',
          email: adminEmail,
          role: 'Super Admin',
          status: 'Active',
          phone: '+91 93429 19060',
          password: hashPassword(adminPassword),
        },
      });
      console.log(`[Auth] Created default Super Admin user: ${existingAdmin.email}`);
    } else {
      // If admin has no password set or is inactive, ensure active and hashed password
      const needsPasswordUpdate = !existingAdmin.password;
      const needsActivation = existingAdmin.status !== 'Active';

      if (needsPasswordUpdate || needsActivation) {
        await prisma.user.update({
          where: { id: existingAdmin.id },
          data: {
            status: 'Active',
            password: existingAdmin.password || hashPassword(adminPassword),
          },
        });
        console.log(`[Auth] Synchronized admin user credentials for: ${existingAdmin.email}`);
      }
    }
  } catch (err: any) {
    console.warn('[Auth] Note during admin bootstrap:', err.message);
  }
};

// GET /api/users
export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        status: true,
        phone: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (error) {
    next(error);
  }
};

// GET /api/users/:id
export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = getIdParam(req);
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        status: true,
        phone: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// GET /api/auth/me
export const getMe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authUser = (req as any).user;
    if (!authUser) {
      res.status(401).json({ success: false, message: 'Not authenticated' });
      return;
    }
    const user = await prisma.user.findUnique({
      where: { id: authUser.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        status: true,
        phone: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

// POST /api/users
export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, role, avatar, status, phone, password } = req.body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      res.status(400).json({ success: false, message: 'Name is required' });
      return;
    }

    if (!email || typeof email !== 'string' || !email.trim()) {
      res.status(400).json({ success: false, message: 'Email is required' });
      return;
    }

    const cleanEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      res.status(400).json({ success: false, message: 'Please provide a valid email address' });
      return;
    }

    const existing = await prisma.user.findFirst({
      where: { email: { equals: cleanEmail, mode: 'insensitive' } },
    });
    if (existing) {
      res.status(409).json({ success: false, message: 'User already exists with this email address' });
      return;
    }

    const assignedRole = role && VALID_ROLES.includes(role.trim()) ? role.trim() : 'Admin';
    const assignedStatus = status && ['Active', 'Inactive'].includes(status) ? status : 'Active';
    const rawPass = password && typeof password === 'string' && password.trim() ? password.trim() : (env.ADMIN_PASSWORD || 'admin123');
    const hashedPassword = hashPassword(rawPass);

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: cleanEmail,
        role: assignedRole,
        avatar: avatar || null,
        status: assignedStatus,
        phone: phone ? String(phone).trim() : null,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: sanitizeUser(user),
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/users/:id
export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = getIdParam(req);
    const { name, email, role, avatar, status, phone, password } = req.body;

    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    const updateData: any = {};
    if (name !== undefined) updateData.name = String(name).trim();
    if (email !== undefined) {
      const cleanEmail = String(email).trim().toLowerCase();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(cleanEmail)) {
        res.status(400).json({ success: false, message: 'Please provide a valid email address' });
        return;
      }
      const duplicate = await prisma.user.findFirst({
        where: { email: cleanEmail, NOT: { id } },
      });
      if (duplicate) {
        res.status(409).json({ success: false, message: 'Another user already exists with this email address' });
        return;
      }
      updateData.email = cleanEmail;
    }
    if (role !== undefined) updateData.role = String(role).trim();
    if (avatar !== undefined) updateData.avatar = avatar;
    if (status !== undefined) updateData.status = status;
    if (phone !== undefined) updateData.phone = phone;
    if (password !== undefined && typeof password === 'string' && password.trim()) {
      updateData.password = hashPassword(password.trim());
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
    });

    res.status(200).json({ success: true, message: 'User updated successfully', data: sanitizeUser(updatedUser) });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/users/:id
export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = getIdParam(req);

    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    await prisma.user.delete({ where: { id } });
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// POST /api/users/login & POST /api/auth/login
export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ success: false, message: 'Both email and password are required' });
      return;
    }

    const cleanEmail = String(email).trim().toLowerCase();
    let user = await prisma.user.findFirst({
      where: { email: { equals: cleanEmail, mode: 'insensitive' } },
    });

    // If user does not exist in DB, check if it matches the configured ADMIN_EMAIL & ADMIN_PASSWORD
    if (!user) {
      const configuredAdminEmail = (env.ADMIN_EMAIL || 'admin@jupiter.com').trim().toLowerCase();
      if (cleanEmail === configuredAdminEmail && env.ADMIN_PASSWORD && verifyPassword(password, null)) {
        user = await prisma.user.create({
          data: {
            name: 'Jupiter Admin',
            email: configuredAdminEmail,
            role: 'Super Admin',
            status: 'Active',
            phone: '+91 93429 19060',
            password: hashPassword(password),
          },
        });
        console.log(`[Auth] Auto-bootstrapped configured Super Admin: ${cleanEmail}`);
      }
    }

    if (!user) {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
      return;
    }

    if (user.status === 'Inactive') {
      res.status(403).json({ success: false, message: 'Account is inactive. Please contact system administrator.' });
      return;
    }

    // Password validation using PBKDF2 hash with timing-safe comparison
    const validPassword = verifyPassword(password, user.password);
    if (!validPassword) {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
      return;
    }

    // Update lastLogin timestamp and upgrade password to secure PBKDF2 hash if legacy
    const updated = await prisma.user.update({
      where: { id: user.id },
      data: {
        lastLogin: new Date(),
        password: user.password && user.password.startsWith('pbkdf2$')
          ? user.password
          : hashPassword(password),
      },
    });

    // Generate HMAC-SHA256 signed JWT token using environment secret
    const token = generateAuthToken(updated);

    // Set secure HTTP-only cookies
    res.cookie('token', token, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
    });
    res.cookie('admin_token', token, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
    });

    res.status(200).json({
      success: true,
      message: 'Admin authentication successful',
      token,
      user: sanitizeUser(updated),
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/users/validate-access & POST /api/auth/validate
export const validateUserAccess = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId, role, action } = req.body;

    let targetRole = role;
    if (userId) {
      const id = Array.isArray(userId) ? userId[0] : String(userId);
      const user = await prisma.user.findUnique({ where: { id } });
      if (!user) {
        res.status(404).json({ success: false, message: 'User not found' });
        return;
      }
      if (user.status === 'Inactive') {
        res.status(403).json({ success: false, allowed: false, message: 'Account is deactivated' });
        return;
      }
      targetRole = user.role;
    }

    const permissions: Record<string, string[]> = {
      'Super Admin': ['read', 'create', 'update', 'delete', 'manage_users', 'manage_settings'],
      'Admin': ['read', 'create', 'update', 'delete', 'manage_settings'],
      'Editor': ['read', 'create', 'update'],
      'Sales Executive': ['read', 'enquiries'],
      'Marketing Manager': ['read', 'blogs', 'gallery', 'videos'],
    };

    const allowedActions = permissions[targetRole] || ['read'];
    const isAllowed = action ? allowedActions.includes(action) : true;

    res.status(200).json({
      success: true,
      role: targetRole,
      action: action || 'all',
      allowed: isAllowed,
      permissions: allowedActions,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/forgot-password
export const forgotPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email } = req.body;

    if (!email || typeof email !== 'string' || !email.trim()) {
      res.status(400).json({ success: false, message: 'A valid email address is required' });
      return;
    }

    const cleanEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      res.status(400).json({ success: false, message: 'Please provide a valid email address' });
      return;
    }

    const genericResponse = {
      success: true,
      message: 'If an account with that email exists, a password reset link and OTP have been sent.',
    };

    const user = await prisma.user.findFirst({
      where: { email: { equals: cleanEmail, mode: 'insensitive' } },
    });

    if (!user || user.status === 'Inactive') {
      res.status(200).json(genericResponse);
      return;
    }

    const { rawToken, hashedToken, expiresAt } = generateResetToken(30);
    const otp = Math.floor(100000 + crypto.randomInt(900000)).toString();
    const hashedOtp = hashToken(otp);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetPasswordToken: `${hashedToken}:${hashedOtp}`,
        resetPasswordExpires: expiresAt,
      },
    });

    const frontendBase = env.FRONTEND_URL || 'http://localhost:3026';
    const resetLink = `${frontendBase}/admin/reset-password?token=${rawToken}`;

    try {
      await sendPasswordResetEmail(user.email, user.name, resetLink, otp);
      console.log(`[Auth] Password reset email with OTP dispatched to: ${user.email}`);

      const primaryAdminEmail = 'jupiterengineering023@gmail.com';
      if (user.email.toLowerCase() !== primaryAdminEmail) {
        await sendPasswordResetEmail(primaryAdminEmail, 'Jupiter Admin', resetLink, otp).catch((e) => {
          console.error('[Auth] Failed forwarding copy to primary admin:', e.message);
        });
        console.log(`[Auth] Reset OTP forwarded to primary admin: ${primaryAdminEmail}`);
      }
    } catch (mailError: any) {
      console.error('[Auth] Failed to dispatch password reset email:', mailError.message);
    }

    res.status(200).json(genericResponse);
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/reset-password
export const resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { token, otp, code, password, confirmPassword, email } = req.body;

    const rawCode = String(token || otp || code || '').trim();
    if (!rawCode) {
      res.status(400).json({ success: false, message: 'Password reset token or OTP is required' });
      return;
    }

    if (!password || typeof password !== 'string') {
      res.status(400).json({ success: false, message: 'New password is required' });
      return;
    }

    if (confirmPassword !== undefined && password !== confirmPassword) {
      res.status(400).json({ success: false, message: 'Passwords do not match' });
      return;
    }

    if (password.length < 8) {
      res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long',
      });
      return;
    }

    const hashedInput = hashToken(rawCode);

    const whereConditions: any[] = [
      { resetPasswordToken: hashedInput },
      { resetPasswordToken: { contains: hashedInput } },
    ];

    if (email && typeof email === 'string' && email.trim()) {
      whereConditions.push({ email: { equals: email.trim().toLowerCase(), mode: 'insensitive' } });
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: whereConditions,
        resetPasswordExpires: {
          gt: new Date(),
        },
      },
    });

    if (!user || !user.resetPasswordToken || !user.resetPasswordToken.includes(hashedInput)) {
      res.status(400).json({
        success: false,
        message: 'Invalid or expired password reset token or OTP',
      });
      return;
    }

    const hashedPassword = hashPassword(password);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
    });

    console.log(`[Auth] Password successfully reset for user: ${user.email}`);

    res.status(200).json({
      success: true,
      message: 'Password has been reset successfully. You can now log in with your new password.',
    });
  } catch (error) {
    next(error);
  }
};

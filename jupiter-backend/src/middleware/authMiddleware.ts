import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { verifyAuthToken } from '../utils/security';

const prisma = new PrismaClient();

const parseCookies = (cookieHeader?: string): Record<string, string> => {
  if (!cookieHeader) return {};
  const cookies: Record<string, string> = {};
  cookieHeader.split(';').forEach((part) => {
    const [rawKey, ...rawVal] = part.trim().split('=');
    if (rawKey) {
      cookies[rawKey.trim()] = decodeURIComponent(rawVal.join('=').trim());
    }
  });
  return cookies;
};

export const extractToken = (req: Request): string | null => {
  // 1. Authorization Header: "Bearer <token>" or raw "<token>"
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const trimmed = authHeader.startsWith('Bearer ')
      ? authHeader.slice(7).trim()
      : authHeader.trim();
    if (trimmed) return trimmed;
  }

  // 2. Cookies: token, admin_token, auth_token, jwt, session, sessionId
  const cookies = parseCookies(req.headers.cookie);
  const cookieToken =
    cookies.token ||
    cookies.admin_token ||
    cookies.auth_token ||
    cookies.jwt ||
    cookies.session ||
    cookies.sessionId;
  if (cookieToken) return cookieToken;

  // 3. Custom headers
  const customHeader = req.headers['x-admin-token'] || req.headers['x-access-token'];
  if (customHeader && typeof customHeader === 'string' && customHeader.trim()) {
    return customHeader.trim();
  }

  return null;
};

/**
 * Authentication middleware for admin-protected routes.
 * Accepts:
 * - Authorization: Bearer <HMAC-signed-JWT-or-jupiter-token>
 * - Cookie: token=<token> or admin_token=<token>
 * Returns clear 401/403 JSON errors.
 */
export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = extractToken(req);

    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Authentication required. Please provide a valid admin token or cookie.',
      });
      return;
    }

    let user: any = null;

    // 1. Validate HMAC-signed JWT token
    if (token.includes('.')) {
      const tokenVerification = verifyAuthToken(token);
      if (!tokenVerification.valid) {
        res.status(401).json({
          success: false,
          message: tokenVerification.error || 'Invalid authentication token. Please log in again.',
        });
        return;
      }

      const payload = tokenVerification.payload;
      const candidateId = payload?.id || payload?.userId || payload?.sub;
      const candidateEmail = payload?.email;

      if (candidateId) {
        user = await prisma.user.findUnique({
          where: { id: String(candidateId) },
          select: { id: true, name: true, email: true, role: true, status: true },
        });
      }
      if (!user && candidateEmail) {
        user = await prisma.user.findFirst({
          where: { email: { equals: String(candidateEmail).trim().toLowerCase(), mode: 'insensitive' } },
          select: { id: true, name: true, email: true, role: true, status: true },
        });
      }
    }

    // 2. Backward compatibility for legacy "jupiter-token-<userId>-<timestamp>" format
    if (!user) {
      const jupiterMatch = token.match(/^jupiter-token-([a-zA-Z0-9_-]+)-(\d+)$/);
      if (jupiterMatch) {
        const userId = jupiterMatch[1];
        user = await prisma.user.findUnique({
          where: { id: userId },
          select: { id: true, name: true, email: true, role: true, status: true },
        });
      }
    }

    // If user cannot be resolved or token invalid
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Invalid authentication credentials. User not found.',
      });
      return;
    }

    // Check account status
    if (user.status === 'Inactive') {
      res.status(403).json({
        success: false,
        message: 'Account is inactive. Please contact system administrator.',
      });
      return;
    }

    // Check administrative authorization
    const authorizedRoles = ['Super Admin', 'Admin', 'Editor'];
    if (user.role && !authorizedRoles.includes(user.role)) {
      res.status(403).json({
        success: false,
        message: 'Access denied: Administrative privileges required.',
      });
      return;
    }

    // Attach validated user to request
    (req as any).user = user;
    next();
  } catch (error) {
    console.error('[Auth] Middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Authentication error. Please try again.',
    });
  }
};

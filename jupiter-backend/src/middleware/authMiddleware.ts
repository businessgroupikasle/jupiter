import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

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

const extractToken = (req: Request): string | null => {
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
 * - Authorization: Bearer <token> (jupiter-token format or JWT token)
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

    // 1. Check jupiter-token format: "jupiter-token-<userId>-<timestamp>"
    const jupiterMatch = token.match(/^jupiter-token-([a-zA-Z0-9_-]+)-(\d+)$/);
    if (jupiterMatch) {
      const userId = jupiterMatch[1];
      user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, name: true, email: true, role: true, status: true },
      });
    }

    // 2. Check standard JWT format: "<header>.<payload>.<signature>"
    if (!user && token.includes('.')) {
      const parts = token.split('.');
      if (parts.length === 3) {
        try {
          const payloadBase64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
          const payloadJson = JSON.parse(Buffer.from(payloadBase64, 'base64').toString('utf8'));

          // Check token expiry if exp claim is present
          if (payloadJson.exp && typeof payloadJson.exp === 'number') {
            const expMs = payloadJson.exp < 1e11 ? payloadJson.exp * 1000 : payloadJson.exp;
            if (expMs < Date.now()) {
              res.status(401).json({
                success: false,
                message: 'Authentication token has expired. Please log in again.',
              });
              return;
            }
          }

          const candidateId = payloadJson.id || payloadJson.userId || payloadJson.sub || payloadJson.user?.id;
          const candidateEmail = payloadJson.email || payloadJson.user?.email;

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
        } catch {
          // Non-JWT token containing period, ignore and continue to fallback
        }
      }
    }

    // 3. Direct User ID or Email lookup fallback
    if (!user) {
      user = await prisma.user.findFirst({
        where: {
          OR: [
            { id: token },
            { email: { equals: token.trim().toLowerCase(), mode: 'insensitive' } },
          ],
        },
        select: { id: true, name: true, email: true, role: true, status: true },
      });
    }

    // If user not resolved by any strategy
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

    // Check admin authorization
    const authorizedRoles = ['Super Admin', 'Admin', 'Editor'];
    if (user.role && !authorizedRoles.includes(user.role)) {
      res.status(403).json({
        success: false,
        message: 'Access denied: Administrative privileges required.',
      });
      return;
    }

    // Attach user to request
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

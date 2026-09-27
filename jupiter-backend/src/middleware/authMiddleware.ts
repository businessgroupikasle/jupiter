import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Authentication middleware for admin-protected routes.
 *
 * Validates Authorization header token format: "Bearer jupiter-token-<userId>-<timestamp>"
 * Verifies the user exists and is active.
 *
 * Skips authentication for:
 * - Requests with no Authorization header in development mode (allows Postman/curl testing)
 */
export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      // In development, allow unauthenticated requests for easier testing
      if (process.env.NODE_ENV === 'development') {
        return next();
      }
      res.status(401).json({
        success: false,
        message: 'Authentication required. Please provide a valid admin token.',
      });
      return;
    }

    // Support both "Bearer <token>" and raw "<token>" formats
    const token = authHeader.startsWith('Bearer ')
      ? authHeader.slice(7).trim()
      : authHeader.trim();

    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Authentication token is missing.',
      });
      return;
    }

    // Parse the jupiter-token format: "jupiter-token-<userId>-<timestamp>"
    const tokenMatch = token.match(/^jupiter-token-(.+)-(\d+)$/);
    if (!tokenMatch) {
      // In development, allow any non-empty token for testing
      if (process.env.NODE_ENV === 'development') {
        return next();
      }
      res.status(401).json({
        success: false,
        message: 'Invalid authentication token format.',
      });
      return;
    }

    const userId = tokenMatch[1];

    // Verify user exists and is active
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, role: true, status: true },
    });

    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Invalid authentication token. User not found.',
      });
      return;
    }

    if (user.status === 'Inactive') {
      res.status(403).json({
        success: false,
        message: 'Account is inactive. Please contact system administrator.',
      });
      return;
    }

    // Attach user info to request for downstream handlers
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

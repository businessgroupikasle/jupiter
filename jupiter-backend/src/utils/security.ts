import crypto from 'crypto';
import { env } from '../config/env';

/**
 * Generate a cryptographically secure random reset token.
 * Returns rawToken to send to the user via email,
 * and hashedToken to store in the database.
 */
export const generateResetToken = (expiryMinutes: number = 30): {
  rawToken: string;
  hashedToken: string;
  expiresAt: Date;
} => {
  const rawToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = hashToken(rawToken);
  const expiresAt = new Date(Date.now() + expiryMinutes * 60 * 1000);

  return { rawToken, hashedToken, expiresAt };
};

/**
 * Hash a raw token with SHA-256 for secure comparison against DB.
 */
export const hashToken = (token: string): string => {
  return crypto.createHash('sha256').update(token.trim()).digest('hex');
};

/**
 * Securely hash a password using PBKDF2 with SHA-512 and a unique salt.
 */
export const hashPassword = (password: string): string => {
  const salt = crypto.randomBytes(16).toString('hex');
  const iterations = 100000;
  const keylen = 64;
  const digest = 'sha512';
  const hash = crypto.pbkdf2Sync(password, salt, iterations, keylen, digest).toString('hex');
  return `pbkdf2$${iterations}$${salt}$${hash}`;
};

/**
 * Constant-time string equality comparison to prevent timing attacks.
 */
export const timingSafeCompare = (a: string, b: string): boolean => {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
};

/**
 * Verify a password against a stored hash or environment-defined password.
 * NEVER hardcodes passwords in code.
 * Uses timingSafeEqual to guard against timing attacks.
 */
export const verifyPassword = (password: string, stored: string | null | undefined): boolean => {
  if (!password) return false;

  // 1. Stored PBKDF2 hash verification. Older versions accidentally omitted
  // the separator after "pbkdf2", so accept that format long enough to
  // authenticate and let the login controller upgrade it to the canonical one.
  if (stored && stored.startsWith('pbkdf2')) {
    const canonicalMatch = stored.match(/^pbkdf2\$(\d+)\$([0-9a-f]+)\$([0-9a-f]+)$/i);
    const legacyMatch = stored.match(/^pbkdf2(\d+)\$([0-9a-f]+)\$([0-9a-f]+)$/i);
    const match = canonicalMatch || legacyMatch;

    if (match) {
      const iterations = Number(match[1]);
      const salt = match[2];
      const originalHash = match[3];

      if (!Number.isSafeInteger(iterations) || iterations < 1 || iterations > 1_000_000) {
        return false;
      }

      const computedHash = crypto.pbkdf2Sync(password, salt, iterations, 64, 'sha512').toString('hex');

      const originalBuffer = Buffer.from(originalHash, 'hex');
      const computedBuffer = Buffer.from(computedHash, 'hex');

      if (originalBuffer.length !== computedBuffer.length) {
        return false;
      }
      return crypto.timingSafeEqual(originalBuffer, computedBuffer);
    }
  }

  // 2. Backward compatibility with stored legacy plain-text password
  if (stored && stored.length > 0) {
    return timingSafeCompare(password, stored);
  }

  // 3. Fallback to environment-based secret if configured (no hardcoded password)
  if (env.ADMIN_PASSWORD && env.ADMIN_PASSWORD.trim()) {
    return timingSafeCompare(password, env.ADMIN_PASSWORD.trim());
  }

  return false;
};

/**
 * Generate a cryptographically signed HMAC-SHA256 JWT auth token.
 */
export const generateAuthToken = (user: { id: string; email: string; role?: string }): string => {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({
    id: user.id,
    email: user.email,
    role: user.role || 'Admin',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60), // 7 days expiration
  })).toString('base64url');

  const secret = env.JWT_SECRET || 'jupiter_auth_jwt_secure_secret_token_2026';
  const signature = crypto.createHmac('sha256', secret).update(`${header}.${payload}`).digest('base64url');
  return `${header}.${payload}.${signature}`;
};

/**
 * Verify HMAC-SHA256 signed JWT auth token.
 */
export const verifyAuthToken = (token: string): { valid: boolean; payload?: any; error?: string } => {
  if (!token || typeof token !== 'string') {
    return { valid: false, error: 'Token missing' };
  }

  const parts = token.trim().split('.');
  if (parts.length !== 3) {
    return { valid: false, error: 'Malformed token structure' };
  }

  const [headerB64, payloadB64, signatureB64] = parts;
  const secret = env.JWT_SECRET || 'jupiter_auth_jwt_secure_secret_token_2026';
  const expectedSig = crypto.createHmac('sha256', secret).update(`${headerB64}.${payloadB64}`).digest('base64url');

  const sigBuf = Buffer.from(signatureB64);
  const expBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return { valid: false, error: 'Invalid token signature' };
  }

  try {
    const payloadJson = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8'));
    if (payloadJson.exp && typeof payloadJson.exp === 'number') {
      const expMs = payloadJson.exp < 1e11 ? payloadJson.exp * 1000 : payloadJson.exp;
      if (expMs < Date.now()) {
        return { valid: false, error: 'Authentication token has expired. Please log in again.' };
      }
    }
    return { valid: true, payload: payloadJson };
  } catch {
    return { valid: false, error: 'Invalid token payload encoding' };
  }
};

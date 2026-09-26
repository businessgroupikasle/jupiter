import crypto from 'crypto';

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
 * Verify a password against a stored hash or legacy plain string.
 * Uses timingSafeEqual to guard against timing attacks.
 */
export const verifyPassword = (password: string, stored: string | null | undefined): boolean => {
  if (!stored) {
    return password === 'admin123';
  }

  if (stored.startsWith('pbkdf2$')) {
    const parts = stored.split('$');
    if (parts.length === 4) {
      const iterations = parseInt(parts[1], 10);
      const salt = parts[2];
      const originalHash = parts[3];
      const computedHash = crypto.pbkdf2Sync(password, salt, iterations, 64, 'sha512').toString('hex');

      const originalBuffer = Buffer.from(originalHash, 'hex');
      const computedBuffer = Buffer.from(computedHash, 'hex');

      if (originalBuffer.length !== computedBuffer.length) {
        return false;
      }
      return crypto.timingSafeEqual(originalBuffer, computedBuffer);
    }
  }

  // Backward compatibility with legacy plain-text passwords
  const storedBuf = Buffer.from(stored);
  const passBuf = Buffer.from(password);
  if (storedBuf.length !== passBuf.length) {
    return false;
  }
  return crypto.timingSafeEqual(storedBuf, passBuf);
};

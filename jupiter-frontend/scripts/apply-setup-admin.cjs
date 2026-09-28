const fs = require('fs');
const path = require('path');

const backendDir = path.resolve(__dirname, '../../jupiter-backend');

// 1. Update src/utils/security.ts to use bcryptjs
const securityPath = path.join(backendDir, 'src/utils/security.ts');
const securityContent = `import crypto from 'crypto';
import bcrypt from 'bcryptjs';
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
 * Securely hash a password using bcrypt with salt factor 10.
 */
export const hashPassword = (password: string): string => {
  return bcrypt.hashSync(password, 10);
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
 * Verify a password against a stored hash (bcrypt or PBKDF2) or environment password.
 * NEVER hardcodes passwords in code.
 */
export const verifyPassword = (password: string, stored: string | null | undefined): boolean => {
  if (!password) return false;

  // 1. bcrypt hash verification ($2a$, $2b$, $2y$)
  if (stored && (stored.startsWith('$2a$') || stored.startsWith('$2b$') || stored.startsWith('$2y$'))) {
    try {
      return bcrypt.compareSync(password, stored);
    } catch {
      return false;
    }
  }

  // 2. PBKDF2 hash backward compatibility
  if (stored && stored.startsWith('pbkdf2')) {
    const parts = stored.split('$');
    if (parts.length >= 3) {
      try {
        const salt = parts[parts.length - 2];
        const originalHash = parts[parts.length - 1];
        const iterations = 100000;
        const computedHash = crypto.pbkdf2Sync(password, salt, iterations, 64, 'sha512').toString('hex');
        const origBuf = Buffer.from(originalHash, 'hex');
        const compBuf = Buffer.from(computedHash, 'hex');
        if (origBuf.length === compBuf.length && crypto.timingSafeEqual(origBuf, compBuf)) {
          return true;
        }
      } catch {}
    }
  }

  // 3. Stored plain string backward compatibility
  if (stored && stored.length > 0) {
    return timingSafeCompare(password, stored);
  }

  // 4. Fallback to environment-based secret if configured (no hardcoded password)
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
  const signature = crypto.createHmac('sha256', secret).update(\`\${header}.\${payload}\`).digest('base64url');
  return \`\${header}.\${payload}.\${signature}\`;
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
  const expectedSig = crypto.createHmac('sha256', secret).update(\`\${headerB64}.\${payloadB64}\`).digest('base64url');

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
`;
fs.writeFileSync(securityPath, securityContent, 'utf8');
console.log('Updated src/utils/security.ts with bcryptjs');

// 2. Create src/scripts/setupAdmin.ts
const scriptsDir = path.join(backendDir, 'src/scripts');
if (!fs.existsSync(scriptsDir)) {
  fs.mkdirSync(scriptsDir, { recursive: true });
}

const setupAdminTsPath = path.join(scriptsDir, 'setupAdmin.ts');
const setupAdminTsContent = `import dotenv from 'dotenv';
dotenv.config();

import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../utils/security';

const prisma = new PrismaClient();

export async function setupAdmin(): Promise<void> {
  const email = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!email) {
    console.error('❌ Error: ADMIN_EMAIL environment variable is required.');
    console.error('   Usage: ADMIN_EMAIL="admin@jupiter.com" ADMIN_PASSWORD="your-secure-password" npm run admin:setup');
    process.exit(1);
  }

  if (!password || !password.trim()) {
    console.error('❌ Error: ADMIN_PASSWORD environment variable is required.');
    console.error('   Usage: ADMIN_EMAIL="admin@jupiter.com" ADMIN_PASSWORD="your-secure-password" npm run admin:setup');
    process.exit(1);
  }

  console.log(\`🔒 Configuring Admin user for email: \${email}\`);

  // Hash password using the exact same bcrypt method used by the login controller
  const hashedPassword = hashPassword(password.trim());

  // Check if admin user already exists
  const existingUser = await prisma.user.findFirst({
    where: {
      email: { equals: email, mode: 'insensitive' }
    }
  });

  if (existingUser) {
    const updated = await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        role: 'Super Admin',
        status: 'Active',
        password: hashedPassword,
        updatedAt: new Date()
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        updatedAt: true
      }
    });
    console.log('✅ Admin user credentials updated successfully:');
    console.log(JSON.stringify(updated, null, 2));
  } else {
    const created = await prisma.user.create({
      data: {
        name: 'Jupiter Admin',
        email: email,
        role: 'Super Admin',
        status: 'Active',
        password: hashedPassword,
        phone: '+91 93429 19060'
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        createdAt: true
      }
    });
    console.log('✅ Admin user created successfully:');
    console.log(JSON.stringify(created, null, 2));
  }

  await prisma.$disconnect();
}

if (require.main === module) {
  setupAdmin().catch((err) => {
    console.error('❌ Failed to setup admin user:', err);
    process.exit(1);
  });
}
`;
fs.writeFileSync(setupAdminTsPath, setupAdminTsContent, 'utf8');
console.log('Created src/scripts/setupAdmin.ts');

// 3. Add scripts to package.json
const pkgPath = path.join(backendDir, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
pkg.scripts = pkg.scripts || {};
pkg.scripts['admin:setup'] = 'ts-node src/scripts/setupAdmin.ts';
pkg.scripts['admin:setup:prod'] = 'node dist/scripts/setupAdmin.js';
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), 'utf8');
console.log('Added admin:setup and admin:setup:prod to package.json');

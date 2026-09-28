import dotenv from 'dotenv';
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

  console.log(`🔒 Configuring Admin user for email: ${email}`);

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

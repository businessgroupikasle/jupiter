import { createApp } from './app';
import { env } from './config/env';
import { PrismaClient } from '@prisma/client';
import { seedDatabase } from '../prisma/seed';

const prisma = new PrismaClient();
const app = createApp();

const autoSeedIfEmpty = async () => {
  try {
    const productCount = await prisma.product.count();
    if (productCount === 0) {
      console.log('⚡ Database empty. Automatically seeding catalog and initial data...');
      await seedDatabase();
    } else {
      console.log(`📊 Database connected. Found ${productCount} products in catalog.`);
    }
  } catch (err: any) {
    console.warn('⚠️ Note on Database:', err.message);
  }
};

const server = app.listen(env.PORT, async () => {
  console.log(`
  🚀 Jupiter Industries API Server Running
  📡 Local:    http://localhost:${env.PORT}
  🩺 Health:   http://localhost:${env.PORT}/api/health
  📝 Enquiry:  http://localhost:${env.PORT}/api/enquiries
  🛡️ Environment: ${env.NODE_ENV}
  `);

  await autoSeedIfEmpty();
});

// Graceful shutdown
const shutdown = () => {
  console.log('Shutting down server...');
  server.close(() => {
    console.log('Server closed successfully.');
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);


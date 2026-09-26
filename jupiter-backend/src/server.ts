import { createApp } from './app';
import { env } from './config/env';
import { PrismaClient } from '@prisma/client';

import { ensureEnquiryCounterInitialized } from './controllers/enquiryController';
import { normalizeProductOrders } from './controllers/productController';

const prisma = new PrismaClient();
const app = createApp();

const checkDatabaseStatus = async () => {
  try {
    const [productCount, projectCount, galleryCount, videoCount, enquiryCount] = await Promise.all([
      prisma.product.count().catch(() => 0),
      prisma.project.count().catch(() => 0),
      prisma.galleryPhoto.count().catch(() => 0),
      prisma.video.count().catch(() => 0),
      prisma.enquiry.count().catch(() => 0),
    ]);

    await ensureEnquiryCounterInitialized();
    await normalizeProductOrders();

    console.log(`📊 Database connected. Catalog has ${productCount} products, ${projectCount} projects, ${galleryCount} gallery items, ${videoCount} videos, ${enquiryCount} enquiries.`);
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

  await checkDatabaseStatus();
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


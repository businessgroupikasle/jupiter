import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function migrate() {
  console.log('Running non-destructive migration...');

  // 1. Create Media table if not exists
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Media" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "filename" TEXT NOT NULL,
      "mimeType" TEXT NOT NULL DEFAULT 'image/jpeg',
      "size" INTEGER NOT NULL,
      "data" BYTEA NOT NULL,
      "url" TEXT NOT NULL,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "productId" TEXT REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE,
      "videoId" TEXT REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE
    );
  `);
  console.log('Media table checked/created.');

  // Create indexes
  await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "Media_productId_idx" ON "Media"("productId");`);
  await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "Media_videoId_idx" ON "Media"("videoId");`);
  await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "Media_filename_idx" ON "Media"("filename");`);
  console.log('Media indexes checked/created.');

  // 2. Add location and machine columns to Enquiry if not exists
  await prisma.$executeRawUnsafe(`ALTER TABLE "Enquiry" ADD COLUMN IF NOT EXISTS "location" TEXT DEFAULT 'Pan India';`);
  await prisma.$executeRawUnsafe(`ALTER TABLE "Enquiry" ADD COLUMN IF NOT EXISTS "machine" TEXT;`);
  console.log('Enquiry columns checked/created.');

  await prisma.$disconnect();
}

migrate().catch(e => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});

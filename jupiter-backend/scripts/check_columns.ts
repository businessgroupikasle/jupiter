import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function checkColumns() {
  const result = await prisma.$queryRawUnsafe(`
    SELECT column_name, data_type, is_nullable 
    FROM information_schema.columns 
    WHERE table_name = 'Enquiry' OR table_name = 'enquiry';
  `);
  console.log('Enquiry columns:', result);

  const productCols = await prisma.$queryRawUnsafe(`
    SELECT column_name, data_type, is_nullable 
    FROM information_schema.columns 
    WHERE table_name = 'Product' OR table_name = 'product';
  `);
  console.log('Product columns:', productCols);

  const videoCols = await prisma.$queryRawUnsafe(`
    SELECT column_name, data_type, is_nullable 
    FROM information_schema.columns 
    WHERE table_name = 'Video' OR table_name = 'video';
  `);
  console.log('Video columns:', videoCols);

  const allTables = await prisma.$queryRawUnsafe(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public';
  `);
  console.log('All public tables:', allTables);

  await prisma.$disconnect();
}

checkColumns().catch(e => {
  console.error(e);
  prisma.$disconnect();
});

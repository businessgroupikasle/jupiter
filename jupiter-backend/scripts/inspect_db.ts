import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function inspectDb() {
  console.log('=== DB INSPECTION ===');
  
  // Enquiries
  const enquiries = await prisma.enquiry.findMany();
  console.log(`\n--- Existing Enquiries (${enquiries.length}) ---`);
  enquiries.forEach(e => console.log(JSON.stringify(e)));

  // Users
  const users = await prisma.user.findMany();
  console.log(`\n--- Existing Users (${users.length}) ---`);
  users.forEach(u => console.log({ id: u.id, email: u.email, name: u.name, role: u.role, status: u.status }));

  // Videos
  const videos = await prisma.video.findMany();
  console.log(`\n--- Existing Videos (${videos.length}) ---`);
  videos.forEach(v => console.log({ id: v.id, title: v.title, videoUrl: v.videoUrl, image: v.image }));

  // Products
  const products = await prisma.product.findMany({
    select: { id: true, name: true, slug: true, category: true, order: true, isActive: true, image: true },
    orderBy: { order: 'asc' }
  });
  console.log(`\n--- Existing Products (${products.length}) ---`);
  products.forEach(p => console.log(`${p.order}. [${p.category}] ${p.name} (id: ${p.id}, slug: ${p.slug}, active: ${p.isActive})`));

  await prisma.$disconnect();
}

inspectDb().catch(e => {
  console.error(e);
  prisma.$disconnect();
});

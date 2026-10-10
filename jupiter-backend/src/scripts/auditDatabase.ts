import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('--- DATABASE AUDIT ---');

  const products = await prisma.product.findMany();
  console.log(`Total Products: ${products.length}`);
  for (const p of products) {
    console.log(`Product: id=${p.id}, slug="${p.slug}", name="${p.name}", category="${p.category}", isActive=${p.isActive}`);
  }

  const blogs = await prisma.blog.findMany();
  console.log(`\nTotal Blogs: ${blogs.length}`);
  for (const b of blogs) {
    console.log(`Blog: id=${b.id}, slug="${b.slug}", title="${b.title}", category="${b.category}"`);
  }

  const projects = await prisma.project.findMany();
  console.log(`\nTotal Projects: ${projects.length}`);
  for (const pr of projects) {
    console.log(`Project: id=${pr.id}, title="${pr.title}", client="${pr.client}", location="${pr.location}"`);
  }

  const deliveryLocations = await prisma.deliveryLocation.findMany();
  console.log(`\nTotal Delivery Locations: ${deliveryLocations.length}`);

  const faqs = await prisma.faq.findMany();
  console.log(`\nTotal FAQs: ${faqs.length}`);

  const reviews = await prisma.review.findMany();
  console.log(`\nTotal Reviews: ${reviews.length}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

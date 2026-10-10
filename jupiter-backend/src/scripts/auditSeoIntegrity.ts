import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function auditSeoIntegrity() {
  console.log('=== TECHNICAL SEO & DATABASE INTEGRITY AUDIT ===\n');

  // 1. Audit Products
  const products = await prisma.product.findMany();
  console.log(`[PRODUCTS AUDIT] Total Products: ${products.length}`);
  const productSlugs = new Set<string>();
  const duplicateProductSlugs: string[] = [];
  const invalidProductSlugs: string[] = [];

  for (const p of products) {
    if (productSlugs.has(p.slug)) {
      duplicateProductSlugs.push(p.slug);
    }
    productSlugs.add(p.slug);

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug)) {
      invalidProductSlugs.push(`ID ${p.id}: "${p.slug}"`);
    }

    console.log(`- Product "${p.name}" | Slug: "${p.slug}" | Active: ${p.isActive} | Category: "${p.category}"`);
  }

  if (duplicateProductSlugs.length > 0) {
    console.warn('  ⚠️ Duplicate product slugs found:', duplicateProductSlugs);
  } else {
    console.log('  ✅ Product slug uniqueness: PASS (All product slugs are unique)');
  }

  if (invalidProductSlugs.length > 0) {
    console.warn('  ⚠️ Non-canonical product slugs found:', invalidProductSlugs);
  } else {
    console.log('  ✅ Product slug format: PASS (All product slugs follow canonical URL pattern)');
  }

  // 2. Audit Blogs
  const blogs = await prisma.blog.findMany();
  console.log(`\n[BLOGS AUDIT] Total Blogs: ${blogs.length}`);
  const blogSlugs = new Set<string>();
  const duplicateBlogSlugs: string[] = [];
  const invalidBlogSlugs: string[] = [];

  for (const b of blogs) {
    if (blogSlugs.has(b.slug)) {
      duplicateBlogSlugs.push(b.slug);
    }
    blogSlugs.add(b.slug);

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(b.slug)) {
      invalidBlogSlugs.push(`ID ${b.id}: "${b.slug}"`);
    }

    console.log(`- Blog "${b.title}" | Slug: "${b.slug}" | Category: "${b.category}"`);
  }

  if (duplicateBlogSlugs.length > 0) {
    console.warn('  ⚠️ Duplicate blog slugs found:', duplicateBlogSlugs);
  } else {
    console.log('  ✅ Blog slug uniqueness: PASS (No duplicate blog slugs)');
  }

  // 3. Audit Projects
  const projects = await prisma.project.findMany();
  console.log(`\n[PROJECTS AUDIT] Total Projects: ${projects.length}`);

  // 4. Audit Uploads & Assets
  const fs = require('fs');
  const path = require('path');
  const uploadsDir = path.join(process.cwd(), 'uploads');
  const productsUploadsDir = path.join(uploadsDir, 'products');

  console.log(`\n[UPLOADS AUDIT]`);
  console.log(`- Uploads dir exists: ${fs.existsSync(uploadsDir)}`);
  console.log(`- Products uploads dir exists: ${fs.existsSync(productsUploadsDir)}`);

  console.log('\n=== AUDIT COMPLETE ===');
}

auditSeoIntegrity()
  .catch((err) => {
    console.error('Audit error:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

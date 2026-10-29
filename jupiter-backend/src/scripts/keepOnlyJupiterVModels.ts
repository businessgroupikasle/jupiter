import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const KEEP_IDS = [
  'cmus_jupiter_v10b_model',
  'cmus_jupiter_v12b_model',
  'cmus8mqtn000bkwtfhsvexaxi',
];

async function main() {
  console.log('=== CLEANING DATABASE: KEEPING ONLY THE 3 JUPITER V MODELS ===\n');

  try {
    const totalBefore = await prisma.product.count();
    console.log(`Total products in database before cleanup: ${totalBefore}`);

    const toDelete = await prisma.product.findMany({
      where: {
        id: { notIn: KEEP_IDS },
      },
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });

    console.log(`Found ${toDelete.length} products to delete:`);
    toDelete.forEach((p, i) => {
      console.log(`  ${i + 1}. [${p.id}] ${p.name} (${p.slug})`);
    });

    if (toDelete.length > 0) {
      // Delete detail items, images, and media belonging to these products
      const deleteIds = toDelete.map(p => p.id);
      
      await prisma.productDetailItem.deleteMany({
        where: { productId: { in: deleteIds } },
      });
      await prisma.productImage.deleteMany({
        where: { productId: { in: deleteIds } },
      });
      await prisma.media.deleteMany({
        where: { productId: { in: deleteIds } },
      });
      
      const deleteResult = await prisma.product.deleteMany({
        where: { id: { in: deleteIds } },
      });
      console.log(`\nSuccessfully deleted ${deleteResult.count} products from database.`);
    } else {
      console.log('\nNo extra products to delete.');
    }

    // Verify remaining products
    const remaining = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        order: true,
      },
      orderBy: { order: 'asc' },
    });

    console.log(`\nRemaining products in database (${remaining.length}):`);
    remaining.forEach((p, i) => {
      console.log(`  ${i + 1}. [${p.id}] ${p.name} (order=${p.order})`);
    });

    console.log('\n=== DATABASE CLEANUP COMPLETE ===');
  } catch (err: any) {
    console.error('Error during cleanup:', err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();

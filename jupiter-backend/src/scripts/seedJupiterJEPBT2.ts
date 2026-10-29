import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const backendProductsUploads = path.resolve('d:/Project/jupiter/jupiter-backend/uploads/products');

export const JUPITER_JE_PBT2_DATA = {
  id: 'cmus_jupiter_je_pbt2_model',
  name: 'Jupiter JE PBT2 – Paver Block Making Machine',
  slug: 'je-pbt2-paver-block-making-machine',
  category: 'Paver Block Making Machine',
  description: `The Jupiter JE PBT2 Paver Block Making Machine is designed for commercial concrete paver block and tile manufacturing, providing a vibration-based moulding system for production requirements.

Equipped with a 3 + 2 HP motor configuration, the machine offers a production capacity of approximately 2,000 square feet per shift, making it suitable for paver block manufacturing operations.

The machine features a 600 × 600 mm moulding area and an 835 × 3000 mm vibrating table to support the paver forming process.

Its vibration-based movement system operates with manual intervention and uses rubber or PVC moulds positioned on the table during production.

The forming system supports tiles with a maximum height of 100 mm, providing flexibility for different paver block manufacturing requirements.

With its vibrating table arrangement, mould compatibility and specified production capacity, the Jupiter JE PBT2 offers a practical solution for businesses involved in concrete paving block and tile production.`,
  capacity: '2,000 Sq. Ft. per Shift',
  capacityLabel: 'Production Capacity',
  power: '3 + 2 HP (Specified Motor Capacity)',
  powerLabel: 'Total Connected Power',
  brickSize: '600 × 600 mm Moulding Area',
  brickSizeLabel: 'Brick / Mould Size',
  image: '/uploads/products/jupiter-je-pbt2-paver-block-machine.jpg',
  imageUrl: '/uploads/products/jupiter-je-pbt2-paver-block-machine.jpg',
  brandTag: 'JUPITER INDUSTRIES',
  status: 'Active',
  isActive: true,
  order: 10,
  featureBadges: [
    '2,000 Sq. Ft./Shift',
    '3 + 2 HP Motor Capacity',
    'Vibrating Table System',
    '100 mm Maximum Tile Height',
  ],
  highlights: [
    {
      id: 'hl-pbt2-1',
      title: 'Efficient Paver Block Production',
      description:
        'Delivers a production capacity of approximately 2,000 square feet per shift to support commercial paver block and tile manufacturing requirements.',
      displayOrder: 1,
    },
    {
      id: 'hl-pbt2-2',
      title: 'Vibrating Table Moulding System',
      description:
        'Features an 835 × 3000 mm vibrating table and 600 × 600 mm moulding area to support vibration-based paver block formation.',
      displayOrder: 2,
    },
    {
      id: 'hl-pbt2-3',
      title: 'Rubber & PVC Mould Compatibility',
      description:
        'Designed for use with rubber or PVC moulds during the vibration-based forming process, supporting different paver manufacturing requirements.',
      displayOrder: 3,
    },
    {
      id: 'hl-pbt2-4',
      title: '3 + 2 HP Motor Configuration',
      description:
        'Equipped with a specified 3 + 2 HP motor capacity and vibration-based movement with manual intervention.',
      displayOrder: 4,
    },
  ],
  specTableColumns: ['Parameter', 'Details', 'Specification'],
  specTableRows: [
    { Parameter: 'Machine Model', Details: 'Jupiter JE PBT2', Specification: 'Paver Block Making Machine' },
    { Parameter: 'Machine Type', Details: 'Vibrating Table Machine', Specification: 'Paver Block Production' },
    { Parameter: 'Production Capacity', Details: '2,000 Sq. Ft.', Specification: 'Per Shift' },
    { Parameter: 'Motor Capacity', Details: '3 + 2 HP', Specification: '—' },
    { Parameter: 'Moulding Area', Details: '600 × 600 mm', Specification: '—' },
    { Parameter: 'Vibrating Table Size', Details: '835 × 3000 mm', Specification: '—' },
    { Parameter: 'Method of Movement', Details: 'Vibration-Based', Specification: 'Manual Intervention' },
    { Parameter: 'Mould Type', Details: 'Rubber / PVC', Specification: '—' },
    { Parameter: 'Moulding Arrangement', Details: 'Rubber Table', Specification: '—' },
    { Parameter: 'Maximum Tile Height', Details: '100 mm', Specification: '—' },
  ],
  keyFeatures: [
    'Jupiter JE PBT2 Paver Block Making Machine with a production capacity of approximately 2,000 square feet per shift.',
    '3 + 2 HP motor configuration with an 835 × 3000 mm vibrating table for paver block manufacturing.',
    '600 × 600 mm moulding area with rubber and PVC mould compatibility for vibration-based forming operations.',
    'Supports tiles up to 100 mm in height with vibration-based movement and manual intervention.',
  ],
  advantages: [
    {
      id: 'adv-pbt2-1',
      title: 'Commercial Paver Block Production',
      description:
        'Supports paver block and tile manufacturing with a production capacity of up to 2,000 square feet per shift for commercial operations.',
      displayOrder: 1,
    },
    {
      id: 'adv-pbt2-2',
      title: 'Effective Vibration-Based Moulding',
      description:
        'The vibrating table system supports the forming process using rubber or PVC moulds, helping manage paver block production.',
      displayOrder: 2,
    },
    {
      id: 'adv-pbt2-3',
      title: 'Flexible Moulding Applications',
      description:
        'A 600 × 600 mm moulding area and support for tiles up to 100 mm in height accommodate different paver block manufacturing requirements.',
      displayOrder: 3,
    },
    {
      id: 'adv-pbt2-4',
      title: 'Practical Machine Operation',
      description:
        'Combines a 3 + 2 HP motor configuration with vibration-based movement and manual intervention for paver block production.',
      displayOrder: 4,
    },
  ],
  seoMetaTitle: 'JE PBT2 Paver Block Making Machine | Jupiter Industries',
  seoMetaDescription:
    'Explore the Jupiter JE PBT2 Paver Block Making Machine with a vibrating table, 600 × 600 mm moulding area and production capacity of 2,000 sq. ft. per shift.',
  focusKeyword: 'JE PBT2 Paver Block Making Machine',
  secondaryKeywords:
    'Paver Block Making Machine, Concrete Paver Block Machine, Vibrating Table Paver Machine, Paver Tile Making Machine, Rubber Mould Paver Block Machine, Paver Block Manufacturing Machine, Paver Block Machine Manufacturer',
};

async function persistJEPBT2() {
  console.log('--- SEEDING JUPITER JE PBT2 PAVER BLOCK MAKING MACHINE INTO DATABASE ---');

  const prodData = JUPITER_JE_PBT2_DATA;

  const specsPayload: Record<string, any> = {
    brandTag: prodData.brandTag,
    capacity: prodData.capacity,
    capacityLabel: prodData.capacityLabel,
    power: prodData.power,
    powerLabel: prodData.powerLabel,
    brickSize: prodData.brickSize,
    brickSizeLabel: prodData.brickSizeLabel,
    featureBadges: prodData.featureBadges,
    highlights: prodData.highlights,
    specTableColumns: prodData.specTableColumns,
    specTableRows: prodData.specTableRows,
    keyFeatures: prodData.keyFeatures,
    advantages: prodData.advantages,
    galleryImages: [],
    metaTitle: prodData.seoMetaTitle,
    metaDescription: prodData.seoMetaDescription,
    seoMetaTitle: prodData.seoMetaTitle,
    seoMetaDescription: prodData.seoMetaDescription,
    focusKeyword: prodData.focusKeyword,
    secondaryKeywords: prodData.secondaryKeywords,
    status: prodData.status,
    order: prodData.order,
  };

  const existing = await prisma.product.findFirst({
    where: {
      OR: [
        { id: prodData.id },
        { slug: prodData.slug },
      ],
    },
  });

  let productRecord;
  if (existing) {
    productRecord = await prisma.$transaction(async (tx) => {
      const p = await tx.product.update({
        where: { id: existing.id },
        data: {
          name: prodData.name,
          slug: prodData.slug,
          category: prodData.category,
          description: prodData.description,
          capacity: prodData.capacity,
          power: prodData.power,
          brickSize: prodData.brickSize,
          image: prodData.image,
          specifications: specsPayload,
          isActive: prodData.isActive,
          order: prodData.order,
        },
      });

      // ProductImage sync
      await tx.productImage.deleteMany({ where: { productId: existing.id } });
      await tx.productImage.create({
        data: {
          productId: existing.id,
          url: prodData.image,
          isPrimary: true,
          order: 0,
        },
      });

      // ProductDetailItem sync
      await tx.productDetailItem.deleteMany({ where: { productId: existing.id } });
      const detailItems: any[] = [];
      prodData.highlights.forEach((h, idx) => {
        detailItems.push({ productId: existing.id, type: 'Highlight', title: h.title, description: h.description, order: idx });
      });
      prodData.advantages.forEach((a, idx) => {
        detailItems.push({ productId: existing.id, type: 'Advantage', title: a.title, description: a.description, order: idx });
      });
      prodData.keyFeatures.forEach((f, idx) => {
        detailItems.push({ productId: existing.id, type: 'KeyFeature', title: f, order: idx });
      });
      prodData.featureBadges.forEach((b, idx) => {
        detailItems.push({ productId: existing.id, type: 'FeatureBadge', title: b, order: idx });
      });
      prodData.specTableRows.forEach((r, idx) => {
        detailItems.push({
          productId: existing.id,
          type: 'Specification',
          title: r.Parameter,
          value: r.Details || '',
          description: r.Specification || null,
          order: idx,
        });
      });
      if (detailItems.length > 0) {
        await tx.productDetailItem.createMany({ data: detailItems });
      }

      return p;
    });
    console.log(`[Database Seed] Updated: ${productRecord.name} (id=${productRecord.id})`);
  } else {
    productRecord = await prisma.$transaction(async (tx) => {
      const p = await tx.product.create({
        data: {
          id: prodData.id,
          name: prodData.name,
          slug: prodData.slug,
          category: prodData.category,
          description: prodData.description,
          capacity: prodData.capacity,
          power: prodData.power,
          brickSize: prodData.brickSize,
          image: prodData.image,
          isActive: prodData.isActive,
          order: prodData.order,
          specifications: specsPayload,
          images: {
            create: [
              {
                url: prodData.image,
                isPrimary: true,
                order: 0,
              },
            ],
          },
        },
      });

      const detailItems: any[] = [];
      prodData.highlights.forEach((h, idx) => {
        detailItems.push({ productId: p.id, type: 'Highlight', title: h.title, description: h.description, order: idx });
      });
      prodData.advantages.forEach((a, idx) => {
        detailItems.push({ productId: p.id, type: 'Advantage', title: a.title, description: a.description, order: idx });
      });
      prodData.keyFeatures.forEach((f, idx) => {
        detailItems.push({ productId: p.id, type: 'KeyFeature', title: f, order: idx });
      });
      prodData.featureBadges.forEach((b, idx) => {
        detailItems.push({ productId: p.id, type: 'FeatureBadge', title: b, order: idx });
      });
      prodData.specTableRows.forEach((r, idx) => {
        detailItems.push({
          productId: p.id,
          type: 'Specification',
          title: r.Parameter,
          value: r.Details || '',
          description: r.Specification || null,
          order: idx,
        });
      });
      if (detailItems.length > 0) {
        await tx.productDetailItem.createMany({ data: detailItems });
      }

      return p;
    });
    console.log(`[Database Seed] Created: ${productRecord.name} (id=${productRecord.id})`);
  }

  // Backup image into durable prisma.media if file exists on disk
  const filename = path.basename(prodData.image);
  const diskPath = path.join(backendProductsUploads, filename);
  if (fs.existsSync(diskPath)) {
    const fileBuf = fs.readFileSync(diskPath);
    await prisma.media.upsert({
      where: { id: `media_${productRecord.id}` },
      create: {
        id: `media_${productRecord.id}`,
        filename,
        mimeType: 'image/jpeg',
        size: fileBuf.length,
        data: fileBuf,
        url: prodData.image,
        productId: productRecord.id,
      },
      update: {
        filename,
        mimeType: 'image/jpeg',
        size: fileBuf.length,
        data: fileBuf,
        url: prodData.image,
      },
    });
    console.log(`[Database Seed] Backed up ${filename} (${fileBuf.length} bytes) to Media table`);
  }

  console.log('--- JUPITER JE PBT2 PAVER BLOCK MAKING MACHINE SUCCESSFULLY PERSISTED IN DATABASE ---');
}

persistJEPBT2()
  .catch((err) => {
    console.error('Seed error:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

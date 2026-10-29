import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const backendProductsUploads = path.resolve('d:/Project/jupiter/jupiter-backend/uploads/products');

export const JUPITER_HDM800_DATA = {
  id: 'cmus_jupiter_hdm800_model',
  name: 'Jupiter HDM 800 – Hollow & Solid Block Making Machine',
  slug: 'jupiter-hdm-800-hollow-solid-block-making-machine',
  category: 'Hollow & Solid Block Machine',
  description: `The Jupiter HDM 800 Hollow and Solid Block Making Machine is an industrial block manufacturing machine designed for producing different sizes of hollow and solid concrete blocks.

Equipped with a 24 HP three-phase power configuration, the machine delivers a production capacity of approximately 80 to 90 strokes per hour, supporting commercial block manufacturing requirements.

The machine features two 3 HP ram vibrators and two 5 HP mould vibrators, providing a specified vibration frequency of 6,000 vibrations per minute (VPM).

Its adjustable vibration amplitude of 1–2 mm allows operators to adjust vibration settings according to production requirements.

The hydraulic system operates with a 7.5 HP motor, supporting the machine's hydraulic functions during the block manufacturing process.

The Jupiter HDM 800 supports multiple block dimensions, including 200 × 200 × 400 mm, 150 × 200 × 400 mm and 100 × 200 × 400 mm, with production outputs of 16, 10 and 8 blocks per stroke respectively.

With its hydraulic system, multiple vibrators and adjustable vibration settings, the Jupiter HDM 800 is designed to support hollow and solid block production for construction material manufacturers.`,
  capacity: '80–90 Strokes per Hour',
  capacityLabel: 'Production Capacity',
  power: '24 HP / 3 Phase (specified power)',
  powerLabel: 'Total Connected Power',
  brickSize: '200 × 200 × 400 mm, 150 × 200 × 400 mm, 100 × 200 × 400 mm',
  brickSizeLabel: 'Block / Mould Size',
  image: '/uploads/products/Jupiter-Industries-Green-Block-Machine-1791953751046-607639876.png',
  imageUrl: '/uploads/products/Jupiter-Industries-Green-Block-Machine-1791953751046-607639876.png',
  brandTag: 'JUPITER INDUSTRIES',
  status: 'Active',
  isActive: true,
  order: 8,
  featureBadges: [
    '80–90 Strokes/Hour',
    '24 HP 3-Phase Power',
    '6,000 VPM Vibration',
    'Hollow & Solid Blocks',
  ],
  highlights: [
    {
      id: 'hl-hdm800-1',
      title: 'Hollow & Solid Block Production',
      description:
        'Designed for manufacturing hollow and solid concrete blocks in multiple sizes to support different construction material requirements.',
      displayOrder: 1,
    },
    {
      id: 'hl-hdm800-2',
      title: 'High-Frequency Vibration System',
      description:
        'Features two ram vibrators and two mould vibrators with a specified vibration frequency of 6,000 VPM for block moulding operations.',
      displayOrder: 2,
    },
    {
      id: 'hl-hdm800-3',
      title: 'Multiple Block Size Configurations',
      description:
        'Supports three block sizes with production capacities of 16, 10 and 8 blocks per stroke, depending on the selected mould configuration.',
      displayOrder: 3,
    },
    {
      id: 'hl-hdm800-4',
      title: 'Hydraulic System with Adjustable Vibration',
      description:
        'Features a 7.5 HP hydraulic system and adjustable vibration amplitude of 1–2 mm to support controlled block manufacturing operations.',
      displayOrder: 4,
    },
  ],
  specTableColumns: ['Parameter', 'Details', 'Specification'],
  specTableRows: [
    { Parameter: 'Machine Model', Details: 'Jupiter HDM 800', Specification: 'Hollow & Solid Block Machine' },
    { Parameter: 'Machine Type', Details: 'Block Making Machine', Specification: 'Hollow & Solid Blocks' },
    { Parameter: 'Production Capacity', Details: '80–90', Specification: 'Strokes per Hour' },
    { Parameter: 'Power', Details: '24 HP', Specification: '3 Phase' },
    { Parameter: 'Ram Vibrator', Details: '3 HP × 2', Specification: '2 Nos' },
    { Parameter: 'Mould Vibrator', Details: '5 HP × 2', Specification: '2 Nos' },
    { Parameter: 'Hydraulic System', Details: '7.5 HP × 1', Specification: '1 No' },
    { Parameter: 'Vibration Frequency', Details: '6,000', Specification: 'VPM' },
    { Parameter: 'Vibration Amplitude', Details: '1–2 mm', Specification: 'Adjustable' },
    { Parameter: 'Moulding Area', Details: '860–900 mm', Specification: 'As Specified' },
    { Parameter: 'Block Size', Details: '200 × 200 × 400 mm', Specification: '16 Blocks/Stroke' },
    { Parameter: 'Block Size', Details: '150 × 200 × 400 mm', Specification: '10 Blocks/Stroke' },
    { Parameter: 'Block Size', Details: '100 × 200 × 400 mm', Specification: '8 Blocks/Stroke' },
    { Parameter: 'Block Types', Details: 'Hollow Blocks', Specification: 'Solid Blocks' },
  ],
  keyFeatures: [
    'Jupiter HDM 800 hollow and solid block making machine with a production capacity of 80 to 90 strokes per hour.',
    '24 HP three-phase power configuration with two 3 HP ram vibrators and two 5 HP mould vibrators.',
    'High-frequency vibration system delivering 6,000 VPM with an adjustable amplitude of 1–2 mm.',
    '7.5 HP hydraulic system supporting three block configurations with 16, 10 and 8 blocks per stroke.',
  ],
  advantages: [
    {
      id: 'adv-hdm800-1',
      title: 'Versatile Block Manufacturing',
      description:
        'Supports the production of hollow and solid blocks in three different sizes, allowing manufacturers to accommodate varied construction material requirements.',
      displayOrder: 1,
    },
    {
      id: 'adv-hdm800-2',
      title: 'High-Frequency Vibration Performance',
      description:
        'Dual ram vibrators and dual mould vibrators provide a vibration frequency of 6,000 VPM to support the block moulding process.',
      displayOrder: 2,
    },
    {
      id: 'adv-hdm800-3',
      title: 'Flexible Production Capacity',
      description:
        'Offers production of 8 to 16 blocks per stroke depending on mould size, with an operating capacity of 80 to 90 strokes per hour.',
      displayOrder: 3,
    },
    {
      id: 'adv-hdm800-4',
      title: 'Adjustable Hydraulic & Vibration Operation',
      description:
        'Combines a 7.5 HP hydraulic system with adjustable vibration amplitude to support controlled block manufacturing across different mould configurations.',
      displayOrder: 4,
    },
  ],
  seoMetaTitle: 'Jupiter HDM 800 Hollow & Solid Block Machine | Jupiter Industries',
  seoMetaDescription:
    'Explore the Jupiter HDM 800 Hollow & Solid Block Making Machine with 24 HP 3-phase power, 6,000 VPM vibration and 80–90 strokes per hour.',
  focusKeyword: 'Jupiter HDM 800 Hollow and Solid Block Making Machine',
  secondaryKeywords:
    'Hollow Block Making Machine, Solid Block Making Machine, Hydraulic Block Making Machine, Concrete Block Making Machine, HDM 800 Block Machine, Industrial Block Making Machine, Vibrator Block Making Machine',
};

async function persistHDM800() {
  console.log('--- SEEDING JUPITER HDM 800 MODEL INTO DATABASE ---');

  const prodData = JUPITER_HDM800_DATA;

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
        mimeType: 'image/png',
        size: fileBuf.length,
        data: fileBuf,
        url: prodData.image,
        productId: productRecord.id,
      },
      update: {
        filename,
        mimeType: 'image/png',
        size: fileBuf.length,
        data: fileBuf,
        url: prodData.image,
      },
    });
    console.log(`[Database Seed] Backed up ${filename} (${fileBuf.length} bytes) to Media table`);
  }

  console.log('--- JUPITER HDM 800 MODEL SUCCESSFULLY PERSISTED IN DATABASE ---');
}

persistHDM800()
  .catch((err) => {
    console.error('Seed error:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

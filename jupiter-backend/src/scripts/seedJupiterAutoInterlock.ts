import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const backendProductsUploads = path.resolve('d:/Project/jupiter/jupiter-backend/uploads/products');

export const JUPITER_AUTO_INTERLOCK_DATA = {
  id: 'cmus_jupiter_auto_interlock_model',
  name: 'Automatic Interlock Block Making Machine – Vertical Twin Station Model',
  slug: 'automatic-interlock-block-making-machine',
  category: 'Interlocking Block Making Machine',
  description: `The Jupiter Automatic Interlock Block Making Machine is a hydraulically operated, vertical twin-station machine designed for commercial and industrial interlocking brick manufacturing.

Equipped with an automatic PLC control system, the machine delivers a production capacity of approximately 200 to 250 interlocking blocks per hour, with a daily production range of 1,400 to 1,600 blocks.

The machine features two 30-ton bottom pressing units and one 25-ton top pressing cylinder, supporting hydraulic compression during the interlocking block manufacturing process.

It is powered by a 550-litre hydraulic power pack with a 15 HP Crompton motor, providing power for the machine's hydraulic operations.

The vertical twin-station configuration includes a double-sided die system manufactured using EN31-grade material for interlocking block production.

An 8-ton feeding cylinder with a 400 kg storage hopper supports material feeding into the production system.

The machine accommodates two interlocking brick dimensions, 12 × 6 × 5 inches and 12 × 8 × 5 inches, making it suitable for different interlocking brick manufacturing requirements.

With PLC automation, hydraulic pressing and a twin-station arrangement, the Jupiter Automatic Interlock Block Making Machine offers a production solution for construction material manufacturers.`,
  capacity: '200–250 Blocks per Hour / 1,400–1,600 Blocks per Day',
  capacityLabel: 'Production Capacity',
  power: 'Not specified (Power Pack Motor: 15 HP)',
  powerLabel: 'Total Connected Power',
  brickSize: '12 × 6 × 5 Inches / 12 × 8 × 5 Inches',
  brickSizeLabel: 'Brick / Mould Size',
  image: '/uploads/products/jupiter-automatic-interlock-block-machine.jpg',
  imageUrl: '/uploads/products/jupiter-automatic-interlock-block-machine.jpg',
  brandTag: 'JUPITER INDUSTRIES',
  status: 'Active',
  isActive: true,
  order: 12,
  featureBadges: [
    'Vertical Twin Station Machine',
    '200–250 Blocks/Hour',
    'Automatic PLC Control',
    'Dual Hydraulic Pressing System',
  ],
  highlights: [
    {
      id: 'hl-ai-1',
      title: 'Automatic Vertical Twin Station System',
      description:
        'Features a vertical twin-station configuration with PLC-based automatic control to support interlocking brick manufacturing operations.',
      displayOrder: 1,
    },
    {
      id: 'hl-ai-2',
      title: 'Heavy-Duty Hydraulic Pressing',
      description:
        'Equipped with two 30-ton bottom pressing units and one 25-ton top pressing cylinder for hydraulic block compression.',
      displayOrder: 2,
    },
    {
      id: 'hl-ai-3',
      title: 'High-Capacity Brick Production',
      description:
        'Delivers approximately 200 to 250 interlocking blocks per hour, with a daily production capacity of 1,400 to 1,600 blocks.',
      displayOrder: 3,
    },
    {
      id: 'hl-ai-4',
      title: '550-Litre Hydraulic Power Pack',
      description:
        'Features a 550-litre power pack with a 15 HP Crompton motor and an 8-ton feeding cylinder supported by a 400 kg storage hopper.',
      displayOrder: 4,
    },
  ],
  specTableColumns: ['Parameter', 'Details', 'Specification'],
  specTableRows: [
    { Parameter: 'Machine Model', Details: 'Automatic Interlock Block Making Machine', Specification: 'Vertical Twin Station' },
    { Parameter: 'Machine Type', Details: 'Automatic Hydraulic', Specification: 'Interlocking Block Machine' },
    { Parameter: 'Machine Configuration', Details: 'Vertical Type', Specification: 'Twin Station' },
    { Parameter: 'Hourly Production', Details: '200–250', Specification: 'Blocks per Hour' },
    { Parameter: 'Daily Production', Details: '1,400–1,600', Specification: 'Blocks per Day' },
    { Parameter: 'Bottom Pressing', Details: '30 Tons', Specification: '2 Nos' },
    { Parameter: 'Top Pressing Cylinder', Details: '25 Tons', Specification: '1 No' },
    { Parameter: 'Power Pack Capacity', Details: '550 Litres', Specification: 'Hydraulic Power Pack' },
    { Parameter: 'Power Pack Motor', Details: '15 HP', Specification: 'Crompton' },
    { Parameter: 'Control System', Details: 'PLC', Specification: 'Automatic' },
    { Parameter: 'Die Operating Method', Details: 'Double-Sided Die', Specification: '—' },
    { Parameter: 'Die Material', Details: 'EN31 Grade', Specification: '—' },
    { Parameter: 'Feeding Cylinder', Details: '8 Tons', Specification: '—' },
    { Parameter: 'Storage Hopper Capacity', Details: '400 kg', Specification: '—' },
    { Parameter: 'Brick Size – Type 1', Details: '12 × 6 × 5 Inches', Specification: '1 No.' },
    { Parameter: 'Brick Size – Type 2', Details: '12 × 8 × 5 Inches', Specification: '1 No.' },
  ],
  keyFeatures: [
    'Automatic vertical twin-station interlock block making machine with a production capacity of 200 to 250 blocks per hour.',
    'Heavy-duty hydraulic pressing system featuring two 30-ton bottom pressing units and one 25-ton top pressing cylinder.',
    '550-litre hydraulic power pack equipped with a 15 HP Crompton motor and PLC-based automatic control system.',
    'Double-sided EN31-grade die system with an 8-ton feeding cylinder, 400 kg storage hopper and support for two interlocking brick sizes.',
  ],
  advantages: [
    {
      id: 'adv-ai-1',
      title: 'Automated Interlocking Brick Production',
      description:
        'PLC-based automatic control and a vertical twin-station configuration support efficient machine operations with a production capacity of up to 250 blocks per hour.',
      displayOrder: 1,
    },
    {
      id: 'adv-ai-2',
      title: 'Powerful Hydraulic Pressing System',
      description:
        'Two 30-ton bottom pressing units and a 25-ton top pressing cylinder support effective hydraulic compression during interlocking block manufacturing.',
      displayOrder: 2,
    },
    {
      id: 'adv-ai-3',
      title: 'Efficient Material Feeding System',
      description:
        'The 8-ton feeding cylinder and 400 kg storage hopper support organised raw material feeding for the interlocking block production process.',
      displayOrder: 3,
    },
    {
      id: 'adv-ai-4',
      title: 'Durable Die & Versatile Block Production',
      description:
        'The EN31-grade double-sided die arrangement supports manufacturing of 12 × 6 × 5 inch and 12 × 8 × 5 inch interlocking blocks for different construction requirements.',
      displayOrder: 4,
    },
  ],
  seoMetaTitle: 'Automatic Interlock Block Making Machine | Jupiter Industries',
  seoMetaDescription:
    "Explore Jupiter Industries' Automatic Interlock Block Making Machine with PLC control, twin-station design, hydraulic pressing and 200–250 blocks per hour.",
  focusKeyword: 'Automatic Interlock Block Making Machine',
  secondaryKeywords:
    'Automatic Interlocking Brick Machine, Vertical Twin Station Block Machine, Hydraulic Interlock Block Machine, PLC Controlled Interlock Machine, Interlocking Brick Making Machine, Twin Station Hydraulic Press, Interlock Block Machine Manufacturer',
};

async function persistAutoInterlock() {
  console.log('--- SEEDING JUPITER AUTOMATIC INTERLOCK BLOCK MAKING MACHINE INTO DATABASE ---');

  const prodData = JUPITER_AUTO_INTERLOCK_DATA;

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

  console.log('--- JUPITER AUTOMATIC INTERLOCK BLOCK MAKING MACHINE SUCCESSFULLY PERSISTED IN DATABASE ---');
}

persistAutoInterlock()
  .catch((err) => {
    console.error('Seed error:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

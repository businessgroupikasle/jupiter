import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const backendProductsUploads = path.resolve('d:/Project/jupiter/jupiter-backend/uploads/products');

export const JUPITER_MANUAL_INTERLOCK_DATA = {
  id: 'cmus_jupiter_manual_interlock_model',
  name: 'Manual Interlock Block Making Machine – 30 Ton Hydraulic Pressing System',
  slug: 'manual-interlock-block-making-machine',
  category: 'Interlocking Block Making Machine',
  description: `The Jupiter Manual Interlock Block Making Machine is a hydraulic interlocking brick manufacturing machine designed for commercial block production and construction material manufacturing applications.

The machine offers a production capacity of approximately 150 to 200 interlocking blocks per hour, with a daily production range of 1,000 to 1,500 blocks.

It features two 30 ton bottom pressing units and two 7 ton door cylinders, supporting the hydraulic pressing and moulding process.

The machine is equipped with a 300-litre hydraulic power pack unit powered by a 10 HP Crompton motor.

Its double-sided die operating method uses EN31 grade die material with a specified die depth of 12 mm.

The machine supports two interlocking brick sizes, 12 × 6 × 5 inches and 12 × 8 × 5 inches, to meet different construction requirements.

With manual operation and an automatic push-button function, the Jupiter Interlock Block Making Machine offers a practical solution for interlocking brick manufacturing businesses.`,
  capacity: '150–200 Blocks per Hour / 1,000–1,500 Blocks per Day',
  capacityLabel: 'Production Capacity',
  power: 'Not specified (Power Pack Motor: 10 HP)',
  powerLabel: 'Total Connected Power',
  brickSize: '12 × 6 × 5 inches / 12 × 8 × 5 inches',
  brickSizeLabel: 'Brick / Mould Size',
  image: '/uploads/products/jupiter-manual-interlock-block-machine.jpg',
  imageUrl: '/uploads/products/jupiter-manual-interlock-block-machine.jpg',
  brandTag: 'JUPITER INDUSTRIES',
  status: 'Active',
  isActive: true,
  order: 11,
  featureBadges: [
    '30 Ton Bottom Pressing',
    '150–200 Blocks/Hour',
    'Double-Sided Die System',
    '10 HP Hydraulic Power Pack',
  ],
  highlights: [
    {
      id: 'hl-mi-1',
      title: '30 Ton Hydraulic Bottom Pressing',
      description:
        'Features two 30 ton bottom pressing units to support hydraulic compression during interlocking block manufacturing.',
      displayOrder: 1,
    },
    {
      id: 'hl-mi-2',
      title: 'Efficient Interlocking Block Production',
      description:
        'Produces approximately 150 to 200 interlocking blocks per hour, with a daily output of 1,000 to 1,500 blocks.',
      displayOrder: 2,
    },
    {
      id: 'hl-mi-3',
      title: 'Double-Sided Die System',
      description:
        'Features a double-sided die operating method with EN31 grade material and a specified 12 mm die depth.',
      displayOrder: 3,
    },
    {
      id: 'hl-mi-4',
      title: '10 HP Hydraulic Power Pack',
      description:
        'Equipped with a 300-litre hydraulic power pack powered by a 10 HP Crompton motor, supporting machine pressing operations.',
      displayOrder: 4,
    },
  ],
  specTableColumns: ['Parameter', 'Details', 'Specification'],
  specTableRows: [
    { Parameter: 'Machine Model', Details: 'Manual Interlock Block Making Machine', Specification: 'Hydraulic' },
    { Parameter: 'Machine Type', Details: 'Interlocking Block Machine', Specification: 'Manual Operation' },
    { Parameter: 'Hourly Production', Details: '150–200', Specification: 'Blocks per Hour' },
    { Parameter: 'Daily Production', Details: '1,000–1,500', Specification: 'Blocks per Day' },
    { Parameter: 'Brick Size – Type 1', Details: '12 × 6 × 5 Inches', Specification: '1 No.' },
    { Parameter: 'Brick Size – Type 2', Details: '12 × 8 × 5 Inches', Specification: '1 No.' },
    { Parameter: 'Bottom Pressing', Details: '30 Tons', Specification: '2 Nos' },
    { Parameter: 'Door Cylinder', Details: '7 Tons', Specification: '2 Nos' },
    { Parameter: 'Power Pack Capacity', Details: '300 Litres', Specification: 'Hydraulic Power Pack' },
    { Parameter: 'Power Pack Motor', Details: '10 HP', Specification: 'Crompton' },
    { Parameter: 'Die Operating Method', Details: 'Double-Sided Die', Specification: '—' },
    { Parameter: 'Die Material', Details: 'EN31 Grade', Specification: '—' },
    { Parameter: 'Die Depth', Details: '12 mm', Specification: '—' },
    { Parameter: 'Operating System', Details: 'Manual', Specification: '—' },
    { Parameter: 'Push Button', Details: 'Automatic', Specification: '—' },
  ],
  keyFeatures: [
    'Manual interlocking block making machine with a production capacity of 150 to 200 blocks per hour and 1,000 to 1,500 blocks per day.',
    'Two 30 ton bottom pressing units and two 7 ton door cylinders for hydraulic interlocking brick manufacturing.',
    '300-litre hydraulic power pack equipped with a 10 HP Crompton motor.',
    'Double-sided EN31 grade die system with 12 mm die depth, supporting 12 × 6 × 5 inch and 12 × 8 × 5 inch brick sizes.',
  ],
  advantages: [
    {
      id: 'adv-mi-1',
      title: 'Efficient Interlocking Block Production',
      description:
        'Supports commercial interlocking brick manufacturing with an hourly capacity of up to 200 blocks and a daily production range of 1,000 to 1,500 blocks.',
      displayOrder: 1,
    },
    {
      id: 'adv-mi-2',
      title: 'Heavy-Duty Hydraulic Pressing',
      description:
        'Two 30 ton bottom pressing units and two 7 ton door cylinders support the hydraulic compression and moulding process.',
      displayOrder: 2,
    },
    {
      id: 'adv-mi-3',
      title: 'Durable Double-Sided Die Construction',
      description:
        'The EN31 grade double-sided die arrangement with a specified depth of 12 mm supports interlocking block manufacturing requirements.',
      displayOrder: 3,
    },
    {
      id: 'adv-mi-4',
      title: 'Practical Manual Operation',
      description:
        'Combines manual machine operation with an automatic push-button function and a 10 HP hydraulic power pack for controlled interlocking block production.',
      displayOrder: 4,
    },
  ],
  seoMetaTitle: 'Manual Interlock Block Making Machine | Jupiter Industries',
  seoMetaDescription:
    "Explore Jupiter Industries' Manual Interlock Block Making Machine with 30 ton bottom pressing, 10 HP power pack and production of 150–200 blocks per hour.",
  focusKeyword: 'Manual Interlock Block Making Machine',
  secondaryKeywords:
    'Interlocking Brick Making Machine, Manual Interlocking Block Machine, Hydraulic Interlock Brick Machine, Interlocking Block Manufacturing Machine, 30 Ton Interlock Block Machine, Interlock Brick Machine Manufacturer',
};

async function persistManualInterlock() {
  console.log('--- SEEDING JUPITER MANUAL INTERLOCK BLOCK MAKING MACHINE INTO DATABASE ---');

  const prodData = JUPITER_MANUAL_INTERLOCK_DATA;

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

  console.log('--- JUPITER MANUAL INTERLOCK BLOCK MAKING MACHINE SUCCESSFULLY PERSISTED IN DATABASE ---');
}

persistManualInterlock()
  .catch((err) => {
    console.error('Seed error:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

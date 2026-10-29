import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const backendProductsUploads = path.resolve('d:/Project/jupiter/jupiter-backend/uploads/products');

export const JUPITER_30_40TON_ROTARY_DATA = {
  id: 'cmus_jupiter_30_40ton_rotary_model',
  name: '30 & 40 Ton Automatic Rotary Fly Ash Brick Making Machine',
  slug: '30-40-ton-rotary-fly-ash-brick-making-machine',
  category: 'Fly Ash Brick Machine',
  description: `The Jupiter 30 & 40 Ton Automatic Rotary Fly Ash Brick Making Machine is designed for commercial and industrial fly ash brick manufacturing, offering two hydraulic rotary machine configurations to suit different production requirements.

The 30 Ton Rotary Machine delivers a production capacity of approximately 1,600 to 1,800 bricks per hour, while the 40 Ton Rotary Machine offers a capacity of 1,400 to 1,600 bricks per hour.

The 30 Ton model operates with 10 HP power, while the 40 Ton model is specified with 15/20 HP power options. Both machines feature two hydraulic cylinders for brick pressing and ejection operations.

Equipped with hydraulic motor-driven table rotation, a 160-litre oil tank and a PLC control system, these machines support controlled brick manufacturing operations.

Both models are suitable for processing raw materials such as fly ash, iron oxide, lime sludge and quarry waste.

With hydraulic pressing, rotary table operation and automated PLC controls, the Jupiter 30 & 40 Ton Rotary Machines offer practical solutions for fly ash brick manufacturing businesses.`,
  capacity: '1,400–1,800 Bricks per Hour (Depending on Model)',
  capacityLabel: 'Production Capacity',
  power: '30 Ton: 10 HP / 40 Ton: 15–20 HP (specified power ratings)',
  powerLabel: 'Total Connected Power',
  brickSize: '', // Blank as requested: "Brick / Mould Size: Leave blank – not specified"
  brickSizeLabel: 'Brick / Mould Size',
  image: '/uploads/products/1--6-1791953708660-129938880.png',
  imageUrl: '/uploads/products/1--6-1791953708660-129938880.png',
  brandTag: 'JUPITER INDUSTRIES',
  status: 'Active',
  isActive: true,
  order: 6,
  featureBadges: [
    '30 & 40 Ton Rotary Models',
    'Up to 1,800 Bricks/Hour',
    'Dual Hydraulic Cylinders',
    'PLC Control System',
  ],
  highlights: [
    {
      id: 'hl-30-40ton-rot-1',
      title: '30 & 40 Ton Rotary Machine Options',
      description: 'Available in 30 ton and 40 ton configurations to support different hydraulic pressing and brick manufacturing requirements.',
      displayOrder: 1,
    },
    {
      id: 'hl-30-40ton-rot-2',
      title: 'Commercial Brick Production Capacity',
      description: 'The 30 ton model produces 1,600–1,800 bricks per hour, while the 40 ton model delivers 1,400–1,600 bricks per hour.',
      displayOrder: 2,
    },
    {
      id: 'hl-30-40ton-rot-3',
      title: 'Dual Hydraulic Cylinder System',
      description: 'Both models feature two hydraulic cylinders for brick pressing and ejection, supporting the manufacturing cycle.',
      displayOrder: 3,
    },
    {
      id: 'hl-30-40ton-rot-4',
      title: 'PLC-Controlled Rotary Operation',
      description: 'Hydraulic motor-driven table rotation and PLC control support smooth, controlled machine operations.',
      displayOrder: 4,
    },
  ],
  specTableColumns: ['Parameter', '30 Ton Rotary Machine', '40 Ton Rotary Machine'],
  specTableRows: [
    { Parameter: 'Machine Type', '30 Ton Rotary Machine': 'Automatic Rotary Fly Ash Brick Machine', '40 Ton Rotary Machine': 'Automatic Rotary Fly Ash Brick Machine' },
    { Parameter: 'Machine Capacity', '30 Ton Rotary Machine': '30 Tons', '40 Ton Rotary Machine': '40 Tons' },
    { Parameter: 'Production Capacity', '30 Ton Rotary Machine': '1,600–1,800 Bricks/Hour', '40 Ton Rotary Machine': '1,400–1,600 Bricks/Hour' },
    { Parameter: 'Power', '30 Ton Rotary Machine': '10 HP', '40 Ton Rotary Machine': '15/20 HP' },
    { Parameter: 'Hydraulic Cylinders', '30 Ton Rotary Machine': '2 (Pressing & Ejection)', '40 Ton Rotary Machine': '2 (Pressing & Ejection)' },
    { Parameter: 'Operating System', '30 Ton Rotary Machine': 'Hydraulic', '40 Ton Rotary Machine': 'Hydraulic' },
    { Parameter: 'Oil Tank Capacity', '30 Ton Rotary Machine': '160 Litres', '40 Ton Rotary Machine': '160 Litres' },
    { Parameter: 'Oil Grade', '30 Ton Rotary Machine': '68', '40 Ton Rotary Machine': '68' },
    { Parameter: 'Table Rotation', '30 Ton Rotary Machine': 'Hydraulic Motor', '40 Ton Rotary Machine': 'Hydraulic Motor' },
    { Parameter: 'Control System', '30 Ton Rotary Machine': 'PLC Control', '40 Ton Rotary Machine': 'PLC Control' },
    { Parameter: 'Raw Materials', '30 Ton Rotary Machine': 'Fly Ash, Iron Oxide, Lime Sludge, Quarry Waste', '40 Ton Rotary Machine': 'Fly Ash, Iron Oxide, Lime Sludge, Quarry Waste' },
  ],
  keyFeatures: [
    'Available in 30 ton and 40 ton automatic rotary configurations with production capacities ranging from 1,400 to 1,800 bricks per hour, depending on the model.',
    'Dual hydraulic cylinders for brick pressing and ejection operations in both rotary machine models.',
    'Hydraulic motor-driven table rotation, 160-litre oil tank and PLC control system for controlled machine operation.',
    'Supports fly ash, iron oxide, lime sludge and quarry waste as raw materials for brick manufacturing.',
  ],
  advantages: [
    {
      id: 'adv-30-40ton-rot-1',
      title: 'Flexible Machine Configurations',
      description: 'Choose between 30 ton and 40 ton rotary models based on production requirements, hydraulic pressing capacity and machine power specifications.',
      displayOrder: 1,
    },
    {
      id: 'adv-30-40ton-rot-2',
      title: 'Efficient Hydraulic Pressing System',
      description: 'Two hydraulic cylinders support brick pressing and ejection operations, helping maintain an organised manufacturing cycle.',
      displayOrder: 2,
    },
    {
      id: 'adv-30-40ton-rot-3',
      title: 'Controlled Rotary Production',
      description: 'Hydraulic motor-driven table rotation and PLC-based controls support controlled machine operation throughout the brick manufacturing process.',
      displayOrder: 3,
    },
    {
      id: 'adv-30-40ton-rot-4',
      title: 'Multiple Raw Material Compatibility',
      description: 'Suitable for fly ash, iron oxide, lime sludge and quarry waste, offering flexibility in raw material selection for brick production.',
      displayOrder: 4,
    },
  ],
  seoMetaTitle: '30 & 40 Ton Fly Ash Brick Machine | Jupiter Industries',
  seoMetaDescription: `Explore Jupiter Industries' 30 & 40 Ton Rotary Fly Ash Brick Making Machines with hydraulic pressing, PLC control and up to 1,800 bricks per hour.`,
  focusKeyword: '30 and 40 Ton Rotary Fly Ash Brick Making Machine',
  secondaryKeywords: 'Automatic Fly Ash Brick Making Machine, 30 Ton Rotary Brick Machine, 40 Ton Rotary Brick Machine, Hydraulic Fly Ash Brick Machine, PLC Controlled Brick Making Machine, Fly Ash Brick Machine Manufacturer',
};

async function persist3040TonRotary() {
  console.log('--- SEEDING JUPITER 30 & 40 TON ROTARY MODEL INTO DATABASE ---');

  const prodData = JUPITER_30_40TON_ROTARY_DATA;

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
          value: r['30 Ton Rotary Machine'] || '',
          description: r['40 Ton Rotary Machine'] || null,
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
          value: r['30 Ton Rotary Machine'] || '',
          description: r['40 Ton Rotary Machine'] || null,
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

  // Backup image into durable prisma.media
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

  console.log('--- JUPITER 30 & 40 TON ROTARY MODEL SUCCESSFULLY PERSISTED IN DATABASE ---');
}

persist3040TonRotary()
  .catch((err) => {
    console.error('Seed error:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

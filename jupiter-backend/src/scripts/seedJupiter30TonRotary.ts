import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const backendProductsUploads = path.resolve('d:/Project/jupiter/jupiter-backend/uploads/products');

export const JUPITER_30TON_ROTARY_DATA = {
  id: 'cmus_jupiter_30ton_rotary_model',
  name: '30 Ton Automatic Rotary Fly Ash Brick Making Machine',
  slug: '30-ton-rotary-fly-ash-brick-making-machine',
  category: 'Fly Ash Brick Machine',
  description: `The Jupiter 30 Ton Automatic Rotary Fly Ash Brick Making Machine is a hydraulic brick manufacturing machine designed for commercial and industrial fly ash brick production.

Featuring a 30 ton rotary machine configuration, it delivers a production capacity of approximately 1,600 to 1,800 bricks per hour, supporting the requirements of commercial brick manufacturing units.

The machine operates with a 10 HP power rating and a hydraulic operating system, featuring two hydraulic cylinders dedicated to brick pressing and ejection operations.

Its hydraulic motor-driven rotary table supports the brick manufacturing cycle, while the integrated PLC control system helps manage machine operations.

Equipped with a 160-litre hydraulic oil tank and Grade 68 hydraulic oil specification, the machine is designed to support hydraulic rotary operations.

The Jupiter 30 Ton Rotary Machine is suitable for manufacturing fly ash bricks using raw materials such as fly ash, iron oxide, lime sludge and quarry waste.

With its hydraulic pressing system, rotary table mechanism and PLC-based controls, this machine provides a practical solution for fly ash brick manufacturers seeking controlled production operations.`,
  capacity: '1,600–1,800 Bricks per Hour',
  capacityLabel: 'Production Capacity',
  power: 'Not specified (Power Rating: 10 HP)',
  powerLabel: 'Total Connected Power',
  brickSize: '', // Blank as requested: "Brick / Mould Size: Leave blank – not specified"
  brickSizeLabel: 'Brick / Mould Size',
  image: '/uploads/products/1--9-1791953609964-450970271.png',
  imageUrl: '/uploads/products/1--9-1791953609964-450970271.png',
  brandTag: 'JUPITER INDUSTRIES',
  status: 'Active',
  isActive: true,
  order: 6,
  featureBadges: [
    '30 Ton Rotary Machine',
    '1,600–1,800 Bricks/Hour',
    'Dual Hydraulic Cylinders',
    'PLC Control System',
  ],
  highlights: [
    {
      id: 'hl-30ton-rot-1',
      title: '30 Ton Hydraulic Rotary System',
      description:
        'Automatic 30 ton rotary fly ash brick making machine designed to support commercial brick manufacturing with hydraulic pressing and rotary table operation.',
      displayOrder: 1,
    },
    {
      id: 'hl-30ton-rot-2',
      title: 'Efficient Brick Production Capacity',
      description:
        'Produces approximately 1,600 to 1,800 fly ash bricks per hour to support commercial manufacturing requirements.',
      displayOrder: 2,
    },
    {
      id: 'hl-30ton-rot-3',
      title: 'Dual Hydraulic Cylinder Operation',
      description:
        'Features two hydraulic cylinders for brick pressing and ejection operations, supporting the production cycle.',
      displayOrder: 3,
    },
    {
      id: 'hl-30ton-rot-4',
      title: 'PLC-Controlled Rotary Operation',
      description:
        'Integrated PLC control system and hydraulic motor-driven table rotation support controlled machine operation and brick manufacturing workflow.',
      displayOrder: 4,
    },
  ],
  specTableColumns: ['Parameter', 'Details', 'Specification'],
  specTableRows: [
    { Parameter: 'Machine Model', Details: '30 Ton Rotary Model', Specification: 'Automatic Fly Ash Brick Machine' },
    { Parameter: 'Machine Type', Details: 'Automatic Rotary', Specification: 'Fly Ash Brick Making Machine' },
    { Parameter: 'Machine Capacity', Details: '30 Tons', Specification: 'Rotary Model' },
    { Parameter: 'Production Capacity', Details: '1,600–1,800', Specification: 'Bricks per Hour' },
    { Parameter: 'Power', Details: '10 HP', Specification: '—' },
    { Parameter: 'Operating System', Details: 'Hydraulic', Specification: '—' },
    { Parameter: 'Hydraulic Cylinders', Details: '2', Specification: 'Pressing & Ejection' },
    { Parameter: 'Oil Tank Capacity', Details: '160 Litres', Specification: '—' },
    { Parameter: 'Oil Grade', Details: '68', Specification: '—' },
    { Parameter: 'Table Rotation', Details: 'Hydraulic Motor', Specification: 'Rotary Table' },
    { Parameter: 'Control System', Details: 'PLC Control', Specification: '—' },
    { Parameter: 'Raw Materials', Details: 'Fly Ash, Iron Oxide', Specification: 'Lime Sludge, Quarry Waste' },
  ],
  keyFeatures: [
    '30 ton automatic rotary fly ash brick making machine with a production capacity of 1,600 to 1,800 bricks per hour.',
    '10 HP hydraulic operating system featuring two hydraulic cylinders for brick pressing and ejection operations.',
    'Hydraulic motor-driven rotary table with PLC control system for controlled machine operations.',
    '160-litre hydraulic oil tank with Grade 68 oil specification and compatibility with fly ash, iron oxide, lime sludge and quarry waste.',
  ],
  advantages: [
    {
      id: 'adv-30ton-rot-1',
      title: 'Efficient Fly Ash Brick Production',
      description:
        'Supports commercial fly ash brick manufacturing with an hourly production capacity of up to 1,800 bricks, depending on operating conditions.',
      displayOrder: 1,
    },
    {
      id: 'adv-30ton-rot-2',
      title: 'Hydraulic Pressing & Ejection System',
      description:
        'Two hydraulic cylinders support brick pressing and ejection operations, helping maintain an organised brick manufacturing cycle.',
      displayOrder: 2,
    },
    {
      id: 'adv-30ton-rot-3',
      title: 'Controlled Rotary Machine Operation',
      description:
        'Hydraulic motor-driven table rotation combined with PLC controls supports controlled machine movement and production operations.',
      displayOrder: 3,
    },
    {
      id: 'adv-30ton-rot-4',
      title: 'Multiple Raw Material Compatibility',
      description:
        'Suitable for manufacturing bricks using fly ash, iron oxide, lime sludge and quarry waste, providing flexibility in raw material selection.',
      displayOrder: 4,
    },
  ],
  seoMetaTitle: '30 Ton Rotary Fly Ash Brick Machine | Jupiter Industries',
  seoMetaDescription:
    "Explore Jupiter Industries' 30 Ton Rotary Fly Ash Brick Making Machine with 10 HP power, hydraulic operation, PLC control and 1,600–1,800 bricks/hour capacity.",
  focusKeyword: '30 Ton Rotary Fly Ash Brick Making Machine',
  secondaryKeywords:
    'Automatic Fly Ash Brick Making Machine, 30 Ton Fly Ash Brick Machine, Hydraulic Rotary Brick Machine, PLC Controlled Brick Making Machine, Fly Ash Brick Manufacturing Machine, Rotary Brick Making Machine Manufacturer',
};

async function persist30TonRotary() {
  console.log('--- SEEDING JUPITER 30 TON ROTARY FLY ASH BRICK MAKING MACHINE INTO DATABASE ---');

  const prodData = JUPITER_30TON_ROTARY_DATA;

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
        { id: 'cmus_jupiter_30_40ton_rotary_model' },
        { slug: prodData.slug },
        { slug: '30-40-ton-rotary-fly-ash-brick-making-machine' },
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
    console.log(`[Database Seed] Updated: ${productRecord.name} (id=${productRecord.id}, slug=${productRecord.slug})`);
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

  console.log('--- JUPITER 30 TON ROTARY FLY ASH BRICK MAKING MACHINE SUCCESSFULLY PERSISTED IN DATABASE ---');
}

persist30TonRotary()
  .catch((err) => {
    console.error('Seed error:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

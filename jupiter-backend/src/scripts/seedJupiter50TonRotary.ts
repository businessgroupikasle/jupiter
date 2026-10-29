import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const backendProductsUploads = path.resolve('d:/Project/jupiter/jupiter-backend/uploads/products');

export const JUPITER_50TON_ROTARY_DATA = {
  id: 'cmus_jupiter_50ton_rotary_model',
  name: '50 Ton Automatic Rotary Fly Ash Brick Making Machine – 2 & 3 Brick Models',
  slug: '50-ton-rotary-fly-ash-brick-making-machine',
  category: 'Fly Ash Brick Machine',
  description: `The Jupiter 50 Ton Automatic Rotary Fly Ash Brick Making Machine is designed for commercial and industrial fly ash brick manufacturing, offering 2-brick and 3-brick production configurations.

The 2-brick model delivers a production capacity of approximately 2,300 to 2,400 bricks per hour, while the 3-brick model offers 2,400 to 2,500 bricks per hour.

The 2-brick configuration features a 20 HP hydraulic operating system, a 160-litre oil tank and hydraulic motor-driven table rotation for the brick production process.

Its PLC control system supports controlled machine operation, while the hydraulic rotary mechanism facilitates the manufacturing cycle.

The specified raw materials include fly ash, iron oxide, lime sludge and quarry waste, making the machine suitable for fly ash brick manufacturing applications.

With two available production configurations, the Jupiter 50 Ton Rotary Machine offers flexibility for different brick manufacturing requirements.`,
  capacity: '2,300–2,500 Bricks per Hour (Depending on Model)',
  capacityLabel: 'Production Capacity',
  power: 'Not specified (20 HP power listed for 2-brick model)',
  powerLabel: 'Total Connected Power',
  brickSize: '', // Blank as requested: "Brick / Mould Size: Leave blank – not specified"
  brickSizeLabel: 'Brick / Mould Size',
  image: '/uploads/products/1--5-1791953693967-3090793.png',
  imageUrl: '/uploads/products/1--5-1791953693967-3090793.png',
  brandTag: 'JUPITER INDUSTRIES',
  status: 'Active',
  isActive: true,
  order: 5,
  featureBadges: [
    '50 Ton Rotary Machine',
    '2 & 3 Brick Models',
    'Up to 2,500 Bricks/Hour',
    'Hydraulic Rotary System',
  ],
  highlights: [
    {
      id: 'hl-50ton-rot-1',
      title: '50 Ton Rotary Brick Making System',
      description: 'Automatic 50 ton rotary fly ash brick making machine available in 2-brick and 3-brick configurations for commercial production requirements.',
      displayOrder: 1,
    },
    {
      id: 'hl-50ton-rot-2',
      title: 'High-Speed Brick Production',
      description: 'Offers production capacities of 2,300–2,400 bricks per hour for the 2-brick model and 2,400–2,500 bricks per hour for the 3-brick model.',
      displayOrder: 2,
    },
    {
      id: 'hl-50ton-rot-3',
      title: 'Hydraulic Rotary Table System',
      description: 'The 2-brick configuration features hydraulic motor-driven table rotation and a 20 HP hydraulic operating system.',
      displayOrder: 3,
    },
    {
      id: 'hl-50ton-rot-4',
      title: 'PLC-Controlled Machine Operation',
      description: 'The specified 2-brick model includes a PLC control system to support controlled machine operations and production workflow.',
      displayOrder: 4,
    },
  ],
  specTableColumns: ['Parameter', '2 Brick Model', '3 Brick Model'],
  specTableRows: [
    { Parameter: 'Machine Type', '2 Brick Model': 'Automatic Rotary Fly Ash Brick Machine', '3 Brick Model': 'Automatic Rotary Fly Ash Brick Machine' },
    { Parameter: 'Machine Capacity', '2 Brick Model': '50 Tons', '3 Brick Model': '50 Tons' },
    { Parameter: 'Production Capacity', '2 Brick Model': '2,300–2,400 Bricks/Hour', '3 Brick Model': '2,400–2,500 Bricks/Hour' },
    { Parameter: 'Power', '2 Brick Model': '20 HP', '3 Brick Model': 'Not Specified' },
    { Parameter: 'Operating System', '2 Brick Model': 'Hydraulic', '3 Brick Model': 'Not Specified' },
    { Parameter: 'Oil Tank Capacity', '2 Brick Model': '160 Litres', '3 Brick Model': 'Not Specified' },
    { Parameter: 'Oil Grade', '2 Brick Model': '68', '3 Brick Model': 'Not Specified' },
    { Parameter: 'Table Rotation', '2 Brick Model': 'Hydraulic Motor', '3 Brick Model': 'Not Specified' },
    { Parameter: 'Control System', '2 Brick Model': 'PLC Control', '3 Brick Model': 'Not Specified' },
    { Parameter: 'Raw Materials', '2 Brick Model': 'Fly Ash, Iron Oxide, Lime Sludge, Quarry Waste', '3 Brick Model': 'Not Specified' },
  ],
  keyFeatures: [
    '50 ton automatic rotary fly ash brick making machine available in 2-brick and 3-brick production models.',
    'Production capacity of 2,300 to 2,400 bricks per hour for the 2-brick model and 2,400 to 2,500 bricks per hour for the 3-brick model.',
    '20 HP hydraulic operating system with a 160-litre oil tank and hydraulic motor-driven table rotation in the specified 2-brick configuration.',
    'PLC control system and compatibility with fly ash, iron oxide, lime sludge and quarry waste in the 2-brick model.',
  ],
  advantages: [
    {
      id: 'adv-50ton-rot-1',
      title: 'Flexible Production Configurations',
      description: 'Available in 2-brick and 3-brick models, allowing manufacturers to select a configuration based on their hourly production requirements.',
      displayOrder: 1,
    },
    {
      id: 'adv-50ton-rot-2',
      title: 'High Production Capacity',
      description: 'Supports commercial fly ash brick manufacturing with a production capacity of up to 2,500 bricks per hour, depending on the selected model.',
      displayOrder: 2,
    },
    {
      id: 'adv-50ton-rot-3',
      title: 'Hydraulic Rotary Operation',
      description: 'The 2-brick model uses hydraulic motor-driven table rotation to support the brick manufacturing cycle.',
      displayOrder: 3,
    },
    {
      id: 'adv-50ton-rot-4',
      title: 'Controlled Manufacturing Process',
      description: 'The PLC control system specified for the 2-brick model supports efficient management of machine operations and production activities.',
      displayOrder: 4,
    },
  ],
  seoMetaTitle: '50 Ton Rotary Fly Ash Brick Machine | Jupiter Industries',
  seoMetaDescription: `Explore Jupiter Industries' 50 Ton Rotary Fly Ash Brick Making Machine with 2 and 3 brick models, hydraulic operation, PLC control and up to 2,500 bricks/hour.`,
  focusKeyword: '50 Ton Rotary Fly Ash Brick Making Machine',
  secondaryKeywords: 'Automatic Fly Ash Brick Making Machine, 2 Brick Rotary Machine, 3 Brick Rotary Machine, Hydraulic Brick Making Machine, PLC Controlled Brick Machine, Fly Ash Brick Machine Manufacturer',
};

async function persist50TonRotary() {
  console.log('--- SEEDING JUPITER 50 TON ROTARY MODEL INTO DATABASE ---');

  const prodData = JUPITER_50TON_ROTARY_DATA;

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
          value: r['2 Brick Model'] || '',
          description: r['3 Brick Model'] || null,
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
          value: r['2 Brick Model'] || '',
          description: r['3 Brick Model'] || null,
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

  console.log('--- JUPITER 50 TON ROTARY MODEL SUCCESSFULLY PERSISTED IN DATABASE ---');
}

persist50TonRotary()
  .catch((err) => {
    console.error('Seed error:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

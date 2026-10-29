import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const backendProductsUploads = path.resolve('d:/Project/jupiter/jupiter-backend/uploads/products');

export const JUPITER_ROTARY_5G_DATA = {
  id: 'cmus_jupiter_rotary_5g_model',
  name: 'Jupiter Rotary 5G – 80 Ton Automatic Fly Ash Brick Making Machine',
  slug: '80-ton-rotary-5g-fly-ash-brick-making-machine',
  category: 'Fly Ash Brick Machine',
  description: `The Jupiter Rotary 5G 80 Ton Automatic Fly Ash Brick Making Machine is a hydraulic brick manufacturing machine designed for commercial and industrial fly ash brick production.

Featuring an 80 ton rotary machine configuration, it delivers a production capacity of approximately 2,900 to 3,000 bricks per hour, supporting high-volume manufacturing requirements.

The machine operates with 20 HP power and a hydraulic operating system. Its rotary table with a three-stage feeder arrangement supports material feeding during the brick manufacturing cycle.

Equipped with a 40 kg feeder capacity, 210-litre hydraulic oil tank and PLC control system, the Jupiter Rotary 5G provides automated control of machine operations.

The machine is suitable for manufacturing fly ash bricks using fly ash, lime, dust and cement, making it a practical solution for brick manufacturing businesses.`,
  capacity: '2,900–3,000 Bricks per Hour',
  capacityLabel: 'Production Capacity',
  power: '20 HP (specified power)',
  powerLabel: 'Total Connected Power',
  brickSize: '', // Blank as requested: "Brick / Mould Size: Leave blank – not specified"
  brickSizeLabel: 'Brick / Mould Size',
  image: '/uploads/products/jupiter-5g-machine-full-view-1791953587374-4768439.png',
  imageUrl: '/uploads/products/jupiter-5g-machine-full-view-1791953587374-4768439.png',
  brandTag: 'JUPITER INDUSTRIES',
  status: 'Active',
  isActive: true,
  order: 4,
  featureBadges: [
    '80 Ton Rotary 5G Model',
    '2,900–3,000 Bricks/Hour',
    'Three-Stage Feeder System',
    'PLC Control System',
  ],
  highlights: [
    {
      id: 'hl-rotary5g-1',
      title: '80 Ton Rotary Machine System',
      description: 'Automatic 80 ton rotary fly ash brick making machine designed to support commercial and industrial brick manufacturing operations.',
      displayOrder: 1,
    },
    {
      id: 'hl-rotary5g-2',
      title: 'High-Speed Brick Production',
      description: 'Offers a production capacity of approximately 2,900 to 3,000 fly ash bricks per hour for manufacturing requirements.',
      displayOrder: 2,
    },
    {
      id: 'hl-rotary5g-3',
      title: 'Three-Stage Feeder System',
      description: 'Rotary table with a three-stage feeder arrangement and 40 kg feeder capacity supports controlled material feeding.',
      displayOrder: 3,
    },
    {
      id: 'hl-rotary5g-4',
      title: 'PLC-Controlled Hydraulic Operation',
      description: 'Features a hydraulic operating system with PLC control for managing machine operations and production workflow.',
      displayOrder: 4,
    },
  ],
  specTableColumns: ['Parameter', 'Details', 'Specification'],
  specTableRows: [
    { Parameter: 'Machine Model', Details: 'Jupiter Rotary 5G', Specification: '80 Ton' },
    { Parameter: 'Machine Type', Details: 'Automatic Rotary', Specification: 'Fly Ash Brick Making Machine' },
    { Parameter: 'Production Capacity', Details: '2,900–3,000', Specification: 'Bricks per Hour' },
    { Parameter: 'Machine Capacity', Details: '80 Tons', Specification: 'Rotary 5G Model' },
    { Parameter: 'Power', Details: '20 HP', Specification: '—' },
    { Parameter: 'Operating System', Details: 'Hydraulic', Specification: '—' },
    { Parameter: 'Oil Tank Capacity', Details: '210 Litres', Specification: '—' },
    { Parameter: 'Oil Grade', Details: '68', Specification: '—' },
    { Parameter: 'Table Rotation', Details: 'Rotary Table', Specification: 'Three-Stage Feeder Model' },
    { Parameter: 'Feeder Capacity', Details: '40 kg', Specification: '—' },
    { Parameter: 'Control System', Details: 'PLC Control', Specification: '—' },
    { Parameter: 'Raw Materials', Details: 'Fly Ash, Lime, Dust', Specification: 'Cement' },
  ],
  keyFeatures: [
    '80 ton automatic Rotary 5G fly ash brick making machine with a production capacity of 2,900 to 3,000 bricks per hour.',
    '20 HP hydraulic operating system with a 210-litre oil tank and Grade 68 hydraulic oil.',
    'Rotary table with a three-stage feeder arrangement and 40 kg feeder capacity.',
    'PLC control system with compatibility for fly ash, lime, dust and cement raw materials.',
  ],
  advantages: [
    {
      id: 'adv-rotary5g-1',
      title: 'High-Volume Brick Manufacturing',
      description: 'Supports commercial fly ash brick production with an hourly output of up to 3,000 bricks to meet manufacturing requirements.',
      displayOrder: 1,
    },
    {
      id: 'adv-rotary5g-2',
      title: 'Efficient Rotary Feeding System',
      description: 'The rotary table and three-stage feeder arrangement support organised raw material feeding during the production cycle.',
      displayOrder: 2,
    },
    {
      id: 'adv-rotary5g-3',
      title: 'Automated Production Control',
      description: 'PLC-based control system supports the management of hydraulic machine operations and the brick manufacturing process.',
      displayOrder: 3,
    },
    {
      id: 'adv-rotary5g-4',
      title: 'Multiple Raw Material Compatibility',
      description: 'Designed to work with fly ash, lime, dust and cement, supporting material requirements for fly ash brick manufacturing.',
      displayOrder: 4,
    },
  ],
  seoMetaTitle: '80 Ton Rotary 5G Fly Ash Brick Machine | Jupiter Industries',
  seoMetaDescription: 'Explore the Jupiter Rotary 5G 80 Ton Fly Ash Brick Making Machine with PLC control, 20 HP power, three-stage feeding and 2,900–3,000 bricks per hour.',
  focusKeyword: '80 Ton Rotary 5G Fly Ash Brick Making Machine',
  secondaryKeywords: 'Automatic Fly Ash Brick Making Machine, 80 Ton Fly Ash Brick Machine, Rotary Fly Ash Brick Machine, PLC Controlled Brick Machine, Three Stage Feeder Brick Machine, Hydraulic Brick Making Machine',
};

async function persistRotary5G() {
  console.log('--- SEEDING JUPITER ROTARY 5G MODEL INTO DATABASE ---');

  const prodData = JUPITER_ROTARY_5G_DATA;

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
          value: r.Details,
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
          value: r.Details,
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

  console.log('--- JUPITER ROTARY 5G MODEL SUCCESSFULLY PERSISTED IN DATABASE ---');
}

persistRotary5G()
  .catch((err) => {
    console.error('Seed error:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

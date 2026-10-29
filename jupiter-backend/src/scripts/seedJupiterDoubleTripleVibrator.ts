import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const backendProductsUploads = path.resolve('d:/Project/jupiter/jupiter-backend/uploads/products');

export const JUPITER_DOUBLE_TRIPLE_VIBRATOR_DATA = {
  id: 'cmus_jupiter_double_triple_vibrator_model',
  name: 'Hollow & Solid Block Making Machine – Double & Triple Vibrator',
  slug: 'double-triple-vibrator-hollow-solid-block-making-machine',
  category: 'Hollow & Solid Block Machine',
  description: `The Jupiter Double and Triple Vibrator Hollow & Solid Block Making Machine is designed for commercial concrete block manufacturing, offering two machine configurations to support different production requirements.

Both models deliver a production capacity of approximately 50 to 60 strokes per hour and operate with a hydraulic system that provides a specified pressure of 140 kg/cm².

The Double Vibrator Model features 6.5 HP total power, including a 3 HP hydraulic pump, 3 HP mould vibrator and 0.5 HP moving motor.

The Triple Vibrator Model operates with 7.5 HP total power and includes an additional 1 HP RAM vibrator, supporting its vibration and moulding operations.

Both machines feature an 860 × 600 mm mould area. The Triple Vibrator Model is specified for multiple block dimensions, including 4-inch, 6-inch and 8-inch configurations, with production outputs of 4 to 10 blocks per stroke depending on block size.

With hydraulic operation, vibration systems and multiple machine configurations, these machines provide solutions for hollow and solid concrete block manufacturing businesses.`,
  capacity: '50–60 Strokes per Hour',
  capacityLabel: 'Production Capacity',
  power: 'Double Vibrator: 6.5 HP / Triple Vibrator: 7.5 HP',
  powerLabel: 'Total Connected Power',
  brickSize: '400 × 200 × 200 mm, 400 × 200 × 150 mm, 400 × 200 × 100 mm, 300 × 200 × 150 mm (sizes specified for Triple Vibrator)',
  brickSizeLabel: 'Brick / Mould Size',
  image: '/uploads/products/0a306a34-c9a0-44b3-b116-ec27ef2e36fc-1791953787793-740493539.png',
  imageUrl: '/uploads/products/0a306a34-c9a0-44b3-b116-ec27ef2e36fc-1791953787793-740493539.png',
  brandTag: 'JUPITER INDUSTRIES',
  status: 'Active',
  isActive: true,
  order: 9,
  featureBadges: [
    'Double & Triple Vibrator',
    '50–60 Strokes/Hour',
    '140 kg/cm² Pressure',
    '860 × 600 mm Mould Area',
  ],
  highlights: [
    {
      id: 'hl-dtv-1',
      title: 'Double & Triple Vibrator Options',
      description:
        'Available in 6.5 HP double vibrator and 7.5 HP triple vibrator configurations to accommodate different block manufacturing requirements.',
      displayOrder: 1,
    },
    {
      id: 'hl-dtv-2',
      title: 'Hydraulic Pressing Performance',
      description:
        'Both models feature a 3 HP hydraulic pump operating at 1,400 RPM with a specified hydraulic pressure of 140 kg/cm².',
      displayOrder: 2,
    },
    {
      id: 'hl-dtv-3',
      title: 'Efficient Block Production Capacity',
      description:
        'Supports 50 to 60 strokes per hour with an 860 × 600 mm mould area for commercial hollow and solid block production.',
      displayOrder: 3,
    },
    {
      id: 'hl-dtv-4',
      title: 'Multiple Block Size Configurations',
      description:
        'The Triple Vibrator Model supports four specified block size configurations, producing between 4 and 10 blocks per stroke depending on the mould.',
      displayOrder: 4,
    },
  ],
  specTableColumns: ['Parameter', 'Double Vibrator', 'Triple Vibrator'],
  specTableRows: [
    { Parameter: 'Machine Type', 'Double Vibrator': 'Hollow & Solid Block Making Machine', 'Triple Vibrator': 'Hollow & Solid Block Making Machine' },
    { Parameter: 'Total Power', 'Double Vibrator': '6.5 HP', 'Triple Vibrator': '7.5 HP' },
    { Parameter: 'Hydraulic Pump', 'Double Vibrator': '3 HP / 1400 RPM', 'Triple Vibrator': '3 HP / 1400 RPM' },
    { Parameter: 'RAM Vibrator', 'Double Vibrator': 'Not Specified', 'Triple Vibrator': '1 HP / 2800 RPM' },
    { Parameter: 'Mould Vibrator', 'Double Vibrator': '3 HP / 2800 RPM', 'Triple Vibrator': '3 HP / 2800 RPM' },
    { Parameter: 'Moving Motor', 'Double Vibrator': '0.5 HP / 1440 RPM', 'Triple Vibrator': '0.5 HP / 1440 RPM' },
    { Parameter: 'Hydraulic Pressure', 'Double Vibrator': '140 kg/cm²', 'Triple Vibrator': '140 kg/cm²' },
    { Parameter: 'Mould Area', 'Double Vibrator': '860 × 600 mm', 'Triple Vibrator': '860 × 600 mm' },
    { Parameter: 'Production Capacity', 'Double Vibrator': '50–60 Strokes/Hour', 'Triple Vibrator': '50–60 Strokes/Hour' },
    { Parameter: 'Block Size – 8 Inch', 'Double Vibrator': 'Not Specified', 'Triple Vibrator': '400 × 200 × 200 mm' },
    { Parameter: 'Blocks per Stroke – 8 Inch', 'Double Vibrator': 'Not Specified', 'Triple Vibrator': '4 Blocks' },
    { Parameter: 'Block Size – 6 Inch', 'Double Vibrator': 'Not Specified', 'Triple Vibrator': '400 × 200 × 150 mm' },
    { Parameter: 'Blocks per Stroke – 6 Inch', 'Double Vibrator': 'Not Specified', 'Triple Vibrator': '5 Blocks' },
    { Parameter: 'Block Size – 4 Inch', 'Double Vibrator': 'Not Specified', 'Triple Vibrator': '400 × 200 × 100 mm' },
    { Parameter: 'Blocks per Stroke – 4 Inch', 'Double Vibrator': 'Not Specified', 'Triple Vibrator': '8 Blocks' },
    { Parameter: 'Additional Block Size – 6 Inch', 'Double Vibrator': 'Not Specified', 'Triple Vibrator': '300 × 200 × 150 mm' },
    { Parameter: 'Blocks per Stroke – Additional 6 Inch', 'Double Vibrator': 'Not Specified', 'Triple Vibrator': '10 Blocks' },
  ],
  keyFeatures: [
    'Available in double vibrator and triple vibrator configurations with 6.5 HP and 7.5 HP total power respectively.',
    'Hydraulic pressing system featuring a 3 HP pump, 140 kg/cm² pressure and an 860 × 600 mm mould area.',
    'Production capacity of 50 to 60 strokes per hour with a 3 HP mould vibrator operating at 2,800 RPM in both models.',
    'Triple Vibrator Model includes an additional 1 HP RAM vibrator and supports multiple block sizes with 4 to 10 blocks per stroke.',
  ],
  advantages: [
    {
      id: 'adv-dtv-1',
      title: 'Flexible Machine Configurations',
      description:
        'Choose between double vibrator and triple vibrator models based on hydraulic power, vibration requirements and block manufacturing needs.',
      displayOrder: 1,
    },
    {
      id: 'adv-dtv-2',
      title: 'Effective Hydraulic Pressing',
      description:
        'A 3 HP hydraulic pump with 140 kg/cm² pressure supports the block moulding and compression process in both models.',
      displayOrder: 2,
    },
    {
      id: 'adv-dtv-3',
      title: 'Versatile Block Size Production',
      description:
        'The Triple Vibrator Model supports multiple 4-inch, 6-inch and 8-inch block configurations, offering flexibility for different construction material requirements.',
      displayOrder: 3,
    },
    {
      id: 'adv-dtv-4',
      title: 'Consistent Production Capacity',
      description:
        'Both models support 50 to 60 strokes per hour, with dedicated vibration and moving motors for their respective machine operations.',
      displayOrder: 4,
    },
  ],
  seoMetaTitle: 'Double & Triple Vibrator Block Machine | Jupiter Industries',
  seoMetaDescription:
    "Explore Jupiter Industries' Double & Triple Vibrator Hollow and Solid Block Making Machine with hydraulic operation, 140 kg/cm² pressure and 50–60 strokes/hour.",
  focusKeyword: 'Double and Triple Vibrator Hollow and Solid Block Making Machine',
  secondaryKeywords:
    'Hollow Block Making Machine, Solid Block Making Machine, Double Vibrator Block Machine, Triple Vibrator Block Machine, Hydraulic Block Making Machine, Concrete Block Making Machine, Block Making Machine Manufacturer',
};

async function persistDoubleTripleVibrator() {
  console.log('--- SEEDING JUPITER DOUBLE & TRIPLE VIBRATOR MODEL INTO DATABASE ---');

  const prodData = JUPITER_DOUBLE_TRIPLE_VIBRATOR_DATA;

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
          value: r['Double Vibrator'] || '',
          description: r['Triple Vibrator'] || null,
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
          value: r['Double Vibrator'] || '',
          description: r['Triple Vibrator'] || null,
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

  console.log('--- JUPITER DOUBLE & TRIPLE VIBRATOR MODEL SUCCESSFULLY PERSISTED IN DATABASE ---');
}

persistDoubleTripleVibrator()
  .catch((err) => {
    console.error('Seed error:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

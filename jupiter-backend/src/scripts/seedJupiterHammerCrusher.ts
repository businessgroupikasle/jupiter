import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const backendProductsUploads = path.resolve('d:/Project/jupiter/jupiter-backend/uploads/products');

export const JUPITER_HAMMER_CRUSHER_DATA = {
  id: 'cmus_jupiter_ji_hammer_crusher_model',
  name: 'Jupiter JI Hammer Crusher – 6 Ton Material Crushing Machine',
  slug: 'ji-hammer-crusher-machine',
  category: 'Hammer Crusher / Material Processing Equipment',
  description: `The Jupiter JI Hammer Crusher Machine is an industrial material crushing machine designed for processing materials into fine grains for construction material manufacturing applications.

The machine features a specified capacity of 6 tons and delivers a production output of approximately 2 tonnes per hour (TPH), making it suitable for commercial material processing requirements.

Equipped with a 5 HP motor, the hammer crusher operates using a three-phase electrical supply with a Direct-On-Line (DOL) starter for motor operation.

The machine produces processed material in the 3–5 mm fine-grain size range, supporting material preparation requirements in brick manufacturing applications.

With a specified machine weight of 500 kg, the JI Hammer Crusher offers an industrial crushing configuration for material processing facilities.

The machine is presented for applications associated with fly ash brick and mud brick manufacturing, where appropriately sized processed materials may be required.

The Jupiter JI Hammer Crusher combines a 5 HP power requirement, 2 TPH production capacity and fine-grain output to support construction material processing operations.`,
  capacity: '2 TPH (Tonnes per Hour)',
  capacityLabel: 'Production Capacity',
  power: '5 HP (Specified Power Requirement)',
  powerLabel: 'Total Connected Power',
  brickSize: '3–5 mm Fine Grains',
  brickSizeLabel: 'Output Material Size',
  machineCapacity: '6 Tons',
  outputMaterialSize: '3–5 mm Fine Grains',
  image: '/uploads/products/jupiter-ji-hammer-crusher.png',
  imageUrl: '/uploads/products/jupiter-ji-hammer-crusher.png',
  brandTag: 'JUPITER INDUSTRIES',
  status: 'Active',
  isActive: true,
  order: 1,
  featureBadges: [
    '2 TPH Production Capacity',
    '5 HP Motor Power',
    '3–5 mm Fine Grain Output',
    '3-Phase Electrical Supply',
  ],
  highlights: [
    {
      id: 'hl-crusher-1',
      title: '2 TPH Material Crushing Capacity',
      description:
        'Delivers a specified production capacity of 2 tonnes per hour to support material crushing and processing requirements in industrial manufacturing facilities.',
      displayOrder: 1,
    },
    {
      id: 'hl-crusher-2',
      title: '3–5 mm Fine Grain Output',
      description:
        'Designed to produce crushed material in the 3–5 mm size range for applications requiring fine-grain material preparation.',
      displayOrder: 2,
    },
    {
      id: 'hl-crusher-3',
      title: '5 HP Three-Phase Motor System',
      description:
        'Operates with a 5 HP power requirement and three-phase electrical supply, supported by a DOL starter for motor operation.',
      displayOrder: 3,
    },
    {
      id: 'hl-crusher-4',
      title: 'Industrial Material Processing Design',
      description:
        'Features a specified 6 ton machine capacity and 500 kg machine weight for material crushing applications associated with brick manufacturing.',
      displayOrder: 4,
    },
  ],
  specTableColumns: ['Parameter', 'Details', 'Specification'],
  specTableRows: [
    { Parameter: 'Machine Model', Details: 'JI Hammer Crusher', Specification: 'Jupiter Industries' },
    { Parameter: 'Machine Type', Details: 'Hammer Crusher', Specification: 'Material Processing Equipment' },
    { Parameter: 'Machine Capacity', Details: '6 Tons', Specification: '—' },
    { Parameter: 'Production Capacity', Details: '2 TPH', Specification: 'Tonnes per Hour' },
    { Parameter: 'Power Requirement', Details: '5 HP', Specification: '—' },
    { Parameter: 'Electrical Supply', Details: '3 Phase', Specification: '—' },
    { Parameter: 'Starter Type', Details: 'DOL', Specification: 'Direct-On-Line Starter' },
    { Parameter: 'Machine Weight', Details: '500 kg', Specification: '—' },
    { Parameter: 'Output Material Size', Details: '3–5 mm', Specification: 'Fine Grains' },
    { Parameter: 'Listed Application', Details: 'Fly Ash Bricks', Specification: '—' },
    { Parameter: 'Listed Application', Details: 'Mud Bricks', Specification: '—' },
  ],
  keyFeatures: [
    'Jupiter JI Hammer Crusher with a specified 6 ton capacity and production output of 2 tonnes per hour.',
    '5 HP power requirement with a three-phase electrical supply and Direct-On-Line (DOL) starter.',
    'Produces crushed material in the 3–5 mm fine-grain size range for industrial material processing applications.',
    '500 kg machine weight with applications listed for fly ash brick and mud brick manufacturing.',
  ],
  advantages: [
    {
      id: 'adv-crusher-1',
      title: 'Efficient Material Crushing Capacity',
      description:
        'Supports industrial material processing with a production capacity of 2 tonnes per hour for brick manufacturing and construction material preparation requirements.',
      displayOrder: 1,
    },
    {
      id: 'adv-crusher-2',
      title: 'Fine Grain Material Output',
      description:
        'Produces crushed material in the specified 3–5 mm size range, supporting applications that require fine-grain material preparation.',
      displayOrder: 2,
    },
    {
      id: 'adv-crusher-3',
      title: 'Three-Phase Electrical Operation',
      description:
        "The 5 HP motor power requirement, three-phase electrical supply and DOL starter support the machine's industrial electrical operation.",
      displayOrder: 3,
    },
    {
      id: 'adv-crusher-4',
      title: 'Brick Manufacturing Applications',
      description:
        'Designed for material crushing operations associated with fly ash brick and mud brick manufacturing, supporting raw material preparation requirements.',
      displayOrder: 4,
    },
  ],
  seoMetaTitle: 'JI Hammer Crusher Machine 5 HP | Jupiter Industries',
  seoMetaDescription:
    'Explore Jupiter Industries\' JI Hammer Crusher with 5 HP power, 2 TPH production, 3–5 mm fine grain output and 3-phase electrical operation.',
  focusKeyword: 'JI Hammer Crusher Machine',
  secondaryKeywords:
    'Hammer Crusher Machine, Industrial Hammer Crusher, 5 HP Hammer Crusher, 2 TPH Hammer Crusher, Brick Making Material Crusher, Fine Grain Crushing Machine, Hammer Crusher Manufacturer, Hammer Crusher Machine in Coimbatore',
};

async function persistHammerCrusher() {
  console.log('--- SEEDING JUPITER JI HAMMER CRUSHER INTO DATABASE ---');

  const prodData = JUPITER_HAMMER_CRUSHER_DATA;

  const specsPayload: Record<string, any> = {
    brandTag: prodData.brandTag,
    capacity: prodData.capacity,
    capacityLabel: prodData.capacityLabel,
    power: prodData.power,
    powerLabel: prodData.powerLabel,
    brickSize: prodData.brickSize,
    brickSizeLabel: prodData.brickSizeLabel,
    machineCapacity: prodData.machineCapacity,
    outputMaterialSize: prodData.outputMaterialSize,
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
        { slug: prodData.slug },
        { id: prodData.id },
        { name: { contains: 'Hammer Crusher', mode: 'insensitive' } },
        { slug: { contains: 'hammer-crusher', mode: 'insensitive' } },
      ],
    },
  });

  let productRecord: any;

  if (existing) {
    console.log(`Found existing product record (${existing.id}, ${existing.slug}). Updating in-place...`);
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
          isActive: prodData.isActive,
          order: prodData.order,
          specifications: specsPayload,
        },
      });

      await tx.productImage.deleteMany({ where: { productId: existing.id } });
      await tx.productImage.create({
        data: {
          productId: existing.id,
          url: prodData.image,
          isPrimary: true,
          order: 0,
        },
      });

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

  console.log('--- JUPITER JI HAMMER CRUSHER SUCCESSFULLY PERSISTED IN DATABASE ---');
}

persistHammerCrusher()
  .catch((err) => {
    console.error('Seed error:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

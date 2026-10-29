import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const backendProductsUploads = path.resolve('d:/Project/jupiter/jupiter-backend/uploads/products');

export const JUPITER_BATCHING_PLANT_DATA = {
  id: 'cmus_jupiter_ji_batching_plant_model',
  name: 'Jupiter JI Batching Plant – 3 & 4 Bin Models',
  slug: '3-4-bin-batching-plant',
  category: 'Batching Plant',
  description: `The Jupiter JI 3 & 4 Bin Batching Plant is an industrial raw material storage and batching system designed to support fly ash brick and concrete block manufacturing operations.

Available in three-bin and four-bin configurations, the plant provides flexible storage arrangements for handling different raw materials used in brick manufacturing.

The system features a PLC control mechanism that supports controlled material handling and organised batching operations.

Designed for materials such as fly ash, quarry waste, 6 mm jelly stone and cement, the Jupiter JI Batching Plant helps organise raw material supply during manufacturing.

Its multiple storage bin configurations allow manufacturers to select a suitable arrangement based on their material handling and production requirements.

With PLC-based control and dedicated material storage compartments, the Jupiter JI Batching Plant provides a practical solution for managing raw materials in brick manufacturing facilities.`,
  capacity: '', // Leave blank – not specified
  capacityLabel: 'Production Capacity',
  power: '', // Leave blank – not specified
  powerLabel: 'Total Connected Power',
  brickSize: '', // Leave blank – not specified
  brickSizeLabel: 'Brick / Mould Size',
  storageConfiguration: '3 Bin / 4 Bin',
  storageConfigurationLabel: 'Storage Configuration',
  image: '/uploads/products/jupiter-ji-batching-plant.png',
  imageUrl: '/uploads/products/jupiter-ji-batching-plant.png',
  brandTag: 'JUPITER INDUSTRIES',
  status: 'Active',
  isActive: true,
  order: 1,
  featureBadges: [
    '3 & 4 Bin Storage Options',
    'PLC Control System',
    'Multi-Material Storage',
    'Fly Ash Brick Plant Support',
  ],
  highlights: [
    {
      id: 'hl-batching-1',
      title: '3 & 4 Bin Storage Configurations',
      description:
        'Available in three-bin and four-bin configurations to accommodate different raw material storage requirements for brick manufacturing plants.',
      displayOrder: 1,
    },
    {
      id: 'hl-batching-2',
      title: 'PLC-Controlled Batching System',
      description:
        'Features a PLC control system to support controlled material handling and batching operations.',
      displayOrder: 2,
    },
    {
      id: 'hl-batching-3',
      title: 'Multiple Raw Material Compatibility',
      description:
        'Designed to handle fly ash, quarry waste, 6 mm jelly stone and cement used in brick and block manufacturing.',
      displayOrder: 3,
    },
    {
      id: 'hl-batching-4',
      title: 'Organised Material Handling',
      description:
        'Multiple storage compartments support the organised storage and supply of raw materials for brick manufacturing operations.',
      displayOrder: 4,
    },
  ],
  specTableColumns: ['Parameter', 'Details', 'Specification'],
  specTableRows: [
    { Parameter: 'Machine Model', Details: 'JI Patching Plant', Specification: '3 & 4 Bin Models' },
    { Parameter: 'Machine Type', Details: 'Raw Material Batching Plant', Specification: 'Fly Ash Brick Plant Equipment' },
    { Parameter: 'Storage Configuration', Details: '3 Bin', Specification: '4 Bin Option' },
    { Parameter: 'Control System', Details: 'PLC Control', Specification: '—' },
    { Parameter: 'Raw Material 1', Details: 'Fly Ash', Specification: '—' },
    { Parameter: 'Raw Material 2', Details: 'Quarry Waste', Specification: '—' },
    { Parameter: 'Raw Material 3', Details: '6 mm Jelly Stone', Specification: '—' },
    { Parameter: 'Raw Material 4', Details: 'Cement', Specification: '—' },
  ],
  keyFeatures: [
    'Available in three-bin and four-bin storage configurations for different raw material handling requirements.',
    'PLC control system supports controlled batching operations and organised material handling.',
    'Compatible with fly ash, quarry waste, 6 mm jelly stone and cement used in brick manufacturing.',
    'Multiple storage compartments support systematic raw material storage and supply for production plants.',
  ],
  advantages: [
    {
      id: 'adv-batching-1',
      title: 'Flexible Material Storage Options',
      description:
        'Three-bin and four-bin configurations allow manufacturers to select a storage arrangement based on their raw material handling requirements.',
      displayOrder: 1,
    },
    {
      id: 'adv-batching-2',
      title: 'Controlled Batching Operations',
      description:
        'PLC-based controls support the management of material handling and batching activities within the production workflow.',
      displayOrder: 2,
    },
    {
      id: 'adv-batching-3',
      title: 'Multiple Raw Material Compatibility',
      description:
        'Supports the storage and handling of fly ash, quarry waste, 6 mm jelly stone and cement for brick manufacturing applications.',
      displayOrder: 3,
    },
    {
      id: 'adv-batching-4',
      title: 'Organised Production Workflow',
      description:
        'Dedicated raw material storage compartments help maintain an organised material supply process for brick and block manufacturing facilities.',
      displayOrder: 4,
    },
  ],
  seoMetaTitle: '3 & 4 Bin Batching Plant Manufacturer | Jupiter Industries',
  seoMetaDescription:
    "Explore Jupiter Industries' 3 & 4 Bin Batching Plant with PLC control and storage for fly ash, quarry waste, 6 mm jelly stone and cement.",
  focusKeyword: '3 & 4 Bin Batching Plant',
  secondaryKeywords:
    'Three Bin Batching Plant, Four Bin Batching Plant, Fly Ash Brick Batching Plant, PLC Controlled Batching Plant, Raw Material Batching Plant, Industrial Batching Plant Manufacturer, Batching Plant in Coimbatore',
};

async function persistBatchingPlant() {
  console.log('--- SEEDING JUPITER JI 3 & 4 BIN BATCHING PLANT INTO DATABASE ---');

  const prodData = JUPITER_BATCHING_PLANT_DATA;

  const specsPayload: Record<string, any> = {
    brandTag: prodData.brandTag,
    capacity: prodData.capacity,
    capacityLabel: prodData.capacityLabel,
    power: prodData.power,
    powerLabel: prodData.powerLabel,
    brickSize: prodData.brickSize,
    brickSizeLabel: prodData.brickSizeLabel,
    storageConfiguration: prodData.storageConfiguration,
    storageConfigurationLabel: prodData.storageConfigurationLabel,
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
        { name: { contains: 'Batching Plant', mode: 'insensitive' } },
        { slug: { contains: 'batching-plant', mode: 'insensitive' } },
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

  console.log('--- JUPITER JI 3 & 4 BIN BATCHING PLANT SUCCESSFULLY PERSISTED IN DATABASE ---');
}

persistBatchingPlant()
  .catch((err) => {
    console.error('Seed error:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

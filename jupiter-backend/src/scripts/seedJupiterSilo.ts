import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const backendProductsUploads = path.resolve('d:/Project/jupiter/jupiter-backend/uploads/products');

export const JUPITER_SILO_DATA = {
  id: 'cmus_jupiter_ji_silo_model',
  name: 'JI Fly Ash and Cement Silo – 60 & 100 Ton Storage System',
  slug: 'fly-ash-cement-silo-60-100-ton',
  category: 'Storage Silo',
  description: `The Jupiter JI Fly Ash and Cement Silo is an industrial bulk material storage system designed for fly ash brick manufacturing plants, concrete production facilities and construction material processing operations.

Available in 60 ton and 100 ton storage configurations, the silo provides bulk storage capacity for essential raw materials such as fly ash and cement.

The system features an air compressor-based operating arrangement to support material handling requirements in industrial production environments.

The supplied specifications also indicate a hydraulic lifting arrangement, supporting equipment handling requirements associated with the silo system.

Designed for manufacturers requiring dedicated fly ash and cement storage facilities, the Jupiter JI Silo offers two capacity options to accommodate different material storage requirements.

With its high-capacity storage configurations and air compressor system, the Jupiter Fly Ash and Cement Silo provides a practical solution for raw material management in brick and block manufacturing facilities.`,
  capacity: '60 Ton / 100 Ton',
  capacityLabel: 'Storage Capacity',
  power: '', // Leave blank – not specified
  powerLabel: 'Total Connected Power',
  brickSize: '', // Leave blank – not specified
  brickSizeLabel: 'Brick / Mould Size',
  storageCapacity: '60 Ton / 100 Ton',
  operatingSystem: 'Air Compressor',
  rawMaterials: 'Fly Ash, Cement',
  image: '/uploads/products/jupiter-ji-fly-ash-cement-silo.png',
  imageUrl: '/uploads/products/jupiter-ji-fly-ash-cement-silo.png',
  brandTag: 'JUPITER INDUSTRIES',
  status: 'Active',
  isActive: true,
  order: 1,
  featureBadges: [
    '60 & 100 Ton Capacity',
    'Air Compressor System',
    'Hydraulic Lifting Arrangement',
    'Fly Ash & Cement Storage',
  ],
  highlights: [
    {
      id: 'hl-silo-1',
      title: '60 & 100 Ton Storage Capacity',
      description:
        'Available in 60 ton and 100 ton configurations to accommodate different bulk material storage requirements in industrial manufacturing plants.',
      displayOrder: 1,
    },
    {
      id: 'hl-silo-2',
      title: 'Air Compressor Operating System',
      description:
        'Features an air compressor-based running system to support material handling operations associated with silo storage.',
      displayOrder: 2,
    },
    {
      id: 'hl-silo-3',
      title: 'Fly Ash & Cement Compatibility',
      description:
        'Designed for bulk storage of fly ash and cement used in brick manufacturing, concrete production and construction material processing.',
      displayOrder: 3,
    },
    {
      id: 'hl-silo-4',
      title: 'Hydraulic Lifting Arrangement',
      description:
        "The specified hydraulic lifting arrangement supports the equipment's handling requirements, subject to confirmation of the manufacturer's configuration.",
      displayOrder: 4,
    },
  ],
  specTableColumns: ['Parameter', 'Details', 'Specification'],
  specTableRows: [
    { Parameter: 'Machine Model', Details: 'JI Silos', Specification: 'Fly Ash & Cement' },
    { Parameter: 'Equipment Type', Details: 'Industrial Storage Silo', Specification: 'Bulk Material Storage' },
    { Parameter: 'Storage Capacity', Details: '60 Tons', Specification: '100 Tons Option' },
    { Parameter: 'Running System', Details: 'Air Compressor', Specification: '—' },
    { Parameter: 'Lifting Arrangement', Details: 'Hydraulic', Specification: 'Terminology to be Confirmed' },
    { Parameter: 'Raw Material 1', Details: 'Fly Ash', Specification: '—' },
    { Parameter: 'Raw Material 2', Details: 'Cement', Specification: '—' },
    { Parameter: 'Application', Details: 'Raw Material Storage', Specification: 'Brick & Block Manufacturing' },
  ],
  keyFeatures: [
    'Available in 60 ton and 100 ton storage capacity configurations for industrial fly ash and cement storage requirements.',
    'Air compressor-based operating system supporting material handling operations associated with silo storage.',
    'Hydraulic lifting arrangement specified for the silo equipment, with the exact configuration subject to confirmation.',
    'Suitable for bulk storage of fly ash and cement used in brick manufacturing and construction material production.',
  ],
  advantages: [
    {
      id: 'adv-silo-1',
      title: 'High-Capacity Bulk Material Storage',
      description:
        'Provides 60 ton and 100 ton storage options to support the bulk material requirements of commercial and industrial manufacturing facilities.',
      displayOrder: 1,
    },
    {
      id: 'adv-silo-2',
      title: 'Air Compressor-Based Operation',
      description:
        'The air compressor running system supports the material handling requirements associated with fly ash and cement silo operations.',
      displayOrder: 2,
    },
    {
      id: 'adv-silo-3',
      title: 'Flexible Storage Capacity Options',
      description:
        'Manufacturers can select between 60 ton and 100 ton silo configurations based on their production scale and raw material storage requirements.',
      displayOrder: 3,
    },
    {
      id: 'adv-silo-4',
      title: 'Organised Raw Material Management',
      description:
        'Dedicated silo storage supports organised handling and availability of fly ash and cement for brick and block manufacturing operations.',
      displayOrder: 4,
    },
  ],
  seoMetaTitle: 'Fly Ash & Cement Silo 60 & 100 Ton | Jupiter Industries',
  seoMetaDescription:
    'Explore Jupiter Industries\' Fly Ash and Cement Silo with 60 and 100 ton storage capacity, air compressor operation and hydraulic lifting system.',
  focusKeyword: 'Fly Ash and Cement Silo',
  secondaryKeywords:
    'Fly Ash Storage Silo, Cement Storage Silo, 60 Ton Cement Silo, 100 Ton Cement Silo, Industrial Cement Silo, Fly Ash Silo Manufacturer, Bulk Cement Storage System, Cement Silo Manufacturer in Coimbatore',
};

async function persistSilo() {
  console.log('--- SEEDING JUPITER JI FLY ASH AND CEMENT SILO INTO DATABASE ---');

  const prodData = JUPITER_SILO_DATA;

  const specsPayload: Record<string, any> = {
    brandTag: prodData.brandTag,
    capacity: prodData.capacity,
    capacityLabel: prodData.capacityLabel,
    power: prodData.power,
    powerLabel: prodData.powerLabel,
    brickSize: prodData.brickSize,
    brickSizeLabel: prodData.brickSizeLabel,
    storageCapacity: prodData.storageCapacity,
    operatingSystem: prodData.operatingSystem,
    rawMaterials: prodData.rawMaterials,
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
        { name: { contains: 'Silo', mode: 'insensitive' } },
        { slug: { contains: 'silo', mode: 'insensitive' } },
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

  console.log('--- JUPITER JI FLY ASH AND CEMENT SILO SUCCESSFULLY PERSISTED IN DATABASE ---');
}

persistSilo()
  .catch((err) => {
    console.error('Seed error:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

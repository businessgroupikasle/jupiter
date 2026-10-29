import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const backendProductsUploads = path.resolve('d:/Project/jupiter/jupiter-backend/uploads/products');

export const JUPITER_4BRICKS_FEEDER_DATA = {
  id: 'cmus_jupiter_4bricks_feeder_model',
  name: 'Automatic Fly Ash Brick Making Machine – 4 Bricks Feeder Model',
  slug: '4-bricks-feeder-fly-ash-brick-making-machine',
  category: 'Fly Ash Brick Machine',
  description: `The Jupiter 4 Bricks Feeder Automatic Fly Ash Brick Making Machine is a hydraulically operated brick manufacturing machine designed for commercial fly ash brick production.

Equipped with a 10 HP hydraulic operating system, the machine delivers a production capacity of approximately 1,200 to 1,300 bricks per hour, supporting the manufacturing requirements of fly ash brick production units.

The machine features an automatic feeder system with a 30 kg feeder box capacity, helping maintain an organised raw material feeding process during brick manufacturing.

Its hydraulic system includes a single cylinder for pressing and ejection operations, supported by a 210-litre oil tank and Grade 68 hydraulic oil.

The machine is available with MS or hardened EN8 mould material options and supports single and double groove fly ash brick configurations.

An integrated PLC control system supports controlled production operations. The machine is suitable for manufacturing fly ash bricks using fly ash, lime, dust and cement.`,
  capacity: '1,200–1,300 Bricks per Hour',
  capacityLabel: 'Production Capacity',
  power: '10 HP (specified power rating)',
  powerLabel: 'Total Connected Power',
  brickSize: '230 × 230 × 75 mm (requires verification)',
  brickSizeLabel: 'Brick / Mould Size',
  image: '/uploads/products/1--9-1791953822843-158196456.png',
  imageUrl: '/uploads/products/1--9-1791953822843-158196456.png',
  brandTag: 'JUPITER INDUSTRIES',
  status: 'Active',
  isActive: true,
  order: 7,
  featureBadges: [
    '4 Bricks Feeder Model',
    '1,200–1,300 Bricks/Hour',
    'Automatic Feeder System',
    'PLC Control System',
  ],
  highlights: [
    {
      id: 'hl-4bf-1',
      title: 'Automatic 4 Bricks Feeder System',
      description: 'Features an automatic feeder mechanism with a 30 kg feeder box capacity to support organised raw material feeding during fly ash brick production.',
      displayOrder: 1,
    },
    {
      id: 'hl-4bf-2',
      title: 'Efficient Hydraulic Pressing System',
      description: 'Equipped with a 10 HP hydraulic operating system and a single hydraulic cylinder for brick pressing and ejection operations.',
      displayOrder: 2,
    },
    {
      id: 'hl-4bf-3',
      title: 'MS & Hardened EN8 Mould Options',
      description: 'Offers MS or hardened EN8 mould material options with support for single and double groove fly ash brick manufacturing.',
      displayOrder: 3,
    },
    {
      id: 'hl-4bf-4',
      title: 'PLC-Controlled Brick Manufacturing',
      description: 'Integrated PLC control system supports controlled machine operation and efficient management of the brick manufacturing process.',
      displayOrder: 4,
    },
  ],
  specTableColumns: ['Parameter', 'Details', 'Specification'],
  specTableRows: [
    { Parameter: 'Machine Model', Details: '4 Bricks Feeder Model', Specification: 'Automatic Fly Ash Brick Machine' },
    { Parameter: 'Machine Type', Details: 'Automatic Feeder', Specification: 'Hydraulic Brick Making Machine' },
    { Parameter: 'Production Capacity', Details: '1,200–1,300', Specification: 'Bricks per Hour' },
    { Parameter: 'Power', Details: '10 HP', Specification: '—' },
    { Parameter: 'Operating System', Details: 'Hydraulic', Specification: '—' },
    { Parameter: 'Hydraulic Cylinder', Details: '1', Specification: 'Pressing & Ejection' },
    { Parameter: 'Oil Tank Capacity', Details: '210 Litres', Specification: '—' },
    { Parameter: 'Oil Grade', Details: '68', Specification: '—' },
    { Parameter: 'Feeding System', Details: 'Automatic Feeder', Specification: '4 Bricks Model' },
    { Parameter: 'Feeder Box Capacity', Details: '30 kg', Specification: '—' },
    { Parameter: 'Control System', Details: 'PLC Control', Specification: '—' },
    { Parameter: 'Mould Material', Details: 'MS / EN8', Specification: 'Hardening Option' },
    { Parameter: 'Brick Groove', Details: 'Single & Double', Specification: '—' },
    { Parameter: 'Brick Size', Details: '230 × 230 × 75 mm', Specification: 'Requires Verification' },
    { Parameter: 'Raw Materials', Details: 'Fly Ash, Lime, Dust', Specification: 'Cement' },
  ],
  keyFeatures: [
    'Automatic 4 Bricks Feeder Fly Ash Brick Making Machine with a production capacity of 1,200 to 1,300 bricks per hour.',
    '10 HP hydraulic operating system with a single cylinder for brick pressing and ejection operations.',
    'Automatic material feeding with a 30 kg feeder box, PLC control system and 210-litre hydraulic oil tank.',
    'MS or hardened EN8 mould material options with single and double groove fly ash brick configurations.',
  ],
  advantages: [
    {
      id: 'adv-4bf-1',
      title: 'Automated Brick Manufacturing',
      description: 'The automatic feeder system and PLC controls support an organised production process with a manufacturing capacity of up to 1,300 bricks per hour.',
      displayOrder: 1,
    },
    {
      id: 'adv-4bf-2',
      title: 'Efficient Hydraulic Operation',
      description: 'The 10 HP hydraulic system with a single pressing and ejection cylinder supports controlled brick compression and removal during the manufacturing cycle.',
      displayOrder: 2,
    },
    {
      id: 'adv-4bf-3',
      title: 'Flexible Mould Configurations',
      description: 'MS and hardened EN8 mould options with single and double groove configurations provide flexibility for different fly ash brick production requirements.',
      displayOrder: 3,
    },
    {
      id: 'adv-4bf-4',
      title: 'Controlled Raw Material Feeding',
      description: 'The 30 kg automatic feeder box supports consistent material feeding, while compatibility with fly ash, lime, dust and cement offers flexibility in raw material selection.',
      displayOrder: 4,
    },
  ],
  seoMetaTitle: '4 Brick Feeder Fly Ash Brick Machine | Jupiter Industries',
  seoMetaDescription: `Explore Jupiter Industries' 4 Bricks Feeder Fly Ash Brick Making Machine with 10 HP hydraulic power, PLC control and 1,200–1,300 bricks per hour capacity.`,
  focusKeyword: '4 Bricks Feeder Fly Ash Brick Making Machine',
  secondaryKeywords: 'Automatic Fly Ash Brick Making Machine, 4 Brick Feeder Machine, Hydraulic Fly Ash Brick Machine, PLC Controlled Brick Making Machine, Automatic Feeder Brick Machine, Fly Ash Brick Machine Manufacturer',
};

async function persist4BricksFeeder() {
  console.log('--- SEEDING JUPITER 4 BRICKS FEEDER MODEL INTO DATABASE ---');

  const prodData = JUPITER_4BRICKS_FEEDER_DATA;

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

  console.log('--- JUPITER 4 BRICKS FEEDER MODEL SUCCESSFULLY PERSISTED IN DATABASE ---');
}

persist4BricksFeeder()
  .catch((err) => {
    console.error('Seed error:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

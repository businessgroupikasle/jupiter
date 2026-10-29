import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const backendProductsUploads = path.resolve('d:/Project/jupiter/jupiter-backend/uploads/products');

export const JUPITER_V10B_DATA = {
  id: 'cmus_jupiter_v10b_model',
  name: 'Jupiter V 10 B – 100 Ton High Speed Fly Ash Brick Making Machine',
  slug: 'jupiter-v-10-b-fly-ash-brick-making-machine',
  category: 'Fly Ash Brick Machine',
  description: `The Jupiter V 10 B Fly Ash Brick Making Machine is a high-speed hydraulic brick manufacturing machine designed for commercial and industrial production requirements.

Equipped with a powerful 100 ton hydraulic pressing system, the machine supports effective brick compression using a single-cylinder configuration. It offers a production capacity of approximately 2,300 to 2,400 fly ash bricks per hour.

The machine features a 10 HP main motor, 2 HP brick ejection motor and 1 HP heat exchanger. Its heavy pressing belt and 100-litre pre-fill tank support the hydraulic pressing process.

With a PLC control panel, 500-litre oil tank and specified motor brands including Siemens, Crompton and Havells, the Jupiter V 10 B provides a controlled solution for fly ash brick manufacturing.`,
  capacity: '2,300–2,400 Bricks per Hour',
  capacityLabel: 'Production Capacity',
  power: 'Not specified (Main Motor: 10 HP)',
  powerLabel: 'Total Connected Power',
  brickSize: '230 × 105 × 75 mm',
  brickSizeLabel: 'Brick / Mould Size',
  image: '/uploads/products/1--10-1791953431092-625007853.png',
  imageUrl: '/uploads/products/1--10-1791953431092-625007853.png',
  brandTag: 'JUPITER INDUSTRIES',
  status: 'Active',
  isActive: true,
  order: 1,
  featureBadges: [
    '100 Ton Hydraulic Press',
    '2,300–2,400 Bricks/Hour',
    'PLC Control System',
    'Single Cylinder Pressing',
  ],
  highlights: [
    {
      id: 'hl-v10b-1',
      title: '100 Ton Hydraulic Pressing System',
      description: 'Powerful 100 ton single-cylinder hydraulic pressing system supports effective compression during fly ash brick manufacturing.',
    },
    {
      id: 'hl-v10b-2',
      title: 'High-Speed Brick Production',
      description: 'Delivers approximately 2,300 to 2,400 bricks per hour to support commercial brick manufacturing operations.',
    },
    {
      id: 'hl-v10b-3',
      title: 'PLC-Based Machine Control',
      description: 'Integrated PLC control panel supports controlled machine operation and production workflow management.',
    },
    {
      id: 'hl-v10b-4',
      title: 'Heavy-Duty Hydraulic Components',
      description: 'Features a heavy pressing belt, 500-litre oil tank and 100-litre pre-fill tank for hydraulic operation.',
    },
  ],
  specTableColumns: ['Parameter', 'Details', 'Specification'],
  specTableRows: [
    { Parameter: 'Machine Model', Details: 'Jupiter V 10 B', Specification: 'High Speed' },
    { Parameter: 'Machine Type', Details: 'JIM 100 Tons', Specification: 'Fly Ash Brick Machine' },
    { Parameter: 'Production Capacity', Details: '2,300–2,400', Specification: 'Bricks per Hour' },
    { Parameter: 'Hydraulic Pressing Load', Details: '100 Tons', Specification: 'Single Cylinder' },
    { Parameter: 'Main Motor Capacity', Details: '10 HP', Specification: '—' },
    { Parameter: 'Brick Eject Motor', Details: '2 HP', Specification: '1.5 kW' },
    { Parameter: 'Heat Exchanger', Details: '1 HP', Specification: '0.75 kW' },
    { Parameter: 'Oil Tank Capacity', Details: '500 Litres', Specification: '—' },
    { Parameter: 'Pressing Belt', Details: 'Heavy Pressing Belt', Specification: '—' },
    { Parameter: 'Pre-Fill Tank Capacity', Details: '100 Litres', Specification: '—' },
    { Parameter: 'Control System', Details: 'PLC Control Panel', Specification: '—' },
    { Parameter: 'Motor Brands', Details: 'Siemens, Crompton, Havells', Specification: '—' },
    { Parameter: 'Brick Size', Details: '230 × 105 × 75 mm', Specification: '—' },
  ],
  keyFeatures: [
    '100 ton single-cylinder hydraulic pressing system for fly ash brick production.',
    'High-speed manufacturing capacity of 2,300 to 2,400 bricks per hour.',
    'PLC control panel with a 500-litre oil tank and 100-litre pre-fill tank.',
    '10 HP main motor, dedicated brick ejection motor and heat exchanger.',
  ],
  advantages: [
    {
      id: 'adv-v10b-1',
      title: 'Commercial Production Capacity',
      description: 'Supports fly ash brick manufacturing requirements with a production output of up to 2,400 bricks per hour.',
    },
    {
      id: 'adv-v10b-2',
      title: 'Powerful Hydraulic Compression',
      description: 'The 100 ton single-cylinder pressing arrangement supports effective compression of fly ash bricks.',
    },
    {
      id: 'adv-v10b-3',
      title: 'Controlled Machine Operation',
      description: 'PLC-based control helps manage the manufacturing cycle and hydraulic machine operations.',
    },
    {
      id: 'adv-v10b-4',
      title: 'Industrial Hydraulic Configuration',
      description: 'Heavy pressing belt, pre-fill tank and separate brick ejection system support the production process.',
    },
  ],
  seoMetaTitle: 'Jupiter V 10 B Fly Ash Brick Machine | Jupiter Industries',
  seoMetaDescription: 'Explore the Jupiter V 10 B fly ash brick making machine with 100 ton hydraulic pressing, PLC control and a production capacity of 2,300–2,400 bricks per hour.',
  focusKeyword: 'Jupiter V 10 B Fly Ash Brick Making Machine',
  secondaryKeywords: '100 Ton Fly Ash Brick Machine, High Speed Fly Ash Brick Machine, Hydraulic Brick Making Machine, PLC Controlled Brick Machine',
};

export const JUPITER_V12B_DATA = {
  id: 'cmus_jupiter_v12b_model',
  name: 'Jupiter V 12 B – 50+2 Ton High Speed Fly Ash Brick Making Machine',
  slug: 'jupiter-v-12-b-fly-ash-brick-making-machine',
  category: 'Fly Ash Brick Machine',
  description: `The Jupiter V 12 B Fly Ash Brick Making Machine is a high-speed hydraulic brick production system designed to support commercial and industrial fly ash brick manufacturing.

Featuring a 50+2 ton hydraulic pressing load with double main cylinders, this machine offers a production capacity of approximately 2,700 to 2,800 bricks per hour.

The machine operates with a 15 HP hydraulic motor, a dedicated 2 HP brick ejection motor and a 1 HP heat exchanger.

Its hydraulic configuration includes a 500-litre oil tank, heavy pressing belt and 100-litre pre-fill tank. The integrated PLC control panel supports controlled machine operations.

With motors specified from Siemens, Crompton and Havells, the Jupiter V 12 B offers a high-speed solution for manufacturing standard 230 × 105 × 75 mm fly ash bricks.`,
  capacity: '2,700–2,800 Bricks per Hour',
  capacityLabel: 'Production Capacity',
  power: 'Not specified (Hydraulic Motor: 15 HP / 11.25 kW)',
  powerLabel: 'Total Connected Power',
  brickSize: '230 × 105 × 75 mm',
  brickSizeLabel: 'Brick / Mould Size',
  image: '/uploads/products/1--4-1791953419156-189672038.png',
  imageUrl: '/uploads/products/1--4-1791953419156-189672038.png',
  brandTag: 'JUPITER INDUSTRIES',
  status: 'Active',
  isActive: true,
  order: 2,
  featureBadges: [
    '50+2 Ton Hydraulic Press',
    '2,700–2,800 Bricks/Hour',
    'Double Main Cylinder',
    'PLC Control Panel',
  ],
  highlights: [
    {
      id: 'hl-v12b-1',
      title: '50+2 Ton Double Cylinder Press',
      description: 'Hydraulic pressing system with double main cylinders delivers a specified pressing load of 50+2 tons.',
    },
    {
      id: 'hl-v12b-2',
      title: 'High Production Capacity',
      description: 'Supports commercial fly ash brick manufacturing with an output of approximately 2,700 to 2,800 bricks per hour.',
    },
    {
      id: 'hl-v12b-3',
      title: 'Powerful 15 HP Hydraulic Motor',
      description: 'Features a 15 HP hydraulic motor supported by separate brick ejection and heat exchanger motors.',
    },
    {
      id: 'hl-v12b-4',
      title: 'PLC-Controlled Production',
      description: 'PLC control panel with a heavy pressing belt and 100-litre pre-fill tank supports controlled brick production.',
    },
  ],
  specTableColumns: ['Parameter', 'Details', 'Specification'],
  specTableRows: [
    { Parameter: 'Machine Model', Details: 'Jupiter V 12 B', Specification: 'High Speed' },
    { Parameter: 'Machine Type', Details: 'JIM 50+2 Tons', Specification: 'Fly Ash Brick Machine' },
    { Parameter: 'Production Capacity', Details: '2,700–2,800', Specification: 'Bricks per Hour' },
    { Parameter: 'Hydraulic Pressing Load', Details: '50+2 Tons', Specification: 'Double Main Cylinder' },
    { Parameter: 'Hydraulic Motor', Details: '15 HP', Specification: '11.25 kW' },
    { Parameter: 'Brick Eject Motor', Details: '2 HP', Specification: '1.5 kW' },
    { Parameter: 'Heat Exchanger', Details: '1 HP', Specification: '0.75 kW' },
    { Parameter: 'Oil Tank Capacity', Details: '500 Litres', Specification: '—' },
    { Parameter: 'Pressing Belt', Details: 'Heavy Pressing Belt', Specification: '—' },
    { Parameter: 'Pre-Fill Tank Capacity', Details: '100 Litres', Specification: '—' },
    { Parameter: 'Control System', Details: 'PLC Control Panel', Specification: '—' },
    { Parameter: 'Motor Brands', Details: 'Siemens, Crompton, Havells', Specification: '—' },
    { Parameter: 'Brick Size', Details: '230 × 105 × 75 mm', Specification: '—' },
  ],
  keyFeatures: [
    '50+2 ton hydraulic pressing system with double main cylinders.',
    'High-speed production capacity of 2,700 to 2,800 fly ash bricks per hour.',
    '15 HP hydraulic motor with dedicated brick ejection motor and heat exchanger.',
    'PLC control panel with heavy pressing belt, 500-litre oil tank and 100-litre pre-fill tank.',
  ],
  advantages: [
    {
      id: 'adv-v12b-1',
      title: 'Higher Brick Production Output',
      description: 'Supports commercial manufacturing with a production capacity of up to 2,800 fly ash bricks per hour.',
    },
    {
      id: 'adv-v12b-2',
      title: 'Double Cylinder Pressing System',
      description: 'The 50+2 ton double main cylinder arrangement supports hydraulic compression during the brick manufacturing process.',
    },
    {
      id: 'adv-v12b-3',
      title: 'Dedicated Motor Configuration',
      description: 'Separate hydraulic, brick ejection and heat exchanger motors support their respective machine operations.',
    },
    {
      id: 'adv-v12b-4',
      title: 'PLC-Based Operational Control',
      description: 'PLC control panel helps manage machine functions and supports an organised production workflow.',
    },
  ],
  seoMetaTitle: 'Jupiter V 12 B Fly Ash Brick Machine | Jupiter Industries',
  seoMetaDescription: 'Discover the Jupiter V 12 B high speed fly ash brick machine with 50+2 ton hydraulic pressing, double main cylinders and 2,700–2,800 bricks per hour capacity.',
  focusKeyword: 'Jupiter V 12 B Fly Ash Brick Making Machine',
  secondaryKeywords: '50+2 Ton Fly Ash Brick Machine, Double Cylinder Brick Making Machine, Hydraulic Fly Ash Brick Press, High Speed Brick Making Machine',
};

export const JUPITER_V15B_DATA = {
  id: 'cmus8mqtn000bkwtfhsvexaxi',
  name: 'Jupiter V 15 B – 80+2 Ton High Speed Fly Ash Brick Making Machine',
  slug: 'jupiter-v-15-b-fly-ash-brick-making-machine',
  category: 'Fly Ash Brick Machine',
  description: `The Jupiter V 15 B Fly Ash Brick Making Machine is a high-capacity, high-speed hydraulic brick production system developed for industrial fly ash brick manufacturing requirements.

Designed with an 80+2 ton hydraulic pressing load and double main cylinders, the machine delivers a production capacity of approximately 3,500 to 3,600 bricks per hour.

The machine is equipped with a 15 HP hydraulic motor, a 2 HP brick ejection motor and a 1 HP heat exchanger to support its production operations.

Its heavy pressing belt, 500-litre hydraulic oil tank and 100-litre pre-fill tank form part of the hydraulic system.

An integrated PLC control panel supports controlled machine operation, while Siemens, Crompton and Havells are the motor brands specified for this model.

The Jupiter V 15 B is suitable for manufacturers requiring higher hourly production output using a 230 × 105 × 75 mm brick size.`,
  capacity: '3,500–3,600 Bricks per Hour',
  capacityLabel: 'Production Capacity',
  power: 'Not specified (Hydraulic Motor: 15 HP / 11.25 kW)',
  powerLabel: 'Total Connected Power',
  brickSize: '230 × 105 × 75 mm',
  brickSizeLabel: 'Brick / Mould Size',
  image: '/uploads/products/1--4-1791024895795-221812260.png',
  imageUrl: '/uploads/products/1--4-1791024895795-221812260.png',
  brandTag: 'JUPITER INDUSTRIES',
  status: 'Active',
  isActive: true,
  order: 3,
  featureBadges: [
    '80+2 Ton Hydraulic Press',
    '3,500–3,600 Bricks/Hour',
    'Double Main Cylinder',
    'PLC Control System',
  ],
  highlights: [
    {
      id: 'hl-v15b-1',
      title: 'High-Capacity Brick Manufacturing',
      description: 'Delivers a production capacity of approximately 3,500 to 3,600 fly ash bricks per hour for industrial manufacturing requirements.',
    },
    {
      id: 'hl-v15b-2',
      title: '80+2 Ton Hydraulic Pressing',
      description: 'Double main cylinder system provides an 80+2 ton hydraulic pressing load for effective brick compression.',
    },
    {
      id: 'hl-v15b-3',
      title: '15 HP Hydraulic Motor System',
      description: 'Equipped with a 15 HP hydraulic motor, separate brick eject motor and heat exchanger for machine operation.',
    },
    {
      id: 'hl-v15b-4',
      title: 'PLC Control & Heavy Pressing Belt',
      description: 'PLC control panel combined with a heavy pressing belt and 100-litre pre-fill tank supports the production process.',
    },
  ],
  specTableColumns: ['Parameter', 'Details', 'Specification'],
  specTableRows: [
    { Parameter: 'Machine Model', Details: 'Jupiter V 15 B', Specification: 'High Speed' },
    { Parameter: 'Machine Type', Details: 'JIM 80+2 Tons', Specification: 'Fly Ash Brick Machine' },
    { Parameter: 'Production Capacity', Details: '3,500–3,600', Specification: 'Bricks per Hour' },
    { Parameter: 'Hydraulic Pressing Load', Details: '80+2 Tons', Specification: 'Double Main Cylinder' },
    { Parameter: 'Hydraulic Motor', Details: '15 HP', Specification: '11.25 kW' },
    { Parameter: 'Brick Eject Motor', Details: '2 HP', Specification: '1.5 kW' },
    { Parameter: 'Heat Exchanger', Details: '1 HP', Specification: '0.75 kW' },
    { Parameter: 'Oil Tank Capacity', Details: '500 Litres', Specification: '—' },
    { Parameter: 'Pressing Belt', Details: 'Heavy Pressing Belt', Specification: '—' },
    { Parameter: 'Pre-Fill Tank Capacity', Details: '100 Litres', Specification: '—' },
    { Parameter: 'Control System', Details: 'PLC Control Panel', Specification: '—' },
    { Parameter: 'Motor Brands', Details: 'Siemens, Crompton, Havells', Specification: '—' },
    { Parameter: 'Brick Size', Details: '230 × 105 × 75 mm', Specification: '—' },
  ],
  keyFeatures: [
    '80+2 ton hydraulic pressing load with double main cylinders.',
    'High-speed manufacturing capacity of 3,500 to 3,600 bricks per hour.',
    '15 HP hydraulic motor, 2 HP brick eject motor and 1 HP heat exchanger.',
    'PLC control panel with 500-litre hydraulic oil tank, heavy pressing belt and 100-litre pre-fill tank.',
  ],
  advantages: [
    {
      id: 'adv-v15b-1',
      title: 'High-Volume Brick Production',
      description: 'Offers a production capacity of up to 3,600 fly ash bricks per hour for industrial manufacturing requirements.',
    },
    {
      id: 'adv-v15b-2',
      title: 'Heavy-Duty Hydraulic Compression',
      description: 'The 80+2 ton double main cylinder pressing system supports effective compression during brick production.',
    },
    {
      id: 'adv-v15b-3',
      title: 'Controlled Machine Performance',
      description: 'PLC control panel helps manage the hydraulic production cycle and machine operating functions.',
    },
    {
      id: 'adv-v15b-4',
      title: 'Industrial Production Configuration',
      description: 'The heavy pressing belt, pre-fill tank and separate motor systems support high-speed fly ash brick manufacturing.',
    },
  ],
  seoMetaTitle: 'Jupiter V 15 B Fly Ash Brick Machine | Jupiter Industries',
  seoMetaDescription: 'Explore the Jupiter V 15 B high speed fly ash brick making machine with 80+2 ton hydraulic pressing, PLC control and 3,500–3,600 bricks per hour capacity.',
  focusKeyword: 'Jupiter V 15 B Fly Ash Brick Making Machine',
  secondaryKeywords: '80+2 Ton Fly Ash Brick Machine, Industrial Fly Ash Brick Making Machine, High Capacity Brick Making Machine, Double Cylinder Hydraulic Brick Press',
};

async function syncProductToDb(prodData: typeof JUPITER_V10B_DATA) {
  const specsPayload = {
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
        ...(prodData.id === 'cmus8mqtn000bkwtfhsvexaxi' ? [{ slug: 'jupiter-v-15-b-model-high-speed-fly-ash-brick-making-machine' }] : []),
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
      prodData.keyFeatures.forEach((kf, idx) => {
        detailItems.push({ productId: existing.id, type: 'KeyFeature', title: kf, order: idx });
      });
      prodData.featureBadges.forEach((fb, idx) => {
        detailItems.push({ productId: existing.id, type: 'FeatureBadge', title: fb, order: idx });
      });
      prodData.specTableRows.forEach((r, idx) => {
        detailItems.push({ productId: existing.id, type: 'Specification', title: r.Parameter, value: r.Details, description: r.Specification, order: idx });
      });
      await tx.productDetailItem.createMany({ data: detailItems });
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
          specifications: specsPayload,
          isActive: prodData.isActive,
          order: prodData.order,
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
      prodData.keyFeatures.forEach((kf, idx) => {
        detailItems.push({ productId: p.id, type: 'KeyFeature', title: kf, order: idx });
      });
      prodData.featureBadges.forEach((fb, idx) => {
        detailItems.push({ productId: p.id, type: 'FeatureBadge', title: fb, order: idx });
      });
      prodData.specTableRows.forEach((r, idx) => {
        detailItems.push({ productId: p.id, type: 'Specification', title: r.Parameter, value: r.Details, description: r.Specification, order: idx });
      });
      await tx.productDetailItem.createMany({ data: detailItems });
      return p;
    });
    console.log(`[Database Seed] Created: ${productRecord.name} (id=${productRecord.id})`);
  }

  // Backup image file to Media table
  const imageFilename = path.basename(prodData.image);
  const diskPath = path.join(backendProductsUploads, imageFilename);
  if (fs.existsSync(diskPath)) {
    const fileBuf = fs.readFileSync(diskPath);
    const existingMedia = await prisma.media.findFirst({
      where: { filename: imageFilename },
    });
    if (!existingMedia) {
      await prisma.media.create({
        data: {
          filename: imageFilename,
          mimeType: imageFilename.endsWith('.png') ? 'image/png' : 'image/jpeg',
          size: fileBuf.length,
          data: fileBuf,
          url: prodData.image,
          productId: productRecord.id,
        },
      });
      console.log(`[Database Seed] Backed up ${imageFilename} to Media table`);
    }
  }
}

async function main() {
  console.log('--- SEEDING OFFICIAL JUPITER V MODELS ---');
  await syncProductToDb(JUPITER_V10B_DATA);
  await syncProductToDb(JUPITER_V12B_DATA);
  await syncProductToDb(JUPITER_V15B_DATA as any);

  // Normalize other fly ash brick machine orders so V10B, V12B, V15B are 1, 2, 3
  const otherMachines = await prisma.product.findMany({
    where: {
      category: 'Fly Ash Brick Machine',
      NOT: {
        id: { in: ['cmus_jupiter_v10b_model', 'cmus_jupiter_v12b_model', 'cmus8mqtn000bkwtfhsvexaxi'] },
      },
    },
    orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
  });

  for (let i = 0; i < otherMachines.length; i++) {
    await prisma.product.update({
      where: { id: otherMachines[i].id },
      data: { order: i + 4 },
    });
  }

  console.log('--- ALL 3 JUPITER V MODELS SUCCESSFULLY PERSISTED IN DATABASE ---');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

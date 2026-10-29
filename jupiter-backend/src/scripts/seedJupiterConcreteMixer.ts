import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const backendProductsUploads = path.resolve('d:/Project/jupiter/jupiter-backend/uploads/products');

export const JUPITER_CONCRETE_MIXER_DATA = {
  id: 'cmus_jupiter_je_concrete_mixer_model',
  name: 'Jupiter JE Cement Concrete Mixer – 350 kg & 500 kg Models',
  slug: 'cement-concrete-mixer-350-500-kg',
  category: 'Concrete Mixer Machine',
  description: `The Jupiter JE Cement Concrete Mixer is an industrial concrete mixing machine designed for preparing raw material mixtures used in fly ash brick manufacturing, concrete block production and construction material processing.

Available in 350 kg and 500 kg capacity configurations, the machine offers different mixing options to accommodate commercial and industrial manufacturing requirements.

The mixer is specified with 15 HP and 20 HP power options, supporting material mixing operations based on the selected machine configuration.

The supplied specifications also indicate a hydraulic lifting arrangement, which is intended to support material handling during the mixing process.

The Jupiter Concrete Mixer is suitable for working with materials such as fly ash, iron oxide, sludge, quarry waste, 6 mm jelly stone and cement.

With multiple capacity options and compatibility with different construction materials, the Jupiter JE Cement Concrete Mixer provides a practical solution for brick manufacturing plants and concrete production facilities.`,
  capacity: '350 kg / 500 kg',
  capacityLabel: 'Mixing Capacity',
  power: '15 HP / 20 HP (Depending on Model)',
  powerLabel: 'Total Connected Power',
  brickSize: '', // Leave blank – not applicable
  brickSizeLabel: 'Brick / Mould Size',
  mixingCapacity: '350 kg / 500 kg',
  image: '/uploads/products/jupiter-je-cement-concrete-mixer.png',
  imageUrl: '/uploads/products/jupiter-je-cement-concrete-mixer.png',
  brandTag: 'JUPITER INDUSTRIES',
  status: 'Active',
  isActive: true,
  order: 1,
  featureBadges: [
    '350 & 500 kg Capacity',
    '15 HP & 20 HP Options',
    'Hydraulic Lifting System',
    'Multi-Material Mixing',
  ],
  highlights: [
    {
      id: 'hl-mixer-1',
      title: '350 kg & 500 kg Mixing Capacity',
      description:
        'Available in 350 kg and 500 kg configurations to accommodate different raw material mixing requirements in brick and block manufacturing plants.',
      displayOrder: 1,
    },
    {
      id: 'hl-mixer-2',
      title: '15 HP & 20 HP Power Options',
      description:
        'Features specified 15 HP and 20 HP power configurations to support industrial concrete and raw material mixing operations.',
      displayOrder: 2,
    },
    {
      id: 'hl-mixer-3',
      title: 'Hydraulic Lifting Arrangement',
      description:
        'The specified hydraulic lifting arrangement supports material handling requirements associated with the concrete mixing process.',
      displayOrder: 3,
    },
    {
      id: 'hl-mixer-4',
      title: 'Multiple Raw Material Compatibility',
      description:
        'Suitable for mixing fly ash, iron oxide, sludge, quarry waste, 6 mm jelly stone and cement used in construction material manufacturing.',
      displayOrder: 4,
    },
  ],
  specTableColumns: ['Parameter', 'Details', 'Specification'],
  specTableRows: [
    { Parameter: 'Machine Model', Details: 'JI Concrete Mixer', Specification: 'JE Cement Concrete Mixer' },
    { Parameter: 'Machine Type', Details: 'Industrial Concrete Mixer', Specification: 'Material Mixing Equipment' },
    { Parameter: 'Capacity Option 1', Details: '500 kg', Specification: '—' },
    { Parameter: 'Capacity Option 2', Details: '350 kg', Specification: '—' },
    { Parameter: 'Power Option 1', Details: '20 HP', Specification: '—' },
    { Parameter: 'Power Option 2', Details: '15 HP', Specification: '—' },
    { Parameter: 'Lifting System', Details: 'Hydraulic', Specification: 'Exact Configuration to Be Confirmed' },
    { Parameter: 'Raw Material 1', Details: 'Fly Ash', Specification: '—' },
    { Parameter: 'Raw Material 2', Details: 'Iron Oxide', Specification: '—' },
    { Parameter: 'Raw Material 3', Details: 'Sludge', Specification: '—' },
    { Parameter: 'Raw Material 4', Details: 'Quarry Waste', Specification: '—' },
    { Parameter: 'Raw Material 5', Details: '6 mm Jelly Stone', Specification: '—' },
    { Parameter: 'Raw Material 6', Details: 'Cement', Specification: '—' },
  ],
  keyFeatures: [
    'Industrial cement concrete mixer available in 350 kg and 500 kg capacity configurations for different manufacturing requirements.',
    '15 HP and 20 HP power options for concrete and construction material mixing operations.',
    'Hydraulic lifting arrangement specified for material handling during the mixing process.',
    'Compatible with fly ash, iron oxide, sludge, quarry waste, 6 mm jelly stone and cement.',
  ],
  advantages: [
    {
      id: 'adv-mixer-1',
      title: 'Flexible Mixing Capacity Options',
      description:
        'Available in 350 kg and 500 kg configurations, allowing manufacturers to select a suitable mixer based on raw material processing requirements.',
      displayOrder: 1,
    },
    {
      id: 'adv-mixer-2',
      title: 'Industrial Mixing Performance',
      description:
        'The specified 15 HP and 20 HP power options support concrete and raw material mixing applications for brick and block manufacturing facilities.',
      displayOrder: 2,
    },
    {
      id: 'adv-mixer-3',
      title: 'Hydraulic Material Handling',
      description:
        'The hydraulic lifting arrangement is intended to assist with material handling during concrete mixing operations.',
      displayOrder: 3,
    },
    {
      id: 'adv-mixer-4',
      title: 'Versatile Raw Material Compatibility',
      description:
        'Supports mixing different construction materials, including fly ash, iron oxide, sludge, quarry waste, jelly stone and cement, for manufacturing applications.',
      displayOrder: 4,
    },
  ],
  seoMetaTitle: 'Cement Concrete Mixer 350 & 500 kg | Jupiter Industries',
  seoMetaDescription:
    "Explore Jupiter Industries' Cement Concrete Mixer with 350 kg and 500 kg capacity options, 15 HP and 20 HP power ratings, and a hydraulic lifting system.",
  focusKeyword: 'Cement Concrete Mixer Machine',
  secondaryKeywords:
    'Concrete Mixer Machine, Hydraulic Concrete Mixer, 350 kg Concrete Mixer, 500 kg Concrete Mixer, Industrial Concrete Mixing Machine, Fly Ash Brick Material Mixer, Concrete Mixer Manufacturer, Concrete Mixer Machine in Coimbatore',
};

async function persistConcreteMixer() {
  console.log('--- SEEDING JUPITER JE CEMENT CONCRETE MIXER INTO DATABASE ---');

  const prodData = JUPITER_CONCRETE_MIXER_DATA;

  const specsPayload: Record<string, any> = {
    brandTag: prodData.brandTag,
    capacity: prodData.capacity,
    capacityLabel: prodData.capacityLabel,
    power: prodData.power,
    powerLabel: prodData.powerLabel,
    brickSize: prodData.brickSize,
    brickSizeLabel: prodData.brickSizeLabel,
    mixingCapacity: prodData.mixingCapacity,
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
        { name: { contains: 'Concrete Mixer', mode: 'insensitive' } },
        { slug: { contains: 'concrete-mixer', mode: 'insensitive' } },
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

  console.log('--- JUPITER JE CEMENT CONCRETE MIXER SUCCESSFULLY PERSISTED IN DATABASE ---');
}

persistConcreteMixer()
  .catch((err) => {
    console.error('Seed error:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

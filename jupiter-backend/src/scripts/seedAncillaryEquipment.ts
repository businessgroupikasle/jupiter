import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const frontendCatalogueDir = path.resolve('d:/Project/jupiter/jupiter-frontend/public/images/catalogue');
const backendUploadsProductsDir = path.resolve('d:/Project/jupiter/jupiter-backend/uploads/products');

export const SEED_ANCILLARY_EQUIPMENT = [
  {
    id: 'ancillary-pan-mixer',
    name: 'Pan Mixer',
    categoryBadge: 'Planetary Mixing System',
    compatibilityBadge: 'OEM Standard',
    image: '/images/catalogue/pan-mixer.png',
    layoutType: 'standard',
    specs: [
      {
        label: 'Capacity',
        value: '1000 kg, 750 kg, 500 kg, 350 kg, 250 kg',
        isPillList: true,
      },
      {
        label: 'Power Required',
        value: '30 HP, 25 HP, 20 HP, 15 HP, 10 HP',
        isPillList: true,
      },
      {
        label: 'Gear Box',
        value: 'V10, V9, V8, V7, V6',
        isPillList: false,
      },
      {
        label: 'Method Of Mixing',
        value: 'Heavy Rollers With Hard Faced Scrappers',
        isPillList: false,
      },
    ],
    quoteLabel: 'Get Pan Mixer Quote',
    whatsAppMessage: 'Hello Jupiter, I am interested in the Pan Mixer specifications and pricing.',
    applicableCategories: ['fly-ash-brick-machine'],
    order: 1,
    isActive: true,
  },
  {
    id: 'ancillary-conveyor',
    name: 'Belt Conveyor',
    categoryBadge: 'Continuous Material Feed',
    compatibilityBadge: 'OEM Standard',
    image: '/images/catalogue/conveyor.png',
    layoutType: 'standard',
    specs: [
      {
        label: 'Capacity',
        value: '2 Tons',
        isPillList: false,
      },
      {
        label: 'Power Required',
        value: '3 HP',
        isPillList: false,
      },
      {
        label: 'Gear Box',
        value: '337/40:1',
        isPillList: false,
      },
      {
        label: 'Storage Mode',
        value: 'Thro Intermittent Bins',
        isPillList: false,
      },
    ],
    quoteLabel: 'Get Conveyor Quote',
    whatsAppMessage: 'Hello Jupiter, I am interested in the Belt Conveyor pricing.',
    applicableCategories: ['fly-ash-brick-machine'],
    order: 2,
    isActive: true,
  },
  {
    id: 'ancillary-pallet-truck',
    name: 'Pallet Truck Systems',
    categoryBadge: 'Material Handling & Transport',
    compatibilityBadge: 'Dual Configurations',
    image: '/images/catalogue/pallet-truck-type1.png',
    layoutType: 'dual_variant',
    variants: [
      {
        id: 'var-type1',
        name: 'Type 1 – Manual',
        image: '/images/catalogue/pallet-truck-type1.png',
        description: 'Hand Pallet Truck 250 kg Capacity with Wheels and 550 mm Fork Width.',
        imageClass: 'pdp-pallet-img-type1',
      },
      {
        id: 'var-type2',
        name: 'Type 2 – Hydraulic',
        image: '/images/catalogue/pallet-truck-type2.png',
        description: 'Heavy-Duty Hydraulic Tri-Wheel Lifting Vehicle for Stacked Brick Pallets.',
      },
    ],
    specsTitle: 'Type 2 Technical Specifications',
    specs: [
      {
        label: 'Capacity',
        value: 'Hand Pallet Truck 500 kg',
        isPillList: false,
      },
      {
        label: 'Wheels',
        value: '3 Wheels',
        isPillList: false,
      },
      {
        label: 'System',
        value: 'Hydraulic Lifting Vehicles',
        isPillList: false,
      },
    ],
    quoteLabel: 'Get Pallet Truck Quote',
    whatsAppMessage: 'Hello Jupiter, I am interested in the Pallet Truck pricing.',
    applicableCategories: ['fly-ash-brick-machine'],
    order: 3,
    isActive: true,
  },
  {
    id: 'ancillary-wheel-barrow',
    name: 'Wheel Barrows',
    categoryBadge: 'On-Site Raw Material Hauling',
    compatibilityBadge: 'Heavy-Duty Tub',
    image: '/images/catalogue/wheel-barrow.png',
    layoutType: 'standard',
    specs: [
      {
        label: 'Capacity',
        value: '50 kg',
        isPillList: false,
      },
      {
        label: 'Wheels',
        value: '2 Wheels',
        isPillList: false,
      },
    ],
    quoteLabel: 'Get Wheel Barrow Quote',
    whatsAppMessage: 'Hello Jupiter, I am interested in the Wheel Barrow specifications and pricing.',
    applicableCategories: ['fly-ash-brick-machine'],
    order: 4,
    isActive: true,
  },
  {
    id: 'ancillary-pan-mixer-500-350',
    name: 'Pan Mixer',
    categoryBadge: 'Planetary Mixing System',
    compatibilityBadge: 'OEM Standard',
    image: '/images/catalogue/pan-mixer.png',
    layoutType: 'standard',
    specs: [
      {
        label: 'Capacity',
        value: '500 kg, 350 kg',
        isPillList: false,
      },
      {
        label: 'Power Required',
        value: '20 HP, 10 HP',
        isPillList: false,
      },
      {
        label: 'Discharging Point',
        value: 'By Opening Bottom Door Manually',
        isPillList: false,
      },
      {
        label: 'Raw Material',
        value: 'Mixing Of Raw Material Of Flyash Bricks Or Second Layer Of Paver Blocks',
        isPillList: false,
      },
      {
        label: 'Method Of Mixing',
        value: 'By Using Heavy Rollers With Hard Faced Scrappers',
        isPillList: false,
      },
    ],
    quoteLabel: 'Get Pan Mixer Quote',
    whatsAppMessage: 'Hello Jupiter, I am interested in the Pan Mixer (500 kg / 350 kg) specifications and pricing.',
    applicableCategories: ['fly-ash-brick-machine'],
    order: 5,
    isActive: true,
  },
  {
    id: 'ancillary-pallet-truck-05ton',
    name: 'Pallet Truck',
    categoryBadge: 'Material Handling & Transport',
    compatibilityBadge: 'Hydraulic Lifting',
    image: '/images/catalogue/pallet-truck-type2.png',
    layoutType: 'standard',
    specs: [
      {
        label: 'Capacity',
        value: '0.5 Ton (500 kg)',
        isPillList: false,
      },
      {
        label: 'Wheels',
        value: '3 Wheels',
        isPillList: false,
      },
      {
        label: 'System',
        value: 'Hydraulic Lifting by Hand Pumping',
        isPillList: false,
      },
    ],
    quoteLabel: 'Get Pallet Truck Quote',
    whatsAppMessage: 'Hello Jupiter, I am interested in the Pallet Truck (0.5 Ton / 3 Wheels) specifications and pricing.',
    applicableCategories: ['fly-ash-brick-machine'],
    order: 6,
    isActive: true,
  },
  {
    id: 'ancillary-reversible-concrete-mixer',
    name: 'Reversible Concrete Mixer',
    categoryBadge: 'Reversible Drum Mixing System',
    compatibilityBadge: 'RM 800 / RM 1050 / RM 1500',
    image: '/images/catalogue/reversible-concrete-mixer.png',
    layoutType: 'standard',
    specs: [
      {
        label: 'Model Options',
        value: 'RM 800, RM 1050, RM 1500',
        isPillList: true,
      },
      {
        label: 'Mixing Volume',
        value: '0.3, 0.4, 0.6 Cu. Mtr',
        isPillList: true,
      },
      {
        label: 'Power Required',
        value: '10 HP, 12 HP, 17 HP',
        isPillList: true,
      },
      {
        label: 'Drive System',
        value: 'Gear Box',
        isPillList: false,
      },
      {
        label: 'Operating System',
        value: 'Hydraulic',
        isPillList: false,
      },
      {
        label: 'Machine Weight',
        value: '2900 kg, 3100 kg, 3500 kg',
        isPillList: false,
      },
    ],
    quoteLabel: 'Get Concrete Mixer Quote',
    whatsAppMessage: 'Hello Jupiter, I am interested in the Reversible Concrete Mixer (RM 800 / RM 1050 / RM 1500) specifications and pricing.',
    applicableCategories: ['fly-ash-brick-machine'],
    order: 7,
    isActive: true,
  },
  {
    id: 'ancillary-pan-mixer-heavy-duty',
    name: 'Pan Mixer',
    categoryBadge: 'Heavy-Duty Pan Mixing System',
    compatibilityBadge: 'Multiple Capacity Options',
    image: '/images/catalogue/pan-mixer-heavy-duty.png',
    layoutType: 'standard',
    specs: [
      {
        label: 'Capacity',
        value: '400 kg, 500 kg, 750 kg',
        isPillList: true,
      },
      {
        label: 'Power Required',
        value: '15 HP, 20 HP, 25 HP',
        isPillList: true,
      },
      {
        label: 'Gear Box',
        value: 'V7, V8, V9',
        isPillList: false,
      },
      {
        label: 'Method Of Mixing',
        value: 'By Using Heavy Rollers With Hard Faced Scrappers',
        isPillList: false,
      },
    ],
    quoteLabel: 'Get Pan Mixer Quote',
    whatsAppMessage: 'Hello Jupiter, I am interested in the Pan Mixer (400 kg / 500 kg / 750 kg) specifications and pricing.',
    applicableCategories: ['fly-ash-brick-machine'],
    order: 8,
    isActive: true,
  },
  {
    id: 'ancillary-concrete-mixer-with-loader',
    name: 'Concrete Mixer with Loader',
    categoryBadge: 'Concrete Mixing System',
    compatibilityBadge: 'Manual Material Handling',
    image: '/images/catalogue/concrete-mixer-with-loader.png',
    layoutType: 'standard',
    specs: [
      {
        label: 'Capacity',
        value: '1 Bag Mixer, 3/4 Bags Mixer',
        isPillList: true,
      },
      {
        label: 'Power Required',
        value: '5 HP, 3 HP',
        isPillList: true,
      },
      {
        label: 'Material Handling',
        value: 'Manual',
        isPillList: false,
      },
      {
        label: 'Method Of Mixing',
        value: 'By Using Hard Faced Scrappers',
        isPillList: false,
      },
    ],
    quoteLabel: 'Get Mixer with Loader Quote',
    whatsAppMessage: 'Hello Jupiter, I am interested in the Concrete Mixer with Loader (1 Bag / 3/4 Bag) specifications and pricing.',
    applicableCategories: ['fly-ash-brick-machine'],
    order: 9,
    isActive: true,
  },
  {
    id: 'ancillary-color-mixer',
    name: 'Color Mixer',
    categoryBadge: 'Color Mixing System',
    compatibilityBadge: 'Manual Material Handling',
    image: '/images/catalogue/color-mixer.png',
    layoutType: 'standard',
    specs: [
      {
        label: 'Capacity',
        value: '100 Bags Mixer, 400 Bags Mixer',
        isPillList: true,
      },
      {
        label: 'Power Required',
        value: '3 HP',
        isPillList: false,
      },
      {
        label: 'Method of Mixing',
        value: 'Combining Two or More Colors to Create a New Color',
        isPillList: false,
      },
      {
        label: 'Material Handling',
        value: 'Manual',
        isPillList: false,
      },
    ],
    quoteLabel: 'Get Color Mixer Quote',
    whatsAppMessage: 'Hello Jupiter, I am interested in the Color Mixer (100 Bags / 400 Bags) specifications and pricing.',
    applicableCategories: ['paver-block-machine'],
    order: 10,
    isActive: true,
  },
  {
    id: 'ancillary-concrete-mixer',
    name: 'Concrete Mixer',
    categoryBadge: 'Concrete Mixing System',
    compatibilityBadge: 'Manual Material Handling',
    image: '/images/catalogue/concrete-mixer.png',
    layoutType: 'standard',
    specs: [
      {
        label: 'Capacity',
        value: '1 Bag Mixer, 3/4 Bags Mixer',
        isPillList: true,
      },
      {
        label: 'Power Required',
        value: '5 HP, 3 HP',
        isPillList: true,
      },
      {
        label: 'Material Handling',
        value: 'Manual',
        isPillList: false,
      },
      {
        label: 'Method of Mixing',
        value: 'By Using With Hard Faced Scrappers',
        isPillList: false,
      },
    ],
    quoteLabel: 'Get Concrete Mixer Quote',
    whatsAppMessage: 'Hello Jupiter, I am interested in the Concrete Mixer (1 Bag / 3/4 Bag) specifications and pricing.',
    applicableCategories: ['fly-ash-brick-machine'],
    order: 11,
    isActive: true,
  },
  {
    id: 'ancillary-pan-mixer-v7-v9',
    name: 'Pan Mixer',
    categoryBadge: 'Heavy-Duty Pan Mixing System',
    compatibilityBadge: 'V7 & V9 Models',
    image: '/images/catalogue/pan-mixer-v7-v9.png',
    layoutType: 'standard',
    specs: [
      {
        label: 'Capacity',
        value: '350 kg, 500 kg',
        isPillList: true,
      },
      {
        label: 'Power Required',
        value: '10 HP',
        isPillList: false,
      },
      {
        label: 'Gear Box',
        value: 'V7, V9',
        isPillList: true,
      },
      {
        label: 'Method Of Mixing',
        value: 'By Using Heavy Rollers With Hard Faced Scrappers',
        isPillList: false,
      },
    ],
    quoteLabel: 'Get Pan Mixer Quote',
    whatsAppMessage: 'Hello Jupiter, I am interested in the Pan Mixer (V7 & V9 Models) specifications and pricing.',
    applicableCategories: ['fly-ash-brick-machine'],
    order: 12,
    isActive: true,
  },
  {
    id: 'ancillary-pallet-truck-hydraulic-hand',
    name: 'Pallet Truck',
    categoryBadge: 'Material Handling & Transport',
    compatibilityBadge: 'Hydraulic Hand Pumping',
    image: '/images/catalogue/pallet-truck-hydraulic-hand.png',
    layoutType: 'standard',
    specs: [
      {
        label: 'Capacity',
        value: '0.5 Ton (500 kg)',
        isPillList: false,
      },
      {
        label: 'Wheels',
        value: '3 Wheels',
        isPillList: false,
      },
      {
        label: 'System',
        value: 'Hydraulic Lifting By Hand Pumping',
        isPillList: false,
      },
    ],
    quoteLabel: 'Get Pallet Truck Quote',
    whatsAppMessage: 'Hello Jupiter, I am interested in the Pallet Truck (Hydraulic Hand Pumping) specifications and pricing.',
    applicableCategories: ['fly-ash-brick-machine'],
    order: 13,
    isActive: true,
  },
  {
    id: 'ancillary-concrete-tray-15ft',
    name: 'Concrete Tray',
    categoryBadge: 'Concrete Handling Equipment',
    compatibilityBadge: '15 Feet',
    image: '/images/catalogue/concrete-tray.png',
    layoutType: 'standard',
    specs: [
      {
        label: 'Size',
        value: '15 Feet',
        isPillList: false,
      },
    ],
    quoteLabel: 'Get Concrete Tray Quote',
    whatsAppMessage: 'Hello Jupiter, I am interested in the Concrete Tray (15 Feet) specifications and pricing.',
    applicableCategories: ['fly-ash-brick-machine'],
    order: 14,
    isActive: true,
  },
];

async function seedAncillaryEquipment() {
  console.log('--- SEEDING RELATED MACHINERY & ANCILLARY EQUIPMENT ---');

  // Ensure backend uploads/products directory exists
  if (!fs.existsSync(backendUploadsProductsDir)) {
    fs.mkdirSync(backendUploadsProductsDir, { recursive: true });
  }

  // Backup and ensure original equipment images
  const images = [
    'pan-mixer.png',
    'conveyor.png',
    'pallet-truck-type1.png',
    'pallet-truck-type2.png',
    'wheel-barrow.png',
    'reversible-concrete-mixer.png',
    'pan-mixer-heavy-duty.png',
    'concrete-mixer-with-loader.png',
    'color-mixer.png',
    'concrete-mixer.png',
    'pan-mixer-v7-v9.png',
    'pallet-truck-hydraulic-hand.png',
    'concrete-tray.png',
  ];

  for (const imgName of images) {
    const srcPath = path.join(frontendCatalogueDir, imgName);
    const destPath = path.join(backendUploadsProductsDir, imgName);

    if (fs.existsSync(srcPath)) {
      if (!fs.existsSync(destPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`[Media Sync] Copied ${imgName} to backend uploads/products`);
      }

      const fileBuf = fs.readFileSync(srcPath);
      await prisma.media.upsert({
        where: { id: `media_ancillary_${imgName}` },
        create: {
          id: `media_ancillary_${imgName}`,
          filename: imgName,
          mimeType: 'image/png',
          size: fileBuf.length,
          data: fileBuf,
          url: `/images/catalogue/${imgName}`,
        },
        update: {
          filename: imgName,
          mimeType: 'image/png',
          size: fileBuf.length,
          data: fileBuf,
          url: `/images/catalogue/${imgName}`,
        },
      });
      console.log(`[Media DB] Backed up ${imgName} (${fileBuf.length} bytes) to Media table`);
    } else {
      console.warn(`[Media Warning] Source image not found at ${srcPath}`);
    }
  }

  // Seed the Ancillary Equipment items
  for (const item of SEED_ANCILLARY_EQUIPMENT) {
    const existing = await prisma.ancillaryEquipment.findUnique({
      where: { id: item.id },
    });

    if (existing) {
      const updated = await prisma.ancillaryEquipment.update({
        where: { id: existing.id },
        data: {
          name: item.name,
          categoryBadge: item.categoryBadge,
          compatibilityBadge: item.compatibilityBadge,
          image: item.image,
          layoutType: item.layoutType,
          variants: (item as any).variants ? (item as any).variants : undefined,
          specsTitle: item.specsTitle || 'Technical Specifications',
          specs: item.specs as any,
          quoteLabel: item.quoteLabel,
          whatsAppMessage: item.whatsAppMessage,
          applicableCategories: item.applicableCategories,
          order: item.order,
          isActive: item.isActive,
        },
      });
      console.log(`[Ancillary Seed] Updated existing equipment: ${updated.name} (id=${updated.id})`);
    } else {
      const created = await prisma.ancillaryEquipment.create({
        data: {
          id: item.id,
          name: item.name,
          categoryBadge: item.categoryBadge,
          compatibilityBadge: item.compatibilityBadge,
          image: item.image,
          layoutType: item.layoutType,
          variants: (item as any).variants ? (item as any).variants : undefined,
          specsTitle: item.specsTitle || 'Technical Specifications',
          specs: item.specs as any,
          quoteLabel: item.quoteLabel,
          whatsAppMessage: item.whatsAppMessage,
          applicableCategories: item.applicableCategories,
          order: item.order,
          isActive: item.isActive,
        },
      });
      console.log(`[Ancillary Seed] Created new equipment: ${created.name} (id=${created.id})`);
    }
  }

  // Ensure global settings has ancillaryEnabledCategories set
  await prisma.setting.upsert({
    where: { id: 'site_settings' },
    update: {
      ancillaryEnabledCategories: ['fly-ash-brick-machine', 'paver-block-machine'],
    },
    create: {
      id: 'site_settings',
      ancillaryEnabledCategories: ['fly-ash-brick-machine', 'paver-block-machine'],
    },
  });
  console.log('[Ancillary Seed] Verified site_settings.ancillaryEnabledCategories');

  console.log('--- ANCILLARY EQUIPMENT SEED COMPLETED SUCCESSFULLY ---');
}

seedAncillaryEquipment()
  .catch((err) => {
    console.error('Seed error:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

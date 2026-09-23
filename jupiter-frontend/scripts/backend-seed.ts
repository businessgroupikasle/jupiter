import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ==========================================
// 1. Comprehensive Machinery Products Catalog
// ==========================================
const sampleProducts = [
  // 1. Vertical Machine
  {
    name: 'Vertical Machine',
    slug: 'vertical-machine',
    category: 'Fly Ash Brick Machine',
    capacity: '10,000 – 20,000 Bricks / Day',
    power: '15 H.P + 2 H.P / 7.5 H.P + 2 H.P',
    image: '/images/flyash-vertical-machine.png',
    description: 'High-efficiency vertical compaction fly ash brick machine with automated feeding and pressing, engineered for manufacturing high compressive strength masonry bricks at 10,000 to 20,000 bricks per day.',
    specifications: {
      brandTag: 'FLY ASH MACHINE',
      brickSize: '230 x 110 x 75 mm (Standard)',
      galleryImages: [
        '/images/flyash-vertical-machine.png',
        '/images/flyash-4brick-rotary.png',
        '/images/flyash-rotary-ton-machine.png'
      ],
      featureBadges: ['Durable Construction', 'Consistent Dimensions', 'Lower Water Absorption', 'Cost-Effective Solution'],
      quickSpecs: [
        { label: 'Capacity', value: '10,000 – 20,000 Bricks / Day' },
        { label: 'Power', value: '15 H.P + 2 H.P / 7.5 H.P + 2 H.P' },
        { label: 'Brick Size', value: '230 x 110 x 75 mm (Standard)' }
      ],
      highlights: [
        { title: 'High Compaction Density', description: 'Delivers sharp block corners, zero internal air voids, and high early compressive strength.' },
        { title: 'Siemens / Delta PLC Automation', description: 'Fully automated cycle management with simple one-touch touchscreen control and safety interlocks.' },
        { title: 'CNC Hardened Alloy Steel Moulds', description: 'Wear-resistant dies machined to exact tolerances ensuring hundreds of thousands of cycles.' },
        { title: 'Heavy-Duty Fabricated Chassis', description: 'Stress-relieved solid steel frame engineered to dampen vibration and withstand continuous 24/7 duty.' }
      ],
      keyFeatures: [
        'Dual output configurations: 15 Bricks per stroke (20,000/day) or 8 Bricks per stroke (10,000/day)',
        'High-tonnage hydraulic cylinders (6 Nos) providing uniform 150 Bar compaction',
        'Large 400 Kgs / 250 Kgs heavy-duty hopper capacity for non-stop feeding',
        'High capacity 400 Ltrs / 125 Ltrs hydraulic oil reservoir with multi-stage cooling',
        'Precision electrical PLC control panel with automated cycle timing'
      ],
      advantages: [
        { title: 'Reduced Cement Consumption', description: 'Optimum particle packing and vibration density reduces cement ratio by up to 25-30% while retaining strength.' },
        { title: 'Zero Plant Downtime', description: 'Backed by Coimbatore OEM spare parts stock and emergency 24-hour service dispatch across India.' },
        { title: 'Uniform Dimensions & Smooth Finish', description: 'Eliminates thick plastering mortar requirements, cutting masonry installation labor costs.' },
        { title: 'Faster Return on Investment', description: 'High production speed with minimal labor dependency ensures early project break-even and profitability.' }
      ],
      specTableColumns: ['Technical Specifications', '15 Bricks Model', '8 Bricks Model'],
      specTableRows: [
        { 'Technical Specifications': 'Bricks per Stroke', '15 Bricks Model': '15', '8 Bricks Model': '8' },
        { 'Technical Specifications': 'Production Rate', '15 Bricks Model': '20000', '8 Bricks Model': '10000' },
        { 'Technical Specifications': 'Hydraulic Motor', '15 Bricks Model': '15 H.P + 2 H.P', '8 Bricks Model': '7.5 H.P + 2 H.P' },
        { 'Technical Specifications': 'Hopper Capacity', '15 Bricks Model': '400 Kgs', '8 Bricks Model': '250 Kgs' },
        { 'Technical Specifications': 'Pressure', '15 Bricks Model': '150 Bar', '8 Bricks Model': '150 Bar' },
        { 'Technical Specifications': 'Hydraulic Cylinders', '15 Bricks Model': '6 Nos', '8 Bricks Model': '6 Nos' },
        { 'Technical Specifications': 'Hydraulic Oil Capacity', '15 Bricks Model': '400 Ltrs', '8 Bricks Model': '125 Ltrs' }
      ]
    }
  },

  // 2. 4 Brick Rotary Machine
  {
    name: '4 Brick Rotary Machine',
    slug: '4-brick-rotary-machine',
    category: 'Fly Ash Brick Machine',
    capacity: '15,000 – 25,000 Bricks per Day',
    power: '15 H.P',
    image: '/images/flyash-4brick-rotary.png',
    description: 'Heavy-duty 4-brick rotary press machine available in Regular Model (15,000-20,000 Bricks/Day) and Speed Model (20,000-25,000 Bricks/Day) with hydraulic motor table rotation.',
    specifications: {
      brandTag: 'FLY ASH MACHINE',
      brickSize: '230 x 110 x 75 to 230 x 200 x 100',
      galleryImages: [
        '/images/flyash-4brick-rotary.png',
        '/images/flyash-vertical-machine.png',
        '/images/flyash-rotary-ton-machine.png'
      ],
      featureBadges: ['80 Ton Compaction', 'Hydraulic Rotary Table', 'Auto/Manual Brick Removal', 'Continuous Operation'],
      highlights: [
        { title: '80 Ton Heavy Clamping', description: 'Delivers ultra-high density fly ash bricks exceeding IS 12894 structural standards.' },
        { title: 'Indexing Rotary Table', description: 'Smooth hydraulic motor driven rotation minimizes wear and maximizes cycle time.' },
        { title: 'Dual Speed Models', description: 'Regular (15K-20K) and Speed (20K-25K) configurations available.' },
        { title: 'Integrated Hydraulic Stacker', description: 'Optional automated mechanical brick removal onto pallets.' }
      ],
      keyFeatures: [
        'JE – 5G 80 Ton heavy structural cast steel frame engineered for continuous production',
        'Dual variant options: Regular Model (15,000 - 20,000) & Speed Model (20,000 - 25,000)',
        '15 H.P high torque electric motor with hydraulic indexing table rotation',
        'Manual and Automated mechanical brick removal configurations available',
        'Wide raw material compatibility: Fly Ash, Iron Oxide, Lime Sludge, Quarry Waste'
      ],
      advantages: [
        { title: 'High Daily Output', description: 'Ensures rapid turnover for commercial brick manufacturing enterprises.' },
        { title: 'Low Power Consumption', description: 'Efficient hydraulic circuit minimizes electrical unit cost per brick.' }
      ],
      specTableColumns: ['Model', 'JE – 5G 80 Ton Machine Regular Model', 'JE – 5G 80 Ton Machine Speed Model'],
      specTableRows: [
        { 'Model': 'Capacity', 'JE – 5G 80 Ton Machine Regular Model': '15000 – 20000 Bricks per Day', 'JE – 5G 80 Ton Machine Speed Model': '20000 – 25000 Bricks per Day' },
        { 'Model': 'Power', 'JE – 5G 80 Ton Machine Regular Model': '15 H.P', 'JE – 5G 80 Ton Machine Speed Model': '15 H.P' },
        { 'Model': 'Brick Size', 'JE – 5G 80 Ton Machine Regular Model': '230 x 110 x 75 to 230 x 200 x 100', 'JE – 5G 80 Ton Machine Speed Model': '230 x 110 x 75 to 230 x 200 x 100' },
        { 'Model': 'Table Rotation', 'JE – 5G 80 Ton Machine Regular Model': 'Hydraulic Motor', 'JE – 5G 80 Ton Machine Speed Model': 'Hydraulic Motor' },
        { 'Model': 'Brick Removal', 'JE – 5G 80 Ton Machine Regular Model': 'Manual', 'JE – 5G 80 Ton Machine Speed Model': 'Auto' }
      ]
    }
  },

  // 3. Rotary Machine (30, 40, 50 Tons)
  {
    name: 'Rotary Machine (30,40,50 Tons)',
    slug: 'rotary-machine-30-40-50-tons',
    category: 'Fly Ash Brick Machine',
    capacity: '8,000 – 12,000 Bricks per Day',
    power: '7.5 H.P',
    image: '/images/flyash-rotary-ton-machine.png',
    description: 'Hydraulic rotary press machine tailored in 30 Ton, 40 Ton, and 50 Ton capacities for entrepreneurs and small-to-medium scale fly ash brick producers.',
    specifications: {
      brandTag: 'FLY ASH MACHINE',
      brickSize: '230 x 110 x 75 mm (Standard)',
      galleryImages: [
        '/images/flyash-rotary-ton-machine.png',
        '/images/flyash-vertical-machine.png'
      ],
      featureBadges: ['Variable Tonnage 30T/40T/50T', 'High Efficiency 7.5 H.P', 'Manual Table Rotation', 'Direct Feed Hopper'],
      specTableColumns: ['Model', '30 Ton Rotary Model', '40 Ton Rotary Model', '50 Ton Rotary Model'],
      specTableRows: [
        { 'Model': 'Capacity', '30 Ton Rotary Model': '8000 Bricks / Day', '40 Ton Rotary Model': '10000 Bricks / Day', '50 Ton Rotary Model': '12000 Bricks / Day' },
        { 'Model': 'Power', '30 Ton Rotary Model': '7.5 H.P', '40 Ton Rotary Model': '7.5 H.P', '50 Ton Rotary Model': '7.5 H.P' },
        { 'Model': 'Pressure', '30 Ton Rotary Model': '30 Ton', '40 Ton Rotary Model': '40 Ton', '50 Ton Rotary Model': '50 Ton' }
      ]
    }
  },

  // 4. Semi-Automatic Hollow and Solid Block Machine
  {
    name: 'Semi-Automatic Block Machine',
    slug: 'semi-automatic-block-machine',
    category: 'Hollow and Solid Block Machine',
    capacity: '2,500 – 4,000 Blocks / Day',
    power: '10 H.P + 3 H.P Vibrator',
    image: '/images/block-machine-semi-auto.png',
    description: 'Heavy duty semi-automatic concrete block making machine equipped with high-G dual vibration motors and hydraulic cylinder compaction for standard hollow blocks, solid bricks, and lightweight masonry.',
    specifications: {
      brandTag: 'BLOCK MAKING MACHINE',
      brickSize: '400 x 200 x 200 mm / 400 x 200 x 150 mm',
      featureBadges: ['High-G Table Vibration', 'Hydraulic Ram Pressure', 'Interchangeable Moulds', 'Heavy Channel Body']
    }
  },

  // 5. Fully Automatic Block Machine (PLC Controlled)
  {
    name: 'Fully Automatic PLC Block Machine',
    slug: 'fully-automatic-plc-block-machine',
    category: 'Hollow and Solid Block Machine',
    capacity: '6,000 – 10,000 Blocks / Day',
    power: '22 H.P Connected Load',
    image: '/images/block-machine-full-auto.png',
    description: 'State-of-the-art fully automated concrete block manufacturing plant with automatic pallet feeder, concrete batch feeder, synchronized directional table vibration, and automatic elevator stacker.',
    specifications: {
      brandTag: 'AUTOMATIC PLANT',
      brickSize: 'Multi-Size Modular Moulds',
      featureBadges: ['Siemens Touchscreen PLC', 'Automatic Pallet Conveyor', 'Proportional Hydraulic Valves', 'Heavy Vibro-Compaction']
    }
  },

  // 6. Hydraulic Interlocking Brick Machine
  {
    name: 'Hydraulic Interlocking Brick Machine',
    slug: 'hydraulic-interlocking-brick-machine',
    category: 'Inter Block Making Machine',
    capacity: '3,000 – 5,000 Bricks / Day',
    power: '10 H.P',
    image: '/images/interlock-machine-product.png',
    description: 'Specialized hydraulic press for producing precision mortarless interlocking bricks, soil-cement stabilized blocks, and decorative self-locking masonry with double-sided compaction.',
    specifications: {
      brandTag: 'INTERLOCK MACHINE',
      brickSize: '300 x 150 x 100 mm / Custom',
      featureBadges: ['Dual-Direction Compaction', 'Mortarless Interlock Fit', 'High Dimensional Precision', 'Zero Plastering Required']
    }
  },

  // 7. Hydraulic Paver Block Machine
  {
    name: 'Hydraulic Paver Block Machine',
    slug: 'hydraulic-paver-block-machine',
    category: 'Paver Block Machine',
    capacity: '4,000 – 8,000 Pavers / Day',
    power: '12.5 H.P',
    image: '/images/paver-block-machine-product.png',
    description: 'High pressure dual-layer paver block making machine with color face layer vibration feed and heavy tonnage hydraulic pressing for heavy duty industrial pavements and decorative pavers.',
    specifications: {
      brandTag: 'PAVER BLOCK MACHINE',
      brickSize: '60 mm / 80 mm / 100 mm Pavers',
      featureBadges: ['Dual-Layer Color Feeding', 'High Compressive Strength', 'Mirror Finish Paver Dies', 'Automated Demoulding']
    }
  },

  // 8. Automatic Concrete Batching Plant
  {
    name: 'Automatic Concrete Batching Plant',
    slug: 'automatic-concrete-batching-plant',
    category: 'Batching Plant',
    capacity: '20 – 45 m³ / Hour',
    power: '45 H.P',
    image: '/images/batching-plant-product.png',
    description: 'High precision multi-bin aggregate batcher and planetary pan mixer with electronic digital load cells for precast factories, ready mix concrete, and brick/block manufacturing plants.',
    specifications: {
      brandTag: 'CONCRETE BATCHING',
      brickSize: 'Ready-Mix Concrete Output',
      featureBadges: ['Electronic Loadcell Weighing', 'Planetary Pan Mixer', 'Multi-Bin Aggregate Hopper', 'SCADA / PLC Controls']
    }
  },

  // 9. Storage Silo (60 & 100 Tons)
  {
    name: 'Cement & Fly Ash Storage Silo',
    slug: 'cement-fly-ash-storage-silo',
    category: 'Storage Silo',
    capacity: '60 Tons & 100 Tons',
    power: '3 H.P Blower / Fluidization',
    image: '/images/storage-silo-product.png',
    description: 'Heavy duty steel welded storage silos engineered for dry bulk cement, fly ash, and mineral fillers with pneumatic aeration pads, top safety relief valve, and dust collection filters.',
    specifications: {
      brandTag: 'BULK STORAGE',
      brickSize: 'Bulk Material Storage',
      featureBadges: ['Pneumatic Fluidization Pad', 'Top Pulse-Jet Dust Filter', 'Safety Pressure Relief Valve', 'Level Indicator Sensors']
    }
  }
];

// ==========================================
// 2. Database Seeding Main Function
// ==========================================
export async function seedDatabase() {
  console.log('🌱 Starting comprehensive database seeding for Jupiter Industries...\n');

  console.log('📦 Seeding Machinery Products & Specifications...');
  for (const prod of sampleProducts) {
    const created = await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {
        name: prod.name,
        category: prod.category,
        capacity: prod.capacity,
        power: prod.power,
        image: prod.image,
        description: prod.description,
        specifications: prod.specifications,
      },
      create: {
        name: prod.name,
        slug: prod.slug,
        category: prod.category,
        capacity: prod.capacity,
        power: prod.power,
        image: prod.image,
        description: prod.description,
        specifications: prod.specifications,
      },
    });
    console.log(`  ✔ [${created.category}] ${created.name} (${created.capacity})`);
  }

  const productCount = await prisma.product.count();
  console.log(`\n✨ Successfully seeded ${productCount} Machinery Products in PostgreSQL!`);
  console.log('🎉 Database seeding completed successfully!');
}

if (typeof require !== 'undefined' && require.main === module) {
  seedDatabase()
    .catch((e) => {
      console.error('❌ Error during database seeding:', e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

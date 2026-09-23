import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ==========================================
// 1. Machinery Products (Jupiter Catalog)
// ==========================================
const sampleProducts = [
  {
    name: 'Fully Automatic Fly Ash Brick Machine',
    slug: 'fully-automatic-fly-ash-brick-machine',
    category: 'Fly Ash Brick Machines',
    description: 'State-of-the-art fully automatic fly ash brick making plant with high hydraulic compression of up to 100 Tons. Features automatic pallet feeding, conveyor material dispatch, and PLC touch screen controls for maximum efficiency and minimum human labour.',
    capacity: '12,000 - 18,000 Bricks / Shift',
    power: '32.5 HP (3 Phase)',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    enquiryCount: 42,
    specifications: {
      pressingCapacity: '100 - 120 Tons Hydraulic',
      brickSize: '230 x 110 x 75 mm / Custom',
      cycleTime: '15 - 18 Seconds',
      oilTankCapacity: '350 Litres',
      rawMaterials: 'Fly Ash, Cement/Lime, Stone Dust, Gypsum',
    },
  },
  {
    name: 'Semi-Automatic Fly Ash Brick Machine',
    slug: 'semi-automatic-fly-ash-brick-machine',
    category: 'Fly Ash Brick Machines',
    description: 'Rugged, cost-effective hydraulic brick making machine engineered for small and medium-scale brick manufacturers. Features manual valve controls with motorized pan mixer and conveyor for dependable daily production.',
    capacity: '6,000 - 8,000 Bricks / Shift',
    power: '22 HP (3 Phase)',
    image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    enquiryCount: 28,
    specifications: {
      pressingCapacity: '70 - 80 Tons Hydraulic',
      brickSize: '230 x 110 x 75 mm',
      cycleTime: '22 Seconds',
      oilTankCapacity: '250 Litres',
      rawMaterials: 'Fly Ash, Lime/Cement, Sand',
    },
  },
  {
    name: 'Heavy-Duty Concrete Hollow Block Machine',
    slug: 'heavy-duty-concrete-hollow-block-machine',
    category: 'Block Machines',
    description: 'Heavy-duty hydraulic vibro-press concrete block machine for producing hollow blocks, solid masonry units, and compound wall blocks with superior dimensional accuracy and compressive strength.',
    capacity: '3,000 - 4,500 Blocks / Shift (8")',
    power: '27.5 HP (3 Phase)',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    enquiryCount: 35,
    specifications: {
      blockTypes: '8" Hollow, 6" Hollow, 4" Partition, Solid Blocks',
      vibrationFrequency: '4,500 RPM Dual Shaft',
      cycleTime: '20 - 25 Seconds',
      palletSize: '900 x 600 x 25 mm',
      mouldChangeTime: '30 - 45 Minutes',
    },
  },
  {
    name: 'Hydraulic Interlocking Paver Block Machine',
    slug: 'hydraulic-interlocking-paver-block-machine',
    category: 'Paver Machines',
    description: 'Multi-cavity hydraulic paver press equipped with top colour feeder attachments to manufacture decorative zig-zag, I-shape, and rectangular interlocking paver blocks for roads, walkways, and commercial compounds.',
    capacity: '5,000 - 7,000 Pavers / Shift',
    power: '25 HP (3 Phase)',
    image: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=800&q=80',
    enquiryCount: 19,
    specifications: {
      paverThickness: '60 mm, 80 mm, 100 mm',
      paverTypes: 'Zig-zag, I-Shape, Hexagonal, Cosmic',
      clampingPressure: '90 Tons',
      colourLayerAttachment: 'Dual Hopper with Feed Chute',
    },
  },
  {
    name: 'Planetary Pan Mixer with Roller (500 KG)',
    slug: 'planetary-pan-mixer-500kg',
    category: 'Batching & Mixing',
    description: 'High-torque industrial planetary pan mixer with heavy-duty wear-resistant Ni-Hard liner plates and spring-loaded mixing blades designed for uniform, lump-free concrete and fly ash mixing.',
    capacity: '500 KG Batch (approx. 10 Ton/hr)',
    power: '10 HP Crompton / ABB Motor',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    enquiryCount: 22,
    specifications: {
      drumDiameter: '1,500 mm',
      linerThickness: '10 mm Replaceable Ni-Hard Plate',
      dischargeGate: 'Pneumatic / Manual Bottom Gate',
      transmission: 'Oil-bath Heavy Duty Worm Reduction Gearbox',
    },
  },
  {
    name: 'Automatic Pallet Stacker & Feeder System',
    slug: 'automatic-pallet-stacker-feeder-system',
    category: 'Material Handling',
    description: 'Hydraulic multi-tier pallet stacker that automatically lifts, stacks, and collects finished green bricks onto wooden or PVC pallets, dramatically cutting manual labour and preventing green brick breakage.',
    capacity: 'Synchronized up to 20 cycles/min',
    power: '5 HP Hydraulic Unit',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    enquiryCount: 14,
    specifications: {
      stackingHeight: 'Up to 5 - 7 tiers',
      palletSuitability: 'Wooden, PVC, Composite Pallets',
      sensorSafety: 'Infrared Proximity Alignment Sensors',
    },
  },
];

// ==========================================
// 2. Technical Blogs & Guides
// ==========================================
const sampleBlogs = [
  {
    slug: 'complete-guide-fly-ash-brick-manufacturing-plant-setup',
    title: 'Complete Guide to Setting Up a Fully Automatic Fly Ash Brick Plant in 2024',
    excerpt: 'Step-by-step roadmap covering land requirement, raw material mix ratio, machinery selection, and government subsidy schemes in India.',
    content: `Fly ash bricks have revolutionized modern construction across India due to their uniform shape, high compressive strength (up to 12-14 N/mm²), and low water absorption. For entrepreneurs and construction contractors, establishing an automatic fly ash brick plant provides substantial return on investment.

### 1. Land & Power Requirements
To install a standard 8-cavity or 10-cavity automatic brick making unit with pan mixer, batching bins, conveyor belts, and hydraulic stacking system, you require:
- **Total Area:** 0.75 to 1.5 Acres (including open yard curing and raw material stockpiles)
- **Covered Shed:** 2,500 - 3,500 sq.ft for machine unit and electrical PLC panel
- **Connected Power:** 25 HP to 45 HP 3-Phase connected load
- **Water Supply:** 3,000 - 5,000 Litres / day for batch mixing and water curing

### 2. Standard Raw Material Formulation
The ideal mix ratio by weight for high-density fly ash bricks:
- **Fly Ash (Class F or C):** 55% - 60%
- **Sand / Stone Dust:** 20% - 25%
- **Hydrated Lime or OPC 53 Cement:** 8% - 12%
- **Gypsum:** 3% - 5%

### 3. Key Machinery Components in Turnkey Line
1. **Planetary Pan Mixer:** High torque gear-driven mixing arms ensure zero lumps.
2. **Hydraulic Press Unit:** 80 to 120 Ton compressive hydraulic pressure ensures sharp edges.
3. **Automatic Pallet Feeder & Stacker:** Reduces manual labour by 70%.
4. **Colour Feeder Attachment:** Optional feeder for multi-colour interlocking paver blocks.

### 4. Government Subsidies & Environmental Norms
Under state industrial policies and PMEGP/MSME subsidy schemes, project subsidies up to 25% - 35% on capital machinery are accessible with guaranteed bank credit assistance.`,
    category: 'Brick Making',
    readTime: '6 min read',
    authorName: 'Er. R. Sundaram',
    authorRole: 'Chief Technical Director, Jupiter Industries',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    date: '10 Sep 2024',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    tags: ['Fly Ash Bricks', 'Plant Setup', 'Project Report', 'Subsidies'],
    keyTakeaways: [
      'Mix ratio: 60% Fly ash, 25% Stone dust, 10% Cement/Lime, 5% Gypsum',
      'Requires 25-40 HP power & 1 acre land footprint',
      'Eligible for MSME capital investment subsidies up to 35%',
      'Daily production output ranges from 8,000 to 18,000 bricks/shift',
    ],
    views: 1420,
  },
  {
    slug: 'concrete-block-machine-vs-fly-ash-brick-machine-comparison',
    title: 'Concrete Hollow Block Machine vs Fly Ash Brick Machine: Which is More Profitable?',
    excerpt: 'Detailed comparison of capital costs, market demand, per-unit profit margins, and production speeds to help you invest wisely.',
    content: `When venturing into precast machinery manufacturing, one of the most critical decisions is whether to invest in a dedicated Concrete Hollow Block Machine or a High-Pressure Fly Ash Brick Plant.

### 1. Market Demand & Applications
- **Concrete Hollow & Solid Blocks:** Ideal for commercial high-rise buildings, compound walls, load-bearing exterior walls, and seismic-resistant frameworks.
- **Fly Ash Bricks:** Primary substitute for traditional red clay bricks in residential houses, government infrastructure, and apartments.

### 2. Profit Margin Analysis
- **Cost of production (Concrete Block 8-inch):** ₹28 - ₹34 per block. Market selling price: ₹45 - ₹55 per block. Net profit: ₹12 - ₹18/block.
- **Cost of production (Fly Ash Brick):** ₹3.20 - ₹3.80 per brick. Market selling price: ₹5.50 - ₹7.00 per brick. Net profit: ₹1.80 - ₹2.50/brick.

### 3. Production Cycle & Curing
Concrete block machines utilize vibration tables with hydraulic compression to demould blocks instantly onto wooden or PVC pallets, enabling rapid water curing within 14 days.`,
    category: 'Concrete Blocks',
    readTime: '5 min read',
    authorName: 'K. Balakrishnan',
    authorRole: 'Senior Machinery Consultant',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    date: '28 Aug 2024',
    image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    tags: ['Concrete Blocks', 'Profitability', 'Precast Plants', 'Machinery ROI'],
    keyTakeaways: [
      'Concrete blocks offer higher per-unit profit margin (₹12-18/block)',
      'Fly ash bricks offer higher daily volumetric turnover (10,000+ units/day)',
      'Dual-purpose Jupiter machinery can manufacture both blocks and bricks with quick mould changeover',
    ],
    views: 980,
  },
  {
    slug: 'hydraulic-power-pack-preventative-maintenance-checklist',
    title: 'Top 7 Preventative Maintenance Rules for Hydraulic Brick & Block Machines',
    excerpt: 'Avoid costly plant downtime and maintain 100-ton clamping force with these essential daily and weekly maintenance routines.',
    content: `Hydraulic power packs and electrical PLC panels are the heart of automated brick and block machinery. Without timely preventative care, oil overheating, seal wear, and pressure drops can reduce plant efficiency by over 30%.

### Daily Checklist:
1. **Hydraulic Oil Level & Temperature:** Verify the oil level sight glass. Oil temperature must remain between 40°C to 55°C during continuous operation.
2. **Greasing Moving Pillars:** Apply high-grade lithium grease to hard-chrome tie bars and guide bush shafts every 8 hours.
3. **Mould Cleaning:** Clear any settled concrete or aggregate residue from mould cavity teeth after each production shift.

### Weekly Checklist:
1. **Filter Cleaning:** Inspect suction strainer and return line hydraulic filters. Clean with solvent or replace if clogged.
2. **Hydraulic Hose & Valve Tightening:** Check for micro-leaks around manifold valves and high-pressure hose crimps.
3. **Electrical Panel Dust Blowout:** Use dry compressed air to remove stone dust from contactors, SMPS, and PLC terminals.`,
    category: 'Maintenance',
    readTime: '4 min read',
    authorName: 'M. Senthil Kumar',
    authorRole: 'Head of Service Engineering',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    date: '15 Aug 2024',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    tags: ['Hydraulics', 'Maintenance', 'Machine Care', 'PLC Automation'],
    keyTakeaways: [
      'Maintain hydraulic oil temperature under 55°C',
      'Daily greasing of chrome tie bars prevents premature seal failure',
      'Replace hydraulic return filters every 1,500 operating hours',
    ],
    views: 1240,
  },
];

// ==========================================
// 3. FAQs (Frequently Asked Questions)
// ==========================================
const sampleFaqs = [
  {
    question: 'What is the required land area for setting up a fly ash brick plant?',
    answer: 'A minimum of 0.75 to 1.5 acres of land is recommended. This covers the shed for the machinery (around 2,500 sq.ft), raw material storage yard (fly ash, sand, cement), and the brick water curing area.',
    category: 'Plant Setup',
    order: 1,
  },
  {
    question: 'Does Jupiter Industries assist with government subsidies like PMEGP?',
    answer: 'Yes! We provide certified Bank Project Reports (DPR), machinery quotation proformas, and technical documentation required to apply for PMEGP, MSME, and state industrial subsidy schemes (up to 35% capital subsidy).',
    category: 'Finance & Subsidy',
    order: 2,
  },
  {
    question: 'What is the warranty period and on-site support provided?',
    answer: 'All Jupiter machinery comes with a 1-year comprehensive warranty on structural and hydraulic cylinders, along with free on-site installation, commissioning, and operator training by our qualified engineers across India.',
    category: 'Warranty & Service',
    order: 3,
  },
  {
    question: 'Can one machine produce both fly ash bricks and paver blocks?',
    answer: 'Yes. Our heavy-duty vibro-hydraulic machines support interchangeable moulds. You can switch between fly ash bricks, solid blocks, hollow blocks, and interlocking pavers within 45 minutes.',
    category: 'Machinery Operation',
    order: 4,
  },
];

// ==========================================
// 4. Delivery Locations (Pan-India Presence)
// ==========================================
const sampleLocations = [
  {
    clientName: 'Arunachala Precast Works',
    city: 'Tiruvannamalai',
    district: 'Tiruvannamalai',
    state: 'Tamil Nadu',
    machineModel: 'Fully Automatic Fly Ash Brick Machine (10 Cavity)',
    dispatchDate: '2024',
    status: 'Operational',
    units: 1,
  },
  {
    clientName: 'Sri Sai Ram Block Industries',
    city: 'Coimbatore',
    district: 'Coimbatore',
    state: 'Tamil Nadu',
    machineModel: 'Heavy-Duty Concrete Hollow Block Machine',
    dispatchDate: '2024',
    status: 'Operational',
    units: 2,
  },
  {
    clientName: 'Balaji Eco Bricks & Pavers',
    city: 'Nellore',
    district: 'Nellore',
    state: 'Andhra Pradesh',
    machineModel: 'Hydraulic Interlocking Paver Machine',
    dispatchDate: '2024',
    status: 'Operational',
    units: 1,
  },
  {
    clientName: 'Kaveri Construction Precasts',
    city: 'Mysuru',
    district: 'Mysuru',
    state: 'Karnataka',
    machineModel: 'Fully Automatic Fly Ash Brick Machine',
    dispatchDate: '2024',
    status: 'Operational',
    units: 1,
  },
];

// ==========================================
// 5. Main Seeder Function
// ==========================================
export async function seedDatabase() {
  console.log('🌱 Starting comprehensive database seeding for Jupiter Industries...\n');

  // 1. Seed Products (upsert by slug to avoid conflicts)
  console.log('📦 Seeding Machinery Products...');
  for (const prod of sampleProducts) {
    const created = await prisma.product.upsert({
      where: { slug: prod.slug },
      update: prod,
      create: prod,
    });
    console.log(`  ✔ [${created.category}] ${created.name} (${created.capacity})`);
  }
  const productCount = await prisma.product.count();
  console.log(`✨ Successfully seeded ${productCount} Machinery Products!\n`);

  // 2. Seed Blogs (upsert by slug)
  console.log('📰 Seeding Technical Articles & Guides...');
  for (const blog of sampleBlogs) {
    const created = await prisma.blog.upsert({
      where: { slug: blog.slug },
      update: blog,
      create: blog,
    });
    console.log(`  ✔ Article: ${created.title}`);
  }
  const blogCount = await prisma.blog.count();
  console.log(`✨ Successfully seeded ${blogCount} Technical Articles!\n`);

  // 3. Seed FAQs
  console.log('❓ Seeding FAQs...');
  for (const faq of sampleFaqs) {
    const existing = await (prisma as any).faq.findFirst({ where: { question: faq.question } });
    if (!existing) {
      await (prisma as any).faq.create({ data: faq });
    }
  }
  const faqCount = await (prisma as any).faq.count();
  console.log(`✨ Successfully verified ${faqCount} FAQs!\n`);

  // 4. Seed Delivery Locations
  console.log('📍 Seeding Pan-India Delivery Locations...');
  for (const loc of sampleLocations) {
    const existing = await (prisma as any).deliveryLocation.findFirst({ where: { clientName: loc.clientName } });
    if (!existing) {
      await (prisma as any).deliveryLocation.create({ data: loc });
    }
  }
  const locCount = await (prisma as any).deliveryLocation.count();
  console.log(`✨ Successfully verified ${locCount} Delivery Locations!\n`);

  // 5. Ensure Default Site Settings Exist
  console.log('⚙️ Verifying Site Settings...');
  await (prisma as any).setting.upsert({
    where: { id: 'site_settings' },
    update: {},
    create: { id: 'site_settings' },
  });
  console.log('✔ Site settings verified!\n');

  console.log('🎉 Database seeding completed successfully! All live tables & catalogs are ready.');
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

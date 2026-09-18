import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ==========================================
// 1. Machinery Products (Jupiter Catalog)
// ==========================================
const sampleProducts = [
  {
    name: 'Vertical Machine',
    slug: 'vertical-machine',
    category: 'Fly Ash Machine',
    description:
      'High-efficiency vertical compaction fly ash brick machine with automatic feeder, heavy duty hydraulic pressing, and dual production output rates of 10,000 or 20,000 bricks per day.',
    capacity: '10,000 - 20,000 Bricks / Day',
    power: '15 H.P + 2 H.P / 7.5 H.P + 2 H.P',
    image: '/images/flyash-vertical-machine.png',
    enquiryCount: 16,
    specifications: {
      'Bricks per Stroke': '15 | 8',
      'Production Rate': '20000 | 10000',
      'Hydraulic Motor': '15 H.P + 2 H.P | 7.5 H.P + 2 H.P',
      'Hopper Capacity': '400 Kgs | 250 Kgs',
      'Pressure': '150 Bar | 150 Bar',
      'Hydraulic Cylinders': '6 Nos | 6 Nos',
      'Hydraulic Oil Capacity': '400 Ltrs | 125 Ltrs',
    },
  },
  {
    name: '4 Brick Rotary Machine',
    slug: '4-brick-rotary-machine',
    category: 'Fly Ash Machine',
    description:
      'Heavy-duty 4-brick rotary press machine available in Regular Model (15,000-20,000 Bricks/Day) and Speed Model (20,000-25,000 Bricks/Day) with hydraulic motor table rotation.',
    capacity: '15,000 - 25,000 Bricks / Day',
    power: '15 H.P',
    image: '/images/flyash-4brick-rotary.png',
    enquiryCount: 22,
    specifications: {
      'Model': 'JE – 5G 80 Ton Regular & Speed Models',
      'Capacity': '15,000 – 25,000 Bricks per Day',
      'Power': '15 H.P',
      'Brick Size': '230 x 110 x 75 to 230 x 200 x 100',
      'Table Rotation': 'Hydraulic Motor',
      'Brick Removal': 'Manual / Auto',
      'Raw Material': 'Fly Ash Iron Oxide, Lime Sludge, Quarry Waste Etc.',
    },
  },
  {
    name: 'Rotary Machine (30,40,50 Tons)',
    slug: 'rotary-machine-30-40-50-tons',
    category: 'Fly Ash Machine',
    description:
      'Rotary indexing fly ash brick machine available in 30 Ton, 40 Ton, and 50 Ton configurations with hydraulic motor rotation and robust steel construction.',
    capacity: '1,000 - 2,300 Bricks / hr',
    power: '15 - 20 H.P',
    image: '/images/flyash-rotary-ton-machine.png',
    enquiryCount: 14,
    specifications: {
      'Tonnage Options': '30 Ton / 40 Ton / 50 Ton Hydraulic Pressure',
      'Production Capacity': '1,000 - 2,300 Bricks / hr',
      'Power Requirement': '15 - 20 H.P 3-Phase Electric Motor',
      'Brick Size Range': '230 x 110 x 75 to 230 x 200 x 100 mm',
      'Table Rotation': 'Hydraulic Motor Drive',
      'Brick Removal': 'Manual Pallet Offload',
      'Raw Material': 'Fly Ash Iron Oxide, Lime Sludge, Quarry Waste Etc.',
    },
  },
  {
    name: 'Storage Silo',
    slug: 'storage-silo',
    category: 'Storage Silo',
    description:
      'Heavy structural steel storage silo engineered for bulk cement, fly ash, iron oxide, and lime sludge with pneumatic air compressor fluidization and hydraulic copper lifting.',
    capacity: '60 Tons | 100 Tons',
    power: 'Air Compressor & Hydraulic',
    image: '/images/storage-silo-product.png',
    enquiryCount: 12,
    specifications: {
      'Model': "JE Silo's",
      'Capacity': '60 Tons | 100 Tons',
      'Running System': 'Air Compressor',
      'Copper Lifting': 'Hydraulic',
      'Raw Material': 'Fly Ash, Iron Oxide, Lime Sludge, Quarry Waste, 6MM JellyStone Cement',
    },
  },
  {
    name: 'Vertical Block Machine',
    slug: 'vertical-block-machine',
    category: 'Hollow and Solid Block Machine',
    description:
      'Stationary vertical vibration block making machine engineered for manufacturing high-strength hollow concrete blocks, solid architectural blocks, and boundary wall masonry units.',
    capacity: '1,500 - 2,000 Blocks / hr',
    power: '25 H.P System',
    image: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=800&q=80',
    enquiryCount: 18,
    specifications: {
      'Block Output': '1,500 - 2,000 Blocks / hr',
      'System Power': '25 H.P Total Connected Load',
      'Vibration Mechanism': 'Synchronized High-Impact Mould & Head Vibration',
      'Pallet Size': '900 x 600 mm Heavy Marine Wood / PVC',
      'Block Types': 'Hollow Blocks, Solid Blocks, Corner Blocks',
      'Cycle Period': '20 - 25 seconds per cycle',
    },
  },
  {
    name: 'Interlocking Brick Machine',
    slug: 'interlocking-brick-machine',
    category: 'Interlock Machine',
    description:
      'Precision hydraulic interlocking paver and brick press machine producing mortarless interlocking construction blocks, Zig-Zag pavers, and I-shape heavy traffic paver stones.',
    capacity: '2,000 - 3,500 Blocks / hr',
    power: '15 H.P',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f8?auto=format&fit=crop&w=800&q=80',
    enquiryCount: 29,
    specifications: {
      'Production Capacity': '2,000 - 3,500 Blocks / hr',
      'Motor Rating': '15 H.P 3-Phase TEFC Motor',
      'Mould Pressure': '60 - 80 Tons Hydraulic Compressive Force',
      'Interlock Profile': 'Tongue & Groove Self-Aligning Design',
      'Paver Thickness': '60 mm, 80 mm & 100 mm adjustable',
      'Wear Plates': 'Hardened Hardox Alloy Steel Mould Liners',
    },
  },
  {
    name: 'Concrete Batching Plant',
    slug: 'concrete-batching-plant',
    category: 'Batching Plant',
    description:
      'Compact and stationary concrete batching and mixing plant equipped with inline electronic weigh hoppers, cement screw feeder, and planetary pan mixer for zero-aggregate segregation.',
    capacity: '30 - 120 m³/hr',
    power: '45 H.P Line',
    image: 'https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=800&q=80',
    enquiryCount: 9,
    specifications: {
      'Mixing Capacity': '30 - 120 m³/hr',
      'Total Connected Power': '45 H.P Line',
      'Aggregate Storage': '3 or 4 Compartment In-Line Hoppers',
      'Mixer Type': 'Heavy Duty Planetary / Twin-Shaft Turbo Mixer',
      'Batching Accuracy': '± 1% for cement/water, ± 2% for aggregate',
      'Control System': 'Full Automation SCADA / PLC Touchscreen Panel',
    },
  },
  {
    name: 'Rotary Press Machine',
    slug: 'rotary-press-machine',
    category: 'Fly Ash Machine',
    description:
      'Super heavy-duty continuous rotary press machine for industrial fly ash brick manufacturing plants with automatic feeder, mould oil lubrication, and high speed takeoff arm.',
    capacity: '10,000 - 15,000 Bricks / hr',
    power: '20 H.P',
    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80',
    enquiryCount: 31,
    specifications: {
      'Production Capacity': '10,000 - 15,000 Bricks / hr',
      'Drive Power': '20 H.P High-Torque Heavy Duty Motor',
      'Compacting Force': '100 - 120 Metric Tons',
      'Indexing System': 'Precision heavy-duty Geneva / cam rotary drive',
      'Ejection Mechanism': 'Smooth cam-operated mechanical & hydraulic ejector',
      'Automatic Feeder': 'Dual paddle hopper feeder for uniform mould filling',
    },
  },
  {
    name: 'Planetary Pan Mixer (500 Kg / 1000 Kg)',
    slug: 'planetary-pan-mixer-500-1000-kg',
    category: 'Mixing Equipment',
    description:
      'High-shear planetary pan mixer with replaceable tungsten carbide wear plates and spring-loaded mixing blades for homogeneous dry and semi-dry concrete, fly ash, and mortar mixing.',
    capacity: '500 - 1,000 Kg / Batch',
    power: '10 - 20 H.P',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    enquiryCount: 16,
    specifications: {
      'Batch Capacity': '500 Kg / 1,000 Kg per batch',
      'Motor Rating': '10 HP to 20 HP Heavy Reduction Gearbox',
      'Discharge Gate': 'Pneumatic / Hydraulic bottom sliding door',
      'Wear Liners': 'Replaceable 10mm high-abrasion Hardox steel tiles',
      'Mixing Cycle': '2 to 3 minutes per uniform batch',
    },
  },
  {
    name: 'Automatic Pallet Stacker & Feeder System',
    slug: 'automatic-pallet-stacker-feeder-system',
    category: 'Automation & Handling',
    description:
      'Robotic pneumatic/hydraulic automated pallet feeder and fresh green-brick stacker designed to eliminate manual handling and minimize brick edge chipping.',
    capacity: 'Up to 3,000 Pallets / hr',
    power: '7.5 H.P',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    enquiryCount: 11,
    specifications: {
      'Handling Capacity': 'Up to 3,000 Pallets / hr',
      'Stacking Height': '3 to 6 tiers high',
      'Control System': 'Independent PLC sync with main brick machine',
      'Labour Reduction': 'Saves up to 4 manual workers per shift',
    },
  },
];

// ==========================================
// 2. Customer Enquiries (Leads for Admin)
// ==========================================
const sampleEnquiries = [
  {
    name: 'Karthik Raja',
    email: 'karthik.raja@example.com',
    phone: '+919842156789',
    message: 'Interested in setting up a 10-cavity Fully Automatic Fly Ash Brick Machine. Please share the detailed quotation and layout plan for Coimbatore.',
  },
  {
    name: 'Anand Kumar',
    email: 'anand.kumar@constructsol.in',
    phone: '+919789012345',
    message: 'Looking for Hydraulic Interlocking Paver Block Making Machine with dual colour feeder attachment. Need delivery in Salem with on-site installation.',
  },
  {
    name: 'Suresh Menon',
    email: 'suresh.menon@keralabuilders.com',
    phone: '+919447123456',
    message: 'Requesting price details for Concrete Solid and Hollow Block Machine along with Planetary Pan Mixer (500 Kg capacity) for our Kochi site.',
  },
  {
    name: 'Venkatesh Rao',
    email: 'venkatesh.infra@gmail.com',
    phone: '+919988776655',
    message: 'We are applying for PMEGP / MSME subsidy for a new brick plant project in Andhra Pradesh. Please provide the machinery project report and proforma invoice.',
  },
  {
    name: 'Praveen Chandran',
    email: 'praveen.chandran@rediffmail.com',
    phone: '+919840987654',
    message: 'Need spare parts and hydraulic mould accessories for model JI-800 brick press. Please contact me at the earliest.',
  },
  {
    name: 'Dinesh Balaji',
    email: 'dinesh.balaji@chennaibricks.com',
    phone: '+919884512389',
    message: 'Urgent enquiry: Need 50-Ton Fly Ash Brick Rotary Machine quotation with automatic pallet stacker. Looking for commissioning within 30 days.',
  },
  {
    name: 'Rajeshwar Reddy',
    email: 'rajeshwar.reddy@hyderabadinfra.org',
    phone: '+919848011223',
    message: 'Planning to purchase a 60 m³/hr Concrete Batching Plant along with 100-ton storage silo for highway project near Warangal.',
  },
  {
    name: 'Murugesan K.',
    email: 'murugan.precast@yahoo.com',
    phone: '+919443219876',
    message: 'Interested in Zig-zag and I-section paver block moulds for our existing Jupiter hydraulic machine. Please send catalogue with pricing.',
  },
];

// ==========================================
// 3. Technical Blogs & Guides (Admin Articles)
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
  {
    slug: 'hollow-block-vs-solid-block-manufacturing-comparison',
    title: 'Hollow Blocks vs Solid Blocks: Machinery Selection & Profitability Comparison',
    excerpt: 'Detailed cost-benefit analysis of producing hollow concrete blocks vs solid masonry units for commercial builders.',
    content: `Choosing between hollow block and solid block machinery depends on regional market demand, architectural requirements, and raw material availability. Hollow blocks offer lighter dead weight and superior acoustic/thermal insulation, whereas solid blocks provide unmatched load-bearing strength.

### Key Production Metrics
- **Cycle Time:** 20-25 seconds per mould stroke
- **Curing Time:** 14-21 days water curing or 24 hours steam curing
- **Compressive Strength:** Solid blocks (7.5 - 15 N/mm²), Hollow blocks (3.5 - 7 N/mm²)

### Mould Versatility
With Jupiter block machines, changing moulds from standard 8" hollow block to 4" partition blocks or solid bricks takes under 45 minutes, allowing manufacturers to adapt instantly to local market orders.`,
    category: 'Concrete Blocks',
    readTime: '5 min read',
    authorName: 'P. Murugan',
    authorRole: 'Senior Production Engineer',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    date: '28 Jul 2024',
    image: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=800&q=80',
    tags: ['Hollow Block', 'Solid Block', 'Concrete Machinery', 'Profitability'],
    keyTakeaways: [
      'Hollow blocks reduce structural building weight and cement consumption',
      'Dual vibration systems ensure maximum aggregate compaction',
      'Quick-change mould designs maximize plant operational versatility',
    ],
    views: 980,
  },
  {
    slug: 'government-subsidies-pmegp-msme-brick-plant-india',
    title: 'Complete Guide to PMEGP & MSME Subsidies for Brick & Block Manufacturing in India',
    excerpt: 'How to claim up to 35% government capital subsidy on brick and paver machinery with guaranteed bank project loan approval.',
    content: `The Government of India actively incentivizes eco-friendly construction materials like fly ash bricks and paver blocks through schemes like PMEGP (Prime Minister Employment Generation Programme) and state MSME capital subsidy policies.

### Subsidy Percentages Under PMEGP:
- **General Category (Urban):** 15% Project Cost Subsidy
- **General Category (Rural):** 25% Project Cost Subsidy
- **Special Category / SC / ST / Women / Ex-Servicemen (Urban):** 25% Subsidy
- **Special Category / SC / ST / Women / Ex-Servicemen (Rural):** 35% Subsidy

### Documents Required:
1. Detailed Project Report (DPR) along with Jupiter Industries machinery quotation
2. Land documents (Sale deed / registered lease for minimum 5 years)
3. Aadhaar, PAN, and Educational Certificate (minimum 8th pass for projects above ₹10 Lakhs)
4. Bank account statement and CIBIL score verification`,
    category: 'Business & Subsidies',
    readTime: '7 min read',
    authorName: 'Er. R. Sundaram',
    authorRole: 'Chief Technical Director, Jupiter Industries',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    date: '05 Jul 2024',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f8?auto=format&fit=crop&w=800&q=80',
    tags: ['PMEGP Subsidy', 'MSME Loan', 'Project Report', 'Bank Finance'],
    keyTakeaways: [
      'Up to 35% capital subsidy for rural and special category entrepreneurs',
      'Bank credit link up to 90-95% of total project cost',
      'Jupiter Industries provides certified project reports and proforma invoices for bank approval',
    ],
    views: 2150,
  },
];

// ==========================================
// Main Seeder Function
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

  // 2. Seed Enquiries
  console.log('📬 Seeding Customer Enquiries...');
  await prisma.enquiry.deleteMany({});
  for (const enquiry of sampleEnquiries) {
    const created = await prisma.enquiry.create({
      data: enquiry,
    });
    console.log(`  ✔ Enquiry: ${created.name} (${created.phone})`);
  }
  const enquiryCount = await prisma.enquiry.count();
  console.log(`✨ Successfully seeded ${enquiryCount} Customer Enquiries!\n`);

  // 3. Seed Blogs (upsert by slug)
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

  console.log('🎉 Database seeding completed successfully! All catalogs & admin data are ready.');
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


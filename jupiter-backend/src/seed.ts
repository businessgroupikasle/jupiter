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
  {
    name: 'Vertical Fly Ash Brick Machine',
    slug: 'vertical-machine',
    category: 'Fly Ash Brick Machines',
    description: 'High-compaction vertical press fly ash brick plant with vibration-assisted filling and digital stroke regulation.',
    capacity: '10,000 – 20,000 Bricks / Day',
    power: '15 HP + 2 HP / 7.5 HP + 2 HP',
    image: '/images/flyash-vertical-machine.png',
    enquiryCount: 31,
    specifications: {
      'Production Rate': '10,000 – 20,000 Bricks / Day',
      'Hydraulic Motor': '15 HP + 2 HP',
    },
  },
  {
    name: '4 Brick Rotary Machine',
    slug: '4-brick-rotary-machine',
    category: 'Fly Ash Brick Machines',
    description: 'Rotary turntable brick press with high-speed automated cycle and interchangeable multi-cavity hardened moulds.',
    capacity: '15,000 – 25,000 Bricks per Day',
    power: '15 HP',
    image: '/images/flyash-4brick-rotary.png',
    enquiryCount: 26,
    specifications: {
      'Production Rate': '15,000 – 25,000 Bricks per Day',
      'Power': '15 HP',
    },
  },
  {
    name: '6 Brick Rotary Machine',
    slug: '6-brick-rotary-machine',
    category: 'Fly Ash Brick Machines',
    description: 'Ultra high-volume 6-brick rotary press with PLC automation, 100 Ton clamping force, and synchronized stacker.',
    capacity: '20,000 – 35,000 Bricks per Day',
    power: '20 HP',
    image: '/images/flyash-6brick-rotary.png',
    enquiryCount: 44,
    specifications: {
      'Production Rate': '20,000 – 35,000 Bricks per Day',
      'Power': '20 HP',
    },
  },
  {
    name: 'High Precision Hardened Mould Sets',
    slug: 'high-precision-hardened-mould-sets',
    category: 'All Genuine Machine Spares',
    description: 'CNC machined and carburized wear-resistant alloy steel moulds for hollow blocks, solid bricks, and pavers.',
    capacity: 'Up to 250,000 Cycles Lifespan',
    power: 'Tool Steel Component',
    image: '/images/moulds-and-dies.jpg',
    enquiryCount: 18,
    specifications: {
      'Material': 'WPS / High-Carbon Chromium Die Steel',
      'Hardness': '58 - 62 HRC',
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
// 5. Client Projects & Plant Installations
// ==========================================
const sampleProjects = [
  {
    title: 'Arunachala Bricks Plant Installation',
    client: 'Arunachala Bricks & Tiles',
    location: 'Tiruvannamalai, Tamil Nadu',
    machine: 'Fully Automatic Fly Ash Brick Machine (10 Cavity)',
    year: '2024',
    status: 'Completed',
    capacity: '20,000 Bricks / Day',
    image: '/images/arunachala-plant.jpg',
    description: 'Turnkey plant commissioning with automatic hydraulic pallet stacker, 500kg planetary pan mixer, and aggregate batching bins.',
  },
  {
    title: 'Sri Sai Ram High-Density Block Facility',
    client: 'Sri Sai Ram Block Industries',
    location: 'Coimbatore, Tamil Nadu',
    machine: 'Heavy-Duty Concrete Hollow Block Machine',
    year: '2024',
    status: 'Completed',
    capacity: '4,500 Blocks / Shift',
    image: '/images/flyash-vertical-machine.png',
    description: 'High-tonnage hydraulic concrete hollow block and solid block plant installation with vibration compaction table.',
  },
  {
    title: 'Balaji Interlock Pavers Commercial Line',
    client: 'Balaji Eco Bricks & Pavers',
    location: 'Nellore, Andhra Pradesh',
    machine: 'JE-PB 100 Ton Dual-Color Hydraulic Paver Machine',
    year: '2023',
    status: 'Completed',
    capacity: '6,000 Pavers / Day',
    image: '/images/flyash-rotary-ton-machine.png',
    description: 'Commercial dual-colour decorative zig-zag and dumbbell paver block production line with secondary color feed system.',
  },
  {
    title: 'Kaveri Precast Infrastructure Plant',
    client: 'Kaveri Construction Precasts',
    location: 'Mysuru, Karnataka',
    machine: 'JE-BM12 Fully Automatic Block Making Machine',
    year: '2024',
    status: 'Completed',
    capacity: '2,400 Blocks / hr',
    image: '/images/flyash-4brick-rotary.png',
    description: 'Automated precast concrete manufacturing facility with PLC touchscreen recipe control and robotic elevator stacker.',
  },
  {
    title: 'Venkateshwara Modern Fly Ash Unit',
    client: 'Venkateshwara Brick Works',
    location: 'Madurai, Tamil Nadu',
    machine: '6 Brick Rotary Machine (JE-5G 80 Ton)',
    year: '2023',
    status: 'Completed',
    capacity: '25,000 Bricks / Day',
    image: '/images/flyash-6brick-rotary.png',
    description: 'Continuous duty high-speed rotary press line with synchronized mechanical takeaway conveyor and hardened die tooling.',
  },
  {
    title: 'Maruthi Cement Products Installation',
    client: 'Maruthi Cement Products',
    location: 'Salem, Tamil Nadu',
    machine: 'Inter Locking Brick Making Machine (JE-INT 80T)',
    year: '2024',
    status: 'Completed',
    capacity: '3,500 Blocks / hr',
    image: '/images/flyash-vertical-machine.png',
    description: 'Commercial self-aligning tongue and groove mortarless interlocking brick plant for load-bearing and compound walls.',
  },
  {
    title: 'Deccan Infra Ready-Mix & Brick Works',
    client: 'Deccan Infra Projects',
    location: 'Hyderabad, Telangana',
    machine: 'JE-CBP 30 Stationary Concrete Batching Plant',
    year: '2023',
    status: 'Completed',
    capacity: '30 - 45 m³/hr',
    image: '/images/storage-silo-product.png',
    description: 'Stationary concrete batching plant with 4-compartment inline aggregate bins, loadcell weighing, and 60T bulk storage silo.',
  },
  {
    title: 'GreenTech Eco Bricks Plant',
    client: 'GreenTech Eco Building Solutions',
    location: 'Kochi, Kerala',
    machine: 'Fully Automatic Fly Ash Brick Machine',
    year: '2024',
    status: 'Completed',
    capacity: '18,000 Bricks / Day',
    image: '/images/arunachala-plant.jpg',
    description: 'Eco-friendly zero carbon emission fly ash brick manufacturing line with PMEGP capital subsidy assistance.',
  },
];

// ==========================================
// 6. Media & Photo Gallery
// ==========================================
const sampleGalleryPhotos = [
  {
    title: 'Fully Automatic 10-Cavity Fly Ash Brick Machine',
    category: 'Fly Ash Plants',
    location: 'Coimbatore Works, Tamil Nadu',
    machine: 'Jupiter Titan-8000 Automatic',
    output: '18,000 Bricks / Shift',
    image: '/images/flyash-vertical-machine.png',
    description: 'Heavy-duty 100-ton hydraulic compaction plant during final factory assembly trial and pressure calibration.',
  },
  {
    title: 'Heavy-Duty Vibro Concrete Hollow Block Machine',
    category: 'Block Machines',
    location: 'Tiruvannamalai Client Site',
    machine: 'JE-BM12 Vibro Press',
    output: '4,000 Blocks / Shift',
    image: '/images/flyash-rotary-ton-machine.png',
    description: 'Dual-directional synchronized vibration table compacting 8-inch commercial hollow blocks with high density.',
  },
  {
    title: 'JE-5G 80 Ton Rotary Turntable Press',
    category: 'Fly Ash Plants',
    location: 'Madurai Installation',
    machine: '4 Brick Rotary Press',
    output: '22,000 Bricks / Day',
    image: '/images/flyash-4brick-rotary.png',
    description: 'Automated rotary turntable brick press with continuous hydraulic motor rotation and smooth pallet discharge.',
  },
  {
    title: 'Hydraulic Interlocking Paver Machine with Color Feeder',
    category: 'Paver Units',
    location: 'Nellore, Andhra Pradesh',
    machine: 'JE-PB 100 Ton Dual Color',
    output: '6,000 Pavers / Shift',
    image: '/images/flyash-rotary-ton-machine.png',
    description: 'Dual-hopper decorative paver unit producing high compressive strength M-40 grade pavers for industrial roadways.',
  },
  {
    title: 'Planetary Turbo Pan Mixer with Hardox Liners',
    category: 'Batching Mixers',
    location: 'Coimbatore OEM Unit',
    machine: '500 KG Planetary Mixer',
    output: '10 Tons / hr Homogenous Mix',
    image: '/images/storage-silo-product.png',
    description: 'High-torque reduction gearbox planetary mixer equipped with 10mm Ni-Hard replaceable liners for zero-slump mix.',
  },
  {
    title: 'High-Tonnage CNC Alloy Steel Die Moulds',
    category: 'Precision Moulds',
    location: 'Tooling & CNC Division',
    machine: 'WPS Tool Steel Carburized Dies',
    output: '250,000+ Cycles',
    image: '/images/moulds-and-dies.jpg',
    description: 'Precision CNC milled and vacuum-hardened die moulds for concrete blocks and fly ash bricks.',
  },
  {
    title: '60-Ton Industrial Cement & Fly Ash Storage Silo',
    category: 'Factory Infrastructure',
    location: 'Hyderabad Site',
    machine: 'JE Silo 60T Bulk',
    output: '60 Tons Bulk Powder Buffer',
    image: '/images/storage-silo-product.png',
    description: 'Bulk material storage silo equipped with pneumatic aeration fluidizer and safety relief valves.',
  },
  {
    title: 'Automatic Pallet Stacker & Multi-Tier Elevator',
    category: 'Factory Infrastructure',
    location: 'Mysuru Site',
    machine: 'Hydraulic Pallet Stacker',
    output: '20 Cycles / min',
    image: '/images/flyash-6brick-rotary.png',
    description: 'Synchronized robotic pallet collector reducing green brick handling breakage to zero.',
  },
  {
    title: '6 Brick Rotary Machine Mass Production Trial',
    category: 'Fly Ash Plants',
    location: 'Coimbatore Heavy Works',
    machine: '6-Brick Rotary Press',
    output: '30,000 Bricks / Day',
    image: '/images/flyash-6brick-rotary.png',
    description: 'Pre-dispatch factory quality testing and pressure calibration under full 120 Ton clamping force.',
  },
];

// ==========================================
// 7. Machinery Demonstration Videos
// ==========================================
const sampleVideos = [
  {
    title: 'Fully Automatic Fly Ash Brick Machine Trial & Live Operation',
    videoUrl: 'https://www.youtube.com/watch?v=RZot-EmDGHw',
    embedUrl: 'https://www.youtube.com/embed/RZot-EmDGHw',
    views: '14.2K views',
    duration: '4:15',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    category: 'Fly Ash Plants',
    description: 'Complete working demonstration of Jupiter fully automatic fly ash brick plant with auto stacker.',
  },
  {
    title: 'Heavy Duty Concrete Hollow Block Machine High Production Demo',
    videoUrl: 'https://www.youtube.com/watch?v=RZot-EmDGHw',
    embedUrl: 'https://www.youtube.com/embed/RZot-EmDGHw',
    views: '9.8K views',
    duration: '3:40',
    image: '/images/flyash-vertical-machine.png',
    category: 'Block Machines',
    description: 'High-density concrete hollow block vibration pressing cycle producing 8-inch blocks in 20 seconds.',
  },
  {
    title: '80 Ton Hydraulic Interlocking Paver Press - Dual Color Tile Manufacturing',
    videoUrl: 'https://www.youtube.com/watch?v=RZot-EmDGHw',
    embedUrl: 'https://www.youtube.com/embed/RZot-EmDGHw',
    views: '18.5K views',
    duration: '5:20',
    image: '/images/flyash-rotary-ton-machine.png',
    category: 'Paver Machines',
    description: 'Commercial manufacturing of M-40 grade decorative zig-zag pavers with automated top colour layer.',
  },
  {
    title: 'JE-5G Rotary Fly Ash Brick Machine Continuous 25,000 Bricks/Day Demo',
    videoUrl: 'https://www.youtube.com/watch?v=RZot-EmDGHw',
    embedUrl: 'https://www.youtube.com/embed/RZot-EmDGHw',
    views: '12.3K views',
    duration: '3:55',
    image: '/images/flyash-4brick-rotary.png',
    category: 'Fly Ash Plants',
    description: 'Rotary indexing table mechanism rotating moulds smoothly with minimal power consumption.',
  },
  {
    title: 'Industrial Planetary Pan Mixer 500 KG Fast Concrete Batching',
    videoUrl: 'https://www.youtube.com/watch?v=RZot-EmDGHw',
    embedUrl: 'https://www.youtube.com/embed/RZot-EmDGHw',
    views: '7.6K views',
    duration: '2:50',
    image: '/images/storage-silo-product.png',
    category: 'Batching Plant',
    description: 'Homogenous mixing demonstration of fly ash, stone dust, cement, and water in 3 minutes.',
  },
  {
    title: 'Complete Turnkey Plant Walkthrough & Client Installation Tour',
    videoUrl: 'https://www.youtube.com/watch?v=RZot-EmDGHw',
    embedUrl: 'https://www.youtube.com/embed/RZot-EmDGHw',
    views: '21.1K views',
    duration: '6:10',
    image: '/images/arunachala-plant.jpg',
    category: 'Factory Infrastructure',
    description: 'Full site tour of a turnkey automatic plant setup in Tamil Nadu showcasing hopper, mixer, and press.',
  },
];

// ==========================================
// 8. Admin & Staff Users
// ==========================================
const sampleUsers = [
  {
    name: 'Jupiter Admin',
    email: 'admin@jupiter.com',
    role: 'Super Admin',
    status: 'Active',
    phone: '+91 93429 19060',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80',
  },
  {
    name: 'Technical Service Desk',
    email: 'service@jupiterindustries.com',
    role: 'Admin',
    status: 'Active',
    phone: '+91 93429 19060',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
  },
  {
    name: 'Marketing & Quotations Editor',
    email: 'marketing@jupitergroups.in',
    role: 'Editor',
    status: 'Active',
    phone: '+91 93429 19060',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
  },
];

// ==========================================
// 9. Customer Testimonials & Reviews
// ==========================================
const sampleReviews = [
  {
    customerName: 'K. Senthil Kumar',
    company: 'Senthil Building Blocks',
    location: 'Madurai, Tamil Nadu',
    rating: 5,
    comment: 'We purchased the 10-cavity Fully Automatic Fly Ash Brick Machine from Jupiter Industries 2 years ago. The machine has produced over 50 lakh bricks with zero major breakdowns. Outstanding hydraulic power!',
    machineModel: 'Fully Automatic Fly Ash Brick Machine',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    status: 'Approved',
    verifiedBuyer: true,
  },
  {
    customerName: 'R. Venkatachalam',
    company: 'Arunachala Precasts',
    location: 'Tiruvannamalai, Tamil Nadu',
    rating: 5,
    comment: 'Best machinery manufacturer in Coimbatore. Their installation team spent 4 days onsite training our workers. The brick density and corner sharpness are top-notch.',
    machineModel: 'Heavy-Duty Concrete Hollow Block Machine',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    status: 'Approved',
    verifiedBuyer: true,
  },
  {
    customerName: 'P. Narayana Rao',
    company: 'Sri Balaji Eco Pavers',
    location: 'Nellore, Andhra Pradesh',
    rating: 5,
    comment: 'The dual-color paver machine creates beautiful glossy finish pavers. Compressive strength easily exceeds M-40 requirements. We recovered our capital investment within 10 months.',
    machineModel: 'JE-PB 100 Ton Dual-Color Paver Machine',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80',
    status: 'Approved',
    verifiedBuyer: true,
  },
  {
    customerName: 'M. Mahesh Gowda',
    company: 'Kaveri Infra Solutions',
    location: 'Mysuru, Karnataka',
    rating: 5,
    comment: 'Prompt customer service and genuine spare parts dispatch within 24 hours. The Siemens PLC automation makes running our hollow block plant effortless.',
    machineModel: 'JE-BM12 Fully Automatic Block Plant',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80',
    status: 'Approved',
    verifiedBuyer: true,
  },
];

// ==========================================
// 10. Sample Client Enquiries
// ==========================================
const sampleEnquiries = [
  {
    name: 'R. Rajesh',
    email: 'rajesh.buildtech@gmail.com',
    phone: '+91 98421 54321',
    message: 'Quotation for Fully Automatic Fly Ash Brick Machine (10 Cavity) with pan mixer and pallet stacker. Project location: Salem, Tamil Nadu.',
  },
  {
    name: 'Suresh Reddy',
    email: 'suresh@deccaninfra.in',
    phone: '+91 97032 88990',
    message: 'Requirement for Concrete Hollow Block Machine 8-inch and 6-inch moulds. Need bank project report for PMEGP loan application.',
  },
  {
    name: 'Anand Kumar',
    email: 'anandprecast@yahoo.com',
    phone: '+91 94433 11223',
    message: 'Inquiring about 100 Ton Dual-Color Hydraulic Paver Machine and shipping charges to Madurai.',
  },
];

// ==========================================
// 11. Main Seeder Function (All 11 Sections)
// ==========================================
export async function seedDatabase() {
  console.log('🌱 Starting complete multi-section database seeding for Jupiter Industries...\n');

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
  console.log(`✨ Successfully verified ${productCount} Machinery Products!\n`);

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
  console.log(`✨ Successfully verified ${blogCount} Technical Articles!\n`);

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

  // 5. Seed Client Projects & Plant Installations
  console.log('🏗️ Seeding Client Projects...');
  for (const proj of sampleProjects) {
    const existing = await (prisma as any).project.findFirst({ where: { title: proj.title } });
    if (!existing) {
      await (prisma as any).project.create({ data: proj });
    }
  }
  const projCount = await (prisma as any).project.count();
  console.log(`✨ Successfully verified ${projCount} Client Projects!\n`);

  // 6. Seed Media & Photo Gallery
  console.log('🖼️ Seeding Media Gallery Photos...');
  for (const photo of sampleGalleryPhotos) {
    const existing = await (prisma as any).galleryPhoto.findFirst({ where: { title: photo.title } });
    if (!existing) {
      await (prisma as any).galleryPhoto.create({ data: photo });
    }
  }
  const photoCount = await (prisma as any).galleryPhoto.count();
  console.log(`✨ Successfully verified ${photoCount} Media Gallery Photos!\n`);

  // 7. Seed Videos
  console.log('🎬 Seeding Machinery Demonstration Videos...');
  for (const vid of sampleVideos) {
    const existing = await (prisma as any).video.findFirst({ where: { title: vid.title } });
    if (!existing) {
      await (prisma as any).video.create({ data: vid });
    }
  }
  const videoCount = await (prisma as any).video.count();
  console.log(`✨ Successfully verified ${videoCount} Machinery Videos!\n`);

  // 8. Seed Users
  console.log('👥 Seeding Admin & Staff Users...');
  for (const user of sampleUsers) {
    const existing = await (prisma as any).user.findUnique({ where: { email: user.email } });
    if (!existing) {
      await (prisma as any).user.create({ data: user });
    }
  }
  const userCount = await (prisma as any).user.count();
  console.log(`✨ Successfully verified ${userCount} Users!\n`);

  // 9. Seed Customer Reviews
  console.log('⭐ Seeding Customer Reviews...');
  for (const rev of sampleReviews) {
    const existing = await (prisma as any).review.findFirst({ where: { customerName: rev.customerName } });
    if (!existing) {
      await (prisma as any).review.create({ data: rev });
    }
  }
  const reviewCount = await (prisma as any).review.count();
  console.log(`✨ Successfully verified ${reviewCount} Customer Reviews!\n`);

  // 10. Seed Sample Client Enquiries
  console.log('📩 Seeding Sample Client Enquiries...');
  const currentEnquiries = await prisma.enquiry.count();
  if (currentEnquiries === 0) {
    for (const enq of sampleEnquiries) {
      await prisma.enquiry.create({ data: enq });
    }
  }
  const enquiryCount = await prisma.enquiry.count();
  console.log(`✨ Successfully verified ${enquiryCount} Client Enquiries!\n`);

  // 11. Ensure Default Site Settings Exist with full company profile
  console.log('⚙️ Verifying Site Settings...');
  await (prisma as any).setting.upsert({
    where: { id: 'site_settings' },
    update: {
      companyLegalName: 'Jupiter Industries',
      primaryHotline: '+91 93429 19060',
      primaryEmail: 'info@jupiterindustries.com',
      emergencyHotline: '+91 93429 19060',
      emergencyEmail: 'info@jupiterindustries.com',
      address: 'SF No. 345/2, Trichy Road, Coimbatore, Tamil Nadu 641018',
      gstNumber: '33AAAAJ1234A1Z5',
      socialLinks: {
        facebook: 'https://facebook.com/jupiterindustries',
        instagram: 'https://instagram.com/jupiterindustries',
        youtube: 'https://youtube.com/@jupiterindustries',
        whatsapp: 'https://wa.me/919342919060',
      },
    },
    create: {
      id: 'site_settings',
      adminDisplayName: 'Jupiter Admin',
      adminEmail: 'admin@jupiter.com',
      maintenanceMode: false,
      companyLegalName: 'Jupiter Industries',
      primaryHotline: '+91 93429 19060',
      primaryEmail: 'info@jupiterindustries.com',
      emergencyHotline: '+91 93429 19060',
      emergencyEmail: 'info@jupiterindustries.com',
      address: 'SF No. 345/2, Trichy Road, Coimbatore, Tamil Nadu 641018',
      gstNumber: '33AAAAJ1234A1Z5',
      socialLinks: {
        facebook: 'https://facebook.com/jupiterindustries',
        instagram: 'https://instagram.com/jupiterindustries',
        youtube: 'https://youtube.com/@jupiterindustries',
        whatsapp: 'https://wa.me/919342919060',
      },
    },
  });
  console.log('✔ Site settings verified!\n');

  console.log('🎉 Database seeding completed successfully! All live tables & catalogs across all sections are ready.');
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

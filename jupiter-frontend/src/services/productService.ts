import { apiClient } from './api';
import { INITIAL_SPARES_PRODUCTS } from '../data/initialSpares';

export interface MachineSpecItem {
  label: string;
  value: string;
}

export interface SubMachineItem {
  id: string;
  name: string;
  subCategoryTag: string;
  image: string;
  galleryImages?: string[];
  description: string;
  capacity?: string;
  power?: string;
  brickSize?: string;
  featureBadges?: string[];
  specs: MachineSpecItem[];
  keyFeatures?: string[];
  specTableColumns?: string[];
  specTableRows?: Array<Record<string, string>>;
  highlights?: Array<{ title: string; description: string }>;
  advantages?: Array<{ title: string; description: string }>;
}

export interface MachineCategoryData {
  slug: string;
  aliases: string[];
  name: string;
  subTitle: string;
  introDescription: string;
  heroImage: string;
  subMachines: SubMachineItem[];
}

export interface ProductItem {
  id: string;
  name: string;
  brandTag?: string;
  category: string;
  categorySlug?: string;
  capacity?: string;
  power?: string;
  brickSize?: string;
  enquiriesCount?: number;
  image: string;
  galleryImages?: string[];
  status: 'Active' | 'Draft';
  description?: string;
  featureBadges?: string[];
  keyFeatures?: string[];
  specs?: Record<string, string>;
  specTableColumns?: string[];
  specTableRows?: Array<Record<string, string>>;
  highlights?: Array<{ title: string; description: string }>;
  advantages?: Array<{ title: string; description: string }>;
}

export const CATEGORY_NAME_TO_SLUG_MAP: Record<string, string> = {
  'Fly Ash Machine': 'fly-ash-brick-machine',
  'Fly Ash Brick Machine': 'fly-ash-brick-machine',
  'Hollow and Solid Block Machine': 'hollow-and-solid-block-machine',
  'Interlock Machine': 'inter-block-making-machine',
  'Inter Block Making Machine': 'inter-block-making-machine',
  'Paver Block Machine': 'paver-block-machine',
  'Batching Plant': 'batching-plant',
  'Storage Silo': 'storage-silo',
  'Machine Spares': 'machine-spares',
};

export const SLUG_TO_CATEGORY_NAME_MAP: Record<string, string> = {
  'fly-ash-brick-machine': 'Fly Ash Brick Machine',
  'fly-ash-making-machine': 'Fly Ash Brick Machine',
  'fly-ash-brick-making-machine': 'Fly Ash Brick Machine',
  'hollow-and-solid-block-machine': 'Hollow and Solid Block Machine',
  'hollow-and-solid-block-making-machine': 'Hollow and Solid Block Machine',
  'inter-block-making-machine': 'Inter Block Making Machine',
  'inter-locking-brick-making-machine': 'Inter Block Making Machine',
  'paver-block-machine': 'Paver Block Machine',
  'batching-plant': 'Batching Plant',
  'patching-plant': 'Batching Plant',
  'storage-silo': 'Storage Silo',
  'machine-spares': 'Machine Spares',
};

// ─────────────────────────────────────────────────────────
// Comprehensive Default Industrial Machinery Catalog
// ─────────────────────────────────────────────────────────
export const INITIAL_DEFAULT_PRODUCTS: ProductItem[] = [
  // 1. Vertical Machine (Fly Ash Brick Machine)
  {
    id: 'PROD-FLYASH-VERTICAL',
    name: 'Vertical Machine',
    brandTag: 'FLY ASH MACHINE',
    category: 'Fly Ash Brick Machine',
    categorySlug: 'fly-ash-brick-machine',
    capacity: '10,000 – 20,000 Bricks / Day',
    power: '15 H.P + 2 H.P / 7.5 H.P + 2 H.P',
    brickSize: '230 x 110 x 75 mm (Standard)',
    image: '/images/flyash-vertical-machine.png',
    galleryImages: [
      '/images/flyash-vertical-machine.png',
      '/images/flyash-4brick-rotary.png',
      '/images/flyash-rotary-ton-machine.png'
    ],
    status: 'Active',
    description: 'High-efficiency vertical compaction fly ash brick machine with automated feeding and pressing, engineered for manufacturing high compressive strength masonry bricks at 10,000 to 20,000 bricks per day.',
    featureBadges: ['150 Bar Working Pressure', '6 Hydraulic Cylinders', 'Automatic Feeder', 'Dual Capacity Modes'],
    keyFeatures: [
      'Dual output configurations: 15 Bricks per stroke (20,000/day) or 8 Bricks per stroke (10,000/day)',
      'High-tonnage hydraulic cylinders (6 Nos) providing uniform 150 Bar compaction',
      'Large 400 Kgs / 250 Kgs heavy-duty hopper capacity for non-stop feeding',
      'High capacity 400 Ltrs / 125 Ltrs hydraulic oil reservoir with multi-stage cooling',
      'Precision electrical PLC control panel with automated cycle timing'
    ],
    specs: {
      'Bricks per Stroke': '15 | 8',
      'Production Rate': '20000 | 10000',
      'Hydraulic Motor': '15 H.P + 2 H.P | 7.5 H.P + 2 H.P',
      'Hopper Capacity': '400 Kgs | 250 Kgs',
      'Pressure': '150 Bar | 150 Bar',
      'Hydraulic Cylinders': '6 Nos | 6 Nos',
      'Hydraulic Oil Capacity': '400 Ltrs | 125 Ltrs'
    },
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
  },

  // 2. 4 Brick Rotary Machine (Fly Ash Brick Machine)
  {
    id: 'PROD-FLYASH-4BRICK-ROTARY',
    name: '4 Brick Rotary Machine',
    brandTag: 'FLY ASH MACHINE',
    category: 'Fly Ash Brick Machine',
    categorySlug: 'fly-ash-brick-machine',
    capacity: '15,000 – 25,000 Bricks per Day',
    power: '15 H.P',
    brickSize: '230 x 110 x 75 to 230 x 200 x 100',
    image: '/images/flyash-4brick-rotary.png',
    galleryImages: [
      '/images/flyash-4brick-rotary.png',
      '/images/flyash-vertical-machine.png',
      '/images/flyash-rotary-ton-machine.png'
    ],
    status: 'Active',
    description: 'Heavy-duty 4-brick rotary press machine available in Regular Model (15,000-20,000 Bricks/Day) and Speed Model (20,000-25,000 Bricks/Day) with hydraulic motor table rotation.',
    featureBadges: ['80 Ton Compaction', 'Hydraulic Rotary Table', 'Auto/Manual Brick Removal', 'Continuous Operation'],
    keyFeatures: [
      'JE – 5G 80 Ton heavy structural cast steel frame engineered for continuous production',
      'Dual variant options: Regular Model (15,000 - 20,000) & Speed Model (20,000 - 25,000)',
      '15 H.P high torque electric motor with hydraulic indexing table rotation',
      'Manual and Automated mechanical brick removal configurations available',
      'Wide raw material compatibility: Fly Ash, Iron Oxide, Lime Sludge, Quarry Waste'
    ],
    specs: {
      'Model': 'JE – 5G 80 Ton Regular & Speed Models',
      'Capacity': '15,000 – 25,000 Bricks per Day',
      'Power': '15 H.P',
      'Brick Size': '230 x 110 x 75 to 230 x 200 x 100',
      'Table Rotation': 'Hydraulic Motor',
      'Brick Removal': 'Manual / Auto',
      'Raw Material': 'Fly Ash Iron Oxide, Lime Sludge, Quarry Waste Etc.'
    },
    specTableColumns: ['Model', 'JE – 5G 80 Ton Machine Regular Model', 'JE – 5G 80 Ton Machine Speed Model'],
    specTableRows: [
      { 'Model': 'Capacity', 'JE – 5G 80 Ton Machine Regular Model': '15000 – 20000 Bricks per Day', 'JE – 5G 80 Ton Machine Speed Model': '20000 – 25000 Bricks per Day' },
      { 'Model': 'Power', 'JE – 5G 80 Ton Machine Regular Model': '15 H.P', 'JE – 5G 80 Ton Machine Speed Model': '15 H.P' },
      { 'Model': 'Brick Size', 'JE – 5G 80 Ton Machine Regular Model': '230 x 110 x 75 to 230 x 200 x 100', 'JE – 5G 80 Ton Machine Speed Model': '230 x 110 x 75 to 230 x 200 x 100' },
      { 'Model': 'Table Rotation', 'JE – 5G 80 Ton Machine Regular Model': 'Hydraulic Motor', 'JE – 5G 80 Ton Machine Speed Model': 'Hydraulic Motor' },
      { 'Model': 'Brick Removal', 'JE – 5G 80 Ton Machine Regular Model': 'Manual', 'JE – 5G 80 Ton Machine Speed Model': 'Auto' },
      { 'Model': 'Raw Material', 'JE – 5G 80 Ton Machine Regular Model': 'Fly Ash Iron Oxide, Lime Sludge, Quarry Waste Etc.', 'JE – 5G 80 Ton Machine Speed Model': 'Fly Ash Iron Oxide, Lime Sludge, Quarry Waste Etc.' }
    ]
  },

  // 3. Rotary Machine (30,40,50 Tons) (Fly Ash Brick Machine)
  {
    id: 'PROD-FLYASH-ROTARY-TONS',
    name: 'Rotary Machine (30,40,50 Tons)',
    brandTag: 'FLY ASH MACHINE',
    category: 'Fly Ash Brick Machine',
    categorySlug: 'fly-ash-brick-machine',
    capacity: '1,000 – 2,300 Bricks / hr',
    power: '15 – 20 H.P',
    brickSize: '230 x 110 x 75 to 230 x 200 x 100',
    image: '/images/flyash-rotary-ton-machine.png',
    galleryImages: [
      '/images/flyash-rotary-ton-machine.png',
      '/images/flyash-vertical-machine.png',
      '/images/flyash-4brick-rotary.png'
    ],
    status: 'Active',
    description: 'Rotary indexing fly ash brick press machine available in 30T, 40T, and 50T pressure ratings for high compressive strength masonry units.',
    featureBadges: ['30T / 40T / 50T Hydraulic Pressure', '1000 - 2300 Bricks/hr', 'Hydraulic Motor Rotation', 'Precision Alloy Dies'],
    keyFeatures: [
      'Multi-tonnage options: JE 30T (1000-1200/hr), JE 40T (1400-1600/hr), JE 50T (2000-2300/hr)',
      '15 H.P to 20 H.P 3-Phase energy-efficient induction motors',
      'Continuous hydraulic rotation table for synchronized mould filling and pressing',
      'Heavy duty forged alloy steel moulds heat treated to 58-62 HRC',
      'Processes fly ash, iron oxide, lime sludge, and quarry stone waste effortlessly'
    ],
    specs: {
      'Tonnage Options': '30 Ton / 40 Ton / 50 Ton Hydraulic Pressure',
      'Production Capacity': '1,000 – 2,300 Bricks / hr',
      'Power Requirement': '15 – 20 H.P 3-Phase Electric Motor',
      'Brick Size Range': '230 x 110 x 75 to 230 x 200 x 100 mm',
      'Table Rotation': 'Hydraulic Motor Drive',
      'Brick Removal': 'Manual Pallet Offload',
      'Raw Material Compatibility': 'Fly Ash, Iron Oxide, Lime Sludge, Quarry Waste'
    },
    specTableColumns: ['Model', 'JE 30T R1000-1200', 'JE 40T R1200-1400', 'JE 50T R2000-2300'],
    specTableRows: [
      { 'Model': 'Capacity', 'JE 30T R1000-1200': '1000-1200 Hr', 'JE 40T R1200-1400': '1400-1600 Hr', 'JE 50T R2000-2300': '2000-2300 Hr' },
      { 'Model': 'Power', 'JE 30T R1000-1200': '15 H.P', 'JE 40T R1200-1400': '15 H.P', 'JE 50T R2000-2300': '20 H.P' },
      { 'Model': 'Brick Size', 'JE 30T R1000-1200': '230 x 110 x 75 to 230 x 200 x 100', 'JE 40T R1200-1400': '230 x 110 x 75 to 230 x 200 x 100', 'JE 50T R2000-2300': '230 x 110 x 75 to 230 x 200 x 100' },
      { 'Model': 'Table Rotation', 'JE 30T R1000-1200': 'Hydraulic Motor', 'JE 40T R1200-1400': 'Hydraulic Motor', 'JE 50T R2000-2300': 'Hydraulic Motor' },
      { 'Model': 'Brick Removal', 'JE 30T R1000-1200': 'Manual', 'JE 40T R1200-1400': 'Manual', 'JE 50T R2000-2300': 'Manual' },
      { 'Model': 'Raw Material', 'JE 30T R1000-1200': 'Fly Ash Iron Oxide, Lime Sludge, Quarry Waste Etc.', 'JE 40T R1200-1400': 'Fly Ash Iron Oxide, Lime Sludge, Quarry Waste Etc.', 'JE 50T R2000-2300': 'Fly Ash Iron Oxide, Lime Sludge, Quarry Waste Etc.' }
    ]
  },

  // 4. Storage Silo (Storage Silo Category)
  {
    id: 'PROD-STORAGE-SILO',
    name: 'Storage Silo',
    brandTag: 'OUR PRODUCTS',
    category: 'Storage Silo',
    categorySlug: 'storage-silo',
    capacity: '60 Tons | 100 Tons',
    power: 'Air Compressor & Hydraulic',
    brickSize: 'Industrial Bulk Storage',
    image: '/images/storage-silo-product.png',
    galleryImages: [
      '/images/storage-silo-product.png'
    ],
    status: 'Active',
    description: 'Industrial bulk material storage silo engineered for cement, fly ash, iron oxide, and lime sludge with pneumatic air compressor fluidization and hydraulic copper lifting.',
    featureBadges: ['60T & 100T Capacities', 'Air Compressor System', 'Hydraulic Copper Lifting', 'Safety Pressure Relief'],
    keyFeatures: [
      "JE Silo's available in 60 Tons and 100 Tons standard storage capacities",
      'Integrated heavy-duty air compressor fluidization system to prevent powder jamming',
      'Hydraulic copper lifting mechanism for stable discharge gate operation',
      'Complete safety system: Overpressure relief valve, pulse-jet filter, level sensors',
      'Accommodates Fly Ash, Iron Oxide, Lime Sludge, Quarry Waste, and 6MM JellyStone Cement'
    ],
    specs: {
      'Model': "JE Silo's",
      'Capacity': '60 Tons | 100 Tons',
      'Running System': 'Air Compressor',
      'Copper Lifting': 'Hydraulic',
      'Raw Material': 'Fly Ash, Iron Oxide, Lime Sludge, Quarry Waste, 6MM JellyStone Cement'
    },
    specTableColumns: ['Specification Parameter', 'Details'],
    specTableRows: [
      { 'Specification Parameter': 'Model', 'Details': "JE Silo's" },
      { 'Specification Parameter': 'Capacity', 'Details': '60 Tons | 100 Tons' },
      { 'Specification Parameter': 'Running System', 'Details': 'Air Compressor' },
      { 'Specification Parameter': 'Copper Lifting', 'Details': 'Hydraulic' },
      { 'Specification Parameter': 'Raw Material', 'Details': 'Fly Ash, Iron Oxide, Lime Sludge, Quarry Waste, 6MM JellyStone Cement' }
    ]
  },

  // 5. Hollow and Solid Block Machines
  {
    id: 'PROD-BLOCK-AUTOMATIC-BM12',
    name: 'JE-BM12 Fully Automatic Block Making Machine',
    brandTag: 'BLOCK MACHINE',
    category: 'Hollow and Solid Block Machine',
    categorySlug: 'hollow-and-solid-block-machine',
    capacity: '1,800 – 2,400 Blocks / hr',
    power: '35 H.P (Hydraulic + Vibration)',
    brickSize: '400 x 200 x 200 mm (8") & 400 x 150 x 200 mm (6")',
    image: '/images/flyash-vertical-machine.png',
    galleryImages: [
      '/images/flyash-vertical-machine.png',
      '/images/flyash-4brick-rotary.png',
      '/images/flyash-rotary-ton-machine.png'
    ],
    status: 'Active',
    description: 'Flagship fully automated multi-cavity hollow and solid concrete block making plant with synchronized dual-directional vibration table, automated pallet feeder, and green block elevator stacker.',
    featureBadges: ['35 HP High Compaction', 'Synchronized Dual Vibration', 'Automated Stacker Unit', 'PLC Multi-Recipe Memory'],
    keyFeatures: [
      'High-throughput capacity: 1,800 to 2,400 hollow blocks/hr (8-inch) or 18,000 solid bricks/day',
      'Dual synchronized vibration table delivering 16-20 kN high-frequency compaction',
      'Heavy-duty alloy steel core boxes heat-treated to 60 HRC for ultra-crisp block corners',
      'Hydraulic green-block automatic multi-tier elevator stacker reduces manual labor by 70%',
      'Integrated touch-screen electrical PLC panel with fault self-diagnostics'
    ],
    specs: {
      'Production Capacity': '1,800 - 2,400 Blocks / hr (8" Hollow) | 18,000 Solid Bricks/Day',
      'Total Connected Power': '35 H.P 3-Phase Electric Drives',
      'Pallet Dimensions': '950 x 650 mm Heavy Marine Wood / PVC',
      'Cycle Period': '18 - 22 Seconds per stroke',
      'Operating Pressure': '160 Bar Hydraulic System',
      'Mould Compatibility': '8" Hollow, 6" Hollow, 4" Partition, Solid Blocks & Pavers'
    },
    specTableColumns: ['Specification Parameter', 'JE-BM12 Plant Specifications'],
    specTableRows: [
      { 'Specification Parameter': 'Production Capacity', 'JE-BM12 Plant Specifications': '1,800 – 2,400 Blocks/hr (8" Hollow)' },
      { 'Specification Parameter': 'Total Connected Load', 'JE-BM12 Plant Specifications': '35 H.P (Hydraulic 15 HP, Vibration 15 HP, Feeder 5 HP)' },
      { 'Specification Parameter': 'Pallet Size', 'JE-BM12 Plant Specifications': '950 x 650 mm' },
      { 'Specification Parameter': 'Cycle Time', 'JE-BM12 Plant Specifications': '18 – 22 Seconds' },
      { 'Specification Parameter': 'Hydraulic Compaction Pressure', 'JE-BM12 Plant Specifications': '160 Bar Max Working Pressure' },
      { 'Specification Parameter': 'Supported Blocks', 'JE-BM12 Plant Specifications': '8", 6", 4" Hollow Blocks, Solid Blocks, Interlocks' }
    ]
  },
  {
    id: 'PROD-BLOCK-SEMI-SBM8',
    name: 'JE-SBM8 Semi-Automatic Solid & Hollow Block Machine',
    brandTag: 'BLOCK MACHINE',
    category: 'Hollow and Solid Block Machine',
    categorySlug: 'hollow-and-solid-block-machine',
    capacity: '1,000 – 1,400 Blocks / hr',
    power: '20 H.P Hydraulic Unit',
    brickSize: '400 x 200 x 200 mm & 400 x 100 x 200 mm',
    image: '/images/flyash-4brick-rotary.png',
    galleryImages: [
      '/images/flyash-4brick-rotary.png',
      '/images/flyash-vertical-machine.png'
    ],
    status: 'Active',
    description: 'Rugged semi-automatic hydraulic block manufacturing machine ideal for small to medium scale concrete product yards and commercial construction projects.',
    featureBadges: ['20 HP Hydraulic System', 'Quick Core Box Changeover', 'Low Maintenance', 'High Compressive Strength'],
    keyFeatures: [
      'Produces 1,000 to 1,400 standard hollow and solid blocks per hour',
      'Independent hydraulic tamper cylinder ensures uniform top compaction',
      'Rapid mould change system: Swap between hollow block, solid brick, and compound wall mould in 40 minutes',
      'Heavy-duty I-beam chassis construction engineered for zero structural flexure'
    ],
    specs: {
      'Production Capacity': '1,000 - 1,400 Blocks / hr',
      'System Power': '20 H.P System',
      'Cycle Period': '22 - 26 seconds per cycle',
      'Pallet Size': '900 x 600 mm'
    },
    specTableColumns: ['Feature', 'Specification'],
    specTableRows: [
      { 'Feature': 'Output Capacity', 'Specification': '1,000 – 1,400 Blocks per Hour' },
      { 'Feature': 'Connected Power', 'Specification': '20 H.P 3-Phase Electric Motor' },
      { 'Feature': 'Pallet Size', 'Specification': '900 x 600 mm' },
      { 'Feature': 'Cycle Period', 'Specification': '22 – 26 Seconds' }
    ]
  },
  {
    id: 'PROD-BLOCK-VERTICAL',
    name: 'Vertical Block Machine',
    brandTag: 'BLOCK MACHINE',
    category: 'Hollow and Solid Block Machine',
    categorySlug: 'hollow-and-solid-block-machine',
    capacity: '1,500 – 2,000 Blocks/hr',
    power: '25 H.P System',
    brickSize: '400 x 200 x 200 mm & 400 x 150 x 200 mm',
    image: '/images/flyash-rotary-ton-machine.png',
    galleryImages: [
      '/images/flyash-rotary-ton-machine.png',
      '/images/flyash-vertical-machine.png'
    ],
    status: 'Active',
    description: 'Stationary vertical vibration block making machine engineered for manufacturing high-strength hollow concrete blocks, solid architectural blocks, and boundary wall masonry units.',
    featureBadges: ['Synchronized Dual Vibration', 'Heavy Duty Pallet Table', 'Quick Mould Interchange', 'IS 2185 Certified Output'],
    keyFeatures: [
      'High compaction density delivering sharp corners and high compressive strength',
      'Produces standard 8-inch, 6-inch, 4-inch hollow blocks and solid concrete bricks',
      'Total connected electrical load: 25 H.P with energy-efficient hydraulic drives',
      'Fast cycle time of 20 to 25 seconds per cycle'
    ],
    specs: {
      'Block Output': '1,500 - 2,000 Blocks / hr',
      'System Power': '25 H.P Total Connected Load',
      'Pallet Size': '900 x 600 mm Heavy Marine Wood / PVC',
      'Cycle Period': '20 - 25 seconds per cycle',
      'Block Types': 'Hollow Blocks, Solid Blocks, Corner Blocks'
    },
    specTableColumns: ['Feature', 'Specification'],
    specTableRows: [
      { 'Feature': 'Production Capacity', 'Specification': '1,500 – 2,000 Blocks per Hour' },
      { 'Feature': 'Connected Power', 'Specification': '25 H.P 3-Phase Electric Motor' },
      { 'Feature': 'Pallet Size', 'Specification': '900 x 600 mm' },
      { 'Feature': 'Vibration System', 'Specification': 'Synchronized High-G Mould & Tamper Head Vibration' },
      { 'Feature': 'Cycle Period', 'Specification': '20 – 25 Seconds' }
    ]
  },

  // 6. Inter Block Making Machines (Interlocking Bricks)
  {
    id: 'PROD-INTERLOCK-80T',
    name: 'JE-INT 80 Ton High-Pressure Interlocking Brick Machine',
    brandTag: 'INTERLOCK MACHINE',
    category: 'Inter Block Making Machine',
    categorySlug: 'inter-block-making-machine',
    capacity: '2,500 – 3,500 Blocks / hr',
    power: '20 H.P Hydraulic System',
    brickSize: '250 x 125 x 100 mm & 300 x 150 x 100 mm (Tongue & Groove)',
    image: '/images/flyash-rotary-ton-machine.png',
    galleryImages: [
      '/images/flyash-rotary-ton-machine.png',
      '/images/flyash-4brick-rotary.png'
    ],
    status: 'Active',
    description: 'High-tonnage hydraulic interlocking brick press machine producing mortarless self-aligning construction blocks, soil-cement stabilized bricks, and canal lining pavers.',
    featureBadges: ['80 Ton Compressive Force', 'Tongue & Groove Moulding', 'Mortarless Masonry Output', 'Hardox 500 Wear Liners'],
    keyFeatures: [
      'Delivers massive 80-ton hydraulic compaction force creating high-density, waterproof interlocking units',
      'Precision CNC-milled tongue and groove moulds ensure seamless self-aligning dry-stack construction',
      'Compatible with soil-cement, fly ash-sand-lime, and quarry dust-cement raw material formulations',
      'Dual hydraulic cylinder operation for top and bottom simultaneous compression'
    ],
    specs: {
      'Production Capacity': '2,500 - 3,500 Blocks / hr',
      'Pressing Force': '80 Tons Hydraulic Compressive Force',
      'Motor Rating': '20 H.P 3-Phase High-Torque Motor',
      'Brick Dimensions': '250 x 125 x 100 mm & 300 x 150 x 100 mm',
      'Locking System': 'Tongue & Groove Double Interlock Profile'
    },
    specTableColumns: ['Feature', 'Specification Details'],
    specTableRows: [
      { 'Feature': 'Output Capacity', 'Specification Details': '2,500 – 3,500 Blocks/hr' },
      { 'Feature': 'Hydraulic Pressure', 'Specification Details': '80 Tons' },
      { 'Feature': 'Connected Motor', 'Specification Details': '20 H.P 3-Phase Induction Motor' },
      { 'Feature': 'Standard Dimensions', 'Specification Details': '250 x 125 x 100 mm (Self-Aligning)' },
      { 'Feature': 'Applications', 'Specification Details': 'Mortarless Load-Bearing Walls, Compound Walls, Pavements' }
    ]
  },
  {
    id: 'PROD-INTERLOCK-MACHINE',
    name: 'Interlocking Brick Machine (50 Ton Standard)',
    brandTag: 'INTERLOCK MACHINE',
    category: 'Inter Block Making Machine',
    categorySlug: 'inter-block-making-machine',
    capacity: '1,500 – 2,200 Blocks / hr',
    power: '15 H.P Hydraulic',
    brickSize: '230 x 115 x 100 mm & 250 x 125 x 100 mm',
    image: '/images/flyash-4brick-rotary.png',
    galleryImages: [
      '/images/flyash-4brick-rotary.png',
      '/images/flyash-vertical-machine.png'
    ],
    status: 'Active',
    description: 'Precision hydraulic interlocking paver and brick press machine producing mortarless interlocking construction blocks, Zig-Zag pavers, and I-shape heavy traffic paver stones.',
    featureBadges: ['50-60 Ton Hydraulic Press', 'Tongue & Groove Self-Aligning', 'Hardox Wear Plates', 'Mortarless Construction'],
    keyFeatures: [
      'High compaction pressure of 50 to 60 tons for extreme weather durability',
      'Precision tongue and groove mould profiles for rapid mortarless masonry construction',
      'Adjustable paver thicknesses: 60mm, 80mm, and 100mm',
      'Equipped with hardened Hardox alloy steel mould liners for long operating lifespan'
    ],
    specs: {
      'Production Capacity': '1,500 - 2,200 Blocks / hr',
      'Motor Rating': '15 H.P 3-Phase TEFC Motor',
      'Mould Pressure': '50 - 60 Tons Hydraulic Compressive Force',
      'Paver Thickness': '60 mm, 80 mm & 100 mm adjustable',
      'Interlock Profile': 'Tongue & Groove Self-Aligning Design'
    },
    specTableColumns: ['Feature', 'Specification'],
    specTableRows: [
      { 'Feature': 'Capacity', 'Specification': '1,500 – 2,200 Blocks / hr' },
      { 'Feature': 'Motor Power', 'Specification': '15 H.P 3-Phase Motor' },
      { 'Feature': 'Hydraulic Pressure', 'Specification': '50 – 60 Tons' },
      { 'Feature': 'Block Thickness', 'Specification': '60mm, 80mm, 100mm adjustable' }
    ]
  },

  // 7. Paver Block Machines
  {
    id: 'PROD-PAVER-100T-DUALCOLOR',
    name: 'JE-PB 100 Ton Dual-Color Hydraulic Paver Machine',
    brandTag: 'PAVER MACHINE',
    category: 'Paver Block Machine',
    categorySlug: 'paver-block-machine',
    capacity: '4,500 – 6,000 Pavers / Day',
    power: '20 H.P Hydraulic + 2 H.P Color Feeder',
    brickSize: 'Zig-Zag, I-Shape (Dumbbell), Hexagonal, Uni-Paver (60–100mm)',
    image: '/images/flyash-rotary-ton-machine.png',
    galleryImages: [
      '/images/flyash-rotary-ton-machine.png',
      '/images/flyash-4brick-rotary.png'
    ],
    status: 'Active',
    description: 'Heavy-duty commercial hydraulic paver manufacturing plant equipped with a secondary top-color feeder for producing mirror-finish decorative paving tiles, industrial container yard pavers, and municipal walkway blocks.',
    featureBadges: ['100 Ton Compaction Force', 'Dual Layer Color Feeder', 'Mirror Chrome Moulds', 'M-40 / M-50 Grade Output'],
    keyFeatures: [
      '100 Tons of continuous hydraulic pressing delivers M-40 and M-50 grade heavy traffic pavers',
      'Integrated secondary hopper feeds a vibrant 6mm - 10mm top decorative oxide color layer',
      'High-frequency compaction table prevents air voids and ensures low water absorption (<5%)',
      'Quick-release mould clamp system supports Zig-Zag, Cobble, Grass Paver, and Hexagonal profiles'
    ],
    specs: {
      'Daily Production': '4,500 - 6,000 Pavers / 8 hr Shift',
      'Hydraulic Compaction': '100 Tons Hydraulic Tonnage',
      'Connected Power': '20 H.P Main Drive + 2 H.P Color Agitator',
      'Paver Thickness': '40mm, 60mm, 80mm & 100mm Adjustable',
      'Finished Surface': 'Glossy / Matte Anti-Skid Finish'
    },
    specTableColumns: ['Technical Parameter', 'JE-PB 100 Ton Specification'],
    specTableRows: [
      { 'Technical Parameter': 'Production Capacity', 'JE-PB 100 Ton Specification': '4,500 – 6,000 Pavers/Day' },
      { 'Technical Parameter': 'Tonnage', 'JE-PB 100 Ton Specification': '100 Tons Compressive Force' },
      { 'Technical Parameter': 'Connected Load', 'JE-PB 100 Ton Specification': '20 H.P + 2 H.P Color Feeder' },
      { 'Technical Parameter': 'Mould Types', 'JE-PB 100 Ton Specification': 'Zig-Zag, I-Shape (Dumbbell), Hexagonal, Rectangular' },
      { 'Technical Parameter': 'Thickness Range', 'JE-PB 100 Ton Specification': '40 mm to 100 mm' }
    ]
  },
  {
    id: 'PROD-PAVER-BLOCK-MACHINE',
    name: 'Hydraulic Paver Block Machine (60 Ton Standard)',
    brandTag: 'PAVER MACHINE',
    category: 'Paver Block Machine',
    categorySlug: 'paver-block-machine',
    capacity: '3,000 – 4,500 Pavers / Day',
    power: '10 H.P Hydraulic Unit',
    brickSize: 'Zig-Zag, I-Shape, Hexagonal & Square (60mm & 80mm)',
    image: '/images/flyash-vertical-machine.png',
    galleryImages: [
      '/images/flyash-vertical-machine.png',
      '/images/flyash-4brick-rotary.png'
    ],
    status: 'Active',
    description: 'Reliable single-operator hydraulic paver tile press for industrial yards, private driveways, and municipal footpath projects.',
    featureBadges: ['60 Ton Hydraulic Compaction', 'Cost-Effective Production', 'Compact Footprint', 'Robust Hydraulic Powerpack'],
    keyFeatures: [
      '50 to 60 tons hydraulic pressing ensuring IS 15658 compliance',
      'Single-lever ergonomic valve control or automated timer cycle',
      'High wear resistance mould cavity plates with heat-treated alloy steel',
      'Low power consumption: Operates efficiently on 10 H.P 3-Phase supply'
    ],
    specs: {
      'Daily Output': '3,000 – 4,500 Paver Tiles / Day',
      'Hydraulic Drive': '10 H.P Power Pack Unit',
      'Pressing Force': '50 - 60 Tons Hydraulic Compaction',
      'Paver Thickness': '40 mm to 80 mm adjustable'
    },
    specTableColumns: ['Feature', 'Specification'],
    specTableRows: [
      { 'Feature': 'Production Capacity', 'Specification': '3,000 – 4,500 Pavers / Day' },
      { 'Feature': 'Power Pack', 'Specification': '10 H.P Electric Motor' },
      { 'Feature': 'Compaction Force', 'Specification': '50 – 60 Tons' },
      { 'Feature': 'Paver Types', 'Specification': 'Zig-Zag, I-Shape, Hexagonal, Rectangular' }
    ]
  },

  // 8. Batching Plants
  {
    id: 'PROD-BATCHING-CBP30',
    name: 'JE-CBP 30 Stationary Concrete Batching Plant',
    brandTag: 'BATCHING PLANT',
    category: 'Batching Plant',
    categorySlug: 'batching-plant',
    capacity: '30 – 45 m³/hr Continuous Output',
    power: '45 H.P Total Connected Load',
    brickSize: 'High Homogeneity Mix for Bricks, Blocks & RMC',
    image: '/images/storage-silo-product.png',
    galleryImages: [
      '/images/storage-silo-product.png',
      '/images/flyash-vertical-machine.png'
    ],
    status: 'Active',
    description: 'High-precision commercial stationary concrete batching and mixing plant equipped with inline 4-compartment aggregate hoppers, electronic loadcell weighing, and heavy-duty planetary turbo pan mixer.',
    featureBadges: ['Planetary Turbo Pan Mixer', '4-Bin Inline Storage Hoppers', 'Digital Loadcell Accuracy (±1%)', 'PLC SCADA Interface'],
    keyFeatures: [
      'Outputs 30 to 45 m³/hr of homogenous zero-slump or standard slump concrete',
      'Planetary pan mixer with spring-cushioned arms and tungsten-carbide replaceable liners',
      'Individual electronic loadcells for precision aggregate, cement, water, and chemical additive dosing',
      'Automatic pneumatic discharge door with emergency manual hand pump release'
    ],
    specs: {
      'Mixing Capacity': '30 - 45 m³/hr',
      'Total Connected Power': '45 H.P Line',
      'Aggregate Storage': '4-Bin In-Line Hoppers (40 m³ total buffer)',
      'Mixer Type': 'Planetary Pan Mixer with Replaceable Wear Plates',
      'Batching Accuracy': '± 1% for Cement/Water, ± 2% for Aggregate',
      'Control System': 'Full Touchscreen PLC with SCADA Recipe Memory'
    },
    specTableColumns: ['Specification Parameter', 'JE-CBP 30 Plant Details'],
    specTableRows: [
      { 'Specification Parameter': 'Plant Output Rating', 'JE-CBP 30 Plant Details': '30 – 45 m³/hr Continuous Mix' },
      { 'Specification Parameter': 'Connected Power Load', 'JE-CBP 30 Plant Details': '45 H.P 3-Phase 415V' },
      { 'Specification Parameter': 'Aggregate Hoppers', 'JE-CBP 30 Plant Details': '4 Compartment Inline Bins' },
      { 'Specification Parameter': 'Mixer Design', 'JE-CBP 30 Plant Details': 'Planetary Turbo Pan Mixer' },
      { 'Specification Parameter': 'Cement Feeding', 'JE-CBP 30 Plant Details': 'Direct Silo / Screw Conveyor Feed' },
      { 'Specification Parameter': 'Automation', 'JE-CBP 30 Plant Details': 'Fully Automated PLC Panel with Multi-Formula Storage' }
    ]
  },
  {
    id: 'PROD-BATCHING-MCBP20',
    name: 'JE-MCBP 20 Compact Mobile Batching Plant',
    brandTag: 'BATCHING PLANT',
    category: 'Batching Plant',
    categorySlug: 'batching-plant',
    capacity: '20 – 30 m³/hr',
    power: '30 H.P System',
    brickSize: 'On-Site Precast & Road Masonry Production',
    image: '/images/storage-silo-product.png',
    galleryImages: [
      '/images/storage-silo-product.png'
    ],
    status: 'Active',
    description: 'Portable towable wheel-mounted concrete batching plant engineered for fast site relocation, bridge projects, and precast manufacturing with 24-hour setup time.',
    featureBadges: ['Wheel-Mounted Mobile Chassis', 'Fast Turnkey Setup', 'Integral Water & Admixture Tank', 'Heavy Duty Reversible Mixer'],
    keyFeatures: [
      'Towable heavy-duty tandem-axle chassis for rapid road transportation across project sites',
      'Complete pre-wired and pre-plumbed assembly requires no specialized civil foundation',
      'Digital loadcell aggregate skip loader with automatic weighing batch cycle',
      'Produces up to 20 to 30 m³ of high-consistency concrete per hour'
    ],
    specs: {
      'Plant Capacity': '20 - 30 m³/hr',
      'Power Requirement': '30 H.P Connected Load',
      'Mobility': 'Tandem-Axle Pneumatic Tyre Chassis with Towing Hook',
      'Aggregate Bins': '2 or 3 Compartment Hoppers'
    },
    specTableColumns: ['Feature', 'Specification Details'],
    specTableRows: [
      { 'Feature': 'Output Capacity', 'Specification Details': '20 – 30 m³/hr' },
      { 'Feature': 'Connected Power', 'Specification Details': '30 H.P 3-Phase' },
      { 'Feature': 'Mobility Type', 'Specification Details': 'Wheel-Mounted Towable Chassis' },
      { 'Feature': 'Foundation Required', 'Specification Details': 'Nil (Compacted Hard Surface Only)' }
    ]
  },

  // 9. All Genuine Machine Spares
  ...INITIAL_SPARES_PRODUCTS
];

// ─────────────────────────────────────────────────────────
// Persistent Local Storage & In-Memory Cache
// ─────────────────────────────────────────────────────────
const PRODUCTS_STORAGE_KEY = 'jupiter_machinery_products';

const saveToStorage = (products: ProductItem[]): boolean => {
  try {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    return true;
  } catch (e: any) {
    console.error('LocalStorage save error:', e);
    // If QuotaExceededError, minify by keeping URLs and trimming oversized raw data
    if (e.name === 'QuotaExceededError' || e.code === 22) {
      console.warn('LocalStorage quota exceeded. Trimming oversized payload to fit storage...');
      try {
        const minified = products.map(p => ({
          ...p,
          image: p.image && p.image.length > 500000 ? '/images/flyash-vertical-machine.png' : p.image,
          galleryImages: (p.galleryImages || []).filter(img => img.length < 300000)
        }));
        localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(minified));
        return true;
      } catch (innerErr) {
        console.error('Failed to save even minified catalog:', innerErr);
      }
    }
    return false;
  }
};

const getInitialCache = (): ProductItem[] => {
  try {
    const raw = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (raw !== null) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        // Upgrade any unsplash or outdated placeholder images to official Jupiter assets
        const updated = parsed.map(p => {
          if (p.id === 'PROD-BLOCK-VERTICAL' && (!p.image || p.image.includes('unsplash'))) {
            return { ...p, image: '/images/flyash-rotary-ton-machine.png' };
          }
          if (p.id === 'PROD-INTERLOCK-MACHINE' && (!p.image || p.image.includes('unsplash'))) {
            return { ...p, image: '/images/flyash-4brick-rotary.png' };
          }
          if (p.id === 'PROD-PAVER-BLOCK-MACHINE' && (!p.image || p.image.includes('unsplash'))) {
            return { ...p, image: '/images/flyash-vertical-machine.png' };
          }
          if (p.id === 'PROD-BATCHING-PLANT' && (!p.image || p.image.includes('unsplash'))) {
            return { ...p, image: '/images/storage-silo-product.png' };
          }
          return p;
        });

        // Add any missing default products so categories with 1 item get the full Jupiter lineup
        const existingIds = new Set(updated.map(p => p.id));
        const missing = INITIAL_DEFAULT_PRODUCTS.filter(p => !existingIds.has(p.id));
        if (missing.length > 0) {
          const merged = [...updated, ...missing];
          saveToStorage(merged);
          return merged;
        }
        return updated;
      }
    }
  } catch (e) {
    console.error('Error reading jupiter_machinery_products from localStorage:', e);
  }

  // First-time setup ONLY (when key does not exist yet)
  saveToStorage(INITIAL_DEFAULT_PRODUCTS);
  return INITIAL_DEFAULT_PRODUCTS;
};

let _cachedProducts: ProductItem[] = getInitialCache();

// Map a backend API product to frontend ProductItem
const mapBackendProduct = (p: any): ProductItem => {
  const specs = p.specifications || p.specs || {};
  const categorySlug = p.categorySlug || CATEGORY_NAME_TO_SLUG_MAP[p.category] || '';
  return {
    id: p.id,
    name: p.name,
    brandTag: p.brandTag || p.category || '',
    category: p.category,
    categorySlug,
    capacity: p.capacity || (specs['Capacity'] || ''),
    power: p.power || (specs['Power'] || ''),
    brickSize: p.brickSize || (specs['Brick Size'] || ''),
    enquiriesCount: p.enquiryCount || p.enquiriesCount || 0,
    image: p.image || '',
    galleryImages: p.galleryImages || [],
    status: p.status || 'Active',
    description: p.description || '',
    featureBadges: p.featureBadges || [],
    keyFeatures: p.keyFeatures || [],
    specs: typeof specs === 'object' ? specs : {},
    specTableColumns: p.specTableColumns || [],
    specTableRows: p.specTableRows || [],
    highlights: p.highlights || [],
    advantages: p.advantages || [],
  };
};

// ─────────────────────────────────────────────────────────
// Async API functions (primary data access)
// ─────────────────────────────────────────────────────────

export const fetchProducts = async (category?: string, search?: string): Promise<ProductItem[]> => {
  try {
    const params: Record<string, string> = {};
    if (category) params.category = category;
    if (search) params.search = search;
    const response = await apiClient.get('/products', { params, timeout: 2500 });
    const data = response.data?.data || response.data || [];
    const products = Array.isArray(data) ? data.map(mapBackendProduct) : [];

    if (!category && !search && products.length > 0) {
      const currentStored = getStoredProducts();
      const existingIds = new Set(currentStored.map(p => p.id));
      const newItems = products.filter(p => 
        !existingIds.has(p.id) &&
        p.category !== 'Mixing Equipment' && 
        p.category !== 'Automation & Handling' &&
        (p as any).slug !== 'planetary-pan-mixer-500-1000-kg' &&
        (p as any).slug !== 'automatic-pallet-stacker-feeder-system' &&
        !p.name?.includes('Planetary Pan Mixer') &&
        !p.name?.includes('Automatic Pallet Stacker')
      );
      if (newItems.length > 0) {
        const merged = [...currentStored, ...newItems];
        _cachedProducts = merged;
        saveToStorage(merged);
        window.dispatchEvent(new Event('jupiter_products_updated'));
        return merged;
      }
    }

    return getStoredProducts();
  } catch (error) {
    // API offline or unreachable: always return existing local catalog
    return getStoredProducts();
  }
};

export const fetchProductById = async (idOrSlug: string): Promise<ProductItem | null> => {
  try {
    const response = await apiClient.get(`/products/${idOrSlug}`, { timeout: 2000 });
    const data = response.data?.data || response.data;
    if (data) return mapBackendProduct(data);
  } catch (error) {
    // Fallback to local catalog
  }
  const local = getStoredProducts().find(p => p.id === idOrSlug || p.name.toLowerCase() === idOrSlug.toLowerCase());
  return local || null;
};

export const addProduct = async (product: Partial<ProductItem>): Promise<ProductItem | null> => {
  const categoryName = product.category || 'Fly Ash Brick Machine';
  const slug = product.name
    ? product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    : `product-${Date.now()}`;

  const newItem: ProductItem = {
    id: `PROD-${Date.now()}`,
    name: product.name || 'New Machine Model',
    category: categoryName,
    categorySlug: CATEGORY_NAME_TO_SLUG_MAP[categoryName] || 'fly-ash-brick-machine',
    brandTag: product.brandTag || categoryName,
    capacity: product.capacity || '',
    power: product.power || '',
    brickSize: product.brickSize || '',
    image: product.image || '/images/flyash-vertical-machine.png',
    galleryImages: product.galleryImages || [],
    status: product.status || 'Active',
    description: product.description || `${product.name || 'Machine'} engineered for high reliability and heavy-duty manufacturing.`,
    featureBadges: product.featureBadges || ['Durable Construction', 'Consistent Dimensions', 'Lower Water Absorption', 'Cost-Effective Solution'],
    keyFeatures: product.keyFeatures || ['Heavy-Duty Fabricated Chassis', 'High Compaction Density', 'Low Power Consumption'],
    specs: product.specs || {},
    specTableColumns: product.specTableColumns || ['Parameter', 'Details'],
    specTableRows: product.specTableRows || [],
    highlights: product.highlights || [],
    advantages: product.advantages || []
  };

  // 1. Immediately persist locally so refresh never loses data
  const current = getStoredProducts();
  _cachedProducts = [newItem, ...current];
  saveToStorage(_cachedProducts);
  window.dispatchEvent(new Event('jupiter_products_updated'));

  // 2. Synchronize to backend API and database
  try {
    const payload = {
      name: newItem.name,
      slug,
      category: newItem.category,
      description: newItem.description,
      capacity: newItem.capacity,
      power: newItem.power,
      image: newItem.image,
      specifications: newItem.specs,
    };
    apiClient.post('/products', payload, { timeout: 10000 })
      .then((res) => {
        if (res.data?.data?.id) {
          const currentList = getStoredProducts();
          const nextList = currentList.map(p => p.id === newItem.id ? { ...p, id: res.data.data.id } : p);
          _cachedProducts = nextList;
          saveToStorage(_cachedProducts);
        }
      })
      .catch((err) => {
        console.warn('Live DB product save failed (buffered locally):', err);
      });
  } catch (error) {
    // Handled silently
  }

  return newItem;
};

export const updateProduct = async (id: string, updates: Partial<ProductItem>): Promise<ProductItem | null> => {
  // 1. Immediately persist locally
  const current = getStoredProducts();
  _cachedProducts = current.map(p => (p.id === id ? { ...p, ...updates } : p));
  saveToStorage(_cachedProducts);
  window.dispatchEvent(new Event('jupiter_products_updated'));

  // 2. Sync to backend API and database
  try {
    const payload: any = {};
    if (updates.name) payload.name = updates.name;
    if (updates.category) payload.category = updates.category;
    if (updates.description) payload.description = updates.description;
    if (updates.capacity) payload.capacity = updates.capacity;
    if (updates.power) payload.power = updates.power;
    if (updates.image) payload.image = updates.image;
    if (updates.specs) payload.specifications = updates.specs;

    apiClient.put(`/products/${encodeURIComponent(id)}`, payload, { timeout: 10000 }).catch((err) => {
      console.warn('Live DB product update failed:', err);
    });
  } catch (error) {
    // Handled silently
  }

  return _cachedProducts.find(p => p.id === id) || null;
};

export const deleteProduct = async (id: string): Promise<boolean> => {
  // 1. Immediately persist locally
  const current = getStoredProducts();
  _cachedProducts = current.filter(p => p.id !== id);
  saveToStorage(_cachedProducts);
  window.dispatchEvent(new Event('jupiter_products_updated'));

  // 2. Sync to backend API and database
  try {
    apiClient.delete(`/products/${encodeURIComponent(id)}`, { timeout: 10000 }).catch((err) => {
      console.warn('Live DB product delete failed:', err);
    });
  } catch (error) {
    // Handled silently
  }
  return true;
};

// ─────────────────────────────────────────────────────────
// Synchronous storage accessors
// ─────────────────────────────────────────────────────────

export const getStoredProducts = (): ProductItem[] => {
  try {
    const raw = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (raw !== null) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        const clean = parsed.filter(p => 
          p.category !== 'Mixing Equipment' && 
          p.category !== 'Automation & Handling' &&
          (p as any).slug !== 'planetary-pan-mixer-500-1000-kg' &&
          (p as any).slug !== 'automatic-pallet-stacker-feeder-system' &&
          p.id !== 'cmu5ib2dz0007uvjwnbsiz34y' &&
          p.id !== 'cmu5ib2ee0008uvjwo5u2we0e' &&
          !p.name?.includes('Planetary Pan Mixer') &&
          !p.name?.includes('Automatic Pallet Stacker')
        );
        if (clean.length !== parsed.length) {
          saveToStorage(clean);
        }
        _cachedProducts = clean;
        return _cachedProducts;
      }
    }
  } catch (e) {
    console.error('Error in getStoredProducts:', e);
  }
  return _cachedProducts;
};

export const saveStoredProducts = (products: ProductItem[]): void => {
  _cachedProducts = products;
  saveToStorage(products);
  window.dispatchEvent(new Event('jupiter_products_updated'));
};

export const clearAllProducts = (): void => {
  _cachedProducts = [];
  saveToStorage([]);
  window.dispatchEvent(new Event('jupiter_products_updated'));
};

export const resetProductsToDefault = (): ProductItem[] => {
  _cachedProducts = [...INITIAL_DEFAULT_PRODUCTS];
  saveToStorage(_cachedProducts);
  window.dispatchEvent(new Event('jupiter_products_updated'));
  return _cachedProducts;
};

// ─────────────────────────────────────────────────────────
// Category metadata (static UI configuration)
// ─────────────────────────────────────────────────────────

const BASE_CATEGORY_METAS: Record<string, { name: string; subTitle: string; introDescription: string; heroImage: string; aliases: string[] }> = {
  'fly-ash-brick-machine': {
    name: 'Fly Ash Brick Machine',
    subTitle: 'Fly Ash Making Machine & Rotary Hydraulic Plants',
    introDescription: 'Jupiter Industries manufactures high-production Fly Ash Brick Making Machines including Vertical Models and Rotary Presses (30T, 40T, 50T, and 80T). Engineered for maximum compressive strength, uniform density, and minimum production labor overhead.',
    heroImage: '/images/flyash-vertical-machine.png',
    aliases: ['fly-ash-making-machine', 'fly-ash-brick-making-machine', 'fly-ash-brick-machine', 'fly-ash-machine']
  },
  'hollow-and-solid-block-machine': {
    name: 'Hollow and Solid Block Machine',
    subTitle: 'Hollow and Solid Block Making Machine',
    introDescription: 'Jupiter Industries provides state-of-the-art Hollow and Solid Block Making Machines engineered to fabricate superior grade hollow concrete blocks, solid masonry units, and cellular lightweight blocks. Equipped with synchronized high-G vibration tables and hydraulic compaction to deliver unmatched compressive strength and dimensional accuracy.',
    heroImage: '',
    aliases: ['hollow-and-solid-block-making-machine', 'concrete-block-machine']
  },
  'inter-block-making-machine': {
    name: 'Inter Block Making Machine',
    subTitle: 'Inter Locking Brick Making Machine',
    introDescription: 'Produce heavy-duty mortarless interlocking bricks and soil-cement stabilized blocks with our hydraulic Interlocking Brick Making Machines. Designed for fast construction cycles, thermal efficiency, and high structural load capacities.',
    heroImage: '',
    aliases: ['inter-locking-brick-making-machine', 'interlock-brick-machine', 'interlock-machine']
  },
  'paver-block-machine': {
    name: 'Paver Block Machine',
    subTitle: 'Hydraulic Paver Block Making Machine',
    introDescription: 'Engineered for commercial pavers, zig-zag interlocks, decorative reflective tiles, and heavy-duty industrial pavement units. Features dual-color layer feeding and multi-tonnage hydraulic pressing for exceptional finish and durability.',
    heroImage: '',
    aliases: ['paver-machine', 'hydraulic-paver-block-machine']
  },
  'batching-plant': {
    name: 'Batching Plant',
    subTitle: 'Automatic Concrete Batching Plant',
    introDescription: 'High-precision concrete batching and mixing plants for concrete products, precast components, and ready-mix production. Features multi-bin aggregate hoppers, electronic digital loadcell weighing, and planetary pan mixers for homogenous mixes.',
    heroImage: '',
    aliases: ['patching-plant', 'concrete-batching-plant']
  },
  'storage-silo': {
    name: 'Storage Silo',
    subTitle: 'Cement & Fly Ash Storage Silos (60 Tons | 100 Tons)',
    introDescription: 'Heavy-duty steel storage silos for bulk cement, fly ash, and mineral powders. Available in capacities of 60 Tons and 100 Tons with pneumatic air compressor fluidization and hydraulic copper lifting.',
    heroImage: '/images/storage-silo-product.png',
    aliases: ['cement-silo', 'fly-ash-silo', 'storage-silo']
  },
  'machine-spares': {
    name: 'Machine Spares',
    subTitle: 'Original Factory Spare Parts & Precision Moulds',
    introDescription: 'Genuine replacement parts, CNC alloy steel moulds, hydraulic cylinders, solenoid power packs, motors, and wear liners. Designed to keep your brick and block manufacturing machines running at peak efficiency with minimum downtime.',
    heroImage: '',
    aliases: ['spares', 'spare-parts', 'machine-moulds']
  }
};

export const getDynamicCategories = (): MachineCategoryData[] => {
  const allProds = getStoredProducts();

  return Object.keys(BASE_CATEGORY_METAS).map(slug => {
    const meta = BASE_CATEGORY_METAS[slug];
    const matchingProds = allProds.filter(p => {
      if (p.categorySlug === slug) return true;
      const catName = (SLUG_TO_CATEGORY_NAME_MAP[slug] || '').toLowerCase();
      const pCat = (p.category || '').toLowerCase();
      const metaName = meta.name.toLowerCase();

      if (slug === 'fly-ash-brick-machine') return pCat.includes('fly ash');
      if (slug === 'hollow-and-solid-block-machine') return pCat.includes('hollow') || pCat.includes('solid');
      if (slug === 'inter-block-making-machine') return pCat.includes('interlock') || pCat.includes('inter block') || pCat.includes('inter-lock') || pCat.includes('inter block making');
      if (slug === 'paver-block-machine') return pCat.includes('paver');
      if (slug === 'batching-plant') return pCat.includes('batching') || pCat.includes('patching');
      if (slug === 'storage-silo') return pCat.includes('silo');
      if (slug === 'machine-spares') return pCat.includes('spares');

      return p.category === catName || pCat === catName || pCat.includes(metaName);
    });

    const subMachines: SubMachineItem[] = matchingProds.map(p => {
      const specItems: MachineSpecItem[] = [];
      if (p.specs) {
        Object.entries(p.specs).forEach(([k, v]) => specItems.push({ label: k, value: v }));
      }
      if (p.capacity && !specItems.some(s => s.label === 'Capacity')) {
        specItems.push({ label: 'Capacity', value: p.capacity });
      }
      if (p.power && !specItems.some(s => s.label === 'Power')) {
        specItems.push({ label: 'Power', value: p.power });
      }

      return {
        id: p.id,
        name: p.name,
        subCategoryTag: p.brandTag || p.category,
        image: p.image,
        galleryImages: p.galleryImages || [],
        description: p.description || `${p.name} built with heavy-duty components for long-term production.`,
        capacity: p.capacity,
        power: p.power,
        brickSize: p.brickSize,
        featureBadges: p.featureBadges || ['Durable Construction', 'Consistent Dimensions', 'Lower Water Absorption', 'Cost-Effective Solution'],
        specs: specItems,
        keyFeatures: p.keyFeatures || ['Industrial Grade Heavy-Duty Construction', 'High Efficiency Low Power Consumption', 'Precision Engineered Output'],
        specTableColumns: p.specTableColumns,
        specTableRows: p.specTableRows,
        highlights: p.highlights,
        advantages: p.advantages
      };
    });

    return {
      slug,
      aliases: meta.aliases,
      name: meta.name,
      subTitle: meta.subTitle,
      introDescription: meta.introDescription,
      heroImage: meta.heroImage || (subMachines[0]?.image || ''),
      subMachines
    };
  });
};

export const getCategoryBySlug = (slugOrAlias: string): MachineCategoryData | undefined => {
  const categories = getDynamicCategories();
  const lower = slugOrAlias.toLowerCase().trim();
  return categories.find(c => c.slug === lower || c.aliases.includes(lower));
};

// Async version that ensures fresh data from the API
export const fetchCategoryBySlug = async (slugOrAlias: string): Promise<MachineCategoryData | undefined> => {
  await fetchProducts();
  return getCategoryBySlug(slugOrAlias);
};

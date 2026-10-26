import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { DEFAULT_CATALOG_PRODUCTS } from '../src/constants/defaultCatalog';

const prisma = new PrismaClient();

const pdfCandidates = [
  process.env.PDF_PATH,
  path.join(process.cwd(), 'Jupiter_Industries_Admin_Data_2026-10-24.pdf'),
  path.join(__dirname, '..', 'Jupiter_Industries_Admin_Data_2026-10-24.pdf'),
  path.join(__dirname, '..', '..', 'Jupiter_Industries_Admin_Data_2026-10-24.pdf'),
  'C:\\Users\\Administrator\\Downloads\\Jupiter_Industries_Admin_Data_2026-10-24.pdf'
].filter(Boolean) as string[];

let pdfPath = pdfCandidates.find(p => fs.existsSync(p));
if (!pdfPath) {
  console.error(`FATAL: PDF file not found in any candidate paths: ${pdfCandidates.join(', ')}`);
  process.exit(1);
}
console.log(`Using PDF source: ${pdfPath}`);


const pdfBuf = fs.readFileSync(pdfPath);
const pdfStr = pdfBuf.toString('binary');

// Ensure upload folders exist
const uploadsDir = path.join(process.cwd(), 'uploads');
const productsUploadsDir = path.join(uploadsDir, 'products');
const videosUploadsDir = path.join(uploadsDir, 'videos');

[uploadsDir, productsUploadsDir, videosUploadsDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Helper to extract embedded JPEG from PDF object stream
function extractPdfImage(objNum: number): Buffer {
  const objTag = `${objNum} 0 obj`;
  const objStart = pdfStr.indexOf(objTag);
  if (objStart === -1) {
    throw new Error(`PDF object ${objNum} not found in PDF`);
  }

  const streamTag = 'stream';
  const streamStart = pdfStr.indexOf(streamTag, objStart);
  if (streamStart === -1) {
    throw new Error(`Stream start tag not found in object ${objNum}`);
  }

  let dataStart = streamStart + 6;
  if (pdfBuf[dataStart] === 0x0d && pdfBuf[dataStart + 1] === 0x0a) {
    dataStart += 2;
  } else if (pdfBuf[dataStart] === 0x0a || pdfBuf[dataStart] === 0x0d) {
    dataStart += 1;
  }

  const endStreamTag = 'endstream';
  const endStreamPos = pdfStr.indexOf(endStreamTag, dataStart);
  if (endStreamPos === -1) {
    throw new Error(`Endstream tag not found in object ${objNum}`);
  }

  let dataEnd = endStreamPos;
  if (pdfBuf[dataEnd - 2] === 0x0d && pdfBuf[dataEnd - 1] === 0x0a) {
    dataEnd -= 2;
  } else if (pdfBuf[dataEnd - 1] === 0x0a || pdfBuf[dataEnd - 1] === 0x0d) {
    dataEnd -= 1;
  }

  const imgBuf = pdfBuf.subarray(dataStart, dataEnd);
  if (imgBuf[0] !== 0xFF || imgBuf[1] !== 0xD8) {
    throw new Error(`Object ${objNum} stream is not valid JPEG`);
  }
  return imgBuf;
}

// ─────────────────────────────────────────────────────────────
// 1. PRODUCTS DEFINITION (Exact from PDF Pages 5–16)
// ─────────────────────────────────────────────────────────────

interface ProductDefinition {
  index: number;
  name: string;
  category: string;
  brandTag: string;
  capacity: string;
  power: string;
  brickSize: string;
  status: 'Active' | 'Inactive';
  order: number;
  description: string;
  keyFeatures: string[];
  pdfObjNum: number;
  imageFilename: string;
  featureBadges: string[];
  specTableRows: Array<{ Parameter: string; Details: string; Specification: string }>;
}

const PDF_PRODUCTS: ProductDefinition[] = [
  {
    index: 1,
    name: 'Jupiter V 15 B Model – High Speed Fly Ash Brick Making Machine',
    category: 'Fly Ash Brick Machine',
    brandTag: 'JUPITER INDUSTRIES',
    capacity: '3,500–3,600 Bricks per Hour',
    power: '18 HP / 13.5 kW',
    brickSize: '230 × 105 × 75 mm',
    status: 'Active',
    order: 1,
    description: `The Jupiter V 15 B is a high-speed fly ash brick making machine for commercial production.
It produces approximately 3,500 to 3,600 bricks per hour.
The machine uses an 80 + 2 ton hydraulic pressing system with double main cylinders.
The 18 HP / 13.5 kW power system delivers dependable operating performance.
A PLC control panel enables structured production management.
The pre-fill belt system is supported by a 500-litre hydraulic oil tank.
The machine supports bricks sized at 230 x 105 x 75 mm.
It is suitable for commercial fly ash brick manufacturing units.`,
    keyFeatures: [
      '80 + 2 ton hydraulic pressing system with double main cylinders.',
      'Production capacity of 3,500 to 3,600 bricks per hour.',
      'PLC control panel for efficient machine operation.',
      'Pre-fill belt system with a 500-litre hydraulic oil tank.'
    ],
    pdfObjNum: 68,
    imageFilename: 'product_1_jupiter_v15b.jpeg',
    featureBadges: ['80+2 Ton Hydraulic Press', '3,500–3,600 Bricks/Hour', 'PLC Control Panel', '500L Pre-fill System'],
    specTableRows: [
      { Parameter: 'Machine Model', Details: 'Jupiter V 15 B Model', Specification: 'High Speed Fly Ash Brick Machine' },
      { Parameter: 'Production Capacity', Details: '3,500–3,600', Specification: 'Bricks per Hour' },
      { Parameter: 'Hydraulic Pressing Load', Details: '80 + 2 Ton', Specification: 'Double Main Cylinders' },
      { Parameter: 'Total Connected Power', Details: '18 HP / 13.5 kW', Specification: '3 Phase Electric' },
      { Parameter: 'Standard Brick Dimensions', Details: '230 × 105 × 75 mm', Specification: 'Standard Modular' },
      { Parameter: 'Hydraulic Tank Capacity', Details: '500 Litres', Specification: 'With Pre-fill System' },
      { Parameter: 'Control System', Details: 'PLC Control Panel', Specification: 'Automated Operations' },
      { Parameter: 'Manufacturer', Details: 'JUPITER INDUSTRIES', Specification: 'Coimbatore, India' }
    ]
  },
  {
    index: 2,
    name: 'Jupiter HDM 800 High-Speed Block Making Machine',
    category: 'Inter Block Making Machine',
    brandTag: 'JUPITER INDUSTRIES',
    capacity: '90–120 Strokes per Hour',
    power: '26.75 HP / 3 Phase',
    brickSize: '200 × 200 × 400 mm to 100 × 200 × 400 mm',
    status: 'Active',
    order: 1,
    description: `The Jupiter HDM 800 is a high-speed block making machine for commercial block production.
It operates with 26.75 HP, 3-phase power and delivers 90 to 120 strokes per hour.
Two high-speed mechanical RAM vibrators support moulding performance.
The hydraulic power pack includes an oil cooler and a 0.5 HP travel motor.
It supports block sizes from 200 x 200 x 400 mm to 100 x 200 x 400 mm.
The machine is designed for commercial-scale block manufacturing.`,
    keyFeatures: [
      '26.75 HP, 3-phase power for industrial block production.',
      'Two high-speed mechanical RAM vibrators for efficient moulding.',
      'Hydraulic power pack with oil cooler and hydro motor drive.',
      'Supports block sizes from 200 x 200 x 400 mm to 100 x 200 x 400 mm.'
    ],
    pdfObjNum: 69,
    imageFilename: 'product_2_jupiter_hdm800.jpeg',
    featureBadges: ['90–120 Strokes/Hour', '26.75 HP 3-Phase', 'Dual RAM Vibrators', 'Hydro Motor Drive'],
    specTableRows: [
      { Parameter: 'Machine Model', Details: 'Jupiter HDM 800', Specification: 'High-Speed Block Machine' },
      { Parameter: 'Operating Capacity', Details: '90–120 Strokes per Hour', Specification: 'Cycle dependent' },
      { Parameter: 'Connected Power', Details: '26.75 HP / 3 Phase', Specification: 'Industrial 415V' },
      { Parameter: 'RAM Vibrators', Details: '2 High-Speed Mechanical', Specification: 'High-Density Compaction' },
      { Parameter: 'Block Dimensions', Details: '200×200×400 to 100×200×400 mm', Specification: 'Interlocking & Solid' },
      { Parameter: 'Travel Motor', Details: '0.5 HP Hydro Motor', Specification: 'Precision Travel' },
      { Parameter: 'Manufacturer', Details: 'JUPITER INDUSTRIES', Specification: 'Heavy Engineering' }
    ]
  },
  {
    index: 3,
    name: 'Hollow and Solid Block Making Machine – Double & Triple Vibrator',
    category: 'Hollow and Solid Block Machine',
    brandTag: 'JUPITER INDUSTRIES',
    capacity: '-',
    power: 'Double: 6.5 HP / Triple: 7 HP',
    brickSize: '400 × 200 × 200 mm, 400 × 200 × 150 mm, 400 × 200 × 100 mm',
    status: 'Active',
    order: 1,
    description: `This hollow and solid block making machine is available in double and triple vibrator models.
It is suitable for producing 8-inch, 6-inch and 4-inch concrete blocks.
The machine can operate through hydraulic or electrical operating systems.
The double vibrator model uses 6.5 HP, while the triple vibrator model uses 7 HP.
It uses an MS mould and a 0.5 HP travel motor.
It supports block dimensions of 400 x 200 x 200 mm, 400 x 200 x 150 mm and 400 x 200 x 100 mm.`,
    keyFeatures: [
      'Available in double vibrator and triple vibrator machine variants.',
      'Supports 4-inch, 6-inch and 8-inch block mould sizes.',
      'Hydraulic or electrical operating system options.',
      'MS mould construction with a 0.5 HP travel motor.'
    ],
    pdfObjNum: 70,
    imageFilename: 'product_3_hollow_solid_block.jpeg',
    featureBadges: ['Double & Triple Vibrator', '4", 6", 8" Block Moulds', '6.5 HP / 7 HP Options', '0.5 HP Travel Motor'],
    specTableRows: [
      { Parameter: 'Machine Model', Details: 'Hollow and Solid Block Making Machine', Specification: 'Double & Triple Vibrator' },
      { Parameter: 'Connected Power', Details: 'Double: 6.5 HP / Triple: 7 HP', Specification: '415V 3-Phase' },
      { Parameter: 'Travel Motor', Details: '0.5 HP Travel Motor', Specification: 'Heavy Duty MS Mould' },
      { Parameter: 'Standard Block Sizes', Details: '400×200×200, 400×200×150, 400×200×100 mm', Specification: '8", 6", 4" Blocks' },
      { Parameter: 'Operation Type', Details: 'Hydraulic or Electrical', Specification: 'Configurable' },
      { Parameter: 'Manufacturer', Details: 'JUPITER INDUSTRIES', Specification: 'Block Division' }
    ]
  },
  {
    index: 4,
    name: 'JI Batching Plant',
    category: 'Batching Plant',
    brandTag: 'JUPITER INDUSTRIES',
    capacity: '3 Bin / 4 Bin',
    power: 'PLC Control',
    brickSize: '',
    status: 'Active',
    order: 1,
    description: `The JI Batching Plant is designed for storing and handling raw materials used in fly ash brick production.
It is available with 3-bin and 4-bin storage configurations.
The PLC control system supports controlled material handling and batching operations.
The plant supports key raw materials including fly ash, cement, sand and lime.
It is engineered for organized material storage and consistent batching.`,
    keyFeatures: [
      'Available in 3-bin and 4-bin storage options.',
      'PLC-based control for material handling operations.',
      'Supports essential raw materials for fly ash brick production.',
      'Designed to support organised material batching and consistent daily output.'
    ],
    pdfObjNum: 71,
    imageFilename: 'product_4_ji_batching_plant.jpeg',
    featureBadges: ['3-Bin / 4-Bin Options', 'PLC Control System', 'Automated Weigh Batching', 'Continuous In-Feed'],
    specTableRows: [
      { Parameter: 'Plant Model', Details: 'JI Batching Plant', Specification: 'Raw Material Batching' },
      { Parameter: 'Bin Configuration', Details: '3 Bin / 4 Bin Options', Specification: 'Custom Partitioning' },
      { Parameter: 'Control System', Details: 'PLC Control Panel', Specification: 'Load Cell Based Weighing' },
      { Parameter: 'Material Handling', Details: 'Fly Ash, Cement, Sand, Lime', Specification: 'Pneumatic Gate Discharge' },
      { Parameter: 'Manufacturer', Details: 'JUPITER INDUSTRIES', Specification: 'Industrial Plant' }
    ]
  },
  {
    index: 5,
    name: 'High Precision CNC Hardened Alloy Steel Mould Sets',
    category: 'Machine Spares',
    brandTag: 'JUPITER INDUSTRIES',
    capacity: 'Up to 250,000 Cycles Lifespan',
    power: 'Tool Steel Component',
    brickSize: 'All Standard & Custom Sizes',
    status: 'Active',
    order: 1,
    description: `Original factory spare parts, CNC carburized alloy steel moulds, hydraulic cylinders, and wear liners designed to keep brick and block machinery running at peak efficiency with minimum downtime.
Hardened to 58-62 HRC using carburizing and vacuum heat treatment for exceptional wear resistance and dimensional precision across high-volume production cycles.`,
    keyFeatures: [
      'Ultra-precision CNC EDM wire-cut cavities guarantee exact dimensional tolerances.',
      'Carburized steel treatment delivers up to 250,000 operational cycles before refurbishing.',
      'Rapid mould changeover mechanism reduces tooling change downtime to under 45 minutes.',
      'Complete interchangeable liner plates allow economical refurbishment without replacing entire mould bodies.'
    ],
    pdfObjNum: 72,
    imageFilename: 'product_5_cnc_alloy_mould_sets.jpeg',
    featureBadges: ['58-62 HRC Hardness', '250,000 Cycles Lifespan', 'CNC EDM Wire-Cut', 'Modular Liner Plates'],
    specTableRows: [
      { Parameter: 'Component Type', Details: 'CNC Hardened Alloy Steel Mould Sets', Specification: 'Machinery Tooling' },
      { Parameter: 'Lifespan', Details: 'Up to 250,000 Cycles', Specification: 'Before Refurbishment' },
      { Parameter: 'Steel Grade', Details: 'Carburized Tool Steel / WPS', Specification: 'Vacuum Heat Treated' },
      { Parameter: 'Dimensional Tolerance', Details: 'All Standard & Custom Sizes', Specification: '±0.2mm Precision' },
      { Parameter: 'Manufacturer', Details: 'JUPITER INDUSTRIES', Specification: 'Tooling Division' }
    ]
  },
  {
    index: 6,
    name: 'Jupiter V 12 B Model – High Speed Fly Ash Brick Making Machine',
    category: 'Fly Ash Brick Machine',
    brandTag: 'JUPITER INDUSTRIES',
    capacity: '2,700–2,800 Bricks per Hour',
    power: '18 HP / 13.5 kW',
    brickSize: '230 × 105 × 75 mm',
    status: 'Inactive',
    order: 2,
    description: `The Jupiter V 12 B is a high-speed fly ash brick making machine for commercial production.
It delivers a production capacity of 2,700 to 2,800 bricks per hour.
The machine features a 50 + 2 ton hydraulic pressing system with double main cylinders.
The 18 HP / 13.5 kW power system supports steady machine performance.
It includes a PLC control panel and a pre-fill belt system with a 500-litre hydraulic oil tank.
The machine supports bricks sized at 230 x 105 x 75 mm.
It is engineered for commercial fly ash brick manufacturing.`,
    keyFeatures: [
      '50 + 2 ton hydraulic pressing system with double main cylinders.',
      'Production capacity of 2,700 to 2,800 bricks per hour.',
      'PLC control panel for efficient machine operation.',
      'Pre-fill belt system with a 500-litre hydraulic oil tank.'
    ],
    pdfObjNum: 68,
    imageFilename: 'product_6_jupiter_v12b.jpeg',
    featureBadges: ['50+2 Ton Hydraulic Press', '2,700–2,800 Bricks/Hour', 'PLC Control Panel', '500L Oil Tank'],
    specTableRows: [
      { Parameter: 'Machine Model', Details: 'Jupiter V 12 B Model', Specification: 'High Speed Fly Ash Brick Machine' },
      { Parameter: 'Production Capacity', Details: '2,700–2,800 Bricks per Hour', Specification: 'Continuous Output' },
      { Parameter: 'Hydraulic Pressing Load', Details: '50 + 2 Ton', Specification: 'Double Main Cylinders' },
      { Parameter: 'Connected Power', Details: '18 HP / 13.5 kW', Specification: '3 Phase 415V' },
      { Parameter: 'Standard Brick Dimensions', Details: '230 × 105 × 75 mm', Specification: 'Modular Brick' },
      { Parameter: 'Control System', Details: 'PLC Control Panel', Specification: 'Semi/Full Auto' },
      { Parameter: 'Manufacturer', Details: 'JUPITER INDUSTRIES', Specification: 'Coimbatore, India' }
    ]
  },
  {
    index: 7,
    name: 'Bulk Cement & Fly Ash Storage Silo (60T - 100T)',
    category: 'Storage Silo',
    brandTag: 'JUPITER INDUSTRIES',
    capacity: '60 Tons / 100 Tons Capacity',
    power: '7.5 HP Blower Motor',
    brickSize: 'Diameter: 3,200 mm',
    status: 'Active',
    order: 2,
    description: `Heavy-duty steel storage silos for bulk cement, fly ash, and mineral powders. Available in capacities of 60 Tons and 100 Tons with pneumatic aeration pads and screw conveyor discharge.
Equipped with top-mounted pulse-jet dust filters, safety pressure relief valves, and electronic level indicators for automated batching plant integration.`,
    keyFeatures: [
      'Pneumatic fluidization prevents material bridging inside cone hopper.',
      'Integrated dust collector filter on top vent prevents environmental emission.',
      'High-grade structural steel welded shell with anti-corrosive primer and polyurethane enamel finish.',
      'Seamless flanged bottom discharge compatible with standard 219mm / 273mm screw feeders.'
    ],
    pdfObjNum: 73,
    imageFilename: 'product_7_cement_flyash_silo.jpeg',
    featureBadges: ['60T / 100T Capacities', '7.5 HP Blower Motor', '3,200mm Diameter', 'Pulse-Jet Top Filter'],
    specTableRows: [
      { Parameter: 'Equipment Type', Details: 'Storage Silo', Specification: 'Bulk Cement & Fly Ash' },
      { Parameter: 'Capacity', Details: '60 Tons / 100 Tons', Specification: 'Volume: 45m³ / 75m³' },
      { Parameter: 'Silo Diameter', Details: 'Diameter: 3,200 mm', Specification: 'Heavy Gauge Welded Steel' },
      { Parameter: 'Blower Motor', Details: '7.5 HP Blower Motor', Specification: 'Pneumatic Fluidization' },
      { Parameter: 'Discharge', Details: 'Bottom Cone Discharge', Specification: 'Screw Feeder Ready' },
      { Parameter: 'Manufacturer', Details: 'JUPITER INDUSTRIES', Specification: 'Plant Infrastructure' }
    ]
  },
  {
    index: 8,
    name: 'Fully Automatic Fly Ash Brick Machine',
    category: 'Fly Ash Brick Machine',
    brandTag: 'JUPITER INDUSTRIES',
    capacity: '12,000 - 18,000 Bricks / Shift',
    power: '32.5 HP (3 Phase)',
    brickSize: '230 x 110 x 75 mm',
    status: 'Active',
    order: 3,
    description: `State-of-the-art fully automatic fly ash brick making plant with high hydraulic compression of up to 100 Tons. Features automatic pallet feeding, conveyor material dispatch, and PLC touch screen controls.
Engineered for industrial-scale manufacturing of uniform, high-strength eco-friendly fly ash bricks with minimum manpower.`,
    keyFeatures: [
      'Automatic hydraulic pallet feeder and product stacker line.',
      'High pressing tonnage ensures sharp brick edges and minimum cement ratio.',
      'Touchscreen HMI with remote diagnostic features.',
      'Heavy-duty 4-pillar chrome-plated guide column structure.'
    ],
    pdfObjNum: 74,
    imageFilename: 'product_8_fully_auto_flyash.jpeg',
    featureBadges: ['12,000-18,000/Shift', '32.5 HP (3 Phase)', '100 Ton Compression', 'PLC Touchscreen HMI'],
    specTableRows: [
      { Parameter: 'Machine Model', Details: 'Fully Automatic Fly Ash Brick Machine', Specification: 'Industrial High-Tonnage' },
      { Parameter: 'Shift Output', Details: '12,000 - 18,000 Bricks / Shift', Specification: '8-Hour Shift' },
      { Parameter: 'Power Requirement', Details: '32.5 HP (3 Phase)', Specification: '415V, 50Hz' },
      { Parameter: 'Brick Size', Details: '230 x 110 x 75 mm', Specification: 'Standard Modular' },
      { Parameter: 'Hydraulic Press', Details: '100 Ton Hydraulic Compression', Specification: 'Heavy 4-Pillar Design' },
      { Parameter: 'Automation', Details: 'Automatic Pallet Feeder & Stacker', Specification: 'Touchscreen HMI' },
      { Parameter: 'Manufacturer', Details: 'JUPITER INDUSTRIES', Specification: 'Coimbatore, India' }
    ]
  },
  {
    index: 9,
    name: 'Jupiter V 10 B Model – High Speed Fly Ash Brick Making Machine',
    category: 'Fly Ash Brick Machine',
    brandTag: 'JUPITER INDUSTRIES',
    capacity: '2,300–2,400 Bricks per Hour',
    power: '12.5 HP',
    brickSize: '230 × 105 × 75 mm',
    status: 'Active',
    order: 4,
    description: `The Jupiter V 10 B is a high-speed fly ash brick making machine for commercial production.
It features a 100 ton pressing load for dependable brick manufacturing.
The machine is suitable for fly ash, iron oxide, lime sludge and quarry waste materials.
It is powered by a 10 HP main motor and includes a 0.5 HP cooling system and a 2 HP brick outlet conveyor.
It delivers an output of 2,300 to 2,400 bricks per hour.
The machine supports bricks sized at 230 x 105 x 75 mm.
It is engineered for reliable, continuous brick manufacturing operations.`,
    keyFeatures: [
      '100 ton pressing load for high-speed fly ash brick production.',
      '10 HP main motor with a 0.5 HP cooling system motor.',
      '2 HP brick outlet conveyor for efficient brick handling.',
      'Compatible with fly ash, iron oxide, lime sludge and quarry waste.'
    ],
    pdfObjNum: 75,
    imageFilename: 'product_9_jupiter_v10b.jpeg',
    featureBadges: ['100 Ton Pressing Load', '2,300–2,400 Bricks/Hour', '12.5 HP Total Connected', '2 HP Outlet Conveyor'],
    specTableRows: [
      { Parameter: 'Machine Model', Details: 'Jupiter V 10 B Model', Specification: 'High Speed Fly Ash Brick Machine' },
      { Parameter: 'Production Capacity', Details: '2,300–2,400 Bricks per Hour', Specification: 'High Speed Commercial' },
      { Parameter: 'Pressing Load', Details: '100 Ton Pressing Load', Specification: 'Hydraulic Compression' },
      { Parameter: 'Total Power', Details: '12.5 HP', Specification: '10 HP Main + 2 HP Conveyor + 0.5 HP Cooler' },
      { Parameter: 'Brick Size', Details: '230 × 105 × 75 mm', Specification: 'Standard Modular Brick' },
      { Parameter: 'Raw Material Suitability', Details: 'Fly Ash, Lime Sludge, Iron Oxide, Quarry Waste', Specification: 'Multi-Raw Material' },
      { Parameter: 'Manufacturer', Details: 'JUPITER INDUSTRIES', Specification: 'Coimbatore, India' }
    ]
  },
  {
    index: 10,
    name: 'Semi-Automatic Fly Ash Brick Machine',
    category: 'Fly Ash Brick Machine',
    brandTag: 'JUPITER INDUSTRIES',
    capacity: '6,000 - 8,000 Bricks / Shift',
    power: '22 HP (3 Phase)',
    brickSize: '230 x 110 x 75 mm',
    status: 'Active',
    order: 5,
    description: `Rugged, cost-effective hydraulic brick making machine engineered for small and medium-scale brick manufacturers. Features manual valve controls with motorized pan mixer and conveyor for dependable daily production.
Simple maintenance, lower initial investment, and easy operation make it the ideal starter plant for emerging brick enterprises.`,
    keyFeatures: [
      'Dependable hydraulic hand-lever operating valves.',
      'High-density compaction reduces lime/cement ratio.',
      'Complete system includes pan mixer, conveyor belt and machine.',
      'Low electrical consumption and minimal daily maintenance needs.'
    ],
    pdfObjNum: 77,
    imageFilename: 'product_10_semi_auto_flyash.jpeg',
    featureBadges: ['6,000-8,000 Bricks/Shift', '22 HP (3 Phase)', 'Manual Lever Controls', 'Pan Mixer & Conveyor Included'],
    specTableRows: [
      { Parameter: 'Machine Model', Details: 'Semi-Automatic Fly Ash Brick Machine', Specification: 'Starter Industrial Plant' },
      { Parameter: 'Shift Capacity', Details: '6,000 - 8,000 Bricks / Shift', Specification: '8-Hour Operation' },
      { Parameter: 'Connected Power', Details: '22 HP (3 Phase)', Specification: '415V 3-Phase' },
      { Parameter: 'Brick Dimensions', Details: '230 x 110 x 75 mm', Specification: 'Standard Fly Ash Brick' },
      { Parameter: 'Operating System', Details: 'Manual Hydraulic Hand-Lever Valves', Specification: 'Robust & Dependable' },
      { Parameter: 'System Inclusions', Details: 'Pan Mixer, Conveyor Belt, Press', Specification: 'Complete Turnkey' },
      { Parameter: 'Manufacturer', Details: 'JUPITER INDUSTRIES', Specification: 'Coimbatore, India' }
    ]
  },
  {
    index: 11,
    name: 'Automatic Fly Ash Brick Making Machine – Rotary 5G Model 80 Ton',
    category: 'Fly Ash Brick Machine',
    brandTag: 'JUPITER INDUSTRIES',
    capacity: '2,900–3,000 Bricks per Hour',
    power: '20 HP',
    brickSize: '-',
    status: 'Active',
    order: 6,
    description: `The Rotary 5G Model 80 Ton is an automatic fly ash brick making machine for commercial production.
It delivers a production capacity of approximately 2,900 to 3,000 bricks per hour.
The machine operates through a 20 HP hydraulic system.
Its three-stage rotary table supports a continuous production cycle.
PLC controls enable smooth and efficient machine operation.
It is suitable for fly ash, lime, dust and cement-based raw materials.`,
    keyFeatures: [
      '80 ton automatic rotary fly ash brick making system.',
      'Production capacity of 2,900 to 3,000 bricks per hour.',
      'Three-stage rotary table for continuous production flow.',
      'PLC control system with 40 kg feeder capacity.'
    ],
    pdfObjNum: 78,
    imageFilename: 'product_11_rotary_5g_80ton.jpeg',
    featureBadges: ['80 Ton Rotary Machine', '2,900–3,000 Bricks/Hour', 'Three-Stage Rotary Table', 'PLC Control System'],
    specTableRows: [
      { Parameter: 'Machine Model', Details: 'Rotary 5G Model 80 Ton', Specification: 'Automatic Fly Ash Brick Machine' },
      { Parameter: 'Production Capacity', Details: '2,900–3,000 Bricks per Hour', Specification: 'Continuous Rotary Output' },
      { Parameter: 'Tonnage Load', Details: '80 Ton Hydraulic Press', Specification: 'Continuous Compression' },
      { Parameter: 'Power System', Details: '20 HP Hydraulic System', Specification: 'High Efficiency 3-Phase' },
      { Parameter: 'Rotary Table', Details: 'Three-Stage Continuous Flow', Specification: 'Index Turntable' },
      { Parameter: 'Feeder Capacity', Details: '40 kg Feeder Capacity', Specification: 'Automatic PLC Controlled' },
      { Parameter: 'Manufacturer', Details: 'JUPITER INDUSTRIES', Specification: 'Coimbatore, India' }
    ]
  },
  {
    index: 12,
    name: 'Automatic Fly Ash 50 Ton Rotary 2 & 3 Brick Making Machine',
    category: 'Fly Ash Brick Machine',
    brandTag: 'JUPITER INDUSTRIES',
    capacity: '2 Bricks: 2,300–2,400 / 3 Bricks: 2,400–2,500 per Hour',
    power: '20 HP',
    brickSize: '-',
    status: 'Active',
    order: 8,
    description: `The Automatic Fly Ash 50 Ton Rotary Machine is available in 2-brick and 3-brick configurations.
The 2-brick model produces approximately 2,300 to 2,400 bricks per hour.
The 3-brick model delivers approximately 2,400 to 2,500 bricks per hour.
It operates through a 20 HP hydraulic system with hydraulic table rotation.
PLC controls support smooth and controlled machine operation.
It is suitable for fly ash, iron oxide, lime sludge and quarry waste materials.`,
    keyFeatures: [
      'Available in 2-brick and 3-brick production configurations.',
      '20 HP hydraulic system with hydraulic table rotation.',
      'PLC control system for efficient production operation.',
      'Compatible with fly ash, iron oxide, lime sludge and quarry waste.'
    ],
    pdfObjNum: 79,
    imageFilename: 'product_12_50ton_rotary_2_3.jpeg',
    featureBadges: ['50 Ton Rotary Press', '2 & 3 Brick Options', '2,300–2,500 Bricks/Hour', 'Hydraulic Table Rotation'],
    specTableRows: [
      { Parameter: 'Machine Model', Details: 'Automatic Fly Ash 50 Ton Rotary', Specification: '2 & 3 Brick Configuration' },
      { Parameter: 'Capacity (2 Bricks)', Details: '2,300–2,400 Bricks per Hour', Specification: 'Dual Cavity' },
      { Parameter: 'Capacity (3 Bricks)', Details: '2,400–2,500 Bricks per Hour', Specification: 'Triple Cavity' },
      { Parameter: 'Hydraulic System', Details: '50 Ton Pressing / 20 HP Motor', Specification: 'Hydraulic Turntable Rotation' },
      { Parameter: 'Control System', Details: 'PLC Control Panel', Specification: 'Automatic Cycle' },
      { Parameter: 'Manufacturer', Details: 'JUPITER INDUSTRIES', Specification: 'Coimbatore, India' }
    ]
  },
  {
    index: 13,
    name: '4 Brick Rotary Machine',
    category: 'Fly Ash Brick Machine',
    brandTag: 'JUPITER INDUSTRIES',
    capacity: '15,000 – 25,000 Bricks per Day',
    power: '15 HP / 11 kW',
    brickSize: '230 x 110 x 75 mm',
    status: 'Active',
    order: 9,
    description: `Rotary turntable brick press with high-speed automated cycle, 4-cavity turntable indexing, and interchangeable multi-cavity hardened moulds.`,
    keyFeatures: [
      'Continuous rotary turntable motion cuts cycle time to under 8 seconds.',
      'Simultaneous filling, pressing, and demoulding at separate stations.',
      'High-speed automated cycle with 4-cavity turntable indexing.',
      'Interchangeable multi-cavity hardened moulds.'
    ],
    pdfObjNum: 80,
    imageFilename: 'product_13_4_brick_rotary.jpeg',
    featureBadges: ['4-Station Rotary Table', '15,000–25,000 Bricks/Day', '15 HP / 11 kW', 'Under 8s Cycle Time'],
    specTableRows: [
      { Parameter: 'Machine Model', Details: '4 Brick Rotary Machine', Specification: 'Turntable Rotary Press' },
      { Parameter: 'Daily Output', Details: '15,000 – 25,000 Bricks per Day', Specification: 'High-Volume Production' },
      { Parameter: 'Cycle Time', Details: 'Under 8 Seconds', Specification: 'Continuous Rotary Indexing' },
      { Parameter: 'Total Power', Details: '15 HP / 11 kW', Specification: '3 Phase 415V' },
      { Parameter: 'Brick Dimensions', Details: '230 x 110 x 75 mm', Specification: 'Modular Brick' },
      { Parameter: 'Manufacturer', Details: 'JUPITER INDUSTRIES', Specification: 'Coimbatore, India' }
    ]
  },
  {
    index: 14,
    name: 'Automatic Fly Ash Brick Making Machine – 30 Ton Rotary Machine',
    category: 'Fly Ash Brick Machine',
    brandTag: 'JUPITER INDUSTRIES',
    capacity: '1,600–1,800 Bricks per Hour',
    power: '10 HP',
    brickSize: '-',
    status: 'Active',
    order: 10,
    description: `The 30 Ton Rotary Machine is an automatic fly ash brick making machine for commercial production.
It delivers a production capacity of approximately 1,600 to 1,800 bricks per hour.
The machine uses a 10 HP hydraulic system with two cylinders.
The hydraulic cylinders support brick pressing and ejection operations.
Hydraulic table rotation enables a smooth production cycle.
It is suitable for fly ash, iron oxide, lime sludge and quarry waste materials.`,
    keyFeatures: [
      '30 ton automatic rotary fly ash brick making system.',
      'Production capacity of 1,600 to 1,800 bricks per hour.',
      'Two hydraulic cylinders for pressing and ejection.',
      'Hydraulic table rotation with PLC control system.'
    ],
    pdfObjNum: 79,
    imageFilename: 'product_14_30ton_rotary.jpeg',
    featureBadges: ['30 Ton Rotary Press', '1,600–1,800 Bricks/Hour', 'Dual Hydraulic Cylinders', '10 HP Hydraulic System'],
    specTableRows: [
      { Parameter: 'Machine Model', Details: '30 Ton Rotary Machine', Specification: 'Automatic Fly Ash Brick Machine' },
      { Parameter: 'Hourly Capacity', Details: '1,600–1,800 Bricks per Hour', Specification: 'Rotary Turntable' },
      { Parameter: 'Pressing Force', Details: '30 Ton Hydraulic Load', Specification: 'Dual Pressing & Ejection Cylinders' },
      { Parameter: 'Power Rating', Details: '10 HP', Specification: '415V 3-Phase' },
      { Parameter: 'Table Rotation', Details: 'Hydraulic Table Rotation', Specification: 'PLC Controlled Indexing' },
      { Parameter: 'Manufacturer', Details: 'JUPITER INDUSTRIES', Specification: 'Coimbatore, India' }
    ]
  },
  {
    index: 15,
    name: '6 Brick Rotary Machine',
    category: 'Fly Ash Brick Machine',
    brandTag: 'JUPITER INDUSTRIES',
    capacity: '20,000 – 35,000 Bricks per Day',
    power: '20 HP / 15 kW',
    brickSize: '230 x 110 x 75 mm',
    status: 'Active',
    order: 11,
    description: `Ultra high-volume 6-brick rotary press with PLC automation, 100 Ton clamping force, and synchronized stacker for large commercial plants.`,
    keyFeatures: [
      'Heavy-duty hardened turntable with precision Geneva / servo drive.',
      'High-speed auto stacker compatibility.',
      '100 Ton clamping force for high compaction strength.',
      '6-cavity simultaneous pressing and demoulding stations.'
    ],
    pdfObjNum: 81,
    imageFilename: 'product_15_6_brick_rotary.jpeg',
    featureBadges: ['6-Cavity Rotary Press', '20,000–35,000 Bricks/Day', '100 Ton Clamping Force', '20 HP / 15 kW'],
    specTableRows: [
      { Parameter: 'Machine Model', Details: '6 Brick Rotary Machine', Specification: 'Ultra High-Volume Industrial' },
      { Parameter: 'Daily Capacity', Details: '20,000 – 35,000 Bricks per Day', Specification: 'Commercial Plants' },
      { Parameter: 'Clamping Force', Details: '100 Ton Clamping Force', Specification: 'Precision Geneva/Servo Drive' },
      { Parameter: 'Power System', Details: '20 HP / 15 kW', Specification: 'High-Efficiency 3-Phase' },
      { Parameter: 'Brick Size', Details: '230 x 110 x 75 mm', Specification: 'Standard Modular' },
      { Parameter: 'Auto Stacker', Details: 'Synchronized Stacker Compatible', Specification: 'Automated Line' },
      { Parameter: 'Manufacturer', Details: 'JUPITER INDUSTRIES', Specification: 'Coimbatore, India' }
    ]
  }
];

// ─────────────────────────────────────────────────────────────
// 2. VIDEOS DEFINITION (Exact from PDF Pages 17–19)
// ─────────────────────────────────────────────────────────────

interface VideoDefinition {
  index: number;
  title: string;
  category: string;
  videoUrl: string;
  duration: string;
  views: string;
  description: string;
  pdfObjNum: number;
  imageFilename: string;
}

const PDF_VIDEOS: VideoDefinition[] = [
  {
    index: 1,
    title: 'Fly Ash Brick Making Machine Feeder Model | Jupiter Engineering',
    category: 'Block Machines',
    videoUrl: 'https://www.youtube.com/watch?v=Wa-UzforKMk',
    duration: '3:30',
    views: '1.2K views',
    description: 'Machinery in action live demonstration by Jupiter Industries.',
    pdfObjNum: 106,
    imageFilename: 'video_1_feeder_model.jpeg'
  },
  {
    index: 2,
    title: 'Fly Ash Brick Making Machine with PAN MIXER | Jupiter Engineering',
    category: 'Block Machines',
    videoUrl: 'https://www.youtube.com/watch?v=vyRBgBtqf-A',
    duration: '3:30',
    views: '1.2K views',
    description: 'Machinery in action live demonstration by Jupiter Industries.',
    pdfObjNum: 107,
    imageFilename: 'video_2_pan_mixer.jpeg'
  },
  {
    index: 3,
    title: 'HDM 800 Solid Block Making Machine | Jupiter Engineering',
    category: 'Block Machines',
    videoUrl: 'https://www.youtube.com/watch?v=eZFIS9llaM0',
    duration: '3:30',
    views: '1.2K views',
    description: 'Machinery in action live demonstration by Jupiter Industries.',
    pdfObjNum: 108,
    imageFilename: 'video_3_hdm800_solid_block.jpeg'
  },
  {
    index: 4,
    title: 'Solid Block Making Machine | Precision & Efficiency for Solid Block Production',
    category: 'Block Machines',
    videoUrl: 'https://www.youtube.com/watch?v=BZdrL-C_3jM',
    duration: '3:30',
    views: '1.2K views',
    description: 'Machinery in action live demonstration by Jupiter Industries.',
    pdfObjNum: 109,
    imageFilename: 'video_4_solid_block_machine.jpeg'
  },
  {
    index: 5,
    title: 'New Fly Ash Rotary Making Machine Installation | Jupiter Engineering',
    category: 'Block Machines',
    videoUrl: 'https://www.youtube.com/watch?v=4vr3cQQ-IjY',
    duration: '3:30',
    views: '1.2K views',
    description: 'Machinery in action live demonstration by Jupiter Industries.',
    pdfObjNum: 110,
    imageFilename: 'video_5_new_rotary_installation.jpeg'
  },
  {
    index: 6,
    title: 'Multi Purpose Brick and Block Making Machine Manufacturers in India | Jupiter Engineering | #Bricks',
    category: 'Block Machines',
    videoUrl: 'https://www.youtube.com/watch?v=KuXvn4m0ZJc',
    duration: '3:30',
    views: '1.2K views',
    description: 'Machinery in action live demonstration by Jupiter Industries.',
    pdfObjNum: 111,
    imageFilename: 'video_6_multi_purpose_brick_block.jpeg'
  },
  {
    index: 7,
    title: 'Paver Block Making Machine Manufacturers in India | Jupiter Engineering | #paverblockmachine',
    category: 'Block Machines',
    videoUrl: 'https://www.youtube.com/watch?v=doPdNHQmV-8',
    duration: '3:30',
    views: '1.2K views',
    description: 'Machinery in action live demonstration by Jupiter Industries.',
    pdfObjNum: 112,
    imageFilename: 'video_7_paver_block_machine.jpeg'
  },
  {
    index: 8,
    title: 'Patching Plant & Fly Ash Brick Making Machine | Jupiter Engineering - Coimbatore',
    category: 'Block Machines',
    videoUrl: 'https://www.youtube.com/watch?v=cfh-jhVVBrc',
    duration: '3:30',
    views: '1.2K views',
    description: 'Machinery in action live demonstration by Jupiter Industries.',
    pdfObjNum: 113,
    imageFilename: 'video_8_batching_plant_flyash.jpeg'
  },
  {
    index: 9,
    title: 'Paver Block Making Machine Manufacturers in India | Jupiter Engineering | #paverblockmachine',
    category: 'Paver Machines',
    videoUrl: 'https://www.youtube.com/watch?v=sp57nf9esAA',
    duration: '3:30',
    views: '1.2K views',
    description: 'Machinery in action live demonstration by Jupiter Industries.',
    pdfObjNum: 114,
    imageFilename: 'video_9_paver_block_machine_2.jpeg'
  },
  {
    index: 10,
    title: 'Concrete Mixer-1000kg - Jupiter Engineering, Coimbatore Fly Ash Mixer, Concrete Mixer',
    category: 'Block Machines',
    videoUrl: 'https://www.youtube.com/watch?v=EbqdPwalkSg',
    duration: '3:30',
    views: '1.2K views',
    description: 'Machinery in action live demonstration by Jupiter Industries.',
    pdfObjNum: 115,
    imageFilename: 'video_10_concrete_mixer_1000kg.jpeg'
  }
];

// ─────────────────────────────────────────────────────────────
// 3. ENQUIRIES DEFINITION (Exact from PDF Pages 1–4)
// ─────────────────────────────────────────────────────────────

interface EnquiryDefinition {
  id: string;
  enquiryId: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  machine: string;
  status: string;
  message: string;
  receivedDate: Date;
}

const PDF_ENQUIRIES: EnquiryDefinition[] = [
  {
    id: 'cmvi4480y0006kw3qq1nqntx9',
    enquiryId: 'ENQ-2026-0012',
    name: 'ram',
    phone: '+91 8825972129',
    email: 'ram@gmail.com',
    city: 'Pan India',
    machine: 'Concrete Batching Plants',
    status: 'New',
    message: 'Company: xyz | Product Interest: Concrete Batching Plants | Details: capacity',
    receivedDate: new Date('2026-10-21T00:00:00.000Z')
  },
  {
    id: 'cmv6nlkch002mkwdizutw0t0n',
    enquiryId: 'ENQ-2026-0009',
    name: 'suresh',
    phone: '+91 8825972129',
    email: 'suresh@gmail.com',
    city: 'Pan India',
    machine: 'automative',
    status: 'Contacted',
    message: 'Machinery Requirement: automative',
    receivedDate: new Date('2026-10-13T12:24:56.898Z')
  }
];

// Helper to convert YouTube watch link to embed URL
function toEmbedUrl(watchUrl: string): string {
  const match = watchUrl.match(/v=([a-zA-Z0-9_-]+)/);
  if (match) {
    return `https://www.youtube.com/embed/${match[1]}?autoplay=1`;
  }
  return watchUrl;
}

// Generate a clean slug
function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/–/g, '-')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// ─────────────────────────────────────────────────────────────
// MAIN IMPORT EXECUTION
// ─────────────────────────────────────────────────────────────

async function runImport() {
  console.log('========================================================');
  console.log('JUPITER INDUSTRIES COMPLETE PDF DATA IMPORT');
  console.log(`Source PDF: ${pdfPath}`);
  console.log('========================================================\n');

  // Stats counters
  const productStats = { processed: 0, inserted: 0, updated: 0, unchanged: 0, failed: 0 };
  const videoStats = { processed: 0, inserted: 0, updated: 0, unchanged: 0, failed: 0 };
  const enquiryStats = { processed: 0, inserted: 0, updated: 0, unchanged: 0, failed: 0 };
  let productImagesStored = 0;
  let videoThumbnailsStored = 0;

  // 1. IMPORT PRODUCTS
  console.log('--- 1. IMPORTING 15 PRODUCTS ---');
  for (const item of PDF_PRODUCTS) {
    productStats.processed++;
    try {
      const slug = toSlug(item.name);
      const imgBuffer = extractPdfImage(item.pdfObjNum);
      const publicImageUrl = `/uploads/products/${item.imageFilename}`;

      // Write physical file to uploads/products for direct serving
      const diskPath = path.join(productsUploadsDir, item.imageFilename);
      fs.writeFileSync(diskPath, imgBuffer);

      // Check if product exists in DB
      // Look by slug, exact name, or known legacy default IDs
      const existing = await prisma.product.findFirst({
        where: {
          OR: [
            { slug },
            { name: { equals: item.name, mode: 'insensitive' } },
            // Check known default IDs from defaultCatalog
            ...(item.index === 1 ? [{ id: 'cmus8mqtn000bkwtfhsvexaxi' }] : []),
            ...(item.index === 4 ? [{ id: 'cmuwvagh20002kwuylnv0but0' }] : []),
            ...(item.index === 5 ? [{ id: 'prod-spares-mould-12' }] : []),
            ...(item.index === 7 ? [{ id: 'prod-silo-cement-11' }] : []),
            ...(item.index === 8 ? [{ id: 'prod-fa-auto-01' }] : []),
            ...(item.index === 10 ? [{ id: 'prod-fa-semi-02' }] : []),
            ...(item.index === 13 ? [{ id: 'prod-fa-rot4-04' }] : []),
            ...(item.index === 15 ? [{ id: 'prod-fa-rot6-05' }] : [])
          ]
        },
        include: { media: true, images: true }
      });

      // Construct rich specifications JSON
      const specificationsData: Record<string, any> = {
        brandTag: item.brandTag,
        capacity: item.capacity,
        capacityLabel: 'Production Capacity',
        power: item.power,
        powerLabel: 'Total Connected Power',
        brickSize: item.brickSize,
        brickSizeLabel: 'Brick / Mold Size',
        status: item.status,
        order: item.order,
        featureBadges: item.featureBadges,
        keyFeatures: item.keyFeatures,
        specTableColumns: ['Parameter', 'Details', 'Specification'],
        specTableRows: item.specTableRows,
        highlights: item.keyFeatures.map(kf => ({
          title: kf.split('.')[0] || 'Key Feature',
          description: kf
        })),
        advantages: [
          {
            title: 'High Commercial Efficiency',
            description: `Engineered by Jupiter Industries for reliable production delivering ${item.capacity}.`
          },
          {
            title: 'Industrial Heavy Duty Build',
            description: `Constructed with premium hardened components and powered by a ${item.power} drive system.`
          }
        ],
        galleryImages: [publicImageUrl]
      };

      let productId: string;

      if (existing) {
        // Update product in database transaction
        await prisma.$transaction(async (tx) => {
          const updated = await tx.product.update({
            where: { id: existing.id },
            data: {
              name: item.name,
              slug,
              category: item.category,
              description: item.description,
              capacity: item.capacity,
              power: item.power,
              brickSize: item.brickSize,
              image: publicImageUrl,
              isActive: item.status === 'Active',
              order: item.order,
              specifications: specificationsData
            }
          });
          productId = updated.id;

          // Update primary ProductImage record
          await tx.productImage.deleteMany({ where: { productId: existing.id } });
          await tx.productImage.create({
            data: {
              productId: existing.id,
              url: publicImageUrl,
              isPrimary: true,
              order: 0,
              isActive: true
            }
          });

          // Delete prior media records for this product to prevent duplicate blobs
          await tx.media.deleteMany({ where: { productId: existing.id } });

          // Store actual binary image data directly in PostgreSQL BYTEA
          await tx.media.create({
            data: {
              filename: item.imageFilename,
              mimeType: 'image/jpeg',
              size: imgBuffer.length,
              data: imgBuffer as any,
              url: publicImageUrl,
              productId: existing.id
            }
          });
        });

        productStats.updated++;
        productImagesStored++;
        console.log(`[UPDATE] Product #${item.index}: ${item.name} (ID: ${existing.id}) -> Image stored (${imgBuffer.length} B)`);
      } else {
        // Insert new product in database transaction
        await prisma.$transaction(async (tx) => {
          const created = await tx.product.create({
            data: {
              name: item.name,
              slug,
              category: item.category,
              description: item.description,
              capacity: item.capacity,
              power: item.power,
              brickSize: item.brickSize,
              image: publicImageUrl,
              isActive: item.status === 'Active',
              order: item.order,
              specifications: specificationsData,
              images: {
                create: [
                  {
                    url: publicImageUrl,
                    isPrimary: true,
                    order: 0,
                    isActive: true
                  }
                ]
              }
            }
          });
          productId = created.id;

          // Store actual binary image data directly in PostgreSQL BYTEA
          await tx.media.create({
            data: {
              filename: item.imageFilename,
              mimeType: 'image/jpeg',
              size: imgBuffer.length,
              data: imgBuffer as any,
              url: publicImageUrl,
              productId: created.id
            }
          });
        });

        productStats.inserted++;
        productImagesStored++;
        console.log(`[INSERT] Product #${item.index}: ${item.name} -> Image stored (${imgBuffer.length} B)`);
      }
    } catch (err: any) {
      productStats.failed++;
      console.error(`[ERROR] Product #${item.index} ${item.name} failed:`, err.message);
    }
  }

  // 2. IMPORT VIDEOS
  console.log('\n--- 2. IMPORTING 10 VIDEOS ---');
  for (const v of PDF_VIDEOS) {
    videoStats.processed++;
    try {
      const imgBuffer = extractPdfImage(v.pdfObjNum);
      const publicImageUrl = `/uploads/videos/${v.imageFilename}`;

      // Write physical file to uploads/videos for direct serving
      const diskPath = path.join(videosUploadsDir, v.imageFilename);
      fs.writeFileSync(diskPath, imgBuffer);

      // Check if video exists in DB strictly by unique videoUrl
      const existing = await prisma.video.findFirst({
        where: {
          videoUrl: v.videoUrl
        }
      });

      const embedUrl = toEmbedUrl(v.videoUrl);

      if (existing) {
        await prisma.$transaction(async (tx) => {
          await tx.video.update({
            where: { id: existing.id },
            data: {
              title: v.title,
              category: v.category,
              videoUrl: v.videoUrl,
              embedUrl,
              duration: v.duration,
              views: v.views,
              description: v.description,
              image: publicImageUrl
            }
          });

          await tx.media.deleteMany({ where: { videoId: existing.id } });
          await tx.media.create({
            data: {
              filename: v.imageFilename,
              mimeType: 'image/jpeg',
              size: imgBuffer.length,
              data: imgBuffer as any,
              url: publicImageUrl,
              videoId: existing.id
            }
          });
        });

        videoStats.updated++;
        videoThumbnailsStored++;
        console.log(`[UPDATE] Video #${v.index}: ${v.title} -> Thumbnail stored (${imgBuffer.length} B)`);
      } else {
        await prisma.$transaction(async (tx) => {
          const created = await tx.video.create({
            data: {
              title: v.title,
              category: v.category,
              videoUrl: v.videoUrl,
              embedUrl,
              duration: v.duration,
              views: v.views,
              description: v.description,
              image: publicImageUrl
            }
          });

          await tx.media.create({
            data: {
              filename: v.imageFilename,
              mimeType: 'image/jpeg',
              size: imgBuffer.length,
              data: imgBuffer as any,
              url: publicImageUrl,
              videoId: created.id
            }
          });
        });

        videoStats.inserted++;
        videoThumbnailsStored++;
        console.log(`[INSERT] Video #${v.index}: ${v.title} -> Thumbnail stored (${imgBuffer.length} B)`);
      }
    } catch (err: any) {
      videoStats.failed++;
      console.error(`[ERROR] Video #${v.index} ${v.title} failed:`, err.message);
    }
  }

  // 3. IMPORT ENQUIRIES
  console.log('\n--- 3. IMPORTING CUSTOMER ENQUIRIES ---');
  for (const enq of PDF_ENQUIRIES) {
    enquiryStats.processed++;
    try {
      const existing = await prisma.enquiry.findFirst({
        where: {
          OR: [
            { id: enq.id },
            { enquiryId: enq.enquiryId },
            ...(enq.enquiryId === 'ENQ-2026-0009' ? [{ enquiryId: 'ENQ-0009' }, { enquiryId: 'ENQ-2026-0005' }] : [])
          ]
        }
      });

      if (existing) {
        await prisma.enquiry.update({
          where: { id: existing.id },
          data: {
            enquiryId: enq.enquiryId,
            name: enq.name,
            phone: enq.phone,
            email: enq.email,
            location: enq.city,
            machine: enq.machine,
            status: enq.status,
            message: enq.message,
            createdAt: enq.receivedDate
          }
        });
        enquiryStats.updated++;
        console.log(`[UPDATE] Enquiry ${enq.enquiryId} (ID: ${existing.id}) updated to status: ${enq.status}`);
      } else {
        await prisma.enquiry.create({
          data: {
            id: enq.id,
            enquiryId: enq.enquiryId,
            name: enq.name,
            phone: enq.phone,
            email: enq.email,
            location: enq.city,
            machine: enq.machine,
            status: enq.status,
            message: enq.message,
            createdAt: enq.receivedDate,
            isRead: false
          }
        });
        enquiryStats.inserted++;
        console.log(`[INSERT] Enquiry ${enq.enquiryId} (ID: ${enq.id}) inserted with status: ${enq.status}`);
      }
    } catch (err: any) {
      enquiryStats.failed++;
      console.error(`[ERROR] Enquiry ${enq.enquiryId} failed:`, err.message);
    }
  }

  // Synchronize enquiry counter
  const counter = await prisma.enquiryCounter.upsert({
    where: { id: 'enquiry_counter' },
    update: { lastSeq: 12 },
    create: { id: 'enquiry_counter', lastSeq: 12 }
  });
  console.log(`Enquiry counter synchronized to lastSeq = ${counter.lastSeq}`);

  // 4. VERIFICATION READ-BACK FROM POSTGRESQL
  console.log('\n--- 4. POSTGRESQL VERIFICATION READ-BACK ---');
  const dbProducts = await prisma.product.findMany({
    select: { id: true, name: true, category: true, order: true, isActive: true, image: true },
    orderBy: { order: 'asc' }
  });
  const dbVideos = await prisma.video.findMany({
    select: { id: true, title: true, category: true, videoUrl: true, image: true }
  });
  const dbEnquiries = await prisma.enquiry.findMany({
    select: { id: true, enquiryId: true, name: true, status: true, message: true, location: true, machine: true, createdAt: true }
  });
  const dbMedia = await prisma.media.findMany({
    select: { id: true, filename: true, mimeType: true, size: true, productId: true, videoId: true }
  });

  console.log(`\nFinal PostgreSQL Counts:`);
  console.log(`- Products in Database: ${dbProducts.length}`);
  console.log(`- Videos in Database: ${dbVideos.length}`);
  console.log(`- Enquiries in Database: ${dbEnquiries.length}`);
  console.log(`- Media (BYTEA) records in Database: ${dbMedia.length}`);

  console.log('\n--- PDF 15 Products Status in DB ---');
  PDF_PRODUCTS.forEach(p => {
    const found = dbProducts.find(dp => dp.name.toLowerCase().trim() === p.name.toLowerCase().trim());
    if (found) {
      console.log(`✔ #${p.index} [Order ${found.order}] [${found.isActive ? 'Active' : 'Inactive'}] ${found.name} (Image: ${found.image})`);
    } else {
      console.log(`❌ #${p.index} NOT FOUND: ${p.name}`);
    }
  });

  console.log('\n--- PDF 2 Enquiries in DB ---');
  PDF_ENQUIRIES.forEach(e => {
    const found = dbEnquiries.find(de => de.enquiryId === e.enquiryId);
    if (found) {
      console.log(`✔ [${found.enquiryId}] [${found.status}] ${found.name} | City: ${found.location} | Machine: ${found.machine} | Date: ${found.createdAt.toISOString()}`);
    } else {
      console.log(`❌ NOT FOUND: ${e.enquiryId}`);
    }
  });

  console.log('\n--- PDF 10 Videos in DB ---');
  PDF_VIDEOS.forEach(v => {
    const found = dbVideos.find(dv => dv.videoUrl === v.videoUrl);
    if (found) {
      console.log(`✔ [${v.index}] ${found.title.slice(0, 50)}... | Thumbnail: ${found.image}`);
    } else {
      console.log(`❌ NOT FOUND: ${v.title}`);
    }
  });

  console.log('\n========================================================');
  console.log('IMPORT COMPLETED SUCCESSFULLY');
  console.log(`Product Stats: ${JSON.stringify(productStats)}`);
  console.log(`Video Stats: ${JSON.stringify(videoStats)}`);
  console.log(`Enquiry Stats: ${JSON.stringify(enquiryStats)}`);
  console.log(`Product Images in PostgreSQL: ${productImagesStored}`);
  console.log(`Video Thumbnails in PostgreSQL: ${videoThumbnailsStored}`);
  console.log('========================================================');

  await prisma.$disconnect();
}

runImport().catch(err => {
  console.error('Fatal import error:', err);
  prisma.$disconnect();
  process.exit(1);
});

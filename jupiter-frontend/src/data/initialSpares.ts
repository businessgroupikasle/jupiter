import { ProductItem } from '../services/productService';
import { getSpareImage } from '../assets/images/spares';

export const INITIAL_SPARES_PRODUCTS: ProductItem[] = [
  {
    id: 'SPARE-01',
    name: '10 Brick Mold & Ram',
    brandTag: 'GENUINE MOULD TOOLING',
    category: 'Machine Spares',
    categorySlug: 'machine-spares',
    capacity: '10 Bricks / Cycle',
    power: 'Hydraulic Compaction Fit',
    brickSize: '230 x 110 x 75 mm',
    image: getSpareImage('10 Brick Mold & Ram'),
    status: 'Active',
    description: 'Precision CNC machined alloy steel 10-cavity brick mold and tamper ram head, engineered with heat-treated Hardox wear plates for maximum production lifespan.',
    featureBadges: ['CNC Precision Tooling', 'Hardox Wear Plates', 'Uniform Density Output', 'Direct Factory Replacement'],
    specTableColumns: ['Feature', 'Specification'],
    specTableRows: [
      { 'Feature': 'Cavity Count', 'Specification': '10 Bricks per Cycle' },
      { 'Feature': 'Material Grade', 'Specification': 'WPS / Hardox High Carbon Alloy Steel' },
      { 'Feature': 'Hardness Rating', 'Specification': '58 – 62 HRC Heat Treated' },
      { 'Feature': 'Compatibility', 'Specification': 'Automatic Fly Ash Brick Plant Models' }
    ]
  },
  {
    id: 'SPARE-02',
    name: '15 Brick Mold & Ram',
    brandTag: 'HIGH CAPACITY MOULD',
    category: 'Machine Spares',
    categorySlug: 'machine-spares',
    capacity: '15 Bricks / Cycle',
    power: 'High-Tonnage Hydraulic Fit',
    brickSize: '230 x 110 x 75 mm',
    image: getSpareImage('15 Brick Mold & Ram'),
    status: 'Active',
    description: 'High-production 15-cavity mold box and synchronized ram punch engineered for heavy duty automatic brick making lines producing 25,000+ bricks per day.',
    featureBadges: ['High Volume Output', 'Reinforced Outer Wall', 'Laser-Cut Dimensional Accuracy', 'Long Cycle Life'],
    specTableColumns: ['Feature', 'Specification'],
    specTableRows: [
      { 'Feature': 'Cavity Output', 'Specification': '15 Cavities Simultaneous Press' },
      { 'Feature': 'Die Steel', 'Specification': 'Forged Tool Steel with Vacuum Quenching' },
      { 'Feature': 'Operational Life', 'Specification': 'Over 250,000 Production Cycles' },
      { 'Feature': 'Warranty', 'Specification': 'Jupiter Factory OEM Warranty' }
    ]
  },
  {
    id: 'SPARE-03',
    name: '2 Brick Mold & Ram',
    brandTag: 'COMPACT MOULD TOOLING',
    category: 'Machine Spares',
    categorySlug: 'machine-spares',
    capacity: '2 Bricks / Cycle',
    power: 'Mechanical / Hydraulic Fit',
    brickSize: '230 x 110 x 75 mm',
    image: getSpareImage('2 Brick Mold & Ram'),
    status: 'Active',
    description: 'Durable 2-brick mold tooling designed for small-scale manual and semi-automatic hydraulic brick presses with quick-release mounting bolts.',
    featureBadges: ['Compact & Portable', 'Quick Changeover', 'Smooth Surface Finish', 'Cost-Effective Tooling'],
    specTableColumns: ['Feature', 'Specification'],
    specTableRows: [
      { 'Feature': 'Mould Capacity', 'Specification': '2 Standard Bricks' },
      { 'Feature': 'Steel Type', 'Specification': 'Abrasion Resistant High-Strength Steel' },
      { 'Feature': 'Machining', 'Specification': 'Surface Ground & CNC Milled' }
    ]
  },
  {
    id: 'SPARE-04',
    name: '4 Brick Mold & Ram',
    brandTag: 'ROTARY PRESS TOOLING',
    category: 'Machine Spares',
    categorySlug: 'machine-spares',
    capacity: '4 Bricks / Cycle',
    power: '80-Ton Rotary Fit',
    brickSize: '230 x 110 x 75 to 230 x 200 x 100 mm',
    image: getSpareImage('4 Brick Mold & Ram'),
    status: 'Active',
    description: 'Custom manufactured 4-brick mold and top ram assembly designed specifically for Jupiter JE-50 80 Ton Rotary Press machines with precision guide pins.',
    featureBadges: ['Rotary Machine Precision', 'Interchangeable Die Inserts', 'Minimal Clearance Gap', 'Smooth Ejection'],
    specTableColumns: ['Feature', 'Specification'],
    specTableRows: [
      { 'Feature': 'Machine Model', 'Specification': 'JE-50 80 Ton Rotary Press' },
      { 'Feature': 'Brick Cavities', 'Specification': '4 Cavity Table Set' },
      { 'Feature': 'Hardness', 'Specification': '60 HRC Case Hardened' }
    ]
  },
  {
    id: 'SPARE-05',
    name: '8 Brick Mold & Ram',
    brandTag: 'STANDARD BRICK TOOLING',
    category: 'Machine Spares',
    categorySlug: 'machine-spares',
    capacity: '8 Bricks / Cycle',
    power: '100-Ton Hydraulic Fit',
    brickSize: '230 x 110 x 75 mm',
    image: getSpareImage('8 Brick Mold & Ram'),
    status: 'Active',
    description: 'Heavy duty 8-brick mold tooling providing sharp corners, accurate edges, and uniform compression for industrial fly ash brick plants.',
    featureBadges: ['Sharp Edge Molding', 'Heavy Duty Base Flange', 'Wear Resistant Core Pins', 'OEM Factory Guaranteed'],
    specTableColumns: ['Feature', 'Specification'],
    specTableRows: [
      { 'Feature': 'Capacity', 'Specification': '8 Bricks / Cycle (10,000-14,000/day)' },
      { 'Feature': 'Plate Thickness', 'Specification': '20 mm Hardox Bottom & Wall Liners' },
      { 'Feature': 'Surface Finish', 'Specification': 'Fine Mirror Ground Inside Die' }
    ]
  },
  {
    id: 'SPARE-06',
    name: 'Solid Block Mold',
    brandTag: 'CONCRETE BLOCK TOOLING',
    category: 'Machine Spares',
    categorySlug: 'machine-spares',
    capacity: '4 - 8 Blocks / Cycle',
    power: 'Vibration & Press Fit',
    brickSize: '400 x 200 x 200 / 150 / 100 mm',
    image: getSpareImage('Solid Block Mold'),
    status: 'Active',
    description: 'Precision engineered concrete masonry solid and hollow block mold box with heat-treated divider blades and high-amplitude vibration dampening rubbers.',
    featureBadges: ['Hollow & Solid Options', 'Modular Divider Blades', 'Heavy Vibration Tolerance', 'Superior Compaction'],
    specTableColumns: ['Feature', 'Specification'],
    specTableRows: [
      { 'Feature': 'Block Sizes', 'Specification': '400x200x200 mm (8 Inch), 400x200x150 mm (6 Inch), 400x200x100 mm (4 Inch)' },
      { 'Feature': 'Steel Grade', 'Specification': 'Carburized Alloy Steel (1.5mm case depth)' }
    ]
  },
  {
    id: 'SPARE-07',
    name: 'Mold Accessories',
    brandTag: 'MOULD HARDWARE',
    category: 'Machine Spares',
    categorySlug: 'machine-spares',
    capacity: 'Universal Mounting',
    power: 'N/A',
    image: getSpareImage('Mold Accessories'),
    status: 'Active',
    description: 'High-tensile mold fastening bolts, vibration isolator rubber dampers, core puller brackets, and alignment guide bushes for all Jupiter brick & block molds.',
    featureBadges: ['Grade 10.9 Fasteners', 'Heavy Vibration Dampers', 'Anti-Corrosion Plating', 'Universal Fit'],
    specTableColumns: ['Feature', 'Specification'],
    specTableRows: [
      { 'Feature': 'Components', 'Specification': 'Locking Bolts, Polyurethane Dampers, Guide Rods' },
      { 'Feature': 'Application', 'Specification': 'All Mold Types (Fly Ash, Paver & Block)' }
    ]
  },
  {
    id: 'SPARE-08',
    name: 'Ware Plate',
    brandTag: 'HARDOX WEAR LINER',
    category: 'Machine Spares',
    categorySlug: 'machine-spares',
    capacity: 'Custom Sized Sets',
    power: 'N/A',
    image: getSpareImage('Ware Plate'),
    status: 'Active',
    description: 'Replaceable Hardox 450/500 wear plates for pan mixers, feeder bins, and mold boxes, protecting primary machinery bodies from abrasive aggregate abrasion.',
    featureBadges: ['Hardox 500 Alloy', 'Countersunk Mounting', 'Extended Plant Life', 'Zero Frame Abrasion'],
    specTableColumns: ['Feature', 'Specification'],
    specTableRows: [
      { 'Feature': 'Material', 'Specification': 'Hardox 450 / 500 Swedish Steel' },
      { 'Feature': 'Thickness', 'Specification': '10 mm, 12 mm, 16 mm Available' }
    ]
  },
  {
    id: 'SPARE-09',
    name: 'Hydraulic Power Pack',
    brandTag: 'CENTRAL HYDRAULIC UNIT',
    category: 'Machine Spares',
    categorySlug: 'machine-spares',
    capacity: '150 – 500 Ltrs Tank',
    power: '10 – 30 H.P Drive',
    image: getSpareImage('Hydraulic Power Pack'),
    status: 'Active',
    description: 'Industrial high-pressure hydraulic power unit equipped with proportional directional valves, pressure relief manifolds, oil filtration, and temperature monitoring.',
    featureBadges: ['Proportional Pressure Control', 'Heavy Gauge Steel Tank', 'Low Operating Noise', 'Energy Efficient Drive'],
    specTableColumns: ['Feature', 'Specification'],
    specTableRows: [
      { 'Feature': 'Working Pressure', 'Specification': '160 – 250 Bar' },
      { 'Feature': 'Tank Volume', 'Specification': '200 Ltrs / 350 Ltrs / 500 Ltrs' },
      { 'Feature': 'Motor Rating', 'Specification': '15 HP / 20 HP / 25 HP / 30 HP' }
    ]
  },
  {
    id: 'SPARE-10',
    name: 'Hydraulic Pump and Motor',
    brandTag: 'PUMP-MOTOR COUPLE',
    category: 'Machine Spares',
    categorySlug: 'machine-spares',
    capacity: '40 – 120 LPM Flow',
    power: '15 – 25 H.P',
    image: getSpareImage('Hydraulic Pump and Motor'),
    status: 'Active',
    description: 'Vane and axial piston hydraulic pump coupled with high-efficiency foot-mounted electric motor delivering constant flow at high working pressures.',
    featureBadges: ['High Volumetric Efficiency', 'Low Pulsation Output', 'Flexible Bellhousing Coupling', 'Continuous Duty Rated'],
    specTableColumns: ['Feature', 'Specification'],
    specTableRows: [
      { 'Feature': 'Pump Type', 'Specification': 'Variable Displacement Vane / Piston Pump' },
      { 'Feature': 'Max Operating RPM', 'Specification': '1440 RPM Synchronous' }
    ]
  },
  {
    id: 'SPARE-11',
    name: 'Pressing Cylinder',
    brandTag: 'MAIN COMPACTION CYLINDER',
    category: 'Machine Spares',
    categorySlug: 'machine-spares',
    capacity: '60 – 120 Ton Force',
    power: '210 Bar Max',
    image: getSpareImage('Pressing Cylinder'),
    status: 'Active',
    description: 'High-tonnage double-acting hydraulic pressing cylinder with micro-honed steel barrel and hard-chrome plated piston rod for dense masonry compaction.',
    featureBadges: ['Seamless Honed Tube', 'Hard Chrome Plated Rod', 'Parker / Hallite Multi-Lip Seals', 'Heavy Tonnage Compaction'],
    specTableColumns: ['Feature', 'Specification'],
    specTableRows: [
      { 'Feature': 'Bore Diameter', 'Specification': '150 mm – 220 mm' },
      { 'Feature': 'Stroke Length', 'Specification': '350 mm – 500 mm' },
      { 'Feature': 'Seal Kit', 'Specification': 'High-Pressure Polyurethane & PTFE Seals' }
    ]
  },
  {
    id: 'SPARE-12',
    name: 'Ejection Cylinder',
    brandTag: 'DEMOLDING CYLINDER',
    category: 'Machine Spares',
    categorySlug: 'machine-spares',
    capacity: '15 – 30 Ton Ejection',
    power: '160 Bar',
    image: getSpareImage('Ejection Cylinder'),
    status: 'Active',
    description: 'Smooth and synchronized hydraulic ejection cylinder providing fast, vibration-free brick and block demolding onto transfer pallets without edge damage.',
    featureBadges: ['Precision Stroke Control', 'End-Position Cushioning', 'Zero Brick Cracking', 'Fast Cycle Times'],
    specTableColumns: ['Feature', 'Specification'],
    specTableRows: [
      { 'Feature': 'Stroke', 'Specification': '200 mm – 300 mm Precision Regulated' },
      { 'Feature': 'Cushioning', 'Specification': 'Adjustable Hydraulic End Dampers' }
    ]
  },
  {
    id: 'SPARE-13',
    name: 'Pneumatic Cylinder',
    brandTag: 'FEEDER CONTROL CYLINDER',
    category: 'Machine Spares',
    categorySlug: 'machine-spares',
    capacity: '6 – 10 Bar Pneumatic',
    power: 'Compressed Air Operated',
    image: getSpareImage('Pneumatic Cylinder'),
    status: 'Active',
    description: 'Heavy duty pneumatic actuator cylinder used for material feeding drawer stroke, pallet indexing, and automated product transfer gates.',
    featureBadges: ['Anodized Aluminum Body', 'Magnetic Piston for Sensors', 'Fast Linear Response', 'Maintenance Free'],
    specTableColumns: ['Feature', 'Specification'],
    specTableRows: [
      { 'Feature': 'Air Pressure', 'Specification': '0.5 – 0.8 MPa (5 – 8 Bar)' },
      { 'Feature': 'Standard Bore', 'Specification': '63 mm / 80 mm / 100 mm' }
    ]
  },
  {
    id: 'SPARE-14',
    name: 'Hydraulic Manifold B Lock',
    brandTag: 'VALVE MANIFOLD BLOCK',
    category: 'Machine Spares',
    categorySlug: 'machine-spares',
    capacity: 'Multi-Station Block',
    power: 'Up to 315 Bar',
    image: getSpareImage('Hydraulic Manifold B Lock'),
    status: 'Active',
    description: 'CNC drilled ductile iron hydraulic manifold block consolidating directional, flow, and relief valves into a compact, leak-free central control station.',
    featureBadges: ['Leak-Free O-Ring Sealing', 'CNC Cross-Drilled Passages', 'Low Pressure Drop', 'Compact Footprint'],
    specTableColumns: ['Feature', 'Specification'],
    specTableRows: [
      { 'Feature': 'Stations', 'Specification': '3-Station, 4-Station & 5-Station Blocks' },
      { 'Feature': 'Valve Pattern', 'Specification': 'CETOP 03 (NG6) / CETOP 05 (NG10)' }
    ]
  },
  {
    id: 'SPARE-15',
    name: 'Hydraulic Hose Fittings',
    brandTag: 'PRESSURE HOSES & JOINTS',
    category: 'Machine Spares',
    categorySlug: 'machine-spares',
    capacity: '4-Wire Spiral Braided',
    power: 'Up to 350 Bar',
    image: getSpareImage('Hydraulic Hose Fittings'),
    status: 'Active',
    description: 'High-pressure rubber hydraulic hose assemblies with crimped BSP/JIC swivel female fittings and heavy steel ferrules for leak-proof power transmission.',
    featureBadges: ['Four-Wire Spiral Braid', 'Burst Pressure Exceeds 1000 Bar', 'Oil & Ozone Resistant Outer', 'Precision Swaged Fittings'],
    specTableColumns: ['Feature', 'Specification'],
    specTableRows: [
      { 'Feature': 'Hose Sizes', 'Specification': '1/4", 3/8", 1/2", 3/4", 1" Internal Diameter' },
      { 'Feature': 'Standard', 'Specification': 'SAE 100 R2 / DIN EN 853 2SN' }
    ]
  },
  {
    id: 'SPARE-16',
    name: 'Valves',
    brandTag: 'DIRECTIONAL & FLOW VALVES',
    category: 'Machine Spares',
    categorySlug: 'machine-spares',
    capacity: 'Yukon / Rexroth Type',
    power: '24V DC / 220V AC Solenoid',
    image: getSpareImage('Valves'),
    status: 'Active',
    description: 'Solenoid operated directional control valves, pilot operated check valves, and relief valves providing smooth, responsive cylinder actuation in brick plants.',
    featureBadges: ['Fast Solenoid Switching', 'Subplate Mounted (NG6 / NG10)', 'Manual Override Pin', 'Long Spool Life'],
    specTableColumns: ['Feature', 'Specification'],
    specTableRows: [
      { 'Feature': 'Voltage', 'Specification': '24V DC / 110V AC / 220V AC' },
      { 'Feature': 'Spool Functions', 'Specification': 'Spring Centered, All Ports Blocked / Open Tandem' }
    ]
  },
  {
    id: 'SPARE-17',
    name: 'Power Pack Accessories',
    brandTag: 'TANK ACCESSORIES',
    category: 'Machine Spares',
    categorySlug: 'machine-spares',
    capacity: 'Universal Hydraulic',
    power: 'N/A',
    image: getSpareImage('Power Pack Accessories'),
    status: 'Active',
    description: 'Complete power pack accessories set including air breather filler caps, visual oil level indicators with temperature gauges, suction strainers, and pressure gauges.',
    featureBadges: ['Air Breather Filtration', 'Visual Level & Temp Scale', 'Glycerin Filled Pressure Gauge', 'Easy Maintenance'],
    specTableColumns: ['Feature', 'Specification'],
    specTableRows: [
      { 'Feature': 'Gauge Range', 'Specification': '0 – 250 Bar Glycerin Damped' },
      { 'Feature': 'Breather Micron', 'Specification': '10 Micron Filtration Rating' }
    ]
  },
  {
    id: 'SPARE-18',
    name: 'Oil Tank',
    brandTag: 'STEEL HYDRAULIC RESERVOIR',
    category: 'Machine Spares',
    categorySlug: 'machine-spares',
    capacity: '150 – 500 Ltrs',
    power: 'N/A',
    image: getSpareImage('Oil Tank'),
    status: 'Active',
    description: 'Heavy structural steel hydraulic oil tank with internal de-aeration baffles, removable inspection cover, bottom drain plug, and anti-rust epoxy internal coating.',
    featureBadges: ['Internal Baffle Plates', 'Epoxy Coated Interior', 'Removable Clean-Out Door', 'Leak Tested at Factory'],
    specTableColumns: ['Feature', 'Specification'],
    specTableRows: [
      { 'Feature': 'Capacities', 'Specification': '150L, 250L, 350L, 500L Heavy Duty Tanks' },
      { 'Feature': 'Sheet Thickness', 'Specification': '3.5 mm – 4.5 mm Cold Rolled Steel' }
    ]
  },
  {
    id: 'SPARE-19',
    name: 'Oil Cooler',
    brandTag: 'HYDRAULIC HEAT EXCHANGER',
    category: 'Machine Spares',
    categorySlug: 'machine-spares',
    capacity: 'High-Efficiency Cooling',
    power: 'Electric Fan 220V/415V',
    image: getSpareImage('Oil Cooler'),
    status: 'Active',
    description: 'Air-cooled and water-cooled hydraulic oil radiators with motorized high-speed fan preventing thermal degradation of oil during continuous 24-hour plant operations.',
    featureBadges: ['Prevents Oil Overheating', 'Aluminum Brazed Core', 'Thermal Switch Auto-Control', 'Extended Oil Life'],
    specTableColumns: ['Feature', 'Specification'],
    specTableRows: [
      { 'Feature': 'Cooling Flow Rate', 'Specification': '30 – 150 LPM' },
      { 'Feature': 'Maximum Working Temp', 'Specification': '120 °C Continuous' }
    ]
  },
  {
    id: 'SPARE-20',
    name: 'Oil and Oil Filter',
    brandTag: 'FILTRATION & LUBRICANTS',
    category: 'Machine Spares',
    categorySlug: 'machine-spares',
    capacity: 'ISO VG 68 Oil / 10-25µ Filters',
    power: 'N/A',
    image: getSpareImage('Oil and Oil Filter'),
    status: 'Active',
    description: 'High-grade anti-wear hydraulic oil (ISO VG 68) alongside spin-on return line filters and suction basket strainers maintaining high fluid cleanliness standards.',
    featureBadges: ['Anti-Wear Formulation', 'Spin-On Filter Cartridge', 'Visual Clog Indicator Port', 'Protects Pumps & Valves'],
    specTableColumns: ['Feature', 'Specification'],
    specTableRows: [
      { 'Feature': 'Filtration Micron', 'Specification': '10 Micron Return / 125 Micron Suction' },
      { 'Feature': 'Oil Grade', 'Specification': 'Hydraulic AW-68 High Viscosity Index' }
    ]
  },
  {
    id: 'SPARE-21',
    name: 'Motor',
    brandTag: 'HEAVY DUTY ELECTRIC DRIVE',
    category: 'Machine Spares',
    categorySlug: 'machine-spares',
    capacity: '5 HP – 30 HP',
    power: '415V 3-Phase 50Hz',
    image: getSpareImage('Motor'),
    status: 'Active',
    description: 'TEFC cast iron 3-phase induction motor engineered for continuous machinery service with Class F insulation and high starting torque.',
    featureBadges: ['IE3 Premium Efficiency', 'Cast Iron Rugged Frame', 'IP55 Dust & Water Protected', 'Copper Wound Stator'],
    specTableColumns: ['Feature', 'Specification'],
    specTableRows: [
      { 'Feature': 'Power Output', 'Specification': '5 HP, 7.5 HP, 10 HP, 15 HP, 20 HP, 25 HP, 30 HP' },
      { 'Feature': 'Speed', 'Specification': '1440 RPM (4 Pole) / 960 RPM (6 Pole)' }
    ]
  },
  {
    id: 'SPARE-22',
    name: 'Gear Box and Accessories',
    brandTag: 'SPEED REDUCER GEARBOX',
    category: 'Machine Spares',
    categorySlug: 'machine-spares',
    capacity: 'High-Torque Reduction',
    power: 'Hardened Helical Gears',
    image: getSpareImage('Gear Box and Accessories'),
    status: 'Active',
    description: 'Helical worm and bevel reduction gearboxes supplying immense starting torque for pan mixers, rotary feeding tables, and belt conveyors.',
    featureBadges: ['Alloy Steel Hardened Gears', 'Synthetic Oil Filled', 'Low Backlash Alignment', 'Vibration Absorbing Casing'],
    specTableColumns: ['Feature', 'Specification'],
    specTableRows: [
      { 'Feature': 'Gear Ratio', 'Specification': '1:10, 1:20, 1:30, 1:40 Custom Ratios' },
      { 'Feature': 'Lubrication', 'Specification': 'Splash / Forced Oil Bath' }
    ]
  },
  {
    id: 'SPARE-23',
    name: 'Bearing',
    brandTag: 'INDUSTRIAL BEARINGS',
    category: 'Machine Spares',
    categorySlug: 'machine-spares',
    capacity: 'Radial & Thrust Load',
    power: 'High-Speed Precision',
    image: getSpareImage('Bearing'),
    status: 'Active',
    description: 'Pillow block plummer blocks, spherical roller bearings, and heavy-duty deep groove ball bearings supporting shafts and vibration rotating assemblies.',
    featureBadges: ['SKF / FAG / NTN Quality Equivalent', 'Double Lip Grease Seals', 'Self-Aligning Plummer Housing', 'Heavy Dynamic Load Rating'],
    specTableColumns: ['Feature', 'Specification'],
    specTableRows: [
      { 'Feature': 'Types', 'Specification': 'UCP Plummer Blocks, 222xx Spherical Rollers' },
      { 'Feature': 'Shaft Bore', 'Specification': '25 mm – 110 mm Bores' }
    ]
  },
  {
    id: 'SPARE-24',
    name: 'Conveyor Accessories',
    brandTag: 'BELT CONVEYOR SPARES',
    category: 'Machine Spares',
    categorySlug: 'machine-spares',
    capacity: 'Universal Belt Lines',
    power: 'N/A',
    image: getSpareImage('Conveyor Accessories'),
    status: 'Active',
    description: 'Conveyor belt components including rubber scraper blades, skirt boards, belt fasteners, gravity tensioning rollers, and return idler brackets.',
    featureBadges: ['Heavy Duty Vulcanized Spares', 'Reduces Belt Tracking Drift', 'Anti-Spill Rubber Skirting', 'Easy Retrofit'],
    specTableColumns: ['Feature', 'Specification'],
    specTableRows: [
      { 'Feature': 'Compatible Belt Widths', 'Specification': '500 mm, 600 mm, 650 mm, 800 mm' },
      { 'Feature': 'Application', 'Specification': 'Raw Material & Green Block Conveyors' }
    ]
  },
  {
    id: 'SPARE-25',
    name: 'Roller',
    brandTag: 'CONVEYOR STEEL ROLLERS',
    category: 'Machine Spares',
    categorySlug: 'machine-spares',
    capacity: 'High-Capacity Carrying',
    power: 'Low Rolling Resistance',
    image: getSpareImage('Roller'),
    status: 'Active',
    description: 'Precision machined steel carrying rollers fitted with labyrinth grease seals and deep-groove ball bearings for continuous heavy aggregate movement.',
    featureBadges: ['Seamless ERW Steel Tube', 'Triple Labyrinth Dust Seals', 'Dynamically Balanced', 'Long Maintenance-Free Life'],
    specTableColumns: ['Feature', 'Specification'],
    specTableRows: [
      { 'Feature': 'Roller Diameter', 'Specification': '76 mm, 89 mm, 108 mm' },
      { 'Feature': 'Length', 'Specification': '250 mm to 950 mm Lengths' }
    ]
  },
  {
    id: 'SPARE-26',
    name: 'Small Roller',
    brandTag: 'DRAWER GUIDE ROLLER',
    category: 'Machine Spares',
    categorySlug: 'machine-spares',
    capacity: 'Precision Track Rolling',
    power: 'N/A',
    image: getSpareImage('Small Roller'),
    status: 'Active',
    description: 'Hardened steel guide rollers with double sealed bearings, facilitating low-friction reciprocating motion of the raw material feeding cart.',
    featureBadges: ['Hardened Outer Track Face', 'Heavy Load Needle Bearings', 'Smooth Drawer Reciprocation', 'Corrosion Inhibited'],
    specTableColumns: ['Feature', 'Specification'],
    specTableRows: [
      { 'Feature': 'Outer Diameter', 'Specification': '50 mm – 75 mm' },
      { 'Feature': 'Track Type', 'Specification': 'Flat Track / Flanged V-Groove' }
    ]
  },
  {
    id: 'SPARE-27',
    name: 'Taper Lock Pully',
    brandTag: 'V-BELT DRIVE PULLEY',
    category: 'Machine Spares',
    categorySlug: 'machine-spares',
    capacity: 'Multiple Groove (SPB/SPA)',
    power: 'Taper Lock Bushing',
    image: getSpareImage('Taper Lock Pully'),
    status: 'Active',
    description: 'Precision dynamically balanced cast iron V-belt pulleys with quick taper lock bush eliminating shaft keyway damage and loosening during high-torque runs.',
    featureBadges: ['Quick Taper Lock Bushing', 'Zero Keyway Fretting', 'Dynamically Balanced Cast Iron', 'High Torque Grip'],
    specTableColumns: ['Feature', 'Specification'],
    specTableRows: [
      { 'Feature': 'Grooves', 'Specification': '2-Groove, 3-Groove, 4-Groove SPB/SPC Sections' },
      { 'Feature': 'Bushing Sizes', 'Specification': '1610, 2012, 2517, 3020 Standard Bushes' }
    ]
  },
  {
    id: 'SPARE-28',
    name: 'Piniyan',
    brandTag: 'DRIVE PINION GEAR',
    category: 'Machine Spares',
    categorySlug: 'machine-spares',
    capacity: 'High-Strength Drive',
    power: 'Carburized Alloy Steel',
    image: getSpareImage('Piniyan'),
    status: 'Active',
    description: 'Case-hardened steel pinion gears machined to precise module specifications for the indexing drive of rotary table brick machines and mixer skip hoists.',
    featureBadges: ['Induction Hardened Teeth', 'CNC Hobbed Tooth Profile', 'High Shock Load Capacity', 'Exact Factory Match'],
    specTableColumns: ['Feature', 'Specification'],
    specTableRows: [
      { 'Feature': 'Module', 'Specification': 'Module 4 to Module 10' },
      { 'Feature': 'Tooth Hardness', 'Specification': '55 – 60 HRC' }
    ]
  },
  {
    id: 'SPARE-29',
    name: 'Spracket',
    brandTag: 'CHAIN DRIVE SPROCKET',
    category: 'Machine Spares',
    categorySlug: 'machine-spares',
    capacity: 'Simplex / Duplex Chain',
    power: 'Roller Chain Drive',
    image: getSpareImage('Spracket'),
    status: 'Active',
    description: 'Flame-hardened steel drive sprockets engineered for heavy duplex and triplex roller chains utilized in pallet conveyors and automatic stackers.',
    featureBadges: ['Hardened Tooth Tips', 'Heavy Hub with Keyway & Grubscrew', 'Minimizes Chain Wear', 'Smooth Engagement'],
    specTableColumns: ['Feature', 'Specification'],
    specTableRows: [
      { 'Feature': 'Chain Pitch', 'Specification': '3/4" (12B), 1" (16B), 1-1/4" (20B)' },
      { 'Feature': 'Teeth Count', 'Specification': '15T, 19T, 25T, 38T Standards' }
    ]
  },
  {
    id: 'SPARE-30',
    name: 'H Piece',
    brandTag: 'VERTICAL GUIDE BEAM',
    category: 'Machine Spares',
    categorySlug: 'machine-spares',
    capacity: 'Structural Guide Part',
    power: 'Synchronized Guide',
    image: getSpareImage('H Piece'),
    status: 'Active',
    description: 'Heavy structural steel H-piece alignment guide beam ensuring perfectly synchronized horizontal balance and vertical ascent of pressing mold heads.',
    featureBadges: ['Heavy Welded Structural Steel', 'Precision Bored Guide Collars', 'Zero Tilt or Binding', 'OEM Factory Spec'],
    specTableColumns: ['Feature', 'Specification'],
    specTableRows: [
      { 'Feature': 'Material', 'Specification': 'IS 2062 Grade Steel' },
      { 'Feature': 'Application', 'Specification': 'Hydraulic Block Machine Head Suspension' }
    ]
  },
  {
    id: 'SPARE-31',
    name: 'PAN Mixer Hand',
    brandTag: 'MIXER BLADES & ARMS',
    category: 'Machine Spares',
    categorySlug: 'machine-spares',
    capacity: 'Wear-Resistant Alloy',
    power: 'For 300 - 1000 Kg Mixers',
    image: getSpareImage('PAN Mixer Hand'),
    status: 'Active',
    description: 'High-chromium alloy cast scraper arms and side wear blades for pan mixers, delivering thorough fly ash/cement homogeneity while resisting abrasive aggregates.',
    featureBadges: ['Hi-Chrome White Iron Alloy', 'Adjustable Spring-Loaded Arm', 'Thorough Bottom Scraping', 'Double Life Span'],
    specTableColumns: ['Feature', 'Specification'],
    specTableRows: [
      { 'Feature': 'Mixer Capacity', 'Specification': '300 Kgs, 500 Kgs, 750 Kgs, 1000 Kgs Mixers' },
      { 'Feature': 'Material Hardness', 'Specification': '62 – 65 HRC' }
    ]
  },
  {
    id: 'SPARE-32',
    name: 'PAN Mixer Roller',
    brandTag: 'HEAVY MULLER ROLLER',
    category: 'Machine Spares',
    categorySlug: 'machine-spares',
    capacity: 'High-Density Kneading',
    power: 'Heavy Chill-Cast Iron',
    image: getSpareImage('PAN Mixer Roller'),
    status: 'Active',
    description: 'Heavy chill-cast iron muller roller assembly that crushes nodules and thoroughly blends fly ash, lime, and quarry dust under high gravitational force.',
    featureBadges: ['Chilled Cast Iron Rim', 'Heavy Self-Weight Crushing', 'Internal Heavy Bearings', 'Improves Mortar Plasticity'],
    specTableColumns: ['Feature', 'Specification'],
    specTableRows: [
      { 'Feature': 'Roller Diameter', 'Specification': '350 mm – 500 mm' },
      { 'Feature': 'Weight', 'Specification': '75 Kgs – 180 Kgs per Roller' }
    ]
  },
  {
    id: 'SPARE-33',
    name: 'Electrical Items',
    brandTag: 'PLC & ELECTRICAL PANELS',
    category: 'Machine Spares',
    categorySlug: 'machine-spares',
    capacity: 'Automated Control',
    power: '415V 3-Phase Control',
    image: getSpareImage('Electrical Items'),
    status: 'Active',
    description: 'Genuine electrical control spares including Siemens/Delta PLC CPUs, analog modules, heavy-duty contactors, thermal overloads, MCBs, and push-buttons.',
    featureBadges: ['Siemens / Schneider / Delta OEM', 'Quick Plug-in Terminals', 'High Surge Immunity', 'Factory Pre-Programmed Available'],
    specTableColumns: ['Feature', 'Specification'],
    specTableRows: [
      { 'Feature': 'Components', 'Specification': 'PLCs, Contactors, Relays, Power Supplies, SMPS' },
      { 'Feature': 'Standard', 'Specification': 'IEC 60947 Electrical Safety' }
    ]
  },
  {
    id: 'SPARE-34',
    name: 'Sensor NPN PNP',
    brandTag: 'PROXIMITY SWITCHES',
    category: 'Machine Spares',
    categorySlug: 'machine-spares',
    capacity: 'Inductive Limit Sensing',
    power: '10 – 30V DC',
    image: getSpareImage('Sensor NPN PNP'),
    status: 'Active',
    description: 'Industrial nickel-plated brass inductive proximity sensors (M12 & M18 NPN/PNP NO/NC) for high-accuracy cylinder stroke and table position sensing in harsh dusty conditions.',
    featureBadges: ['IP67 Waterproof & Dustproof', 'LED Status Indicator', 'High Switching Frequency', 'Immune to Vibration & Dirt'],
    specTableColumns: ['Feature', 'Specification'],
    specTableRows: [
      { 'Feature': 'Sensing Distance', 'Specification': '4 mm – 8 mm Flush / Non-Flush' },
      { 'Feature': 'Output Type', 'Specification': 'NPN Normally Open / PNP Normally Open' },
      { 'Feature': 'Cable Length', 'Specification': '2 Meter High Flex Cable' }
    ]
  }
];

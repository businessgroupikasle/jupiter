export interface DefaultCatalogProduct {
  id: string;
  name: string;
  slug: string;
  category: string;
  brandTag?: string;
  description: string;
  capacity: string;
  capacityLabel?: string;
  power: string;
  powerLabel?: string;
  brickSize: string;
  brickSizeLabel?: string;
  image: string;
  imageUrl?: string;
  isActive: boolean;
  order: number;
  specifications: Record<string, any>;
}

export const DEFAULT_PRODUCT_V10B: DefaultCatalogProduct = {
  id: 'cmus_jupiter_v10b_model',
  name: 'Jupiter V 10 B – 100 Ton High Speed Fly Ash Brick Making Machine',
  slug: 'jupiter-v-10-b-fly-ash-brick-making-machine',
  category: 'Fly Ash Brick Machine',
  brandTag: 'JUPITER INDUSTRIES',
  description:
    'The Jupiter V 10 B Fly Ash Brick Making Machine is a high-speed hydraulic brick manufacturing machine designed for commercial and industrial production requirements.\n\nEquipped with a powerful 100 ton hydraulic pressing system, the machine supports effective brick compression using a single-cylinder configuration. It offers a production capacity of approximately 2,300 to 2,400 fly ash bricks per hour.\n\nThe machine features a 10 HP main motor, 2 HP brick ejection motor and 1 HP heat exchanger. Its heavy pressing belt and 100-litre pre-fill tank support the hydraulic pressing process.\n\nWith a PLC control panel, 500-litre oil tank and specified motor brands including Siemens, Crompton and Havells, the Jupiter V 10 B provides a controlled solution for fly ash brick manufacturing.',
  capacity: '2,300–2,400 Bricks per Hour',
  capacityLabel: 'Production Capacity',
  power: 'Not specified (Main Motor: 10 HP)',
  powerLabel: 'Total Connected Power',
  brickSize: '230 × 105 × 75 mm',
  brickSizeLabel: 'Brick / Mould Size',
  image: '/uploads/products/1--10-1791953431092-625007853.png',
  imageUrl: '/uploads/products/1--10-1791953431092-625007853.png',
  isActive: true,
  order: 1,
  specifications: {
    order: 1,
    status: 'Active',
    brandTag: 'JUPITER INDUSTRIES',
    capacity: '2,300–2,400 Bricks per Hour',
    capacityLabel: 'Production Capacity',
    power: 'Not specified (Main Motor: 10 HP)',
    powerLabel: 'Total Connected Power',
    brickSize: '230 × 105 × 75 mm',
    brickSizeLabel: 'Brick / Mould Size',
    metaTitle: 'Jupiter V 10 B Fly Ash Brick Machine | Jupiter Industries',
    metaDescription:
      'Explore the Jupiter V 10 B fly ash brick making machine with 100 ton hydraulic pressing, PLC control and a production capacity of 2,300–2,400 bricks per hour.',
    focusKeyword: 'Jupiter V 10 B Fly Ash Brick Making Machine',
    secondaryKeywords:
      '100 Ton Fly Ash Brick Machine, High Speed Fly Ash Brick Machine, Hydraulic Brick Making Machine, PLC Controlled Brick Machine',
    featureBadges: [
      '100 Ton Hydraulic Press',
      '2,300–2,400 Bricks/Hour',
      'PLC Control System',
      'Single Cylinder Pressing',
    ],
    highlights: [
      {
        title: '100 Ton Hydraulic Pressing System',
        description:
          'Powerful 100 ton single-cylinder hydraulic pressing system supports effective compression during fly ash brick manufacturing.',
      },
      {
        title: 'High-Speed Brick Production',
        description:
          'Delivers approximately 2,300 to 2,400 bricks per hour to support commercial brick manufacturing operations.',
      },
      {
        title: 'PLC-Based Machine Control',
        description:
          'Integrated PLC control panel supports controlled machine operation and production workflow management.',
      },
      {
        title: 'Heavy-Duty Hydraulic Components',
        description:
          'Features a heavy pressing belt, 500-litre oil tank and 100-litre pre-fill tank for hydraulic operation.',
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
        title: 'Commercial Production Capacity',
        description:
          'Supports fly ash brick manufacturing requirements with a production output of up to 2,400 bricks per hour.',
      },
      {
        title: 'Powerful Hydraulic Compression',
        description:
          'The 100 ton single-cylinder pressing arrangement supports effective compression of fly ash bricks.',
      },
      {
        title: 'Controlled Machine Operation',
        description:
          'PLC-based control helps manage the manufacturing cycle and hydraulic machine operations.',
      },
      {
        title: 'Industrial Hydraulic Configuration',
        description:
          'Heavy pressing belt, pre-fill tank and separate brick ejection system support the production process.',
      },
    ],
    galleryImages: [],
  },
};

export const DEFAULT_PRODUCT_V12B: DefaultCatalogProduct = {
  id: 'cmus_jupiter_v12b_model',
  name: 'Jupiter V 12 B – 50+2 Ton High Speed Fly Ash Brick Making Machine',
  slug: 'jupiter-v-12-b-fly-ash-brick-making-machine',
  category: 'Fly Ash Brick Machine',
  brandTag: 'JUPITER INDUSTRIES',
  description:
    'The Jupiter V 12 B Fly Ash Brick Making Machine is a high-speed hydraulic brick production system designed to support commercial and industrial fly ash brick manufacturing.\n\nFeaturing a 50+2 ton hydraulic pressing load with double main cylinders, this machine offers a production capacity of approximately 2,700 to 2,800 bricks per hour.\n\nThe machine operates with a 15 HP hydraulic motor, a dedicated 2 HP brick ejection motor and a 1 HP heat exchanger.\n\nIts hydraulic configuration includes a 500-litre oil tank, heavy pressing belt and 100-litre pre-fill tank. The integrated PLC control panel supports controlled machine operations.\n\nWith motors specified from Siemens, Crompton and Havells, the Jupiter V 12 B offers a high-speed solution for manufacturing standard 230 × 105 × 75 mm fly ash bricks.',
  capacity: '2,700–2,800 Bricks per Hour',
  capacityLabel: 'Production Capacity',
  power: 'Not specified (Hydraulic Motor: 15 HP / 11.25 kW)',
  powerLabel: 'Total Connected Power',
  brickSize: '230 × 105 × 75 mm',
  brickSizeLabel: 'Brick / Mould Size',
  image: '/uploads/products/1--4-1791953419156-189672038.png',
  imageUrl: '/uploads/products/1--4-1791953419156-189672038.png',
  isActive: true,
  order: 2,
  specifications: {
    order: 2,
    status: 'Active',
    brandTag: 'JUPITER INDUSTRIES',
    capacity: '2,700–2,800 Bricks per Hour',
    capacityLabel: 'Production Capacity',
    power: 'Not specified (Hydraulic Motor: 15 HP / 11.25 kW)',
    powerLabel: 'Total Connected Power',
    brickSize: '230 × 105 × 75 mm',
    brickSizeLabel: 'Brick / Mould Size',
    metaTitle: 'Jupiter V 12 B Fly Ash Brick Machine | Jupiter Industries',
    metaDescription:
      'Discover the Jupiter V 12 B high speed fly ash brick machine with 50+2 ton hydraulic pressing, double main cylinders and 2,700–2,800 bricks per hour capacity.',
    focusKeyword: 'Jupiter V 12 B Fly Ash Brick Making Machine',
    secondaryKeywords:
      '50+2 Ton Fly Ash Brick Machine, Double Cylinder Brick Making Machine, Hydraulic Fly Ash Brick Press, High Speed Brick Making Machine',
    featureBadges: [
      '50+2 Ton Hydraulic Press',
      '2,700–2,800 Bricks/Hour',
      'Double Main Cylinder',
      'PLC Control Panel',
    ],
    highlights: [
      {
        title: '50+2 Ton Double Cylinder Press',
        description:
          'Hydraulic pressing system with double main cylinders delivers a specified pressing load of 50+2 tons.',
      },
      {
        title: 'High Production Capacity',
        description:
          'Supports commercial fly ash brick manufacturing with an output of approximately 2,700 to 2,800 bricks per hour.',
      },
      {
        title: 'Powerful 15 HP Hydraulic Motor',
        description:
          'Features a 15 HP hydraulic motor supported by separate brick ejection and heat exchanger motors.',
      },
      {
        title: 'PLC-Controlled Production',
        description:
          'PLC control panel with a heavy pressing belt and 100-litre pre-fill tank supports controlled brick production.',
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
        title: 'Higher Brick Production Output',
        description:
          'Supports commercial manufacturing with a production capacity of up to 2,800 fly ash bricks per hour.',
      },
      {
        title: 'Double Cylinder Pressing System',
        description:
          'The 50+2 ton double main cylinder arrangement supports hydraulic compression during the brick manufacturing process.',
      },
      {
        title: 'Dedicated Motor Configuration',
        description:
          'Separate hydraulic, brick ejection and heat exchanger motors support their respective machine operations.',
      },
      {
        title: 'PLC-Based Operational Control',
        description:
          'PLC control panel helps manage machine functions and supports an organised production workflow.',
      },
    ],
    galleryImages: [],
  },
};

export const DEFAULT_PRODUCT_V15B: DefaultCatalogProduct = {
  id: 'cmus8mqtn000bkwtfhsvexaxi',
  name: 'Jupiter V 15 B – 80+2 Ton High Speed Fly Ash Brick Making Machine',
  slug: 'jupiter-v-15-b-fly-ash-brick-making-machine',
  category: 'Fly Ash Brick Machine',
  brandTag: 'JUPITER INDUSTRIES',
  description:
    'The Jupiter V 15 B Fly Ash Brick Making Machine is a high-capacity, high-speed hydraulic brick production system developed for industrial fly ash brick manufacturing requirements.\n\nDesigned with an 80+2 ton hydraulic pressing load and double main cylinders, the machine delivers a production capacity of approximately 3,500 to 3,600 bricks per hour.\n\nThe machine is equipped with a 15 HP hydraulic motor, a 2 HP brick ejection motor and a 1 HP heat exchanger to support its production operations.\n\nIts heavy pressing belt, 500-litre hydraulic oil tank and 100-litre pre-fill tank form part of the hydraulic system.\n\nAn integrated PLC control panel supports controlled machine operation, while Siemens, Crompton and Havells are the motor brands specified for this model.\n\nThe Jupiter V 15 B is suitable for manufacturers requiring higher hourly production output using a 230 × 105 × 75 mm brick size.',
  capacity: '3,500–3,600 Bricks per Hour',
  capacityLabel: 'Production Capacity',
  power: 'Not specified (Hydraulic Motor: 15 HP / 11.25 kW)',
  powerLabel: 'Total Connected Power',
  brickSize: '230 × 105 × 75 mm',
  brickSizeLabel: 'Brick / Mould Size',
  image: '/uploads/products/1--4-1791024895795-221812260.png',
  imageUrl: '/uploads/products/1--4-1791024895795-221812260.png',
  isActive: true,
  order: 3,
  specifications: {
    order: 3,
    status: 'Active',
    brandTag: 'JUPITER INDUSTRIES',
    capacity: '3,500–3,600 Bricks per Hour',
    capacityLabel: 'Production Capacity',
    power: 'Not specified (Hydraulic Motor: 15 HP / 11.25 kW)',
    powerLabel: 'Total Connected Power',
    brickSize: '230 × 105 × 75 mm',
    brickSizeLabel: 'Brick / Mould Size',
    metaTitle: 'Jupiter V 15 B Fly Ash Brick Machine | Jupiter Industries',
    metaDescription:
      'Explore the Jupiter V 15 B high speed fly ash brick making machine with 80+2 ton hydraulic pressing, PLC control and 3,500–3,600 bricks per hour capacity.',
    focusKeyword: 'Jupiter V 15 B Fly Ash Brick Making Machine',
    secondaryKeywords:
      '80+2 Ton Fly Ash Brick Machine, Industrial Fly Ash Brick Making Machine, High Capacity Brick Making Machine, Double Cylinder Hydraulic Brick Press',
    featureBadges: [
      '80+2 Ton Hydraulic Press',
      '3,500–3,600 Bricks/Hour',
      'Double Main Cylinder',
      'PLC Control System',
    ],
    highlights: [
      {
        title: 'High-Capacity Brick Manufacturing',
        description:
          'Delivers a production capacity of approximately 3,500 to 3,600 fly ash bricks per hour for industrial manufacturing requirements.',
      },
      {
        title: '80+2 Ton Hydraulic Pressing',
        description:
          'Double main cylinder system provides an 80+2 ton hydraulic pressing load for effective brick compression.',
      },
      {
        title: '15 HP Hydraulic Motor System',
        description:
          'Equipped with a 15 HP hydraulic motor, separate brick eject motor and heat exchanger for machine operation.',
      },
      {
        title: 'PLC Control & Heavy Pressing Belt',
        description:
          'PLC control panel combined with a heavy pressing belt and 100-litre pre-fill tank supports the production process.',
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
        title: 'High-Volume Brick Production',
        description:
          'Offers a production capacity of up to 3,600 fly ash bricks per hour for industrial manufacturing requirements.',
      },
      {
        title: 'Heavy-Duty Hydraulic Compression',
        description:
          'The 80+2 ton double main cylinder pressing system supports effective compression during brick production.',
      },
      {
        title: 'Controlled Machine Performance',
        description:
          'PLC control panel helps manage the hydraulic production cycle and machine operating functions.',
      },
      {
        title: 'Industrial Production Configuration',
        description:
          'The heavy pressing belt, pre-fill tank and separate motor systems support high-speed fly ash brick manufacturing.',
      },
    ],
    galleryImages: [],
  },
};

export const DEFAULT_PRODUCT_ROTARY_5G: DefaultCatalogProduct = {
  id: 'cmus_jupiter_rotary_5g_model',
  name: 'Jupiter Rotary 5G – 80 Ton Automatic Fly Ash Brick Making Machine',
  slug: '80-ton-rotary-5g-fly-ash-brick-making-machine',
  category: 'Fly Ash Brick Machine',
  brandTag: 'JUPITER INDUSTRIES',
  description:
    'The Jupiter Rotary 5G 80 Ton Automatic Fly Ash Brick Making Machine is a hydraulic brick manufacturing machine designed for commercial and industrial fly ash brick production.\n\nFeaturing an 80 ton rotary machine configuration, it delivers a production capacity of approximately 2,900 to 3,000 bricks per hour, supporting high-volume manufacturing requirements.\n\nThe machine operates with 20 HP power and a hydraulic operating system. Its rotary table with a three-stage feeder arrangement supports material feeding during the brick manufacturing cycle.\n\nEquipped with a 40 kg feeder capacity, 210-litre hydraulic oil tank and PLC control system, the Jupiter Rotary 5G provides automated control of machine operations.\n\nThe machine is suitable for manufacturing fly ash bricks using fly ash, lime, dust and cement, making it a practical solution for brick manufacturing businesses.',
  capacity: '2,900–3,000 Bricks per Hour',
  capacityLabel: 'Production Capacity',
  power: '20 HP (specified power)',
  powerLabel: 'Total Connected Power',
  brickSize: '',
  brickSizeLabel: 'Brick / Mould Size',
  image: '/uploads/products/jupiter-5g-machine-full-view-1791953587374-4768439.png',
  imageUrl: '/uploads/products/jupiter-5g-machine-full-view-1791953587374-4768439.png',
  isActive: true,
  order: 4,
  specifications: {
    order: 4,
    status: 'Active',
    brandTag: 'JUPITER INDUSTRIES',
    capacity: '2,900–3,000 Bricks per Hour',
    capacityLabel: 'Production Capacity',
    power: '20 HP (specified power)',
    powerLabel: 'Total Connected Power',
    brickSize: '',
    brickSizeLabel: 'Brick / Mould Size',
    metaTitle: '80 Ton Rotary 5G Fly Ash Brick Machine | Jupiter Industries',
    metaDescription:
      'Explore the Jupiter Rotary 5G 80 Ton Fly Ash Brick Making Machine with PLC control, 20 HP power, three-stage feeding and 2,900–3,000 bricks per hour.',
    focusKeyword: '80 Ton Rotary 5G Fly Ash Brick Making Machine',
    secondaryKeywords:
      'Automatic Fly Ash Brick Making Machine, 80 Ton Fly Ash Brick Machine, Rotary Fly Ash Brick Machine, PLC Controlled Brick Machine, Three Stage Feeder Brick Machine, Hydraulic Brick Making Machine',
    featureBadges: [
      '80 Ton Rotary 5G Model',
      '2,900–3,000 Bricks/Hour',
      'Three-Stage Feeder System',
      'PLC Control System',
    ],
    highlights: [
      {
        title: '80 Ton Rotary Machine System',
        description:
          'Automatic 80 ton rotary fly ash brick making machine designed to support commercial and industrial brick manufacturing operations.',
      },
      {
        title: 'High-Speed Brick Production',
        description:
          'Offers a production capacity of approximately 2,900 to 3,000 fly ash bricks per hour for manufacturing requirements.',
      },
      {
        title: 'Three-Stage Feeder System',
        description:
          'Rotary table with a three-stage feeder arrangement and 40 kg feeder capacity supports controlled material feeding.',
      },
      {
        title: 'PLC-Controlled Hydraulic Operation',
        description:
          'Features a hydraulic operating system with PLC control for managing machine operations and production workflow.',
      },
    ],
    specTableColumns: ['Parameter', 'Details', 'Specification'],
    specTableRows: [
      { Parameter: 'Machine Model', Details: 'Jupiter Rotary 5G', Specification: '80 Ton' },
      { Parameter: 'Machine Type', Details: 'Automatic Rotary', Specification: 'Fly Ash Brick Making Machine' },
      { Parameter: 'Production Capacity', Details: '2,900–3,000', Specification: 'Bricks per Hour' },
      { Parameter: 'Machine Capacity', Details: '80 Tons', Specification: 'Rotary 5G Model' },
      { Parameter: 'Power', Details: '20 HP', Specification: '—' },
      { Parameter: 'Operating System', Details: 'Hydraulic', Specification: '—' },
      { Parameter: 'Oil Tank Capacity', Details: '210 Litres', Specification: '—' },
      { Parameter: 'Oil Grade', Details: '68', Specification: '—' },
      { Parameter: 'Table Rotation', Details: 'Rotary Table', Specification: 'Three-Stage Feeder Model' },
      { Parameter: 'Feeder Capacity', Details: '40 kg', Specification: '—' },
      { Parameter: 'Control System', Details: 'PLC Control', Specification: '—' },
      { Parameter: 'Raw Materials', Details: 'Fly Ash, Lime, Dust', Specification: 'Cement' },
    ],
    keyFeatures: [
      '80 ton automatic Rotary 5G fly ash brick making machine with a production capacity of 2,900 to 3,000 bricks per hour.',
      '20 HP hydraulic operating system with a 210-litre oil tank and Grade 68 hydraulic oil.',
      'Rotary table with a three-stage feeder arrangement and 40 kg feeder capacity.',
      'PLC control system with compatibility for fly ash, lime, dust and cement raw materials.',
    ],
    advantages: [
      {
        title: 'High-Volume Brick Manufacturing',
        description:
          'Supports commercial fly ash brick production with an hourly output of up to 3,000 bricks to meet manufacturing requirements.',
      },
      {
        title: 'Efficient Rotary Feeding System',
        description:
          'The rotary table and three-stage feeder arrangement support organised raw material feeding during the production cycle.',
      },
      {
        title: 'Automated Production Control',
        description:
          'PLC-based control system supports the management of hydraulic machine operations and the brick manufacturing process.',
      },
      {
        title: 'Multiple Raw Material Compatibility',
        description:
          'Designed to work with fly ash, lime, dust and cement, supporting material requirements for fly ash brick manufacturing.',
      },
    ],
    galleryImages: [],
  },
};

export const DEFAULT_PRODUCT_50TON_ROTARY: DefaultCatalogProduct = {
  id: 'cmus_jupiter_50ton_rotary_model',
  name: '50 Ton Automatic Rotary Fly Ash Brick Making Machine – 2 & 3 Brick Models',
  slug: '50-ton-rotary-fly-ash-brick-making-machine',
  category: 'Fly Ash Brick Machine',
  brandTag: 'JUPITER INDUSTRIES',
  description:
    'The Jupiter 50 Ton Automatic Rotary Fly Ash Brick Making Machine is designed for commercial and industrial fly ash brick manufacturing, offering 2-brick and 3-brick production configurations.\n\nThe 2-brick model delivers a production capacity of approximately 2,300 to 2,400 bricks per hour, while the 3-brick model offers 2,400 to 2,500 bricks per hour.\n\nThe 2-brick configuration features a 20 HP hydraulic operating system, a 160-litre oil tank and hydraulic motor-driven table rotation for the brick production process.\n\nIts PLC control system supports controlled machine operation, while the hydraulic rotary mechanism facilitates the manufacturing cycle.\n\nThe specified raw materials include fly ash, iron oxide, lime sludge and quarry waste, making the machine suitable for fly ash brick manufacturing applications.\n\nWith two available production configurations, the Jupiter 50 Ton Rotary Machine offers flexibility for different brick manufacturing requirements.',
  capacity: '2,300–2,500 Bricks per Hour (Depending on Model)',
  capacityLabel: 'Production Capacity',
  power: 'Not specified (20 HP power listed for 2-brick model)',
  powerLabel: 'Total Connected Power',
  brickSize: '',
  brickSizeLabel: 'Brick / Mould Size',
  image: '/uploads/products/1--5-1791953693967-3090793.png',
  imageUrl: '/uploads/products/1--5-1791953693967-3090793.png',
  isActive: true,
  order: 5,
  specifications: {
    order: 5,
    status: 'Active',
    brandTag: 'JUPITER INDUSTRIES',
    capacity: '2,300–2,500 Bricks per Hour (Depending on Model)',
    capacityLabel: 'Production Capacity',
    power: 'Not specified (20 HP power listed for 2-brick model)',
    powerLabel: 'Total Connected Power',
    brickSize: '',
    brickSizeLabel: 'Brick / Mould Size',
    metaTitle: '50 Ton Rotary Fly Ash Brick Machine | Jupiter Industries',
    metaDescription:
      "Explore Jupiter Industries' 50 Ton Rotary Fly Ash Brick Making Machine with 2 and 3 brick models, hydraulic operation, PLC control and up to 2,500 bricks/hour.",
    focusKeyword: '50 Ton Rotary Fly Ash Brick Making Machine',
    secondaryKeywords:
      'Automatic Fly Ash Brick Making Machine, 2 Brick Rotary Machine, 3 Brick Rotary Machine, Hydraulic Brick Making Machine, PLC Controlled Brick Machine, Fly Ash Brick Machine Manufacturer',
    featureBadges: [
      '50 Ton Rotary Machine',
      '2 & 3 Brick Models',
      'Up to 2,500 Bricks/Hour',
      'Hydraulic Rotary System',
    ],
    highlights: [
      {
        title: '50 Ton Rotary Brick Making System',
        description:
          'Automatic 50 ton rotary fly ash brick making machine available in 2-brick and 3-brick configurations for commercial production requirements.',
      },
      {
        title: 'High-Speed Brick Production',
        description:
          'Offers production capacities of 2,300–2,400 bricks per hour for the 2-brick model and 2,400–2,500 bricks per hour for the 3-brick model.',
      },
      {
        title: 'Hydraulic Rotary Table System',
        description:
          'The 2-brick configuration features hydraulic motor-driven table rotation and a 20 HP hydraulic operating system.',
      },
      {
        title: 'PLC-Controlled Machine Operation',
        description:
          'The specified 2-brick model includes a PLC control system to support controlled machine operations and production workflow.',
      },
    ],
    specTableColumns: ['Parameter', '2 Brick Model', '3 Brick Model'],
    specTableRows: [
      { Parameter: 'Machine Type', '2 Brick Model': 'Automatic Rotary Fly Ash Brick Machine', '3 Brick Model': 'Automatic Rotary Fly Ash Brick Machine' },
      { Parameter: 'Machine Capacity', '2 Brick Model': '50 Tons', '3 Brick Model': '50 Tons' },
      { Parameter: 'Production Capacity', '2 Brick Model': '2,300–2,400 Bricks/Hour', '3 Brick Model': '2,400–2,500 Bricks/Hour' },
      { Parameter: 'Power', '2 Brick Model': '20 HP', '3 Brick Model': 'Not Specified' },
      { Parameter: 'Operating System', '2 Brick Model': 'Hydraulic', '3 Brick Model': 'Not Specified' },
      { Parameter: 'Oil Tank Capacity', '2 Brick Model': '160 Litres', '3 Brick Model': 'Not Specified' },
      { Parameter: 'Oil Grade', '2 Brick Model': '68', '3 Brick Model': 'Not Specified' },
      { Parameter: 'Table Rotation', '2 Brick Model': 'Hydraulic Motor', '3 Brick Model': 'Not Specified' },
      { Parameter: 'Control System', '2 Brick Model': 'PLC Control', '3 Brick Model': 'Not Specified' },
      { Parameter: 'Raw Materials', '2 Brick Model': 'Fly Ash, Iron Oxide, Lime Sludge, Quarry Waste', '3 Brick Model': 'Not Specified' },
    ],
    keyFeatures: [
      '50 ton automatic rotary fly ash brick making machine available in 2-brick and 3-brick production models.',
      'Production capacity of 2,300 to 2,400 bricks per hour for the 2-brick model and 2,400 to 2,500 bricks per hour for the 3-brick model.',
      '20 HP hydraulic operating system with a 160-litre oil tank and hydraulic motor-driven table rotation in the specified 2-brick configuration.',
      'PLC control system and compatibility with fly ash, iron oxide, lime sludge and quarry waste in the 2-brick model.',
    ],
    advantages: [
      {
        title: 'Flexible Production Configurations',
        description:
          'Available in 2-brick and 3-brick models, allowing manufacturers to select a configuration based on their hourly production requirements.',
      },
      {
        title: 'High Production Capacity',
        description:
          'Supports commercial fly ash brick manufacturing with a production capacity of up to 2,500 bricks per hour, depending on the selected model.',
      },
      {
        title: 'Hydraulic Rotary Operation',
        description:
          'The 2-brick model uses hydraulic motor-driven table rotation to support the brick manufacturing cycle.',
      },
      {
        title: 'Controlled Manufacturing Process',
        description:
          'The PLC control system specified for the 2-brick model supports efficient management of machine operations and production activities.',
      },
    ],
    galleryImages: [],
  },
};

export const DEFAULT_PRODUCT_30TON_ROTARY: DefaultCatalogProduct = {
  id: 'cmus_jupiter_30ton_rotary_model',
  name: '30 Ton Automatic Rotary Fly Ash Brick Making Machine',
  slug: '30-ton-rotary-fly-ash-brick-making-machine',
  category: 'Fly Ash Brick Machine',
  brandTag: 'JUPITER INDUSTRIES',
  description:
    'The Jupiter 30 Ton Automatic Rotary Fly Ash Brick Making Machine is a hydraulic brick manufacturing machine designed for commercial and industrial fly ash brick production.\n\nFeaturing a 30 ton rotary machine configuration, it delivers a production capacity of approximately 1,600 to 1,800 bricks per hour, supporting the requirements of commercial brick manufacturing units.\n\nThe machine operates with a 10 HP power rating and a hydraulic operating system, featuring two hydraulic cylinders dedicated to brick pressing and ejection operations.\n\nIts hydraulic motor-driven rotary table supports the brick manufacturing cycle, while the integrated PLC control system helps manage machine operations.\n\nEquipped with a 160-litre hydraulic oil tank and Grade 68 hydraulic oil specification, the machine is designed to support hydraulic rotary operations.\n\nThe Jupiter 30 Ton Rotary Machine is suitable for manufacturing fly ash bricks using raw materials such as fly ash, iron oxide, lime sludge and quarry waste.\n\nWith its hydraulic pressing system, rotary table mechanism and PLC-based controls, this machine provides a practical solution for fly ash brick manufacturers seeking controlled production operations.',
  capacity: '1,600–1,800 Bricks per Hour',
  capacityLabel: 'Production Capacity',
  power: 'Not specified (Power Rating: 10 HP)',
  powerLabel: 'Total Connected Power',
  brickSize: '',
  brickSizeLabel: 'Brick / Mould Size',
  image: '/uploads/products/1--9-1791953609964-450970271.png',
  imageUrl: '/uploads/products/1--9-1791953609964-450970271.png',
  isActive: true,
  order: 6,
  specifications: {
    order: 6,
    status: 'Active',
    brandTag: 'JUPITER INDUSTRIES',
    capacity: '1,600–1,800 Bricks per Hour',
    capacityLabel: 'Production Capacity',
    power: 'Not specified (Power Rating: 10 HP)',
    powerLabel: 'Total Connected Power',
    brickSize: '',
    brickSizeLabel: 'Brick / Mould Size',
    metaTitle: '30 Ton Rotary Fly Ash Brick Machine | Jupiter Industries',
    metaDescription:
      "Explore Jupiter Industries' 30 Ton Rotary Fly Ash Brick Making Machine with 10 HP power, hydraulic operation, PLC control and 1,600–1,800 bricks/hour capacity.",
    focusKeyword: '30 Ton Rotary Fly Ash Brick Making Machine',
    secondaryKeywords:
      'Automatic Fly Ash Brick Making Machine, 30 Ton Fly Ash Brick Machine, Hydraulic Rotary Brick Machine, PLC Controlled Brick Making Machine, Fly Ash Brick Manufacturing Machine, Rotary Brick Making Machine Manufacturer',
    featureBadges: [
      '30 Ton Rotary Machine',
      '1,600–1,800 Bricks/Hour',
      'Dual Hydraulic Cylinders',
      'PLC Control System',
    ],
    highlights: [
      {
        title: '30 Ton Hydraulic Rotary System',
        description:
          'Automatic 30 ton rotary fly ash brick making machine designed to support commercial brick manufacturing with hydraulic pressing and rotary table operation.',
      },
      {
        title: 'Efficient Brick Production Capacity',
        description:
          'Produces approximately 1,600 to 1,800 fly ash bricks per hour to support commercial manufacturing requirements.',
      },
      {
        title: 'Dual Hydraulic Cylinder Operation',
        description:
          'Features two hydraulic cylinders for brick pressing and ejection operations, supporting the production cycle.',
      },
      {
        title: 'PLC-Controlled Rotary Operation',
        description:
          'Integrated PLC control system and hydraulic motor-driven table rotation support controlled machine operation and brick manufacturing workflow.',
      },
    ],
    specTableColumns: ['Parameter', 'Details', 'Specification'],
    specTableRows: [
      { Parameter: 'Machine Model', Details: '30 Ton Rotary Model', Specification: 'Automatic Fly Ash Brick Machine' },
      { Parameter: 'Machine Type', Details: 'Automatic Rotary', Specification: 'Fly Ash Brick Making Machine' },
      { Parameter: 'Machine Capacity', Details: '30 Tons', Specification: 'Rotary Model' },
      { Parameter: 'Production Capacity', Details: '1,600–1,800', Specification: 'Bricks per Hour' },
      { Parameter: 'Power', Details: '10 HP', Specification: '—' },
      { Parameter: 'Operating System', Details: 'Hydraulic', Specification: '—' },
      { Parameter: 'Hydraulic Cylinders', Details: '2', Specification: 'Pressing & Ejection' },
      { Parameter: 'Oil Tank Capacity', Details: '160 Litres', Specification: '—' },
      { Parameter: 'Oil Grade', Details: '68', Specification: '—' },
      { Parameter: 'Table Rotation', Details: 'Hydraulic Motor', Specification: 'Rotary Table' },
      { Parameter: 'Control System', Details: 'PLC Control', Specification: '—' },
      { Parameter: 'Raw Materials', Details: 'Fly Ash, Iron Oxide', Specification: 'Lime Sludge, Quarry Waste' },
    ],
    keyFeatures: [
      '30 ton automatic rotary fly ash brick making machine with a production capacity of 1,600 to 1,800 bricks per hour.',
      '10 HP hydraulic operating system featuring two hydraulic cylinders for brick pressing and ejection operations.',
      'Hydraulic motor-driven rotary table with PLC control system for controlled machine operations.',
      '160-litre hydraulic oil tank with Grade 68 oil specification and compatibility with fly ash, iron oxide, lime sludge and quarry waste.',
    ],
    advantages: [
      {
        title: 'Efficient Fly Ash Brick Production',
        description:
          'Supports commercial fly ash brick manufacturing with an hourly production capacity of up to 1,800 bricks, depending on operating conditions.',
      },
      {
        title: 'Hydraulic Pressing & Ejection System',
        description:
          'Two hydraulic cylinders support brick pressing and ejection operations, helping maintain an organised brick manufacturing cycle.',
      },
      {
        title: 'Controlled Rotary Machine Operation',
        description:
          'Hydraulic motor-driven table rotation combined with PLC controls supports controlled machine movement and production operations.',
      },
      {
        title: 'Multiple Raw Material Compatibility',
        description:
          'Suitable for manufacturing bricks using fly ash, iron oxide, lime sludge and quarry waste, providing flexibility in raw material selection.',
      },
    ],
    galleryImages: [],
  },
};

export const DEFAULT_PRODUCT_30_40TON_ROTARY = DEFAULT_PRODUCT_30TON_ROTARY;

export const DEFAULT_PRODUCT_4BRICKS_FEEDER: DefaultCatalogProduct = {
  id: 'cmus_jupiter_4bricks_feeder_model',
  name: 'Automatic Fly Ash Brick Making Machine – 4 Bricks Feeder Model',
  slug: '4-bricks-feeder-fly-ash-brick-making-machine',
  category: 'Fly Ash Brick Machine',
  brandTag: 'JUPITER INDUSTRIES',
  description:
    'The Jupiter 4 Bricks Feeder Automatic Fly Ash Brick Making Machine is a hydraulically operated brick manufacturing machine designed for commercial fly ash brick production.\n\nEquipped with a 10 HP hydraulic operating system, the machine delivers a production capacity of approximately 1,200 to 1,300 bricks per hour, supporting the manufacturing requirements of fly ash brick production units.\n\nThe machine features an automatic feeder system with a 30 kg feeder box capacity, helping maintain an organised raw material feeding process during brick manufacturing.\n\nIts hydraulic system includes a single cylinder for pressing and ejection operations, supported by a 210-litre oil tank and Grade 68 hydraulic oil.\n\nThe machine is available with MS or hardened EN8 mould material options and supports single and double groove fly ash brick configurations.\n\nAn integrated PLC control system supports controlled production operations. The machine is suitable for manufacturing fly ash bricks using fly ash, lime, dust and cement.',
  capacity: '1,200–1,300 Bricks per Hour',
  capacityLabel: 'Production Capacity',
  power: '10 HP (specified power rating)',
  powerLabel: 'Total Connected Power',
  brickSize: '230 × 230 × 75 mm (requires verification)',
  brickSizeLabel: 'Brick / Mould Size',
  image: '/uploads/products/1--9-1791953822843-158196456.png',
  imageUrl: '/uploads/products/1--9-1791953822843-158196456.png',
  isActive: true,
  order: 7,
  specifications: {
    order: 7,
    status: 'Active',
    brandTag: 'JUPITER INDUSTRIES',
    capacity: '1,200–1,300 Bricks per Hour',
    capacityLabel: 'Production Capacity',
    power: '10 HP (specified power rating)',
    powerLabel: 'Total Connected Power',
    brickSize: '230 × 230 × 75 mm (requires verification)',
    brickSizeLabel: 'Brick / Mould Size',
    metaTitle: '4 Brick Feeder Fly Ash Brick Machine | Jupiter Industries',
    metaDescription:
      "Explore Jupiter Industries' 4 Bricks Feeder Fly Ash Brick Making Machine with 10 HP hydraulic power, PLC control and 1,200–1,300 bricks per hour capacity.",
    focusKeyword: '4 Bricks Feeder Fly Ash Brick Making Machine',
    secondaryKeywords:
      'Automatic Fly Ash Brick Making Machine, 4 Brick Feeder Machine, Hydraulic Fly Ash Brick Machine, PLC Controlled Brick Making Machine, Automatic Feeder Brick Machine, Fly Ash Brick Machine Manufacturer',
    featureBadges: [
      '4 Bricks Feeder Model',
      '1,200–1,300 Bricks/Hour',
      'Automatic Feeder System',
      'PLC Control System',
    ],
    highlights: [
      {
        title: 'Automatic 4 Bricks Feeder System',
        description:
          'Features an automatic feeder mechanism with a 30 kg feeder box capacity to support organised raw material feeding during fly ash brick production.',
      },
      {
        title: 'Efficient Hydraulic Pressing System',
        description:
          'Equipped with a 10 HP hydraulic operating system and a single hydraulic cylinder for brick pressing and ejection operations.',
      },
      {
        title: 'MS & Hardened EN8 Mould Options',
        description:
          'Offers MS or hardened EN8 mould material options with support for single and double groove fly ash brick manufacturing.',
      },
      {
        title: 'PLC-Controlled Brick Manufacturing',
        description:
          'Integrated PLC control system supports controlled machine operation and efficient management of the brick manufacturing process.',
      },
    ],
    specTableColumns: ['Parameter', 'Details', 'Specification'],
    specTableRows: [
      { Parameter: 'Machine Model', Details: '4 Bricks Feeder Model', Specification: 'Automatic Fly Ash Brick Machine' },
      { Parameter: 'Machine Type', Details: 'Automatic Feeder', Specification: 'Hydraulic Brick Making Machine' },
      { Parameter: 'Production Capacity', Details: '1,200–1,300', Specification: 'Bricks per Hour' },
      { Parameter: 'Power', Details: '10 HP', Specification: '—' },
      { Parameter: 'Operating System', Details: 'Hydraulic', Specification: '—' },
      { Parameter: 'Hydraulic Cylinder', Details: '1', Specification: 'Pressing & Ejection' },
      { Parameter: 'Oil Tank Capacity', Details: '210 Litres', Specification: '—' },
      { Parameter: 'Oil Grade', Details: '68', Specification: '—' },
      { Parameter: 'Feeding System', Details: 'Automatic Feeder', Specification: '4 Bricks Model' },
      { Parameter: 'Feeder Box Capacity', Details: '30 kg', Specification: '—' },
      { Parameter: 'Control System', Details: 'PLC Control', Specification: '—' },
      { Parameter: 'Mould Material', Details: 'MS / EN8', Specification: 'Hardening Option' },
      { Parameter: 'Brick Groove', Details: 'Single & Double', Specification: '—' },
      { Parameter: 'Brick Size', Details: '230 × 230 × 75 mm', Specification: 'Requires Verification' },
      { Parameter: 'Raw Materials', Details: 'Fly Ash, Lime, Dust', Specification: 'Cement' },
    ],
    keyFeatures: [
      'Automatic 4 Bricks Feeder Fly Ash Brick Making Machine with a production capacity of 1,200 to 1,300 bricks per hour.',
      '10 HP hydraulic operating system with a single cylinder for brick pressing and ejection operations.',
      'Automatic material feeding with a 30 kg feeder box, PLC control system and 210-litre hydraulic oil tank.',
      'MS or hardened EN8 mould material options with single and double groove fly ash brick configurations.',
    ],
    advantages: [
      {
        title: 'Automated Brick Manufacturing',
        description:
          'The automatic feeder system and PLC controls support an organised production process with a manufacturing capacity of up to 1,300 bricks per hour.',
      },
      {
        title: 'Efficient Hydraulic Operation',
        description:
          'The 10 HP hydraulic system with a single pressing and ejection cylinder supports controlled brick compression and removal during the manufacturing cycle.',
      },
      {
        title: 'Flexible Mould Configurations',
        description:
          'MS and hardened EN8 mould options with single and double groove configurations provide flexibility for different fly ash brick production requirements.',
      },
      {
        title: 'Controlled Raw Material Feeding',
        description:
          'The 30 kg automatic feeder box supports consistent material feeding, while compatibility with fly ash, lime, dust and cement offers flexibility in raw material selection.',
      },
    ],
    galleryImages: [],
  },
};

export const DEFAULT_PRODUCT_HDM800: DefaultCatalogProduct = {
  id: 'cmus_jupiter_hdm800_model',
  name: 'Jupiter HDM 800 – Hollow & Solid Block Making Machine',
  slug: 'jupiter-hdm-800-hollow-solid-block-making-machine',
  category: 'Hollow & Solid Block Machine',
  brandTag: 'JUPITER INDUSTRIES',
  description:
    'The Jupiter HDM 800 Hollow and Solid Block Making Machine is an industrial block manufacturing machine designed for producing different sizes of hollow and solid concrete blocks.\n\nEquipped with a 24 HP three-phase power configuration, the machine delivers a production capacity of approximately 80 to 90 strokes per hour, supporting commercial block manufacturing requirements.\n\nThe machine features two 3 HP ram vibrators and two 5 HP mould vibrators, providing a specified vibration frequency of 6,000 vibrations per minute (VPM).\n\nIts adjustable vibration amplitude of 1–2 mm allows operators to adjust vibration settings according to production requirements.\n\nThe hydraulic system operates with a 7.5 HP motor, supporting the machine\'s hydraulic functions during the block manufacturing process.\n\nThe Jupiter HDM 800 supports multiple block dimensions, including 200 × 200 × 400 mm, 150 × 200 × 400 mm and 100 × 200 × 400 mm, with production outputs of 16, 10 and 8 blocks per stroke respectively.\n\nWith its hydraulic system, multiple vibrators and adjustable vibration settings, the Jupiter HDM 800 is designed to support hollow and solid block production for construction material manufacturers.',
  capacity: '80–90 Strokes per Hour',
  capacityLabel: 'Production Capacity',
  power: '24 HP / 3 Phase (specified power)',
  powerLabel: 'Total Connected Power',
  brickSize: '200 × 200 × 400 mm, 150 × 200 × 400 mm, 100 × 200 × 400 mm',
  brickSizeLabel: 'Block / Mould Size',
  image: '/uploads/products/Jupiter-Industries-Green-Block-Machine-1791953751046-607639876.png',
  imageUrl: '/uploads/products/Jupiter-Industries-Green-Block-Machine-1791953751046-607639876.png',
  isActive: true,
  order: 8,
  specifications: {
    order: 8,
    status: 'Active',
    brandTag: 'JUPITER INDUSTRIES',
    capacity: '80–90 Strokes per Hour',
    capacityLabel: 'Production Capacity',
    power: '24 HP / 3 Phase (specified power)',
    powerLabel: 'Total Connected Power',
    brickSize: '200 × 200 × 400 mm, 150 × 200 × 400 mm, 100 × 200 × 400 mm',
    brickSizeLabel: 'Block / Mould Size',
    metaTitle: 'Jupiter HDM 800 Hollow & Solid Block Machine | Jupiter Industries',
    metaDescription:
      'Explore the Jupiter HDM 800 Hollow & Solid Block Making Machine with 24 HP 3-phase power, 6,000 VPM vibration and 80–90 strokes per hour.',
    focusKeyword: 'Jupiter HDM 800 Hollow and Solid Block Making Machine',
    secondaryKeywords:
      'Hollow Block Making Machine, Solid Block Making Machine, Hydraulic Block Making Machine, Concrete Block Making Machine, HDM 800 Block Machine, Industrial Block Making Machine, Vibrator Block Making Machine',
    featureBadges: [
      '80–90 Strokes/Hour',
      '24 HP 3-Phase Power',
      '6,000 VPM Vibration',
      'Hollow & Solid Blocks',
    ],
    highlights: [
      {
        id: 'hl-hdm800-1',
        title: 'Hollow & Solid Block Production',
        description:
          'Designed for manufacturing hollow and solid concrete blocks in multiple sizes to support different construction material requirements.',
        displayOrder: 1,
      },
      {
        id: 'hl-hdm800-2',
        title: 'High-Frequency Vibration System',
        description:
          'Features two ram vibrators and two mould vibrators with a specified vibration frequency of 6,000 VPM for block moulding operations.',
        displayOrder: 2,
      },
      {
        id: 'hl-hdm800-3',
        title: 'Multiple Block Size Configurations',
        description:
          'Supports three block sizes with production capacities of 16, 10 and 8 blocks per stroke, depending on the selected mould configuration.',
        displayOrder: 3,
      },
      {
        id: 'hl-hdm800-4',
        title: 'Hydraulic System with Adjustable Vibration',
        description:
          'Features a 7.5 HP hydraulic system and adjustable vibration amplitude of 1–2 mm to support controlled block manufacturing operations.',
        displayOrder: 4,
      },
    ],
    specTableColumns: ['Parameter', 'Details', 'Specification'],
    specTableRows: [
      { Parameter: 'Machine Model', Details: 'Jupiter HDM 800', Specification: 'Hollow & Solid Block Machine' },
      { Parameter: 'Machine Type', Details: 'Block Making Machine', Specification: 'Hollow & Solid Blocks' },
      { Parameter: 'Production Capacity', Details: '80–90', Specification: 'Strokes per Hour' },
      { Parameter: 'Power', Details: '24 HP', Specification: '3 Phase' },
      { Parameter: 'Ram Vibrator', Details: '3 HP × 2', Specification: '2 Nos' },
      { Parameter: 'Mould Vibrator', Details: '5 HP × 2', Specification: '2 Nos' },
      { Parameter: 'Hydraulic System', Details: '7.5 HP × 1', Specification: '1 No' },
      { Parameter: 'Vibration Frequency', Details: '6,000', Specification: 'VPM' },
      { Parameter: 'Vibration Amplitude', Details: '1–2 mm', Specification: 'Adjustable' },
      { Parameter: 'Moulding Area', Details: '860–900 mm', Specification: 'As Specified' },
      { Parameter: 'Block Size', Details: '200 × 200 × 400 mm', Specification: '16 Blocks/Stroke' },
      { Parameter: 'Block Size', Details: '150 × 200 × 400 mm', Specification: '10 Blocks/Stroke' },
      { Parameter: 'Block Size', Details: '100 × 200 × 400 mm', Specification: '8 Blocks/Stroke' },
      { Parameter: 'Block Types', Details: 'Hollow Blocks', Specification: 'Solid Blocks' },
    ],
    keyFeatures: [
      'Jupiter HDM 800 hollow and solid block making machine with a production capacity of 80 to 90 strokes per hour.',
      '24 HP three-phase power configuration with two 3 HP ram vibrators and two 5 HP mould vibrators.',
      'High-frequency vibration system delivering 6,000 VPM with an adjustable amplitude of 1–2 mm.',
      '7.5 HP hydraulic system supporting three block configurations with 16, 10 and 8 blocks per stroke.',
    ],
    advantages: [
      {
        id: 'adv-hdm800-1',
        title: 'Versatile Block Manufacturing',
        description:
          'Supports the production of hollow and solid blocks in three different sizes, allowing manufacturers to accommodate varied construction material requirements.',
        displayOrder: 1,
      },
      {
        id: 'adv-hdm800-2',
        title: 'High-Frequency Vibration Performance',
        description:
          'Dual ram vibrators and dual mould vibrators provide a vibration frequency of 6,000 VPM to support the block moulding process.',
        displayOrder: 2,
      },
      {
        id: 'adv-hdm800-3',
        title: 'Flexible Production Capacity',
        description:
          'Offers production of 8 to 16 blocks per stroke depending on mould size, with an operating capacity of 80 to 90 strokes per hour.',
        displayOrder: 3,
      },
      {
        id: 'adv-hdm800-4',
        title: 'Adjustable Hydraulic & Vibration Operation',
        description:
          'Combines a 7.5 HP hydraulic system with adjustable vibration amplitude to support controlled block manufacturing across different mould configurations.',
        displayOrder: 4,
      },
    ],
    galleryImages: [],
  },
};

export const DEFAULT_PRODUCT_DOUBLE_TRIPLE_VIBRATOR: DefaultCatalogProduct = {
  id: 'cmus_jupiter_double_triple_vibrator_model',
  name: 'Hollow & Solid Block Making Machine – Double & Triple Vibrator',
  slug: 'double-triple-vibrator-hollow-solid-block-making-machine',
  category: 'Hollow & Solid Block Machine',
  brandTag: 'JUPITER INDUSTRIES',
  description:
    'The Jupiter Double and Triple Vibrator Hollow & Solid Block Making Machine is designed for commercial concrete block manufacturing, offering two machine configurations to support different production requirements.\n\nBoth models deliver a production capacity of approximately 50 to 60 strokes per hour and operate with a hydraulic system that provides a specified pressure of 140 kg/cm².\n\nThe Double Vibrator Model features 6.5 HP total power, including a 3 HP hydraulic pump, 3 HP mould vibrator and 0.5 HP moving motor.\n\nThe Triple Vibrator Model operates with 7.5 HP total power and includes an additional 1 HP RAM vibrator, supporting its vibration and moulding operations.\n\nBoth machines feature an 860 × 600 mm mould area. The Triple Vibrator Model is specified for multiple block dimensions, including 4-inch, 6-inch and 8-inch configurations, with production outputs of 4 to 10 blocks per stroke depending on block size.\n\nWith hydraulic operation, vibration systems and multiple machine configurations, these machines provide solutions for hollow and solid concrete block manufacturing businesses.',
  capacity: '50–60 Strokes per Hour',
  capacityLabel: 'Production Capacity',
  power: 'Double Vibrator: 6.5 HP / Triple Vibrator: 7.5 HP',
  powerLabel: 'Total Connected Power',
  brickSize: '400 × 200 × 200 mm, 400 × 200 × 150 mm, 400 × 200 × 100 mm, 300 × 200 × 150 mm (sizes specified for Triple Vibrator)',
  brickSizeLabel: 'Brick / Mould Size',
  image: '/uploads/products/0a306a34-c9a0-44b3-b116-ec27ef2e36fc-1791953787793-740493539.png',
  imageUrl: '/uploads/products/0a306a34-c9a0-44b3-b116-ec27ef2e36fc-1791953787793-740493539.png',
  isActive: true,
  order: 9,
  specifications: {
    order: 9,
    status: 'Active',
    brandTag: 'JUPITER INDUSTRIES',
    capacity: '50–60 Strokes per Hour',
    capacityLabel: 'Production Capacity',
    power: 'Double Vibrator: 6.5 HP / Triple Vibrator: 7.5 HP',
    powerLabel: 'Total Connected Power',
    brickSize: '400 × 200 × 200 mm, 400 × 200 × 150 mm, 400 × 200 × 100 mm, 300 × 200 × 150 mm (sizes specified for Triple Vibrator)',
    brickSizeLabel: 'Brick / Mould Size',
    metaTitle: 'Double & Triple Vibrator Block Machine | Jupiter Industries',
    metaDescription:
      "Explore Jupiter Industries' Double & Triple Vibrator Hollow and Solid Block Making Machine with hydraulic operation, 140 kg/cm² pressure and 50–60 strokes/hour.",
    focusKeyword: 'Double and Triple Vibrator Hollow and Solid Block Making Machine',
    secondaryKeywords:
      'Hollow Block Making Machine, Solid Block Making Machine, Double Vibrator Block Machine, Triple Vibrator Block Machine, Hydraulic Block Making Machine, Concrete Block Making Machine, Block Making Machine Manufacturer',
    featureBadges: [
      'Double & Triple Vibrator',
      '50–60 Strokes/Hour',
      '140 kg/cm² Pressure',
      '860 × 600 mm Mould Area',
    ],
    highlights: [
      {
        id: 'hl-dtv-1',
        title: 'Double & Triple Vibrator Options',
        description:
          'Available in 6.5 HP double vibrator and 7.5 HP triple vibrator configurations to accommodate different block manufacturing requirements.',
        displayOrder: 1,
      },
      {
        id: 'hl-dtv-2',
        title: 'Hydraulic Pressing Performance',
        description:
          'Both models feature a 3 HP hydraulic pump operating at 1,400 RPM with a specified hydraulic pressure of 140 kg/cm².',
        displayOrder: 2,
      },
      {
        id: 'hl-dtv-3',
        title: 'Efficient Block Production Capacity',
        description:
          'Supports 50 to 60 strokes per hour with an 860 × 600 mm mould area for commercial hollow and solid block production.',
        displayOrder: 3,
      },
      {
        id: 'hl-dtv-4',
        title: 'Multiple Block Size Configurations',
        description:
          'The Triple Vibrator Model supports four specified block size configurations, producing between 4 and 10 blocks per stroke depending on the mould.',
        displayOrder: 4,
      },
    ],
    specTableColumns: ['Parameter', 'Double Vibrator', 'Triple Vibrator'],
    specTableRows: [
      { Parameter: 'Machine Type', 'Double Vibrator': 'Hollow & Solid Block Making Machine', 'Triple Vibrator': 'Hollow & Solid Block Making Machine' },
      { Parameter: 'Total Power', 'Double Vibrator': '6.5 HP', 'Triple Vibrator': '7.5 HP' },
      { Parameter: 'Hydraulic Pump', 'Double Vibrator': '3 HP / 1400 RPM', 'Triple Vibrator': '3 HP / 1400 RPM' },
      { Parameter: 'RAM Vibrator', 'Double Vibrator': 'Not Specified', 'Triple Vibrator': '1 HP / 2800 RPM' },
      { Parameter: 'Mould Vibrator', 'Double Vibrator': '3 HP / 2800 RPM', 'Triple Vibrator': '3 HP / 2800 RPM' },
      { Parameter: 'Moving Motor', 'Double Vibrator': '0.5 HP / 1440 RPM', 'Triple Vibrator': '0.5 HP / 1440 RPM' },
      { Parameter: 'Hydraulic Pressure', 'Double Vibrator': '140 kg/cm²', 'Triple Vibrator': '140 kg/cm²' },
      { Parameter: 'Mould Area', 'Double Vibrator': '860 × 600 mm', 'Triple Vibrator': '860 × 600 mm' },
      { Parameter: 'Production Capacity', 'Double Vibrator': '50–60 Strokes/Hour', 'Triple Vibrator': '50–60 Strokes/Hour' },
      { Parameter: 'Block Size – 8 Inch', 'Double Vibrator': 'Not Specified', 'Triple Vibrator': '400 × 200 × 200 mm' },
      { Parameter: 'Blocks per Stroke – 8 Inch', 'Double Vibrator': 'Not Specified', 'Triple Vibrator': '4 Blocks' },
      { Parameter: 'Block Size – 6 Inch', 'Double Vibrator': 'Not Specified', 'Triple Vibrator': '400 × 200 × 150 mm' },
      { Parameter: 'Blocks per Stroke – 6 Inch', 'Double Vibrator': 'Not Specified', 'Triple Vibrator': '5 Blocks' },
      { Parameter: 'Block Size – 4 Inch', 'Double Vibrator': 'Not Specified', 'Triple Vibrator': '400 × 200 × 100 mm' },
      { Parameter: 'Blocks per Stroke – 4 Inch', 'Double Vibrator': 'Not Specified', 'Triple Vibrator': '8 Blocks' },
      { Parameter: 'Additional Block Size – 6 Inch', 'Double Vibrator': 'Not Specified', 'Triple Vibrator': '300 × 200 × 150 mm' },
      { Parameter: 'Blocks per Stroke – Additional 6 Inch', 'Double Vibrator': 'Not Specified', 'Triple Vibrator': '10 Blocks' },
    ],
    keyFeatures: [
      'Available in double vibrator and triple vibrator configurations with 6.5 HP and 7.5 HP total power respectively.',
      'Hydraulic pressing system featuring a 3 HP pump, 140 kg/cm² pressure and an 860 × 600 mm mould area.',
      'Production capacity of 50 to 60 strokes per hour with a 3 HP mould vibrator operating at 2,800 RPM in both models.',
      'Triple Vibrator Model includes an additional 1 HP RAM vibrator and supports multiple block sizes with 4 to 10 blocks per stroke.',
    ],
    advantages: [
      {
        id: 'adv-dtv-1',
        title: 'Flexible Machine Configurations',
        description:
          'Choose between double vibrator and triple vibrator models based on hydraulic power, vibration requirements and block manufacturing needs.',
        displayOrder: 1,
      },
      {
        id: 'adv-dtv-2',
        title: 'Effective Hydraulic Pressing',
        description:
          'A 3 HP hydraulic pump with 140 kg/cm² pressure supports the block moulding and compression process in both models.',
        displayOrder: 2,
      },
      {
        id: 'adv-dtv-3',
        title: 'Versatile Block Size Production',
        description:
          'The Triple Vibrator Model supports multiple 4-inch, 6-inch and 8-inch block configurations, offering flexibility for different construction material requirements.',
        displayOrder: 3,
      },
      {
        id: 'adv-dtv-4',
        title: 'Consistent Production Capacity',
        description:
          'Both models support 50 to 60 strokes per hour, with dedicated vibration and moving motors for their respective machine operations.',
        displayOrder: 4,
      },
    ],
    galleryImages: [],
  },
};

export const DEFAULT_PRODUCT_JE_PBT2: DefaultCatalogProduct = {
  id: 'cmus_jupiter_je_pbt2_model',
  name: 'Jupiter JE PBT2 – Paver Block Making Machine',
  slug: 'je-pbt2-paver-block-making-machine',
  category: 'Paver Block Making Machine',
  brandTag: 'JUPITER INDUSTRIES',
  description:
    'The Jupiter JE PBT2 Paver Block Making Machine is designed for commercial concrete paver block and tile manufacturing, providing a vibration-based moulding system for production requirements.\n\nEquipped with a 3 + 2 HP motor configuration, the machine offers a production capacity of approximately 2,000 square feet per shift, making it suitable for paver block manufacturing operations.\n\nThe machine features a 600 × 600 mm moulding area and an 835 × 3000 mm vibrating table to support the paver forming process.\n\nIts vibration-based movement system operates with manual intervention and uses rubber or PVC moulds positioned on the table during production.\n\nThe forming system supports tiles with a maximum height of 100 mm, providing flexibility for different paver block manufacturing requirements.\n\nWith its vibrating table arrangement, mould compatibility and specified production capacity, the Jupiter JE PBT2 offers a practical solution for businesses involved in concrete paving block and tile production.',
  capacity: '2,000 Sq. Ft. per Shift',
  capacityLabel: 'Production Capacity',
  power: '3 + 2 HP (Specified Motor Capacity)',
  powerLabel: 'Total Connected Power',
  brickSize: '600 × 600 mm Moulding Area',
  brickSizeLabel: 'Brick / Mould Size',
  image: '/uploads/products/jupiter-je-pbt2-paver-block-machine.jpg',
  imageUrl: '/uploads/products/jupiter-je-pbt2-paver-block-machine.jpg',
  isActive: true,
  order: 10,
  specifications: {
    order: 10,
    status: 'Active',
    brandTag: 'JUPITER INDUSTRIES',
    capacity: '2,000 Sq. Ft. per Shift',
    capacityLabel: 'Production Capacity',
    power: '3 + 2 HP (Specified Motor Capacity)',
    powerLabel: 'Total Connected Power',
    brickSize: '600 × 600 mm Moulding Area',
    brickSizeLabel: 'Brick / Mould Size',
    metaTitle: 'JE PBT2 Paver Block Making Machine | Jupiter Industries',
    metaDescription:
      'Explore the Jupiter JE PBT2 Paver Block Making Machine with a vibrating table, 600 × 600 mm moulding area and production capacity of 2,000 sq. ft. per shift.',
    focusKeyword: 'JE PBT2 Paver Block Making Machine',
    secondaryKeywords:
      'Paver Block Making Machine, Concrete Paver Block Machine, Vibrating Table Paver Machine, Paver Tile Making Machine, Rubber Mould Paver Block Machine, Paver Block Manufacturing Machine, Paver Block Machine Manufacturer',
    featureBadges: [
      '2,000 Sq. Ft./Shift',
      '3 + 2 HP Motor Capacity',
      'Vibrating Table System',
      '100 mm Maximum Tile Height',
    ],
    highlights: [
      {
        id: 'hl-pbt2-1',
        title: 'Efficient Paver Block Production',
        description:
          'Delivers a production capacity of approximately 2,000 square feet per shift to support commercial paver block and tile manufacturing requirements.',
        displayOrder: 1,
      },
      {
        id: 'hl-pbt2-2',
        title: 'Vibrating Table Moulding System',
        description:
          'Features an 835 × 3000 mm vibrating table and 600 × 600 mm moulding area to support vibration-based paver block formation.',
        displayOrder: 2,
      },
      {
        id: 'hl-pbt2-3',
        title: 'Rubber & PVC Mould Compatibility',
        description:
          'Designed for use with rubber or PVC moulds during the vibration-based forming process, supporting different paver manufacturing requirements.',
        displayOrder: 3,
      },
      {
        id: 'hl-pbt2-4',
        title: '3 + 2 HP Motor Configuration',
        description:
          'Equipped with a specified 3 + 2 HP motor capacity and vibration-based movement with manual intervention.',
        displayOrder: 4,
      },
    ],
    specTableColumns: ['Parameter', 'Details', 'Specification'],
    specTableRows: [
      { Parameter: 'Machine Model', Details: 'Jupiter JE PBT2', Specification: 'Paver Block Making Machine' },
      { Parameter: 'Machine Type', Details: 'Vibrating Table Machine', Specification: 'Paver Block Production' },
      { Parameter: 'Production Capacity', Details: '2,000 Sq. Ft.', Specification: 'Per Shift' },
      { Parameter: 'Motor Capacity', Details: '3 + 2 HP', Specification: '—' },
      { Parameter: 'Moulding Area', Details: '600 × 600 mm', Specification: '—' },
      { Parameter: 'Vibrating Table Size', Details: '835 × 3000 mm', Specification: '—' },
      { Parameter: 'Method of Movement', Details: 'Vibration-Based', Specification: 'Manual Intervention' },
      { Parameter: 'Mould Type', Details: 'Rubber / PVC', Specification: '—' },
      { Parameter: 'Moulding Arrangement', Details: 'Rubber Table', Specification: '—' },
      { Parameter: 'Maximum Tile Height', Details: '100 mm', Specification: '—' },
    ],
    keyFeatures: [
      'Jupiter JE PBT2 Paver Block Making Machine with a production capacity of approximately 2,000 square feet per shift.',
      '3 + 2 HP motor configuration with an 835 × 3000 mm vibrating table for paver block manufacturing.',
      '600 × 600 mm moulding area with rubber and PVC mould compatibility for vibration-based forming operations.',
      'Supports tiles up to 100 mm in height with vibration-based movement and manual intervention.',
    ],
    advantages: [
      {
        id: 'adv-pbt2-1',
        title: 'Commercial Paver Block Production',
        description:
          'Supports paver block and tile manufacturing with a production capacity of up to 2,000 square feet per shift for commercial operations.',
        displayOrder: 1,
      },
      {
        id: 'adv-pbt2-2',
        title: 'Effective Vibration-Based Moulding',
        description:
          'The vibrating table system supports the forming process using rubber or PVC moulds, helping manage paver block production.',
        displayOrder: 2,
      },
      {
        id: 'adv-pbt2-3',
        title: 'Flexible Moulding Applications',
        description:
          'A 600 × 600 mm moulding area and support for tiles up to 100 mm in height accommodate different paver block manufacturing requirements.',
        displayOrder: 3,
      },
      {
        id: 'adv-pbt2-4',
        title: 'Practical Machine Operation',
        description:
          'Combines a 3 + 2 HP motor configuration with vibration-based movement and manual intervention for paver block production.',
        displayOrder: 4,
      },
    ],
    galleryImages: [],
  },
};

export const DEFAULT_PRODUCT_MANUAL_INTERLOCK: DefaultCatalogProduct = {
  id: 'cmus_jupiter_manual_interlock_model',
  name: 'Manual Interlock Block Making Machine – 30 Ton Hydraulic Pressing System',
  slug: 'manual-interlock-block-making-machine',
  category: 'Interlocking Block Making Machine',
  brandTag: 'JUPITER INDUSTRIES',
  description:
    'The Jupiter Manual Interlock Block Making Machine is a hydraulic interlocking brick manufacturing machine designed for commercial block production and construction material manufacturing applications.\n\nThe machine offers a production capacity of approximately 150 to 200 interlocking blocks per hour, with a daily production range of 1,000 to 1,500 blocks.\n\nIt features two 30 ton bottom pressing units and two 7 ton door cylinders, supporting the hydraulic pressing and moulding process.\n\nThe machine is equipped with a 300-litre hydraulic power pack unit powered by a 10 HP Crompton motor.\n\nIts double-sided die operating method uses EN31 grade die material with a specified die depth of 12 mm.\n\nThe machine supports two interlocking brick sizes, 12 × 6 × 5 inches and 12 × 8 × 5 inches, to meet different construction requirements.\n\nWith manual operation and an automatic push-button function, the Jupiter Interlock Block Making Machine offers a practical solution for interlocking brick manufacturing businesses.',
  capacity: '150–200 Blocks per Hour / 1,000–1,500 Blocks per Day',
  capacityLabel: 'Production Capacity',
  power: 'Not specified (Power Pack Motor: 10 HP)',
  powerLabel: 'Total Connected Power',
  brickSize: '12 × 6 × 5 inches / 12 × 8 × 5 inches',
  brickSizeLabel: 'Brick / Mould Size',
  image: '/uploads/products/jupiter-manual-interlock-block-machine.jpg',
  imageUrl: '/uploads/products/jupiter-manual-interlock-block-machine.jpg',
  isActive: true,
  order: 11,
  specifications: {
    order: 11,
    status: 'Active',
    brandTag: 'JUPITER INDUSTRIES',
    capacity: '150–200 Blocks per Hour / 1,000–1,500 Blocks per Day',
    capacityLabel: 'Production Capacity',
    power: 'Not specified (Power Pack Motor: 10 HP)',
    powerLabel: 'Total Connected Power',
    brickSize: '12 × 6 × 5 inches / 12 × 8 × 5 inches',
    brickSizeLabel: 'Brick / Mould Size',
    metaTitle: 'Manual Interlock Block Making Machine | Jupiter Industries',
    metaDescription:
      "Explore Jupiter Industries' Manual Interlock Block Making Machine with 30 ton bottom pressing, 10 HP power pack and production of 150–200 blocks per hour.",
    focusKeyword: 'Manual Interlock Block Making Machine',
    secondaryKeywords:
      'Interlocking Brick Making Machine, Manual Interlocking Block Machine, Hydraulic Interlock Brick Machine, Interlocking Block Manufacturing Machine, 30 Ton Interlock Block Machine, Interlock Brick Machine Manufacturer',
    featureBadges: [
      '30 Ton Bottom Pressing',
      '150–200 Blocks/Hour',
      'Double-Sided Die System',
      '10 HP Hydraulic Power Pack',
    ],
    highlights: [
      {
        id: 'hl-mi-1',
        title: '30 Ton Hydraulic Bottom Pressing',
        description:
          'Features two 30 ton bottom pressing units to support hydraulic compression during interlocking block manufacturing.',
        displayOrder: 1,
      },
      {
        id: 'hl-mi-2',
        title: 'Efficient Interlocking Block Production',
        description:
          'Produces approximately 150 to 200 interlocking blocks per hour, with a daily output of 1,000 to 1,500 blocks.',
        displayOrder: 2,
      },
      {
        id: 'hl-mi-3',
        title: 'Double-Sided Die System',
        description:
          'Features a double-sided die operating method with EN31 grade material and a specified 12 mm die depth.',
        displayOrder: 3,
      },
      {
        id: 'hl-mi-4',
        title: '10 HP Hydraulic Power Pack',
        description:
          'Equipped with a 300-litre hydraulic power pack powered by a 10 HP Crompton motor, supporting machine pressing operations.',
        displayOrder: 4,
      },
    ],
    specTableColumns: ['Parameter', 'Details', 'Specification'],
    specTableRows: [
      { Parameter: 'Machine Model', Details: 'Manual Interlock Block Making Machine', Specification: 'Hydraulic' },
      { Parameter: 'Machine Type', Details: 'Interlocking Block Machine', Specification: 'Manual Operation' },
      { Parameter: 'Hourly Production', Details: '150–200', Specification: 'Blocks per Hour' },
      { Parameter: 'Daily Production', Details: '1,000–1,500', Specification: 'Blocks per Day' },
      { Parameter: 'Brick Size – Type 1', Details: '12 × 6 × 5 Inches', Specification: '1 No.' },
      { Parameter: 'Brick Size – Type 2', Details: '12 × 8 × 5 Inches', Specification: '1 No.' },
      { Parameter: 'Bottom Pressing', Details: '30 Tons', Specification: '2 Nos' },
      { Parameter: 'Door Cylinder', Details: '7 Tons', Specification: '2 Nos' },
      { Parameter: 'Power Pack Capacity', Details: '300 Litres', Specification: 'Hydraulic Power Pack' },
      { Parameter: 'Power Pack Motor', Details: '10 HP', Specification: 'Crompton' },
      { Parameter: 'Die Operating Method', Details: 'Double-Sided Die', Specification: '—' },
      { Parameter: 'Die Material', Details: 'EN31 Grade', Specification: '—' },
      { Parameter: 'Die Depth', Details: '12 mm', Specification: '—' },
      { Parameter: 'Operating System', Details: 'Manual', Specification: '—' },
      { Parameter: 'Push Button', Details: 'Automatic', Specification: '—' },
    ],
    keyFeatures: [
      'Manual interlocking block making machine with a production capacity of 150 to 200 blocks per hour and 1,000 to 1,500 blocks per day.',
      'Two 30 ton bottom pressing units and two 7 ton door cylinders for hydraulic interlocking brick manufacturing.',
      '300-litre hydraulic power pack equipped with a 10 HP Crompton motor.',
      'Double-sided EN31 grade die system with 12 mm die depth, supporting 12 × 6 × 5 inch and 12 × 8 × 5 inch brick sizes.',
    ],
    advantages: [
      {
        id: 'adv-mi-1',
        title: 'Efficient Interlocking Block Production',
        description:
          'Supports commercial interlocking brick manufacturing with an hourly capacity of up to 200 blocks and a daily production range of 1,000 to 1,500 blocks.',
        displayOrder: 1,
      },
      {
        id: 'adv-mi-2',
        title: 'Heavy-Duty Hydraulic Pressing',
        description:
          'Two 30 ton bottom pressing units and two 7 ton door cylinders support the hydraulic compression and moulding process.',
        displayOrder: 2,
      },
      {
        id: 'adv-mi-3',
        title: 'Durable Double-Sided Die Construction',
        description:
          'The EN31 grade double-sided die arrangement with a specified depth of 12 mm supports interlocking block manufacturing requirements.',
        displayOrder: 3,
      },
      {
        id: 'adv-mi-4',
        title: 'Practical Manual Operation',
        description:
          'Combines manual machine operation with an automatic push-button function and a 10 HP hydraulic power pack for controlled interlocking block production.',
        displayOrder: 4,
      },
    ],
    galleryImages: [],
  },
};

export const DEFAULT_PRODUCT_AUTO_INTERLOCK: DefaultCatalogProduct = {
  id: 'cmus_jupiter_auto_interlock_model',
  name: 'Automatic Interlock Block Making Machine – Vertical Twin Station Model',
  slug: 'automatic-interlock-block-making-machine',
  category: 'Interlocking Block Making Machine',
  brandTag: 'JUPITER INDUSTRIES',
  description:
    'The Jupiter Automatic Interlock Block Making Machine is a hydraulically operated, vertical twin-station machine designed for commercial and industrial interlocking brick manufacturing.\n\nEquipped with an automatic PLC control system, the machine delivers a production capacity of approximately 200 to 250 interlocking blocks per hour, with a daily production range of 1,400 to 1,600 blocks.\n\nThe machine features two 30-ton bottom pressing units and one 25-ton top pressing cylinder, supporting hydraulic compression during the interlocking block manufacturing process.\n\nIt is powered by a 550-litre hydraulic power pack with a 15 HP Crompton motor, providing power for the machine\'s hydraulic operations.\n\nThe vertical twin-station configuration includes a double-sided die system manufactured using EN31-grade material for interlocking block production.\n\nAn 8-ton feeding cylinder with a 400 kg storage hopper supports material feeding into the production system.\n\nThe machine accommodates two interlocking brick dimensions, 12 × 6 × 5 inches and 12 × 8 × 5 inches, making it suitable for different interlocking brick manufacturing requirements.\n\nWith PLC automation, hydraulic pressing and a twin-station arrangement, the Jupiter Automatic Interlock Block Making Machine offers a production solution for construction material manufacturers.',
  capacity: '200–250 Blocks per Hour / 1,400–1,600 Blocks per Day',
  capacityLabel: 'Production Capacity',
  power: 'Not specified (Power Pack Motor: 15 HP)',
  powerLabel: 'Total Connected Power',
  brickSize: '12 × 6 × 5 Inches / 12 × 8 × 5 Inches',
  brickSizeLabel: 'Brick / Mould Size',
  image: '/uploads/products/jupiter-automatic-interlock-block-machine.jpg',
  imageUrl: '/uploads/products/jupiter-automatic-interlock-block-machine.jpg',
  isActive: true,
  order: 12,
  specifications: {
    order: 12,
    status: 'Active',
    brandTag: 'JUPITER INDUSTRIES',
    capacity: '200–250 Blocks per Hour / 1,400–1,600 Blocks per Day',
    capacityLabel: 'Production Capacity',
    power: 'Not specified (Power Pack Motor: 15 HP)',
    powerLabel: 'Total Connected Power',
    brickSize: '12 × 6 × 5 Inches / 12 × 8 × 5 Inches',
    brickSizeLabel: 'Brick / Mould Size',
    metaTitle: 'Automatic Interlock Block Making Machine | Jupiter Industries',
    metaDescription:
      "Explore Jupiter Industries' Automatic Interlock Block Making Machine with PLC control, twin-station design, hydraulic pressing and 200–250 blocks per hour.",
    focusKeyword: 'Automatic Interlock Block Making Machine',
    secondaryKeywords:
      'Automatic Interlocking Brick Machine, Vertical Twin Station Block Machine, Hydraulic Interlock Block Machine, PLC Controlled Interlock Machine, Interlocking Brick Making Machine, Twin Station Hydraulic Press, Interlock Block Machine Manufacturer',
    featureBadges: [
      'Vertical Twin Station Machine',
      '200–250 Blocks/Hour',
      'Automatic PLC Control',
      'Dual Hydraulic Pressing System',
    ],
    highlights: [
      {
        id: 'hl-ai-1',
        title: 'Automatic Vertical Twin Station System',
        description:
          'Features a vertical twin-station configuration with PLC-based automatic control to support interlocking brick manufacturing operations.',
        displayOrder: 1,
      },
      {
        id: 'hl-ai-2',
        title: 'Heavy-Duty Hydraulic Pressing',
        description:
          'Equipped with two 30-ton bottom pressing units and one 25-ton top pressing cylinder for hydraulic block compression.',
        displayOrder: 2,
      },
      {
        id: 'hl-ai-3',
        title: 'High-Capacity Brick Production',
        description:
          'Delivers approximately 200 to 250 interlocking blocks per hour, with a daily production capacity of 1,400 to 1,600 blocks.',
        displayOrder: 3,
      },
      {
        id: 'hl-ai-4',
        title: '550-Litre Hydraulic Power Pack',
        description:
          'Features a 550-litre power pack with a 15 HP Crompton motor and an 8-ton feeding cylinder supported by a 400 kg storage hopper.',
        displayOrder: 4,
      },
    ],
    specTableColumns: ['Parameter', 'Details', 'Specification'],
    specTableRows: [
      { Parameter: 'Machine Model', Details: 'Automatic Interlock Block Making Machine', Specification: 'Vertical Twin Station' },
      { Parameter: 'Machine Type', Details: 'Automatic Hydraulic', Specification: 'Interlocking Block Machine' },
      { Parameter: 'Machine Configuration', Details: 'Vertical Type', Specification: 'Twin Station' },
      { Parameter: 'Hourly Production', Details: '200–250', Specification: 'Blocks per Hour' },
      { Parameter: 'Daily Production', Details: '1,400–1,600', Specification: 'Blocks per Day' },
      { Parameter: 'Bottom Pressing', Details: '30 Tons', Specification: '2 Nos' },
      { Parameter: 'Top Pressing Cylinder', Details: '25 Tons', Specification: '1 No' },
      { Parameter: 'Power Pack Capacity', Details: '550 Litres', Specification: 'Hydraulic Power Pack' },
      { Parameter: 'Power Pack Motor', Details: '15 HP', Specification: 'Crompton' },
      { Parameter: 'Control System', Details: 'PLC', Specification: 'Automatic' },
      { Parameter: 'Die Operating Method', Details: 'Double-Sided Die', Specification: '—' },
      { Parameter: 'Die Material', Details: 'EN31 Grade', Specification: '—' },
      { Parameter: 'Feeding Cylinder', Details: '8 Tons', Specification: '—' },
      { Parameter: 'Storage Hopper Capacity', Details: '400 kg', Specification: '—' },
      { Parameter: 'Brick Size – Type 1', Details: '12 × 6 × 5 Inches', Specification: '1 No.' },
      { Parameter: 'Brick Size – Type 2', Details: '12 × 8 × 5 Inches', Specification: '1 No.' },
    ],
    keyFeatures: [
      'Automatic vertical twin-station interlock block making machine with a production capacity of 200 to 250 blocks per hour.',
      'Heavy-duty hydraulic pressing system featuring two 30-ton bottom pressing units and one 25-ton top pressing cylinder.',
      '550-litre hydraulic power pack equipped with a 15 HP Crompton motor and PLC-based automatic control system.',
      'Double-sided EN31-grade die system with an 8-ton feeding cylinder, 400 kg storage hopper and support for two interlocking brick sizes.',
    ],
    advantages: [
      {
        id: 'adv-ai-1',
        title: 'Automated Interlocking Brick Production',
        description:
          'PLC-based automatic control and a vertical twin-station configuration support efficient machine operations with a production capacity of up to 250 blocks per hour.',
        displayOrder: 1,
      },
      {
        id: 'adv-ai-2',
        title: 'Powerful Hydraulic Pressing System',
        description:
          'Two 30-ton bottom pressing units and a 25-ton top pressing cylinder support effective hydraulic compression during interlocking block manufacturing.',
        displayOrder: 2,
      },
      {
        id: 'adv-ai-3',
        title: 'Efficient Material Feeding System',
        description:
          'The 8-ton feeding cylinder and 400 kg storage hopper support organised raw material feeding for the interlocking block production process.',
        displayOrder: 3,
      },
      {
        id: 'adv-ai-4',
        title: 'Durable Die & Versatile Block Production',
        description:
          'The EN31-grade double-sided die arrangement supports manufacturing of 12 × 6 × 5 inch and 12 × 8 × 5 inch interlocking blocks for different construction requirements.',
        displayOrder: 4,
      },
    ],
    galleryImages: [],
  },
};

export const DEFAULT_PRODUCT_JI_BATCHING_PLANT: DefaultCatalogProduct = {
  id: 'cmus_jupiter_ji_batching_plant_model',
  name: 'Jupiter JI Batching Plant – 3 & 4 Bin Models',
  slug: '3-4-bin-batching-plant',
  category: 'Batching Plant',
  brandTag: 'JUPITER INDUSTRIES',
  description:
    'The Jupiter JI 3 & 4 Bin Batching Plant is an industrial raw material storage and batching system designed to support fly ash brick and concrete block manufacturing operations.\n\nAvailable in three-bin and four-bin configurations, the plant provides flexible storage arrangements for handling different raw materials used in brick manufacturing.\n\nThe system features a PLC control mechanism that supports controlled material handling and organised batching operations.\n\nDesigned for materials such as fly ash, quarry waste, 6 mm jelly stone and cement, the Jupiter JI Batching Plant helps organise raw material supply during manufacturing.\n\nIts multiple storage bin configurations allow manufacturers to select a suitable arrangement based on their material handling and production requirements.\n\nWith PLC-based control and dedicated material storage compartments, the Jupiter JI Batching Plant provides a practical solution for managing raw materials in brick manufacturing facilities.',
  capacity: '',
  capacityLabel: 'Production Capacity',
  power: '',
  powerLabel: 'Total Connected Power',
  brickSize: '',
  brickSizeLabel: 'Brick / Mould Size',
  image: '/uploads/products/jupiter-ji-batching-plant.png',
  imageUrl: '/uploads/products/jupiter-ji-batching-plant.png',
  isActive: true,
  order: 1,
  specifications: {
    order: 1,
    status: 'Active',
    brandTag: 'JUPITER INDUSTRIES',
    capacity: '',
    capacityLabel: 'Production Capacity',
    power: '',
    powerLabel: 'Total Connected Power',
    brickSize: '',
    brickSizeLabel: 'Brick / Mould Size',
    storageConfiguration: '3 Bin / 4 Bin',
    storageConfigurationLabel: 'Storage Configuration',
    metaTitle: '3 & 4 Bin Batching Plant Manufacturer | Jupiter Industries',
    metaDescription:
      "Explore Jupiter Industries' 3 & 4 Bin Batching Plant with PLC control and storage for fly ash, quarry waste, 6 mm jelly stone and cement.",
    focusKeyword: '3 & 4 Bin Batching Plant',
    secondaryKeywords:
      'Three Bin Batching Plant, Four Bin Batching Plant, Fly Ash Brick Batching Plant, PLC Controlled Batching Plant, Raw Material Batching Plant, Industrial Batching Plant Manufacturer, Batching Plant in Coimbatore',
    featureBadges: [
      '3 & 4 Bin Storage Options',
      'PLC Control System',
      'Multi-Material Storage',
      'Fly Ash Brick Plant Support',
    ],
    highlights: [
      {
        title: '3 & 4 Bin Storage Configurations',
        description:
          'Available in three-bin and four-bin configurations to accommodate different raw material storage requirements for brick manufacturing plants.',
      },
      {
        title: 'PLC-Controlled Batching System',
        description:
          'Features a PLC control system to support controlled material handling and batching operations.',
      },
      {
        title: 'Multiple Raw Material Compatibility',
        description:
          'Designed to handle fly ash, quarry waste, 6 mm jelly stone and cement used in brick and block manufacturing.',
      },
      {
        title: 'Organised Material Handling',
        description:
          'Multiple storage compartments support the organised storage and supply of raw materials for brick manufacturing operations.',
      },
    ],
    specTableColumns: ['Parameter', 'Details', 'Specification'],
    specTableRows: [
      { Parameter: 'Machine Model', Details: 'JI Patching Plant', Specification: '3 & 4 Bin Models' },
      { Parameter: 'Machine Type', Details: 'Raw Material Batching Plant', Specification: 'Fly Ash Brick Plant Equipment' },
      { Parameter: 'Storage Configuration', Details: '3 Bin', Specification: '4 Bin Option' },
      { Parameter: 'Control System', Details: 'PLC Control', Specification: '—' },
      { Parameter: 'Raw Material 1', Details: 'Fly Ash', Specification: '—' },
      { Parameter: 'Raw Material 2', Details: 'Quarry Waste', Specification: '—' },
      { Parameter: 'Raw Material 3', Details: '6 mm Jelly Stone', Specification: '—' },
      { Parameter: 'Raw Material 4', Details: 'Cement', Specification: '—' },
    ],
    keyFeatures: [
      'Available in three-bin and four-bin storage configurations for different raw material handling requirements.',
      'PLC control system supports controlled batching operations and organised material handling.',
      'Compatible with fly ash, quarry waste, 6 mm jelly stone and cement used in brick manufacturing.',
      'Multiple storage compartments support systematic raw material storage and supply for production plants.',
    ],
    advantages: [
      {
        title: 'Flexible Material Storage Options',
        description:
          'Three-bin and four-bin configurations allow manufacturers to select a storage arrangement based on their raw material handling requirements.',
      },
      {
        title: 'Controlled Batching Operations',
        description:
          'PLC-based controls support the management of material handling and batching activities within the production workflow.',
      },
      {
        title: 'Multiple Raw Material Compatibility',
        description:
          'Supports the storage and handling of fly ash, quarry waste, 6 mm jelly stone and cement for brick manufacturing applications.',
      },
      {
        title: 'Organised Production Workflow',
        description:
          'Dedicated raw material storage compartments help maintain an organised material supply process for brick and block manufacturing facilities.',
      },
    ],
    galleryImages: [],
  },
};

export const DEFAULT_PRODUCT_JI_SILO: DefaultCatalogProduct = {
  id: 'cmus_jupiter_ji_silo_model',
  name: 'JI Fly Ash and Cement Silo – 60 & 100 Ton Storage System',
  slug: 'fly-ash-cement-silo-60-100-ton',
  category: 'Storage Silo',
  brandTag: 'JUPITER INDUSTRIES',
  description:
    'The Jupiter JI Fly Ash and Cement Silo is an industrial bulk material storage system designed for fly ash brick manufacturing plants, concrete production facilities and construction material processing operations.\n\nAvailable in 60 ton and 100 ton storage configurations, the silo provides bulk storage capacity for essential raw materials such as fly ash and cement.\n\nThe system features an air compressor-based operating arrangement to support material handling requirements in industrial production environments.\n\nThe supplied specifications also indicate a hydraulic lifting arrangement, supporting equipment handling requirements associated with the silo system.\n\nDesigned for manufacturers requiring dedicated fly ash and cement storage facilities, the Jupiter JI Silo offers two capacity options to accommodate different material storage requirements.\n\nWith its high-capacity storage configurations and air compressor system, the Jupiter Fly Ash and Cement Silo provides a practical solution for raw material management in brick and block manufacturing facilities.',
  capacity: '60 Ton / 100 Ton',
  capacityLabel: 'Storage Capacity',
  power: '',
  powerLabel: 'Total Connected Power',
  brickSize: '',
  brickSizeLabel: 'Brick / Mould Size',
  image: '/uploads/products/jupiter-ji-fly-ash-cement-silo.png',
  imageUrl: '/uploads/products/jupiter-ji-fly-ash-cement-silo.png',
  isActive: true,
  order: 1,
  specifications: {
    order: 1,
    status: 'Active',
    brandTag: 'JUPITER INDUSTRIES',
    capacity: '60 Ton / 100 Ton',
    capacityLabel: 'Storage Capacity',
    power: '',
    powerLabel: 'Total Connected Power',
    brickSize: '',
    brickSizeLabel: 'Brick / Mould Size',
    storageCapacity: '60 Ton / 100 Ton',
    operatingSystem: 'Air Compressor',
    rawMaterials: 'Fly Ash, Cement',
    metaTitle: 'Fly Ash & Cement Silo 60 & 100 Ton | Jupiter Industries',
    metaDescription:
      "Explore Jupiter Industries' Fly Ash and Cement Silo with 60 and 100 ton storage capacity, air compressor operation and hydraulic lifting system.",
    focusKeyword: 'Fly Ash and Cement Silo',
    secondaryKeywords:
      'Fly Ash Storage Silo, Cement Storage Silo, 60 Ton Cement Silo, 100 Ton Cement Silo, Industrial Cement Silo, Fly Ash Silo Manufacturer, Bulk Cement Storage System, Cement Silo Manufacturer in Coimbatore',
    featureBadges: [
      '60 & 100 Ton Capacity',
      'Air Compressor System',
      'Hydraulic Lifting Arrangement',
      'Fly Ash & Cement Storage',
    ],
    highlights: [
      {
        title: '60 & 100 Ton Storage Capacity',
        description:
          'Available in 60 ton and 100 ton configurations to accommodate different bulk material storage requirements in industrial manufacturing plants.',
      },
      {
        title: 'Air Compressor Operating System',
        description:
          'Features an air compressor-based running system to support material handling operations associated with silo storage.',
      },
      {
        title: 'Fly Ash & Cement Compatibility',
        description:
          'Designed for bulk storage of fly ash and cement used in brick manufacturing, concrete production and construction material processing.',
      },
      {
        title: 'Hydraulic Lifting Arrangement',
        description:
          "The specified hydraulic lifting arrangement supports the equipment's handling requirements, subject to confirmation of the manufacturer's configuration.",
      },
    ],
    specTableColumns: ['Parameter', 'Details', 'Specification'],
    specTableRows: [
      { Parameter: 'Machine Model', Details: 'JI Silos', Specification: 'Fly Ash & Cement' },
      { Parameter: 'Equipment Type', Details: 'Industrial Storage Silo', Specification: 'Bulk Material Storage' },
      { Parameter: 'Storage Capacity', Details: '60 Tons', Specification: '100 Tons Option' },
      { Parameter: 'Running System', Details: 'Air Compressor', Specification: '—' },
      { Parameter: 'Lifting Arrangement', Details: 'Hydraulic', Specification: 'Terminology to be Confirmed' },
      { Parameter: 'Raw Material 1', Details: 'Fly Ash', Specification: '—' },
      { Parameter: 'Raw Material 2', Details: 'Cement', Specification: '—' },
      { Parameter: 'Application', Details: 'Raw Material Storage', Specification: 'Brick & Block Manufacturing' },
    ],
    keyFeatures: [
      'Available in 60 ton and 100 ton storage capacity configurations for industrial fly ash and cement storage requirements.',
      'Air compressor-based operating system supporting material handling operations associated with silo storage.',
      'Hydraulic lifting arrangement specified for the silo equipment, with the exact configuration subject to confirmation.',
      'Suitable for bulk storage of fly ash and cement used in brick manufacturing and construction material production.',
    ],
    advantages: [
      {
        title: 'High-Capacity Bulk Material Storage',
        description:
          'Provides 60 ton and 100 ton storage options to support the bulk material requirements of commercial and industrial manufacturing facilities.',
      },
      {
        title: 'Air Compressor-Based Operation',
        description:
          'The air compressor running system supports the material handling requirements associated with fly ash and cement silo operations.',
      },
      {
        title: 'Flexible Storage Capacity Options',
        description:
          'Manufacturers can select between 60 ton and 100 ton silo configurations based on their production scale and raw material storage requirements.',
      },
      {
        title: 'Organised Raw Material Management',
        description:
          'Dedicated silo storage supports organised handling and availability of fly ash and cement for brick and block manufacturing operations.',
      },
    ],
    galleryImages: [],
  },
};

export const DEFAULT_PRODUCT_CONCRETE_MIXER: DefaultCatalogProduct = {
  id: 'cmus_jupiter_je_concrete_mixer_model',
  name: 'Jupiter JE Cement Concrete Mixer – 350 kg & 500 kg Models',
  slug: 'cement-concrete-mixer-350-500-kg',
  category: 'Concrete Mixer Machine',
  brandTag: 'JUPITER INDUSTRIES',
  description:
    'The Jupiter JE Cement Concrete Mixer is an industrial concrete mixing machine designed for preparing raw material mixtures used in fly ash brick manufacturing, concrete block production and construction material processing.\n\nAvailable in 350 kg and 500 kg capacity configurations, the machine offers different mixing options to accommodate commercial and industrial manufacturing requirements.\n\nThe mixer is specified with 15 HP and 20 HP power options, supporting material mixing operations based on the selected machine configuration.\n\nThe supplied specifications also indicate a hydraulic lifting arrangement, which is intended to support material handling during the mixing process.\n\nThe Jupiter Concrete Mixer is suitable for working with materials such as fly ash, iron oxide, sludge, quarry waste, 6 mm jelly stone and cement.\n\nWith multiple capacity options and compatibility with different construction materials, the Jupiter JE Cement Concrete Mixer provides a practical solution for brick manufacturing plants and concrete production facilities.',
  capacity: '350 kg / 500 kg',
  capacityLabel: 'Mixing Capacity',
  power: '15 HP / 20 HP (Depending on Model)',
  powerLabel: 'Total Connected Power',
  brickSize: '',
  brickSizeLabel: 'Brick / Mould Size',
  image: '/uploads/products/jupiter-je-cement-concrete-mixer.png',
  imageUrl: '/uploads/products/jupiter-je-cement-concrete-mixer.png',
  isActive: true,
  order: 1,
  specifications: {
    order: 1,
    status: 'Active',
    brandTag: 'JUPITER INDUSTRIES',
    capacity: '350 kg / 500 kg',
    capacityLabel: 'Mixing Capacity',
    power: '15 HP / 20 HP (Depending on Model)',
    powerLabel: 'Total Connected Power',
    brickSize: '',
    brickSizeLabel: 'Brick / Mould Size',
    mixingCapacity: '350 kg / 500 kg',
    metaTitle: 'Cement Concrete Mixer 350 & 500 kg | Jupiter Industries',
    metaDescription:
      "Explore Jupiter Industries' Cement Concrete Mixer with 350 kg and 500 kg capacity options, 15 HP and 20 HP power ratings, and a hydraulic lifting system.",
    focusKeyword: 'Cement Concrete Mixer Machine',
    secondaryKeywords:
      'Concrete Mixer Machine, Hydraulic Concrete Mixer, 350 kg Concrete Mixer, 500 kg Concrete Mixer, Industrial Concrete Mixing Machine, Fly Ash Brick Material Mixer, Concrete Mixer Manufacturer, Concrete Mixer Machine in Coimbatore',
    featureBadges: [
      '350 & 500 kg Capacity',
      '15 HP & 20 HP Options',
      'Hydraulic Lifting System',
      'Multi-Material Mixing',
    ],
    highlights: [
      {
        title: '350 kg & 500 kg Mixing Capacity',
        description:
          'Available in 350 kg and 500 kg configurations to accommodate different raw material mixing requirements in brick and block manufacturing plants.',
      },
      {
        title: '15 HP & 20 HP Power Options',
        description:
          'Features specified 15 HP and 20 HP power configurations to support industrial concrete and raw material mixing operations.',
      },
      {
        title: 'Hydraulic Lifting Arrangement',
        description:
          'The specified hydraulic lifting arrangement supports material handling requirements associated with the concrete mixing process.',
      },
      {
        title: 'Multiple Raw Material Compatibility',
        description:
          'Suitable for mixing fly ash, iron oxide, sludge, quarry waste, 6 mm jelly stone and cement used in construction material manufacturing.',
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
        title: 'Flexible Mixing Capacity Options',
        description:
          'Available in 350 kg and 500 kg configurations, allowing manufacturers to select a suitable mixer based on raw material processing requirements.',
      },
      {
        title: 'Industrial Mixing Performance',
        description:
          'The specified 15 HP and 20 HP power options support concrete and raw material mixing applications for brick and block manufacturing facilities.',
      },
      {
        title: 'Hydraulic Material Handling',
        description:
          'The hydraulic lifting arrangement is intended to assist with material handling during concrete mixing operations.',
      },
      {
        title: 'Versatile Raw Material Compatibility',
        description:
          'Supports mixing different construction materials, including fly ash, iron oxide, sludge, quarry waste, jelly stone and cement, for manufacturing applications.',
      },
    ],
    galleryImages: [],
  },
};

export const DEFAULT_PRODUCT_HAMMER_CRUSHER: DefaultCatalogProduct = {
  id: 'cmus_jupiter_ji_hammer_crusher_model',
  name: 'Jupiter JI Hammer Crusher – 6 Ton Material Crushing Machine',
  slug: 'ji-hammer-crusher-machine',
  category: 'Hammer Crusher / Material Processing Equipment',
  brandTag: 'JUPITER INDUSTRIES',
  description:
    'The Jupiter JI Hammer Crusher Machine is an industrial material crushing machine designed for processing materials into fine grains for construction material manufacturing applications.\n\nThe machine features a specified capacity of 6 tons and delivers a production output of approximately 2 tonnes per hour (TPH), making it suitable for commercial material processing requirements.\n\nEquipped with a 5 HP motor, the hammer crusher operates using a three-phase electrical supply with a Direct-On-Line (DOL) starter for motor operation.\n\nThe machine produces processed material in the 3–5 mm fine-grain size range, supporting material preparation requirements in brick manufacturing applications.\n\nWith a specified machine weight of 500 kg, the JI Hammer Crusher offers an industrial crushing configuration for material processing facilities.\n\nThe machine is presented for applications associated with fly ash brick and mud brick manufacturing, where appropriately sized processed materials may be required.\n\nThe Jupiter JI Hammer Crusher combines a 5 HP power requirement, 2 TPH production capacity and fine-grain output to support construction material processing operations.',
  capacity: '2 TPH (Tonnes per Hour)',
  capacityLabel: 'Production Capacity',
  power: '5 HP (Specified Power Requirement)',
  powerLabel: 'Total Connected Power',
  brickSize: '3–5 mm Fine Grains',
  brickSizeLabel: 'Output Material Size',
  image: '/uploads/products/jupiter-ji-hammer-crusher.png',
  imageUrl: '/uploads/products/jupiter-ji-hammer-crusher.png',
  isActive: true,
  order: 1,
  specifications: {
    order: 1,
    status: 'Active',
    brandTag: 'JUPITER INDUSTRIES',
    capacity: '2 TPH (Tonnes per Hour)',
    capacityLabel: 'Production Capacity',
    power: '5 HP (Specified Power Requirement)',
    powerLabel: 'Total Connected Power',
    brickSize: '3–5 mm Fine Grains',
    brickSizeLabel: 'Output Material Size',
    machineCapacity: '6 Tons',
    outputMaterialSize: '3–5 mm Fine Grains',
    metaTitle: 'JI Hammer Crusher Machine 5 HP | Jupiter Industries',
    metaDescription:
      "Explore Jupiter Industries' JI Hammer Crusher with 5 HP power, 2 TPH production, 3–5 mm fine grain output and 3-phase electrical operation.",
    focusKeyword: 'JI Hammer Crusher Machine',
    secondaryKeywords:
      'Hammer Crusher Machine, Industrial Hammer Crusher, 5 HP Hammer Crusher, 2 TPH Hammer Crusher, Brick Making Material Crusher, Fine Grain Crushing Machine, Hammer Crusher Manufacturer, Hammer Crusher Machine in Coimbatore',
    featureBadges: [
      '2 TPH Production Capacity',
      '5 HP Motor Power',
      '3–5 mm Fine Grain Output',
      '3-Phase Electrical Supply',
    ],
    highlights: [
      {
        title: '2 TPH Material Crushing Capacity',
        description:
          'Delivers a specified production capacity of 2 tonnes per hour to support material crushing and processing requirements in industrial manufacturing facilities.',
      },
      {
        title: '3–5 mm Fine Grain Output',
        description:
          'Designed to produce crushed material in the 3–5 mm size range for applications requiring fine-grain material preparation.',
      },
      {
        title: '5 HP Three-Phase Motor System',
        description:
          'Operates with a 5 HP power requirement and three-phase electrical supply, supported by a DOL starter for motor operation.',
      },
      {
        title: 'Industrial Material Processing Design',
        description:
          'Features a specified 6 ton machine capacity and 500 kg machine weight for material crushing applications associated with brick manufacturing.',
      },
    ],
    specTableColumns: ['Parameter', 'Details', 'Specification'],
    specTableRows: [
      { Parameter: 'Machine Model', Details: 'JI Hammer Crusher', Specification: 'Jupiter Industries' },
      { Parameter: 'Machine Type', Details: 'Hammer Crusher', Specification: 'Material Processing Equipment' },
      { Parameter: 'Machine Capacity', Details: '6 Tons', Specification: '—' },
      { Parameter: 'Production Capacity', Details: '2 TPH', Specification: 'Tonnes per Hour' },
      { Parameter: 'Power Requirement', Details: '5 HP', Specification: '—' },
      { Parameter: 'Electrical Supply', Details: '3 Phase', Specification: '—' },
      { Parameter: 'Starter Type', Details: 'DOL', Specification: 'Direct-On-Line Starter' },
      { Parameter: 'Machine Weight', Details: '500 kg', Specification: '—' },
      { Parameter: 'Output Material Size', Details: '3–5 mm', Specification: 'Fine Grains' },
      { Parameter: 'Listed Application', Details: 'Fly Ash Bricks', Specification: '—' },
      { Parameter: 'Listed Application', Details: 'Mud Bricks', Specification: '—' },
    ],
    keyFeatures: [
      'Jupiter JI Hammer Crusher with a specified 6 ton capacity and production output of 2 tonnes per hour.',
      '5 HP power requirement with a three-phase electrical supply and Direct-On-Line (DOL) starter.',
      'Produces crushed material in the 3–5 mm fine-grain size range for industrial material processing applications.',
      '500 kg machine weight with applications listed for fly ash brick and mud brick manufacturing.',
    ],
    advantages: [
      {
        title: 'Efficient Material Crushing Capacity',
        description:
          'Supports industrial material processing with a production capacity of 2 tonnes per hour for brick manufacturing and construction material preparation requirements.',
      },
      {
        title: 'Fine Grain Material Output',
        description:
          'Produces crushed material in the specified 3–5 mm size range, supporting applications that require fine-grain material preparation.',
      },
      {
        title: 'Three-Phase Electrical Operation',
        description:
          "The 5 HP motor power requirement, three-phase electrical supply and DOL starter support the machine's industrial electrical operation.",
      },
      {
        title: 'Brick Manufacturing Applications',
        description:
          'Designed for material crushing operations associated with fly ash brick and mud brick manufacturing, supporting raw material preparation requirements.',
      },
    ],
    galleryImages: [],
  },
};

export const DEFAULT_CATALOG_PRODUCTS: DefaultCatalogProduct[] = [
  DEFAULT_PRODUCT_V10B,
  DEFAULT_PRODUCT_V12B,
  DEFAULT_PRODUCT_V15B,
  DEFAULT_PRODUCT_ROTARY_5G,
  DEFAULT_PRODUCT_50TON_ROTARY,
  DEFAULT_PRODUCT_30_40TON_ROTARY,
  DEFAULT_PRODUCT_4BRICKS_FEEDER,
  DEFAULT_PRODUCT_HDM800,
  DEFAULT_PRODUCT_DOUBLE_TRIPLE_VIBRATOR,
  DEFAULT_PRODUCT_JE_PBT2,
  DEFAULT_PRODUCT_MANUAL_INTERLOCK,
  DEFAULT_PRODUCT_AUTO_INTERLOCK,
  DEFAULT_PRODUCT_JI_BATCHING_PLANT,
  DEFAULT_PRODUCT_JI_SILO,
  DEFAULT_PRODUCT_CONCRETE_MIXER,
  DEFAULT_PRODUCT_HAMMER_CRUSHER,
];


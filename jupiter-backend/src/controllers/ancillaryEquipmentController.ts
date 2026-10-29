import { Request, Response, NextFunction } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();
let hasCheckedSeed = false;

export const INITIAL_ANCILLARY_EQUIPMENT = [
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

// Seed initial records ONLY if the AncillaryEquipment table is completely empty on fresh setup.
// If any equipment exists, or if equipment was deleted, never recreate deleted records.
export async function ensureInitialAncillaryEquipment(): Promise<void> {
  if (hasCheckedSeed) return;
  hasCheckedSeed = true;

  try {
    const count = await prisma.ancillaryEquipment.count();
    if (count > 0) {
      return; // Database table already contains records; never re-create deleted items!
    }

    // Only on completely empty table (first time installation before seed):
    for (const item of INITIAL_ANCILLARY_EQUIPMENT) {
      await prisma.ancillaryEquipment.create({
        data: {
          id: item.id,
          name: item.name,
          categoryBadge: item.categoryBadge,
          compatibilityBadge: item.compatibilityBadge,
          image: item.image,
          layoutType: item.layoutType,
          variants: (item as any).variants ? (item as any).variants : undefined,
          specsTitle: (item as any).specsTitle || 'Technical Specifications',
          specs: item.specs as any,
          quoteLabel: item.quoteLabel,
          whatsAppMessage: item.whatsAppMessage,
          applicableCategories: item.applicableCategories,
          order: item.order,
          isActive: item.isActive,
        },
      });
      console.log(`[Ancillary] Seeded initial equipment: ${item.name} (${item.id})`);
    }
  } catch (err: any) {
    console.warn('[Ancillary] Seeding check note:', err?.message || err);
  }
}

// POST /api/ancillary-equipment/reset
export const resetAncillaryEquipment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await prisma.ancillaryEquipment.deleteMany({});
    for (const item of INITIAL_ANCILLARY_EQUIPMENT) {
      await prisma.ancillaryEquipment.create({
        data: {
          id: item.id,
          name: item.name,
          categoryBadge: item.categoryBadge,
          compatibilityBadge: item.compatibilityBadge,
          image: item.image,
          layoutType: item.layoutType,
          variants: (item as any).variants ? (item as any).variants : undefined,
          specsTitle: (item as any).specsTitle || 'Technical Specifications',
          specs: item.specs as any,
          quoteLabel: item.quoteLabel,
          whatsAppMessage: item.whatsAppMessage,
          applicableCategories: item.applicableCategories,
          order: item.order,
          isActive: item.isActive,
        },
      });
    }

    const resetList = await prisma.ancillaryEquipment.findMany({ orderBy: { order: 'asc' } });
    res.status(200).json({ success: true, data: resetList });
  } catch (error) {
    next(error);
  }
};

// GET /api/ancillary-equipment
export const getAllAncillaryEquipment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await ensureInitialAncillaryEquipment();

    const items = await prisma.ancillaryEquipment.findMany({
      orderBy: { order: 'asc' },
    });

    res.status(200).json({ success: true, data: items });
  } catch (error) {
    next(error);
  }
};

// GET /api/ancillary-equipment/:id
export const getAncillaryEquipmentById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id as string;
    const item = await prisma.ancillaryEquipment.findUnique({ where: { id } });

    if (!item) {
      res.status(404).json({ success: false, message: 'Equipment not found' });
      return;
    }

    res.status(200).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

// POST /api/ancillary-equipment
export const createAncillaryEquipment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const body = req.body;
    if (!body.name || !body.name.trim()) {
      res.status(400).json({ success: false, message: 'Equipment name is required' });
      return;
    }

    const currentCount = await prisma.ancillaryEquipment.count();
    const order = typeof body.order === 'number' ? body.order : currentCount + 1;

    const created = await prisma.ancillaryEquipment.create({
      data: {
        id: body.id && body.id.trim() ? body.id.trim() : undefined,
        name: body.name.trim(),
        categoryBadge: body.categoryBadge || 'OEM Standard',
        compatibilityBadge: body.compatibilityBadge || 'Factory Integrated',
        image: body.image || '/images/catalogue/pan-mixer.png',
        layoutType: body.layoutType || 'standard',
        variants: body.variants ? body.variants : undefined,
        specsTitle: body.specsTitle || 'Technical Specifications',
        specs: Array.isArray(body.specs) ? body.specs : [],
        quoteLabel: body.quoteLabel || `Get ${body.name} Quote`,
        whatsAppMessage: body.whatsAppMessage || `Hello Jupiter, I am interested in the ${body.name} specifications and pricing.`,
        applicableCategories: Array.isArray(body.applicableCategories) ? body.applicableCategories : ['fly-ash-brick-machine'],
        order,
        isActive: body.isActive !== undefined ? !!body.isActive : true,
      },
    });

    res.status(201).json({ success: true, data: created });
  } catch (error) {
    next(error);
  }
};

// PUT /api/ancillary-equipment/:id
export const updateAncillaryEquipment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id as string;
    const body = req.body;

    const existing = await prisma.ancillaryEquipment.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ success: false, message: 'Equipment not found' });
      return;
    }

    const updated = await prisma.ancillaryEquipment.update({
      where: { id },
      data: {
        ...(body.name !== undefined ? { name: body.name.trim() } : {}),
        ...(body.categoryBadge !== undefined ? { categoryBadge: body.categoryBadge } : {}),
        ...(body.compatibilityBadge !== undefined ? { compatibilityBadge: body.compatibilityBadge } : {}),
        ...(body.image !== undefined ? { image: body.image } : {}),
        ...(body.layoutType !== undefined ? { layoutType: body.layoutType } : {}),
        ...(body.variants !== undefined ? { variants: body.variants === null ? Prisma.DbNull : body.variants } : {}),
        ...(body.specsTitle !== undefined ? { specsTitle: body.specsTitle } : {}),
        ...(body.specs !== undefined ? { specs: body.specs } : {}),
        ...(body.quoteLabel !== undefined ? { quoteLabel: body.quoteLabel } : {}),
        ...(body.whatsAppMessage !== undefined ? { whatsAppMessage: body.whatsAppMessage } : {}),
        ...(body.applicableCategories !== undefined ? { applicableCategories: body.applicableCategories } : {}),
        ...(body.order !== undefined ? { order: body.order } : {}),
        ...(body.isActive !== undefined ? { isActive: !!body.isActive } : {}),
      },
    });

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/ancillary-equipment/:id
export const deleteAncillaryEquipment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id as string;

    const existing = await prisma.ancillaryEquipment.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ success: false, message: 'Equipment not found' });
      return;
    }

    await prisma.ancillaryEquipment.delete({ where: { id } });
    res.status(200).json({ success: true, message: 'Equipment deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/ancillary-equipment/:id/toggle
export const toggleAncillaryEquipmentStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id as string;

    const existing = await prisma.ancillaryEquipment.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ success: false, message: 'Equipment not found' });
      return;
    }

    const updated = await prisma.ancillaryEquipment.update({
      where: { id },
      data: { isActive: !existing.isActive },
    });

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

// PUT /api/ancillary-equipment/reorder
export const reorderAncillaryEquipment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id, direction } = req.body;

    const all = await prisma.ancillaryEquipment.findMany({ orderBy: { order: 'asc' } });
    const index = all.findIndex((i) => i.id === id);

    if (index === -1) {
      res.status(404).json({ success: false, message: 'Equipment not found' });
      return;
    }

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < all.length) {
      const temp = all[index];
      all[index] = all[targetIndex];
      all[targetIndex] = temp;

      await prisma.$transaction(
        all.map((item, idx) =>
          prisma.ancillaryEquipment.update({
            where: { id: item.id },
            data: { order: idx + 1 },
          })
        )
      );
    }

    const updatedList = await prisma.ancillaryEquipment.findMany({ orderBy: { order: 'asc' } });
    res.status(200).json({ success: true, data: updatedList });
  } catch (error) {
    next(error);
  }
};

// GET /api/ancillary-equipment/categories
export const getAncillaryEnabledCategories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let settings = await prisma.setting.findUnique({ where: { id: 'site_settings' } });
    if (!settings) {
      settings = await prisma.setting.create({
        data: { id: 'site_settings', ancillaryEnabledCategories: ['fly-ash-brick-machine'] },
      });
    }

    res.status(200).json({
      success: true,
      data: settings.ancillaryEnabledCategories && settings.ancillaryEnabledCategories.length > 0
        ? settings.ancillaryEnabledCategories
        : ['fly-ash-brick-machine'],
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/ancillary-equipment/categories
export const updateAncillaryEnabledCategories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { categories } = req.body;
    if (!Array.isArray(categories)) {
      res.status(400).json({ success: false, message: 'Categories array is required' });
      return;
    }

    const settings = await prisma.setting.upsert({
      where: { id: 'site_settings' },
      update: { ancillaryEnabledCategories: categories },
      create: { id: 'site_settings', ancillaryEnabledCategories: categories },
    });

    res.status(200).json({ success: true, data: settings.ancillaryEnabledCategories });
  } catch (error) {
    next(error);
  }
};

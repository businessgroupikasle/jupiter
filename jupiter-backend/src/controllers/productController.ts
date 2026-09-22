import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient | null = null;
try {
  prisma = new PrismaClient();
} catch (e) {
  console.warn('Prisma Client initialised with warning; product in-memory fallback active.');
}

export interface ProductItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  description?: string | null;
  capacity: string;
  power: string;
  image: string;
  enquiryCount: number;
  specifications?: any;
  createdAt: Date;
  updatedAt: Date;
}

// Fallback catalog matching default products
let fallbackProducts: ProductItem[] = [
  {
    id: 'PROD-FLYASH-VERTICAL',
    name: 'Vertical Machine',
    slug: 'vertical-machine',
    category: 'Fly Ash Brick Machine',
    description: 'High-efficiency vertical compaction fly ash brick machine with automated feeding and pressing.',
    capacity: '10,000 – 20,000 Bricks / Day',
    power: '15 H.P + 2 H.P / 7.5 H.P + 2 H.P',
    image: '/images/flyash-vertical-machine.png',
    enquiryCount: 0,
    specifications: {
      'Production Rate': '10,000 – 20,000 Bricks / Day',
      'Hydraulic Motor': '15 H.P + 2 H.P',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'PROD-FLYASH-4BRICK-ROTARY',
    name: '4 Brick Rotary Machine',
    slug: '4-brick-rotary-machine',
    category: 'Fly Ash Brick Machine',
    description: 'Heavy-duty 4-brick rotary press machine with hydraulic motor table rotation.',
    capacity: '15,000 – 25,000 Bricks per Day',
    power: '15 H.P',
    image: '/images/flyash-4brick-rotary.png',
    enquiryCount: 0,
    specifications: {
      'Production Rate': '15,000 – 25,000 Bricks per Day',
      'Power': '15 H.P',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'PROD-FLYASH-ROTARY-TONS',
    name: 'Rotary Machine (30,40,50 Tons)',
    slug: 'rotary-machine-30-40-50-tons',
    category: 'Fly Ash Brick Machine',
    description: 'Rotary indexing fly ash brick press machine available in 30T, 40T, and 50T pressure ratings.',
    capacity: '1,000 – 2,300 Bricks / hr',
    power: '15 – 20 H.P',
    image: '/images/flyash-rotary-ton-machine.png',
    enquiryCount: 0,
    specifications: {
      'Tonnage Options': '30 Ton / 40 Ton / 50 Ton Hydraulic Pressure',
      'Production Capacity': '1,000 – 2,300 Bricks / hr',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'PROD-STORAGE-SILO',
    name: 'Storage Silo',
    slug: 'storage-silo',
    category: 'Storage Silo',
    description: 'Industrial bulk material storage silo engineered for cement, fly ash, iron oxide, and lime sludge.',
    capacity: '60 Tons | 100 Tons',
    power: 'Air Compressor & Hydraulic',
    image: '/images/storage-silo-product.png',
    enquiryCount: 0,
    specifications: {
      'Capacity': '60 Tons | 100 Tons',
      'Running System': 'Air Compressor',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'PROD-BLOCK-AUTOMATIC-BM12',
    name: 'JE-BM12 Fully Automatic Block Making Machine',
    slug: 'je-bm12-fully-automatic-block-making-machine',
    category: 'Hollow and Solid Block Machine',
    description: 'Flagship fully automated multi-cavity hollow and solid concrete block making plant.',
    capacity: '1,800 – 2,400 Blocks / hr',
    power: '35 H.P (Hydraulic + Vibration)',
    image: '/images/flyash-vertical-machine.png',
    enquiryCount: 0,
    specifications: {
      'Production Capacity': '1,800 – 2,400 Blocks / hr',
      'Total Power': '35 H.P',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'PROD-INTERLOCK-BRICK-MAKING',
    name: 'Inter Locking Brick Making Machine',
    slug: 'inter-locking-brick-making-machine',
    category: 'Inter Block Making Machine',
    description: 'High performance interlocking brick making machine for commercial mortarless brick production.',
    capacity: '8,000 – 12,000 Bricks/hr',
    power: '15 H.P Electric Motor',
    image: '/images/flyash-vertical-machine.png',
    enquiryCount: 0,
    specifications: {
      'Capacity': '8,000 – 12,000 Bricks/hr',
      'Motor': '15 H.P Electric Motor',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'PROD-INTERLOCK-80T',
    name: 'JE-INT 80 Ton High-Pressure Interlocking Brick Machine',
    slug: 'je-int-80-ton-high-pressure-interlocking-brick-machine',
    category: 'Inter Block Making Machine',
    description: 'High-tonnage hydraulic interlocking brick press machine delivering 80 tons of hydraulic compaction.',
    capacity: '2,500 – 3,500 Blocks / hr',
    power: '20 H.P Hydraulic System',
    image: '/images/flyash-rotary-ton-machine.png',
    enquiryCount: 0,
    specifications: {
      'Pressing Force': '80 Tons Hydraulic Compressive Force',
      'Production Capacity': '2,500 – 3,500 Blocks / hr',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'PROD-PAVER-100T-DUALCOLOR',
    name: 'JE-PB 100 Ton Dual-Color Hydraulic Paver Machine',
    slug: 'je-pb-100-ton-dual-color-hydraulic-paver-machine',
    category: 'Paver Block Machine',
    description: 'Commercial hydraulic paver manufacturing plant equipped with secondary top-color feeder.',
    capacity: '4,500 – 6,000 Pavers / Day',
    power: '20 H.P Hydraulic + 2 H.P Color Feeder',
    image: '/images/flyash-rotary-ton-machine.png',
    enquiryCount: 0,
    specifications: {
      'Production Capacity': '4,500 – 6,000 Pavers / Day',
      'Tonnage': '100 Tons Hydraulic Tonnage',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'PROD-BATCHING-CBP30',
    name: 'JE-CBP 30 Stationary Concrete Batching Plant',
    slug: 'je-cbp-30-stationary-concrete-batching-plant',
    category: 'Batching Plant',
    description: 'Commercial stationary concrete batching and mixing plant with inline 4-compartment aggregate hoppers.',
    capacity: '30 – 45 m³/hr Continuous Output',
    power: '45 H.P Total Connected Load',
    image: '/images/storage-silo-product.png',
    enquiryCount: 0,
    specifications: {
      'Output Rating': '30 – 45 m³/hr',
      'Connected Power': '45 H.P',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// GET /api/products
export const getProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { category, search } = req.query;
    let products: any[] = [];

    if (prisma && process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('your_supabase')) {
      try {
        const whereClause: any = {};
        if (category && category !== 'All') {
          whereClause.category = { equals: category as string, mode: 'insensitive' };
        }
        if (search) {
          whereClause.OR = [
            { name: { contains: search as string, mode: 'insensitive' } },
            { description: { contains: search as string, mode: 'insensitive' } },
            { capacity: { contains: search as string, mode: 'insensitive' } },
          ];
        }
        products = await prisma.product.findMany({
          where: whereClause,
          orderBy: { createdAt: 'asc' },
        });
      } catch (dbError) {
        console.warn('Database query failed, returning fallback products:', dbError);
      }
    }

    if (!products || products.length === 0) {
      let filtered = [...fallbackProducts];
      if (category && category !== 'All') {
        filtered = filtered.filter(p => p.category.toLowerCase() === (category as string).toLowerCase());
      }
      if (search) {
        const q = (search as string).toLowerCase();
        filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.capacity.toLowerCase().includes(q));
      }
      products = filtered;
    }

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/products/:idOrSlug
export const getProductByIdOrSlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const idOrSlug = req.params.idOrSlug as string;
    let product: any = null;

    if (prisma && process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('your_supabase')) {
      try {
        product = await prisma.product.findFirst({
          where: {
            OR: [{ id: idOrSlug }, { slug: idOrSlug }],
          },
        });
      } catch (dbError) {
        console.warn('Database read failed:', dbError);
      }
    }

    if (!product) {
      product = fallbackProducts.find(p => p.id === idOrSlug || p.slug === idOrSlug) || null;
    }

    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/products
export const createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, slug, category, description, capacity, power, image, specifications } = req.body;

    const generatedSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    let savedProduct: any = null;

    if (prisma && process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('your_supabase')) {
      try {
        savedProduct = await prisma.product.create({
          data: {
            name,
            slug: generatedSlug,
            category,
            description,
            capacity,
            power,
            image,
            specifications: specifications || {},
          },
        });
      } catch (dbError) {
        console.warn('Database write failed, fallback to local buffer:', dbError);
      }
    }

    if (!savedProduct) {
      savedProduct = {
        id: `prod_${Date.now()}`,
        name,
        slug: generatedSlug,
        category,
        description,
        capacity,
        power,
        image,
        enquiryCount: 0,
        specifications: specifications || {},
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      fallbackProducts.push(savedProduct);
    }

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: savedProduct,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/products/:id
export const updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id as string;
    let updatedProduct: any = null;

    if (prisma && process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('your_supabase')) {
      try {
        updatedProduct = await prisma.product.update({
          where: { id },
          data: req.body,
        });
      } catch (dbError) {
        console.warn('Database update failed:', dbError);
      }
    }

    if (!updatedProduct) {
      const idx = fallbackProducts.findIndex(p => p.id === id);
      if (idx !== -1) {
        fallbackProducts[idx] = { ...fallbackProducts[idx], ...req.body, updatedAt: new Date() };
        updatedProduct = fallbackProducts[idx];
      }
    }

    if (!updatedProduct) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/products/:id
export const deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id as string;
    let deleted = false;

    if (prisma && process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('your_supabase')) {
      try {
        const result = await prisma.product.deleteMany({
          where: {
            OR: [
              { id },
              { slug: id },
              { name: { equals: id, mode: 'insensitive' } }
            ]
          }
        });
        if (result.count > 0) deleted = true;
      } catch (dbError) {
        console.warn('Database delete skipped or record already deleted:', dbError);
      }
    }

    const searchId = id.toLowerCase().trim();
    const idx = fallbackProducts.findIndex(p => 
      p.id.toLowerCase() === searchId || 
      p.slug.toLowerCase() === searchId ||
      p.name.toLowerCase() === searchId
    );
    if (idx !== -1) {
      fallbackProducts.splice(idx, 1);
      deleted = true;
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

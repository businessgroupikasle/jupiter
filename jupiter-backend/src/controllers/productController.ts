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
    id: 'prod-01',
    name: 'Rotary Machine (30,40,50 Tons)',
    slug: 'rotary-machine-30-40-50-tons',
    category: 'Fly Ash Machine',
    description: 'Heavy duty hydraulic rotary press machine for manufacturing high density fly ash bricks.',
    capacity: '1,000 - 2,300 Bricks / hr',
    power: '15 - 20 H.P',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    enquiryCount: 0,
    specifications: {
      'Tonnage Options': '30 Ton / 40 Ton / 50 Ton Hydraulic Pressure',
      'Production Capacity': '1,000 - 2,300 Bricks / hr',
      'Power Requirement': '15 - 20 H.P 3-Phase Electric Motor',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'prod-02',
    name: '4 Brick Rotary Machine',
    slug: '4-brick-rotary-machine',
    category: 'Fly Ash Machine',
    description: 'High-throughput 4-brick rotary press machine designed for continuous commercial output.',
    capacity: '15,000 - 25,000 Bricks / Day',
    power: '15 H.P Electric Motor',
    image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    enquiryCount: 0,
    specifications: {
      'Daily Output': '15,000 - 25,000 Bricks / 8 hr Shift',
      'Motor Power': '15 H.P Electric Motor',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'prod-04',
    name: 'Vertical Block Machine',
    slug: 'vertical-block-machine',
    category: 'Hollow and Solid Block Machine',
    description: 'Stationary vertical vibration block making machine for hollow blocks and solid blocks.',
    capacity: '1,500 - 2,000 Blocks/hr',
    power: '25 H.P System',
    image: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=800&q=80',
    enquiryCount: 0,
    specifications: {
      'Capacity': '1,500 - 2,000 Blocks / hr',
      'Power': '25 H.P System',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'prod-05',
    name: 'Interlocking Brick Machine',
    slug: 'interlocking-brick-machine',
    category: 'Interlock Machine',
    description: 'Precision hydraulic interlocking paver and brick press machine.',
    capacity: '2,000 - 3,500 Blocks/hr',
    power: '15 H.P',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f8?auto=format&fit=crop&w=800&q=80',
    enquiryCount: 0,
    specifications: {
      'Capacity': '2,000 - 3,500 Blocks / hr',
      'Power': '15 H.P',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'prod-06',
    name: 'Concrete Batching Plant',
    slug: 'concrete-batching-plant',
    category: 'Batching Plant',
    description: 'Stationary and compact concrete batching and mixing plant with digital aggregate weighing.',
    capacity: '30 - 120 m³/hr',
    power: '45 H.P Line',
    image: 'https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=800&q=80',
    enquiryCount: 0,
    specifications: {
      'Capacity': '30 - 120 m³/hr',
      'Power': '45 H.P Line',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'prod-07',
    name: 'Cement Storage Silo',
    slug: 'cement-storage-silo',
    category: 'Storage Silo',
    description: 'Heavy structural steel cement and fly ash storage silo with pneumatic discharge aeration.',
    capacity: '50 - 500 Tons',
    power: 'Pneumatic System',
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80',
    enquiryCount: 0,
    specifications: {
      'Capacity': '50 - 500 Tons',
      'Power': 'Pneumatic System',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'prod-08',
    name: 'Rotary Press Machine',
    slug: 'rotary-press-machine',
    category: 'Fly Ash Machine',
    description: 'Super heavy duty continuous rotary press machine for large scale industrial plants.',
    capacity: '10,000 - 15,000 Bricks/hr',
    power: '20 H.P',
    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80',
    enquiryCount: 0,
    specifications: {
      'Capacity': '10,000 - 15,000 Bricks / hr',
      'Power': '20 H.P',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'prod-09',
    name: 'Planetary Pan Mixer (500 Kg / 1000 Kg)',
    slug: 'planetary-pan-mixer-500-1000-kg',
    category: 'Mixing Equipment',
    description: 'High-shear planetary pan mixer with replaceable tungsten carbide wear plates and spring-loaded mixing blades.',
    capacity: '500 - 1,000 Kg / Batch',
    power: '10 - 20 H.P',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    enquiryCount: 16,
    specifications: {
      'Batch Capacity': '500 Kg / 1,000 Kg per batch',
      'Motor Rating': '10 HP to 20 HP Heavy Reduction Gearbox',
      'Discharge Gate': 'Pneumatic / Hydraulic bottom sliding door',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'prod-10',
    name: 'Automatic Pallet Stacker & Feeder System',
    slug: 'automatic-pallet-stacker-feeder-system',
    category: 'Automation & Handling',
    description: 'Robotic automated pallet feeder and green-brick stacker designed to eliminate manual handling.',
    capacity: 'Up to 3,000 Pallets / hr',
    power: '7.5 H.P',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    enquiryCount: 11,
    specifications: {
      'Handling Capacity': 'Up to 3,000 Pallets / hr',
      'Stacking Height': '3 to 6 tiers high',
      'Control System': 'Independent PLC sync with main brick machine',
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
        await prisma.product.delete({ where: { id } });
        deleted = true;
      } catch (dbError) {
        console.warn('Database delete failed:', dbError);
      }
    }

    const idx = fallbackProducts.findIndex(p => p.id === id);
    if (idx !== -1) {
      fallbackProducts.splice(idx, 1);
      deleted = true;
    }

    if (!deleted) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

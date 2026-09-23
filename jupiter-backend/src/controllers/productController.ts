import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { seedDatabase } from '../seed';

const prisma = new PrismaClient();

// GET /api/products
export const getProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { category, search } = req.query;

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

    const products = await prisma.product.findMany({
      where: whereClause,
      orderBy: { createdAt: 'asc' },
    });

    res.status(200).json({ success: true, count: products.length, data: products });
  } catch (error) {
    next(error);
  }
};

// POST or GET /api/products/seed
export const triggerSeed = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await seedDatabase();
    const count = await prisma.product.count();
    res.status(200).json({
      success: true,
      message: `Database successfully seeded with ${count} products.`,
      count,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/products/:idOrSlug
export const getProductByIdOrSlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const idOrSlug = req.params.idOrSlug as string;

    const product = await prisma.product.findFirst({
      where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }] },
    });

    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// POST /api/products
export const createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const {
      name,
      slug,
      category,
      description,
      capacity,
      power,
      image,
      specifications,
      brandTag,
      brickSize,
      galleryImages,
      featureBadges,
      specTableColumns,
      specTableRows,
      highlights,
      advantages,
      keyFeatures,
    } = req.body;

    const baseName = (name && String(name).trim()) || 'New Machinery';
    let candidateSlug = (slug || baseName)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    if (!candidateSlug) candidateSlug = `product-${Date.now()}`;

    // Ensure slug is unique
    let finalSlug = candidateSlug;
    let counter = 1;
    while (await prisma.product.findUnique({ where: { slug: finalSlug } })) {
      finalSlug = `${candidateSlug}-${counter}`;
      counter++;
    }

    // Consolidate extra metadata into specifications JSON safely
    const specsPayload = {
      ...(typeof specifications === 'object' && specifications !== null ? specifications : {}),
      ...(brandTag ? { brandTag } : {}),
      ...(brickSize ? { brickSize } : {}),
      ...(galleryImages ? { galleryImages } : {}),
      ...(featureBadges ? { featureBadges } : {}),
      ...(specTableColumns ? { specTableColumns } : {}),
      ...(specTableRows ? { specTableRows } : {}),
      ...(highlights ? { highlights } : {}),
      ...(advantages ? { advantages } : {}),
      ...(keyFeatures ? { keyFeatures } : {}),
    };

    const product = await prisma.product.create({
      data: {
        name: baseName,
        slug: finalSlug,
        category: category || 'Fly Ash Brick Machine',
        description: description || '',
        capacity: capacity || 'Standard Production Output',
        power: power || 'Standard Connected Load',
        image: image || '/images/flyash-vertical-machine.png',
        specifications: specsPayload,
      },
    });

    res.status(201).json({ success: true, message: 'Product created successfully', data: product });
  } catch (error) {
    next(error);
  }
};

// PUT /api/products/:id
export const updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id as string;

    const nameToMatch = req.body.name ? String(req.body.name).trim() : '';
    const slugToMatch = req.body.slug ? String(req.body.slug).trim() : (nameToMatch ? nameToMatch.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : '');

    // Find product by id, slug, or case-insensitive name so frontend updates always update the actual database row
    const existing = await prisma.product.findFirst({
      where: {
        OR: [
          { id },
          { slug: id },
          ...(slugToMatch ? [{ slug: slugToMatch }] : []),
          ...(nameToMatch ? [{ name: { equals: nameToMatch, mode: 'insensitive' as const } }] : []),
        ],
      },
    });

    // Whitelist only Prisma schema Product fields to prevent "Unknown argument" errors
    const allowedData: any = {};
    if (req.body.name !== undefined) allowedData.name = req.body.name;
    if (req.body.slug !== undefined) allowedData.slug = req.body.slug;
    if (req.body.category !== undefined) allowedData.category = req.body.category;
    if (req.body.description !== undefined) allowedData.description = req.body.description;
    if (req.body.capacity !== undefined) allowedData.capacity = req.body.capacity;
    if (req.body.power !== undefined) allowedData.power = req.body.power;
    if (req.body.image !== undefined) allowedData.image = req.body.image;
    if (req.body.enquiryCount !== undefined) allowedData.enquiryCount = Number(req.body.enquiryCount);

    // Merge specifications
    const currentSpecs = (existing?.specifications as Record<string, any>) || {};
    const newSpecs = (typeof req.body.specifications === 'object' && req.body.specifications !== null)
      ? req.body.specifications
      : {};

    const extraFields = [
      'brandTag',
      'brickSize',
      'galleryImages',
      'featureBadges',
      'specTableColumns',
      'specTableRows',
      'highlights',
      'advantages',
      'keyFeatures',
    ];
    for (const f of extraFields) {
      if (req.body[f] !== undefined) {
        newSpecs[f] = req.body[f];
      }
    }
    allowedData.specifications = { ...currentSpecs, ...newSpecs };

    let product;
    if (existing) {
      product = await prisma.product.update({
        where: { id: existing.id },
        data: allowedData,
      });
    } else {
      // If product doesn't exist yet in DB, create it with a guaranteed unique slug
      const baseName = req.body.name || 'New Machinery';
      let candidateSlug = (req.body.slug || baseName)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      if (!candidateSlug) candidateSlug = `product-${Date.now()}`;

      let finalSlug = candidateSlug;
      let counter = 1;
      while (await prisma.product.findUnique({ where: { slug: finalSlug } })) {
        finalSlug = `${candidateSlug}-${counter}`;
        counter++;
      }

      product = await prisma.product.create({
        data: {
          name: baseName,
          slug: finalSlug,
          category: req.body.category || 'Fly Ash Brick Machine',
          description: req.body.description || '',
          capacity: req.body.capacity || 'Standard Production Output',
          power: req.body.power || 'Standard Connected Load',
          image: req.body.image || '/images/flyash-vertical-machine.png',
          specifications: allowedData.specifications,
        },
      });
    }

    res.status(200).json({ success: true, message: 'Product updated successfully', data: product });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/products/:id
export const deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id as string;

    await prisma.product.deleteMany({
      where: { OR: [{ id }, { slug: id }, { name: { equals: id, mode: 'insensitive' } }] },
    });

    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/products (Clear All)
export const clearAllProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await prisma.product.deleteMany({});
    res.status(200).json({ success: true, message: 'All products deleted successfully' });
  } catch (error) {
    next(error);
  }
};



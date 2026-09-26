import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Normalizes product ordering across categories so that each product has a
 * clean, unique, sequential order value (1, 2, 3...) per category.
 */
export const normalizeProductOrders = async (): Promise<void> => {
  try {
    const products = await prisma.product.findMany({
      orderBy: [{ category: 'asc' }, { order: 'asc' }, { createdAt: 'asc' }],
    });

    const categoryGroups = new Map<string, typeof products>();
    for (const p of products) {
      const cat = p.category || 'General';
      if (!categoryGroups.has(cat)) {
        categoryGroups.set(cat, []);
      }
      categoryGroups.get(cat)!.push(p);
    }

    for (const [, catProducts] of categoryGroups.entries()) {
      for (let i = 0; i < catProducts.length; i++) {
        const expectedOrder = i + 1;
        if (catProducts[i].order !== expectedOrder) {
          await prisma.product.update({
            where: { id: catProducts[i].id },
            data: { order: expectedOrder },
          });
        }
      }
    }
  } catch (err) {
    console.error('[Product] Error normalizing product orders:', err);
  }
};

// GET /api/products
export const getProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { category, search, includeInactive, all, admin, status } = req.query;

    const whereClause: any = {};

    // Determine if requester is Admin
    const isAdmin =
      admin === 'true' ||
      all === 'true' ||
      includeInactive === 'true' ||
      req.headers['x-admin-request'] === 'true' ||
      Boolean(req.headers.referer?.includes('/admin'));

    // Handle Active / Inactive filtering
    if (status && typeof status === 'string') {
      const statusLower = status.toLowerCase().trim();
      if (statusLower === 'active') {
        whereClause.isActive = true;
      } else if (statusLower === 'inactive') {
        whereClause.isActive = false;
      }
      // 'all' includes both active and inactive
    } else if (!isAdmin) {
      // Public requests exclude inactive products by default
      whereClause.isActive = true;
    }
    // If isAdmin and status is not specified, both active & inactive products are returned

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
      include: {
        _count: {
          select: { enquiries: true },
        },
      },
      orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
    });

    const mapped = products.map((p) => {
      const realEnquiryCount = p._count?.enquiries ?? 0;
      const { _count, ...rest } = p;
      return {
        ...rest,
        enquiryCount: realEnquiryCount,
        enquiriesCount: realEnquiryCount,
        status: p.isActive ? 'Active' : 'Inactive',
      };
    });

    res.status(200).json({ success: true, count: mapped.length, data: mapped });
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
      include: {
        _count: {
          select: { enquiries: true },
        },
      },
    });

    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }

    const realEnquiryCount = product._count?.enquiries ?? 0;
    const { _count, ...rest } = product;

    const mapped = {
      ...rest,
      enquiryCount: realEnquiryCount,
      enquiriesCount: realEnquiryCount,
      status: product.isActive ? 'Active' : 'Inactive',
    };

    res.status(200).json({ success: true, data: mapped });
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
      isActive: reqIsActive,
      status: reqStatus,
      order: reqOrder,
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

    const isActive = reqIsActive !== undefined
      ? Boolean(reqIsActive)
      : (reqStatus !== undefined ? reqStatus === 'Active' : true);

    // If order not supplied, place at end of category
    let order = reqOrder !== undefined ? Math.max(0, parseInt(reqOrder, 10)) : 0;
    if (order === 0) {
      const maxOrderProd = await prisma.product.findFirst({
        where: { category: category || 'Fly Ash Brick Machine' },
        orderBy: { order: 'desc' },
      });
      order = (maxOrderProd?.order ?? 0) + 1;
    }

    const resolvedBrickSize = brickSize || (specsPayload.brickSize ?? null);

    const product = await prisma.product.create({
      data: {
        name: baseName,
        slug: finalSlug,
        category: category || 'Fly Ash Brick Machine',
        description: description || '',
        capacity: capacity || 'Standard Production Output',
        power: power || 'Standard Connected Load',
        brickSize: resolvedBrickSize,
        image: image || '/images/flyash-vertical-machine.png',
        specifications: specsPayload,
        isActive,
        order,
      },
    });

    const mapped = {
      ...product,
      enquiryCount: 0,
      enquiriesCount: 0,
      status: product.isActive ? 'Active' : 'Inactive',
    };

    res.status(201).json({ success: true, message: 'Product created successfully', data: mapped });
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
    if (req.body.brickSize !== undefined) allowedData.brickSize = req.body.brickSize;
    if (req.body.image !== undefined) allowedData.image = req.body.image;
    if (req.body.isActive !== undefined) allowedData.isActive = Boolean(req.body.isActive);
    if (req.body.status !== undefined) allowedData.isActive = req.body.status === 'Active';
    if (req.body.order !== undefined) allowedData.order = Math.max(0, parseInt(req.body.order, 10));

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
          brickSize: req.body.brickSize || (allowedData.specifications?.brickSize ?? null),
          image: req.body.image || '/images/flyash-vertical-machine.png',
          specifications: allowedData.specifications,
          isActive: req.body.isActive !== undefined
            ? Boolean(req.body.isActive)
            : (req.body.status !== undefined ? req.body.status === 'Active' : true),
          order: req.body.order !== undefined ? Math.max(0, parseInt(req.body.order, 10)) : 0,
        },
      });
    }

    const finalProduct = await prisma.product.findUnique({
      where: { id: product.id },
      include: {
        _count: {
          select: { enquiries: true },
        },
      },
    });

    const realEnquiryCount = finalProduct?._count?.enquiries ?? 0;
    const baseItem = finalProduct || product;
    const { _count, ...rest } = (finalProduct || {}) as any;

    const mapped = {
      ...baseItem,
      ...rest,
      enquiryCount: realEnquiryCount,
      enquiriesCount: realEnquiryCount,
      status: baseItem.isActive ? 'Active' : 'Inactive',
    };

    res.status(200).json({ success: true, message: 'Product updated successfully', data: mapped });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/products/:id/toggle-status or POST /api/products/:id/toggle-status
export const toggleProductStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id as string;

    const existing = await prisma.product.findFirst({
      where: { OR: [{ id }, { slug: id }] },
    });

    if (!existing) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }

    const updated = await prisma.product.update({
      where: { id: existing.id },
      data: { isActive: !existing.isActive },
      include: {
        _count: {
          select: { enquiries: true },
        },
      },
    });

    const realEnquiryCount = updated._count?.enquiries ?? 0;
    const { _count, ...rest } = updated;

    const mapped = {
      ...rest,
      enquiryCount: realEnquiryCount,
      enquiriesCount: realEnquiryCount,
      status: updated.isActive ? 'Active' : 'Inactive',
    };

    res.status(200).json({
      success: true,
      message: `Product status toggled to ${mapped.status}`,
      data: mapped,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/products/:id/reorder or PATCH /api/products/:id/reorder
export const reorderProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id as string;
    const { direction } = req.body; // 'up' | 'down'

    if (!direction || (direction !== 'up' && direction !== 'down')) {
      res.status(400).json({
        success: false,
        message: "Invalid direction. Must be 'up' or 'down'.",
      });
      return;
    }

    const product = await prisma.product.findFirst({
      where: { OR: [{ id }, { slug: id }] },
    });

    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }

    // Get all products in the same category ordered by order ASC, createdAt ASC
    const categoryProducts = await prisma.product.findMany({
      where: { category: product.category },
      orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
    });

    // Ensure clean 1-based sequential ordering before swapping
    const cleanList = categoryProducts.map((p, idx) => ({
      ...p,
      order: idx + 1,
    }));

    const currentIndex = cleanList.findIndex((p) => p.id === product.id);
    if (currentIndex === -1) {
      res.status(404).json({ success: false, message: 'Product not found in category list' });
      return;
    }

    // Validation rules
    if (direction === 'up' && currentIndex === 0) {
      res.status(400).json({
        success: false,
        message: 'First product cannot move up.',
      });
      return;
    }

    if (direction === 'down' && currentIndex === cleanList.length - 1) {
      res.status(400).json({
        success: false,
        message: 'Last product cannot move down.',
      });
      return;
    }

    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    const currentProd = cleanList[currentIndex];
    const targetProd = cleanList[targetIndex];

    // Swap orders atomically in database
    await prisma.$transaction([
      prisma.product.update({
        where: { id: currentProd.id },
        data: { order: targetProd.order },
      }),
      prisma.product.update({
        where: { id: targetProd.id },
        data: { order: currentProd.order },
      }),
    ]);

    // Fetch updated products in category
    const updatedCategoryProducts = await prisma.product.findMany({
      where: { category: product.category },
      include: {
        _count: { select: { enquiries: true } },
      },
      orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
    });

    const mapped = updatedCategoryProducts.map((p) => {
      const realEnquiryCount = p._count?.enquiries ?? 0;
      const { _count, ...rest } = p;
      return {
        ...rest,
        enquiryCount: realEnquiryCount,
        enquiriesCount: realEnquiryCount,
        status: p.isActive ? 'Active' : 'Inactive',
      };
    });

    res.status(200).json({
      success: true,
      message: `Product moved ${direction} successfully`,
      data: mapped,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/products/:id/enquiries
export const getProductEnquiries = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id as string;

    const product = await prisma.product.findFirst({
      where: { OR: [{ id }, { slug: id }] },
    });

    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }

    const enquiries = await prisma.enquiry.findMany({
      where: { productId: product.id },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({
      success: true,
      count: enquiries.length,
      product: {
        id: product.id,
        name: product.name,
        slug: product.slug,
        category: product.category,
      },
      data: enquiries,
    });
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

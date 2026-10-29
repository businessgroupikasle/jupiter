import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { getUploadedFiles } from '../middleware/uploadMiddleware';
import { parseCSV } from '../utils/csvParser';

const prisma = new PrismaClient();

/**
 * Standard mapper for product API responses ensuring:
 * - imageUrl: string (primary/cover image)
 * - images: string[] (all image paths)
 * - image: string (legacy field compatibility)
 * - status: 'Active' | 'Inactive'
 * - enquiryCount / enquiriesCount: number
 */
export const mapProductResponse = (p: any): Record<string, any> => {
  const realEnquiryCount = p._count?.enquiries ?? p.enquiryCount ?? 0;

  // Extract all images from ProductImage records or fallback to image field
  let imageList: string[] = [];
  if (Array.isArray(p.images) && p.images.length > 0) {
    imageList = p.images
      .map((img: any) => (typeof img === 'string' ? img : img.url))
      .filter((url: any) => typeof url === 'string' && url.trim().length > 0);
  }

  if (imageList.length === 0 && p.image && typeof p.image === 'string' && p.image.trim().length > 0) {
    imageList = [p.image.trim()];
  }

  const primaryImageUrl = imageList[0] || (p.image && typeof p.image === 'string' && p.image.trim().length > 0 ? p.image.trim() : '');
  const { _count, ...rest } = p;

  const rawSpecs = p.specifications;
  let specsObj: Record<string, any> = {};
  if (typeof rawSpecs === 'string') {
    try {
      specsObj = JSON.parse(rawSpecs);
    } catch {
      specsObj = {};
    }
  } else if (typeof rawSpecs === 'object' && rawSpecs !== null) {
    specsObj = { ...rawSpecs };
  }

  // Reconstruct missing specification collections from ProductDetailItem if present
  if (Array.isArray(p.details) && p.details.length > 0) {
    if (!Array.isArray(specsObj.highlights) || specsObj.highlights.length === 0) {
      const hItems = p.details.filter((d: any) => d.type === 'Highlight').sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0));
      if (hItems.length > 0) {
        specsObj.highlights = hItems.map((d: any) => ({ id: d.id, title: d.title, description: d.description || '' }));
      }
    }
    if (!Array.isArray(specsObj.advantages) || specsObj.advantages.length === 0) {
      const aItems = p.details.filter((d: any) => d.type === 'Advantage').sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0));
      if (aItems.length > 0) {
        specsObj.advantages = aItems.map((d: any) => ({ id: d.id, title: d.title, description: d.description || '' }));
      }
    }
    if (!Array.isArray(specsObj.keyFeatures) || specsObj.keyFeatures.length === 0) {
      const kfItems = p.details.filter((d: any) => d.type === 'KeyFeature').sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0));
      if (kfItems.length > 0) {
        specsObj.keyFeatures = kfItems.map((d: any) => d.title);
      }
    }
    if (!Array.isArray(specsObj.featureBadges) || specsObj.featureBadges.length === 0) {
      const fbItems = p.details.filter((d: any) => d.type === 'FeatureBadge').sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0));
      if (fbItems.length > 0) {
        specsObj.featureBadges = fbItems.map((d: any) => d.title);
      }
    }
    if (!Array.isArray(specsObj.specTableRows) || specsObj.specTableRows.length === 0) {
      const specItems = p.details.filter((d: any) => d.type === 'Specification').sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0));
      if (specItems.length > 0) {
        specsObj.specTableRows = specItems.map((d: any) => {
          const rowObj: Record<string, string> = {
            Parameter: d.title,
            Details: d.value || '',
          };
          if (d.description) rowObj.Specification = d.description;
          return rowObj;
        });
      }
    }
  }

  const galleryImages = Array.isArray(specsObj.galleryImages)
    ? specsObj.galleryImages
    : (Array.isArray(rest.galleryImages) ? rest.galleryImages : imageList.slice(1));
  const featureBadges = Array.isArray(specsObj.featureBadges)
    ? specsObj.featureBadges
    : (Array.isArray(rest.featureBadges) ? rest.featureBadges : []);
  const highlights = Array.isArray(specsObj.highlights)
    ? specsObj.highlights
    : (Array.isArray(rest.highlights) ? rest.highlights : []);
  const advantages = Array.isArray(specsObj.advantages)
    ? specsObj.advantages
    : (Array.isArray(rest.advantages) ? rest.advantages : []);
  const keyFeatures = Array.isArray(specsObj.keyFeatures)
    ? specsObj.keyFeatures
    : (Array.isArray(rest.keyFeatures) ? rest.keyFeatures : []);
  const specTableColumns = Array.isArray(specsObj.specTableColumns) && specsObj.specTableColumns.length > 0
    ? specsObj.specTableColumns
    : (Array.isArray(rest.specTableColumns) && rest.specTableColumns.length > 0 ? rest.specTableColumns : ['Parameter', 'Details', 'Specification']);
  const specTableRows = Array.isArray(specsObj.specTableRows)
    ? specsObj.specTableRows
    : (Array.isArray(rest.specTableRows) ? rest.specTableRows : []);

  return {
    ...rest,
    specifications: specsObj,
    specs: specsObj,
    brandTag: specsObj.brandTag ?? rest.brandTag ?? '',
    capacityLabel: specsObj.capacityLabel || 'Production Capacity',
    powerLabel: specsObj.powerLabel || 'Total Connected Power',
    brickSizeLabel: specsObj.brickSizeLabel || 'Brick / Mold Size',
    brickSize: p.brickSize || specsObj.brickSize || '',
    galleryImages,
    featureBadges,
    highlights,
    advantages,
    keyFeatures,
    specTableColumns,
    specTableRows,
    imageUrl: primaryImageUrl,
    images: imageList,
    image: primaryImageUrl,
    enquiryCount: realEnquiryCount,
    enquiriesCount: realEnquiryCount,
    status: p.isActive ? 'Active' : 'Inactive',
    metaTitle: specsObj.metaTitle || specsObj.seoMetaTitle || '',
    metaDescription: specsObj.metaDescription || specsObj.seoMetaDescription || '',
    seoMetaTitle: specsObj.seoMetaTitle || specsObj.metaTitle || '',
    seoMetaDescription: specsObj.seoMetaDescription || specsObj.metaDescription || '',
    focusKeyword: specsObj.focusKeyword || '',
    secondaryKeywords: specsObj.secondaryKeywords || '',
  };
};

import { DEFAULT_PRODUCT_V15B, DEFAULT_CATALOG_PRODUCTS } from '../constants/defaultCatalog';
export { DEFAULT_PRODUCT_V15B, DEFAULT_CATALOG_PRODUCTS };

/**
 * Ensures all 13 official Jupiter machinery models exist and are up to date in the database.
 */
export const ensureDefaultProducts = async (): Promise<void> => {
  // DB-only mode: Do not auto-seed default catalogs into database
  return;
};

/**
 * Normalizes product ordering across categories so that products without
 * an explicit order get a clean sequential value without clobbering existing orders.
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
        // Only set order if product has no order or order is non-positive
        if (!catProducts[i].order || catProducts[i].order <= 0) {
          await prisma.product.update({
            where: { id: catProducts[i].id },
            data: { order: i + 1 },
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
    } else if (!isAdmin) {
      // Public requests exclude inactive products by default
      whereClause.isActive = true;
    }

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
        images: { orderBy: { order: 'asc' } },
        details: { orderBy: { order: 'asc' } },
        _count: {
          select: { enquiries: true },
        },
      },
      orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
    });

    const mapped = products.map(mapProductResponse);
    res.status(200).json({ success: true, count: mapped.length, data: mapped });
  } catch (error) {
    console.error('[Product] getProducts error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch products from database' });
  }
};

// GET /api/products/:idOrSlug
export const getProductByIdOrSlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const rawParam = (req.params.idOrSlug as string) || '';
    const cleanParam = rawParam.trim().replace(/\/+$/, '').replace(/\.html$/i, '');

    const product = await prisma.product.findFirst({
      where: {
        OR: [
          { id: cleanParam },
          { slug: cleanParam },
          { slug: { equals: cleanParam, mode: 'insensitive' } },
        ],
      },
      include: {
        images: { orderBy: { order: 'asc' } },
        details: { orderBy: { order: 'asc' } },
        _count: {
          select: { enquiries: true },
        },
      },
    });

    if (!product) {
      res.status(404).json({ success: false, message: `Product '${cleanParam}' not found` });
      return;
    }

    if (rawParam.toLowerCase().endsWith('.html')) {
      res.setHeader('Link', `<https://jupitergroups.in/products/${product.slug}>; rel="canonical"`);
    }

    res.status(200).json({ success: true, data: mapProductResponse(product) });
  } catch (error) {
    console.error('[Product] getProductByIdOrSlug error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
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
      imageUrl,
      images,
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

    // Resolve uploaded files (Contract: field name 'images', up to 10)
    const uploadedFiles = getUploadedFiles(req);
    const uploadedImagePaths = uploadedFiles.map((f) => `/uploads/products/${f.filename}`);

    // Persist uploaded files into Media table for durable database storage
    for (const f of uploadedFiles) {
      try {
        const fileBuf = fs.readFileSync(f.path);
        await prisma.media.create({
          data: {
            filename: f.filename,
            mimeType: f.mimetype || 'image/jpeg',
            size: f.size,
            data: fileBuf,
            url: `/uploads/products/${f.filename}`,
          },
        });
      } catch (err) {
        console.warn('[Product] Note saving uploaded file to media table:', err);
      }
    }

    // Resolve images sent in request body if any (excluding temporary blob URLs)
    let bodyImages: string[] = [];
    if (Array.isArray(images)) {
      bodyImages = images.filter((img: any) => typeof img === 'string' && img.trim().length > 0 && !img.startsWith('blob:'));
    } else if (typeof images === 'string' && images.trim().length > 0) {
      try {
        const parsed = JSON.parse(images);
        if (Array.isArray(parsed)) {
          bodyImages = parsed.filter((img: any) => typeof img === 'string' && img.trim().length > 0 && !img.startsWith('blob:'));
        } else if (!images.startsWith('blob:')) {
          bodyImages = [images.trim()];
        }
      } catch {
        bodyImages = images.split(',').map((s: string) => s.trim()).filter((s: string) => Boolean(s) && !s.startsWith('blob:'));
      }
    }

    if (bodyImages.length === 0) {
      if (imageUrl && typeof imageUrl === 'string' && imageUrl.trim() && !imageUrl.startsWith('blob:')) {
        bodyImages.push(imageUrl.trim());
      } else if (image && typeof image === 'string' && image.trim() && !image.startsWith('blob:')) {
        bodyImages.push(image.trim());
      }
    }

    // Final list of images
    const finalImagesList = uploadedImagePaths.length > 0 ? uploadedImagePaths : bodyImages;
    const coverImage = finalImagesList[0] || '';

    // Parse specifications if stringified in multipart/form-data
    let parsedSpecs: Record<string, any> = {};
    if (specifications) {
      if (typeof specifications === 'string') {
        try {
          parsedSpecs = JSON.parse(specifications);
        } catch {
          parsedSpecs = {};
        }
      } else if (typeof specifications === 'object' && specifications !== null) {
        parsedSpecs = specifications;
      }
    }

    const parseJsonField = (val: any) => {
      if (typeof val === 'string') {
        try {
          return JSON.parse(val);
        } catch {
          return val;
        }
      }
      return val;
    };

    const resolvedCapacity = (capacity && String(capacity).trim()) || (parsedSpecs.capacity && String(parsedSpecs.capacity).trim()) || '';
    const resolvedPower = (power && String(power).trim()) || (parsedSpecs.power && String(parsedSpecs.power).trim()) || '';
    const resolvedBrickSize = (brickSize && String(brickSize).trim()) || (parsedSpecs.brickSize && String(parsedSpecs.brickSize).trim()) || null;

    const specsPayload: Record<string, any> = {
      ...parsedSpecs,
      brandTag: brandTag !== undefined ? brandTag : (parsedSpecs.brandTag || ''),
      brickSize: resolvedBrickSize,
      capacity: resolvedCapacity,
      power: resolvedPower,
      capacityLabel: parsedSpecs.capacityLabel || 'Production Capacity',
      powerLabel: parsedSpecs.powerLabel || 'Total Connected Power',
      brickSizeLabel: parsedSpecs.brickSizeLabel || 'Brick / Mold Size',
      galleryImages: galleryImages !== undefined ? parseJsonField(galleryImages) : (parsedSpecs.galleryImages || []),
      featureBadges: featureBadges !== undefined ? parseJsonField(featureBadges) : (parsedSpecs.featureBadges || []),
      specTableColumns: specTableColumns !== undefined ? parseJsonField(specTableColumns) : (parsedSpecs.specTableColumns || ['Parameter', 'Details', 'Specification']),
      specTableRows: specTableRows !== undefined ? parseJsonField(specTableRows) : (parsedSpecs.specTableRows || []),
      highlights: highlights !== undefined ? parseJsonField(highlights) : (parsedSpecs.highlights || []),
      advantages: advantages !== undefined ? parseJsonField(advantages) : (parsedSpecs.advantages || []),
      keyFeatures: keyFeatures !== undefined ? parseJsonField(keyFeatures) : (parsedSpecs.keyFeatures || []),
    };

    const isActive =
      reqIsActive !== undefined
        ? reqIsActive === true || reqIsActive === 'true' || reqIsActive === 1 || reqIsActive === '1'
        : reqStatus !== undefined
        ? reqStatus === 'Active'
        : true;

    // If order not supplied, place at end of category
    let order = reqOrder !== undefined ? Math.max(0, parseInt(reqOrder, 10)) : 0;
    if (order === 0) {
      const maxOrderProd = await prisma.product.findFirst({
        where: { category: category || 'Fly Ash Brick Machine' },
        orderBy: { order: 'desc' },
      });
      order = (maxOrderProd?.order ?? 0) + 1;
    }

    const createdProduct = await prisma.$transaction(async (tx) => {
      const prod = await tx.product.create({
        data: {
          name: baseName,
          slug: finalSlug,
          category: category || 'Fly Ash Brick Machine',
          description: description || '',
          capacity: resolvedCapacity,
          power: resolvedPower,
          brickSize: resolvedBrickSize,
          image: coverImage,
          specifications: specsPayload,
          isActive,
          order,
          ...(finalImagesList.length > 0
            ? {
                images: {
                  create: finalImagesList.map((url, idx) => ({
                    url,
                    isPrimary: idx === 0,
                    order: idx,
                  })),
                },
              }
            : {}),
        },
      });

      // Synchronize relational ProductDetailItem table
      const detailItemsToCreate: any[] = [];
      const highlightsArr = Array.isArray(specsPayload.highlights) ? specsPayload.highlights : [];
      highlightsArr.forEach((h: any, idx: number) => {
        if (h && h.title) {
          detailItemsToCreate.push({
            productId: prod.id,
            type: 'Highlight',
            title: String(h.title).trim(),
            description: h.description ? String(h.description).trim() : '',
            order: idx,
          });
        }
      });
      const advantagesArr = Array.isArray(specsPayload.advantages) ? specsPayload.advantages : [];
      advantagesArr.forEach((a: any, idx: number) => {
        if (a && a.title) {
          detailItemsToCreate.push({
            productId: prod.id,
            type: 'Advantage',
            title: String(a.title).trim(),
            description: a.description ? String(a.description).trim() : '',
            order: idx,
          });
        }
      });
      const keyFeaturesArr = Array.isArray(specsPayload.keyFeatures) ? specsPayload.keyFeatures : [];
      keyFeaturesArr.forEach((kf: any, idx: number) => {
        if (kf && String(kf).trim()) {
          detailItemsToCreate.push({
            productId: prod.id,
            type: 'KeyFeature',
            title: String(kf).trim(),
            order: idx,
          });
        }
      });
      const featureBadgesArr = Array.isArray(specsPayload.featureBadges) ? specsPayload.featureBadges : [];
      featureBadgesArr.forEach((fb: any, idx: number) => {
        if (fb && String(fb).trim()) {
          detailItemsToCreate.push({
            productId: prod.id,
            type: 'FeatureBadge',
            title: String(fb).trim(),
            order: idx,
          });
        }
      });
      const specTableRowsArr = Array.isArray(specsPayload.specTableRows) ? specsPayload.specTableRows : [];
      specTableRowsArr.forEach((r: any, idx: number) => {
        if (r && typeof r === 'object') {
          const param = r.Parameter || Object.keys(r)[0] || `Spec ${idx + 1}`;
          const detail = r.Details || r[Object.keys(r)[1]] || '';
          const spec = r.Specification || r[Object.keys(r)[2]] || '';
          detailItemsToCreate.push({
            productId: prod.id,
            type: 'Specification',
            title: String(param),
            value: String(detail),
            description: String(spec),
            order: idx,
          });
        }
      });

      if (detailItemsToCreate.length > 0) {
        await tx.productDetailItem.createMany({
          data: detailItemsToCreate,
        });
      }

      return tx.product.findUnique({
        where: { id: prod.id },
        include: {
          images: { orderBy: { order: 'asc' } },
          details: { orderBy: { order: 'asc' } },
          _count: {
            select: { enquiries: true },
          },
        },
      });
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: mapProductResponse(createdProduct),
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/products/:id
export const updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id as string;

    // Strict lookup: match by primary id first, then slug, ensuring separate machinery records never overwrite one another
    let existing = await prisma.product.findUnique({
      where: { id },
      include: {
        images: { orderBy: { order: 'asc' } },
        details: { orderBy: { order: 'asc' } },
      },
    });

    if (!existing) {
      existing = await prisma.product.findFirst({
        where: {
          OR: [
            { slug: id },
            { slug: { equals: id, mode: 'insensitive' } },
          ],
        },
        include: {
          images: { orderBy: { order: 'asc' } },
          details: { orderBy: { order: 'asc' } },
        },
      });
    }

    if (!existing) {
      res.status(404).json({ success: false, message: `Product '${id}' not found in database` });
      return;
    }

    // Whitelist only Prisma schema Product fields to prevent "Unknown argument" errors
    const allowedData: any = {};
    if (req.body.name !== undefined) allowedData.name = String(req.body.name).trim();
    if (req.body.slug !== undefined) allowedData.slug = String(req.body.slug).trim();
    if (req.body.category !== undefined) allowedData.category = String(req.body.category).trim();
    if (req.body.description !== undefined) allowedData.description = req.body.description;
    if (req.body.capacity !== undefined) allowedData.capacity = req.body.capacity && String(req.body.capacity).trim() ? String(req.body.capacity).trim() : '';
    if (req.body.power !== undefined) allowedData.power = req.body.power && String(req.body.power).trim() ? String(req.body.power).trim() : '';
    if (req.body.brickSize !== undefined) allowedData.brickSize = req.body.brickSize && String(req.body.brickSize).trim() ? String(req.body.brickSize).trim() : null;

    // Image handling:
    // "Product update without new images must preserve existing images."
    const uploadedFiles = getUploadedFiles(req);
    const hasUploadedFiles = uploadedFiles.length > 0;

    // Persist uploaded files into Media table
    for (const f of uploadedFiles) {
      try {
        const fileBuf = fs.readFileSync(f.path);
        await prisma.media.create({
          data: {
            filename: f.filename,
            mimeType: f.mimetype || 'image/jpeg',
            size: f.size,
            data: fileBuf,
            url: `/uploads/products/${f.filename}`,
            productId: existing.id,
          },
        });
      } catch (err) {
        console.warn('[Product] Note saving uploaded file to media table:', err);
      }
    }

    const hasBodyImages =
      (req.body.images !== undefined && req.body.images !== '') ||
      (req.body.imageUrl !== undefined && req.body.imageUrl !== '') ||
      (req.body.image !== undefined && req.body.image !== '');

    let newImagesList: string[] | null = null;
    if (hasUploadedFiles) {
      newImagesList = uploadedFiles.map((f) => `/uploads/products/${f.filename}`);
    } else if (hasBodyImages) {
      let parsedList: string[] = [];
      if (Array.isArray(req.body.images)) {
        parsedList = req.body.images.filter((img: any) => typeof img === 'string' && img.trim().length > 0 && !img.startsWith('blob:'));
      } else if (typeof req.body.images === 'string' && req.body.images.trim().length > 0) {
        try {
          const parsed = JSON.parse(req.body.images);
          if (Array.isArray(parsed)) {
            parsedList = parsed.filter((img: any) => typeof img === 'string' && img.trim().length > 0 && !img.startsWith('blob:'));
          } else if (!req.body.images.startsWith('blob:')) {
            parsedList = [req.body.images.trim()];
          }
        } catch {
          parsedList = req.body.images.split(',').map((s: string) => s.trim()).filter((s: string) => Boolean(s) && !s.startsWith('blob:'));
        }
      }

      if (parsedList.length === 0) {
        if (req.body.imageUrl && typeof req.body.imageUrl === 'string' && req.body.imageUrl.trim() && !req.body.imageUrl.startsWith('blob:')) {
          parsedList.push(req.body.imageUrl.trim());
        } else if (req.body.image && typeof req.body.image === 'string' && req.body.image.trim() && !req.body.image.startsWith('blob:')) {
          parsedList.push(req.body.image.trim());
        }
      }

      if (parsedList.length > 0) {
        newImagesList = parsedList;
      }
    }

    if (newImagesList && newImagesList.length > 0) {
      allowedData.image = newImagesList[0];
    }
    // If newImagesList === null, allowedData.image is NOT set! Existing image is preserved!

    if (req.body.isActive !== undefined) {
      allowedData.isActive =
        req.body.isActive === true || req.body.isActive === 'true' || req.body.isActive === 1 || req.body.isActive === '1';
    } else if (req.body.status !== undefined) {
      allowedData.isActive = req.body.status === 'Active';
    }
    if (req.body.order !== undefined) allowedData.order = Math.max(0, parseInt(req.body.order, 10));

    // Merge specifications
    const currentSpecs = (existing.specifications as Record<string, any>) || {};
    let newSpecs: Record<string, any> = {};
    if (req.body.specifications) {
      if (typeof req.body.specifications === 'string') {
        try {
          newSpecs = JSON.parse(req.body.specifications);
        } catch {
          newSpecs = {};
        }
      } else if (typeof req.body.specifications === 'object' && req.body.specifications !== null) {
        newSpecs = req.body.specifications;
      }
    }

    const parseJsonField = (val: any) => {
      if (typeof val === 'string') {
        try {
          return JSON.parse(val);
        } catch {
          return val;
        }
      }
      return val;
    };

    const extraFields = [
      'brandTag',
      'brickSize',
      'capacity',
      'power',
      'capacityLabel',
      'powerLabel',
      'brickSizeLabel',
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
        newSpecs[f] = parseJsonField(req.body[f]);
      }
    }

    // Keep top-level fields aligned with specifications
    if (allowedData.brickSize === undefined && newSpecs.brickSize !== undefined) {
      allowedData.brickSize = newSpecs.brickSize;
    }
    if (allowedData.capacity === undefined && newSpecs.capacity !== undefined) {
      allowedData.capacity = newSpecs.capacity;
    }
    if (allowedData.power === undefined && newSpecs.power !== undefined) {
      allowedData.power = newSpecs.power;
    }

    allowedData.specifications = { ...currentSpecs, ...newSpecs };

    // Atomically execute product update and child table synchronization via transaction
    const finalProduct = await prisma.$transaction(async (tx) => {
      const updated = await tx.product.update({
        where: { id: existing.id },
        data: allowedData,
      });

      // Update ProductImage table if new images or gallery images were sent
      const resolvedGalleryImages = Array.isArray(allowedData.specifications?.galleryImages)
        ? allowedData.specifications.galleryImages.filter((img: any) => typeof img === 'string' && img.trim() && !img.startsWith('blob:'))
        : [];

      if (newImagesList && newImagesList.length > 0) {
        await tx.productImage.deleteMany({ where: { productId: existing.id } });
        const allImages = [
          newImagesList[0],
          ...resolvedGalleryImages.filter((img: string) => img !== newImagesList![0])
        ];
        await tx.productImage.createMany({
          data: allImages.map((url, idx) => ({
            productId: existing.id,
            url,
            isPrimary: idx === 0,
            order: idx,
          })),
        });
      } else if (resolvedGalleryImages.length > 0) {
        const cover = updated.image || existing.image;
        const allImages = [cover, ...resolvedGalleryImages.filter((img: string) => img !== cover)];
        await tx.productImage.deleteMany({ where: { productId: existing.id } });
        await tx.productImage.createMany({
          data: allImages.map((url, idx) => ({
            productId: existing.id,
            url,
            isPrimary: idx === 0,
            order: idx,
          })),
        });
      }

      // Synchronize ProductDetailItem table
      await tx.productDetailItem.deleteMany({ where: { productId: existing.id } });
      const detailItemsToCreate: any[] = [];

      const highlightsArr = Array.isArray(allowedData.specifications?.highlights) ? allowedData.specifications.highlights : [];
      highlightsArr.forEach((h: any, idx: number) => {
        if (h && h.title) {
          detailItemsToCreate.push({
            productId: existing.id,
            type: 'Highlight',
            title: String(h.title).trim(),
            description: h.description ? String(h.description).trim() : '',
            order: idx,
          });
        }
      });

      const advantagesArr = Array.isArray(allowedData.specifications?.advantages) ? allowedData.specifications.advantages : [];
      advantagesArr.forEach((a: any, idx: number) => {
        if (a && a.title) {
          detailItemsToCreate.push({
            productId: existing.id,
            type: 'Advantage',
            title: String(a.title).trim(),
            description: a.description ? String(a.description).trim() : '',
            order: idx,
          });
        }
      });

      const keyFeaturesArr = Array.isArray(allowedData.specifications?.keyFeatures) ? allowedData.specifications.keyFeatures : [];
      keyFeaturesArr.forEach((kf: any, idx: number) => {
        if (kf && String(kf).trim()) {
          detailItemsToCreate.push({
            productId: existing.id,
            type: 'KeyFeature',
            title: String(kf).trim(),
            order: idx,
          });
        }
      });

      const featureBadgesArr = Array.isArray(allowedData.specifications?.featureBadges) ? allowedData.specifications.featureBadges : [];
      featureBadgesArr.forEach((fb: any, idx: number) => {
        if (fb && String(fb).trim()) {
          detailItemsToCreate.push({
            productId: existing.id,
            type: 'FeatureBadge',
            title: String(fb).trim(),
            order: idx,
          });
        }
      });

      const specTableRowsArr = Array.isArray(allowedData.specifications?.specTableRows) ? allowedData.specifications.specTableRows : [];
      specTableRowsArr.forEach((r: any, idx: number) => {
        if (r && typeof r === 'object') {
          const param = r.Parameter || Object.keys(r)[0] || `Spec ${idx + 1}`;
          const detail = r.Details || r[Object.keys(r)[1]] || '';
          const spec = r.Specification || r[Object.keys(r)[2]] || '';
          detailItemsToCreate.push({
            productId: existing.id,
            type: 'Specification',
            title: String(param),
            value: String(detail),
            description: String(spec),
            order: idx,
          });
        }
      });

      if (detailItemsToCreate.length > 0) {
        await tx.productDetailItem.createMany({
          data: detailItemsToCreate,
        });
      }

      return tx.product.findUnique({
        where: { id: existing.id },
        include: {
          images: { orderBy: { order: 'asc' } },
          details: { orderBy: { order: 'asc' } },
          _count: {
            select: { enquiries: true },
          },
        },
      });
    });

    res.status(200).json({
      success: true,
      message: 'Product updated successfully in permanent database',
      data: mapProductResponse(finalProduct || existing),
    });
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
        images: { orderBy: { order: 'asc' } },
        details: { orderBy: { order: 'asc' } },
        _count: {
          select: { enquiries: true },
        },
      },
    });

    const mapped = mapProductResponse(updated);

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
        images: { orderBy: { order: 'asc' } },
        details: { orderBy: { order: 'asc' } },
        _count: { select: { enquiries: true } },
      },
      orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
    });

    const mapped = updatedCategoryProducts.map(mapProductResponse);

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
    console.error('[Product] getProductEnquiries error:', error);
    res.status(200).json({ success: true, count: 0, data: [] });
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

import fs from 'fs';

// POST /api/products/upload (Dedicated product image upload endpoint, supporting multiple images)
export const uploadProductImageHandler = async (req: Request, res: Response): Promise<void> => {
  const files = getUploadedFiles(req);
  if (files.length === 0) {
    res.status(400).json({
      success: false,
      message: "No image file provided. Frontend upload field name must be 'images' (or 'image').",
    });
    return;
  }

  for (const f of files) {
    try {
      const fileBuf = fs.readFileSync(f.path);
      await prisma.media.create({
        data: {
          filename: f.filename,
          mimeType: f.mimetype || 'image/jpeg',
          size: f.size,
          data: fileBuf,
          url: `/uploads/products/${f.filename}`,
        },
      });
    } catch (e) {
      console.warn('[Product] Note saving to media table:', e);
    }
  }

  const relativePaths = files.map((f) => `/uploads/products/${f.filename}`);
  res.status(201).json({
    success: true,
    message: `${files.length} product image(s) uploaded successfully`,
    imageUrl: relativePaths[0],
    images: relativePaths,
    url: relativePaths[0],
    image: relativePaths[0],
    filenames: files.map((f) => f.filename),
    count: files.length,
  });
};

// POST /api/products/bulk-import (Bulk import products via CSV, field name: 'file')
export const bulkImportProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let csvContent = '';
    if (req.file && req.file.buffer) {
      csvContent = req.file.buffer.toString('utf8');
    } else if (typeof req.body === 'string' && req.body.trim()) {
      csvContent = req.body;
    } else if (req.body && typeof req.body.csv === 'string') {
      csvContent = req.body.csv;
    }

    if (!csvContent || !csvContent.trim()) {
      res.status(400).json({
        success: false,
        message: "CSV file is required with field name 'file'.",
        created: 0,
        failed: 0,
        errors: [{ row: 0, error: "Missing uploaded file. Form field name must be 'file'." }],
      });
      return;
    }

    const records = parseCSV(csvContent);

    if (records.length === 0) {
      res.status(400).json({
        success: false,
        message: 'CSV file is empty or missing headers.',
        created: 0,
        failed: 0,
        errors: [{ row: 0, error: 'No data rows found in CSV' }],
      });
      return;
    }

    let createdCount = 0;
    let failedCount = 0;
    const errors: Array<{ row: number; name?: string; error: string }> = [];
    const createdProducts: any[] = [];

    // Valid existing fields in Product schema:
    // name, slug, category, description, capacity, power, brickSize, image, specifications, isActive, order
    for (let i = 0; i < records.length; i++) {
      const row = records[i];
      const rowNumber = i + 2; // header is row 1, 1-indexed for user readability

      // Extract and normalize values
      const name = (row.name || row.Name || row.productName || row['Product Name'] || '').trim();
      const capacity = (row.capacity || row.Capacity || '').trim();
      const power = (row.power || row.Power || '').trim();
      const category = (row.category || row.Category || 'Fly Ash Brick Machine').trim();
      const description = (row.description || row.Description || '').trim();
      const brickSize = (row.brickSize || row.BrickSize || row['Brick Size'] || '').trim();
      const rawImageUrl = (
        row.imageUrl ||
        row.ImageUrl ||
        row['Image URL'] ||
        row.image ||
        row.Image ||
        ''
      ).trim();
      const rawIsActive = (row.isActive ?? row.IsActive ?? row.status ?? row.Status ?? '').toString().trim().toLowerCase();
      const rawOrder = (row.order || row.Order || '').trim();
      const brandTag = (row.brandTag || row.BrandTag || row['Brand Tag'] || '').trim();
      const keyFeatures = (row.keyFeatures || row.KeyFeatures || row['Key Features'] || row.features || row.Features || '').trim();
      const highlights = (row.highlights || row.Highlights || '').trim();
      const advantages = (row.advantages || row.Advantages || '').trim();

      // Validate required product fields
      if (!name) {
        errors.push({ row: rowNumber, name: '', error: 'Product name is required' });
        failedCount++;
        continue;
      }
      if (!capacity) {
        errors.push({ row: rowNumber, name, error: 'Product capacity is required' });
        failedCount++;
        continue;
      }
      if (!power) {
        errors.push({ row: rowNumber, name, error: 'Product power is required' });
        failedCount++;
        continue;
      }

      // Safe isActive boolean
      let isActive = true;
      if (rawIsActive === 'false' || rawIsActive === '0' || rawIsActive === 'inactive') {
        isActive = false;
      }

      // Safe order number
      let order = 0;
      if (rawOrder && !isNaN(parseInt(rawOrder, 10))) {
        order = Math.max(0, parseInt(rawOrder, 10));
      } else {
        const maxOrderProd = await prisma.product.findFirst({
          where: { category },
          orderBy: { order: 'desc' },
        });
        order = (maxOrderProd?.order ?? 0) + 1;
      }

      // Unique slug generation (Never delete or overwrite existing products!)
      let candidateSlug = (row.slug || name)
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

      const imageUrl = rawImageUrl || '/uploads/products/default.jpg';

      // Parse specifications and details
      const specsPayload: Record<string, any> = {
        category,
        capacity,
        power,
        brickSize: brickSize || null,
        ...(brandTag ? { brandTag } : {}),
        ...(keyFeatures ? { keyFeatures: keyFeatures.split(';').map((s) => s.trim()).filter(Boolean) } : {}),
        ...(highlights
          ? {
              highlights: highlights.split(';').map((s) => {
                const parts = s.split(':');
                return parts.length > 1
                  ? { title: parts[0].trim(), description: parts.slice(1).join(':').trim() }
                  : { title: s.trim(), description: '' };
              }),
            }
          : {}),
        ...(advantages
          ? {
              advantages: advantages.split(';').map((s) => {
                const parts = s.split(':');
                return parts.length > 1
                  ? { title: parts[0].trim(), description: parts.slice(1).join(':').trim() }
                  : { title: s.trim(), description: '' };
              }),
            }
          : {}),
      };

      const detailItems: Array<{ type: string; title: string; description?: string; order: number }> = [];
      if (keyFeatures) {
        keyFeatures
          .split(';')
          .map((s) => s.trim())
          .filter(Boolean)
          .forEach((feat, idx) => {
            detailItems.push({ type: 'KeyFeature', title: feat, order: idx });
          });
      }
      if (highlights) {
        highlights
          .split(';')
          .map((s) => s.trim())
          .filter(Boolean)
          .forEach((hl, idx) => {
            const parts = hl.split(':');
            detailItems.push({
              type: 'Highlight',
              title: parts[0].trim(),
              description: parts.length > 1 ? parts.slice(1).join(':').trim() : undefined,
              order: idx,
            });
          });
      }

      try {
        const newProduct = await prisma.product.create({
          data: {
            name,
            slug: finalSlug,
            category,
            description: description || null,
            capacity,
            power,
            brickSize: brickSize || null,
            image: imageUrl,
            specifications: specsPayload,
            isActive,
            order,
            ...(imageUrl
              ? {
                  images: {
                    create: [
                      {
                        url: imageUrl,
                        isPrimary: true,
                        order: 0,
                      },
                    ],
                  },
                }
              : {}),
            ...(detailItems.length > 0
              ? {
                  details: {
                    create: detailItems,
                  },
                }
              : {}),
          },
          include: {
            images: { orderBy: { order: 'asc' } },
            details: { orderBy: { order: 'asc' } },
          },
        });

        createdCount++;
        createdProducts.push(mapProductResponse(newProduct));
      } catch (err: any) {
        errors.push({ row: rowNumber, name, error: err.message || 'Database creation error' });
        failedCount++;
      }
    }

    res.status(200).json({
      success: true,
      message: `Bulk import completed: ${createdCount} created, ${failedCount} failed`,
      created: createdCount,
      failed: failedCount,
      errors,
      products: createdProducts,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/products/csv-template or GET /api/products/bulk-import/template
export const getCsvTemplate = (req: Request, res: Response): void => {
  const csvTemplate =
`name,category,capacity,power,brickSize,description,imageUrl,isActive,order,keyFeatures
Fully Automatic Fly Ash Brick Machine,Fly Ash Brick Machine,10000 to 12000 Bricks/Shift,25 HP,230 x 110 x 75 mm,Heavy-duty industrial hydraulic brick making machine with automated pallet feeder.,https://images.unsplash.com/photo-1581091226825-a6a2a5aee158,true,1,PLC Controlled Automation; Heavy Duty Structural Steel; High Compaction Hydraulic System
Paver Block Vibration Table Machine,Paver Block Machine,3500 to 4500 Blocks/Shift,15 HP,80 mm / 60 mm Paver,High frequency compaction vibration table for premium designer concrete pavers.,https://images.unsplash.com/photo-1504307651254-35680f356dfd,true,2,High Frequency Compaction; Rubber Damper Mounts; Wear-resistant Top Plate
Clay Brick Extruder Plant,Clay Brick Machine,8000 Bricks/Shift,20 HP,225 x 100 x 65 mm,Continuous de-airing vacuum pug mill extruder for high strength red clay bricks.,https://images.unsplash.com/photo-1513836279014-a89f7a76ae86,true,3,De-airing Vacuum Chamber; Hardened Alloy Steel Augers; Uniform Extrusion Column`;

  const format = req.query.format;
  if (format === 'json') {
    res.status(200).json({
      success: true,
      headers: ['name', 'category', 'capacity', 'power', 'brickSize', 'description', 'imageUrl', 'isActive', 'order', 'keyFeatures'],
      requiredFields: ['name', 'capacity', 'power'],
      optionalFields: ['category', 'brickSize', 'description', 'imageUrl', 'isActive', 'order', 'keyFeatures'],
      sampleCsv: csvTemplate,
    });
    return;
  }

  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="jupiter_products_import_template.csv"');
  res.status(200).send(csvTemplate);
};

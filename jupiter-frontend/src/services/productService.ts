import { apiClient } from './api';

export interface MachineSpecItem {
  label: string;
  value: string;
}

export interface SubMachineItem {
  id: string;
  name: string;
  slug?: string;
  subCategoryTag: string;
  brandTag?: string;
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
  order?: number;
  status?: 'Active' | 'Draft' | 'Inactive';
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
  slug?: string;
  brandTag?: string;
  category: string;
  categorySlug?: string;
  capacity?: string;
  power?: string;
  brickSize?: string;
  enquiriesCount?: number;
  image: string;
  galleryImages?: string[];
  status: 'Active' | 'Draft' | 'Inactive';
  order?: number;
  description?: string;
  featureBadges?: string[];
  keyFeatures?: string[];
  specs?: Record<string, any>;
  specTableColumns?: string[];
  specTableRows?: Array<Record<string, any>>;
  highlights?: Array<{ title: string; description: string }>;
  advantages?: Array<{ title: string; description: string }>;
}

export const CATEGORY_NAME_TO_SLUG_MAP: Record<string, string> = {
  'Fly Ash Machine': 'fly-ash-brick-machine',
  'Fly Ash Brick Machine': 'fly-ash-brick-machine',
  'Fly Ash Brick Machines': 'fly-ash-brick-machine',
  'Block Machines': 'hollow-and-solid-block-machine',
  'Hollow and Solid Block Machine': 'hollow-and-solid-block-machine',
  'Hollow and Solid Block Making Machine': 'hollow-and-solid-block-machine',
  'Interlock Machine': 'inter-block-making-machine',
  'Inter Block Making Machine': 'inter-block-making-machine',
  'Interlocking Brick Making Machine': 'inter-block-making-machine',
  'Paver Block Machine': 'paver-block-machine',
  'Paver Machines': 'paver-block-machine',
  'Batching Plant': 'batching-plant',
  'Batching & Mixing': 'batching-plant',
  'Storage Silo': 'storage-silo',
  'Material Handling': 'fly-ash-brick-machine',
  'Machine Spares': 'machine-spares',
  'All Genuine Machine Spares': 'machine-spares',
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
// In-Memory Catalog Cache (Populated from Backend Database)
// ─────────────────────────────────────────────────────────

/**
 * Sanitizes any list of products against legacy dummy items
 * and duplicate models to guarantee exact catalog integrity.
 */
export const sanitizeCatalog = (list: ProductItem[]): ProductItem[] => {
  // Known legacy/dummy backend IDs or removed duplicate models
  const forbiddenIds = new Set([
    'prod-interlock-machine',
    'prod-01',
    'prod-02',
    'prod-03',
    'prod-04',
    'prod-05',
    'prod-06',
    'prod-07',
    'prod-08',
    'prod-09',
    'prod-10',
    'prod-block-semi-sbm8',
    'prod-block-vertical',
    'prod-paver-block-machine',
    'prod-batching-mcbp20',
    'cmu5ib2dz0007uvjwnbsiz34y',
    'cmu5ib2ee0008uvjwo5u2we0e'
  ]);

  const seen = new Set<string>();
  const cleaned: ProductItem[] = [];

  for (const p of list) {
    if (!p || !p.name) continue;
    const idLower = (p.id || '').toLowerCase().trim();
    const nameLower = (p.name || '').toLowerCase().trim();

    // 1. Skip forbidden IDs
    if (forbiddenIds.has(idLower)) continue;

    // 2. Skip unwanted 3rd interlocking model (50 Ton Standard)
    if (nameLower.includes('50 ton standard')) continue;

    // 3. Skip obsolete mixer / automation products
    if (nameLower.includes('planetary pan mixer') || nameLower.includes('automatic pallet stacker')) continue;
    if (p.category === 'Mixing Equipment' || p.category === 'Automation & Handling') continue;

    // 4. Skip duplicate products by name + category
    const key = `${nameLower}|${(p.category || '').toLowerCase()}`;
    if (seen.has(key) || seen.has(idLower)) continue;

    seen.add(key);
    seen.add(idLower);
    cleaned.push(p);
  }

  return cleaned;
};

let _cachedProducts: ProductItem[] = [];


// Map a backend API product to frontend ProductItem
const mapBackendProduct = (p: any): ProductItem => {
  const specs = (typeof p.specifications === 'object' && p.specifications !== null)
    ? p.specifications
    : (typeof p.specs === 'object' && p.specs !== null ? p.specs : {});
  const catLower = (p.category || '').toLowerCase();
  const categorySlug = p.categorySlug ||
    CATEGORY_NAME_TO_SLUG_MAP[p.category] ||
    (catLower.includes('fly ash') ? 'fly-ash-brick-machine' :
     catLower.includes('block') ? 'hollow-and-solid-block-machine' :
     catLower.includes('paver') ? 'paver-block-machine' :
     catLower.includes('inter') ? 'inter-block-making-machine' :
     catLower.includes('batch') || catLower.includes('mix') ? 'batching-plant' :
     catLower.includes('silo') ? 'storage-silo' :
     catLower.includes('spare') ? 'machine-spares' : 'fly-ash-brick-machine');
  return {
    id: p.id,
    name: p.name,
    slug: p.slug || (p.name ? p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : ''),
    brandTag: p.brandTag || specs.brandTag || p.category || '',
    category: p.category,
    categorySlug,
    capacity: p.capacity || specs.capacity || (specs['Capacity'] || ''),
    power: p.power || specs.power || (specs['Power'] || ''),
    brickSize: p.brickSize || specs.brickSize || (specs['Brick Size'] || ''),
    enquiriesCount: Number(p.enquiryCount ?? p.enquiriesCount ?? p._count?.enquiries ?? 0),
    image: p.image || specs.image || '',
    galleryImages: (Array.isArray(p.galleryImages) && p.galleryImages.length > 0) ? p.galleryImages : (Array.isArray(specs.galleryImages) ? specs.galleryImages : []),
    status: (p.status || (p.isActive === false ? 'Inactive' : (p.isActive === true ? 'Active' : undefined)) || specs.status || 'Active') as 'Active' | 'Draft' | 'Inactive',
    order: Number(p.order ?? specs.order ?? specs.displayOrder ?? 0),
    description: p.description || '',
    featureBadges: (Array.isArray(p.featureBadges) && p.featureBadges.length > 0) ? p.featureBadges : (Array.isArray(specs.featureBadges) && specs.featureBadges.length > 0 ? specs.featureBadges : []),
    keyFeatures: (Array.isArray(p.keyFeatures) && p.keyFeatures.length > 0) ? p.keyFeatures : (Array.isArray(specs.keyFeatures) && specs.keyFeatures.length > 0 ? specs.keyFeatures : []),
    specs: typeof specs === 'object' ? specs : {},
    specTableColumns: (Array.isArray(p.specTableColumns) && p.specTableColumns.length > 0) ? p.specTableColumns : (Array.isArray(specs.specTableColumns) && specs.specTableColumns.length > 0 ? specs.specTableColumns : ['Parameter', 'Details']),
    specTableRows: (Array.isArray(p.specTableRows) && p.specTableRows.length > 0) ? p.specTableRows : (Array.isArray(specs.specTableRows) ? specs.specTableRows : []),
    highlights: (Array.isArray(p.highlights) && p.highlights.length > 0) ? p.highlights : (Array.isArray(specs.highlights) ? specs.highlights : []),
    advantages: (Array.isArray(p.advantages) && p.advantages.length > 0) ? p.advantages : (Array.isArray(specs.advantages) ? specs.advantages : []),
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
    const response = await apiClient.get('/products', { params, timeout: 10000 });
    const data = response.data?.data || response.data || [];
    const products = Array.isArray(data) ? data.map(mapBackendProduct) : [];

    _cachedProducts = sanitizeCatalog(products);
    window.dispatchEvent(new Event('jupiter_products_updated'));
    return _cachedProducts;
  } catch {
    // Backend unavailable — return cached products
  }
  return _cachedProducts;
};

export const fetchProductById = async (idOrSlug: string): Promise<ProductItem | null> => {
  try {
    const response = await apiClient.get(`/products/${encodeURIComponent(idOrSlug)}`, { timeout: 10000 });
    const data = response.data?.data || response.data;
    if (data) return mapBackendProduct(data);
  } catch {
    // Backend unavailable — fall through to cache
  }
  return _cachedProducts.find(p => p.id === idOrSlug || p.categorySlug === idOrSlug) || null;
};

export const addProduct = async (product: Partial<ProductItem>): Promise<ProductItem> => {
  const categoryName = product.category || 'Fly Ash Brick Machine';
  const slug = product.name
    ? product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    : `product-${Date.now()}`;

  const specsPayload = {
    ...(product.specs || {}),
    brandTag: product.brandTag || categoryName,
    brickSize: product.brickSize || '',
    galleryImages: product.galleryImages || [],
    featureBadges: product.featureBadges || [],
    specTableColumns: product.specTableColumns || ['Parameter', 'Details'],
    specTableRows: product.specTableRows || [],
    highlights: product.highlights || [],
    advantages: product.advantages || [],
    keyFeatures: product.keyFeatures || [],
    order: product.order !== undefined ? product.order : _cachedProducts.length + 1,
    status: product.status || 'Active',
  };

  const payload = {
    name: product.name || 'New Machine Model',
    slug,
    category: categoryName,
    description: product.description || `${product.name || 'Machine'} engineered for high reliability and heavy-duty manufacturing.`,
    capacity: product.capacity || '',
    power: product.power || '',
    image: product.image || '/images/flyash-vertical-machine.png',
    specifications: specsPayload,
  };

  // Directly save to backend database
  const res = await apiClient.post('/products', payload, { timeout: 15000 });
  const backendItem = res.data?.data;
  const created: ProductItem = backendItem ? mapBackendProduct(backendItem) : {
    id: `PROD-${Date.now()}`,
    name: payload.name,
    category: payload.category,
    categorySlug: CATEGORY_NAME_TO_SLUG_MAP[categoryName] || 'fly-ash-brick-machine',
    brandTag: product.brandTag || categoryName,
    capacity: payload.capacity,
    power: payload.power,
    brickSize: product.brickSize || '',
    image: payload.image,
    galleryImages: product.galleryImages || [],
    status: product.status || 'Active',
    order: specsPayload.order,
    description: payload.description,
    featureBadges: specsPayload.featureBadges,
    keyFeatures: specsPayload.keyFeatures,
    specs: specsPayload,
    specTableColumns: specsPayload.specTableColumns,
    specTableRows: specsPayload.specTableRows,
    highlights: specsPayload.highlights,
    advantages: specsPayload.advantages
  };

  _cachedProducts = [created, ..._cachedProducts.filter(p => p.id !== created.id)];
  window.dispatchEvent(new Event('jupiter_products_updated'));
  return created;
};

export const updateProduct = async (id: string, updates: Partial<ProductItem>): Promise<ProductItem | null> => {
  const specsPayload = {
    ...(updates.specs || {}),
    brandTag: updates.brandTag,
    brickSize: updates.brickSize,
    galleryImages: updates.galleryImages,
    featureBadges: updates.featureBadges,
    specTableColumns: updates.specTableColumns,
    specTableRows: updates.specTableRows,
    highlights: updates.highlights,
    advantages: updates.advantages,
    keyFeatures: updates.keyFeatures,
    order: updates.order,
    status: updates.status,
  };

  const payload: any = {
    ...updates,
    specifications: specsPayload
  };

  // Directly update in backend database
  const res = await apiClient.put(`/products/${encodeURIComponent(id)}`, payload, { timeout: 15000 });
  const backendItem = res.data?.data;
  const updated: ProductItem = backendItem ? mapBackendProduct(backendItem) : {
    ...(_cachedProducts.find(p => p.id === id) || {}),
    ...updates,
    id
  } as ProductItem;

  _cachedProducts = _cachedProducts.map(p => (p.id === id ? { ...p, ...updated } : p));
  window.dispatchEvent(new Event('jupiter_products_updated'));
  return updated;
};

export const deleteProduct = async (id: string): Promise<boolean> => {
  // Directly delete from backend database
  await apiClient.delete(`/products/${encodeURIComponent(id)}`, { timeout: 15000 });
  _cachedProducts = _cachedProducts.filter(p => p.id !== id);
  window.dispatchEvent(new Event('jupiter_products_updated'));
  return true;
};

export const reorderProduct = async (id: string, direction: 'up' | 'down'): Promise<ProductItem[]> => {
  try {
    const res = await apiClient.patch(`/products/${encodeURIComponent(id)}/reorder`, { direction }, { timeout: 15000 });
    if (res.data?.data && Array.isArray(res.data.data)) {
      _cachedProducts = sanitizeCatalog(res.data.data.map(mapBackendProduct));
      window.dispatchEvent(new Event('jupiter_products_updated'));
      return _cachedProducts;
    }
  } catch (err) {
    console.warn('Backend reorder endpoint error, falling back:', err);
  }
  return await fetchProducts();
};

export const toggleProductStatus = async (id: string, currentStatus: 'Active' | 'Draft' | 'Inactive'): Promise<ProductItem | null> => {
  const newStatus: 'Active' | 'Inactive' = currentStatus === 'Active' ? 'Inactive' : 'Active';
  try {
    const res = await apiClient.patch(`/products/${encodeURIComponent(id)}/toggle-status`, {}, { timeout: 15000 });
    if (res.data?.data) {
      const updated = mapBackendProduct(res.data.data);
      _cachedProducts = _cachedProducts.map(p => (p.id === id ? updated : p));
      window.dispatchEvent(new Event('jupiter_products_updated'));
      return updated;
    }
  } catch (err) {
    try {
      const res = await apiClient.patch(`/products/${encodeURIComponent(id)}/status`, { status: newStatus }, { timeout: 15000 });
      if (res.data?.data) {
        const updated = mapBackendProduct(res.data.data);
        _cachedProducts = _cachedProducts.map(p => (p.id === id ? updated : p));
        window.dispatchEvent(new Event('jupiter_products_updated'));
        return updated;
      }
    } catch (err2) {
      console.warn('Backend toggle failed, falling back to updateProduct:', err2);
    }
  }
  return await updateProduct(id, { status: newStatus });
};

// ─────────────────────────────────────────────────────────
// Synchronous storage accessors
// ─────────────────────────────────────────────────────────

export const getStoredProducts = (): ProductItem[] => {
  return _cachedProducts;
};

export const saveStoredProducts = (products: ProductItem[]): void => {
  _cachedProducts = sanitizeCatalog(products);
  window.dispatchEvent(new Event('jupiter_products_updated'));
};

export const clearAllProducts = async (): Promise<void> => {
  try {
    await apiClient.delete('/products', { timeout: 15000 });
  } catch {
    // Backend unavailable
  }
  _cachedProducts = [];
  window.dispatchEvent(new Event('jupiter_products_updated'));
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

let _categoryMetaOverrides: Record<string, Partial<{ name: string; subTitle: string; introDescription: string; heroImage: string }>> = {};

export const getCategoryMetas = (): Record<string, { name: string; subTitle: string; introDescription: string; heroImage: string; aliases: string[] }> => {
  const merged = { ...BASE_CATEGORY_METAS };
  Object.keys(_categoryMetaOverrides).forEach(slug => {
    if (merged[slug]) {
      merged[slug] = { ...merged[slug], ..._categoryMetaOverrides[slug] };
    } else {
      merged[slug] = _categoryMetaOverrides[slug] as any;
    }
  });
  return merged;
};

export const updateCategoryMeta = (slug: string, updates: Partial<{ name: string; subTitle: string; introDescription: string; heroImage: string }>) => {
  _categoryMetaOverrides[slug] = {
    ...(BASE_CATEGORY_METAS[slug] || {}),
    ...(_categoryMetaOverrides[slug] || {}),
    ...updates,
  };
  window.dispatchEvent(new Event('jupiter_products_updated'));
};

export const getDynamicCategories = (): MachineCategoryData[] => {
  const allProds = getStoredProducts();
  const metas = getCategoryMetas();

  return Object.keys(metas).map(slug => {
    const meta = metas[slug];
    const matchingProds = allProds.filter(p => {
      if (p.status === 'Inactive' || p.status === 'Draft') return false;
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
    }).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

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
        slug: p.slug,
        subCategoryTag: p.brandTag || p.category,
        brandTag: p.brandTag || p.category,
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
        highlights: p.highlights && p.highlights.length > 0 ? p.highlights : [
          { title: 'High Compaction Density', description: 'Delivers sharp block corners, zero internal air voids, and high early compressive strength.' },
          { title: 'Siemens / Delta PLC Automation', description: 'Fully automated cycle management with simple one-touch touchscreen control and safety interlocks.' },
          { title: 'CNC Hardened Alloy Steel Moulds', description: 'Wear-resistant dies machined to exact tolerances ensuring hundreds of thousands of cycles.' },
          { title: 'Heavy-Duty Fabricated Chassis', description: 'Stress-relieved solid steel frame engineered to dampen vibration and withstand continuous 24/7 duty.' },
        ],
        advantages: p.advantages && p.advantages.length > 0 ? p.advantages : [
          { title: 'Reduced Cement Consumption', description: 'Optimum particle packing and vibration density reduces cement ratio by up to 25-30% while retaining strength.' },
          { title: 'Zero Plant Downtime', description: 'Backed by Coimbatore OEM spare parts stock and emergency 24-hour service dispatch across India.' },
          { title: 'Uniform Dimensions & Smooth Finish', description: 'Eliminates thick plastering mortar requirements, cutting masonry installation labor costs.' },
          { title: 'Faster Return on Investment', description: 'High production speed with minimal labor dependency ensures early project break-even and profitability.' },
        ],
        order: p.order,
        status: p.status,
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

// Initial background sync from backend
fetchProducts().catch(() => {});

import { apiClient, API_BASE_URL } from './api';
import { INITIAL_DEFAULT_PRODUCTS, ProductItem } from './productService';
import { INITIAL_SPARES_PRODUCTS } from '../data/initialSpares';

export interface SeedResult {
  success: boolean;
  message: string;
  totalProducts: number;
  seededCount: number;
  failedCount: number;
  details?: string[];
}

// Convert a frontend ProductItem into backend Product payload
export const formatProductForBackend = (prod: ProductItem) => {
  const slug = prod.name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const specifications: Record<string, any> = {
    ...(prod.specs || {}),
    brandTag: prod.brandTag || prod.category,
    brickSize: prod.brickSize || '',
    featureBadges: prod.featureBadges || [],
    galleryImages: prod.galleryImages || [],
    specTableColumns: prod.specTableColumns || [],
    specTableRows: prod.specTableRows || [],
    highlights: prod.highlights || [],
    advantages: prod.advantages || [],
    keyFeatures: prod.keyFeatures || [],
  };

  return {
    name: prod.name,
    slug,
    category: prod.category,
    description: prod.description || `${prod.name} manufactured by Jupiter Industries.`,
    capacity: prod.capacity || 'Standard Capacity',
    power: prod.power || 'Electric Motor',
    image: prod.image || '/images/flyash-vertical-machine.png',
    specifications,
  };
};

// Check if backend API server is online and reachable
export const checkBackendStatus = async (): Promise<{ isOnline: boolean; productCount: number; error?: string }> => {
  try {
    const res = await apiClient.get('/products', { timeout: 3500 });
    const data = res.data?.data || res.data || [];
    const count = Array.isArray(data) ? data.length : 0;
    return { isOnline: true, productCount: count };
  } catch (err: any) {
    return {
      isOnline: false,
      productCount: 0,
      error: err.message || 'Target machine actively refused connection (Server offline)',
    };
  }
};

// Seed all machinery products & spares into live backend PostgreSQL
export const seedBackendDatabase = async (
  onProgress?: (current: number, total: number, itemName: string) => void
): Promise<SeedResult> => {
  const allProducts: ProductItem[] = [
    ...INITIAL_DEFAULT_PRODUCTS,
    ...INITIAL_SPARES_PRODUCTS,
  ];

  let seededCount = 0;
  let failedCount = 0;
  const details: string[] = [];

  for (let i = 0; i < allProducts.length; i++) {
    const prod = allProducts[i];
    if (onProgress) {
      onProgress(i + 1, allProducts.length, prod.name);
    }

    try {
      const payload = formatProductForBackend(prod);
      // POST to backend API (or update if already exists)
      const res = await apiClient.post('/products', payload, { timeout: 8000 });
      if (res.status === 200 || res.status === 201) {
        seededCount++;
        details.push(`✔ Seeded: ${prod.name} (${prod.category})`);
      } else {
        failedCount++;
        details.push(`⚠ Response status ${res.status} for ${prod.name}`);
      }
    } catch (err: any) {
      // If error is 400 or already exists, try update
      if (err.response?.status === 400 || err.response?.data?.message?.includes('already exists') || err.response?.data?.message?.includes('unique')) {
        try {
          const payload = formatProductForBackend(prod);
          await apiClient.put(`/products/${encodeURIComponent(prod.id)}`, payload, { timeout: 8000 });
          seededCount++;
          details.push(`✔ Updated existing: ${prod.name}`);
          continue;
        } catch (updateErr) {
          // Fall through
        }
      }
      failedCount++;
      details.push(`✖ Failed: ${prod.name} (${err.message || 'Network error'})`);
    }
  }

  const success = seededCount > 0;
  return {
    success,
    message: success
      ? `Successfully seeded ${seededCount} of ${allProducts.length} items into backend database!`
      : 'Could not connect to backend server at http://localhost:5000. Please start the backend server.',
    totalProducts: allProducts.length,
    seededCount,
    failedCount,
    details,
  };
};

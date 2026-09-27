const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/services/productService.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Normalize CRLF to LF for consistent editing
content = content.replace(/\r\n/g, '\n');

// 1. Update import
content = content.replace(
  "import { apiClient } from './api';",
  "import { apiClient, extractApiErrorMessage } from './api';"
);

// 2. Update fetchProducts
const oldFetch = `export const fetchProducts = async (category?: string, search?: string): Promise<ProductItem[]> => {
  try {
    const params: Record<string, string> = {};
    if (category) params.category = category;
    if (search) params.search = search;
    const response = await apiClient.get('/products', { params, timeout: 10000 });`;

const newFetch = `export const fetchProducts = async (category?: string, search?: string, isAdmin: boolean = false): Promise<ProductItem[]> => {
  try {
    const params: Record<string, string> = {};
    if (isAdmin || (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin'))) {
      params.admin = 'true';
      params.all = 'true';
      params.includeInactive = 'true';
    }
    if (category) params.category = category;
    if (search) params.search = search;
    const response = await apiClient.get('/products', { params, timeout: 10000 });`;

content = content.replace(oldFetch, newFetch);

// 3. Update addProduct
const oldAdd = `  // Directly save to backend database
  const res = await apiClient.post('/products', payload, { timeout: 15000 });
  const backendItem = res.data?.data;
  const created: ProductItem = backendItem ? mapBackendProduct(backendItem) : {
    id: \`PROD-\${Date.now()}\`,
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
  return created;`;

const newAdd = `  // Directly save to backend database
  try {
    const res = await apiClient.post('/products', payload, { timeout: 15000 });
    const backendItem = res.data?.data;
    const created: ProductItem = backendItem ? mapBackendProduct(backendItem) : {
      id: \`PROD-\${Date.now()}\`,
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
  } catch (err: any) {
    const message = extractApiErrorMessage(err, 'Failed to save product to backend database');
    const enhancedErr = new Error(message);
    enhancedErr.response = err.response;
    throw enhancedErr;
  }`;

content = content.replace(oldAdd, newAdd);

// 4. Update updateProduct
const oldUpdate = `  // Directly update in backend database
  const res = await apiClient.put(\`/products/\${encodeURIComponent(id)}\`, payload, { timeout: 15000 });
  const backendItem = res.data?.data;
  const updated: ProductItem = backendItem ? mapBackendProduct(backendItem) : {
    ...(_cachedProducts.find(p => p.id === id) || {}),
    ...updates,
    id
  } as ProductItem;

  _cachedProducts = _cachedProducts.map(p => (p.id === id ? { ...p, ...updated } : p));
  window.dispatchEvent(new Event('jupiter_products_updated'));
  return updated;`;

const newUpdate = `  // Directly update in backend database
  try {
    const res = await apiClient.put(\`/products/\${encodeURIComponent(id)}\`, payload, { timeout: 15000 });
    const backendItem = res.data?.data;
    const updated: ProductItem = backendItem ? mapBackendProduct(backendItem) : {
      ...(_cachedProducts.find(p => p.id === id) || {}),
      ...updates,
      id
    } as ProductItem;

    _cachedProducts = _cachedProducts.map(p => (p.id === id ? { ...p, ...updated } : p));
    window.dispatchEvent(new Event('jupiter_products_updated'));
    return updated;
  } catch (err: any) {
    const message = extractApiErrorMessage(err, 'Failed to update product in backend database');
    const enhancedErr = new Error(message);
    enhancedErr.response = err.response;
    throw enhancedErr;
  }`;

content = content.replace(oldUpdate, newUpdate);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully patched productService.ts');

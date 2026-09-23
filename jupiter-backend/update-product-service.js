const fs = require('fs');

const path = 'E:/Project/jupiter/jupiter-frontend/src/services/productService.ts';
let content = fs.readFileSync(path, 'utf8');

// 1. Remove the forced injection of firstInterlock in sanitizeCatalog
const oldSanitizeTail = `  // Ensure "Inter Locking Brick Making Machine" (1st product added by user) is present
  const hasFirstInterlock = cleaned.some(p => 
    (p.categorySlug === 'inter-block-making-machine' || p.category === 'Inter Block Making Machine') && 
    (p.id === 'PROD-INTERLOCK-BRICK-MAKING' || p.name.toLowerCase().includes('inter locking brick making'))
  );
  if (!hasFirstInterlock) {
    const firstInterlock = INITIAL_DEFAULT_PRODUCTS.find(p => p.id === 'PROD-INTERLOCK-BRICK-MAKING');
    if (firstInterlock) {
      const intIdx = cleaned.findIndex(p => p.id === 'PROD-INTERLOCK-80T');
      if (intIdx !== -1) {
        cleaned.splice(intIdx, 0, firstInterlock);
      } else {
        cleaned.push(firstInterlock);
      }
    }
  }

  return cleaned;
};

let _cachedProducts: ProductItem[] = sanitizeCatalog([...INITIAL_DEFAULT_PRODUCTS]);`;

const newSanitizeTail = `  return cleaned;
};

let _cachedProducts: ProductItem[] = [];`;

if (content.includes(oldSanitizeTail)) {
  content = content.replace(oldSanitizeTail, newSanitizeTail);
  console.log('✅ Updated sanitizeCatalog & _cachedProducts initialization');
} else {
  console.log('⚠️ Could not find exact sanitizeCatalog pattern, searching for _cachedProducts...');
  content = content.replace(/let _cachedProducts:\s*ProductItem\[\]\s*=\s*sanitizeCatalog\(\[\.\.\.INITIAL_DEFAULT_PRODUCTS\]\);/, 'let _cachedProducts: ProductItem[] = [];');
}

// 2. Update fetchProducts so empty array from backend updates _cachedProducts to []
const oldFetchCheck = `    if (products.length > 0) {
      _cachedProducts = sanitizeCatalog(products);
      window.dispatchEvent(new Event('jupiter_products_updated'));
      return _cachedProducts;
    }`;

const newFetchCheck = `    _cachedProducts = sanitizeCatalog(products);
    window.dispatchEvent(new Event('jupiter_products_updated'));
    return _cachedProducts;`;

if (content.includes(oldFetchCheck)) {
  content = content.replace(oldFetchCheck, newFetchCheck);
  console.log('✅ Updated fetchProducts to set _cachedProducts even when empty');
}

// 3. Update clearAllProducts to call backend DELETE /products
const oldClear = `export const clearAllProducts = (): void => {
  _cachedProducts = [];
  window.dispatchEvent(new Event('jupiter_products_updated'));
};`;

const newClear = `export const clearAllProducts = async (): Promise<void> => {
  try {
    await apiClient.delete('/products', { timeout: 15000 });
  } catch (e) {
    console.warn('Backend clearAllProducts error:', e);
  }
  _cachedProducts = [];
  window.dispatchEvent(new Event('jupiter_products_updated'));
};`;

if (content.includes(oldClear)) {
  content = content.replace(oldClear, newClear);
  console.log('✅ Updated clearAllProducts to call backend API');
}

fs.writeFileSync(path, content, 'utf8');
console.log('Done modifying productService.ts');

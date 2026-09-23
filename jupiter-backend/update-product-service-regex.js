const fs = require('fs');

const path = 'E:/Project/jupiter/jupiter-frontend/src/services/productService.ts';
let content = fs.readFileSync(path, 'utf8');

// 1. Remove the firstInterlock auto-injection in sanitizeCatalog
content = content.replace(
  /\/\/ Ensure "Inter Locking Brick Making Machine"[\s\S]*?return cleaned;\s*\};/,
  'return cleaned;\n};'
);

// 2. Set _cachedProducts to empty array initially
content = content.replace(
  /let _cachedProducts:\s*ProductItem\[\]\s*=\s*[^;]+;/,
  'let _cachedProducts: ProductItem[] = [];'
);

// 3. Update fetchProducts so empty array from backend sets _cachedProducts = []
content = content.replace(
  /if\s*\(\s*products\.length\s*>\s*0\s*\)\s*\{\s*_cachedProducts\s*=\s*sanitizeCatalog\(products\);\s*window\.dispatchEvent\(new Event\('jupiter_products_updated'\)\);\s*return _cachedProducts;\s*\}/,
  `_cachedProducts = sanitizeCatalog(products);
    window.dispatchEvent(new Event('jupiter_products_updated'));
    return _cachedProducts;`
);

// 4. Update clearAllProducts to be async and call backend DELETE /products
content = content.replace(
  /export const clearAllProducts = \(\): void => \{[\s\S]*?_cachedProducts = \[\];[\s\S]*?window\.dispatchEvent\(new Event\('jupiter_products_updated'\)\);[\s\S]*?\};/,
  `export const clearAllProducts = async (): Promise<void> => {
  try {
    await apiClient.delete('/products', { timeout: 15000 });
  } catch (e) {
    console.warn('Backend clearAllProducts error:', e);
  }
  _cachedProducts = [];
  window.dispatchEvent(new Event('jupiter_products_updated'));
};`
);

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully updated productService.ts with regex!');

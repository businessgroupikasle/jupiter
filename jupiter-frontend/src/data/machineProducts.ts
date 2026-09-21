export * from '../services/productService';
import { getDynamicCategories } from '../services/productService';

// Proxy object for backward compatibility so `MACHINE_CATEGORIES` always retrieves fresh dynamic data
export const MACHINE_CATEGORIES = new Proxy([], {
  get(_target, prop) {
    const cats = getDynamicCategories();
    return (cats as any)[prop];
  }
});

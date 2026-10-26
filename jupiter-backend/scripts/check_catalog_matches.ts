import { DEFAULT_CATALOG_PRODUCTS } from '../src/constants/defaultCatalog';
import fs from 'fs';

const products = JSON.parse(fs.readFileSync('C:\\Users\\Administrator\\.gemini\\antigravity-ide\\brain\\c4e8bf0f-de8e-4866-9686-3890fd7fdcee\\scratch\\all_15_products.json', 'utf-8'));

console.log('Comparing 15 PDF products with defaultCatalog:');
products.forEach(p => {
  const match = DEFAULT_CATALOG_PRODUCTS.find(d => 
    d.name.toLowerCase().trim() === p.name.toLowerCase().trim() ||
    p.name.toLowerCase().includes(d.name.toLowerCase()) ||
    d.name.toLowerCase().includes(p.name.toLowerCase())
  );
  if (match) {
    console.log(`[MATCH] PDF: "${p.name}" -> Catalog: "${match.name}" (ID: ${match.id})`);
  } else {
    console.log(`[NO CATALOG MATCH] PDF: "${p.name}"`);
  }
});

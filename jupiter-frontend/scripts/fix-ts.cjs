const fs = require('fs');
const path = require('path');

// 1. Fix enquiryService.ts
const enqPath = path.join(__dirname, '../src/services/enquiryService.ts');
let enqContent = fs.readFileSync(enqPath, 'utf8');
enqContent = enqContent.replace(
  "import { API_BASE_URL, apiClient } from './api';",
  "import { apiClient } from './api';"
);
fs.writeFileSync(enqPath, enqContent, 'utf8');

// 2. Fix productService.ts
const prodPath = path.join(__dirname, '../src/services/productService.ts');
let prodContent = fs.readFileSync(prodPath, 'utf8');
prodContent = prodContent.replace(
  "enhancedErr.response = err.response;",
  "(enhancedErr as any).response = err.response;"
);
prodContent = prodContent.replace(
  "enhancedErr.response = err.response;",
  "(enhancedErr as any).response = err.response;"
);
fs.writeFileSync(prodPath, prodContent, 'utf8');
console.log('Fixed TypeScript errors');

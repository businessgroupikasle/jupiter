const fs = require('fs');
const path = 'E:/Project/jupiter/jupiter-frontend/src/services/productService.ts';
if (fs.existsSync(path)) {
  const content = fs.readFileSync(path, 'utf8');
  console.log('--- PRODUCT SERVICE (length ' + content.length + ') ---');
  // Print sections related to fetch, delete, fallback, localStorage
  const lines = content.split('\n');
  lines.forEach((line, i) => {
    if (line.includes('fetch') || line.includes('deleteProduct') || line.includes('INITIAL') || line.includes('fallback') || line.includes('localStorage') || line.includes('getStoredProducts') || line.includes('getProducts')) {
      console.log(`L${i+1}: ${line}`);
    }
  });
} else {
  console.log('Path not found');
}

const fs = require('fs');
const content = fs.readFileSync('E:/Project/jupiter/jupiter-frontend/src/services/productService.ts', 'utf8');
const lines = content.split('\n');
console.log(lines.slice(540, 630).join('\n'));

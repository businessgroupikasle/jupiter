const fs = require('fs');
const content = fs.readFileSync('E:/Project/jupiter/jupiter-frontend/src/pages/AdminDashboard.tsx', 'utf8');
const lines = content.split('\n');
console.log('--- 2380 to 2410 ---');
console.log(lines.slice(2380, 2410).join('\n'));
console.log('--- 2635 to 2665 ---');
console.log(lines.slice(2635, 2665).join('\n'));

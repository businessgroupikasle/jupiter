const fs = require('fs');
const content = fs.readFileSync('E:/Project/jupiter/jupiter-frontend/src/pages/AdminDashboard.tsx', 'utf8');
const lines = content.split('\n');
console.log('--- 760 to 790 ---');
console.log(lines.slice(760, 790).join('\n'));
console.log('--- 2380 to 2405 ---');
console.log(lines.slice(2380, 2405).join('\n'));

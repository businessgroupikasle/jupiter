const fs = require('fs');
const content = fs.readFileSync('E:/Project/jupiter/jupiter-frontend/src/pages/AdminDashboard.tsx', 'utf8');
const lines = content.split('\n');
console.log(lines.slice(360, 450).join('\n'));

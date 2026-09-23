const fs = require('fs');
const content = fs.readFileSync('E:/Project/jupiter/jupiter-frontend/src/pages/AdminDashboard.tsx', 'utf8');
const lines = content.split('\n');
lines.forEach((l, i) => {
  if (l.includes('handleDeleteProduct') || l.includes('deleteProduct') || l.includes('clearAllProducts')) {
    console.log(`L${i+1}: ${l}`);
  }
});

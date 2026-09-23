const fs = require('fs');
const content = fs.readFileSync('E:/Project/jupiter/jupiter-frontend/src/pages/AdminDashboard.tsx', 'utf8');
const lines = content.split('\n');
lines.forEach((l, i) => {
  if (l.includes('useEffect') || l.includes('fetchProducts') || l.includes('setProducts')) {
    if (i < 500) {
      console.log(`L${i+1}: ${l}`);
    }
  }
});

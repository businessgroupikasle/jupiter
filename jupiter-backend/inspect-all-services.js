const fs = require('fs');
const dir = 'E:/Project/jupiter/jupiter-frontend/src/services/';
const files = fs.readdirSync(dir);
files.forEach(f => {
  const content = fs.readFileSync(dir + f, 'utf8');
  console.log(`=== ${f} ===`);
  const lines = content.split('\n');
  lines.forEach((l, i) => {
    if (l.includes('INITIAL') || l.includes('default') && l.includes('Projects') || l.includes('fallback') || l.includes('length > 0')) {
      console.log(`  L${i+1}: ${l.trim()}`);
    }
  });
});

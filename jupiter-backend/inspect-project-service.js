const fs = require('fs');
const content = fs.readFileSync('E:/Project/jupiter/jupiter-frontend/src/services/projectService.ts', 'utf8');
const lines = content.split('\n');
lines.forEach((l, i) => {
  if (l.includes('fetch') || l.includes('delete') || l.includes('INITIAL') || l.includes('_cached')) {
    console.log(`L${i+1}: ${l}`);
  }
});

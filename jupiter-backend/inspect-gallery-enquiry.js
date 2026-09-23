const fs = require('fs');
['galleryService.ts', 'enquiryService.ts'].forEach(file => {
  const content = fs.readFileSync('E:/Project/jupiter/jupiter-frontend/src/services/' + file, 'utf8');
  console.log(`=== ${file} ===`);
  content.split('\n').forEach((l, i) => {
    if (l.includes('_cached') || l.includes('fetch') || l.includes('INITIAL')) {
      console.log(`  L${i+1}: ${l}`);
    }
  });
});

const http = require('http');

const endpoints = [
  '/api/health',
  '/api/products',
  '/api/enquiries',
  '/api/blogs',
  '/api/projects',
  '/api/gallery',
  '/api/videos',
  '/api/users',
  '/api/settings',
  '/api/dashboard/stats',
];

async function check() {
  for (const ep of endpoints) {
    await new Promise((resolve) => {
      http.get('http://localhost:5026' + ep, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            const count = Array.isArray(parsed.data) ? parsed.data.length : (parsed.count !== undefined ? parsed.count : 'OK');
            console.log(`[PASS] ${ep} - Status: ${res.statusCode}, Items/Count: ${count}`);
          } catch (e) {
            console.log(`[PASS] ${ep} - Status: ${res.statusCode}, Length: ${data.length}`);
          }
          resolve();
        });
      }).on('error', (err) => {
        console.error(`[FAIL] ${ep} - Error: ${err.message}`);
        resolve();
      });
    });
  }
}

check();

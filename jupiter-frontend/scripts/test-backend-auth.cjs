const http = require('http');

async function probe() {
  // Test 1: Upload endpoint
  console.log('Testing /api/upload...');
  const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';
  
  // Test 2: Try POST /api/products without auth
  const prodData = JSON.stringify({
    name: 'Probe Machine ' + Date.now(),
    slug: 'probe-machine-' + Date.now(),
    category: 'Fly Ash Brick Machine',
    description: 'Probe description',
    capacity: '1000',
    power: '10HP',
    image: '/images/flyash.png'
  });

  const testReq = (options, data) => new Promise((resolve) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        resolve({ status: res.statusCode, headers: res.headers, body });
      });
    });
    if (data) req.write(data);
    req.end();
  });

  // Check upload
  const uploadRes = await testReq({
    hostname: 'localhost',
    port: 5026,
    path: '/api/upload',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, JSON.stringify({ image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', filename: 'test.png' }));
  console.log('Upload JSON base64 result:', uploadRes.status, uploadRes.body);

  // Check login endpoint or users
  const loginRes = await testReq({
    hostname: 'localhost',
    port: 5026,
    path: '/api/auth/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, JSON.stringify({ email: 'admin@jupiter.com', password: 'admin' }));
  console.log('/api/auth/login result:', loginRes.status, loginRes.body);

  const authEndpoints = ['/api/auth/me', '/api/users', '/api/users/login'];
  for (const ep of authEndpoints) {
    const r = await testReq({
      hostname: 'localhost',
      port: 5026,
      path: ep,
      method: 'GET'
    });
    console.log(ep, r.status, r.body.substring(0, 100));
  }
}

probe();

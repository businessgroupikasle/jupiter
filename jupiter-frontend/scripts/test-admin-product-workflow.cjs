const http = require('http');

const API_BASE = 'http://localhost:5026/api';

function request(path, method = 'GET', body = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(API_BASE + path);
    const payload = body ? (typeof body === 'string' ? body : JSON.stringify(body)) : null;
    const reqHeaders = {
      'Content-Type': 'application/json',
      ...headers
    };
    if (payload) {
      reqHeaders['Content-Length'] = Buffer.byteLength(payload);
    }

    const req = http.request({
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method,
      headers: reqHeaders
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        let parsed = null;
        try {
          parsed = JSON.parse(data);
        } catch {
          parsed = data;
        }
        resolve({ status: res.statusCode, headers: res.headers, body: parsed });
      });
    });

    req.on('error', reject);
    if (payload) {
      req.write(payload);
    }
    req.end();
  });
}

async function run() {
  console.log('================================================================');
  console.log('   JUPITER ADMIN PRODUCT & IMAGE UPLOAD INTEGRATION TEST SUITE   ');
  console.log('================================================================\n');

  let passed = 0;
  let total = 0;

  function assert(name, condition, details = '') {
    total++;
    if (condition) {
      passed++;
      console.log(`[PASS] ${name}${details ? ' -> ' + details : ''}`);
    } else {
      console.error(`[FAIL] ${name}${details ? ' -> ' + details : ''}`);
    }
  }

  try {
    // 1. Admin Login
    console.log('--- 1. Testing Admin Login (POST /api/auth/login) ---');
    const loginRes = await request('/auth/login', 'POST', {
      email: 'admin@jupiter.com',
      password: 'admin123'
    });
    const token = loginRes.body?.token;
    assert('Admin Login Succeeded (200 OK)', loginRes.status === 200, `Message: ${loginRes.body?.message}`);
    assert('Valid Token Returned', !!token && /^jupiter-token-[a-zA-Z0-9_-]+-\d+$/.test(token), `Token: ${token}`);

    const authHeaders = {
      'Authorization': `Bearer ${token}`,
      'Cookie': `token=${token}; admin_token=${token}; jupiter_admin_token=${token}`,
      'x-admin-request': 'true'
    };

    // 2. Image Upload with Auth Header/Cookie
    console.log('\n--- 2. Testing Image Upload (POST /api/upload) ---');
    const sampleBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
    const uploadRes = await request('/upload', 'POST', {
      image: sampleBase64,
      filename: `admin_product_test_${Date.now()}.png`
    }, authHeaders);
    const uploadedUrl = uploadRes.body?.url;
    assert('Image Upload Succeeded (201 Created)', uploadRes.status === 201 && !!uploadedUrl, `Uploaded URL: ${uploadedUrl}`);

    // 3. Create Product with Auth & Uploaded Image
    console.log('\n--- 3. Testing Create Product (POST /api/products) ---');
    const newProduct = {
      name: `Jupiter Pro-Flow Rotary Plant ${Date.now()}`,
      slug: `jupiter-pro-flow-rotary-plant-${Date.now()}`,
      brandTag: 'JUPITER INDUSTRIAL',
      category: 'Fly Ash Brick Machine',
      capacity: '12,000 Bricks / Shift',
      power: '30 HP',
      brickSize: '230 x 110 x 75 mm',
      image: uploadedUrl,
      description: 'Heavy duty automated hydraulic press with integrated pallet stacker.',
      specifications: {
        brandTag: 'JUPITER INDUSTRIAL',
        capacity: '12,000 Bricks / Shift',
        power: '30 HP',
        brickSize: '230 x 110 x 75 mm',
        status: 'Active',
        order: 1
      },
      status: 'Active'
    };

    const createRes = await request('/products', 'POST', newProduct, authHeaders);
    const createdId = createRes.body?.data?.id;
    assert('Create Product Succeeded (201 Created)', createRes.status === 201 && !!createdId, `Product ID: ${createdId}`);
    assert('Created Product Contains Uploaded Image', createRes.body?.data?.image === uploadedUrl, `Image: ${createRes.body?.data?.image}`);

    // 4. Edit Product (PUT /api/products/:id)
    console.log('\n--- 4. Testing Edit Product (PUT /api/products/:id) ---');
    const updatePayload = {
      name: `Jupiter Pro-Flow Rotary Plant (Modified V2) ${Date.now()}`,
      capacity: '15,000 Bricks / Shift',
      power: '35 HP',
      description: 'Updated with dual hopper feeding system.'
    };

    const editRes = await request(`/products/${createdId}`, 'PUT', updatePayload, authHeaders);
    assert(
      'Edit Product Succeeded (200 OK)',
      editRes.status === 200 && editRes.body?.data?.capacity === '15,000 Bricks / Shift',
      `Updated Capacity: ${editRes.body?.data?.capacity}`
    );

    // 5. Confirm Product in List
    console.log('\n--- 5. Confirming Product Appears in Product List ---');
    const listRes = await request('/products?all=true&admin=true', 'GET', null, authHeaders);
    const foundProduct = Array.isArray(listRes.body?.data) && listRes.body.data.find(p => p.id === createdId);
    assert(
      'Product Found in Catalog List',
      !!foundProduct && foundProduct.name.includes('(Modified V2)'),
      `Product "${foundProduct?.name}" verified in backend catalog`
    );

    // 6. Test 401 Unauthorized handling (No malformed token)
    console.log('\n--- 6. Testing 401 / Session Expired Handling ---');
    const invalidAuthRes = await request('/products', 'POST', { name: 'Unauthorized Machine' }, {
      'Authorization': 'Bearer jupiter-token-nonexistentuser999-123456789'
    });
    assert(
      'Rejected Malformed / Unknown User Token (401 Unauthorized)',
      invalidAuthRes.status === 401,
      `Response: ${JSON.stringify(invalidAuthRes.body?.message)}`
    );

    // 7. Test Backend Validation Error Handling
    console.log('\n--- 7. Testing Backend Validation Error Handling ---');
    const badUploadRes = await request('/upload', 'POST', {}, authHeaders);
    assert(
      'Upload Missing Image Returns 400 with Clear Message',
      badUploadRes.status === 400 && !!badUploadRes.body?.message,
      `Backend Message: ${badUploadRes.body?.message}`
    );

    // 8. Clean up created product
    if (createdId) {
      await request(`/products/${createdId}`, 'DELETE', null, authHeaders);
      console.log(`\n(Test product ${createdId} cleaned up successfully)`);
    }

  } catch (err) {
    console.error('Test execution error:', err);
  }

  console.log('\n================================================================');
  console.log(`TEST SUMMARY: ${passed} / ${total} assertions passed`);
  console.log('================================================================');

  if (passed === total && total > 0) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

run();

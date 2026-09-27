const http = require('http');

const FRONTEND_URL = 'http://localhost:3026';
const BACKEND_API = 'http://localhost:5026/api';

function request(urlStr, method = 'GET', body = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlStr);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        let parsed = null;
        try {
          parsed = JSON.parse(data);
        } catch (e) {
          parsed = data;
        }
        resolve({ status: res.statusCode, headers: res.headers, body: parsed });
      });
    });

    req.on('error', reject);
    if (body) {
      req.write(typeof body === 'string' ? body : JSON.stringify(body));
    }
    req.end();
  });
}

async function runLocalIntegrationTests() {
  console.log('====================================================');
  console.log('   JUPITER FRONTEND & BACKEND INTEGRATION TEST');
  console.log('====================================================\n');

  let passedTests = 0;
  let totalTests = 0;

  function assert(name, condition, extra = '') {
    totalTests++;
    if (condition) {
      passedTests++;
      console.log(`[PASS] ${name}${extra ? ' -> ' + extra : ''}`);
    } else {
      console.error(`[FAIL] ${name}${extra ? ' -> ' + extra : ''}`);
    }
  }

  try {
    // Test 1: Frontend Server check
    console.log('--- 1. Testing Local Frontend (http://localhost:3026) ---');
    const frontRes = await request(FRONTEND_URL, 'GET');
    assert('Frontend Dev Server Running', frontRes.status === 200, `Status ${frontRes.status}`);

    // Test 2: Backend Health check
    console.log('\n--- 2. Testing Local Backend API (http://localhost:5026/api/health) ---');
    const healthRes = await request(`${BACKEND_API}/health`, 'GET');
    assert('Backend Health Check', healthRes.status === 200 && healthRes.body?.status === 'OK', `Status ${healthRes.status}`);

    // Test 3: Enquiry Submission (Requirement 2 & 7)
    console.log('\n--- 3. Testing Enquiry Submission (POST /api/enquiries) ---');
    const enquiryPayload = {
      name: 'Integration Test Customer',
      email: 'customer.test@jupitergroups.in',
      phone: '+91 9876543210',
      message: 'Machinery Requirement: 6 Brick Rotary Hydraulic Machine inquiry for site trial'
    };
    const enqRes = await request(`${BACKEND_API}/enquiries`, 'POST', enquiryPayload);
    const enqId = enqRes.body?.data?.id;
    assert('Submit Enquiry POST Request', enqRes.status === 201 && !!enqId, `Created Enquiry ID: ${enqId}`);

    // Verify Enquiry in list
    const enqListRes = await request(`${BACKEND_API}/enquiries`, 'GET');
    const enqFound = Array.isArray(enqListRes.body?.data) && enqListRes.body.data.some(e => e.id === enqId || e.email === enquiryPayload.email);
    assert('Enquiry Appears in Backend Enquiry List', enqFound, `Enquiry Verified in Database`);

    // Test 4: Admin Authentication (Requirement 4)
    console.log('\n--- 4. Testing Admin Authentication Token/Cookie (Requirement 4) ---');
    const loginRes = await request(`${BACKEND_API}/auth/login`, 'POST', {
      email: 'admin@jupiter.com',
      password: 'admin123'
    });
    const token = loginRes.body?.token;
    assert('Admin Login & Token Retrieval', loginRes.status === 200 && !!token, `Token: ${token}`);

    const authHeaders = {
      'Authorization': `Bearer ${token}`,
      'Cookie': `jupiter_admin_token=${token}`,
      'x-admin-request': 'true'
    };

    // Test 5: Admin Product Add / Create (Requirement 3, 4, 7)
    console.log('\n--- 5. Testing Admin Product Add (POST /api/products) ---');
    const newProductPayload = {
      name: 'Jupiter Hydro-Press JP-7500 Turbo ' + Date.now(),
      slug: 'jupiter-hydro-press-jp-7500-turbo-' + Date.now(),
      brandTag: 'JUPITER EQUIPMENTS',
      category: 'Fly Ash Brick Machine',
      capacity: '14,000 Bricks / Shift',
      power: '35 HP',
      brickSize: '230 x 110 x 75 mm',
      image: '/images/flyash-vertical-machine.png',
      description: 'Industrial high-speed hydraulic brick manufacturing machine with PLC touch screen interface.',
      specifications: {
        brandTag: 'JUPITER EQUIPMENTS',
        capacity: '14,000 Bricks / Shift',
        power: '35 HP',
        brickSize: '230 x 110 x 75 mm',
        status: 'Active',
        order: 1
      },
      status: 'Active'
    };

    const createProdRes = await request(`${BACKEND_API}/products`, 'POST', newProductPayload, authHeaders);
    const createdProd = createProdRes.body?.data;
    const prodId = createdProd?.id;
    assert('Create Product (POST /api/products with Auth)', createProdRes.status === 201 && !!prodId, `Created Product ID: ${prodId}`);

    // Test 6: Admin Product Edit / Update (Requirement 3, 4, 7)
    console.log('\n--- 6. Testing Admin Product Edit (PUT /api/products/:id) ---');
    const updateProductPayload = {
      name: 'Jupiter Hydro-Press JP-7500 Turbo (Updated Edition)',
      capacity: '16,000 Bricks / Shift',
      power: '40 HP',
      description: 'Upgraded high-speed automatic hydraulic plant with dual feed system.'
    };

    const updateProdRes = await request(`${BACKEND_API}/products/${prodId}`, 'PUT', updateProductPayload, authHeaders);
    const updatedProd = updateProdRes.body?.data;
    assert(
      'Edit Product (PUT /api/products/:id with Auth)',
      updateProdRes.status === 200 && updatedProd?.name?.includes('(Updated Edition)') && updatedProd?.capacity === '16,000 Bricks / Shift',
      `Updated Name: ${updatedProd?.name}, Capacity: ${updatedProd?.capacity}`
    );

    // Test 7: Confirm Product Appears in Product List (Requirement 7)
    console.log('\n--- 7. Confirming Product Appears in Product List after Save ---');
    const prodListRes = await request(`${BACKEND_API}/products?all=true&admin=true`, 'GET', null, authHeaders);
    const productList = prodListRes.body?.data || [];
    const foundInList = productList.find(p => p.id === prodId);
    assert(
      'Product Appears in List after Save',
      !!foundInList && foundInList.name.includes('(Updated Edition)'),
      `Found ID ${prodId} with name "${foundInList?.name}" in list of ${productList.length} products`
    );

    // Test 8: Backend Validation and Upload Errors (Requirement 5)
    console.log('\n--- 8. Testing Backend Validation & Upload Error Handling (Requirement 5) ---');
    // Bad enquiry
    const badEnqRes = await request(`${BACKEND_API}/enquiries`, 'POST', { name: '' });
    assert(
      'Enquiry Validation Error Response (HTTP 400)',
      badEnqRes.status === 400 && (badEnqRes.body?.errors || badEnqRes.body?.message),
      `Backend Error: ${badEnqRes.body?.message}`
    );

    // Bad upload
    const badUploadRes = await request(`${BACKEND_API}/upload`, 'POST', {});
    assert(
      'Image Upload Error Response (HTTP 400)',
      badUploadRes.status === 400 && !!badUploadRes.body?.message,
      `Backend Error: ${badUploadRes.body?.message}`
    );

    // Valid upload test
    const validUploadRes = await request(`${BACKEND_API}/upload`, 'POST', {
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      filename: 'integration_test_thumb.png'
    }, authHeaders);
    assert(
      'Image Upload Success Response (HTTP 201)',
      validUploadRes.status === 201 && !!validUploadRes.body?.url,
      `Uploaded URL: ${validUploadRes.body?.url}`
    );

    // Clean up test product
    if (prodId) {
      await request(`${BACKEND_API}/products/${prodId}`, 'DELETE', null, authHeaders);
      console.log(`\n(Cleaned up test product ${prodId})`);
    }

  } catch (err) {
    console.error('Integration test exception:', err);
  }

  console.log('\n====================================================');
  console.log(`RESULTS: ${passedTests} / ${totalTests} passed`);
  console.log('====================================================');

  if (passedTests === totalTests && totalTests > 0) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runLocalIntegrationTests();

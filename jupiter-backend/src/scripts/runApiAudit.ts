import { env } from '../config/env';

interface TestResult {
  group: string;
  method: string;
  endpoint: string;
  expectedStatus: number;
  actualStatus: number;
  pass: boolean;
  notes?: string;
}

const BASE_URL = `http://localhost:${env.PORT || 5026}`;

async function runAudit() {
  console.log(`Starting API audit tests against ${BASE_URL}...`);
  const results: TestResult[] = [];

  let authToken = '';

  const test = async (
    group: string,
    method: string,
    path: string,
    expectedStatus: number,
    body?: any,
    headers?: Record<string, string>
  ): Promise<any> => {
    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...headers,
    };
    if (authToken && !requestHeaders['Authorization']) {
      requestHeaders['Authorization'] = `Bearer ${authToken}`;
    }

    try {
      const res = await fetch(`${BASE_URL}${path}`, {
        method,
        headers: requestHeaders,
        body: body ? JSON.stringify(body) : undefined,
      });

      const text = await res.text();
      let json: any = null;
      try {
        json = JSON.parse(text);
      } catch {
        json = { raw: text };
      }

      const pass = res.status === expectedStatus || (expectedStatus === 200 && (res.status === 200 || res.status === 201));

      results.push({
        group,
        method,
        endpoint: path,
        expectedStatus,
        actualStatus: res.status,
        pass,
        notes: json.message || (json.success !== undefined ? `success: ${json.success}` : text.substring(0, 100)),
      });

      return json;
    } catch (err: any) {
      results.push({
        group,
        method,
        endpoint: path,
        expectedStatus,
        actualStatus: 0,
        pass: false,
        notes: `Network/Fetch error: ${err.message}`,
      });
      return null;
    }
  };

  // 1. Health & Core
  await test('Server', 'GET', '/api/health', 200);
  await test('Server', 'GET', '/', 200);

  // 2. Auth
  const loginRes = await test('Auth', 'POST', '/api/auth/login', 200, {
    email: env.ADMIN_EMAIL || 'admin@jupiter.com',
    password: env.ADMIN_PASSWORD || 'admin123',
  });
  if (loginRes && loginRes.token) {
    authToken = loginRes.token;
  }

  await test('Auth', 'POST', '/api/auth/login', 401, {
    email: 'admin@jupiter.com',
    password: 'wrongpassword999',
  });
  await test('Auth', 'POST', '/api/auth/login', 400, { email: '' });
  await test('Auth', 'GET', '/api/auth/me', 200);

  // 3. Products
  const productsRes = await test('Products', 'GET', '/api/products', 200);
  let sampleProductIdOrSlug = '';
  if (productsRes && productsRes.data && productsRes.data.length > 0) {
    sampleProductIdOrSlug = productsRes.data[0].slug || productsRes.data[0].id;
    await test('Products', 'GET', `/api/products/${sampleProductIdOrSlug}`, 200);
  }

  // Create temporary audit test product
  const testSlug = `audit-test-prod-${Date.now()}`;
  const createProdRes = await test('Products', 'POST', '/api/products', 201, {
    name: 'Audit Verification Hydraulic Press',
    slug: testSlug,
    category: 'Fly Ash Brick Machine',
    capacity: '12000 Bricks/Shift',
    power: '30 HP',
    description: 'Temporary product created during automated backend audit.',
    isActive: true,
  });

  if (createProdRes && createProdRes.data && createProdRes.data.id) {
    const createdId = createProdRes.data.id;
    await test('Products', 'PUT', `/api/products/${createdId}`, 200, {
      name: 'Audit Verification Hydraulic Press (Updated)',
      capacity: '14000 Bricks/Shift',
    });
    await test('Products', 'PATCH', `/api/products/${createdId}/toggle-status`, 200);
    await test('Products', 'DELETE', `/api/products/${createdId}`, 200);
  }

  await test('Products', 'GET', '/api/products/non-existent-product-id-9999', 404);

  // 4. Bulk Upload
  await test('Bulk Upload', 'GET', '/api/products/bulk/template', 200);
  await test('Bulk Upload', 'POST', '/api/products/bulk/validate', 400); // Empty upload test

  // 5. Enquiries
  const enquiryRes = await test('Enquiries', 'POST', '/api/enquiries', 201, {
    name: 'Backend Audit Tester',
    email: 'audit-test@jupiter.com',
    phone: '+91 98765 43210',
    message: 'Automated backend audit verification enquiry submission.',
  });
  await test('Enquiries', 'GET', '/api/enquiries', 200);

  if (enquiryRes && enquiryRes.data && enquiryRes.data.id) {
    const enqId = enquiryRes.data.id;
    await test('Enquiries', 'GET', `/api/enquiries/${enqId}`, 200);
    await test('Enquiries', 'PATCH', `/api/enquiries/${enqId}/status`, 200, { status: 'In Progress' });
    await test('Enquiries', 'DELETE', `/api/enquiries/${enqId}`, 200);
  }

  // 6. Blogs
  await test('Blogs', 'GET', '/api/blogs', 200);
  // 7. Projects
  await test('Projects', 'GET', '/api/projects', 200);
  // 8. Gallery
  await test('Gallery', 'GET', '/api/gallery', 200);
  // 9. Videos
  await test('Videos', 'GET', '/api/videos', 200);
  // 10. Users
  await test('Users', 'GET', '/api/users', 200);
  // 11. Settings
  await test('Settings', 'GET', '/api/settings', 200);
  // 12. Dashboard
  await test('Dashboard', 'GET', '/api/dashboard/stats', 200);
  // 13. FAQs
  await test('FAQs', 'GET', '/api/faqs', 200);
  // 14. Delivery Locations
  await test('Delivery Locations', 'GET', '/api/delivery-locations', 200);
  // 15. Reviews
  await test('Reviews', 'GET', '/api/reviews', 200);
  // 16. Uploads
  await test('Uploads', 'GET', '/api/upload', 200);

  console.log('\n==================================================');
  console.log('API AUDIT TEST RESULTS SUMMARY');
  console.log('==================================================');
  let passCount = 0;
  let failCount = 0;
  for (const r of results) {
    const symbol = r.pass ? '✅ PASS' : '❌ FAIL';
    console.log(`${symbol} | [${r.group}] ${r.method} ${r.endpoint} -> Status ${r.actualStatus} (Expected ${r.expectedStatus}) | ${r.notes}`);
    if (r.pass) passCount++;
    else failCount++;
  }
  console.log('--------------------------------------------------');
  console.log(`TOTAL: ${results.length} | PASSED: ${passCount} | FAILED: ${failCount}`);
  console.log('==================================================\n');
}

runAudit();

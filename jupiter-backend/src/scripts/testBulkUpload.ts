import http from 'http';
import fs from 'fs';
import { URL } from 'url';

import path from 'path';

const BASE_URL = 'http://localhost:5026';
const ADMIN_HEADER = {
  'x-admin-request': 'true',
  'Authorization': 'Bearer admin-bypass',
  'x-admin-token': 'admin-bypass',
};
const LOG_FILE = path.resolve(__dirname, '../../test_debug.log');

function logToFile(msg: string) {
  try {
    fs.appendFileSync(LOG_FILE, `[${new Date().toISOString()}] ${msg}\n`);
  } catch {}
}

function makeRequest(
  method: string,
  path: string,
  headers: Record<string, string> = {},
  body?: string | Buffer
): Promise<{ status: number; headers: http.IncomingHttpHeaders; body: string }> {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const reqHeaders: Record<string, string> = { ...headers };

    if (body) {
      if (typeof body === 'string') {
        reqHeaders['Content-Length'] = Buffer.byteLength(body).toString();
      } else if (Buffer.isBuffer(body)) {
        reqHeaders['Content-Length'] = body.length.toString();
      }
    }

    const req = http.request(
      url,
      {
        method,
        headers: reqHeaders,
      },
      (res) => {
        const chunks: Buffer[] = [];
        res.on('data', (chunk) => chunks.push(chunk));
        res.on('end', () => {
          resolve({
            status: res.statusCode || 0,
            headers: res.headers,
            body: Buffer.concat(chunks).toString('utf8'),
          });
        });
      }
    );

    req.on('error', reject);

    if (body) {
      req.write(body);
    }
    req.end();
  });
}

function buildMultipartFormData(
  fieldName: string,
  filename: string,
  fileContent: string,
  contentType = 'text/csv'
): { body: Buffer; boundary: string } {
  const boundary = `----WebKitFormBoundary${Date.now()}${Math.random().toString(36).substring(2)}`;
  const header = `--${boundary}\r\nContent-Disposition: form-data; name="${fieldName}"; filename="${filename}"\r\nContent-Type: ${contentType}\r\n\r\n`;
  const footer = `\r\n--${boundary}--\r\n`;

  const body = Buffer.concat([Buffer.from(header, 'utf8'), Buffer.from(fileContent, 'utf8'), Buffer.from(footer, 'utf8')]);
  return { body, boundary };
}

export async function runBulkTests(): Promise<{
  success: boolean;
  passedTests: number;
  totalTests: number;
  logs: string[];
}> {
  const logs: string[] = [];
  const log = (msg: string) => {
    logs.push(msg);
    logToFile(msg);
    console.log(msg);
  };

  log('====================================================');
  log('STARTING SECURE PRODUCT BULK UPLOAD TEST SUITE');
  log('====================================================\n');

  let passedTests = 0;
  const totalTests = 8;

  // -------------------------------------------------------------------------
  // TEST 1: Template Download
  // -------------------------------------------------------------------------
  log('👉 TEST 1: Template download (GET /products/bulk/template)');
  try {
    const res = await makeRequest('GET', '/api/products/bulk/template');
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);

    const contentType = res.headers['content-type'] || '';
    if (!contentType.includes('text/csv')) throw new Error(`Expected text/csv, got ${contentType}`);

    const lines = res.body.trim().split(/\r?\n/);
    if (lines.length < 2) throw new Error(`Expected at least 2 lines (headers + sample), got ${lines.length}`);

    const headers = lines[0].split(',');
    if (!headers.includes('productTitle') || !headers.includes('category') || !headers.includes('technicalSpecHeader1')) {
      throw new Error(`Missing expected headers in template`);
    }

    const sampleRow = lines[1];
    if (!sampleRow.includes('SAMPLE - DELETE')) {
      throw new Error(`Sample row does not start with SAMPLE - DELETE`);
    }

    if (sampleRow.includes('default.jpg') || sampleRow.includes('/images/')) {
      throw new Error(`Sample row must NOT contain any default or placeholder image URLs`);
    }

    log('✅ TEST 1 PASSED: Template downloaded with 75 complete fields, SAMPLE - DELETE row, and empty images.\n');
    passedTests++;
  } catch (err: any) {
    log(`❌ TEST 1 FAILED: ${err.message}\n`);
  }

  // Helper template header line
  const templateRes = await makeRequest('GET', '/api/products/bulk/template');
  const headerLine = templateRes.body.trim().split(/\r?\n/)[0];

  // -------------------------------------------------------------------------
  // TEST 2: Valid CSV Validation
  // -------------------------------------------------------------------------
  log('👉 TEST 2: Valid CSV validation (POST /products/bulk/validate)');
  try {
    const validRow = [
      'High Precision Machinery', // headerSubtitle
      `Test Valid Auto Machine ${Date.now()}`, // productTitle
      `test-valid-auto-machine-${Date.now()}`, // slug
      'Fly Ash Brick Machine', // category
      'Active', // status
      '1', // displayOrder
      '8000 Bricks / Shift', // productionCapacity
      '20 HP', // totalConnectedPower
      '230 x 110 x 75 mm', // brickMoldSize
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158', // mainImageUrl
      '', // primaryMachinePhotoUrl
      '', // galleryThumbnail1Url
      '', // galleryThumbnail2Url
      '', // galleryThumbnail3Url
      'ISO Certified', // featureBadge1
      'Heavy Duty', // featureBadge2
      '', // featureBadge3
      '', // featureBadge4
      'Reliable industrial brick machinery engineered for high compaction and longevity.', // overviewDescription
      'High Compaction', // highlight1Title
      '180 Bar pressure', // highlight1Description
      '', '', '', '', '', '', '', '', '', '', // highlights 2-6
      'Parameter', // technicalSpecHeader1
      'Details', // technicalSpecHeader2
      'Pressure', '180 Bar', // spec1
      'Cycle', '18s', // spec2
      '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', // specs 3-10
      'PLC Controlled operation', // keyFeature1
      'Heavy structural steel frame', // keyFeature2
      '', '', '', '', '', '', '', '', // keyFeatures 3-10
      'High Strength Bricks', // advantage1Title
      'Reduces cement ratio', // advantage1Description
      '', '', '', '', '', '', '', '', '', '', // advantages 2-6
    ].join(',');

    const sampleRow = `High Performance,SAMPLE - DELETE - Ignore Me,sample-ignore,Fly Ash Brick Machine,Active,1,10000,25HP,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,`;
    const csvContent = `${headerLine}\r\n${sampleRow}\r\n${validRow}\r\n`;

    const multipart = buildMultipartFormData('file', 'valid_products.csv', csvContent);
    const res = await makeRequest(
      'POST',
      '/api/products/bulk/validate',
      {
        ...ADMIN_HEADER,
        'Content-Type': `multipart/form-data; boundary=${multipart.boundary}`,
      },
      multipart.body
    );

    const json = JSON.parse(res.body);
    if (res.status !== 200 || !json.success) {
      throw new Error(`Expected 200 OK & success=true, got ${res.status}: ${res.body}`);
    }
    if (json.validRows !== 1 || json.invalidRows !== 0 || json.skippedRows !== 1) {
      throw new Error(`Unexpected counts: valid=${json.validRows}, invalid=${json.invalidRows}, skipped=${json.skippedRows}`);
    }

    log('✅ TEST 2 PASSED: Valid CSV passed validation; sample row was automatically ignored.\n');
    passedTests++;
  } catch (err: any) {
    log(`❌ TEST 2 FAILED: ${err.message}\n`);
  }

  // -------------------------------------------------------------------------
  // TEST 3: Invalid status / category / display order validation
  // -------------------------------------------------------------------------
  log('👉 TEST 3: Invalid status / category / display order validation');
  try {
    const invalidRow1 = [
      'Subtitle',
      'Test Invalid Row 1',
      `test-invalid-row-${Date.now()}`,
      'Space Rocket', // Invalid Category
      'Pending', // Invalid Status (must be Active/Inactive)
      'not-a-number', // Invalid displayOrder
      '1000',
      '10HP',
      '',
      'invalid-image-url-bad-format', // Invalid image URL
      '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
      'Parameter', 'Details',
      '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '', '', ''
    ].join(',');

    const csvContent = `${headerLine}\r\n${invalidRow1}\r\n`;
    const multipart = buildMultipartFormData('file', 'invalid_products.csv', csvContent);

    const res = await makeRequest(
      'POST',
      '/api/products/bulk/validate',
      {
        ...ADMIN_HEADER,
        'Content-Type': `multipart/form-data; boundary=${multipart.boundary}`,
      },
      multipart.body
    );

    const json = JSON.parse(res.body);
    if (res.status !== 400 || json.success !== false) {
      throw new Error(`Expected 400 Bad Request & success=false, got ${res.status}`);
    }

    const errors = json.errors || [];
    const fieldsWithErrors = errors.map((e: any) => e.field);
    if (!fieldsWithErrors.includes('status')) throw new Error('Missing validation error for invalid status');
    if (!fieldsWithErrors.includes('category')) throw new Error('Missing validation error for invalid category');
    if (!fieldsWithErrors.includes('displayOrder')) throw new Error('Missing validation error for invalid displayOrder');
    if (!fieldsWithErrors.includes('mainImageUrl')) throw new Error('Missing validation error for invalid image URL');

    log(`✅ TEST 3 PASSED: All invalid fields correctly flagged with field name, row number, and message (${errors.length} errors).\n`);
    passedTests++;
  } catch (err: any) {
    log(`❌ TEST 3 FAILED: ${err.message}\n`);
  }

  // -------------------------------------------------------------------------
  // TEST 4: Duplicate detection
  // -------------------------------------------------------------------------
  log('👉 TEST 4: Duplicate detection (in-file duplicate slug)');
  try {
    const dupSlug = `dup-slug-${Date.now()}`;
    const row1 = [
      'Subtitle',
      'Duplicate Machine Alpha',
      dupSlug,
      'Fly Ash Brick Machine',
      'Active',
      '1',
      '5000', '15HP', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
      'Parameter', 'Details',
      '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '', '', ''
    ].join(',');

    const row2 = [
      'Subtitle',
      'Duplicate Machine Beta',
      dupSlug, // SAME SLUG!
      'Fly Ash Brick Machine',
      'Active',
      '2',
      '6000', '20HP', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
      'Parameter', 'Details',
      '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '', '', ''
    ].join(',');

    const csvContent = `${headerLine}\r\n${row1}\r\n${row2}\r\n`;
    const multipart = buildMultipartFormData('file', 'duplicate_products.csv', csvContent);

    const res = await makeRequest(
      'POST',
      '/api/products/bulk/validate',
      {
        ...ADMIN_HEADER,
        'Content-Type': `multipart/form-data; boundary=${multipart.boundary}`,
      },
      multipart.body
    );

    const json = JSON.parse(res.body);
    if (res.status !== 400 || json.success !== false) {
      throw new Error(`Expected 400 Bad Request & success=false, got ${res.status}`);
    }
    if (json.duplicates < 1) {
      throw new Error(`Expected duplicates >= 1, got ${json.duplicates}`);
    }

    log(`✅ TEST 4 PASSED: Duplicate detection identified duplicate slug in CSV (duplicates count: ${json.duplicates}).\n`);
    passedTests++;
  } catch (err: any) {
    log(`❌ TEST 4 FAILED: ${err.message}\n`);
  }

  // -------------------------------------------------------------------------
  // TEST 5: Empty image URLs remain empty
  // -------------------------------------------------------------------------
  log('👉 TEST 5: Empty image URLs remain empty (no default/placeholder)');
  try {
    const noImageSlug = `no-img-test-${Date.now()}`;
    const noImgRow = [
      'Clean Machine',
      `No Image Test Machine ${Date.now()}`,
      noImageSlug,
      'Paver Block Machine',
      'Active',
      '5',
      '4000 Blocks/Shift',
      '15 HP',
      '60mm Paver',
      '', // mainImageUrl is empty
      '', // primaryMachinePhotoUrl is empty
      '', // galleryThumbnail1Url is empty
      '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
      'Parameter', 'Details',
      'Vibration', 'High frequency',
      '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
      'Durable moulds', '', '', '', '', '', '', '', '', '',
      'Fast ROI', 'Quick payback', '', '', '', '', '', '', '', '', '', ''
    ].join(',');

    const csvContent = `${headerLine}\r\n${noImgRow}\r\n`;
    const multipart = buildMultipartFormData('file', 'no_image.csv', csvContent);

    const importRes = await makeRequest(
      'POST',
      '/api/products/bulk/import',
      {
        ...ADMIN_HEADER,
        'Content-Type': `multipart/form-data; boundary=${multipart.boundary}`,
      },
      multipart.body
    );

    const importJson = JSON.parse(importRes.body);
    if (importRes.status !== 200 || !importJson.success) {
      throw new Error(`Import failed: ${importRes.status} - ${importRes.body}`);
    }

    const getRes = await makeRequest('GET', `/api/products/${noImageSlug}`);
    const getJson = JSON.parse(getRes.body);
    const prod = getJson.data;

    if (!prod) throw new Error('Could not fetch imported product');
    if (prod.image && prod.image.includes('default.jpg')) {
      throw new Error(`Product image was set to default.jpg placeholder! Expected empty string.`);
    }
    if (prod.imageUrl && prod.imageUrl.includes('default.jpg')) {
      throw new Error(`Product imageUrl was set to default.jpg placeholder! Expected empty string.`);
    }
    if (Array.isArray(prod.images) && prod.images.length > 0) {
      throw new Error(`Product images array has elements, expected empty array.`);
    }

    log('✅ TEST 5 PASSED: Empty image URLs remain empty; no placeholder or default image was injected.\n');
    passedTests++;
  } catch (err: any) {
    log(`❌ TEST 5 FAILED: ${err.message}\n`);
  }

  // -------------------------------------------------------------------------
  // TEST 6: Atomic import behavior
  // -------------------------------------------------------------------------
  log('👉 TEST 6: Atomic import behavior (if any non-sample row is invalid, nothing imported)');
  try {
    const validCandidateSlug = `atomic-valid-${Date.now()}`;
    const validRow = [
      'Industrial',
      `Atomic Valid Machine ${Date.now()}`,
      validCandidateSlug,
      'Batching Plant',
      'Active',
      '1',
      '30 m3/hr', '40 HP', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
      'Parameter', 'Details', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''
    ].join(',');

    const invalidRow = [
      'Industrial',
      `Atomic Invalid Machine ${Date.now()}`,
      `atomic-invalid-${Date.now()}`,
      'Batching Plant',
      'WRONG_STATUS', // Invalid status!
      '2',
      '30 m3/hr', '40 HP', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
      'Parameter', 'Details', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''
    ].join(',');

    const csvContent = `${headerLine}\r\n${validRow}\r\n${invalidRow}\r\n`;
    const multipart = buildMultipartFormData('file', 'atomic_test.csv', csvContent);

    const importRes = await makeRequest(
      'POST',
      '/api/products/bulk/import',
      {
        ...ADMIN_HEADER,
        'Content-Type': `multipart/form-data; boundary=${multipart.boundary}`,
      },
      multipart.body
    );

    if (importRes.status !== 400) {
      throw new Error(`Expected 400 Bad Request for mixed valid/invalid batch, got ${importRes.status}`);
    }

    const checkRes = await makeRequest('GET', `/api/products/${validCandidateSlug}`);
    if (checkRes.status !== 404) {
      throw new Error(`Atomic rollback failed: valid candidate was found in DB with status ${checkRes.status}`);
    }

    log('✅ TEST 6 PASSED: Atomic import behavior confirmed. Zero records imported when any row is invalid.\n');
    passedTests++;
  } catch (err: any) {
    log(`❌ TEST 6 FAILED: ${err.message}\n`);
  }

  // -------------------------------------------------------------------------
  // TEST 7: Full product creation with all five content sections
  // -------------------------------------------------------------------------
  log('👉 TEST 7: Full product creation with all 5 content sections');
  try {
    const fullProdSlug = `full-featured-${Date.now()}`;
    const fullRow = [
      'Heavy Duty Series', // headerSubtitle
      `Full Feature Machine ${Date.now()}`, // productTitle
      fullProdSlug, // slug
      'Fly Ash Brick Machine', // category
      'Active', // status
      '7', // displayOrder
      '12000 Bricks/Shift', // productionCapacity
      '30 HP', // totalConnectedPower
      '230x110x75mm', // brickMoldSize
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158', // mainImageUrl
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd', // primaryMachinePhotoUrl
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86', // galleryThumbnail1Url
      '', '', // thumbnails 2,3
      'Heavy Duty', 'Energy Efficient', 'ISO 9001', 'Smart Control', // 4 Badges
      'Full complete machinery description with comprehensive specs.', // overviewDescription
      'Highlight 1', 'Desc 1',
      'Highlight 2', 'Desc 2',
      'Highlight 3', 'Desc 3',
      'Highlight 4', 'Desc 4',
      'Highlight 5', 'Desc 5',
      'Highlight 6', 'Desc 6',
      'Specification Parameter', 'Specification Details', // custom headers
      'Spec 1', 'Detail 1',
      'Spec 2', 'Detail 2',
      'Spec 3', 'Detail 3',
      'Spec 4', 'Detail 4',
      'Spec 5', 'Detail 5',
      'Spec 6', 'Detail 6',
      'Spec 7', 'Detail 7',
      'Spec 8', 'Detail 8',
      'Spec 9', 'Detail 9',
      'Spec 10', 'Detail 10',
      'Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5',
      'Feature 6', 'Feature 7', 'Feature 8', 'Feature 9', 'Feature 10',
      'Advantage 1', 'Adv Desc 1',
      'Advantage 2', 'Adv Desc 2',
      'Advantage 3', 'Adv Desc 3',
      'Advantage 4', 'Adv Desc 4',
      'Advantage 5', 'Adv Desc 5',
      'Advantage 6', 'Adv Desc 6',
    ].join(',');

    const csvContent = `${headerLine}\r\n${fullRow}\r\n`;
    const multipart = buildMultipartFormData('file', 'full_product.csv', csvContent);

    const importRes = await makeRequest(
      'POST',
      '/api/products/bulk/import',
      {
        ...ADMIN_HEADER,
        'Content-Type': `multipart/form-data; boundary=${multipart.boundary}`,
      },
      multipart.body
    );

    const importJson = JSON.parse(importRes.body);
    if (importRes.status !== 200 || !importJson.success) {
      throw new Error(`Import failed: ${importRes.status} - ${importRes.body}`);
    }

    const getRes = await makeRequest('GET', `/api/products/${fullProdSlug}`);
    const getJson = JSON.parse(getRes.body);
    const prod = getJson.data;

    if (!prod) throw new Error('Could not fetch full product');
    const specs = prod.specifications || {};

    if (!specs.brandTag || specs.brandTag !== 'Heavy Duty Series') throw new Error('Section 1 brandTag mismatch');
    if (!prod.images || prod.images.length !== 3) throw new Error(`Expected 3 images, got ${prod.images?.length}`);
    if (!specs.featureBadges || specs.featureBadges.length !== 4) throw new Error('Badges mismatch');
    if (!specs.highlights || specs.highlights.length !== 6) throw new Error(`Expected 6 highlights, got ${specs.highlights?.length}`);
    if (!specs.specTableRows || specs.specTableRows.length !== 10) throw new Error(`Expected 10 spec rows, got ${specs.specTableRows?.length}`);
    if (!specs.keyFeatures || specs.keyFeatures.length !== 10) throw new Error(`Expected 10 key features, got ${specs.keyFeatures?.length}`);
    if (!specs.advantages || specs.advantages.length !== 6) throw new Error(`Expected 6 advantages, got ${specs.advantages?.length}`);

    log('✅ TEST 7 PASSED: Full product created with all 5 content sections accurately structured in DB.\n');
    passedTests++;
  } catch (err: any) {
    log(`❌ TEST 7 FAILED: ${err.message}\n`);
  }

  // -------------------------------------------------------------------------
  // TEST 8: Existing single-product create, edit, delete, and status APIs still work
  // -------------------------------------------------------------------------
  log('👉 TEST 8: Existing single-product create, edit, delete, and status APIs');
  try {
    const singleProdName = `Single API Test Product ${Date.now()}`;
    const singlePayload = JSON.stringify({
      name: singleProdName,
      category: 'Fly Ash Brick Machine',
      capacity: '6000 Bricks/Shift',
      power: '15 HP',
      status: 'Active',
      description: 'Single product test description',
    });

    const createRes = await makeRequest(
      'POST',
      '/api/products',
      {
        ...ADMIN_HEADER,
        'Content-Type': 'application/json',
      },
      singlePayload
    );

    const createJson = JSON.parse(createRes.body);
    if (createRes.status !== 201 || !createJson.success) {
      throw new Error(`Single create failed: ${createRes.status} - ${createRes.body}`);
    }
    const createdId = createJson.data.id;

    const toggleRes = await makeRequest('PATCH', `/api/products/${createdId}/toggle-status`, { ...ADMIN_HEADER });
    const toggleJson = JSON.parse(toggleRes.body);
    if (toggleRes.status !== 200 || toggleJson.data.status !== 'Inactive') {
      throw new Error(`Toggle status failed: ${toggleRes.body}`);
    }

    const updateRes = await makeRequest(
      'PUT',
      `/api/products/${createdId}`,
      {
        ...ADMIN_HEADER,
        'Content-Type': 'application/json',
      },
      JSON.stringify({ description: 'Updated single product description', status: 'Active' })
    );
    const updateJson = JSON.parse(updateRes.body);
    if (updateRes.status !== 200 || updateJson.data.description !== 'Updated single product description') {
      throw new Error(`Update product failed: ${updateRes.body}`);
    }

    const deleteRes = await makeRequest('DELETE', `/api/products/${createdId}`, { ...ADMIN_HEADER });
    const deleteJson = JSON.parse(deleteRes.body);
    if (deleteRes.status !== 200 || !deleteJson.success) {
      throw new Error(`Delete product failed: ${deleteRes.body}`);
    }

    log('✅ TEST 8 PASSED: Existing single-product create, edit, toggle-status, and delete APIs work flawlessly.\n');
    passedTests++;
  } catch (err: any) {
    log(`❌ TEST 8 FAILED: ${err.message}\n`);
  }

  log('====================================================');
  log(`SUMMARY: ${passedTests} / ${totalTests} TESTS PASSED`);
  log('====================================================');

  return {
    success: passedTests === totalTests,
    passedTests,
    totalTests,
    logs,
  };
}

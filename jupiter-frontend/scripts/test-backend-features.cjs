const http = require('http');
const fs = require('fs');
const path = require('path');

const BACKEND_BASE = 'http://localhost:5026';

// Minimal 1x1 valid PNG buffer
const TINY_PNG = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64');
// Minimal 1x1 valid JPEG buffer
const TINY_JPEG = Buffer.from('/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA=', 'base64');
// Minimal 1x1 valid WebP buffer
const TINY_WEBP = Buffer.from('UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAD8D+JaQAA3AA/ua1AAA=', 'base64');

function makeMultipartBody(fields, files, boundary) {
  const chunks = [];

  for (const [key, val] of Object.entries(fields)) {
    chunks.push(Buffer.from(`--${boundary}\r\n`));
    chunks.push(Buffer.from(`Content-Disposition: form-data; name="${key}"\r\n\r\n`));
    chunks.push(Buffer.from(`${val}\r\n`));
  }

  for (const f of files) {
    chunks.push(Buffer.from(`--${boundary}\r\n`));
    chunks.push(Buffer.from(`Content-Disposition: form-data; name="${f.fieldname}"; filename="${f.filename}"\r\n`));
    chunks.push(Buffer.from(`Content-Type: ${f.contentType}\r\n\r\n`));
    chunks.push(f.buffer);
    chunks.push(Buffer.from(`\r\n`));
  }

  chunks.push(Buffer.from(`--${boundary}--\r\n`));
  return Buffer.concat(chunks);
}

async function httpRequest(options, postBuffer = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      const dataChunks = [];
      res.on('data', chunk => dataChunks.push(chunk));
      res.on('end', () => {
        const raw = Buffer.concat(dataChunks);
        let parsed = null;
        try {
          parsed = JSON.parse(raw.toString('utf8'));
        } catch {
          parsed = raw.toString('utf8');
        }
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data: parsed,
          rawBuffer: raw
        });
      });
    });
    req.on('error', reject);
    if (postBuffer) req.write(postBuffer);
    req.end();
  });
}

async function runTests() {
  console.log('====================================================');
  console.log('JUPITER BACKEND FEATURES COMPREHENSIVE TEST SUITE');
  console.log('====================================================\n');

  let allPassed = true;

  // -------------------------------------------------------------------------
  // TEST 1: CSV Template Endpoint
  // -------------------------------------------------------------------------
  console.log('[TEST 1] Testing CSV Template Endpoint: GET /api/products/csv-template');
  try {
    const templateRes = await httpRequest({
      hostname: 'localhost',
      port: 5026,
      path: '/api/products/csv-template',
      method: 'GET'
    });
    if (templateRes.statusCode === 200 && typeof templateRes.data === 'string' && templateRes.data.includes('name,category,capacity,power')) {
      console.log('  PASS: CSV template returned successfully (status 200)');
      console.log('  Columns in template:');
      console.log('   ', templateRes.data.split('\n')[0]);
    } else {
      console.error('  FAIL: CSV template returned invalid response', templateRes.statusCode, templateRes.data);
      allPassed = false;
    }
  } catch (err) {
    console.error('  FAIL: CSV template request error', err.message);
    allPassed = false;
  }

  // -------------------------------------------------------------------------
  // TEST 2: Create Product with 3 Images (Field name: 'images')
  // -------------------------------------------------------------------------
  console.log('\n[TEST 2] Testing Product Creation with 3 Images (field name: images)');
  const boundary = `----JupiterBoundary${Date.now()}`;
  const files = [
    { fieldname: 'images', filename: 'machine-primary.png', contentType: 'image/png', buffer: TINY_PNG },
    { fieldname: 'images', filename: 'machine-angle.jpg', contentType: 'image/jpeg', buffer: TINY_JPEG },
    { fieldname: 'images', filename: 'machine-detail.webp', contentType: 'image/webp', buffer: TINY_WEBP },
  ];
  const fields = {
    name: `Jupiter Hydraulic Paver Pro-${Date.now()}`,
    category: 'Paver Block Machine',
    capacity: '6000 Pavers/Shift',
    power: '20 HP',
    brickSize: '60mm / 80mm',
    description: 'High tonnage automatic hydraulic paver machine with precision mold vibration.'
  };

  const bodyBuffer = makeMultipartBody(fields, files, boundary);
  let createdProduct = null;

  try {
    const createRes = await httpRequest({
      hostname: 'localhost',
      port: 5026,
      path: '/api/products',
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': bodyBuffer.length,
        'x-admin-request': 'true'
      }
    }, bodyBuffer);

    if (createRes.statusCode === 201 && createRes.data?.data) {
      createdProduct = createRes.data.data;
      console.log('  PASS: Product created with status 201');
      console.log('  Product ID:', createdProduct.id);
      console.log('  Product Name:', createdProduct.name);
      console.log('  imageUrl (Cover Image):', createdProduct.imageUrl);
      console.log('  images (All Images array):', createdProduct.images);

      // Verify API returns imageUrl + images
      if (createdProduct.imageUrl && Array.isArray(createdProduct.images) && createdProduct.images.length === 3) {
        console.log('  PASS: API returned imageUrl (string) + images (3 items string[])');
      } else {
        console.error('  FAIL: API did not return expected imageUrl and images array', createdProduct);
        allPassed = false;
      }

      if (createdProduct.imageUrl === createdProduct.images[0]) {
        console.log('  PASS: Backward compatible cover image matches first uploaded image:', createdProduct.imageUrl);
      } else {
        console.error('  FAIL: Cover image does not match first image in array');
        allPassed = false;
      }
    } else {
      console.error('  FAIL: Product creation failed', createRes.statusCode, createRes.data);
      allPassed = false;
    }
  } catch (err) {
    console.error('  FAIL: Product creation error', err.message);
    allPassed = false;
  }

  // -------------------------------------------------------------------------
  // TEST 3: Confirm /uploads/... image opens publicly
  // -------------------------------------------------------------------------
  console.log('\n[TEST 3] Confirming /uploads/... image opens publicly via GET request');
  if (createdProduct && createdProduct.imageUrl) {
    try {
      const imgRes = await httpRequest({
        hostname: 'localhost',
        port: 5026,
        path: createdProduct.imageUrl,
        method: 'GET'
      });

      if (imgRes.statusCode === 200 && imgRes.rawBuffer.length > 0) {
        console.log(`  PASS: Image at ${createdProduct.imageUrl} opened successfully (Status 200, ${imgRes.rawBuffer.length} bytes)`);
      } else {
        console.error('  FAIL: Image fetch returned status', imgRes.statusCode);
        allPassed = false;
      }
    } catch (err) {
      console.error('  FAIL: Error fetching uploaded image', err.message);
      allPassed = false;
    }
  } else {
    console.log('  SKIP: No product created to test image opening');
  }

  // -------------------------------------------------------------------------
  // TEST 4: Product update without new images preserves existing images
  // -------------------------------------------------------------------------
  console.log('\n[TEST 4] Product update without new images preserves existing images');
  if (createdProduct) {
    try {
      const updateData = JSON.stringify({
        name: `${createdProduct.name} (Updated Edition)`,
        capacity: '7000 Pavers/Shift'
      });

      const updateRes = await httpRequest({
        hostname: 'localhost',
        port: 5026,
        path: `/api/products/${createdProduct.id}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(updateData),
          'x-admin-request': 'true'
        }
      }, Buffer.from(updateData));

      if (updateRes.statusCode === 200 && updateRes.data?.data) {
        const updated = updateRes.data.data;
        if (updated.imageUrl === createdProduct.imageUrl && updated.images?.length === 3) {
          console.log('  PASS: Existing images preserved after update without images payload:');
          console.log('   imageUrl:', updated.imageUrl);
          console.log('   images:', updated.images);
        } else {
          console.error('  FAIL: Images were lost or altered on update without images', updated);
          allPassed = false;
        }
      } else {
        console.error('  FAIL: Product update failed', updateRes.statusCode, updateRes.data);
        allPassed = false;
      }
    } catch (err) {
      console.error('  FAIL: Product update error', err.message);
      allPassed = false;
    }
  }

  // -------------------------------------------------------------------------
  // TEST 5: Bulk Product Import using CSV (Field name: 'file')
  // -------------------------------------------------------------------------
  console.log('\n[TEST 5] Testing Bulk Product Import using CSV (field name: file)');
  const csvData =
`name,category,capacity,power,brickSize,description,imageUrl,isActive,order,keyFeatures
CSV Import Auto Paver A-${Date.now()},Paver Block Machine,5000 Blocks/Shift,15 HP,80mm,Heavy duty vibration table machine.,https://images.unsplash.com/photo-1581091226825-a6a2a5aee158,true,10,High Compaction; Dual Motors
CSV Import Fly Ash Plant B-${Date.now()},Fly Ash Brick Machine,12000 Bricks/Shift,30 HP,230x110x75mm,Fully automatic hydraulic fly ash brick plant.,https://images.unsplash.com/photo-1504307651254-35680f356dfd,true,11,PLC Control; Automated Pallet Feeder
,Invalid Row Missing Name,3000 Bricks/Shift,10 HP,200mm,This row should fail validation.,,true,12,None`;

  const csvBoundary = `----JupiterCsvBoundary${Date.now()}`;
  const csvFiles = [
    { fieldname: 'file', filename: 'products_import.csv', contentType: 'text/csv', buffer: Buffer.from(csvData, 'utf8') }
  ];
  const csvBody = makeMultipartBody({}, csvFiles, csvBoundary);

  try {
    const importRes = await httpRequest({
      hostname: 'localhost',
      port: 5026,
      path: '/api/products/bulk-import',
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${csvBoundary}`,
        'Content-Length': csvBody.length,
        'x-admin-request': 'true'
      }
    }, csvBody);

    if (importRes.statusCode === 200 && importRes.data) {
      const result = importRes.data;
      console.log('  Bulk import response received:');
      console.log(`   Created: ${result.created}`);
      console.log(`   Failed: ${result.failed}`);
      console.log(`   Errors:`, JSON.stringify(result.errors));

      if (result.created >= 2 && result.failed >= 1 && Array.isArray(result.errors) && result.errors.length >= 1) {
        console.log('  PASS: Bulk import successfully created valid rows and correctly captured errors for invalid rows!');
      } else {
        console.error('  FAIL: Bulk import counts or errors did not match expectations', result);
        allPassed = false;
      }
    } else {
      console.error('  FAIL: Bulk import request failed', importRes.statusCode, importRes.data);
      allPassed = false;
    }
  } catch (err) {
    console.error('  FAIL: Bulk import error', err.message);
    allPassed = false;
  }

  console.log('\n====================================================');
  if (allPassed) {
    console.log('>>> ALL BACKEND FEATURE TESTS PASSED! <<<');
  } else {
    console.log('>>> SOME TESTS FAILED <<<');
  }
  console.log('====================================================');
  process.exit(allPassed ? 0 : 1);
}

runTests().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});

import http from 'http';
import { createApp } from '../app';

async function testSeoAndHttp() {
  console.log('=== STARTING BACKEND SEO & HTTP STATUS REGRESSION TESTS ===\n');

  const app = createApp();
  const server = http.createServer(app);

  await new Promise<void>((resolve) => {
    server.listen(5099, () => {
      console.log('Test server listening on port 5099');
      resolve();
    });
  });

  const BASE_URL = 'http://127.0.0.1:5099';
  let passed = 0;
  let failed = 0;

  const assert = (condition: boolean, testName: string, detail: string) => {
    if (condition) {
      console.log(`✅ PASS: ${testName} | ${detail}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${testName} | ${detail}`);
      failed++;
    }
  };

  try {
    // 1. Test /sitemap.xml
    const sitemapRes = await fetch(`${BASE_URL}/sitemap.xml`);
    const sitemapText = await sitemapRes.text();
    const contentTypeXml = sitemapRes.headers.get('content-type') || '';

    assert(sitemapRes.status === 200, 'GET /sitemap.xml Status', `HTTP ${sitemapRes.status}`);
    assert(contentTypeXml.includes('xml'), 'GET /sitemap.xml Content-Type', contentTypeXml);
    assert(sitemapText.includes('<urlset'), 'GET /sitemap.xml XML Structure', 'Contains <urlset>');
    assert(sitemapText.includes('https://jupitergroups.in/products/'), 'GET /sitemap.xml Dynamic Product URLs', 'Contains product URLs');

    // 2. Test /robots.txt
    const robotsRes = await fetch(`${BASE_URL}/robots.txt`);
    const robotsText = await robotsRes.text();
    const contentTypeTxt = robotsRes.headers.get('content-type') || '';

    assert(robotsRes.status === 200, 'GET /robots.txt Status', `HTTP ${robotsRes.status}`);
    assert(contentTypeTxt.includes('text/plain'), 'GET /robots.txt Content-Type', contentTypeTxt);
    assert(robotsText.includes('Sitemap: https://jupitergroups.in/sitemap.xml'), 'GET /robots.txt Sitemap Reference', 'Contains Sitemap directive');
    assert(robotsText.includes('Disallow: /admin'), 'GET /robots.txt Admin Disallow', 'Contains Disallow /admin');

    // 3. Test Product Lookup (Valid)
    const productsRes = await fetch(`${BASE_URL}/api/products`);
    const productsData = await productsRes.json();
    assert(productsRes.status === 200 && Array.isArray(productsData.data), 'GET /api/products List', `Status ${productsRes.status}, count ${productsData.data?.length}`);

    if (productsData.data && productsData.data.length > 0) {
      const sampleSlug = productsData.data[0].slug;
      
      // Test clean slug
      const validProdRes = await fetch(`${BASE_URL}/api/products/${sampleSlug}`);
      const validProdJson = await validProdRes.json();
      assert(validProdRes.status === 200 && validProdJson.success === true, 'GET /api/products/:slug Valid', `HTTP ${validProdRes.status}, name: "${validProdJson.data?.name}"`);

      // Test legacy .html slug
      const legacyProdRes = await fetch(`${BASE_URL}/api/products/${sampleSlug}.html`);
      const legacyProdJson = await legacyProdRes.json();
      const linkHeader = legacyProdRes.headers.get('link') || '';
      assert(legacyProdRes.status === 200 && legacyProdJson.success === true, 'GET /api/products/:slug.html Legacy Match', `HTTP ${legacyProdRes.status}`);
      assert(linkHeader.includes('rel="canonical"'), 'GET /api/products/:slug.html Canonical Link Header', linkHeader);
    }

    // 4. Test Invalid Product Slug (Verify NO Soft 404)
    const invalidProdRes = await fetch(`${BASE_URL}/api/products/non-existent-machinery-slug-999`);
    const invalidProdJson = await invalidProdRes.json();
    assert(invalidProdRes.status === 404, 'GET Non-existent Product (HTTP 404 check)', `HTTP ${invalidProdRes.status} (Expected 404, Got ${invalidProdRes.status})`);
    assert(invalidProdJson.success === false, 'GET Non-existent Product Payload', `success: ${invalidProdJson.success}`);

    // 5. Test Invalid Blog Slug (Verify NO Soft 404)
    const invalidBlogRes = await fetch(`${BASE_URL}/api/blogs/non-existent-blog-slug-999`);
    const invalidBlogJson = await invalidBlogRes.json();
    assert(invalidBlogRes.status === 404, 'GET Non-existent Blog (HTTP 404 check)', `HTTP ${invalidBlogRes.status} (Expected 404, Got ${invalidBlogRes.status})`);
    assert(invalidBlogJson.success === false, 'GET Non-existent Blog Payload', `success: ${invalidBlogJson.success}`);

    // 6. Test Non-existent Endpoint (HTTP 404)
    const nonExistentRouteRes = await fetch(`${BASE_URL}/api/unknown-route-path`);
    assert(nonExistentRouteRes.status === 404, 'GET /api/unknown-route-path 404', `HTTP ${nonExistentRouteRes.status}`);

  } catch (err: any) {
    console.error('Test execution error:', err);
    failed++;
  } finally {
    server.close();
    console.log('\n==================================================');
    console.log(`SEO & HTTP REGRESSION TESTS RESULTS:`);
    console.log(`PASSED: ${passed} | FAILED: ${failed}`);
    console.log('==================================================\n');
    if (failed > 0) process.exit(1);
  }
}

testSeoAndHttp();

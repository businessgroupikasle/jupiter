import http from 'http';

function get(url: string): Promise<{ status: number; headers: any; body: string; buffer: Buffer }> {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      const chunks: Buffer[] = [];
      res.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
      res.on('end', () => {
        const buffer = Buffer.concat(chunks);
        resolve({
          status: res.statusCode || 0,
          headers: res.headers,
          body: buffer.toString('utf8'),
          buffer
        });
      });
    }).on('error', reject);
  });
}

async function run() {
  console.log('Testing Jupiter Backend APIs on port 5026...');

  // 1. Products API
  const prodRes = await get('http://localhost:5026/api/products?all=true&admin=true');
  console.log(`GET /api/products -> status: ${prodRes.status}`);
  if (prodRes.status === 200) {
    const raw = JSON.parse(prodRes.body);
    const prods = Array.isArray(raw) ? raw : (raw.products || raw.data || []);
    console.log(`Total products returned: ${prods.length}`);
    const active = prods.filter((p: any) => p.isActive).length;
    const inactive = prods.filter((p: any) => !p.isActive).length;
    console.log(`Active: ${active}, Inactive: ${inactive}`);
    if (prods.length > 0) {
      console.log(`Sample product #1: ${prods[0].name} | img: ${prods[0].image}`);
    }
  }

  // 2. Videos API
  const vidRes = await get('http://localhost:5026/api/videos');
  console.log(`GET /api/videos -> status: ${vidRes.status}`);
  if (vidRes.status === 200) {
    const raw = JSON.parse(vidRes.body);
    const vids = Array.isArray(raw) ? raw : (raw.videos || raw.data || []);
    console.log(`Total videos returned: ${vids.length}`);
    if (vids.length > 0) {
      console.log(`Sample video #1: ${vids[0].title} | thumb: ${vids[0].thumbnailUrl}`);
    }
  }

  // 3. Enquiries API
  const enqRes = await get('http://localhost:5026/api/enquiries');
  console.log(`GET /api/enquiries -> status: ${enqRes.status}`);
  if (enqRes.status === 200) {
    const raw = JSON.parse(enqRes.body);
    const enqs = Array.isArray(raw) ? raw : (raw.enquiries || raw.data || []);
    console.log(`Total enquiries returned: ${enqs.length}`);
    enqs.forEach((e: any) => {
      console.log(`- ${e.enquiryId}: ${e.name} (${e.phone}, ${e.email}) [${e.status}] - machine: ${e.machine || 'N/A'}`);
    });
  }

  // 4. Media API
  const mediaRes = await get('http://localhost:5026/api/media');
  console.log(`GET /api/media -> status: ${mediaRes.status}`);
  if (mediaRes.status === 200) {
    const raw = JSON.parse(mediaRes.body);
    const mediaList = Array.isArray(raw) ? raw : (raw.media || raw.data || []);
    console.log(`Total media records returned: ${mediaList.length}`);
    if (mediaList.length > 0) {
      console.log(`Sample media #1: ${mediaList[0].filename} (${mediaList[0].size} bytes)`);
    }
  }

  // 5. Test Product Image Static Serving (from Media DB bytea / uploads fallback)
  const imgRes = await get('http://localhost:5026/uploads/products/product_1_jupiter_v15b.jpeg');
  console.log(`GET /uploads/products/product_1_jupiter_v15b.jpeg -> status: ${imgRes.status}, size: ${imgRes.buffer.length} bytes, contentType: ${imgRes.headers['content-type']}`);

  // 6. Test Video Thumbnail Static Serving
  const thumbRes = await get('http://localhost:5026/uploads/videos/video_1_feeder_model.jpeg');
  console.log(`GET /uploads/videos/video_1_feeder_model.jpeg -> status: ${thumbRes.status}, size: ${thumbRes.buffer.length} bytes, contentType: ${thumbRes.headers['content-type']}`);

  // 7. Test Media Controller endpoint
  const mediaFileRes = await get('http://localhost:5026/api/media/file/product_1_jupiter_v15b.jpeg');
  console.log(`GET /api/media/file/product_1_jupiter_v15b.jpeg -> status: ${mediaFileRes.status}, size: ${mediaFileRes.buffer.length} bytes, contentType: ${mediaFileRes.headers['content-type']}`);

  console.log('API verification completed.');
}

run().catch(console.error);

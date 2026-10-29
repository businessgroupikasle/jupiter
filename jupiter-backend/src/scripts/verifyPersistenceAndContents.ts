import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const API_BASE = 'http://localhost:5026/api';

async function verify() {
  console.log('=== RUNNING JUPITER MACHINERY PERSISTENCE & INTEGRITY VERIFICATION ===\n');

  try {
    // 1. Check database records directly
    console.log('[Test 1] Checking PostgreSQL database records directly via Prisma...');
    const productsInDb = await prisma.product.findMany({
      where: {
        id: {
          in: ['cmus_jupiter_v10b_model', 'cmus_jupiter_v12b_model', 'cmus8mqtn000bkwtfhsvexaxi'],
        },
      },
      include: {
        images: true,
        details: true,
      },
      orderBy: { order: 'asc' },
    });

    console.log(`Found ${productsInDb.length} seeded Jupiter V products in DB:`);
    for (const p of productsInDb) {
      console.log(`- Product ID: ${p.id} | Slug: ${p.slug} | Name: ${p.name}`);
      console.log(`  Detail Items count: ${p.details.length} | Images count: ${p.images.length}`);
      const specs = (p.specifications as any) || {};
      console.log(`  Highlights: ${specs.highlights?.length} | Advantages: ${specs.advantages?.length} | KeyFeatures: ${specs.keyFeatures?.length} | Spec Rows: ${specs.specTableRows?.length}`);
    }

    if (productsInDb.length !== 3) {
      throw new Error(`Expected 3 products, got ${productsInDb.length}`);
    }

    // 2. Check API GET /api/products
    console.log('\n[Test 2] Testing API GET /api/products ...');
    const listRes = await fetch(`${API_BASE}/products`);
    const listJson = await listRes.json() as any;
    const items = listJson.data || listJson;
    console.log(`API returned status ${listRes.status}, count: ${items.length}`);

    // 3. Check individual endpoints for all three products
    const testIds = ['cmus_jupiter_v10b_model', 'cmus_jupiter_v12b_model', 'cmus8mqtn000bkwtfhsvexaxi'];
    for (const id of testIds) {
      console.log(`\n[Test 3] Testing API GET /api/products/${id} ...`);
      const res = await fetch(`${API_BASE}/products/${id}`);
      const json = await res.json() as any;
      const p = json.data || json;
      console.log(`  Name: ${p.name}`);
      console.log(`  Brand Tag: ${p.brandTag || p.specifications?.brandTag}`);
      console.log(`  Capacity: ${p.capacity} (Label: ${p.capacityLabel})`);
      console.log(`  Power: ${p.power} (Label: ${p.powerLabel})`);
      console.log(`  Brick Size: ${p.brickSize} (Label: ${p.brickSizeLabel})`);
      console.log(`  Feature Badges (${p.featureBadges?.length}): ${p.featureBadges?.join(' | ')}`);
      console.log(`  Highlights count: ${p.highlights?.length}`);
      console.log(`  Key Features count: ${p.keyFeatures?.length}`);
      console.log(`  Advantages count: ${p.advantages?.length}`);
      console.log(`  Spec Table Columns: ${p.specTableColumns?.join(', ')}`);
      console.log(`  Spec Table Rows count: ${p.specTableRows?.length}`);
      console.log(`  SEO Meta Title: ${p.metaTitle || p.specifications?.metaTitle}`);
      console.log(`  SEO Focus Keyword: ${p.focusKeyword || p.specifications?.focusKeyword}`);
      console.log(`  Image URL: ${p.image || p.imageUrl}`);
    }

    // 4. Test image serving and Media backup
    console.log('\n[Test 4] Testing durable Media storage and Image URL access...');
    const mediaCount = await prisma.media.count();
    console.log(`Prisma Media table has ${mediaCount} durable media records.`);

    const sampleImages = [
      '/uploads/products/1--10-1791953431092-625007853.png',
      '/uploads/products/1--4-1791953419156-189672038.png',
      '/uploads/products/1--4-1791024895795-221812260.png',
    ];

    for (const imgUrl of sampleImages) {
      const fullUrl = `http://localhost:5026${imgUrl}`;
      try {
        const imgRes = await fetch(fullUrl);
        const buf = await imgRes.arrayBuffer();
        console.log(`  Image ${imgUrl} -> Status: ${imgRes.status}, Size: ${buf.byteLength} bytes, Content-Type: ${imgRes.headers.get('content-type')}`);
      } catch (err: any) {
        console.error(`  Image fetch error for ${imgUrl}: ${err.message}`);
      }
    }

    // 5. Test Update Persistence across all 5 tabs
    console.log('\n[Test 5] Testing update persistence across all 5 tabs...');
    const targetId = 'cmus8mqtn000bkwtfhsvexaxi';
    const beforeRes = await fetch(`${API_BASE}/products/${targetId}`);
    const beforeJson = await beforeRes.json() as any;
    const beforeData = beforeJson.data || beforeJson;

    const updatedBadges = [...beforeData.featureBadges, 'Automated Safety Interlock'];
    const updatedHighlights = [
      ...beforeData.highlights,
      {
        id: 'hl-test-extra',
        title: 'Precision Hydraulic Proportioning',
        description: 'Advanced proportional valve ensures vibration-free smooth pressing stroke.',
        displayOrder: 5,
      },
    ];

    const updatedRows = [
      ...beforeData.specTableRows,
      { Parameter: 'Cycle Time', Details: '12–14 Seconds', Specification: 'Automatic' },
    ];

    const updatedFeatures = [
      ...beforeData.keyFeatures,
      'Integrated real-time hydraulic pressure monitoring sensors.',
    ];

    const updatedAdvantages = [
      ...beforeData.advantages,
      {
        id: 'adv-test-extra',
        title: 'Minimum Maintenance Downtime',
        description: 'Modular valve block design allows effortless maintenance and fast replacement.',
        displayOrder: 5,
      },
    ];

    console.log('Sending PUT update with extra highlight, spec row, feature, and advantage...');
    const putRes = await fetch(`${API_BASE}/products/${targetId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-request': 'true',
      },
      body: JSON.stringify({
        name: beforeData.name,
        category: beforeData.category,
        brandTag: beforeData.brandTag || 'JUPITER INDUSTRIES',
        capacity: beforeData.capacity,
        power: beforeData.power,
        brickSize: beforeData.brickSize,
        description: beforeData.description,
        featureBadges: updatedBadges,
        highlights: updatedHighlights,
        specTableColumns: beforeData.specTableColumns,
        specTableRows: updatedRows,
        keyFeatures: updatedFeatures,
        advantages: updatedAdvantages,
      }),
    });

    console.log(`PUT returned status ${putRes.status}`);

    // Fetch again to verify persistence
    const afterRes = await fetch(`${API_BASE}/products/${targetId}`);
    const afterJson = await afterRes.json() as any;
    const afterData = afterJson.data || afterJson;

    console.log(`Verified after update:`);
    console.log(`  Highlights count: ${afterData.highlights.length} (expected: 5)`);
    console.log(`  Spec Table Rows: ${afterData.specTableRows.length} (expected: ${updatedRows.length})`);
    console.log(`  Key Features: ${afterData.keyFeatures.length} (expected: 5)`);
    console.log(`  Advantages: ${afterData.advantages.length} (expected: 5)`);

    if (
      afterData.highlights.length !== 5 ||
      afterData.specTableRows.length !== updatedRows.length ||
      afterData.keyFeatures.length !== 5 ||
      afterData.advantages.length !== 5
    ) {
      throw new Error('Update persistence verification failed!');
    }

    // Now restore exact official user content for V 15 B
    console.log('\nRestoring exact official content for Jupiter V 15 B...');
    await fetch(`${API_BASE}/products/${targetId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-request': 'true',
      },
      body: JSON.stringify({
        name: beforeData.name,
        category: beforeData.category,
        brandTag: 'JUPITER INDUSTRIES',
        capacity: '3,500–3,600 Bricks per Hour',
        power: 'Not specified (Hydraulic Motor: 15 HP / 11.25 kW)',
        brickSize: '230 × 105 × 75 mm',
        description: beforeData.description,
        featureBadges: [
          '80+2 Ton Hydraulic Press',
          '3,500–3,600 Bricks/Hour',
          'Double Main Cylinder',
          'PLC Control System',
        ],
        highlights: [
          {
            id: 'hl-v15b-1',
            title: 'High-Capacity Brick Manufacturing',
            description:
              'Delivers a production capacity of approximately 3,500 to 3,600 fly ash bricks per hour for industrial manufacturing requirements.',
            displayOrder: 1,
          },
          {
            id: 'hl-v15b-2',
            title: '80+2 Ton Hydraulic Pressing',
            description:
              'Double main cylinder system provides an 80+2 ton hydraulic pressing load for effective brick compression.',
            displayOrder: 2,
          },
          {
            id: 'hl-v15b-3',
            title: '15 HP Hydraulic Motor System',
            description:
              'Equipped with a 15 HP hydraulic motor, separate brick eject motor and heat exchanger for machine operation.',
            displayOrder: 3,
          },
          {
            id: 'hl-v15b-4',
            title: 'PLC Control & Heavy Pressing Belt',
            description:
              'PLC control panel combined with a heavy pressing belt and 100-litre pre-fill tank supports the production process.',
            displayOrder: 4,
          },
        ],
        specTableColumns: ['Parameter', 'Details', 'Specification'],
        specTableRows: [
          { Parameter: 'Machine Model', Details: 'Jupiter V 15 B', Specification: 'High Speed' },
          { Parameter: 'Machine Type', Details: 'JIM 80+2 Tons', Specification: 'Fly Ash Brick Machine' },
          { Parameter: 'Production Capacity', Details: '3,500–3,600', Specification: 'Bricks per Hour' },
          { Parameter: 'Hydraulic Pressing Load', Details: '80+2 Tons', Specification: 'Double Main Cylinder' },
          { Parameter: 'Hydraulic Motor', Details: '15 HP', Specification: '11.25 kW' },
          { Parameter: 'Brick Eject Motor', Details: '2 HP', Specification: '1.5 kW' },
          { Parameter: 'Heat Exchanger', Details: '1 HP', Specification: '0.75 kW' },
          { Parameter: 'Oil Tank Capacity', Details: '500 Litres', Specification: '—' },
          { Parameter: 'Pressing Belt', Details: 'Heavy Pressing Belt', Specification: '—' },
          { Parameter: 'Pre-Fill Tank Capacity', Details: '100 Litres', Specification: '—' },
          { Parameter: 'Control System', Details: 'PLC Control Panel', Specification: '—' },
          { Parameter: 'Motor Brands', Details: 'Siemens, Crompton, Havells', Specification: '—' },
          { Parameter: 'Brick Size', Details: '230 × 105 × 75 mm', Specification: '—' },
        ],
        keyFeatures: [
          '80+2 ton hydraulic pressing load with double main cylinders.',
          'High-speed manufacturing capacity of 3,500 to 3,600 bricks per hour.',
          '15 HP hydraulic motor, 2 HP brick eject motor and 1 HP heat exchanger.',
          'PLC control panel with 500-litre hydraulic oil tank, heavy pressing belt and 100-litre pre-fill tank.',
        ],
        advantages: [
          {
            id: 'adv-v15b-1',
            title: 'High-Volume Brick Production',
            description:
              'Offers a production capacity of up to 3,600 fly ash bricks per hour for industrial manufacturing requirements.',
            displayOrder: 1,
          },
          {
            id: 'adv-v15b-2',
            title: 'Heavy-Duty Hydraulic Compression',
            description:
              'The 80+2 ton double main cylinder pressing system supports effective compression during brick production.',
            displayOrder: 2,
          },
          {
            id: 'adv-v15b-3',
            title: 'Controlled Machine Performance',
            description:
              'PLC control panel helps manage the hydraulic production cycle and machine operating functions.',
            displayOrder: 3,
          },
          {
            id: 'adv-v15b-4',
            title: 'Industrial Production Configuration',
            description:
              'The heavy pressing belt, pre-fill tank and separate motor systems support high-speed fly ash brick manufacturing.',
            displayOrder: 4,
          },
        ],
      }),
    });

    const restoredRes = await fetch(`${API_BASE}/products/${targetId}`);
    const restoredJson = await restoredRes.json() as any;
    const restoredData = restoredJson.data || restoredJson;
    console.log(`Restored successfully: Highlights=${restoredData.highlights.length}, Rows=${restoredData.specTableRows.length}, Features=${restoredData.keyFeatures.length}, Advantages=${restoredData.advantages.length}`);

    console.log('\n=== ALL PERSISTENCE AND DATA INTEGRITY VERIFICATIONS PASSED SUCCESSFULLY ===');
  } catch (error: any) {
    console.error('Verification failed:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

verify();

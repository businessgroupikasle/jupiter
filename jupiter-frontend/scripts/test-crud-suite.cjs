const http = require('http');

const API_BASE = 'http://localhost:5026/api';

function request(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(API_BASE + path);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, body: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });

    req.on('error', reject);
    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function runTests() {
  const results = [];

  const logResult = (name, passed, details = '') => {
    results.push({ name, passed, details });
    console.log(`[${passed ? 'PASS' : 'FAIL'}] ${name}${details ? ' - ' + details : ''}`);
  };

  console.log('=== STARTING JUPITER INTEGRATION CRUD & API TEST SUITE ===\n');

  try {
    // 1. Health Check
    const health = await request('GET', '/health');
    logResult('API Health Check', health.status === 200 && health.body.status === 'OK');

    // 2. Product CRUD
    const newProduct = {
      name: 'Integration Test Block Press 5000',
      slug: 'integration-test-block-press-5000-' + Date.now(),
      category: 'Block Machines',
      description: 'Test block press created during integration testing',
      capacity: '5,000 Blocks / Shift',
      power: '30 HP',
      image: '/images/concrete-blocks.jpg',
      specifications: { Capacity: '5,000 Blocks / Shift', Power: '30 HP' }
    };
    const createProd = await request('POST', '/products', newProduct);
    const prodId = createProd.body.data?.id;
    logResult('Create Product (POST /api/products)', createProd.status === 201 && !!prodId, `Created ID: ${prodId}`);

    if (prodId) {
      const updateProd = await request('PUT', `/products/${prodId}`, {
        name: 'Integration Test Block Press 5000 (Updated)',
        capacity: '6,000 Blocks / Shift'
      });
      logResult('Update Product (PUT /api/products/:id)', updateProd.status === 200 && updateProd.body.data?.name.includes('(Updated)'));

      const deleteProd = await request('DELETE', `/products/${prodId}`);
      logResult('Delete Product (DELETE /api/products/:id)', deleteProd.status === 200);
    }

    // 3. Blog CRUD
    const newBlog = {
      title: 'Integration Test Article ' + Date.now(),
      slug: 'integration-test-article-' + Date.now(),
      category: 'Technology',
      readTime: '4 min read',
      authorName: 'Integration Tester',
      date: '26 Sept 2026',
      image: '/images/hero-banner1.png',
      excerpt: 'Testing blog creation via API',
      content: 'Full content of integration testing technical article.'
    };
    const createBlog = await request('POST', '/blogs', newBlog);
    const blogId = createBlog.body.data?.id;
    logResult('Create Blog (POST /api/blogs)', createBlog.status === 201 && !!blogId, `Created ID: ${blogId}`);

    if (blogId) {
      const updateBlog = await request('PUT', `/blogs/${blogId}`, {
        title: 'Integration Test Article (Updated)',
        views: 42
      });
      logResult('Update Blog (PUT /api/blogs/:id)', updateBlog.status === 200 && updateBlog.body.data?.views === 42);

      const getSingleBlog = await request('GET', `/blogs/${blogId}`);
      logResult('Get Single Blog (GET /api/blogs/:id)', getSingleBlog.status === 200 && getSingleBlog.body.data?.id === blogId);

      const deleteBlog = await request('DELETE', `/blogs/${blogId}`);
      logResult('Delete Blog (DELETE /api/blogs/:id)', deleteBlog.status === 200);
    }

    // 4. Project CRUD
    const newProject = {
      title: 'Integration Test Plant Setup ' + Date.now(),
      client: 'Apex Constructions',
      location: 'Coimbatore, Tamil Nadu',
      machine: 'Fully Automatic Fly Ash Brick Machine',
      year: '2026',
      status: 'Completed',
      capacity: '18,000 Bricks / Day',
      image: '/images/arunachala-plant.jpg',
      description: 'Complete turnkey installation and commissioning trial.'
    };
    const createProj = await request('POST', '/projects', newProject);
    const projId = createProj.body.data?.id;
    logResult('Create Project (POST /api/projects)', createProj.status === 201 && !!projId, `Created ID: ${projId}`);

    if (projId) {
      const updateProj = await request('PUT', `/projects/${projId}`, {
        status: 'Operational & Running'
      });
      logResult('Update Project (PUT /api/projects/:id)', updateProj.status === 200 && updateProj.body.data?.status === 'Operational & Running');

      const deleteProj = await request('DELETE', `/projects/${projId}`);
      logResult('Delete Project (DELETE /api/projects/:id)', deleteProj.status === 200);
    }

    // 5. Gallery Photo CRUD
    const newPhoto = {
      title: 'Integration Test Photo',
      category: 'Manufacturing Plants',
      location: 'Coimbatore',
      machine: 'Rotary Brick Press',
      output: 'Commercial Grade',
      image: '/images/concrete-blocks.jpg',
      description: 'Factory floor test photo'
    };
    const createPhoto = await request('POST', '/gallery', newPhoto);
    const photoId = createPhoto.body.data?.id;
    logResult('Create Gallery Item (POST /api/gallery)', createPhoto.status === 201 && !!photoId, `Created ID: ${photoId}`);

    if (photoId) {
      const deletePhoto = await request('DELETE', `/gallery/${photoId}`);
      logResult('Delete Gallery Item (DELETE /api/gallery/:id)', deletePhoto.status === 200);
    }

    // 6. Video CRUD
    const newVideo = {
      title: 'Integration Test Demo Video',
      videoUrl: 'https://www.youtube.com/watch?v=RZot-EmDGHw',
      embedUrl: 'https://www.youtube.com/embed/RZot-EmDGHw?autoplay=1',
      views: '1.2K views',
      duration: '3:30',
      image: 'https://img.youtube.com/vi/RZot-EmDGHw/hqdefault.jpg',
      category: 'Block Machines',
      description: 'Demonstration video for test'
    };
    const createVid = await request('POST', '/videos', newVideo);
    const vidId = createVid.body.data?.id;
    logResult('Create Video (POST /api/videos)', createVid.status === 201 && !!vidId, `Created ID: ${vidId}`);

    if (vidId) {
      const deleteVid = await request('DELETE', `/videos/${vidId}`);
      logResult('Delete Video (DELETE /api/videos/:id)', deleteVid.status === 200);
    }

    // 7. Enquiries Update & Status
    const testEnquiry = {
      name: 'Status Test User',
      email: 'status.test@jupiter.com',
      phone: '+91 9123456789',
      message: 'Status flow test enquiry'
    };
    const createEnq = await request('POST', '/enquiries', testEnquiry);
    const enqId = createEnq.body.data?.id;
    logResult('Create Enquiry (POST /api/enquiries)', createEnq.status === 201 && !!enqId, `Created ID: ${enqId}`);

    if (enqId) {
      const updateStatus = await request('PATCH', `/enquiries/${enqId}/status`, { status: 'Contacted' });
      logResult('Update Enquiry Status (PATCH /api/enquiries/:id/status)', updateStatus.status === 200 && updateStatus.body.data?.status === 'Contacted');

      const markRead = await request('PATCH', `/enquiries/${enqId}/read`);
      logResult('Mark Enquiry Read (PATCH /api/enquiries/:id/read)', markRead.status === 200 && markRead.body.data?.isRead === true);

      const deleteEnq = await request('DELETE', `/enquiries/${enqId}`);
      logResult('Delete Enquiry (DELETE /api/enquiries/:id)', deleteEnq.status === 200);
    }

    // 8. Users & Settings & Dashboard Stats
    const users = await request('GET', '/users');
    logResult('Get Users (GET /api/users)', users.status === 200 && Array.isArray(users.body.data) && users.body.data.length > 0, `Users: ${users.body.data?.length}`);

    const settings = await request('GET', '/settings');
    logResult('Get Settings (GET /api/settings)', settings.status === 200 && !!settings.body.data);

    const stats = await request('GET', '/dashboard/stats');
    logResult('Get Dashboard Stats (GET /api/dashboard/stats)', stats.status === 200 && !!stats.body.data);

    // 9. Error Validation & Empty States
    const badEnquiry = await request('POST', '/enquiries', { name: '', phone: '' });
    logResult('Validate Bad Enquiry Payload (POST 400 error handling)', badEnquiry.status === 400);

    const badRoute = await request('GET', '/non-existent-endpoint');
    logResult('404 Error Handling for Missing Endpoint', badRoute.status === 404);

  } catch (err) {
    console.error('Test suite runtime error:', err);
  }

  console.log('\n=== INTEGRATION TEST SUMMARY ===');
  const total = results.length;
  const passed = results.filter(r => r.passed).length;
  const failed = results.filter(r => !r.passed).length;
  console.log(`Total: ${total} | Passed: ${passed} | Failed: ${failed}`);
}

runTests();

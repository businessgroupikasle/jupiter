const http = require('http');

function post(path, data, headers = {}) {
  return new Promise(function(resolve) {
    const payload = JSON.stringify(data);
    const req = http.request({
      hostname: 'localhost',
      port: 5026,
      path: path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
        ...headers
      }
    }, function(res) {
      let body = '';
      res.on('data', function(chunk) { body += chunk; });
      res.on('end', function() {
        resolve({ status: res.statusCode, headers: res.headers, body: body });
      });
    });
    req.write(payload);
    req.end();
  });
}

function put(path, data, headers = {}) {
  return new Promise(function(resolve) {
    const payload = JSON.stringify(data);
    const req = http.request({
      hostname: 'localhost',
      port: 5026,
      path: path,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
        ...headers
      }
    }, function(res) {
      let body = '';
      res.on('data', function(chunk) { body += chunk; });
      res.on('end', function() {
        resolve({ status: res.statusCode, headers: res.headers, body: body });
      });
    });
    req.write(payload);
    req.end();
  });
}

async function test() {
  // 1. Login to get token
  const loginRes = await post('/api/auth/login', { email: 'admin@jupiter.com', password: 'admin123' });
  const loginData = JSON.parse(loginRes.body);
  const token = loginData.token;
  console.log('Got token:', token);

  // 2. Test create with Authorization Bearer
  const createWithAuth = await post('/api/products', {
    name: 'Auth Test Machine ' + Date.now(),
    category: 'Fly Ash Brick Machine',
    description: 'Testing product save with auth',
    capacity: '2000',
    power: '15 HP',
    image: '/images/flyash.png'
  }, {
    'Authorization': 'Bearer ' + token
  });
  console.log('Create with Bearer:', createWithAuth.status, createWithAuth.body);
  const prodId = JSON.parse(createWithAuth.body).data?.id;

  // 3. Test edit with Authorization Bearer
  if (prodId) {
    const updateWithAuth = await put('/api/products/' + prodId, {
      name: 'Auth Test Machine Updated',
      capacity: '2500'
    }, {
      'Authorization': 'Bearer ' + token
    });
    console.log('Update with Bearer:', updateWithAuth.status, updateWithAuth.body);

    // Clean up
    const delReq = http.request({
      hostname: 'localhost',
      port: 5026,
      path: '/api/products/' + prodId,
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer ' + token }
    });
    delReq.end();
  }

  // 4. Test validation error response from backend
  const badProduct = await post('/api/products', {
    // Missing required fields
  }, {
    'Authorization': 'Bearer ' + token
  });
  console.log('Bad product response:', badProduct.status, badProduct.body);
}

test();

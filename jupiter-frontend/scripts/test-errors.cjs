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

function del(path) {
  return new Promise(function(resolve) {
    const req = http.request({
      hostname: 'localhost',
      port: 5026,
      path: path,
      method: 'DELETE',
    }, function(res) {
      resolve(res.statusCode);
    });
    req.end();
  });
}

async function testErrors() {
  await del('/api/products/cmujg85rb000euvkc5ubvc1by');

  const enqErr = await post('/api/enquiries', { name: '', phone: '' });
  console.log('Enquiry 400:', enqErr.status, enqErr.body);

  const putErr = await put('/api/products/does-not-exist-999', { name: 'Test' });
  console.log('Product 404:', putErr.status, putErr.body);

  const uploadErr = await post('/api/upload', { image: 'invalid-image-data' });
  console.log('Upload error:', uploadErr.status, uploadErr.body);
}

testErrors();

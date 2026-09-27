const http = require('http');

function post(path, data) {
  return new Promise(function(resolve) {
    const payload = JSON.stringify(data);
    const req = http.request({
      hostname: 'localhost',
      port: 5026,
      path: path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, function(res) {
      let body = '';
      res.on('data', function(chunk) { body += chunk; });
      res.on('end', function() {
        resolve({ status: res.statusCode, body: body });
      });
    });
    req.write(payload);
    req.end();
  });
}

async function check() {
  const r = await post('/api/products', { name: '   ' });
  console.log('Empty name product:', r.status, r.body);
  const r2 = await post('/api/upload', {});
  console.log('Empty upload:', r2.status, r2.body);
}

check();

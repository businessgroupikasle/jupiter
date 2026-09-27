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

async function run() {
  console.log('Testing login with admin123...');
  const res = await post('/api/auth/login', { email: 'admin@jupiter.com', password: 'admin123' });
  console.log('Login status:', res.status);
  console.log('Set-Cookie:', res.headers['set-cookie']);
  console.log('Body:', res.body);
}

run();

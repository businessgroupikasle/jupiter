const http = require('http');

async function testUsers() {
  const req = http.request({
    hostname: 'localhost',
    port: 5026,
    path: '/api/users',
    method: 'GET'
  }, (res) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      console.log('Users:', body);
    });
  });
  req.end();
}
testUsers();

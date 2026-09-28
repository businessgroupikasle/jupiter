const http = require('http');

async function sendRequest(options, postData) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, data }));
    });
    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

async function run() {
  // First get current enquiries
  const getRes = await sendRequest({
    hostname: 'localhost',
    port: 5026,
    path: '/api/enquiries',
    method: 'GET'
  });
  const enquiries = JSON.parse(getRes.data);
  console.log('Current enquiries:', enquiries);

  const list = Array.isArray(enquiries) ? enquiries : (enquiries.data || []);
  for (const enq of list) {
    if (enq.name.includes('Dfffff')) {
      console.log('Deleting test enquiry:', enq.id);
      await sendRequest({
        hostname: 'localhost',
        port: 5026,
        path: `/api/enquiries/${enq.id}`,
        method: 'DELETE'
      });
    }
  }

  // Create clean enquiry matching user's exact specification
  const newEnqData = JSON.stringify({
    name: 'NAVEEN KUMAR . D',
    email: 'naveenkumar79110@gmail.com',
    phone: '+91 6380209434',
    location: 'Pan India',
    productInterest: 'Paver Block Machines',
    message: 'Company: ikasle | Product Interest: Paver Block Machines | Details: Paver Block Machine quotation inquiry'
  });

  const postRes = await sendRequest({
    hostname: 'localhost',
    port: 5026,
    path: '/api/enquiries',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(newEnqData)
    }
  }, newEnqData);

  console.log('Post response:', postRes.statusCode, postRes.data);
}

run().catch(console.error);

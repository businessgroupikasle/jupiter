const http = require('http');

function formatEnquiryDate(dateVal) {
  if (!dateVal) return new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  const d = new Date(dateVal);
  if (isNaN(d.getTime())) return String(dateVal);
  const day = d.getDate();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}

const req = http.request({
  hostname: 'localhost',
  port: 5026,
  path: '/api/enquiries',
  method: 'GET'
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const parsed = JSON.parse(data);
      const list = Array.isArray(parsed) ? parsed : (parsed.enquiries || parsed.data || []);
      
      const mapped = list.map((item, idx) => {
        let productFromObj = item.productInterest;
        if (!productFromObj && typeof item.product === 'object' && item.product !== null) {
          productFromObj = item.product.name;
        } else if (typeof item.product === 'string') {
          productFromObj = item.product;
        }
        let productFromMsg = '';
        if (typeof item.message === 'string') {
          const m = item.message.match(/Product Interest:\s*([^\n|]+)/i);
          if (m && m[1]) productFromMsg = m[1].trim();
        }
        const productVal = productFromObj || productFromMsg || item.product || 'Paver Block Machines';
        const locationVal = item.location || 'Pan India';
        const createdAt = item.createdAt || new Date().toISOString();
        const formattedDate = formatEnquiryDate(createdAt);
        const serialId = `#${String(idx + 1).padStart(3, '0')}`;

        return {
          id: item.id, // hidden Prisma CUID
          serialId,
          name: item.name,
          email: item.email || '',
          phone: item.phone || '',
          location: locationVal,
          productInterest: productVal,
          date: formattedDate,
          status: item.status || 'New'
        };
      });

      console.log('--- ENQUIRIES TABLE TEST ROW VERIFICATION ---');
      mapped.forEach((enquiry) => {
        // ID | Customer Name | Email | Phone | Location | Product Interest | Date | Status | Actions
        const rowDisplay = `${enquiry.serialId} | ${enquiry.name} | ${enquiry.email} | ${enquiry.phone} | ${enquiry.location} | ${enquiry.productInterest} | ${enquiry.date} | ${enquiry.status}`;
        console.log('Displayed row:');
        console.log(rowDisplay);
      });
      console.log('---------------------------------------------');
    } catch (e) {
      console.error('Error parsing response:', e);
    }
  });
});

req.on('error', (e) => {
  console.error('Error fetching enquiries:', e.message);
});

req.end();

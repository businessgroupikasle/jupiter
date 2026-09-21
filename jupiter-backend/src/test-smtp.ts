import nodemailer from 'nodemailer';

async function testConnection(host: string, port: number, secure: boolean) {
  console.log(`Testing SMTP: host=${host}, port=${port}, secure=${secure}...`);
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: 'marketing@jupitergroups.in',
      pass: 'd9g9EQyekjej',
    },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 8000,
  });

  try {
    const res = await transporter.verify();
    console.log(`SUCCESS with ${host}:${port}! Response:`, res);
    return true;
  } catch (err: any) {
    console.log(`FAILED with ${host}:${port}:`, err.message);
    return false;
  }
}

async function run() {
  const configs = [
    { host: 'smtppro.zoho.in', port: 465, secure: true },
    { host: 'smtp.zoho.in', port: 465, secure: true },
    { host: 'smtppro.zoho.com', port: 465, secure: true },
    { host: 'smtp.zoho.com', port: 465, secure: true },
    { host: 'smtp.zoho.in', port: 587, secure: false },
    { host: 'smtp.zoho.com', port: 587, secure: false },
  ];

  for (const c of configs) {
    const ok = await testConnection(c.host, c.port, c.secure);
    if (ok) {
      console.log(`Optimal configuration found: ${c.host}:${c.port} (secure=${c.secure})`);
      break;
    }
  }
}

run();

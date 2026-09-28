const { execSync } = require('child_process');
const path = require('path');

const backendDir = path.resolve(__dirname, '../../jupiter-backend');
console.log('Installing bcryptjs in jupiter-backend...');
try {
  const out1 = execSync('npm install bcryptjs', { cwd: backendDir, encoding: 'utf8' });
  console.log(out1);
  const out2 = execSync('npm install --save-dev @types/bcryptjs', { cwd: backendDir, encoding: 'utf8' });
  console.log(out2);
  console.log('bcryptjs installed successfully!');
} catch (e) {
  console.error('Install failed:', e.message);
  process.exit(1);
}

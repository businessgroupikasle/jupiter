const fs = require('fs');
const path = require('path');

const backendPkg = require('../../jupiter-backend/package.json');
console.log('Backend dependencies:', Object.keys(backendPkg.dependencies || {}));
console.log('Backend devDependencies:', Object.keys(backendPkg.devDependencies || {}));

const hasBcrypt = fs.existsSync(path.resolve(__dirname, '../../jupiter-backend/node_modules/bcrypt'));
const hasBcryptJs = fs.existsSync(path.resolve(__dirname, '../../jupiter-backend/node_modules/bcryptjs'));
console.log('bcrypt exists:', hasBcrypt);
console.log('bcryptjs exists:', hasBcryptJs);

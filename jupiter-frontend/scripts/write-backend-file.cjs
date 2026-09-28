const fs = require('fs');
const path = require('path');

const targetRel = process.argv[2];
const contentFile = process.argv[3];

if (!targetRel || !contentFile) {
  console.error('Usage: node write-backend-file.cjs <targetRelPath> <contentFilePath>');
  process.exit(1);
}

const targetPath = path.resolve('E:/Project/jupiter/jupiter-backend', targetRel);
const content = fs.readFileSync(contentFile, 'utf8');

fs.mkdirSync(path.dirname(targetPath), { recursive: true });
fs.writeFileSync(targetPath, content, 'utf8');
console.log(`Successfully wrote ${Buffer.byteLength(content)} bytes to ${targetPath}`);

import * as fs from 'fs';
import * as path from 'path';

const backendProductsUploads = path.resolve('d:/Project/jupiter/jupiter-backend/uploads/products');
const frontendPublicUploads = path.resolve('d:/Project/jupiter/jupiter-frontend/public/uploads/products');
const jupiterImagesDir = path.resolve('d:/Project/jupiter/jupiter-frontend/src/assets/images/jupiter images');
const sparesDir = path.resolve('d:/Project/jupiter/jupiter-frontend/src/assets/images/Spares');
const machinesDir = path.resolve('d:/Project/jupiter/jupiter-frontend/src/assets/images/Machines');

[backendProductsUploads, frontendPublicUploads].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const mappings: Array<{ src: string; targets: string[] }> = [
  // 1 (4).png -> Jupiter V 12 B Model
  {
    src: path.join(jupiterImagesDir, '1 (4).png'),
    targets: [
      '1--4-1791024895795-221812260.png',
      '1--4-1791953419156-189672038.png',
      '1--4.png',
      '1 (4).png'
    ]
  },
  // 1 (7).png -> HDM 800 Green Block Machine
  {
    src: path.join(jupiterImagesDir, '1 (7).png'),
    targets: [
      'Jupiter-Industries-Green-Block-Machine-1791953751046-607639876.png',
      'Jupiter-Industries-Green-Block-Machine.png',
      'green-block-machine.png',
      '1 (7).png'
    ]
  },
  // 1 (3).png -> Jupiter V 15 B Model
  {
    src: path.join(jupiterImagesDir, '1 (3).png'),
    targets: [
      '1--3-1791953166814-814526973.png',
      '1--3.png',
      '1 (3).png'
    ]
  },
  // 1 (5).png -> Batching Plant
  {
    src: path.join(jupiterImagesDir, '1 (5).png'),
    targets: [
      '1--5-1791953693967-3090793.png',
      '1--5.png',
      'admin_product_test_1790494485364.png',
      'admin_product_test.png',
      '1 (5).png'
    ]
  },
  // 1 (6).png -> Fly Ash & Cement Silo
  {
    src: path.join(jupiterImagesDir, '1 (6).png'),
    targets: [
      '1--6-1791953708660-129938880.png',
      '1--6.png',
      '1 (6).png'
    ]
  },
  // 1 (9).png -> Rotary Brick Machine
  {
    src: path.join(jupiterImagesDir, '1 (9).png'),
    targets: [
      '1--9-1791953609964-450970271.png',
      '1--9-1791953822843-158196456.png',
      '1--9.png',
      '1 (9).png'
    ]
  },
  // 1 (10).png -> Jupiter V 10 B Model
  {
    src: path.join(jupiterImagesDir, '1 (10).png'),
    targets: [
      '1--10-1791953431092-625007853.png',
      '1--10.png',
      '1 (10).png'
    ]
  },
  // 1 (1).png -> 5G Rotary Model 80 Ton
  {
    src: path.join(jupiterImagesDir, '1 (1).png'),
    targets: [
      'jupiter-5g-machine-full-view-1791953587374-4768439.png',
      'jupiter-5g-machine-full-view.png',
      '1 (1).png'
    ]
  },
  // 1 (8).png -> Hollow and Solid Block Machine Double & Triple Vibrator
  {
    src: path.join(jupiterImagesDir, '1 (8).png'),
    targets: [
      '0a306a34-c9a0-44b3-b116-ec27ef2e36fc-1791953787793-740493539.png',
      '1 (8).png'
    ]
  },
  // 1 (12).png or Solid Block Mold.png -> High Precision CNC Mould Sets / 19.png
  {
    src: path.join(sparesDir, 'Solid Block Mold.png'),
    targets: [
      '19.png',
      'Solid-Block-Mold.png'
    ]
  },
  {
    src: path.join(jupiterImagesDir, '1 (12).png'),
    targets: [
      '1 (12).png'
    ]
  },
  {
    src: path.join(jupiterImagesDir, '1 (2).png'),
    targets: ['1 (2).png']
  },
  {
    src: path.join(jupiterImagesDir, '1 (11).png'),
    targets: ['1 (11).png']
  }
];

let copiedCount = 0;
for (const item of mappings) {
  if (!fs.existsSync(item.src)) {
    console.warn(`Source file not found: ${item.src}`);
    continue;
  }
  const content = fs.readFileSync(item.src);
  for (const targetName of item.targets) {
    fs.writeFileSync(path.join(backendProductsUploads, targetName), content);
    fs.writeFileSync(path.join(frontendPublicUploads, targetName), content);
    copiedCount++;
  }
}

console.log(`Successfully synced ${copiedCount} product image assets to uploads/products!`);

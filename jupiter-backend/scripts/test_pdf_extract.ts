import fs from 'fs';
import path from 'path';

const pdfPath = 'C:\\Users\\Administrator\\Downloads\\Jupiter_Industries_Admin_Data_2026-10-24.pdf';
const pdfBuf = fs.readFileSync(pdfPath);
const pdfStr = pdfBuf.toString('binary');

export function extractPdfImageByObjNum(objNum: number): Buffer {
  const objTag = `${objNum} 0 obj`;
  const objStart = pdfStr.indexOf(objTag);
  if (objStart === -1) {
    throw new Error(`PDF object ${objNum} not found`);
  }

  const streamTag = 'stream';
  const streamStart = pdfStr.indexOf(streamTag, objStart);
  if (streamStart === -1) {
    throw new Error(`Stream not found in PDF object ${objNum}`);
  }

  let dataStart = streamStart + 6;
  if (pdfBuf[dataStart] === 0x0d && pdfBuf[dataStart + 1] === 0x0a) {
    dataStart += 2;
  } else if (pdfBuf[dataStart] === 0x0a || pdfBuf[dataStart] === 0x0d) {
    dataStart += 1;
  }

  const endStreamTag = 'endstream';
  const endStreamPos = pdfStr.indexOf(endStreamTag, dataStart);
  if (endStreamPos === -1) {
    throw new Error(`Endstream not found for PDF object ${objNum}`);
  }

  let dataEnd = endStreamPos;
  if (pdfBuf[dataEnd - 2] === 0x0d && pdfBuf[dataEnd - 1] === 0x0a) {
    dataEnd -= 2;
  } else if (pdfBuf[dataEnd - 1] === 0x0a || pdfBuf[dataEnd - 1] === 0x0d) {
    dataEnd -= 1;
  }

  const imgBuf = pdfBuf.subarray(dataStart, dataEnd);
  // Verify JPEG magic bytes
  if (imgBuf[0] !== 0xFF || imgBuf[1] !== 0xD8) {
    throw new Error(`Extracted buffer for object ${objNum} is not a valid JPEG (header: ${imgBuf[0].toString(16)} ${imgBuf[1].toString(16)})`);
  }
  return imgBuf;
}

// Verification test
const productPdfObjs = [68, 69, 70, 71, 72, 68, 73, 74, 75, 77, 78, 79, 80, 79, 81];
const videoPdfObjs = [106, 107, 108, 109, 110, 111, 112, 113, 114, 115];

console.log('Testing extraction of 15 product images from PDF...');
productPdfObjs.forEach((obj, idx) => {
  const buf = extractPdfImageByObjNum(obj);
  console.log(`Product ${idx + 1} (PDF Obj ${obj}): ${buf.length} bytes extracted.`);
});

console.log('\nTesting extraction of 10 video thumbnails from PDF...');
videoPdfObjs.forEach((obj, idx) => {
  const buf = extractPdfImageByObjNum(obj);
  console.log(`Video ${idx + 1} (PDF Obj ${obj}): ${buf.length} bytes extracted.`);
});
console.log('\nAll 25 images verified valid JPEG from PDF binary directly!');

import ExcelJS from 'exceljs';
import { ProductItem } from './productService';
import { EnquiryItem, formatEnquiryReference, formatEnquiryDate } from './enquiryService';
import { ProjectItem } from './projectService';
import { BlogItem } from './blogService';
import { GalleryPhotoItem } from './galleryService';
import { VideoItem, getYouTubeThumbnail } from './videoService';
import { MachineDeliveryLocationItem } from './deliveryLocationService';
import { AdminUser } from './authService';
import { getProductImageUrl } from '../utils/imageUrl';

// Helper to convert any image URL to base64 thumbnail for Excel embedding
export const urlToBase64 = async (
  rawUrl: string,
  timeoutMs: number = 3000
): Promise<{ base64: string; extension: 'jpeg' | 'png' } | null> => {
  if (!rawUrl || typeof rawUrl !== 'string') return null;

  const url = getProductImageUrl(rawUrl);

  // If already a base64 data URI
  if (url.startsWith('data:image/')) {
    const isJpeg = url.startsWith('data:image/jpeg') || url.startsWith('data:image/jpg');
    return {
      base64: url,
      extension: isJpeg ? 'jpeg' : 'png'
    };
  }

  return new Promise((resolve) => {
    let resolved = false;
    const timer = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        resolve(null);
      }
    }, timeoutMs);

    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      if (resolved) return;
      resolved = true;
      clearTimeout(timer);
      try {
        const canvas = document.createElement('canvas');
        const maxDim = 180;
        let w = img.naturalWidth || img.width || 120;
        let h = img.naturalHeight || img.height || 90;

        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = Math.round((h * maxDim) / w);
            w = maxDim;
          } else {
            w = Math.round((w * maxDim) / h);
            h = maxDim;
          }
        }

        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(null);
          return;
        }

        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        resolve({
          base64: dataUrl,
          extension: 'jpeg'
        });
      } catch (e) {
        resolve(null);
      }
    };

    img.onerror = () => {
      if (resolved) return;
      resolved = true;
      clearTimeout(timer);
      resolve(null);
    };

    let targetSrc = url;
    if (targetSrc.startsWith('/') && typeof window !== 'undefined') {
      targetSrc = `${window.location.origin}${targetSrc}`;
    }
    img.src = targetSrc;
  });
};

export interface AdminExportData {
  products: ProductItem[];
  enquiries: EnquiryItem[];
  projects: ProjectItem[];
  blogs: BlogItem[];
  galleryPhotos: GalleryPhotoItem[];
  videos: VideoItem[];
  deliveryLocations: MachineDeliveryLocationItem[];
  usersList: AdminUser[];
}

export interface ExportProgressCallback {
  (step: string, percentage: number): void;
}

// Brand theme styles
const HEADER_FILL: ExcelJS.Fill = {
  type: 'pattern',
  pattern: 'solid',
  fgColor: { argb: 'FF001827' } // Jupiter Navy
};

const HEADER_FONT: Partial<ExcelJS.Font> = {
  name: 'Calibri',
  size: 11,
  bold: true,
  color: { argb: 'FFFFFFFF' }
};

const ROW_BORDER: Partial<ExcelJS.Borders> = {
  top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
  left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
  bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
  right: { style: 'thin', color: { argb: 'FFE2E8F0' } }
};

const ZEBRA_FILL: ExcelJS.Fill = {
  type: 'pattern',
  pattern: 'solid',
  fgColor: { argb: 'FFF8FAFC' }
};

export const exportAllAdminDataToExcel = async (
  data: AdminExportData,
  onProgress?: ExportProgressCallback
): Promise<void> => {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Jupiter Industries Admin System';
  workbook.lastModifiedBy = 'Jupiter Admin';
  workbook.created = new Date();
  workbook.modified = new Date();

  // -------------------------------------------------------------------------
  // 1. CUSTOMER ENQUIRIES SHEET (PRIMARY TAB)
  // -------------------------------------------------------------------------
  onProgress?.('Preparing Customer Enquiries...', 15);
  const enqSheet = workbook.addWorksheet('Customer Enquiries', {
    views: [{ state: 'frozen', ySplit: 1 }]
  });

  enqSheet.columns = [
    { header: 'Enquiry ID', key: 'ref', width: 18 },
    { header: 'Internal DB ID', key: 'dbId', width: 28 },
    { header: 'Received Date', key: 'date', width: 22 },
    { header: 'Customer Name', key: 'name', width: 26 },
    { header: 'Phone Number', key: 'phone', width: 20 },
    { header: 'Email Address', key: 'email', width: 28 },
    { header: 'City / Location', key: 'location', width: 24 },
    { header: 'Machine Interested', key: 'product', width: 34 },
    { header: 'Lead Status', key: 'status', width: 16 },
    { header: 'Customer Message / Requirement', key: 'message', width: 45 }
  ];

  enqSheet.getRow(1).height = 28;
  enqSheet.getRow(1).eachCell((cell) => {
    cell.fill = HEADER_FILL;
    cell.font = HEADER_FONT;
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
  });

  const enquiriesList = data.enquiries || [];
  enquiriesList.forEach((enq, i) => {
    const row = enqSheet.addRow({
      ref: formatEnquiryReference(enq, enquiriesList),
      dbId: enq.id || '',
      date: formatEnquiryDate(enq.createdAt || enq.date) || enq.date || '',
      name: enq.name || '',
      phone: enq.phone || '',
      email: enq.email || '',
      location: enq.location || '',
      product: enq.productInterest || enq.product || '',
      status: enq.status || 'New',
      message: enq.message || ''
    });

    row.height = 30;
    row.eachCell((cell, colNum) => {
      cell.border = ROW_BORDER;
      cell.alignment = { vertical: 'middle', wrapText: true };
      if (i % 2 === 1) cell.fill = ZEBRA_FILL;
      if (colNum === 1 || colNum === 9) {
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      }
    });
  });

  // -------------------------------------------------------------------------
  // 2. PRODUCTS CATALOG SHEET (With Embedded Images & Full Specs)
  // -------------------------------------------------------------------------
  onProgress?.('Preparing Products Catalog with photos...', 35);
  const prodSheet = workbook.addWorksheet('Products Catalog', {
    views: [{ state: 'frozen', ySplit: 1 }]
  });

  prodSheet.columns = [
    { header: 'Image Preview', key: 'img', width: 16 },
    { header: 'Product Name', key: 'name', width: 38 },
    { header: 'Category', key: 'category', width: 26 },
    { header: 'Brand / Model Tag', key: 'brandTag', width: 22 },
    { header: 'Capacity', key: 'capacity', width: 26 },
    { header: 'Power Required', key: 'power', width: 22 },
    { header: 'Brick / Block Size', key: 'brickSize', width: 24 },
    { header: 'Status', key: 'status', width: 14 },
    { header: 'Display Order', key: 'order', width: 14 },
    { header: 'Description', key: 'description', width: 45 },
    { header: 'Key Features', key: 'keyFeatures', width: 45 },
    { header: 'Technical Specs', key: 'specs', width: 40 },
    { header: 'Direct Image Link', key: 'imageLink', width: 35 }
  ];

  prodSheet.getRow(1).height = 28;
  prodSheet.getRow(1).eachCell((cell) => {
    cell.fill = HEADER_FILL;
    cell.font = HEADER_FONT;
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
  });

  const productsList = data.products || [];
  for (let i = 0; i < productsList.length; i++) {
    const prod = productsList[i];
    const rowIndex = i + 2;

    const keyFeaturesText = Array.isArray(prod.keyFeatures)
      ? prod.keyFeatures.join('\n• ')
      : '';

    let specsText = '';
    if (prod.specs && typeof prod.specs === 'object') {
      specsText = Object.entries(prod.specs)
        .map(([k, v]) => `${k}: ${v}`)
        .join('\n');
    }

    const row = prodSheet.addRow({
      img: '',
      name: prod.name || '',
      category: prod.category || '',
      brandTag: prod.brandTag || '',
      capacity: prod.capacity || '',
      power: prod.power || '',
      brickSize: prod.brickSize || '',
      status: prod.status || 'Active',
      order: prod.order ?? i + 1,
      description: prod.description || '',
      keyFeatures: keyFeaturesText ? `• ${keyFeaturesText}` : '',
      specs: specsText,
      imageLink: prod.image || ''
    });

    row.height = 70;
    row.eachCell((cell, colNum) => {
      cell.border = ROW_BORDER;
      cell.alignment = { vertical: 'middle', wrapText: true };
      if (i % 2 === 1) cell.fill = ZEBRA_FILL;
      if (colNum === 8) {
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      }
    });

    if (prod.image) {
      const imgUrl = getProductImageUrl(prod.image);
      const linkCell = row.getCell('imageLink');
      linkCell.value = {
        text: 'View Image',
        hyperlink: imgUrl
      };
      linkCell.font = { color: { argb: 'FF0D6EFD' }, underline: true };

      try {
        const imgData = await urlToBase64(prod.image, 2500);
        if (imgData) {
          const imageId = workbook.addImage({
            base64: imgData.base64,
            extension: imgData.extension
          });
          prodSheet.addImage(imageId, {
            tl: { col: 0.1, row: rowIndex - 1 + 0.1 },
            ext: { width: 85, height: 60 },
            editAs: 'oneCell'
          });
        }
      } catch (err) {}
    }
  }

  // -------------------------------------------------------------------------
  // 3. MACHINERY VIDEOS SHEET (With Embedded Thumbnails & Links)
  // -------------------------------------------------------------------------
  onProgress?.('Preparing Machinery Videos & Demonstrations...', 50);
  const videoSheet = workbook.addWorksheet('Machinery Videos', {
    views: [{ state: 'frozen', ySplit: 1 }]
  });

  videoSheet.columns = [
    { header: 'Thumbnail', key: 'thumb', width: 16 },
    { header: 'Video Title', key: 'title', width: 40 },
    { header: 'Category', key: 'category', width: 24 },
    { header: 'YouTube Watch Link', key: 'videoUrl', width: 45 },
    { header: 'Duration', key: 'duration', width: 16 },
    { header: 'Views', key: 'views', width: 16 },
    { header: 'Description', key: 'description', width: 40 }
  ];

  videoSheet.getRow(1).height = 28;
  videoSheet.getRow(1).eachCell((cell) => {
    cell.fill = HEADER_FILL;
    cell.font = HEADER_FONT;
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
  });

  const videosList = data.videos || [];
  for (let i = 0; i < videosList.length; i++) {
    const vid = videosList[i];
    const rowIndex = i + 2;

    const row = videoSheet.addRow({
      thumb: '',
      title: vid.title || '',
      category: vid.category || '',
      videoUrl: vid.videoUrl || '',
      duration: vid.duration || '',
      views: vid.views || '',
      description: vid.description || ''
    });

    row.height = 65;
    row.eachCell((cell) => {
      cell.border = ROW_BORDER;
      cell.alignment = { vertical: 'middle' };
      if (i % 2 === 1) cell.fill = ZEBRA_FILL;
    });

    if (vid.videoUrl) {
      const linkCell = row.getCell('videoUrl');
      linkCell.value = { text: vid.videoUrl, hyperlink: vid.videoUrl };
      linkCell.font = { color: { argb: 'FF0D6EFD' }, underline: true };
    }

    const thumbUrl = vid.image || getYouTubeThumbnail(vid.videoUrl);
    if (thumbUrl) {
      try {
        const imgData = await urlToBase64(thumbUrl, 2500);
        if (imgData) {
          const imageId = workbook.addImage({
            base64: imgData.base64,
            extension: imgData.extension
          });
          videoSheet.addImage(imageId, {
            tl: { col: 0.1, row: rowIndex - 1 + 0.1 },
            ext: { width: 85, height: 55 },
            editAs: 'oneCell'
          });
        }
      } catch (err) {}
    }
  }

  // -------------------------------------------------------------------------
  // 3. PROJECTS & INSTALLATIONS SHEET (With Embedded Images)
  // -------------------------------------------------------------------------
  onProgress?.('Adding Projects & Plant Installations...', 55);
  const projSheet = workbook.addWorksheet('Projects & Installations', {
    views: [{ state: 'frozen', ySplit: 1 }]
  });

  projSheet.columns = [
    { header: 'Site Photo', key: 'img', width: 16 },
    { header: 'Project / Machine Title', key: 'title', width: 36 },
    { header: 'Client / Company Name', key: 'client', width: 28 },
    { header: 'Installation Location', key: 'location', width: 24 },
    { header: 'Machine Type', key: 'machine', width: 28 },
    { header: 'Year', key: 'year', width: 14 },
    { header: 'Status', key: 'status', width: 16 },
    { header: 'Capacity', key: 'capacity', width: 22 },
    { header: 'Project Description', key: 'description', width: 45 },
    { header: 'Site Photo Link', key: 'imageLink', width: 35 }
  ];

  projSheet.getRow(1).height = 28;
  projSheet.getRow(1).eachCell((cell) => {
    cell.fill = HEADER_FILL;
    cell.font = HEADER_FONT;
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
  });

  const projectsList = data.projects || [];
  for (let i = 0; i < projectsList.length; i++) {
    const proj = projectsList[i];
    const rowIndex = i + 2;

    const row = projSheet.addRow({
      img: '',
      title: proj.title || '',
      client: proj.client || '',
      location: proj.location || '',
      machine: proj.machine || '',
      year: proj.year || '',
      status: proj.status || 'Completed',
      capacity: proj.capacity || '',
      description: proj.description || '',
      imageLink: proj.image || ''
    });

    row.height = 70;
    row.eachCell((cell) => {
      cell.border = ROW_BORDER;
      cell.alignment = { vertical: 'middle', wrapText: true };
      if (i % 2 === 1) cell.fill = ZEBRA_FILL;
    });

    if (proj.image) {
      const imgUrl = getProductImageUrl(proj.image);
      const linkCell = row.getCell('imageLink');
      linkCell.value = { text: 'View Photo', hyperlink: imgUrl };
      linkCell.font = { color: { argb: 'FF0D6EFD' }, underline: true };

      try {
        const imgData = await urlToBase64(proj.image, 2500);
        if (imgData) {
          const imageId = workbook.addImage({
            base64: imgData.base64,
            extension: imgData.extension
          });
          projSheet.addImage(imageId, {
            tl: { col: 0.1, row: rowIndex - 1 + 0.1 },
            ext: { width: 85, height: 60 },
            editAs: 'oneCell'
          });
        }
      } catch (err) {}
    }
  }

  // -------------------------------------------------------------------------
  // 4. BLOGS & TECHNICAL GUIDES SHEET
  // -------------------------------------------------------------------------
  onProgress?.('Adding Blogs & Technical Articles...', 70);
  const blogSheet = workbook.addWorksheet('Blogs & Guides', {
    views: [{ state: 'frozen', ySplit: 1 }]
  });

  blogSheet.columns = [
    { header: 'Cover Photo', key: 'img', width: 16 },
    { header: 'Article Title', key: 'title', width: 38 },
    { header: 'Category', key: 'category', width: 22 },
    { header: 'Author', key: 'author', width: 20 },
    { header: 'Publish Date', key: 'date', width: 18 },
    { header: 'Read Time', key: 'readTime', width: 16 },
    { header: 'Views', key: 'views', width: 14 },
    { header: 'Excerpt / Summary', key: 'excerpt', width: 45 },
    { header: 'Cover Photo Link', key: 'imageLink', width: 35 }
  ];

  blogSheet.getRow(1).height = 28;
  blogSheet.getRow(1).eachCell((cell) => {
    cell.fill = HEADER_FILL;
    cell.font = HEADER_FONT;
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
  });

  const blogsList = data.blogs || [];
  for (let i = 0; i < blogsList.length; i++) {
    const blog = blogsList[i];
    const rowIndex = i + 2;

    const row = blogSheet.addRow({
      img: '',
      title: blog.title || '',
      category: blog.category || '',
      author: blog.author || '',
      date: blog.date || '',
      readTime: blog.readTime || '',
      views: blog.views ?? 0,
      excerpt: blog.excerpt || '',
      imageLink: blog.image || ''
    });

    row.height = 70;
    row.eachCell((cell) => {
      cell.border = ROW_BORDER;
      cell.alignment = { vertical: 'middle', wrapText: true };
      if (i % 2 === 1) cell.fill = ZEBRA_FILL;
    });

    if (blog.image) {
      const imgUrl = getProductImageUrl(blog.image);
      const linkCell = row.getCell('imageLink');
      linkCell.value = { text: 'View Cover', hyperlink: imgUrl };
      linkCell.font = { color: { argb: 'FF0D6EFD' }, underline: true };

      try {
        const imgData = await urlToBase64(blog.image, 2500);
        if (imgData) {
          const imageId = workbook.addImage({
            base64: imgData.base64,
            extension: imgData.extension
          });
          blogSheet.addImage(imageId, {
            tl: { col: 0.1, row: rowIndex - 1 + 0.1 },
            ext: { width: 85, height: 60 },
            editAs: 'oneCell'
          });
        }
      } catch (err) {}
    }
  }

  // -------------------------------------------------------------------------
  // 5. GALLERY PHOTOS SHEET (With Embedded Images)
  // -------------------------------------------------------------------------
  onProgress?.('Adding Factory & Machinery Gallery...', 80);
  const gallerySheet = workbook.addWorksheet('Factory Gallery', {
    views: [{ state: 'frozen', ySplit: 1 }]
  });

  gallerySheet.columns = [
    { header: 'Photo', key: 'img', width: 16 },
    { header: 'Photo Title', key: 'title', width: 34 },
    { header: 'Category', key: 'category', width: 24 },
    { header: 'Location / Plant', key: 'location', width: 24 },
    { header: 'Machine', key: 'machine', width: 26 },
    { header: 'Output Specification', key: 'output', width: 24 },
    { header: 'Description', key: 'description', width: 38 },
    { header: 'Photo Link', key: 'imageLink', width: 35 }
  ];

  gallerySheet.getRow(1).height = 28;
  gallerySheet.getRow(1).eachCell((cell) => {
    cell.fill = HEADER_FILL;
    cell.font = HEADER_FONT;
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
  });

  const galleryList = data.galleryPhotos || [];
  for (let i = 0; i < galleryList.length; i++) {
    const photo = galleryList[i];
    const rowIndex = i + 2;

    const row = gallerySheet.addRow({
      img: '',
      title: photo.title || '',
      category: photo.category || '',
      location: photo.location || '',
      machine: photo.machine || '',
      output: photo.output || '',
      description: photo.description || '',
      imageLink: photo.image || ''
    });

    row.height = 70;
    row.eachCell((cell) => {
      cell.border = ROW_BORDER;
      cell.alignment = { vertical: 'middle', wrapText: true };
      if (i % 2 === 1) cell.fill = ZEBRA_FILL;
    });

    if (photo.image) {
      const imgUrl = getProductImageUrl(photo.image);
      const linkCell = row.getCell('imageLink');
      linkCell.value = { text: 'View Photo', hyperlink: imgUrl };
      linkCell.font = { color: { argb: 'FF0D6EFD' }, underline: true };

      try {
        const imgData = await urlToBase64(photo.image, 2500);
        if (imgData) {
          const imageId = workbook.addImage({
            base64: imgData.base64,
            extension: imgData.extension
          });
          gallerySheet.addImage(imageId, {
            tl: { col: 0.1, row: rowIndex - 1 + 0.1 },
            ext: { width: 85, height: 60 },
            editAs: 'oneCell'
          });
        }
      } catch (err) {}
    }
  }



  // -------------------------------------------------------------------------
  // 7. MACHINE DELIVERY LOCATIONS SHEET
  // -------------------------------------------------------------------------
  onProgress?.('Adding Machine Delivery Locations...', 95);
  const locSheet = workbook.addWorksheet('Delivery Locations', {
    views: [{ state: 'frozen', ySplit: 1 }]
  });

  locSheet.columns = [
    { header: 'State', key: 'state', width: 22 },
    { header: 'District / City', key: 'locationCity', width: 24 },
    { header: 'Machine Model Delivered', key: 'machineModel', width: 32 },
    { header: 'Client / Site Name', key: 'clientName', width: 28 },
    { header: 'Delivery Date', key: 'deliveryDate', width: 20 },
    { header: 'Status', key: 'status', width: 22 },
    { header: 'Transport Vehicle', key: 'transportVehicle', width: 22 },
    { header: 'Contact Phone', key: 'contactPhone', width: 20 },
    { header: 'Notes', key: 'notes', width: 35 }
  ];

  locSheet.getRow(1).height = 28;
  locSheet.getRow(1).eachCell((cell) => {
    cell.fill = HEADER_FILL;
    cell.font = HEADER_FONT;
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
  });

  const locsList = data.deliveryLocations || [];
  locsList.forEach((loc, i) => {
    const row = locSheet.addRow({
      state: loc.state || '',
      locationCity: loc.locationCity || '',
      machineModel: loc.machineModel || '',
      clientName: loc.clientName || '',
      deliveryDate: loc.deliveryDate || '',
      status: loc.status || '',
      transportVehicle: loc.transportVehicle || '',
      contactPhone: loc.contactPhone || '',
      notes: loc.notes || ''
    });

    row.height = 26;
    row.eachCell((cell) => {
      cell.border = ROW_BORDER;
      cell.alignment = { vertical: 'middle' };
      if (i % 2 === 1) cell.fill = ZEBRA_FILL;
    });
  });

  // -------------------------------------------------------------------------
  // 8. ADMIN USERS SHEET
  // -------------------------------------------------------------------------
  const usersSheet = workbook.addWorksheet('Admin Staff & Users', {
    views: [{ state: 'frozen', ySplit: 1 }]
  });

  usersSheet.columns = [
    { header: 'Full Name', key: 'name', width: 28 },
    { header: 'Email Address', key: 'email', width: 32 },
    { header: 'Role / Designation', key: 'role', width: 20 },
    { header: 'Account Status', key: 'status', width: 16 }
  ];

  usersSheet.getRow(1).height = 28;
  usersSheet.getRow(1).eachCell((cell) => {
    cell.fill = HEADER_FILL;
    cell.font = HEADER_FONT;
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
  });

  const usersList = data.usersList || [];
  usersList.forEach((user, i) => {
    const row = usersSheet.addRow({
      name: user.name || '',
      email: user.email || '',
      role: user.role || 'Admin',
      status: (user as any).status || 'Active'
    });

    row.height = 26;
    row.eachCell((cell) => {
      cell.border = ROW_BORDER;
      cell.alignment = { vertical: 'middle' };
      if (i % 2 === 1) cell.fill = ZEBRA_FILL;
    });
  });

  // -------------------------------------------------------------------------
  // FINALIZE & TRIGGER INSTANT 1-CLICK BROWSER DOWNLOAD
  // -------------------------------------------------------------------------
  onProgress?.('Generating Excel file package...', 99);
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  });

  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10);
  const filename = `Jupiter_Industries_Admin_Data_${dateStr}.xlsx`;

  const downloadUrl = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(downloadUrl);

  onProgress?.('Complete!', 100);
};

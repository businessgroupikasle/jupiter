import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Request, Response, NextFunction } from 'express';

export const uploadsDir = path.join(process.cwd(), 'uploads');
export const productUploadsDir = path.join(uploadsDir, 'products');

/**
 * Ensures the uploads and uploads/products directories exist.
 */
export const ensureUploadDirectories = (): void => {
  try {
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    if (!fs.existsSync(productUploadsDir)) {
      fs.mkdirSync(productUploadsDir, { recursive: true });
    }
  } catch (err) {
    console.error('[Upload] Error ensuring directories:', err);
  }
};

// Ensure directories exist on module load
ensureUploadDirectories();

/**
 * Disk storage engine for product images:
 * - Stored in <cwd>/uploads/products
 * - Filename sanitized with unique timestamp suffix
 * - Always saves as /uploads/products/filename.ext
 */
const productStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    ensureUploadDirectories();
    cb(null, productUploadsDir);
  },
  filename: (_req, file, cb) => {
    let ext = path.extname(file.originalname).toLowerCase();
    if (!ext) {
      if (file.mimetype === 'image/png') ext = '.png';
      else if (file.mimetype === 'image/webp') ext = '.webp';
      else ext = '.jpg';
    }
    const safeBase = path
      .basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9_-]/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 40) || 'product';
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${safeBase}-${uniqueSuffix}${ext}`);
  },
});

/**
 * File filter to accept jpg, jpeg, png, webp only.
 */
const imageFileFilter = (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMime = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const allowedExts = /\.(jpg|jpeg|png|webp)$/i;
  const ext = path.extname(file.originalname).toLowerCase();
  const mime = (file.mimetype || '').toLowerCase();

  const isMimeOk = allowedMime.includes(mime);
  const isExtOk = allowedExts.test(ext);

  if ((isMimeOk || mime === 'application/octet-stream') && isExtOk) {
    cb(null, true);
  } else if (isMimeOk && !ext) {
    cb(null, true);
  } else {
    cb(new Error('Only JPG, JPEG, PNG, and WEBP image files are allowed.'));
  }
};

/**
 * Primary multer instance for product image uploads
 * Limits to 20MB per file, up to 10 files
 */
export const productUpload = multer({
  storage: productStorage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20 MB limit per file
    files: 10,
  },
});

/**
 * Standard 'upload' export supporting upload.array('images', 10)
 */
export const upload = productUpload;

/**
 * Dedicated upload.array('images', 10) middleware
 */
export const uploadProductImagesArray = productUpload.array('images', 10);

/**
 * Helper to safely extract all uploaded files across array or fields
 */
export const getUploadedFiles = (req: Request): Express.Multer.File[] => {
  if (Array.isArray(req.files)) {
    return req.files;
  }
  if (req.files && typeof req.files === 'object') {
    const filesMap = req.files as Record<string, Express.Multer.File[]>;
    const list: Express.Multer.File[] = [];
    if (Array.isArray(filesMap.images)) list.push(...filesMap.images);
    if (Array.isArray(filesMap.image)) list.push(...filesMap.image);
    return list;
  }
  if (req.file) {
    return [req.file];
  }
  return [];
};

/**
 * Middleware supporting multiple image uploads with field name 'images' (up to 10)
 * Also accepts 'image' for backwards compatibility.
 */
const productImagesFieldsMiddleware = productUpload.fields([
  { name: 'images', maxCount: 10 },
  { name: 'image', maxCount: 10 },
]);

export const uploadProductImagesSingle = (req: Request, res: Response, next: NextFunction): void => {
  productImagesFieldsMiddleware(req, res, (err: any) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        res.status(400).json({ success: false, message: `Upload error: ${err.message}` });
        return;
      }
      res.status(400).json({ success: false, message: err.message || 'Image upload failed' });
      return;
    }
    next();
  });
};

/**
 * Middleware for product create / update routes:
 * Handles multipart/form-data when 'images' files are attached,
 * or allows regular JSON requests to pass through uninterrupted.
 */
export const uploadProductImagesOptional = (req: Request, res: Response, next: NextFunction): void => {
  if (req.files || req.file) {
    next();
    return;
  }
  const contentType = (req.headers['content-type'] || '').toLowerCase();
  if (contentType.includes('multipart/form-data')) {
    productImagesFieldsMiddleware(req, res, (err: any) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          res.status(400).json({ success: false, message: `Upload error: ${err.message}` });
          return;
        }
        res.status(400).json({ success: false, message: err.message || 'Image upload failed' });
        return;
      }
      
      if (!req.file && req.files && typeof req.files === 'object') {
        const filesMap = req.files as Record<string, Express.Multer.File[]>;
        if (filesMap.image && filesMap.image[0]) req.file = filesMap.image[0];
        else if (filesMap.images && filesMap.images[0]) req.file = filesMap.images[0];
      }

      next();
    });
  } else {
    next();
  }
};

// Aliases for backwards compatibility
export const uploadProductImageOptional = uploadProductImagesOptional;
export const uploadProductImageSingle = uploadProductImagesSingle;

/**
 * CSV Upload configuration for bulk import (accepts field name: 'file' or 'csv')
 */
const csvFileFilter = (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const isCsvExt = /\.csv$/i.test(file.originalname);
  const isCsvMime =
    file.mimetype.includes('csv') ||
    file.mimetype === 'text/plain' ||
    file.mimetype === 'application/vnd.ms-excel' ||
    file.mimetype === 'application/octet-stream' ||
    file.mimetype === 'text/comma-separated-values' ||
    file.mimetype === 'application/csv';

  if (isCsvExt && isCsvMime) {
    cb(null, true);
  } else if (isCsvExt) {
    cb(null, true);
  } else {
    cb(new Error('Only CSV files (.csv) are allowed for bulk product import.'));
  }
};

export const csvUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter: csvFileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit for CSV
  },
});

export const uploadCsvFile = (req: Request, res: Response, next: NextFunction): void => {
  const contentType = (req.headers['content-type'] || '').toLowerCase();
  if (!contentType.includes('multipart/form-data')) {
    // Pass through non-multipart requests (e.g. JSON with { csv: "..." } or raw string)
    next();
    return;
  }

  csvUpload.fields([
    { name: 'file', maxCount: 1 },
    { name: 'csv', maxCount: 1 },
  ])(req, res, (err: any) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          res.status(400).json({ success: false, message: 'CSV file too large. Maximum allowed size is 10MB.' });
          return;
        }
        res.status(400).json({ success: false, message: `CSV upload error: ${err.message}` });
        return;
      }
      res.status(400).json({ success: false, message: err.message || 'CSV upload failed' });
      return;
    }

    if (!req.file && req.files && typeof req.files === 'object') {
      const filesMap = req.files as Record<string, Express.Multer.File[]>;
      if (filesMap.file && filesMap.file[0]) req.file = filesMap.file[0];
      else if (filesMap.csv && filesMap.csv[0]) req.file = filesMap.csv[0];
    }

    next();
  });
};

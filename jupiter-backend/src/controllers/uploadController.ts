import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

const uploadsDir = path.join(process.cwd(), 'uploads');
const ensureUploadsDir = (): void => {
  try {
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
  } catch (err) {
    console.error('[Upload] Failed creating uploads directory:', err);
  }
};
ensureUploadsDir();

// POST /api/upload
export const handleUpload = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    ensureUploadsDir();

    const { image, data, file, filename, url } = req.body;
    const base64Data = image || data || file;

    // If client supplied an existing image URL, return it
    if (!base64Data && url && typeof url === 'string') {
      res.status(200).json({
        success: true,
        message: 'File URL registered successfully',
        url,
        filename: path.basename(url),
        size: 0,
      });
      return;
    }

    if (!base64Data || typeof base64Data !== 'string') {
      res.status(400).json({
        success: false,
        message: 'Image base64 data is required for upload',
      });
      return;
    }

    const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let ext = 'jpg';
    let buffer: Buffer;

    if (matches && matches.length === 3) {
      const mime = matches[1];
      if (mime.includes('png')) ext = 'png';
      else if (mime.includes('webp')) ext = 'webp';
      else if (mime.includes('svg')) ext = 'svg';
      else ext = 'jpg';

      buffer = Buffer.from(matches[2], 'base64');
    } else {
      buffer = Buffer.from(base64Data, 'base64');
    }

    const safeFilename = filename ? path.basename(filename).replace(/[^a-zA-Z0-9._-]/g, '') : `upload_${Date.now()}.${ext}`;
    const targetName = safeFilename.includes('.') ? safeFilename : `${safeFilename}.${ext}`;
    const filePath = path.join(uploadsDir, targetName);

    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${targetName}`;
    res.status(201).json({
      success: true,
      message: 'File uploaded successfully',
      url: publicUrl,
      filename: targetName,
      size: buffer.length,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/upload & GET /api/uploads
export const listUploads = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    ensureUploadsDir();
    if (!fs.existsSync(uploadsDir)) {
      res.status(200).json({ success: true, count: 0, data: [] });
      return;
    }

    const files = fs.readdirSync(uploadsDir);
    const list = files.map((file) => {
      try {
        const stat = fs.statSync(path.join(uploadsDir, file));
        return {
          filename: file,
          url: `/uploads/${file}`,
          size: stat.size,
          createdAt: stat.birthtime,
        };
      } catch {
        return {
          filename: file,
          url: `/uploads/${file}`,
          size: 0,
          createdAt: new Date(),
        };
      }
    });

    res.status(200).json({ success: true, count: list.length, data: list });
  } catch (error) {
    console.error('[Upload] listUploads error:', error);
    res.status(200).json({ success: true, count: 0, data: [] });
  }
};

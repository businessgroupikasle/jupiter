import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
const uploadsDir = path.join(process.cwd(), 'uploads');
const productsUploadsDir = path.join(uploadsDir, 'products');

export const getMediaById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : (req.params.id as string);
    const media = await prisma.media.findUnique({
      where: { id },
    });

    if (!media) {
      res.status(404).json({ success: false, message: 'Media not found in database' });
      return;
    }

    res.setHeader('Content-Type', media.mimeType || 'image/jpeg');
    res.setHeader('Content-Length', media.size);
    res.setHeader('Cache-Control', 'public, max-age=86400, immutable');
    res.setHeader('ETag', `"${media.id}"`);
    res.end(Buffer.from(media.data));
  } catch (error) {
    next(error);
  }
};

export const getMediaByFilename = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const filename = Array.isArray(req.params.filename) ? req.params.filename[0] : (req.params.filename as string);
    const media = await prisma.media.findFirst({
      where: { filename },
    });

    if (!media) {
      res.status(404).json({ success: false, message: 'Media file not found' });
      return;
    }

    res.setHeader('Content-Type', media.mimeType || 'image/jpeg');
    res.setHeader('Content-Length', media.size);
    res.setHeader('Cache-Control', 'public, max-age=86400, immutable');
    res.setHeader('ETag', `"${media.id}"`);
    res.end(Buffer.from(media.data));
  } catch (error) {
    next(error);
  }
};

export const listAllMedia = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const all = await prisma.media.findMany({
      select: {
        id: true,
        filename: true,
        mimeType: true,
        size: true,
        url: true,
        productId: true,
        videoId: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({ success: true, count: all.length, data: all });
  } catch (error) {
    next(error);
  }
};

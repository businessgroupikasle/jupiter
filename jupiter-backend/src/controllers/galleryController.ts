import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getGalleryPhotos = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const photos = await (prisma as any).galleryPhoto.findMany({ orderBy: { createdAt: 'desc' } });
    res.status(200).json({ success: true, count: photos.length, data: photos });
  } catch (error) {
    next(error);
  }
};

export const createGalleryPhoto = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, category, location, machine, output, image, description } = req.body;

    const photo = await (prisma as any).galleryPhoto.create({
      data: {
        title: title || 'Manufacturing Machinery Photo',
        category: category || 'Manufacturing Plants',
        location: location || 'Coimbatore, Tamil Nadu',
        machine: machine || 'Jupiter Heavy Engineering',
        output: output || 'Commercial Grade',
        image: image || '/images/machinery-default.jpg',
        description: description || '',
      },
    });

    res.status(201).json({ success: true, message: 'Gallery photo saved successfully', data: photo });
  } catch (error) {
    next(error);
  }
};

export const updateGalleryPhoto = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const allowed = ['title', 'category', 'location', 'machine', 'output', 'image', 'description'];
    const updateData: any = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) {
        updateData[key] = req.body[key];
      }
    }

    const titleToMatch = req.body.title ? String(req.body.title).trim() : '';
    const existing = await (prisma as any).galleryPhoto.findFirst({
      where: {
        OR: [
          { id },
          ...(titleToMatch ? [{ title: { equals: titleToMatch, mode: 'insensitive' as const } }] : []),
        ],
      },
    });

    let photo;
    if (existing) {
      photo = await (prisma as any).galleryPhoto.update({
        where: { id: existing.id },
        data: updateData,
      });
    } else {
      photo = await (prisma as any).galleryPhoto.create({
        data: {
          title: req.body.title || 'Manufacturing Machinery Photo',
          category: req.body.category || 'Manufacturing Plants',
          location: req.body.location || 'Coimbatore, Tamil Nadu',
          machine: req.body.machine || 'Jupiter Heavy Engineering',
          output: req.body.output || 'Commercial Grade',
          image: req.body.image || '/images/machinery-default.jpg',
          description: req.body.description || '',
        },
      });
    }

    res.status(200).json({ success: true, message: 'Gallery photo updated successfully', data: photo });
  } catch (error) {
    next(error);
  }
};

export const deleteGalleryPhoto = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    await (prisma as any).galleryPhoto.deleteMany({ where: { id } });
    res.status(200).json({ success: true, message: 'Gallery photo deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const clearAllGalleryPhotos = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await (prisma as any).galleryPhoto.deleteMany({});
    res.status(200).json({ success: true, message: 'All gallery photos cleared successfully' });
  } catch (error) {
    next(error);
  }
};

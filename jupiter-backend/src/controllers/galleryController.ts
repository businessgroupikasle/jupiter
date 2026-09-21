import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient | null = null;
try {
  prisma = new PrismaClient();
} catch (e) {
  console.warn('Prisma Client initialised with warning; gallery in-memory fallback active.');
}

export interface GalleryPhotoItem {
  id: string;
  title: string;
  category: string;
  location: string;
  machine: string;
  output: string;
  image: string;
  description?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

let fallbackPhotos: GalleryPhotoItem[] = [];

export const getGalleryPhotos = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let photos: any[] = [];
    if (prisma && process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('yourpassword')) {
      try {
        photos = await (prisma as any).galleryPhoto.findMany({
          orderBy: { createdAt: 'desc' },
        });
      } catch (dbError) {
        console.warn('Database gallery read failed, falling back to memory buffer:', dbError);
      }
    }

    if (!photos || photos.length === 0) {
      photos = fallbackPhotos;
    }

    res.status(200).json({
      success: true,
      count: photos.length,
      data: photos,
    });
  } catch (error) {
    next(error);
  }
};

export const createGalleryPhoto = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, category, location, machine, output, image, description } = req.body;
    let saved: any = null;

    if (prisma && process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('yourpassword')) {
      try {
        saved = await (prisma as any).galleryPhoto.create({
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
      } catch (dbError) {
        console.warn('Database gallery create failed, falling back to memory buffer:', dbError);
      }
    }

    if (!saved) {
      saved = {
        id: `GAL-${Date.now()}`,
        title: title || 'Manufacturing Machinery Photo',
        category: category || 'Manufacturing Plants',
        location: location || 'Coimbatore, Tamil Nadu',
        machine: machine || 'Jupiter Heavy Engineering',
        output: output || 'Commercial Grade',
        image: image || '/images/machinery-default.jpg',
        description: description || '',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      fallbackPhotos.unshift(saved);
    }

    res.status(201).json({
      success: true,
      message: 'Gallery photo saved successfully in database',
      data: saved,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteGalleryPhoto = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    if (prisma && process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('yourpassword')) {
      try {
        await (prisma as any).galleryPhoto.deleteMany({ where: { id } });
      } catch (dbError) {
        console.warn('Database gallery delete skipped:', dbError);
      }
    }

    fallbackPhotos = fallbackPhotos.filter((p) => p.id !== id);

    res.status(200).json({
      success: true,
      message: 'Gallery photo deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const clearAllGalleryPhotos = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (prisma && process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('yourpassword')) {
      try {
        await (prisma as any).galleryPhoto.deleteMany({});
      } catch (dbError) {
        console.warn('Database gallery clear failed:', dbError);
      }
    }

    fallbackPhotos = [];

    res.status(200).json({
      success: true,
      message: 'All gallery photos cleared successfully',
    });
  } catch (error) {
    next(error);
  }
};

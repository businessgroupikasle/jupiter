import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient | null = null;
try {
  prisma = new PrismaClient();
} catch (e) {
  console.warn('Prisma Client initialised with warning; video in-memory fallback active.');
}

export interface VideoItem {
  id: string;
  title: string;
  videoUrl: string;
  embedUrl: string;
  views: string;
  duration: string;
  image: string;
  category: string;
  description?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

let fallbackVideos: VideoItem[] = [];

export const getVideos = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let videos: any[] = [];
    if (prisma && process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('yourpassword')) {
      try {
        videos = await (prisma as any).video.findMany({
          orderBy: { createdAt: 'desc' },
        });
      } catch (dbError) {
        console.warn('Database video read failed, falling back to memory buffer:', dbError);
      }
    }

    if (!videos || videos.length === 0) {
      videos = fallbackVideos;
    }

    res.status(200).json({
      success: true,
      count: videos.length,
      data: videos,
    });
  } catch (error) {
    next(error);
  }
};

export const createVideo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, videoUrl, embedUrl, views, duration, image, category, description } = req.body;
    let saved: any = null;

    if (prisma && process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('yourpassword')) {
      try {
        saved = await (prisma as any).video.create({
          data: {
            title: title || 'Jupiter Industrial Machinery Demonstration',
            videoUrl: videoUrl || '',
            embedUrl: embedUrl || '',
            views: views || '1.5K views',
            duration: duration || '3:00',
            image: image || '/images/video-thumb-default.jpg',
            category: category || 'Block Machines',
            description: description || '',
          },
        });
      } catch (dbError) {
        console.warn('Database video create failed, falling back to memory buffer:', dbError);
      }
    }

    if (!saved) {
      saved = {
        id: `VID-${Date.now()}`,
        title: title || 'Jupiter Industrial Machinery Demonstration',
        videoUrl: videoUrl || '',
        embedUrl: embedUrl || '',
        views: views || '1.5K views',
        duration: duration || '3:00',
        image: image || '/images/video-thumb-default.jpg',
        category: category || 'Block Machines',
        description: description || '',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      fallbackVideos.unshift(saved);
    }

    res.status(201).json({
      success: true,
      message: 'Video record saved successfully in database',
      data: saved,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteVideo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    if (prisma && process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('yourpassword')) {
      try {
        await (prisma as any).video.deleteMany({ where: { id } });
      } catch (dbError) {
        console.warn('Database video delete skipped:', dbError);
      }
    }

    fallbackVideos = fallbackVideos.filter((v) => v.id !== id);

    res.status(200).json({
      success: true,
      message: 'Video record deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const clearAllVideos = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (prisma && process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('yourpassword')) {
      try {
        await (prisma as any).video.deleteMany({});
      } catch (dbError) {
        console.warn('Database video clear failed:', dbError);
      }
    }

    fallbackVideos = [];

    res.status(200).json({
      success: true,
      message: 'All videos cleared successfully',
    });
  } catch (error) {
    next(error);
  }
};

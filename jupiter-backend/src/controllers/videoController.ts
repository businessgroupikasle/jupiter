import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getVideos = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const videos = await (prisma as any).video.findMany({ orderBy: { createdAt: 'desc' } });
    res.status(200).json({ success: true, count: videos.length, data: videos });
  } catch (error) {
    next(error);
  }
};

export const createVideo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, videoUrl, embedUrl, views, duration, image, category, description } = req.body;

    const video = await (prisma as any).video.create({
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

    res.status(201).json({ success: true, message: 'Video saved successfully', data: video });
  } catch (error) {
    next(error);
  }
};

export const deleteVideo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    await (prisma as any).video.deleteMany({ where: { id } });
    res.status(200).json({ success: true, message: 'Video deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const clearAllVideos = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await (prisma as any).video.deleteMany({});
    res.status(200).json({ success: true, message: 'All videos cleared successfully' });
  } catch (error) {
    next(error);
  }
};

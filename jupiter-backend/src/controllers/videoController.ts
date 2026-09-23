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

export const updateVideo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const allowed = ['title', 'videoUrl', 'embedUrl', 'views', 'duration', 'image', 'category', 'description'];
    const updateData: any = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) {
        updateData[key] = req.body[key];
      }
    }

    const titleToMatch = req.body.title ? String(req.body.title).trim() : '';
    const existing = await (prisma as any).video.findFirst({
      where: {
        OR: [
          { id },
          ...(titleToMatch ? [{ title: { equals: titleToMatch, mode: 'insensitive' as const } }] : []),
        ],
      },
    });

    let video;
    if (existing) {
      video = await (prisma as any).video.update({
        where: { id: existing.id },
        data: updateData,
      });
    } else {
      video = await (prisma as any).video.create({
        data: {
          title: req.body.title || 'Jupiter Industrial Machinery Demonstration',
          videoUrl: req.body.videoUrl || '',
          embedUrl: req.body.embedUrl || '',
          views: req.body.views || '1.5K views',
          duration: req.body.duration || '3:00',
          image: req.body.image || '/images/video-thumb-default.jpg',
          category: req.body.category || 'Block Machines',
          description: req.body.description || '',
        },
      });
    }

    res.status(200).json({ success: true, message: 'Video updated successfully', data: video });
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

import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDashboardStats = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const [enquiries, products, projects, blogs, gallery, reviews, deliveryLocations] = await Promise.all([
      prisma.enquiry.count(),
      prisma.product.count(),
      prisma.project.count(),
      prisma.blog.count(),
      prisma.galleryPhoto.count(),
      (prisma as any).review.count(),
      (prisma as any).deliveryLocation.count(),
    ]);

    res.status(200).json({
      success: true,
      data: { enquiries, products, projects, blogs, gallery, reviews, deliveryLocations },
    });
  } catch (error) {
    next(error);
  }
};

import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDashboardStats = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const [enquiries, products, projects, blogs, gallery, videos, faqs, deliveryLocations, users, reviews] = await Promise.all([
      prisma.enquiry.count().catch(() => 0),
      prisma.product.count().catch(() => 0),
      prisma.project.count().catch(() => 0),
      prisma.blog.count().catch(() => 0),
      prisma.galleryPhoto.count().catch(() => 0),
      prisma.video.count().catch(() => 0),
      (prisma as any).faq.count().catch(() => 0),
      (prisma as any).deliveryLocation.count().catch(() => 0),
      (prisma as any).user.count().catch(() => 0),
      (prisma as any).review.count().catch(() => 0),
    ]);

    res.status(200).json({
      success: true,
      data: {
        enquiries,
        products,
        projects,
        blogs,
        gallery,
        videos,
        faqs,
        deliveryLocations,
        users,
        reviews,
      },
    });
  } catch (error) {
    next(error);
  }
};

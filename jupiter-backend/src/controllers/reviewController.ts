import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getIdParam = (req: Request): string => {
  const { id } = req.params;
  return Array.isArray(id) ? id[0] : (id as string);
};

export const getReviews = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { status } = req.query;
    const whereClause = status ? { status: status as string } : {};

    const reviews = await prisma.review.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({ success: true, count: reviews.length, data: reviews });
  } catch (error) {
    next(error);
  }
};

export const getReviewById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = getIdParam(req);
    const review = await prisma.review.findUnique({ where: { id } });

    if (!review) {
      res.status(404).json({ success: false, message: 'Review not found' });
      return;
    }

    res.status(200).json({ success: true, data: review });
  } catch (error) {
    next(error);
  }
};

export const createReview = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { customerName, comment, rating, company, location, machineModel, image, status } = req.body;

    if (!customerName || !comment) {
      res.status(400).json({ success: false, message: 'Customer name and comment are required' });
      return;
    }

    const review = await prisma.review.create({
      data: {
        customerName,
        comment,
        rating: rating !== undefined ? Number(rating) : 5,
        company: company || 'Building Contractor',
        location: location || 'Tamil Nadu, India',
        machineModel: machineModel || 'Fly Ash Brick Machine',
        image: image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
        status: status || 'Approved',
        verifiedBuyer: true,
      },
    });
    res.status(201).json({ success: true, data: review });
  } catch (error) {
    next(error);
  }
};

export const updateReview = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = getIdParam(req);
    const existing = await prisma.review.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ success: false, message: 'Review not found' });
      return;
    }

    const review = await prisma.review.update({ where: { id }, data: req.body });
    res.status(200).json({ success: true, data: review });
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = getIdParam(req);
    const existing = await prisma.review.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ success: false, message: 'Review not found' });
      return;
    }

    await prisma.review.delete({ where: { id } });
    res.status(200).json({ success: true, message: 'Review deleted' });
  } catch (error) {
    next(error);
  }
};

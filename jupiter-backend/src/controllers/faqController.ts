import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getFaqs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const faqs = await (prisma as any).faq.findMany({ orderBy: { order: 'asc' } });
    res.status(200).json({ success: true, data: faqs });
  } catch (error) {
    next(error);
  }
};

export const createFaq = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const faq = await (prisma as any).faq.create({ data: req.body });
    res.status(201).json({ success: true, data: faq });
  } catch (error) {
    next(error);
  }
};

export const updateFaq = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id;
    const faq = await (prisma as any).faq.update({ where: { id }, data: req.body });
    res.status(200).json({ success: true, data: faq });
  } catch (error) {
    next(error);
  }
};

export const deleteFaq = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id;
    await (prisma as any).faq.delete({ where: { id } });
    res.status(200).json({ success: true, message: 'FAQ deleted' });
  } catch (error) {
    next(error);
  }
};

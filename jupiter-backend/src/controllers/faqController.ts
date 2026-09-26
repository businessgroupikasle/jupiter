import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getIdParam = (req: Request): string => {
  const { id } = req.params;
  return Array.isArray(id) ? id[0] : (id as string);
};

export const getFaqs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const faqs = await prisma.faq.findMany({ orderBy: { order: 'asc' } });
    res.status(200).json({ success: true, data: faqs });
  } catch (error) {
    next(error);
  }
};

export const getFaqById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = getIdParam(req);
    const faq = await prisma.faq.findUnique({ where: { id } });

    if (!faq) {
      res.status(404).json({ success: false, message: 'FAQ not found' });
      return;
    }

    res.status(200).json({ success: true, data: faq });
  } catch (error) {
    next(error);
  }
};

export const createFaq = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { question, answer, category, order, isActive } = req.body;
    if (!question || !answer) {
      res.status(400).json({ success: false, message: 'Question and answer are required' });
      return;
    }

    const faq = await prisma.faq.create({
      data: {
        question,
        answer,
        category: category || 'General',
        order: order !== undefined ? Number(order) : 0,
        isActive: isActive !== undefined ? Boolean(isActive) : true,
      },
    });
    res.status(201).json({ success: true, data: faq });
  } catch (error) {
    next(error);
  }
};

export const updateFaq = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = getIdParam(req);
    const existing = await prisma.faq.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ success: false, message: 'FAQ not found' });
      return;
    }

    const faq = await prisma.faq.update({ where: { id }, data: req.body });
    res.status(200).json({ success: true, data: faq });
  } catch (error) {
    next(error);
  }
};

export const deleteFaq = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = getIdParam(req);
    await prisma.faq.deleteMany({
      where: {
        OR: [
          { id },
          { question: { contains: id, mode: 'insensitive' } },
        ],
      },
    });
    res.status(200).json({ success: true, message: 'FAQ deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/faqs (Clear All)
export const clearAllFaqs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await prisma.faq.deleteMany({});
    res.status(200).json({ success: true, message: 'All FAQs deleted successfully' });
  } catch (error) {
    next(error);
  }
};

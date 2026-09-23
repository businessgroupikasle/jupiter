import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDeliveryLocations = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const locations = await (prisma as any).deliveryLocation.findMany({ orderBy: { createdAt: 'desc' } });
    res.status(200).json({ success: true, count: locations.length, data: locations });
  } catch (error) {
    next(error);
  }
};

export const createDeliveryLocation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const location = await (prisma as any).deliveryLocation.create({ data: req.body });
    res.status(201).json({ success: true, data: location });
  } catch (error) {
    next(error);
  }
};

export const updateDeliveryLocation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id;
    const location = await (prisma as any).deliveryLocation.update({ where: { id }, data: req.body });
    res.status(200).json({ success: true, data: location });
  } catch (error) {
    next(error);
  }
};

export const deleteDeliveryLocation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id;
    await (prisma as any).deliveryLocation.delete({ where: { id } });
    res.status(200).json({ success: true, message: 'Delivery location deleted' });
  } catch (error) {
    next(error);
  }
};

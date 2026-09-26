import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getIdParam = (req: Request): string => {
  const { id } = req.params;
  return Array.isArray(id) ? id[0] : (id as string);
};

export const getDeliveryLocations = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const locations = await prisma.deliveryLocation.findMany({ orderBy: { createdAt: 'desc' } });
    res.status(200).json({ success: true, count: locations.length, data: locations });
  } catch (error) {
    next(error);
  }
};

export const getDeliveryLocationById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = getIdParam(req);
    const location = await prisma.deliveryLocation.findUnique({ where: { id } });

    if (!location) {
      res.status(404).json({ success: false, message: 'Delivery location not found' });
      return;
    }

    res.status(200).json({ success: true, data: location });
  } catch (error) {
    next(error);
  }
};

export const createDeliveryLocation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const location = await prisma.deliveryLocation.create({ data: req.body });
    res.status(201).json({ success: true, data: location });
  } catch (error) {
    next(error);
  }
};

export const updateDeliveryLocation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = getIdParam(req);
    const existing = await prisma.deliveryLocation.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ success: false, message: 'Delivery location not found' });
      return;
    }

    const location = await prisma.deliveryLocation.update({ where: { id }, data: req.body });
    res.status(200).json({ success: true, data: location });
  } catch (error) {
    next(error);
  }
};

export const deleteDeliveryLocation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = getIdParam(req);
    await prisma.deliveryLocation.deleteMany({
      where: {
        OR: [
          { id },
          { clientName: { contains: id, mode: 'insensitive' } },
        ],
      },
    });
    res.status(200).json({ success: true, message: 'Delivery location deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/delivery-locations (Clear All)
export const clearAllDeliveryLocations = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await prisma.deliveryLocation.deleteMany({});
    res.status(200).json({ success: true, message: 'All delivery locations deleted successfully' });
  } catch (error) {
    next(error);
  }
};


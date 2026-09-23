import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/settings
export const getSettings = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let settings = await (prisma as any).setting.findUnique({ where: { id: 'site_settings' } });

    if (!settings) {
      // Create default settings if none exist yet
      settings = await (prisma as any).setting.create({
        data: { id: 'site_settings' },
      });
    }

    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
};

// PUT /api/settings
export const updateSettings = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = req.body;

    const settings = await (prisma as any).setting.upsert({
      where: { id: 'site_settings' },
      update: data,
      create: { id: 'site_settings', ...data },
    });

    res.status(200).json({ success: true, message: 'Settings updated successfully', data: settings });
  } catch (error) {
    next(error);
  }
};

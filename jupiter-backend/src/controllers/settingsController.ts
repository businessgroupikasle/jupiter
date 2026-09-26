import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ALLOWED_SETTING_FIELDS = [
  'adminDisplayName',
  'adminEmail',
  'maintenanceMode',
  'maintenanceHeadline',
  'estimatedDowntime',
  'publicNotice',
  'emergencyHotline',
  'emergencyEmail',
  'allowAdminBypass',
  'companyLegalName',
  'primaryHotline',
  'primaryEmail',
  'address',
  'gstNumber',
  'socialLinks',
];

// GET /api/settings
export const getSettings = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let settings = await prisma.setting.findUnique({ where: { id: 'site_settings' } });

    if (!settings) {
      // Create default settings if none exist yet
      settings = await prisma.setting.create({
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
    const rawData = req.body || {};
    const sanitizedData: any = {};

    for (const key of ALLOWED_SETTING_FIELDS) {
      if (rawData[key] !== undefined) {
        sanitizedData[key] = rawData[key];
      }
    }

    const settings = await prisma.setting.upsert({
      where: { id: 'site_settings' },
      update: sanitizedData,
      create: { id: 'site_settings', ...sanitizedData },
    });

    res.status(200).json({ success: true, message: 'Settings updated successfully', data: settings });
  } catch (error) {
    next(error);
  }
};

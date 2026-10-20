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
    const formatted = locations.map(loc => ({
      ...loc,
      locationCity: loc.city,
      deliveryDate: loc.dispatchDate,
    }));
    res.status(200).json({ success: true, count: formatted.length, data: formatted });
  } catch (error) {
    console.error('[DeliveryLocation] getDeliveryLocations error:', error);
    res.status(200).json({ success: true, count: 0, data: [] });
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

    res.status(200).json({
      success: true,
      data: {
        ...location,
        locationCity: location.city,
        deliveryDate: location.dispatchDate,
      }
    });
  } catch (error) {
    console.error('[DeliveryLocation] getDeliveryLocationById error:', error);
    res.status(404).json({ success: false, message: 'Delivery location not found or invalid lookup parameter' });
  }
};

export const createDeliveryLocation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { clientName, locationCity, city, district, state, machineModel, deliveryDate, dispatchDate, status, units, contactPhone, latitude, longitude } = req.body;
    const resolvedCity = (locationCity || city || 'Coimbatore').trim();
    const resolvedDispatchDate = (deliveryDate || dispatchDate || new Date().toLocaleDateString('en-GB')).trim();
    const resolvedUnits = typeof units === 'number' ? units : 1;

    const location = await prisma.deliveryLocation.create({
      data: {
        clientName: (clientName || 'Valued Client').trim(),
        city: resolvedCity,
        district: (district || resolvedCity).trim(),
        state: (state || 'Tamil Nadu').trim(),
        machineModel: (machineModel || 'Fully Automatic Fly Ash Brick Machine').trim(),
        dispatchDate: resolvedDispatchDate,
        status: status || 'Delivered & Operational',
        units: resolvedUnits,
        contactPhone: contactPhone ? String(contactPhone).trim() : null,
        latitude: typeof latitude === 'number' ? latitude : null,
        longitude: typeof longitude === 'number' ? longitude : null,
      },
    });

    res.status(201).json({
      success: true,
      data: {
        ...location,
        locationCity: location.city,
        deliveryDate: location.dispatchDate,
        transportVehicle: req.body.transportVehicle || '12-Wheeler Hydraulic Trailer',
        notes: req.body.notes || '',
      }
    });
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

    const { clientName, locationCity, city, district, state, machineModel, deliveryDate, dispatchDate, status, units, contactPhone, latitude, longitude } = req.body;
    const updateData: any = {};
    if (clientName !== undefined) updateData.clientName = String(clientName).trim();
    if (locationCity !== undefined || city !== undefined) {
      const c = String(locationCity || city).trim();
      updateData.city = c;
      if (!district) updateData.district = c;
    }
    if (district !== undefined) updateData.district = String(district).trim();
    if (state !== undefined) updateData.state = String(state).trim();
    if (machineModel !== undefined) updateData.machineModel = String(machineModel).trim();
    if (deliveryDate !== undefined || dispatchDate !== undefined) updateData.dispatchDate = String(deliveryDate || dispatchDate).trim();
    if (status !== undefined) updateData.status = status;
    if (units !== undefined) updateData.units = typeof units === 'number' ? units : 1;
    if (contactPhone !== undefined) updateData.contactPhone = contactPhone ? String(contactPhone).trim() : null;
    if (latitude !== undefined) updateData.latitude = typeof latitude === 'number' ? latitude : null;
    if (longitude !== undefined) updateData.longitude = typeof longitude === 'number' ? longitude : null;

    const location = await prisma.deliveryLocation.update({ where: { id }, data: updateData });
    res.status(200).json({
      success: true,
      data: {
        ...location,
        locationCity: location.city,
        deliveryDate: location.dispatchDate,
        transportVehicle: req.body.transportVehicle || '',
        notes: req.body.notes || '',
      }
    });
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


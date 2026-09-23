import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProjects = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const projects = await (prisma as any).project.findMany({ orderBy: { createdAt: 'desc' } });
    res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    next(error);
  }
};

export const getProjectById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const project = await (prisma as any).project.findUnique({ where: { id } });

    if (!project) {
      res.status(404).json({ success: false, message: 'Project not found' });
      return;
    }
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, client, location, machine, year, status, image, description, capacity } = req.body;

    const project = await (prisma as any).project.create({
      data: {
        title: title || 'New Industrial Installation',
        client: client || 'Valued Client',
        location: location || 'Tamil Nadu, India',
        machine: machine || 'Jupiter Automatic Machinery',
        year: year ? String(year) : String(new Date().getFullYear()),
        status: status || 'Completed',
        image: image || '/images/arunachala-plant.jpg',
        description: description || '',
        capacity: capacity || 'High Production Output',
      },
    });

    res.status(201).json({ success: true, message: 'Project created successfully', data: project });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const project = await (prisma as any).project.update({ where: { id }, data: req.body });
    res.status(200).json({ success: true, message: 'Project updated successfully', data: project });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    await (prisma as any).project.deleteMany({ where: { id } });
    res.status(200).json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const clearAllProjects = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await (prisma as any).project.deleteMany({});
    res.status(200).json({ success: true, message: 'All projects cleared successfully' });
  } catch (error) {
    next(error);
  }
};

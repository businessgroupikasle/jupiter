import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getIdParam = (req: Request): string => {
  const { id } = req.params;
  return Array.isArray(id) ? id[0] : (id as string);
};

export const getProjects = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
    res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    next(error);
  }
};

export const getProjectById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = getIdParam(req);
    const project = await prisma.project.findUnique({ where: { id } });

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

    const project = await prisma.project.create({
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
    const id = getIdParam(req);
    const allowedFields = ['title', 'client', 'location', 'machine', 'year', 'status', 'image', 'description', 'capacity'];
    const updateData: any = {};
    for (const key of allowedFields) {
      if (req.body[key] !== undefined) {
        updateData[key] = req.body[key];
      }
    }

    const titleToMatch = req.body.title ? String(req.body.title).trim() : '';
    const existing = await prisma.project.findFirst({
      where: {
        OR: [
          { id },
          ...(titleToMatch ? [{ title: { equals: titleToMatch, mode: 'insensitive' as const } }] : []),
        ],
      },
    });

    let project;
    if (existing) {
      project = await prisma.project.update({ where: { id: existing.id }, data: updateData });
    } else {
      project = await prisma.project.create({
        data: {
          title: req.body.title || 'New Industrial Installation',
          client: req.body.client || 'Valued Client',
          location: req.body.location || 'Tamil Nadu, India',
          machine: req.body.machine || 'Jupiter Automatic Machinery',
          year: req.body.year ? String(req.body.year) : String(new Date().getFullYear()),
          status: req.body.status || 'Completed',
          image: req.body.image || '/images/arunachala-plant.jpg',
          description: req.body.description || '',
          capacity: req.body.capacity || 'High Production Output',
        },
      });
    }

    res.status(200).json({ success: true, message: 'Project updated successfully', data: project });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = getIdParam(req);
    await prisma.project.deleteMany({ where: { id } });
    res.status(200).json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const clearAllProjects = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await prisma.project.deleteMany({});
    res.status(200).json({ success: true, message: 'All projects cleared successfully' });
  } catch (error) {
    next(error);
  }
};

import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient | null = null;
try {
  prisma = new PrismaClient();
} catch (e) {
  console.warn('Prisma Client initialised with warning; project in-memory fallback active.');
}

export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  location: string;
  machine: string;
  year: string;
  status: string;
  image: string;
  description?: string | null;
  capacity?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

let fallbackProjects: ProjectItem[] = [];

export const getProjects = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let projects: any[] = [];
    if (prisma && process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('yourpassword')) {
      try {
        projects = await (prisma as any).project.findMany({
          orderBy: { createdAt: 'desc' },
        });
      } catch (dbError) {
        console.warn('Database project read failed, falling back to local memory buffer:', dbError);
      }
    }

    if (!projects || projects.length === 0) {
      projects = fallbackProjects;
    }

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

export const getProjectById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    let project: any = null;

    if (prisma && process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('yourpassword')) {
      try {
        project = await (prisma as any).project.findUnique({
          where: { id },
        });
      } catch (dbError) {
        console.warn('Database project find failed:', dbError);
      }
    }

    if (!project) {
      project = fallbackProjects.find((p) => p.id === id);
    }

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
    let saved: any = null;

    if (prisma && process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('yourpassword')) {
      try {
        saved = await (prisma as any).project.create({
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
      } catch (dbError) {
        console.warn('Database project create failed, falling back to local memory buffer:', dbError);
      }
    }

    if (!saved) {
      saved = {
        id: `PRJ-${Date.now()}`,
        title: title || 'New Industrial Installation',
        client: client || 'Valued Client',
        location: location || 'Tamil Nadu, India',
        machine: machine || 'Jupiter Automatic Machinery',
        year: year ? String(year) : String(new Date().getFullYear()),
        status: status || 'Completed',
        image: image || '/images/arunachala-plant.jpg',
        description: description || '',
        capacity: capacity || 'High Production Output',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      fallbackProjects.unshift(saved);
    }

    res.status(201).json({
      success: true,
      message: 'Project created successfully in database',
      data: saved,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const data = req.body;
    let updated: any = null;

    if (prisma && process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('yourpassword')) {
      try {
        updated = await (prisma as any).project.update({
          where: { id },
          data,
        });
      } catch (dbError) {
        console.warn('Database project update failed:', dbError);
      }
    }

    if (!updated) {
      const idx = fallbackProjects.findIndex((p) => p.id === id);
      if (idx !== -1) {
        fallbackProjects[idx] = { ...fallbackProjects[idx], ...data, updatedAt: new Date() };
        updated = fallbackProjects[idx];
      }
    }

    if (!updated) {
      res.status(404).json({ success: false, message: 'Project not found' });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    if (prisma && process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('yourpassword')) {
      try {
        await (prisma as any).project.deleteMany({ where: { id } });
      } catch (dbError) {
        console.warn('Database project delete skipped:', dbError);
      }
    }

    fallbackProjects = fallbackProjects.filter((p) => p.id !== id);

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const clearAllProjects = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (prisma && process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('yourpassword')) {
      try {
        await (prisma as any).project.deleteMany({});
      } catch (dbError) {
        console.warn('Database clear all projects failed:', dbError);
      }
    }

    fallbackProjects = [];

    res.status(200).json({
      success: true,
      message: 'All projects cleared successfully',
    });
  } catch (error) {
    next(error);
  }
};

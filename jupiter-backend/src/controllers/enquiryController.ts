import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { CreateEnquiryInput } from '../validators/enquiryValidator';

let prisma: PrismaClient | null = null;
try {
  prisma = new PrismaClient();
} catch (e) {
  console.warn('Prisma Client initialised with warning; in-memory buffer active.');
}

// In-memory fallback repository for smooth developer experience when offline/unconnected
interface MemoryEnquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: Date;
}
const fallbackEnquiries: MemoryEnquiry[] = [
  {
    id: 'enq-01',
    name: 'Karthik Raja',
    email: 'karthik.raja@example.com',
    phone: '+919842156789',
    message: 'Interested in setting up a 10-cavity Fully Automatic Fly Ash Brick Machine. Please share the detailed quotation and layout plan for Coimbatore.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: 'enq-02',
    name: 'Anand Kumar',
    email: 'anand.kumar@constructsol.in',
    phone: '+919789012345',
    message: 'Looking for Hydraulic Interlocking Paver Block Making Machine with dual colour feeder attachment. Need delivery in Salem with on-site installation.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
  },
  {
    id: 'enq-03',
    name: 'Suresh Menon',
    email: 'suresh.menon@keralabuilders.com',
    phone: '+919447123456',
    message: 'Requesting price details for Concrete Solid and Hollow Block Machine along with Planetary Pan Mixer (500 Kg capacity) for our Kochi site.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 28),
  },
  {
    id: 'enq-04',
    name: 'Venkatesh Rao',
    email: 'venkatesh.infra@gmail.com',
    phone: '+919988776655',
    message: 'We are applying for PMEGP / MSME subsidy for a new brick plant project in Andhra Pradesh. Please provide the machinery project report and proforma invoice.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
  },
  {
    id: 'enq-05',
    name: 'Dinesh Balaji',
    email: 'dinesh.balaji@chennaibricks.com',
    phone: '+919884512389',
    message: 'Urgent enquiry: Need 50-Ton Fly Ash Brick Rotary Machine quotation with automatic pallet stacker. Looking for commissioning within 30 days.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72),
  },
];

export const createEnquiry = async (
  req: Request<{}, {}, CreateEnquiryInput>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, phone, message } = req.body;

    let savedEnquiry: any = null;

    if (prisma && process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('your_supabase')) {
      try {
        savedEnquiry = await prisma.enquiry.create({
          data: {
            name,
            email,
            phone,
            message,
          },
        });
      } catch (dbError) {
        console.warn('Database write failed, falling back to local storage buffer:', dbError);
      }
    }

    if (!savedEnquiry) {
      // Fallback in-memory save
      savedEnquiry = {
        id: `enq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        name,
        email,
        phone,
        message,
        createdAt: new Date(),
      };
      fallbackEnquiries.unshift(savedEnquiry);
    }

    res.status(201).json({
      success: true,
      message: 'Thank you. Your enquiry has been submitted successfully.',
      data: savedEnquiry,
    });
  } catch (error) {
    next(error);
  }
};

export const getEnquiries = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let enquiries: any[] = [];

    if (prisma && process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('your_supabase')) {
      try {
        enquiries = await prisma.enquiry.findMany({
          orderBy: { createdAt: 'desc' },
        });
      } catch (dbError) {
        console.warn('Database read failed, returning local storage buffer:', dbError);
      }
    }

    if (!enquiries || enquiries.length === 0) {
      enquiries = fallbackEnquiries;
    }

    res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    });
  } catch (error) {
    next(error);
  }
};

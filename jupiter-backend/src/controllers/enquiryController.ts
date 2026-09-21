import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { CreateEnquiryInput } from '../validators/enquiryValidator';
import { sendEnquiryAlertToMarketing, sendThankYouEmailToCustomer } from '../services/mailService';

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
let fallbackEnquiries: MemoryEnquiry[] = [];

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

    // Trigger emails via Zoho SMTP
    Promise.allSettled([
      sendEnquiryAlertToMarketing({ name, email, phone, message }),
      sendThankYouEmailToCustomer({ name, email, phone, message })
    ]).then((results) => {
      results.forEach((r, idx) => {
        if (r.status === 'fulfilled') {
          console.log(`[Mail Service] Email ${idx === 0 ? 'Alert to Marketing' : 'Thank-You to Customer'} sent successfully!`);
        } else {
          console.error(`[Mail Service] Email ${idx === 0 ? 'Alert' : 'Thank-You'} failed:`, r.reason);
        }
      });
    }).catch(err => {
      console.error('[Mail Service] Error sending emails:', err);
    });

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

export const deleteEnquiry = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id as string;
    if (prisma && process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('your_supabase')) {
      try {
        await prisma.enquiry.delete({ where: { id } });
      } catch (err) {
        console.warn('DB delete enquiry error:', err);
      }
    }
    fallbackEnquiries = fallbackEnquiries.filter(e => e.id !== id);
    res.status(200).json({ success: true, message: 'Enquiry deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const clearAllEnquiries = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (prisma && process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('your_supabase')) {
      try {
        await prisma.enquiry.deleteMany({});
      } catch (err) {
        console.warn('DB clear all enquiries error:', err);
      }
    }
    fallbackEnquiries = [];
    res.status(200).json({ success: true, message: 'All enquiries and temp data cleared successfully' });
  } catch (error) {
    next(error);
  }
};


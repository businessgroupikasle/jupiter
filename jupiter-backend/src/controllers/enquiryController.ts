import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { CreateEnquiryInput } from '../validators/enquiryValidator';
import { sendEnquiryAlertToMarketing, sendThankYouEmailToCustomer } from '../services/mailService';

const prisma = new PrismaClient();

export const createEnquiry = async (
  req: Request<{}, {}, CreateEnquiryInput>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, phone, message, status } = req.body;

    // Always ensure status defaults to 'New'
    const finalStatus = (status && typeof status === 'string' && status.trim()) ? status.trim() : 'New';

    const savedEnquiry = await prisma.enquiry.create({
      data: { name, email, phone, message, status: finalStatus },
    });

    // Trigger emails via Zoho SMTP (non-blocking)
    Promise.allSettled([
      sendEnquiryAlertToMarketing({ name, email, phone, message }),
      sendThankYouEmailToCustomer({ name, email, phone, message }),
    ]).then((results) => {
      results.forEach((r, idx) => {
        if (r.status === 'fulfilled') {
          console.log(`[Mail Service] Email ${idx === 0 ? 'Alert to Marketing' : 'Thank-You to Customer'} sent successfully!`);
        } else {
          console.error(`[Mail Service] Email ${idx === 0 ? 'Alert' : 'Thank-You'} failed:`, r.reason);
        }
      });
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

export const getEnquiries = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const enquiries = await prisma.enquiry.findMany({ orderBy: { createdAt: 'desc' } });

    res.status(200).json({ success: true, count: enquiries.length, data: enquiries });
  } catch (error) {
    next(error);
  }
};

export const updateEnquiryStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id as string;
    const { status } = req.body;

    if (!status || typeof status !== 'string') {
      res.status(400).json({ success: false, message: 'Valid status is required' });
      return;
    }

    const updated = await prisma.enquiry.update({
      where: { id },
      data: { status: status.trim() },
    });

    res.status(200).json({
      success: true,
      message: 'Enquiry status updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const markEnquiryRead = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id as string;
    const updated = await prisma.enquiry.update({
      where: { id },
      data: { isRead: true },
    });
    res.status(200).json({ success: true, message: 'Enquiry marked as read', data: updated });
  } catch (error) {
    next(error);
  }
};

export const markAllEnquiriesRead = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await prisma.enquiry.updateMany({
      data: { isRead: true },
    });
    res.status(200).json({ success: true, message: 'All enquiries marked as read' });
  } catch (error) {
    next(error);
  }
};

export const deleteEnquiry = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id as string;
    await prisma.enquiry.delete({ where: { id } });
    res.status(200).json({ success: true, message: 'Enquiry deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const clearAllEnquiries = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await prisma.enquiry.deleteMany({});
    res.status(200).json({ success: true, message: 'All enquiries cleared successfully' });
  } catch (error) {
    next(error);
  }
};

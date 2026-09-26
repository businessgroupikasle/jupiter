import { Request, Response, NextFunction } from 'express';
import { PrismaClient, Enquiry } from '@prisma/client';
import { CreateEnquiryInput } from '../validators/enquiryValidator';
import { sendEnquiryAlertToMarketing, sendThankYouEmailToCustomer } from '../services/mailService';

const prisma = new PrismaClient();

/**
 * Initializes and synchronizes EnquiryCounter with existing database records.
 * Ensures any existing enquiries have valid enquiryId and counter starts after the maximum ID.
 */
export const ensureEnquiryCounterInitialized = async (): Promise<void> => {
  try {
    const all = await prisma.enquiry.findMany({
      select: { id: true, enquiryId: true },
      orderBy: { createdAt: 'asc' },
    });

    let maxNum = 0;
    for (const e of all) {
      if (e.enquiryId && /^ENQ-\d+$/.test(e.enquiryId)) {
        const num = parseInt(e.enquiryId.replace('ENQ-', ''), 10);
        if (num > maxNum) maxNum = num;
      }
    }

    // Backfill any enquiry record that might have an empty/missing enquiryId
    for (const enq of all) {
      if (!enq.enquiryId) {
        maxNum++;
        const nextEnqId = `ENQ-${String(maxNum).padStart(4, '0')}`;
        await prisma.enquiry.update({
          where: { id: enq.id },
          data: { enquiryId: nextEnqId },
        });
      }
    }

    // Ensure EnquiryCounter is at least maxNum
    const existingCounter = await prisma.enquiryCounter.findUnique({
      where: { id: 'enquiry_counter' },
    });

    if (!existingCounter) {
      await prisma.enquiryCounter.create({
        data: { id: 'enquiry_counter', lastSeq: maxNum },
      });
      console.log(`[Enquiry] Initialized EnquiryCounter with lastSeq = ${maxNum}`);
    } else if (existingCounter.lastSeq < maxNum) {
      await prisma.enquiryCounter.update({
        where: { id: 'enquiry_counter' },
        data: { lastSeq: maxNum },
      });
      console.log(`[Enquiry] Synchronized EnquiryCounter to maxSeq = ${maxNum}`);
    }
  } catch (err) {
    console.error('[Enquiry] Error initializing enquiry counter:', err);
  }
};

export const createEnquiry = async (
  req: Request<{}, {}, CreateEnquiryInput>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, phone, message, status, productId } = req.body;

    // Always ensure status defaults to 'New'
    const finalStatus = (status && typeof status === 'string' && status.trim()) ? status.trim() : 'New';

    // Resolve productId if supplied by ID or slug
    let resolvedProductId: string | null = null;
    if (productId && typeof productId === 'string' && productId.trim()) {
      const trimmed = productId.trim();
      const linkedProduct = await prisma.product.findFirst({
        where: { OR: [{ id: trimmed }, { slug: trimmed }] },
        select: { id: true },
      });
      if (linkedProduct) {
        resolvedProductId = linkedProduct.id;
      }
    }

    let savedEnquiry: Enquiry | null = null;
    let attempts = 0;
    const maxAttempts = 5;

    // Concurrency-safe atomic transaction with retry logic
    while (!savedEnquiry && attempts < maxAttempts) {
      attempts++;
      try {
        savedEnquiry = await prisma.$transaction(async (tx) => {
          // Atomically increment the persistent sequence counter
          const counter = await tx.enquiryCounter.upsert({
            where: { id: 'enquiry_counter' },
            update: { lastSeq: { increment: 1 } },
            create: { id: 'enquiry_counter', lastSeq: 1 },
          });

          // Generate human-readable reference number (e.g., ENQ-0001)
          const enquiryId = `ENQ-${String(counter.lastSeq).padStart(4, '0')}`;

          // Create the enquiry with internal CUID `id`, unique `enquiryId`, and optional `productId`
          return await tx.enquiry.create({
            data: {
              enquiryId,
              name,
              email,
              phone,
              message,
              status: finalStatus,
              productId: resolvedProductId,
            },
          });
        });
      } catch (txErr: any) {
        // If rare unique collision occurs (P2002), retry with next incremented sequence
        if (txErr?.code === 'P2002' && attempts < maxAttempts) {
          console.warn(`[Enquiry] ID collision detected on attempt ${attempts}, retrying...`);
          continue;
        }
        throw txErr;
      }
    }

    if (!savedEnquiry) {
      throw new Error('Failed to create enquiry reference number after multiple attempts.');
    }

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
    const { productId } = req.query;
    const whereClause: any = {};

    if (productId && typeof productId === 'string' && productId.trim()) {
      const trimmed = productId.trim();
      const linkedProduct = await prisma.product.findFirst({
        where: { OR: [{ id: trimmed }, { slug: trimmed }] },
        select: { id: true },
      });
      whereClause.productId = linkedProduct ? linkedProduct.id : trimmed;
    }

    const enquiries = await prisma.enquiry.findMany({
      where: whereClause,
      include: {
        product: {
          select: { id: true, name: true, slug: true, category: true, image: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({ success: true, count: enquiries.length, data: enquiries });
  } catch (error) {
    next(error);
  }
};

export const getEnquiryById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id as string;
    const enquiry = await prisma.enquiry.findFirst({
      where: {
        OR: [{ id }, { enquiryId: id }],
      },
    });

    if (!enquiry) {
      res.status(404).json({ success: false, message: 'Enquiry not found' });
      return;
    }

    res.status(200).json({ success: true, data: enquiry });
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

    const existing = await prisma.enquiry.findFirst({
      where: {
        OR: [{ id }, { enquiryId: id }],
      },
    });

    if (!existing) {
      res.status(404).json({ success: false, message: 'Enquiry not found' });
      return;
    }

    const updated = await prisma.enquiry.update({
      where: { id: existing.id },
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
    const existing = await prisma.enquiry.findFirst({
      where: {
        OR: [{ id }, { enquiryId: id }],
      },
    });

    if (!existing) {
      res.status(404).json({ success: false, message: 'Enquiry not found' });
      return;
    }

    const updated = await prisma.enquiry.update({
      where: { id: existing.id },
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
    const result = await prisma.enquiry.deleteMany({
      where: {
        OR: [{ id }, { enquiryId: id }],
      },
    });

    if (result.count === 0) {
      res.status(404).json({ success: false, message: 'Enquiry not found' });
      return;
    }

    // IMPORTANT: Deleting an enquiry does NOT reset EnquiryCounter.
    // Future enquiries continue sequentially without reusing deleted numbers.
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

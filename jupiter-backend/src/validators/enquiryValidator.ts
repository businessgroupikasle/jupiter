import { z } from 'zod';

export const createEnquirySchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'Name is required' })
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name must not exceed 100 characters')
      .trim(),
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email address')
      .trim(),
    phone: z
      .string({ required_error: 'Phone number is required' })
      .min(10, 'Phone number must be at least 10 digits')
      .max(20, 'Phone number must not exceed 20 characters')
      .trim(),
    message: z
      .string({ required_error: 'Message is required' })
      .min(5, 'Message must be at least 5 characters')
      .max(2000, 'Message must not exceed 2000 characters')
      .trim(),
  }),
});

export type CreateEnquiryInput = z.infer<typeof createEnquirySchema>['body'];

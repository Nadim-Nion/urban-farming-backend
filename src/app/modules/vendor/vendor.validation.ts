import z from 'zod';
import { VENDOR_STATUS_ARR } from './vendor.constant';

const createVendorProfileValidationSchema = z.object({
  body: z.object({
    farmName: z
      .string({ error: 'Farm name is required' })
      .min(2, { message: 'Farm name must be at least 2 characters' })
      .max(100, { message: 'Farm name cannot exceed 100 characters' }),

    farmLocation: z
      .string({ error: 'Farm location is required' })
      .min(2, { message: 'Farm location must be at least 2 characters' })
      .max(200, { message: 'Farm location cannot exceed 200 characters' }),

    certificationStatus: z.enum(VENDOR_STATUS_ARR).optional(),
  }),
});

export const VendorValidations = {
  createVendorProfileValidationSchema,
};

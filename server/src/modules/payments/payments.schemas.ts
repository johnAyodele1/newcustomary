import { z } from 'zod';

export const initializePaymentSchema = z.object({ reference: z.string().min(3) });
export const verifyPaymentSchema = z.object({ reference: z.string().min(3) });
export type InitializePaymentInput = z.infer<typeof initializePaymentSchema>;

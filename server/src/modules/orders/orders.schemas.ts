import { z } from 'zod';

export const customerSchema = z.object({
  fullName: z.string().trim().min(2), phone: z.string().trim().min(7),
  address: z.string().trim().min(10), city: z.string().trim().min(2), state: z.string().trim().min(2),
});
export const orderItemSchema = z.object({
  productId: z.string().uuid(), variantId: z.string().min(1), colorId: z.string().min(1),
  engraving: z.string().max(40), quantity: z.number().int().min(1).max(10),
});
export const createOrderSchema = z.object({ customer: customerSchema, items: z.array(orderItemSchema).min(1).max(20) });
export type CreateOrderInput = z.infer<typeof createOrderSchema>;

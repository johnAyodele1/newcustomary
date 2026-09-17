import { z } from 'zod';

export const orderFormSchema = z.object({
  fullName: z.string().trim().min(2, 'Enter your full name.'),
  phone: z.string().trim().min(7, 'Enter a valid WhatsApp number.'),
  address: z.string().trim().min(10, 'Enter your delivery address.'),
  city: z.string().trim().min(2, 'Enter your city.'),
  state: z.string().trim().min(2, 'Enter your state.'),
});
export const createOrderResponseSchema = z.object({
  order: z.object({ reference: z.string(), total: z.number(), currency: z.string(), items: z.number() }),
  payment: z.object({ authorizationUrl: z.string().url(), accessCode: z.string(), reference: z.string() }),
});
export type OrderFormValues = z.infer<typeof orderFormSchema>;

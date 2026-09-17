import { z } from 'zod';

export const categorySchema = z.enum(['jewelry', 'journals', 'bottles', 'gift-boxes', 'watches']);
export const productSchema = z.object({
  id: z.string().uuid(), category: categorySchema, name: z.string(), description: z.string(),
  basePrice: z.number().nonnegative(), stock: z.number().int().nonnegative(),
  variants: z.array(z.object({ id: z.string(), name: z.string(), price: z.number().nonnegative() })),
  colors: z.array(z.object({ id: z.string(), name: z.string(), available: z.boolean() })),
  imageUrl: z.string().url(), altText: z.string(),
});
export type ProductResponse = z.infer<typeof productSchema>;

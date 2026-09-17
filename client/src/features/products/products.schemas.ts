import { z } from 'zod';

export const productSchema = z.object({
  id: z.string().uuid(),
  category: z.enum(['jewelry', 'journals', 'bottles', 'gift-boxes', 'watches']),
  name: z.string(),
  description: z.string(),
  basePrice: z.number().nonnegative(),
  stock: z.number().int().nonnegative(),
  variants: z.array(z.object({ id: z.string(), name: z.string(), price: z.number().nonnegative() })),
  colors: z.array(z.object({ id: z.string(), name: z.string(), available: z.boolean() })),
  imageUrl: z.string().url(),
  altText: z.string(),
});
export const productsResponseSchema = z.object({ products: z.array(productSchema) });
export type Product = z.infer<typeof productSchema>;

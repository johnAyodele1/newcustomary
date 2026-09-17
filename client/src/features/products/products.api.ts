import { productsResponseSchema } from './products.schemas';

export async function getProducts(): Promise<ReturnType<typeof productsResponseSchema.parse>['products']> {
  const response = await fetch('/api/products');
  if (!response.ok) throw new Error('Unable to load the collection.');
  return productsResponseSchema.parse(await response.json()).products;
}

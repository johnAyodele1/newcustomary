import { z } from 'zod';
import type { ProductSelection } from '../products/products.types';
import { createOrderResponseSchema, type OrderFormValues } from './orders.schemas';

const itemSchema = z.object({
  productId: z.string().uuid(), variantId: z.string(), colorId: z.string(), engraving: z.string(), quantity: z.number().int().positive(),
});

export async function createOrder(customer: OrderFormValues, selections: ProductSelection[]) {
  const response = await fetch('/api/orders', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ customer, items: selections.map((item) => itemSchema.parse({ productId: item.product.id, variantId: item.variantId, colorId: item.colorId, engraving: item.engraving, quantity: item.quantity })) }),
  });
  const data: unknown = await response.json();
  if (!response.ok) throw new Error(data && typeof data === 'object' && 'message' in data && typeof data.message === 'string' ? data.message : 'Unable to create your order.');
  return createOrderResponseSchema.parse(data);
}

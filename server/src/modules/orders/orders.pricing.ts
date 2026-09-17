import type { CreateOrderInput } from './orders.schemas.js';

type ProductForPricing = {
  id: string; stock: number;
  variants: Array<{ id: string; price: number }>;
  colors: Array<{ id: string; available: boolean }>;
};

export type PricedItem = CreateOrderInput['items'][number] & { unitPrice: number; lineTotal: number };

export function priceOrder(input: CreateOrderInput, products: ProductForPricing[]): { items: PricedItem[]; total: number } {
  const byId = new Map(products.map((product) => [product.id, product]));
  const items = input.items.map((item) => {
    const product = byId.get(item.productId);
    if (!product) throw new Error('One selected product is no longer available.');
    if (product.stock < item.quantity) throw new Error('One selected product does not have enough stock.');
    const variant = product.variants.find((candidate) => candidate.id === item.variantId);
    if (!variant) throw new Error('A selected finish is no longer available.');
    const color = product.colors.find((candidate) => candidate.id === item.colorId);
    if (!color?.available) throw new Error('A selected colour is no longer available.');
    const lineTotal = variant.price * item.quantity;
    return { ...item, unitPrice: variant.price, lineTotal };
  });
  return { items, total: items.reduce((sum, item) => sum + item.lineTotal, 0) };
}

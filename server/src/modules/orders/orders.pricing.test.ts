import { describe, expect, it } from 'vitest';
import { priceOrder } from './orders.pricing.js';

const product = {
  id: '00000000-0000-0000-0000-000000000001', stock: 4,
  variants: [{ id: 'classic', price: 10000 }, { id: 'premium', price: 15000 }],
  colors: [{ id: 'silver', available: true }, { id: 'gold', available: false }],
};
const input = {
  customer: { fullName: 'Ada Example', phone: '08000000000', address: '12 Long Street', city: 'Lagos', state: 'Lagos' },
  items: [{ productId: product.id, variantId: 'premium', colorId: 'silver', engraving: 'Mum', quantity: 2 }],
};

describe('priceOrder', () => {
  it('uses the authoritative variant price', () => expect(priceOrder(input, [product]).total).toBe(30000));
  it('rejects an unavailable colour', () => expect(() => priceOrder({ ...input, items: [{ ...input.items[0], colorId: 'gold' }] }, [product])).toThrow('colour'));
  it('rejects insufficient stock', () => expect(() => priceOrder({ ...input, items: [{ ...input.items[0], quantity: 5 }] }, [product])).toThrow('enough stock'));
});

import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { OrderForm } from './OrderForm';
import type { ProductSelection } from '../products/products.types';

vi.mock('./orders.api', () => ({ createOrder: vi.fn() }));

const item: ProductSelection = {
  product: {
    id: '00000000-0000-0000-0000-000000000001', category: 'jewelry', name: 'Signet Pendant',
    description: 'Sterling silver', basePrice: 18000, stock: 3,
    variants: [{ id: 'classic', name: 'Classic', price: 18000 }],
    colors: [{ id: 'silver', name: 'Silver', available: true }],
    imageUrl: 'https://placehold.co/800x1000/FAF8F5/1A1A1A?text=Signet', altText: 'Signet pendant',
  },
  variantId: 'classic', colorId: 'silver', engraving: 'Mum', quantity: 1, unitPrice: 18000,
};

describe('OrderForm', () => {
  it('keeps payment disabled until required fields are valid', () => {
    render(<OrderForm items={[item]} onDone={() => undefined} />);
    expect(screen.getByRole('button', { name: 'Continue to Paystack' })).toBeDisabled();
  });
});

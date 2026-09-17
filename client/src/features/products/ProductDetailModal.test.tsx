import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ProductDetailModal } from './ProductDetailModal';
import type { Product } from './products.schemas';

const product: Product = {
  id: '00000000-0000-0000-0000-000000000001', category: 'jewelry', name: 'Signet Pendant', description: 'Sterling silver', basePrice: 18000, stock: 3,
  variants: [{ id: 'classic', name: 'Classic', price: 18000 }, { id: 'bold', name: 'Bold', price: 22000 }],
  colors: [{ id: 'silver', name: 'Silver', available: true }], imageUrl: 'https://placehold.co/800x1000/FAF8F5/1A1A1A?text=Signet', altText: 'Signet pendant',
};

describe('ProductDetailModal', () => {
  it('closes with escape and carries the full selection on add', () => {
    const onClose = vi.fn(); const onAdd = vi.fn();
    render(<ProductDetailModal product={product} initialVariantId="classic" initialColorId="silver" onClose={onClose} onAdd={onAdd} />);
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Add to Order' }));
    expect(onAdd).toHaveBeenCalledWith(expect.objectContaining({ variantId: 'classic', colorId: 'silver', quantity: 1, unitPrice: 18000 }));
  });
});

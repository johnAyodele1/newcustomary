import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ProductCard } from './ProductCard';
import type { Product } from './products.schemas';

const product: Product = {
  id: '00000000-0000-0000-0000-000000000001', category: 'jewelry', name: 'Signet Pendant',
  description: 'Sterling silver', basePrice: 18000, stock: 3,
  variants: [{ id: 'classic', name: 'Classic', price: 18000 }, { id: 'bold', name: 'Bold', price: 22000 }],
  colors: [{ id: 'silver', name: 'Silver', available: true }, { id: 'gold', name: 'Gold', available: false }],
  imageUrl: 'https://placehold.co/800x1000/FAF8F5/1A1A1A?text=Signet', altText: 'Signet pendant',
};

describe('ProductCard', () => {
  it('changes variant price and disables unavailable colours', () => {
    const onVariantChange = vi.fn();
    render(<ProductCard product={product} variantId="classic" colorId="silver" onVariantChange={onVariantChange} onColorChange={() => undefined} onOpen={() => undefined} />);
    expect(screen.getByText('₦18,000')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Bold' }));
    expect(onVariantChange).toHaveBeenCalledWith('bold');
    expect(screen.getByRole('button', { name: 'Gold' })).toBeDisabled();
  });
  it('opens from the card name', () => {
    const onOpen = vi.fn();
    render(<ProductCard product={product} variantId="classic" colorId="silver" onVariantChange={() => undefined} onColorChange={() => undefined} onOpen={onOpen} />);
    fireEvent.click(screen.getByRole('button', { name: 'Signet Pendant' }));
    expect(onOpen).toHaveBeenCalled();
  });
});

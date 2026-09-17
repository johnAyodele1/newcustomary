import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StickyNav } from './StickyNav';

describe('StickyNav', () => {
  it('renders category navigation and keeps the buy CTA available', () => {
    render(<StickyNav onBuy={() => undefined} />);
    expect(screen.getByRole('button', { name: 'Jewelry & Accessories' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Buy' })).toBeInTheDocument();
  });
  it('opens and closes the mobile panel', () => {
    render(<StickyNav onBuy={() => undefined} />);
    const menu = screen.getByRole('button', { name: 'Open menu' });
    fireEvent.click(menu);
    expect(screen.getByRole('button', { name: 'Close menu' })).toBeInTheDocument();
  });
});

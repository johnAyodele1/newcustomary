import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { QuantityStepper } from './QuantityStepper';

describe('QuantityStepper', () => {
  it('respects minimum and maximum bounds', () => {
    const onChange = vi.fn();
    const { rerender } = render(<QuantityStepper value={1} max={2} onChange={onChange} />);
    expect(screen.getByRole('button', { name: 'Decrease quantity' })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Increase quantity' }));
    expect(onChange).toHaveBeenCalledWith(2);
    rerender(<QuantityStepper value={2} max={2} onChange={onChange} />);
    expect(screen.getByRole('button', { name: 'Increase quantity' })).toBeDisabled();
  });
});

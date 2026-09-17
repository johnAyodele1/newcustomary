import { render, screen, act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { EngravingPlatePreview } from './EngravingPlatePreview';

describe('EngravingPlatePreview', () => {
  it('updates after the quiet debounce', () => {
    vi.useFakeTimers();
    render(<EngravingPlatePreview text="Mum" />);
    expect(screen.getByText('Your engraving')).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(120));
    expect(screen.getByText('Mum')).toBeInTheDocument();
    vi.useRealTimers();
  });
});

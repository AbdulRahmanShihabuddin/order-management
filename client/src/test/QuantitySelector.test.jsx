import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import QuantitySelector from '../components/QuantitySelector';

describe('QuantitySelector', () => {
  it('displays the current quantity', () => {
    render(<QuantitySelector quantity={3} onChange={() => {}} />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('calls onChange with incremented value on plus click', () => {
    const handler = vi.fn();
    render(<QuantitySelector quantity={2} onChange={handler} />);
    fireEvent.click(screen.getByLabelText('Increase quantity'));
    expect(handler).toHaveBeenCalledWith(3);
  });

  it('calls onChange with decremented value on minus click', () => {
    const handler = vi.fn();
    render(<QuantitySelector quantity={2} onChange={handler} />);
    fireEvent.click(screen.getByLabelText('Decrease quantity'));
    expect(handler).toHaveBeenCalledWith(1);
  });
});

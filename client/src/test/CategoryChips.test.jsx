import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CategoryChips from '../components/CategoryChips';

describe('CategoryChips', () => {
  it('renders all category buttons', () => {
    render(<CategoryChips selected="All" onSelect={() => {}} />);
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Burgers')).toBeInTheDocument();
    expect(screen.getByText('Pizza')).toBeInTheDocument();
    expect(screen.getByText('Sushi')).toBeInTheDocument();
    expect(screen.getByText('Salads')).toBeInTheDocument();
  });

  it('highlights the selected category', () => {
    render(<CategoryChips selected="Pizza" onSelect={() => {}} />);
    const pizzaBtn = screen.getByText('Pizza');
    expect(pizzaBtn.className).toContain('bg-primary');
  });

  it('calls onSelect when a chip is clicked', () => {
    const handler = vi.fn();
    render(<CategoryChips selected="All" onSelect={handler} />);
    fireEvent.click(screen.getByText('Sushi'));
    expect(handler).toHaveBeenCalledWith('Sushi');
  });
});

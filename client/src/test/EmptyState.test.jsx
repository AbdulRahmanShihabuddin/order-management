import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import EmptyState from '../components/EmptyState';

describe('EmptyState', () => {
  it('renders title and description', () => {
    render(<EmptyState icon="shopping_cart" title="Your cart is empty" description="Add some items!" />);
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
    expect(screen.getByText('Add some items!')).toBeInTheDocument();
  });

  it('renders action button when provided', () => {
    render(<EmptyState icon="shopping_cart" title="Empty" description="Desc" actionLabel="Browse" onAction={() => {}} />);
    expect(screen.getByText('Browse')).toBeInTheDocument();
  });

  it('does not render action button when label is missing', () => {
    render(<EmptyState icon="shopping_cart" title="Empty" description="Desc" />);
    expect(screen.queryByRole('button')).toBeNull();
  });
});

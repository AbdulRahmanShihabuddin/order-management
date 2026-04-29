import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MenuCard from '../components/MenuCard';

const mockItem = {
  id: 'item-001',
  name: 'Classic Smashburger',
  description: 'Double beef patty, American cheese.',
  price: 12.99,
  image: 'https://example.com/burger.jpg',
  category: 'Burgers',
  rating: 4.8,
  badge: null,
};

describe('MenuCard', () => {
  it('renders item name, price, and description', () => {
    render(<MenuCard item={mockItem} onAddToCart={() => {}} />);
    expect(screen.getByText('Classic Smashburger')).toBeInTheDocument();
    expect(screen.getByText('$12.99')).toBeInTheDocument();
    expect(screen.getByText('Double beef patty, American cheese.')).toBeInTheDocument();
  });

  it('renders rating badge', () => {
    render(<MenuCard item={mockItem} onAddToCart={() => {}} />);
    expect(screen.getByText('4.8')).toBeInTheDocument();
  });

  it('renders special badge when present', () => {
    render(<MenuCard item={{ ...mockItem, badge: 'Healthy Choice' }} onAddToCart={() => {}} />);
    expect(screen.getByText('Healthy Choice')).toBeInTheDocument();
  });

  it('calls onAddToCart when Add to Cart is clicked', () => {
    const handler = vi.fn();
    render(<MenuCard item={mockItem} onAddToCart={handler} />);
    fireEvent.click(screen.getByText('Add to Cart'));
    expect(handler).toHaveBeenCalledWith(mockItem);
  });
});

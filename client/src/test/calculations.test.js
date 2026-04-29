import { describe, it, expect } from 'vitest';
import { calculateSubtotal, calculateTax, calculateTotal, getItemCount, formatPrice, DELIVERY_FEE } from '../utils/calculations';

const mockItems = [
  { menuItemId: '1', name: 'Burger', price: 12.99, quantity: 1, image: '' },
  { menuItemId: '2', name: 'Pizza', price: 16.50, quantity: 2, image: '' },
];

describe('calculations', () => {
  it('calculates subtotal correctly', () => {
    expect(calculateSubtotal(mockItems)).toBeCloseTo(45.99, 2);
  });

  it('calculates tax', () => {
    const tax = calculateTax(45.99);
    expect(tax).toBeGreaterThan(0);
    expect(tax).toBeCloseTo(4.02, 2);
  });

  it('calculates total', () => {
    const subtotal = 45.99;
    const tax = calculateTax(subtotal);
    const total = calculateTotal(subtotal, DELIVERY_FEE, tax);
    expect(total).toBeCloseTo(53.00, 0);
  });

  it('counts items correctly', () => {
    expect(getItemCount(mockItems)).toBe(3);
  });

  it('formats price', () => {
    expect(formatPrice(12.99)).toBe('$12.99');
    expect(formatPrice(0)).toBe('$0.00');
  });
});

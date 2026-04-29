import { describe, it, expect } from 'vitest';
import { validateCheckoutForm, hasErrors } from '../utils/validation';

describe('validateCheckoutForm', () => {
  it('returns errors for all empty fields', () => {
    const errors = validateCheckoutForm({ fullName: '', address: '', phoneNumber: '' });
    expect(errors.fullName).toBeDefined();
    expect(errors.address).toBeDefined();
    expect(errors.phoneNumber).toBeDefined();
    expect(hasErrors(errors)).toBe(true);
  });

  it('returns no errors for valid data', () => {
    const errors = validateCheckoutForm({
      fullName: 'John Doe',
      address: '123 Street',
      phoneNumber: '(555) 123-4567',
    });
    expect(hasErrors(errors)).toBe(false);
  });

  it('returns error for invalid phone number', () => {
    const errors = validateCheckoutForm({
      fullName: 'John Doe',
      address: '123 Street',
      phoneNumber: 'abc',
    });
    expect(errors.phoneNumber).toBeDefined();
  });
});

/**
 * Validate checkout form fields.
 * Returns an object of field -> error message, or empty object if valid.
 */
export function validateCheckoutForm({ fullName, address, phoneNumber }) {
  const errors = {};

  if (!fullName || !fullName.trim()) {
    errors.fullName = 'Full name is required.';
  }

  if (!address || !address.trim()) {
    errors.address = 'Delivery address is required.';
  }

  if (!phoneNumber || !phoneNumber.trim()) {
    errors.phoneNumber = 'Phone number is required for delivery driver contact.';
  } else if (!/^[\d\s()+\-]{7,}$/.test(phoneNumber.trim())) {
    errors.phoneNumber = 'Please enter a valid phone number.';
  }

  return errors;
}

/**
 * Check if form has any errors
 */
export function hasErrors(errors) {
  return Object.keys(errors).length > 0;
}

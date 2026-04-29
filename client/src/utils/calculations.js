const DELIVERY_FEE = 2.99;
const TAX_RATE = 0.0875; // 8.75%

/**
 * Calculate subtotal from cart items
 */
export function calculateSubtotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

/**
 * Calculate tax amount
 */
export function calculateTax(subtotal) {
  return parseFloat((subtotal * TAX_RATE).toFixed(2));
}

/**
 * Calculate order total
 */
export function calculateTotal(subtotal, deliveryFee = DELIVERY_FEE, taxes) {
  return parseFloat((subtotal + deliveryFee + taxes).toFixed(2));
}

/**
 * Get total item count in cart
 */
export function getItemCount(items) {
  return items.reduce((count, item) => count + item.quantity, 0);
}

/**
 * Format price to USD
 */
export function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

export { DELIVERY_FEE, TAX_RATE };

/**
 * Validation middleware for order creation
 */
function validateOrder(req, res, next) {
  const { customer, items } = req.body;
  const errors = [];

  // Validate customer
  if (!customer) {
    errors.push('customer is required');
  } else {
    if (!customer.fullName || typeof customer.fullName !== 'string' || !customer.fullName.trim()) {
      errors.push('customer.fullName is required');
    }
    if (!customer.address || typeof customer.address !== 'string' || !customer.address.trim()) {
      errors.push('customer.address is required');
    }
    if (!customer.phoneNumber || typeof customer.phoneNumber !== 'string' || !customer.phoneNumber.trim()) {
      errors.push('customer.phoneNumber is required');
    }
  }

  // Validate items
  if (!items || !Array.isArray(items) || items.length === 0) {
    errors.push('items must be a non-empty array');
  } else {
    items.forEach((item, i) => {
      if (!item.menuItemId) errors.push(`items[${i}].menuItemId is required`);
      if (!item.name) errors.push(`items[${i}].name is required`);
      if (typeof item.price !== 'number' || item.price <= 0) errors.push(`items[${i}].price must be a positive number`);
      if (typeof item.quantity !== 'number' || item.quantity < 1) errors.push(`items[${i}].quantity must be at least 1`);
    });
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: 'Validation failed', details: errors });
  }

  next();
}

/**
 * Validation middleware for status updates
 */
const VALID_STATUSES = ['received', 'preparing', 'out_for_delivery', 'delivered'];

function validateStatusUpdate(req, res, next) {
  const { status } = req.body;

  if (!status || !VALID_STATUSES.includes(status)) {
    return res.status(400).json({
      error: 'Invalid status',
      details: `status must be one of: ${VALID_STATUSES.join(', ')}`,
    });
  }

  next();
}

module.exports = { validateOrder, validateStatusUpdate, VALID_STATUSES };

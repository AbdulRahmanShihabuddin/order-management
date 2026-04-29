const API_BASE = import.meta.env.VITE_API_URL || '/api';

/**
 * Fetch all menu items, optionally filtered by category
 */
export async function fetchMenu(category = 'All') {
  const params = category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : '';
  const res = await fetch(`${API_BASE}/menu${params}`);
  if (!res.ok) throw new Error('Failed to fetch menu');
  return res.json();
}

/**
 * Create a new order
 */
export async function createOrder(orderData) {
  const res = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Order creation failed' }));
    throw new Error(error.error || 'Order creation failed');
  }
  return res.json();
}

/**
 * Fetch a single order by ID
 */
export async function fetchOrder(orderId) {
  const res = await fetch(`${API_BASE}/orders/${orderId}`);
  if (!res.ok) throw new Error('Order not found');
  return res.json();
}

/**
 * Update order status
 */
export async function updateOrderStatus(orderId, status) {
  const res = await fetch(`${API_BASE}/orders/${orderId}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error('Failed to update status');
  return res.json();
}

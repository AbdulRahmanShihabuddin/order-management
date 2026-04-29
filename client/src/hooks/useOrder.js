import { useState, useEffect, useCallback } from 'react';
import { fetchOrder } from '../services/api';

const STATUS_ORDER = ['received', 'preparing', 'out_for_delivery', 'delivered'];
const SIMULATION_INTERVAL = 8000; // 8 seconds between status transitions

/**
 * Hook for fetching and polling order status.
 * Simulates status progression automatically.
 */
export function useOrder(orderId) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadOrder = useCallback(async () => {
    if (!orderId) return;
    try {
      const data = await fetchOrder(orderId);
      setOrder(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    loadOrder();
  }, [loadOrder]);

  // Simulate status progression with polling
  useEffect(() => {
    if (!order || order.status === 'delivered') return;

    const interval = setInterval(async () => {
      const currentIdx = STATUS_ORDER.indexOf(order.status);
      if (currentIdx < STATUS_ORDER.length - 1) {
        const nextStatus = STATUS_ORDER[currentIdx + 1];
        try {
          const res = await fetch(`/api/orders/${orderId}/status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: nextStatus }),
          });
          if (res.ok) {
            const updated = await res.json();
            setOrder(updated);
          }
        } catch {
          // Silently ignore simulation failures
        }
      }
    }, SIMULATION_INTERVAL);

    return () => clearInterval(interval);
  }, [order, orderId]);

  return { order, loading, error, refetch: loadOrder };
}

export { STATUS_ORDER };

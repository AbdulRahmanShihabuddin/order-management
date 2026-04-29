import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import MobileNav from '../components/MobileNav';
import ErrorBanner from '../components/ErrorBanner';
import EmptyState from '../components/EmptyState';
import { useAuth } from '../context/AuthContext';
import { fetchUserOrders } from '../services/api';
import { formatPrice } from '../utils/calculations';

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        if (user?.userId) {
          const data = await fetchUserOrders(user.userId);
          setOrders(data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, [user]);

  return (
    <>
      <AppHeader showSearch={false} />
      <main className="max-w-screen-xl mx-auto px-4 md:px-lg pb-xl pt-[104px] min-h-screen">
        <div className="mb-lg">
          <h1 className="font-h1 text-h1 text-on-surface">Your Orders</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-base">
            View and track your past and current orders.
          </p>
        </div>

        {error && (
          <ErrorBanner
            title="Failed to load orders"
            message={error}
            actionLabel="Retry"
            onAction={() => window.location.reload()}
          />
        )}

        {loading ? (
          <div className="space-y-4">
            <div className="h-24 bg-surface-variant rounded-xl animate-pulse" />
            <div className="h-24 bg-surface-variant rounded-xl animate-pulse" />
            <div className="h-24 bg-surface-variant rounded-xl animate-pulse" />
          </div>
        ) : orders.length === 0 && !error ? (
          <EmptyState
            icon="receipt_long"
            title="No orders yet"
            description="You haven't placed any orders. Browse the menu to get started!"
            actionLabel="Browse Menu"
            onAction={() => window.location.href = '/'}
          />
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const date = new Date(order.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              });
              
              const isDone = order.status === 'delivered';
              
              return (
                <Link
                  key={order.id}
                  to={`/tracking/${order.id}`}
                  className="block bg-surface-container-lowest rounded-xl shadow-[0_4px_16px_rgba(45,49,66,0.08)] p-md border border-outline-variant/30 hover:border-primary/30 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-label-md text-label-md text-on-surface">Order #{order.id}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${isDone ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                          {order.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      <p className="text-body-sm text-secondary">
                        {date} • {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                      </p>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                      <span className="font-h3 text-h3 text-primary">{formatPrice(order.total)}</span>
                      <span className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
                        View Details <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>
      <MobileNav />
    </>
  );
}

import { useParams, Link } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import MobileNav from '../components/MobileNav';
import OrderStatusStepper from '../components/OrderStatusStepper';
import ErrorBanner from '../components/ErrorBanner';
import { useOrder } from '../hooks/useOrder';
import { formatPrice } from '../utils/calculations';

export default function TrackingPage() {
  const { id } = useParams();
  const { order, loading, error, refetch } = useOrder(id);

  if (loading) {
    return (
      <>
        <AppHeader showSearch={false} />
        <main className="max-w-screen-xl mx-auto px-4 md:px-lg py-xl pt-20">
          <div className="animate-pulse space-y-lg">
            <div className="h-8 w-64 bg-surface-variant rounded" />
            <div className="h-4 w-48 bg-surface-dim rounded" />
            <div className="h-[400px] bg-surface-variant rounded-xl" />
          </div>
        </main>
      </>
    );
  }

  if (error || !order) {
    return (
      <>
        <AppHeader showSearch={false} />
        <main className="max-w-screen-xl mx-auto px-4 md:px-lg py-xl pt-20">
          <ErrorBanner title="Order not found" message={error || 'Unable to load order details.'} actionLabel="Retry" onAction={refetch} />
        </main>
      </>
    );
  }

  const placedTime = new Date(order.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

  return (
    <>
      <AppHeader showSearch={false} />
      <main className="max-w-screen-xl mx-auto px-4 md:px-lg py-xl pt-20">
        {/* Header */}
        <div className="mb-lg">
          <div className="flex items-center gap-2 mb-xs">
            <Link to="/" className="text-secondary hover:text-primary transition-colors flex items-center">
              <span className="material-symbols-outlined text-sm mr-1">arrow_back</span>
              <span className="font-label-md text-label-md">Back to Menu</span>
            </Link>
          </div>
          <h1 className="font-h1 text-h1 text-on-background">Order Confirmation</h1>
          <p className="font-body-md text-body-md text-secondary mt-base">
            Order ID #{order.id} • Placed today at {placedTime}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
          {/* Left Column */}
          <div className="lg:col-span-8 flex flex-col gap-lg">
            {/* Map / ETA Card */}
            <div className="bg-surface-container-lowest rounded-xl shadow-[0_2px_12px_rgba(45,49,66,0.08)] overflow-hidden h-[400px] relative bg-primary-fixed">
              <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.3\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
              <div className="absolute top-md left-md bg-white/90 backdrop-blur-sm rounded-lg px-md py-sm shadow-sm border border-slate-100 flex items-center gap-md">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Estimated Delivery</span>
                  <span className="font-h2 text-h2 text-primary">{order.estimatedDelivery}</span>
                </div>
              </div>
            </div>
            {/* Status Stepper */}
            <OrderStatusStepper currentStatus={order.status} statusHistory={order.statusHistory} />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 flex flex-col gap-lg">
            {/* Order Summary */}
            <div className="bg-surface-container-lowest rounded-xl shadow-[0_2px_12px_rgba(45,49,66,0.08)] p-lg">
              <h2 className="font-h3 text-h3 text-on-background mb-md">Order Summary</h2>
              <div className="flex flex-col gap-sm mb-lg">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between items-start">
                    <div className="flex gap-sm">
                      <span className="font-label-md text-label-md text-secondary border border-slate-200 rounded px-1.5 h-fit mt-0.5">{item.quantity}</span>
                      <p className="font-body-md text-body-md text-on-background">{item.name}</p>
                    </div>
                    <span className="font-label-md text-label-md text-on-background whitespace-nowrap">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="pt-md border-t border-slate-100 flex flex-col gap-xs">
                <div className="flex justify-between font-body-md text-body-md text-secondary">
                  <span>Subtotal</span><span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between font-body-md text-body-md text-secondary">
                  <span>Delivery Fee</span><span>{formatPrice(order.deliveryFee)}</span>
                </div>
                <div className="flex justify-between font-body-md text-body-md text-secondary">
                  <span>Taxes & Fees</span><span>{formatPrice(order.taxes)}</span>
                </div>
                <div className="flex justify-between font-h3 text-h3 text-on-background mt-sm pt-sm border-t border-slate-100">
                  <span>Total</span><span>{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <MobileNav />
    </>
  );
}

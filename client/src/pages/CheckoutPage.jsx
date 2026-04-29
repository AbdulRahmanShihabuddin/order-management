import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import CheckoutForm from '../components/CheckoutForm';
import OrderSummary from '../components/OrderSummary';
import ErrorBanner from '../components/ErrorBanner';
import EmptyState from '../components/EmptyState';
import { useCart, useCartDispatch } from '../context/CartContext';
import { calculateSubtotal, calculateTax, calculateTotal, DELIVERY_FEE } from '../utils/calculations';
import { createOrder } from '../services/api';
import { validateCheckoutForm, hasErrors } from '../utils/validation';
import { useAuth } from '../context/AuthContext';

export default function CheckoutPage() {
  const { items } = useCart();
  const { user } = useAuth();
  const dispatch = useCartDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);

  const subtotal = calculateSubtotal(items);
  const taxes = calculateTax(subtotal);
  const total = calculateTotal(subtotal, DELIVERY_FEE, taxes);

  const handleSubmit = async (customerData) => {
    const validationErrors = validateCheckoutForm(customerData);
    if (hasErrors(validationErrors)) return;

    setIsSubmitting(true);
    setApiError(null);
    try {
      const order = await createOrder({
        customer: customerData,
        userId: user?.userId,
        items: items.map((i) => ({
          menuItemId: i.menuItemId,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          image: i.image,
        })),
      });
      dispatch({ type: 'CLEAR_CART' });
      navigate(`/tracking/${order.id}`);
    } catch (err) {
      setApiError(err.message || 'We were unable to process your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <>
        <AppHeader showSearch={false} />
        <main className="max-w-screen-xl mx-auto px-gutter md:px-lg pb-xl md:pb-xxl pt-[104px]">
          <EmptyState
            icon="shopping_cart"
            title="Your cart is empty"
            description="Add some items to your cart before checking out."
            actionLabel="Browse Menu"
            onAction={() => navigate('/')}
          />
        </main>
      </>
    );
  }

  return (
    <>
      <AppHeader showSearch={false} />
      <main className="max-w-screen-xl mx-auto px-gutter md:px-lg pb-xl md:pb-xxl pt-[104px]">
        {apiError && (
          <ErrorBanner
            title="Checkout Failed"
            message={apiError}
            actionLabel="Retry Checkout"
            onAction={() => setApiError(null)}
          />
        )}
        <div className="mb-lg">
          <h1 className="font-h1 text-h1 text-on-surface">Checkout</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-base">
            Please complete your details below to place your order.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-lg md:gap-xl">
          <div className="flex-1 space-y-lg">
            <CheckoutForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
            {/* Payment Method */}
            <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_16px_rgba(45,49,66,0.08)] p-md md:p-lg border border-outline-variant/30">
              <h2 className="font-h3 text-h3 text-on-surface mb-md pb-base border-b border-outline-variant/50">Payment Method</h2>
              <div className="flex items-center gap-sm p-sm border border-primary rounded-lg bg-primary-fixed/20">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 0" }}>credit_card</span>
                <div className="flex-1">
                  <p className="font-label-md text-label-md text-on-surface">Visa ending in 4242</p>
                </div>
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              </div>
            </div>
          </div>
          <div className="w-full md:w-[380px] lg:w-[420px] shrink-0">
            <OrderSummary
              items={items}
              subtotal={subtotal}
              deliveryFee={DELIVERY_FEE}
              taxes={taxes}
              total={total}
              showPlaceOrder
              onPlaceOrder={() => document.getElementById('checkout-form')?.requestSubmit()}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </main>
    </>
  );
}

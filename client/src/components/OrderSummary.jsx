import { formatPrice } from '../utils/calculations';

export default function OrderSummary({ items, subtotal, deliveryFee, taxes, total, showPlaceOrder, onPlaceOrder, isSubmitting }) {
  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-[0_8px_24px_rgba(45,49,66,0.12)] p-md md:p-lg border border-outline-variant/30 sticky top-24">
      <h2 className="font-h2 text-h2 text-on-surface mb-md">Order Summary</h2>
      <div className="space-y-md mb-lg">
        {items.map((item) => (
          <div key={item.menuItemId} className="flex justify-between items-start">
            <div className="flex gap-sm">
              <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center font-label-md text-label-md text-on-surface font-semibold shrink-0">
                {item.quantity}x
              </div>
              <p className="font-label-md text-label-md text-on-surface">{item.name}</p>
            </div>
            <p className="font-label-md text-label-md text-on-surface shrink-0">{formatPrice(item.price * item.quantity)}</p>
          </div>
        ))}
      </div>
      <div className="border-t border-outline-variant/50 pt-md space-y-sm mb-lg">
        <div className="flex justify-between items-center">
          <p className="font-body-md text-body-md text-on-surface-variant">Subtotal</p>
          <p className="font-label-md text-label-md text-on-surface">{formatPrice(subtotal)}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-body-md text-body-md text-on-surface-variant">Delivery Fee</p>
          <p className="font-label-md text-label-md text-on-surface">{formatPrice(deliveryFee)}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-body-md text-body-md text-on-surface-variant">Taxes</p>
          <p className="font-label-md text-label-md text-on-surface">{formatPrice(taxes)}</p>
        </div>
        <div className="flex justify-between items-center pt-sm mt-sm border-t border-outline-variant/30">
          <p className="font-h3 text-h3 text-on-surface">Total</p>
          <p className="font-h3 text-h3 text-primary">{formatPrice(total)}</p>
        </div>
      </div>
      {showPlaceOrder && (
        <>
          <button
            onClick={onPlaceOrder}
            disabled={isSubmitting}
            form="checkout-form"
            type="submit"
            className="w-full bg-primary text-on-primary font-label-md text-label-md py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-sm active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Placing Order...' : 'Place Order'}
            {!isSubmitting && <span className="material-symbols-outlined text-[20px]">arrow_forward</span>}
          </button>
          <p className="font-label-sm text-label-sm text-center text-on-surface-variant mt-sm">
            By placing your order, you agree to our Terms of Service.
          </p>
        </>
      )}
    </div>
  );
}

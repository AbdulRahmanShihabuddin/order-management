import { useNavigate } from 'react-router-dom';
import { useCart, useCartDispatch } from '../context/CartContext';
import { calculateSubtotal, calculateTax, calculateTotal, getItemCount, formatPrice, DELIVERY_FEE } from '../utils/calculations';
import CartItem from './CartItem';
import EmptyState from './EmptyState';

export default function CartSidebar() {
  const { items } = useCart();
  const dispatch = useCartDispatch();
  const navigate = useNavigate();
  const itemCount = getItemCount(items);
  const subtotal = calculateSubtotal(items);
  const taxes = calculateTax(subtotal);
  const total = calculateTotal(subtotal, DELIVERY_FEE, taxes);

  const handleUpdate = (menuItemId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { menuItemId, quantity } });
  };

  const handleRemove = (menuItemId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: menuItemId });
  };

  return (
    <aside className="w-full lg:w-[360px] flex-shrink-0">
      <div className="bg-surface-container-lowest rounded-xl shadow-[0_8px_24px_rgba(45,49,66,0.12)] p-lg sticky top-[96px] flex flex-col max-h-[calc(100vh-120px)]">
        {/* Cart Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <h2 className="font-h2 text-h2 text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined">shopping_bag</span>
            Your Order
          </h2>
          {itemCount > 0 && (
            <span className="bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm px-2 py-1 rounded-full">
              {itemCount} {itemCount === 1 ? 'Item' : 'Items'}
            </span>
          )}
        </div>

        {items.length === 0 ? (
          <EmptyState
            icon="production_quantity_limits"
            title="Your cart is empty"
            description="Looks like you haven't added anything yet. Discover delicious meals to fill it up!"
            compact
          />
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-4 scrollbar-hide">
              {items.map((item) => (
                <CartItem
                  key={item.menuItemId}
                  item={item}
                  onUpdate={handleUpdate}
                  onRemove={handleRemove}
                />
              ))}
            </div>

            {/* Cart Footer */}
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-sm">
              <div className="flex justify-between items-center text-secondary">
                <span className="font-body-md text-body-md">Subtotal</span>
                <span className="font-label-md text-label-md">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center text-secondary">
                <span className="font-body-md text-body-md">Delivery Fee</span>
                <span className="font-label-md text-label-md">{formatPrice(DELIVERY_FEE)}</span>
              </div>
              <div className="flex justify-between items-center text-secondary">
                <span className="font-body-md text-body-md">Taxes</span>
                <span className="font-label-md text-label-md">{formatPrice(taxes)}</span>
              </div>
              <div className="flex justify-between items-center text-on-surface pt-2">
                <span className="font-h3 text-h3">Total</span>
                <span className="font-h2 text-h2 text-primary">{formatPrice(total)}</span>
              </div>
              <button
                onClick={() => navigate('/checkout')}
                className="mt-4 w-full bg-primary text-white font-label-md text-label-md py-3 px-4 rounded-xl hover:bg-orange-700 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                Proceed to Checkout
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}

import QuantitySelector from './QuantitySelector';

export default function CartItem({ item, onUpdate, onRemove }) {
  return (
    <div className="flex gap-sm items-start group">
      <img
        alt={`${item.name} thumbnail`}
        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
        src={item.image}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex justify-between items-start gap-1">
          <h4 className="font-label-md text-label-md text-on-surface truncate">
            {item.name}
          </h4>
          <span className="font-label-md text-label-md text-on-surface whitespace-nowrap">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>
        {/* Quantity Selector + Delete */}
        <div className="flex items-center justify-between mt-2">
          <QuantitySelector
            quantity={item.quantity}
            onChange={(qty) => onUpdate(item.menuItemId, qty)}
          />
          <button
            onClick={() => onRemove(item.menuItemId)}
            className="text-slate-400 hover:text-error transition-colors p-1 opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label={`Remove ${item.name}`}
          >
            <span className="material-symbols-outlined text-[20px]">delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}

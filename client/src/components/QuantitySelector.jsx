export default function QuantitySelector({ quantity, onChange }) {
  return (
    <div className="flex items-center bg-surface-container-highest rounded-lg px-2 py-1">
      <button
        onClick={() => onChange(quantity - 1)}
        className="text-secondary hover:text-on-surface transition-colors p-1 flex items-center justify-center rounded"
        aria-label="Decrease quantity"
      >
        <span className="material-symbols-outlined text-[16px]">remove</span>
      </button>
      <span className="font-label-md text-label-md text-on-surface w-6 text-center">
        {quantity}
      </span>
      <button
        onClick={() => onChange(quantity + 1)}
        className="text-secondary hover:text-on-surface transition-colors p-1 flex items-center justify-center rounded"
        aria-label="Increase quantity"
      >
        <span className="material-symbols-outlined text-[16px]">add</span>
      </button>
    </div>
  );
}

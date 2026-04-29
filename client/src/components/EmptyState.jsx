export default function EmptyState({ icon, title, description, actionLabel, onAction, compact = false }) {
  return (
    <div className={`flex flex-col items-center justify-center text-center ${compact ? 'py-12' : 'py-20'}`}>
      <div className="w-24 h-24 bg-surface-variant rounded-full flex items-center justify-center mb-md">
        <span
          className="material-symbols-outlined text-[48px] text-on-surface-variant opacity-50"
          style={{ fontVariationSettings: "'FILL' 0" }}
        >
          {icon || 'production_quantity_limits'}
        </span>
      </div>
      <h2 className="font-h3 text-h3 text-on-surface mb-xs">{title}</h2>
      <p className="font-body-md text-body-md text-on-surface-variant mb-xl max-w-[250px]">
        {description}
      </p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="w-full max-w-[200px] bg-primary text-on-primary font-label-md text-label-md px-lg py-3 rounded-lg hover:bg-[#832600] transition-colors shadow-sm"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

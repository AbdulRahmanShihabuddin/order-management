export default function ErrorBanner({ title, message, actionLabel, onAction }) {
  return (
    <div className="mb-lg w-full bg-error-container text-on-error-container rounded-lg p-md shadow-sm border border-[#ffb4ab] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-md">
      <div className="flex items-start gap-sm">
        <span className="material-symbols-outlined text-error mt-1 sm:mt-0" style={{ fontVariationSettings: "'FILL' 1" }}>error</span>
        <div>
          <h3 className="font-label-md text-label-md text-error mb-base">{title || 'Error'}</h3>
          <p className="font-body-md text-body-md text-on-error-container opacity-90">{message}</p>
        </div>
      </div>
      {actionLabel && onAction && (
        <button onClick={onAction} className="shrink-0 bg-error text-on-error font-label-md text-label-md px-md py-sm rounded-lg hover:bg-[#93000a] transition-colors whitespace-nowrap">
          {actionLabel}
        </button>
      )}
    </div>
  );
}

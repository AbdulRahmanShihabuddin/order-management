const STEPS = [
  { key: 'received', label: 'Order Received', icon: 'check' },
  { key: 'preparing', label: 'Preparing', icon: 'soup_kitchen' },
  { key: 'out_for_delivery', label: 'Out for Delivery', icon: 'two_wheeler' },
  { key: 'delivered', label: 'Delivered', icon: 'home' },
];

export default function OrderStatusStepper({ currentStatus, statusHistory = [] }) {
  const currentIdx = STEPS.findIndex((s) => s.key === currentStatus);
  const progressWidth = currentIdx >= 0 ? `${(currentIdx / (STEPS.length - 1)) * 100}%` : '0%';

  const getTimestamp = (stepKey) => {
    const entry = statusHistory.find((h) => h.status === stepKey);
    if (!entry) return null;
    return new Date(entry.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-[0_2px_12px_rgba(45,49,66,0.08)] p-lg">
      <h2 className="font-h3 text-h3 text-on-background mb-lg">Order Status</h2>
      <div className="relative flex justify-between items-center w-full px-sm pb-xl">
        {/* Background line */}
        <div className="absolute top-4 left-0 w-full h-[2px] bg-slate-100 -z-10" />
        {/* Progress line */}
        <div className="absolute top-4 left-0 h-[2px] bg-primary -z-10 transition-all duration-500" style={{ width: progressWidth }} />
        {STEPS.map((step, i) => {
          const isDone = i < currentIdx;
          const isActive = i === currentIdx;
          const isPending = i > currentIdx;
          return (
            <div key={step.key} className="flex flex-col items-center gap-sm relative w-1/4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isDone ? 'bg-primary text-white shadow-sm'
                : isActive ? 'bg-primary text-white shadow-[0_0_0_4px_rgba(171,53,0,0.2)] animate-pulse'
                : 'bg-slate-100 text-slate-400 border-2 border-white'
              }`}>
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: isDone ? "'FILL' 1" : "'FILL' 1" }}>
                  {isDone ? 'check' : step.icon}
                </span>
              </div>
              <div className="text-center absolute top-10">
                <span className={`font-label-md text-label-md block whitespace-nowrap ${
                  isActive ? 'text-primary font-bold' : isDone ? 'text-on-background' : 'text-secondary'
                }`}>{step.label}</span>
                {(isDone || isActive) && getTimestamp(step.key) && (
                  <span className="font-label-sm text-label-sm text-secondary block">
                    {isActive ? `Started ${getTimestamp(step.key)}` : getTimestamp(step.key)}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { STEPS };

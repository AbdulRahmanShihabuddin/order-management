export default function LoadingSkeletonCard({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-md">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-surface-container-lowest rounded-xl p-sm shadow-sm border border-outline-variant flex flex-col h-full"
        >
          <div className="w-full h-40 bg-surface-variant rounded-lg mb-md animate-shimmer" />
          <div className="h-5 w-3/4 bg-surface-variant rounded mb-xs animate-shimmer" />
          <div className="h-3 w-full bg-surface-dim rounded mb-base animate-shimmer" />
          <div className="h-3 w-2/3 bg-surface-dim rounded mb-lg animate-shimmer" />
          <div className="mt-auto flex justify-between items-center pt-sm border-t border-surface-variant">
            <div className="h-5 w-16 bg-surface-variant rounded animate-shimmer" />
            <div className="h-8 w-8 bg-surface-variant rounded-full animate-shimmer" />
          </div>
        </div>
      ))}
    </div>
  );
}

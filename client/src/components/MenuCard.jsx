export default function MenuCard({ item, onAddToCart }) {
  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_12px_rgba(45,49,66,0.08)] overflow-hidden flex flex-col hover:shadow-[0_8px_24px_rgba(45,49,66,0.12)] transition-shadow duration-300">
      {/* Image */}
      <div className="h-48 w-full relative">
        <img
          alt={item.name}
          className="w-full h-full object-cover"
          src={item.image}
          loading="lazy"
        />
        {/* Badge (e.g. "Healthy Choice") */}
        {item.badge && (
          <div className="absolute top-sm left-sm bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm">
            <span className="font-label-sm text-label-sm text-green-700 font-semibold">
              {item.badge}
            </span>
          </div>
        )}
        {/* Rating */}
        {item.rating && (
          <div className="absolute top-sm right-sm bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
            <span
              className="material-symbols-outlined text-[16px] text-yellow-500"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            <span className="font-label-sm text-label-sm text-slate-800">
              {item.rating}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-md flex flex-col flex-1 gap-xs">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-h3 text-h3 text-on-surface">{item.name}</h3>
          <span className="font-h3 text-h3 text-primary whitespace-nowrap">
            ${item.price.toFixed(2)}
          </span>
        </div>
        <p className="font-body-md text-body-md text-secondary line-clamp-2 flex-1">
          {item.description}
        </p>
        <button
          onClick={() => onAddToCart(item)}
          className="mt-sm w-full py-2 bg-white border border-slate-200 text-slate-800 font-label-md text-label-md rounded-lg hover:bg-slate-50 hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2 active:scale-95"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

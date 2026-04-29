const CATEGORIES = ['All', 'Burgers', 'Pizza', 'Sushi', 'Salads'];

export default function CategoryChips({ selected, onSelect }) {
  return (
    <section aria-label="Menu Categories">
      <div className="flex items-center gap-xs overflow-x-auto pb-2 scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`px-4 py-2 rounded-full font-label-md text-label-md whitespace-nowrap transition-colors ${
              selected === cat
                ? 'bg-primary text-white shadow-sm'
                : 'bg-surface-container-highest text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </section>
  );
}

export { CATEGORIES };

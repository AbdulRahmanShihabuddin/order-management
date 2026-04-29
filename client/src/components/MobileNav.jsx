import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/', icon: 'home', label: 'Home' },
  { path: '/', icon: 'search', label: 'Search' },
  { path: '/', icon: 'receipt_long', label: 'Orders', filled: true },
  { path: '/', icon: 'person', label: 'Profile' },
];

export default function MobileNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 w-full z-50 rounded-t-2xl bg-white border-t border-slate-100 shadow-[0_-4px_12px_rgba(45,49,66,0.08)] md:hidden">
      <div className="flex justify-around items-center px-4 pb-safe pt-2 h-20 touch-none select-none">
        {navItems.map((item) => {
          const isActive = item.label === 'Home' && location.pathname === '/';
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex flex-col items-center justify-center transition-transform active:scale-90 w-16 ${
                isActive
                  ? 'text-primary bg-surface-container rounded-xl px-3 py-1 min-w-16'
                  : 'text-slate-500 hover:text-primary'
              }`}
            >
              <span
                className="material-symbols-outlined mb-1"
                style={{ fontVariationSettings: isActive || item.filled ? "'FILL' 1" : "'FILL' 0" }}
              >
                {item.icon}
              </span>
              <span className="text-[11px] font-medium tracking-wide">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

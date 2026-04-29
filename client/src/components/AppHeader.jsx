import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getItemCount } from '../utils/calculations';

export default function AppHeader({ searchQuery, onSearchChange, showSearch = true }) {
  const { items } = useCart();
  const itemCount = getItemCount(items);
  const location = useLocation();

  return (
    <header className="bg-white/95 backdrop-blur-md font-inter antialiased fixed top-0 w-full z-50 border-b border-slate-100 shadow-sm">
      <div className="flex justify-between items-center px-4 h-16 max-w-screen-xl mx-auto">
        {/* Logo */}
        <Link to="/" className="text-2xl font-black tracking-tighter text-orange-600">
          FreshBites
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 items-center">
          <Link
            to="/"
            className={`font-label-md text-label-md transition-colors ${
              location.pathname === '/' ? 'text-primary font-semibold' : 'text-slate-600 hover:text-primary'
            }`}
          >
            Home
          </Link>
          <span className="text-slate-600 font-label-md text-label-md hover:text-primary transition-colors cursor-pointer">
            Search
          </span>
          <span className="text-slate-600 font-label-md text-label-md hover:text-primary transition-colors cursor-pointer">
            Orders
          </span>
        </nav>

        {/* Search Bar */}
        {showSearch && (
          <div className="flex-1 max-w-md mx-6 hidden lg:block">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" style={{ fontVariationSettings: "'FILL' 0" }}>
                search
              </span>
              <input
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-body-md font-body-md text-slate-700 placeholder-slate-400 transition-colors"
                placeholder="Search for food..."
                type="text"
                value={searchQuery || ''}
                onChange={(e) => onSearchChange?.(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="relative p-2 text-slate-600 hover:bg-slate-50 rounded-full transition-colors active:scale-95 duration-150 group"
          >
            <span className="material-symbols-outlined group-hover:text-orange-500" style={{ fontVariationSettings: "'FILL' 0" }}>
              shopping_cart
            </span>
            {itemCount > 0 && (
              <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full border-2 border-white">
                {itemCount}
              </span>
            )}
          </Link>
          <button className="p-2 text-slate-600 hover:bg-slate-50 rounded-full transition-colors active:scale-95 duration-150 group">
            <span className="material-symbols-outlined group-hover:text-orange-500" style={{ fontVariationSettings: "'FILL' 0" }}>
              notifications
            </span>
          </button>
          <div className="w-8 h-8 rounded-full bg-surface-variant overflow-hidden border border-outline-variant cursor-pointer">
            <div className="w-full h-full bg-surface-dim flex items-center justify-center">
              <span className="material-symbols-outlined text-on-surface-variant text-sm">person</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

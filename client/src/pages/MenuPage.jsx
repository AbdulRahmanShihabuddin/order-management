import AppHeader from '../components/AppHeader';
import MobileNav from '../components/MobileNav';
import CategoryChips from '../components/CategoryChips';
import MenuCard from '../components/MenuCard';
import CartSidebar from '../components/CartSidebar';
import LoadingSkeletonCard from '../components/LoadingSkeletonCard';
import ErrorBanner from '../components/ErrorBanner';
import EmptyState from '../components/EmptyState';
import { useMenu } from '../hooks/useMenu';
import { useCartDispatch } from '../context/CartContext';

export default function MenuPage() {
  const { items, loading, error, category, setCategory, searchQuery, setSearchQuery, retry } = useMenu();
  const dispatch = useCartDispatch();

  const handleAddToCart = (item) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        menuItemId: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
      },
    });
  };

  return (
    <>
      <AppHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} showSearch />
      <main className="flex-1 max-w-screen-xl mx-auto w-full flex flex-col lg:flex-row gap-lg p-margin lg:px-0 lg:pb-xl pt-[104px] lg:pt-[104px]">
        {/* Left Column: Menu */}
        <div className="flex-1 w-full flex flex-col gap-xl">
          {error && (
            <ErrorBanner title="Failed to load menu" message={error} actionLabel="Retry" onAction={retry} />
          )}
          <CategoryChips selected={category} onSelect={setCategory} />
          {loading ? (
            <LoadingSkeletonCard count={6} />
          ) : items.length === 0 ? (
            <EmptyState
              icon="search_off"
              title="No items found"
              description={`No results for "${searchQuery || category}". Try a different search or category.`}
            />
          ) : (
            <section aria-label="Menu Items">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-lg">
                {items.map((item) => (
                  <MenuCard key={item.id} item={item} onAddToCart={handleAddToCart} />
                ))}
              </div>
            </section>
          )}
        </div>
        {/* Right Column: Cart */}
        <CartSidebar />
      </main>
      <MobileNav />
    </>
  );
}

import { useState, useEffect, useCallback } from 'react';
import { fetchMenu } from '../services/api';

/**
 * Hook for fetching and filtering menu items.
 */
export function useMenu() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const loadMenu = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMenu();
      setItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMenu();
  }, [loadMenu]);

  // Client-side filtering for instant UX
  const filteredItems = items.filter((item) => {
    const matchesCategory = category === 'All' || item.category === category;
    const matchesSearch =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return {
    items: filteredItems,
    loading,
    error,
    category,
    setCategory,
    searchQuery,
    setSearchQuery,
    retry: loadMenu,
  };
}

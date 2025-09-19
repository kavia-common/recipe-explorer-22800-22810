import { useEffect, useState } from 'react';
import { getFavorites, toggleFavorite } from '../api/recipes';

// PUBLIC_INTERFACE
export function useFavorites() {
  /** Manage favorites for current user */
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    getFavorites()
      .then((d) => setFavorites(d.items || d))
      .finally(() => setLoading(false));
  };

  const toggle = async (id) => {
    await toggleFavorite(id);
    load();
  };

  useEffect(() => { load(); }, []);

  return { favorites, loading, toggle, reload: load };
}

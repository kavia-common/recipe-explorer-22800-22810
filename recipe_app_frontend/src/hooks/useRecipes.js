import { useEffect, useState } from 'react';
import { fetchRecipes } from '../api/recipes';

// PUBLIC_INTERFACE
export default function useRecipes(initialQuery = {}) {
  /** Fetch and manage a list of recipes */
  const [query, setQuery] = useState(initialQuery);
  const [data, setData] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = () => {
    setLoading(true);
    fetchRecipes(query)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  };

  useEffect(() => { reload(); /* eslint-disable-next-line */ }, [JSON.stringify(query)]);

  return { data, loading, error, query, setQuery, reload };
}

import { useCallback } from 'react';
import useRecipes from '../hooks/useRecipes';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';

export default function HomePage() {
  const { data, loading, setQuery, query, reload } = useRecipes({ q: '' });

  const onSearch = useCallback((q) => setQuery((prev) => ({ ...prev, q })), [setQuery]);

  return (
    <div>
      <div style={{display:'grid', gap:16, marginBottom:16}}>
        <div style={{display:'flex', gap:12, alignItems:'center', flexWrap:'wrap'}}>
          <h2 style={{margin:'0 8px 0 0'}}>Discover</h2>
          <span className="badge" style={{color:'#2563EB', borderColor:'#DBEAFE'}}>Ocean Professional</span>
        </div>
        <SearchBar initial={query.q} onChange={onSearch} />
      </div>

      {loading ? (
        <div className="card" style={{padding:24}}>Loading recipes...</div>
      ) : data.items?.length ? (
        <div className="grid cols-3">
          {data.items.map((r) => (
            <RecipeCard key={r.id} recipe={r} onChanged={reload} />
          ))}
        </div>
      ) : (
        <div className="card empty">No recipes found.</div>
      )}
    </div>
  );
}

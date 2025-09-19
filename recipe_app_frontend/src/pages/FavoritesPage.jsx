import { useFavorites } from '../hooks/useFavorites';
import RecipeCard from '../components/RecipeCard';

export default function FavoritesPage() {
  const { favorites, loading, reload } = useFavorites();

  return (
    <div>
      <h2 style={{marginTop:0}}>Your Favorites</h2>
      {loading ? (
        <div className="card" style={{padding:24}}>Loading favorites...</div>
      ) : favorites.length ? (
        <div className="grid cols-3">
          {favorites.map((r) => <RecipeCard key={r.id} recipe={r} onChanged={reload} />)}
        </div>
      ) : (
        <div className="card empty">No favorites yet. Explore recipes and add some!</div>
      )}
    </div>
  );
}

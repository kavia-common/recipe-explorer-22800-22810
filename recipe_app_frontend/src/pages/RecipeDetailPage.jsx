import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRecipe, toggleFavorite } from '../api/recipes';
import { useAuth } from '../context/AuthContext';
import RecipeModal from '../components/RecipeModal';

export default function RecipeDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);

  const load = () => {
    setLoading(true);
    fetchRecipe(id).then(setRecipe).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [id]);

  const onFav = async () => {
    await toggleFavorite(id);
    load();
  };

  if (loading) return <div className="card" style={{padding:24}}>Loading...</div>;
  if (!recipe) return <div className="card" style={{padding:24}}>Recipe not found</div>;

  const cover = recipe.image_url || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop';

  return (
    <div className="card" style={{overflow:'hidden'}}>
      <div style={{position:'relative'}}>
        <img src={cover} alt={recipe.title} style={{width:'100%', height:320, objectFit:'cover'}} />
        <div style={{position:'absolute', inset:'auto 16px 16px 16px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <h2 style={{margin:0, color:'#fff', textShadow:'0 2px 10px rgba(0,0,0,.35)'}}>{recipe.title}</h2>
          <div style={{display:'flex', gap:8}}>
            <button className="btn secondary" onClick={onFav}>
              {recipe.is_favorite ? '★ Unfavorite' : '☆ Favorite'}
            </button>
            {user && (
              <button className="btn" onClick={() => setEditOpen(true)}>Edit</button>
            )}
          </div>
        </div>
      </div>
      <div style={{padding:20, display:'grid', gap:20, gridTemplateColumns: '1fr 1fr'}}>
        <div>
          <h3>Ingredients</h3>
          <ul>
            {(recipe.ingredients || []).map((i, idx) => <li key={idx}>{i}</li>)}
          </ul>
        </div>
        <div>
          <h3>Instructions</h3>
          <ol>
            {(recipe.instructions || []).map((i, idx) => <li key={idx} style={{marginBottom:8}}>{i}</li>)}
          </ol>
        </div>
      </div>
      {editOpen && <RecipeModal id={recipe.id} onClose={() => setEditOpen(false)} onSaved={load} />}
    </div>
  );
}

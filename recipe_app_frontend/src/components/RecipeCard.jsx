import { Link } from 'react-router-dom';
import { toggleFavorite } from '../api/recipes';

export default function RecipeCard({ recipe, onChanged }) {
  const cover = recipe.image_url || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop';

  const onFav = async (e) => {
    e.preventDefault();
    try {
      await toggleFavorite(recipe.id);
      onChanged && onChanged();
    } catch (e2) {
      // noop or toast
    }
  };

  return (
    <Link to={`/recipes/${recipe.id}`} className="card" style={{overflow:'hidden', display:'block'}}>
      <div style={{position:'relative'}}>
        <img src={cover} alt={recipe.title} style={{height:180, width:'100%', objectFit:'cover'}} />
        <button className="badge" onClick={onFav} style={{position:'absolute', top:12, right:12, background:'#fff'}}>
          {recipe.is_favorite ? '★' : '☆'} Favorite
        </button>
      </div>
      <div style={{padding:16}}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:8}}>
          <h3 style={{margin:'0 0 6px', fontSize:18}}>{recipe.title}</h3>
          <span className="badge" style={{color:'#2563EB', borderColor:'#DBEAFE', background:'#EFF6FF'}}>
            ⏱ {recipe.ready_in_minutes || recipe.cook_time || 30}m
          </span>
        </div>
        <p style={{margin:'0 0 8px', color:'#6B7280', fontSize:14}}>
          {recipe.description || 'A delightful dish to brighten your day.'}
        </p>
        {!!(recipe.tags && recipe.tags.length) && (
          <div style={{display:'flex', gap:8, flexWrap:'wrap', marginTop:8}}>
            {recipe.tags.slice(0,3).map((t) => (
              <span key={t} className="badge">{t}</span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

import { useEffect, useState } from 'react';
import { createRecipe, updateRecipe, fetchRecipe } from '../api/recipes';

// Basic modal with form
export default function RecipeModal({ id = null, onClose, onSaved }) {
  const isEdit = !!id;
  const [form, setForm] = useState({
    title: '',
    description: '',
    image_url: '',
    ingredients: '',
    instructions: '',
    cook_time: 30,
    tags: ''
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    fetchRecipe(id).then((r) => {
      setForm({
        title: r.title || '',
        description: r.description || '',
        image_url: r.image_url || '',
        ingredients: Array.isArray(r.ingredients) ? r.ingredients.join('\n') : (r.ingredients || ''),
        instructions: Array.isArray(r.instructions) ? r.instructions.join('\n') : (r.instructions || ''),
        cook_time: r.cook_time || 30,
        tags: (r.tags || []).join(', ')
      });
    });
  }, [id, isEdit]);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        cook_time: Number(form.cook_time) || 30,
        tags: form.tags ? form.tags.split(',').map(s => s.trim()).filter(Boolean) : [],
        ingredients: form.ingredients ? form.ingredients.split('\n').map(s => s.trim()).filter(Boolean) : [],
        instructions: form.instructions ? form.instructions.split('\n').map(s => s.trim()).filter(Boolean) : [],
      };
      if (isEdit) await updateRecipe(id, payload);
      else await createRecipe(payload);
      onSaved && onSaved();
      onClose && onClose();
    } catch (err) {
      // placeholder error handling
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{
      position:'fixed', inset:0, background:'rgba(17,24,39,.45)', display:'grid', placeItems:'center', zIndex:50
    }}>
      <div className="card" style={{width:'min(720px, 96vw)', padding:20}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
          <h3 style={{margin:0}}>{isEdit ? 'Edit Recipe' : 'Create Recipe'}</h3>
          <button className="badge" onClick={onClose}>✕ Close</button>
        </div>
        <form onSubmit={submit} style={{display:'grid', gap:12}}>
          <div style={{display:'grid', gap:12, gridTemplateColumns:'1fr 1fr'}}>
            <div>
              <label>Title</label>
              <input className="input" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} required />
            </div>
            <div>
              <label>Cook time (minutes)</label>
              <input className="input" type="number" min="1" value={form.cook_time} onChange={e=>setForm(f=>({...f,cook_time:e.target.value}))} />
            </div>
          </div>
          <div>
            <label>Description</label>
            <input className="input" value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} />
          </div>
          <div>
            <label>Image URL</label>
            <input className="input" value={form.image_url} onChange={e=>setForm(f=>({...f,image_url:e.target.value}))} />
          </div>
          <div style={{display:'grid', gap:12, gridTemplateColumns:'1fr 1fr'}}>
            <div>
              <label>Ingredients (one per line)</label>
              <textarea className="textarea" rows="6" value={form.ingredients} onChange={e=>setForm(f=>({...f,ingredients:e.target.value}))} />
            </div>
            <div>
              <label>Instructions (one per line)</label>
              <textarea className="textarea" rows="6" value={form.instructions} onChange={e=>setForm(f=>({...f,instructions:e.target.value}))} />
            </div>
          </div>
          <div>
            <label>Tags (comma separated)</label>
            <input className="input" value={form.tags} onChange={e=>setForm(f=>({...f,tags:e.target.value}))} />
          </div>
          <div style={{display:'flex', gap:10, justifyContent:'flex-end', marginTop:8}}>
            <button type="button" className="btn secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn" disabled={saving}>{saving ? 'Saving...' : 'Save Recipe'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

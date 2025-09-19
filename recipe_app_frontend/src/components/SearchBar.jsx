import { useEffect, useState } from 'react';

// PUBLIC_INTERFACE
export default function SearchBar({ initial = '', onChange }) {
  /** Debounced search input */
  const [value, setValue] = useState(initial);

  useEffect(() => {
    const id = setTimeout(() => onChange && onChange(value), 400);
    return () => clearTimeout(id);
  }, [value, onChange]);

  return (
    <div className="card" style={{padding:10, display:'flex', gap:10, alignItems:'center'}}>
      <div className="badge" style={{background:'#fff'}}>🔎</div>
      <input
        className="input"
        placeholder="Search recipes, ingredients, categories..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

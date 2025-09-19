import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');

  return (
    <div className="card" style={{padding:20, maxWidth:720}}>
      <h2 style={{marginTop:0}}>Your Profile</h2>
      <div style={{display:'grid', gap:12}}>
        <div>
          <label>Name</label>
          <input className="input" value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" />
        </div>
        <div>
          <label>Email</label>
          <input className="input" value={user?.email || ''} disabled />
        </div>
        <div style={{display:'flex', gap:10, justifyContent:'flex-end'}}>
          <button className="btn secondary" type="button" disabled>Cancel</button>
          <button className="btn" type="button" disabled>Save (backend hook up)</button>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { login } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { user } = await login(form.email, form.password);
      setUser(user);
      navigate('/');
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{maxWidth:480, margin:'0 auto', padding:20}}>
      <h2 style={{marginTop:0}}>Welcome back</h2>
      <p style={{color:'#6B7280'}}>Log in to manage your recipes and favorites.</p>
      <form onSubmit={submit} style={{display:'grid', gap:12}}>
        <div>
          <label>Email</label>
          <input className="input" type="email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} required />
        </div>
        <div>
          <label>Password</label>
          <input className="input" type="password" value={form.password} onChange={e=>setForm(f=>({...f,password:e.target.value}))} required />
        </div>
        {error && <div className="badge" style={{borderColor:'#FECACA', background:'#FEE2E2', color:'#B91C1C'}}>{error}</div>}
        <button className="btn" type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Log in'}</button>
      </form>
      <div style={{marginTop:12, color:'#6B7280'}}>
        New here? <Link to="/signup" style={{color:'#2563EB'}}>Create an account</Link>
      </div>
    </div>
  );
}

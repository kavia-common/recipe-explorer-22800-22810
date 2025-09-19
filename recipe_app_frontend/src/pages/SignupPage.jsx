import { useState } from 'react';
import { signup } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function SignupPage() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:'', email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { user } = await signup(form.name, form.email, form.password);
      setUser(user);
      navigate('/');
    } catch (err) {
      setError('Signup failed. Try a different email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{maxWidth:480, margin:'0 auto', padding:20}}>
      <h2 style={{marginTop:0}}>Create your account</h2>
      <p style={{color:'#6B7280'}}>Join Recipe Explorer to save and create recipes.</p>
      <form onSubmit={submit} style={{display:'grid', gap:12}}>
        <div>
          <label>Name</label>
          <input className="input" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} required />
        </div>
        <div>
          <label>Email</label>
          <input className="input" type="email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} required />
        </div>
        <div>
          <label>Password</label>
          <input className="input" type="password" value={form.password} onChange={e=>setForm(f=>({...f,password:e.target.value}))} required />
        </div>
        {error && <div className="badge" style={{borderColor:'#FECACA', background:'#FEE2E2', color:'#B91C1C'}}>{error}</div>}
        <button className="btn" type="submit" disabled={loading}>{loading ? 'Creating...' : 'Sign up'}</button>
      </form>
      <div style={{marginTop:12, color:'#6B7280'}}>
        Already have an account? <Link to="/login" style={{color:'#2563EB'}}>Log in</Link>
      </div>
    </div>
  );
}

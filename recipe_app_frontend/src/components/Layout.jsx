import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import RecipeModal from './RecipeModal';

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="navbar">
        <div className="navbar-inner container" style={{paddingLeft:0,paddingRight:0}}>
          <div className="nav-left">
            <div className="logo">
              <div className="logo-badge">🍳</div>
              <div>
                <div style={{fontSize:14, color:'#6B7280'}}>Ocean Professional</div>
                <div style={{fontSize:18}}>Recipe Explorer</div>
              </div>
            </div>
            <NavLink to="/" className={({isActive}) => `nav-link ${isActive ? 'active':''}`}>Discover</NavLink>
            <NavLink to="/favorites" className={({isActive}) => `nav-link ${isActive ? 'active':''}`}>Favorites</NavLink>
            {user && (
              <NavLink to="/profile" className={({isActive}) => `nav-link ${isActive ? 'active':''}`}>Profile</NavLink>
            )}
          </div>
          <div className="nav-right">
            <button className="btn secondary" onClick={() => setOpenModal(true)}>
              <span style={{color:'#2563EB'}}>＋</span> New Recipe
            </button>
            {!user ? (
              <>
                <button className="btn secondary" onClick={() => navigate('/login')}>Log in</button>
                <button className="btn" onClick={() => navigate('/signup')}>
                  Get Started
                </button>
              </>
            ) : (
              <button className="btn" onClick={() => { logout(); navigate('/'); }}>
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
      <main className="container" style={{paddingTop:24}}>
        {children}
      </main>
      {openModal && (
        <RecipeModal onClose={() => setOpenModal(false)} />
      )}
    </>
  );
}

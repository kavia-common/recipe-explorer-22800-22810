import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import './App.css';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { AuthProvider, useAuth } from './context/AuthContext';

// PUBLIC_INTERFACE
function ProtectedRoute({ children }) {
  /** Protects routes that require an authenticated user */
  const { user, loading } = useAuth();
  if (loading) return <div className="container"><div className="card" style={{padding:24}}>Loading...</div></div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

// PUBLIC_INTERFACE
function App() {
  /** Root app with Router and Layout */
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recipes/:id" element={<RecipeDetailPage />} />
            <Route path="/favorites" element={<ProtectedRoute><FavoritesPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

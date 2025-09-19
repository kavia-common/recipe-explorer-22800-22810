import { createContext, useContext, useEffect, useState } from 'react';
import { fetchMe, logout as apiLogout } from '../api/auth';

const AuthContext = createContext({ user: null, loading: true });

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  /** Provides user session state */
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load current user if token exists
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      setLoading(false);
      return;
    }
    fetchMe()
      .then(setUser)
      .catch(() => {
        localStorage.removeItem('auth_token');
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const value = {
    user,
    setUser,
    loading,
    logout: () => {
      apiLogout();
      setUser(null);
    }
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// PUBLIC_INTERFACE
export function useAuth() {
  /** Hook to access auth state */
  return useContext(AuthContext);
}

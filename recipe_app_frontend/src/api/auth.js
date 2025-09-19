import { api } from './client';
import { setAuthToken } from './client';

// PUBLIC_INTERFACE
export async function login(email, password) {
  /** Login and store token */
  const { data } = await api.post('/auth/login', { email, password });
  const { token, user } = data;
  setAuthToken(token);
  return { user, token };
}

// PUBLIC_INTERFACE
export async function signup(name, email, password) {
  /** Signup and store token */
  const { data } = await api.post('/auth/signup', { name, email, password });
  const { token, user } = data;
  setAuthToken(token);
  return { user, token };
}

// PUBLIC_INTERFACE
export async function fetchMe() {
  /** Fetch current user profile */
  const { data } = await api.get('/users/me');
  return data;
}

// PUBLIC_INTERFACE
export function logout() {
  /** Clear token */
  setAuthToken(null);
}

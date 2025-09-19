import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

// Attach token when available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// PUBLIC_INTERFACE
export function setAuthToken(token) {
  /** Set or clear the auth token globally */
  if (!token) {
    localStorage.removeItem('auth_token');
  } else {
    localStorage.setItem('auth_token', token);
  }
}

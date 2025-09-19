import { api } from './client';

// PUBLIC_INTERFACE
export async function fetchRecipes(params = {}) {
  /** Fetch list of recipes with optional filters: q, category, page */
  const { data } = await api.get('/recipes', { params });
  return data;
}

// PUBLIC_INTERFACE
export async function fetchRecipe(id) {
  /** Fetch a single recipe by id */
  const { data } = await api.get(`/recipes/${id}`);
  return data;
}

// PUBLIC_INTERFACE
export async function createRecipe(payload) {
  /** Create a new recipe with payload fields */
  const { data } = await api.post('/recipes', payload);
  return data;
}

// PUBLIC_INTERFACE
export async function updateRecipe(id, payload) {
  /** Update a recipe by id */
  const { data } = await api.put(`/recipes/${id}`, payload);
  return data;
}

// PUBLIC_INTERFACE
export async function deleteRecipe(id) {
  /** Delete recipe by id */
  const { data } = await api.delete(`/recipes/${id}`);
  return data;
}

// PUBLIC_INTERFACE
export async function toggleFavorite(recipeId) {
  /** Toggle favorite for a given recipe */
  const { data } = await api.post(`/recipes/${recipeId}/favorite`);
  return data;
}

// PUBLIC_INTERFACE
export async function getFavorites() {
  /** Get current user's favorite recipes */
  const { data } = await api.get('/users/me/favorites');
  return data;
}

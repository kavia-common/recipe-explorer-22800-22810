# Recipe Explorer Frontend

Modern React UI for browsing, searching, and managing recipes with Ocean Professional styling.

## Features
- Modern, responsive UI (grid/list views, detailed recipe pages)
- User authentication (login, signup, session persistence)
- Mark/unmark favorites and see favorites per user
- Create/edit recipes using modal dialogs
- Multi-page routing with react-router
- Axios-based API client configurable via env
- Ocean Professional theme: primary #2563EB, accent #F59E0B, minimalist design

## Setup

1) Install dependencies
   npm install

2) Configure environment
   cp .env.example .env
   # edit REACT_APP_API_BASE_URL to match your backend (default http://localhost:5000)

3) Run the app
   npm start
   # open http://localhost:3000

4) Build for production
   npm run build

## Project Structure
- src/api/*: Axios client and typed API calls (auth, recipes)
- src/context/AuthContext.js: User session provider
- src/components/*: UI components including RecipeCard, Modal, Layout, SearchBar
- src/pages/*: Route pages (Home, Detail, Favorites, Profile, Login, Signup)
- src/hooks/*: Data-fetching hooks (recipes, favorites)
- src/index.css: Global Ocean Professional theme styles

## Environment Variables
- REACT_APP_API_BASE_URL: Base URL for Flask backend, e.g. http://localhost:5000

## Backend Endpoints (expected)
- POST /auth/login, POST /auth/signup, GET /users/me
- GET /recipes, GET /recipes/:id, POST /recipes, PUT /recipes/:id, DELETE /recipes/:id
- POST /recipes/:id/favorite, GET /users/me/favorites

Notes:
- The UI gracefully handles absent backend endpoints but some actions will no-op until the backend is implemented.
- Replace placeholder images by setting image_url on recipes.

## Style Guide
Ocean Professional:
- Primary: #2563EB (blue)
- Accent: #F59E0B (amber)
- Error: #EF4444
- Background: #f9fafb
- Surface: #ffffff
- Typography: Inter or system UI
- Subtle shadows, gradients, rounded corners, smooth transitions


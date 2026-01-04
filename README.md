# goit-neo-react-hw-module5 — Movie Search (Routing)

React app with routing for searching movies by title using TMDB API.

## Links (add before submit)

- GitHub repo: https://github.com/Bedu1441/goit-neo-react-hw-module5
- Vercel live page: <PASTE_YOUR_VERCEL_LINK_HERE>

---

## Requirements checklist (GoIT)

- Project created with **Vite**
- No errors/warnings in console on start
- **React Router** used for navigation
- Code splitting using **React.lazy** + **Suspense**
- Styling via **CSS Modules**
- Folder structure:
  - `src/components/<ComponentName>/<ComponentName>.jsx` + `<ComponentName>.module.css`
  - `src/pages/<PageName>/<PageName>.jsx` + `<PageName>.module.css`
- Default export for all components: `export default`

---

## App Routes

- `/` — **HomePage**: trending movies (TMDB Trending)
- `/movies` — **MoviesPage**: search movies by keyword (TMDB Search)
- `/movies/:movieId` — **MovieDetailsPage**: movie details (TMDB Movie Details)
  - `/movies/:movieId/cast` — **MovieCast**: cast info (TMDB Credits)
  - `/movies/:movieId/reviews` — **MovieReviews**: reviews (TMDB Reviews)
- `*` — **NotFoundPage** with Link to Home

---

## TMDB API setup

This project uses **TMDB API Read Access Token**.

Create `.env` in project root:

```env
VITE_TMDB_TOKEN=PASTE_YOUR_API_READ_ACCESS_TOKEN_HERE
VITE_TMDB_BASE=https://api.themoviedb.org/3
Token is sent in every request in the Authorization: Bearer <token> header.

Images

TMDB returns only a file path (example):
/1E5baAaEse26fej7uHcjOgEE2t2.jpg

Full URL is formed like:
https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg

Run locally

Install dependencies:

npm install

Start dev server:
npm run dev

Build:
npm run build

Preview build:
npm run preview

Main features (what to check)
HomePage loads trending movies on mount (useEffect)
MoviesPage:
uses useSearchParams
submit updates query param
useEffect loads movies when query changes
MovieList:
renders Link to /movies/:movieId
passes state={location} using useLocation
MovieDetailsPage:
uses useParams to get movieId
loads details on movieId change
nested navigation: cast and reviews
has Outlet for nested routes
Go back returns to previous page via useRef(location.state) or fallback to /movies
MovieCast / MovieReviews:
load data by movieId
show message if no data

Deploy (Vercel)
Import repo in Vercel
Framework: Vite
Build command: npm run build
Output directory: dist
Add Environment Variables:
VITE_TMDB_TOKEN
VITE_TMDB_BASE (optional)
```

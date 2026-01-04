import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList.jsx";
import { getTrendingMovies } from "../../services/tmdbApi.js";
import css from "./HomePage.module.css";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        setError("");
        setIsLoading(true);
        const data = await getTrendingMovies();
        if (isMounted) setMovies(data);
      } catch (err) {
        if (isMounted) setError("Failed to load trending movies.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className={css.section}>
      <h1 className={css.title}>Trending today</h1>

      {isLoading && <p>Loading...</p>}
      {error && <p className={css.error}>{error}</p>}

      {movies.length > 0 && <MovieList movies={movies} />}
    </section>
  );
}

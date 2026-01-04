import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList.jsx";
import { searchMovies } from "../../services/tmdbApi.js";
import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  const [movies, setMovies] = useState([]);
  const [input, setInput] = useState(query);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function load() {
      if (!query.trim()) {
        setMovies([]);
        return;
      }

      try {
        setError("");
        setIsLoading(true);
        const data = await searchMovies(query.trim());
        if (isMounted) setMovies(data);
      } catch (err) {
        if (isMounted) setError("Search failed. Try again.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = input.trim();

    if (!next) {
      setSearchParams({});
      return;
    }

    setSearchParams({ query: next });
  };

  return (
    <section className={css.section}>
      <h1 className={css.title}>Movie search</h1>

      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search movies..."
        />
        <button className={css.button} type="submit">
          Search
        </button>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p className={css.error}>{error}</p>}

      {movies.length > 0 && <MovieList movies={movies} />}
      {!isLoading && query.trim() && movies.length === 0 && (
        <p>No movies found.</p>
      )}
    </section>
  );
}

import { useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { getMovieDetails, getPosterUrl } from "../../services/tmdbApi.js";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/movies");

  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        setError("");
        setIsLoading(true);
        const data = await getMovieDetails(movieId);
        if (isMounted) setMovie(data);
      } catch (err) {
        if (isMounted) setError("Failed to load movie details.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, [movieId]);

  return (
    <section className={css.section}>
      <Link className={css.back} to={backLinkRef.current}>
        ← Go back
      </Link>

      {isLoading && <p>Loading...</p>}
      {error && <p className={css.error}>{error}</p>}

      {movie && (
        <>
          <div className={css.card}>
            {movie.poster_path ? (
              <img
                className={css.poster}
                src={getPosterUrl(movie.poster_path)}
                alt={movie.title}
              />
            ) : (
              <div className={css.noPoster}>No poster</div>
            )}

            <div className={css.info}>
              <h1 className={css.title}>
                {movie.title}{" "}
                {movie.release_date
                  ? `(${movie.release_date.slice(0, 4)})`
                  : ""}
              </h1>

              <p className={css.text}>
                <b>User score:</b>{" "}
                {typeof movie.vote_average === "number"
                  ? Math.round(movie.vote_average * 10) + "%"
                  : "N/A"}
              </p>

              <h2 className={css.subtitle}>Overview</h2>
              <p className={css.text}>{movie.overview || "No overview."}</p>

              <h2 className={css.subtitle}>Genres</h2>
              <p className={css.text}>
                {movie.genres?.length
                  ? movie.genres.map((g) => g.name).join(", ")
                  : "No genres."}
              </p>
            </div>
          </div>

          <div className={css.extra}>
            <h2 className={css.subtitle}>Additional information</h2>

            <nav className={css.subnav}>
              <NavLink className={css.sublink} to="cast">
                Cast
              </NavLink>
              <NavLink className={css.sublink} to="reviews">
                Reviews
              </NavLink>
            </nav>

            <div className={css.outlet}>
              <Outlet />
            </div>
          </div>
        </>
      )}
    </section>
  );
}

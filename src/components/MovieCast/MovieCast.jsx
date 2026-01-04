import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCredits, getPosterUrl } from "../../services/tmdbApi.js";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();

  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        setError("");
        setIsLoading(true);
        const data = await getMovieCredits(movieId);
        if (isMounted) setCast(data);
      } catch (err) {
        if (isMounted) setError("Failed to load cast.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, [movieId]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className={css.error}>{error}</p>;

  if (!cast || cast.length === 0) {
    return <p>No cast information available.</p>;
  }

  return (
    <ul className={css.list}>
      {cast.map((actor) => (
        <li key={actor.cast_id ?? actor.credit_id} className={css.item}>
          {actor.profile_path ? (
            <img
              className={css.img}
              src={getPosterUrl(actor.profile_path)}
              alt={actor.name}
            />
          ) : (
            <div className={css.noImg}>No photo</div>
          )}

          <p className={css.name}>{actor.name}</p>
          <p className={css.role}>Character: {actor.character || "—"}</p>
        </li>
      ))}
    </ul>
  );
}

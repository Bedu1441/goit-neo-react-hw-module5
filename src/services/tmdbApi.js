import axios from "axios";

const baseURL = import.meta.env.VITE_TMDB_BASE || "https://api.themoviedb.org/3";
const token = import.meta.env.VITE_TMDB_TOKEN;

const api = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const getTrendingMovies = async () => {
  const { data } = await api.get("/trending/movie/day", {
    params: { language: "en-US" },
  });
  return data.results;
};

export const searchMovies = async (query) => {
  const { data } = await api.get("/search/movie", {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page: 1,
    },
  });
  return data.results;
};

export const getMovieDetails = async (movieId) => {
  const { data } = await api.get(`/movie/${movieId}`, {
    params: { language: "en-US" },
  });
  return data;
};

export const getMovieCredits = async (movieId) => {
  const { data } = await api.get(`/movie/${movieId}/credits`, {
    params: { language: "en-US" },
  });
  return data.cast;
};

export const getMovieReviews = async (movieId) => {
  const { data } = await api.get(`/movie/${movieId}/reviews`, {
    params: { language: "en-US", page: 1 },
  });
  return data.results;
};

export const getPosterUrl = (path) => {
  if (!path) return "";
  return `https://image.tmdb.org/t/p/w500${path}`;
};

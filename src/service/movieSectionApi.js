import apiCache from "../utils/apiCache";

const apiKey = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

export const getMovies = async (moviesName) => {
  const requests = moviesName.map((name) =>
    apiCache(`${BASE_URL}?t=${encodeURIComponent(name)}&apikey=${apiKey}`),
  );
  return await Promise.all(requests);
};

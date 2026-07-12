import apiCache from "../utils/apiCache";

const apiKey = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

export const getMovieDetails = async (id) => {
  const res = await apiCache(`${BASE_URL}?i=${id}&apikey=${apiKey}`);
  return res;
};

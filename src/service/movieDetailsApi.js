import detailsCache from "../utils/detailsCache";

const apiKey = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

export const getMovieDetails = async (id) => {
  const res = await detailsCache(`${BASE_URL}?i=${id}&apikey=${apiKey}`, id);
  console.log(res);
  return res;
};

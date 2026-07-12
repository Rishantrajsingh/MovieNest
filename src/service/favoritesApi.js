import apiCache from "../utils/apiCache";

const apiKey = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

export const getFavoriteMovies = async () => {
  const favMovies = JSON.parse(localStorage.getItem("favMovies")) || [];

  if (favMovies.length === 0) {
    return [];
  }

  const requests = favMovies.map((movie) =>
    apiCache(`${BASE_URL}?i=${movie.id}&apikey=${apiKey}`),
  );

  const responses = await Promise.all(requests);

  return responses.filter((movie) => movie && movie.Response !== "False");
};

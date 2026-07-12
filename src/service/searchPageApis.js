import apiCache from "../utils/apiCache";

const apiKey = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

export const getDefaultMovies = async (movieNames) => {
  console.log(movieNames);
  const requests = movieNames.map((movie) =>
    apiCache(`${BASE_URL}?apikey=${apiKey}&t=${encodeURIComponent(movie)}`),
  );

  const responses = await Promise.all(requests);

  const validMovies = responses
    .map((movie) => movie?.data || movie)
    .filter((movie) => movie && movie.Response !== "False");

  return validMovies;
};

export const getSearchedMovies = async (searchText, pageNumber = 1) => {
  const res = await apiCache(
    `${BASE_URL}?apikey=${apiKey}&s=${encodeURIComponent(
      searchText,
    )}&page=${pageNumber}`,
  );

  return res.Search;
};

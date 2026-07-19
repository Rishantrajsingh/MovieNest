import movieCache from "../utils/movieCache";
import searchCache from "../utils/searchCache";

const apiKey = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

export const getDefaultMovies = async (movieNames) => {
  const requests = movieNames.map((name) =>
    movieCache(
      `${BASE_URL}?apikey=${apiKey}&t=${encodeURIComponent(name)}`,
      name,
    ),
  );

  const responses = await Promise.all(requests);

  const validMovies = responses
    .map((movie) => movie?.data || movie)
    .filter((movie) => movie && movie.Response !== "False");

  return validMovies;
};

export const getSearchedMovies = async (searchText, pageNumber = 1) => {
  const url = `${BASE_URL}?apikey=${apiKey}&s=${encodeURIComponent(
    searchText,
  )}&page=${pageNumber}`;

  const data = await searchCache(url, searchText, pageNumber);
  console.log(data.Search);
  return data.Search || [];
};

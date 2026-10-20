import detailsCache from "../utils/detailsCache";

const apiKey = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";
const FAVORITES_KEY = "movienest_favorites";

export const getFavoriteMovies = async () => {
  try {
    const savedFavorites = localStorage.getItem(FAVORITES_KEY);

    if (!savedFavorites) return [];

    const favorites = JSON.parse(savedFavorites);

    if (!Array.isArray(favorites) || favorites.length === 0) {
      return [];
    }

    // Favorites already stored as complete movie objects
    const savedMovies = favorites.filter(
      (item) => typeof item === "object" && item !== null,
    );

    // Support older format where only movie IDs were stored
    const favoriteIds = favorites.filter((item) => typeof item === "string");

    const fetchedMovies = await Promise.all(
      favoriteIds.map((id) =>
        detailsCache(
          `${BASE_URL}?i=${encodeURIComponent(id)}&apikey=${apiKey}`,
          id,
        ),
      ),
    );

    return [
      ...savedMovies,
      ...fetchedMovies.filter((movie) => movie && movie.Response !== "False"),
    ];
  } catch (error) {
    console.error("Failed to load favorite movies:", error);
    return [];
  }
};

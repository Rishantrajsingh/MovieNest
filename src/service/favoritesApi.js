import detailsCache from "../utils/detailsCache";

const apiKey = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

export const getFavoriteMovies = async (uid) => {
  if (!uid) return [];

  try {
    const storageKey = `movienest_favorites_${uid}`;
    const savedFavorites = localStorage.getItem(storageKey);

    if (!savedFavorites) return [];

    const favorites = JSON.parse(savedFavorites);

    if (!Array.isArray(favorites) || favorites.length === 0) {
      return [];
    }

    // Already-saved movie objects
    const savedMovies = favorites.filter(
      (item) => typeof item === "object" && item !== null,
    );

    // Older format: favorite movie IDs
    const favoriteIds = favorites.filter((item) => typeof item === "string");

    const fetchedMovies = await Promise.all(
      favoriteIds.map((id) =>
        detailsCache(
          `${BASE_URL}?i=${encodeURIComponent(id)}&apikey=${apiKey}`,
          id,
        ),
      ),
    );

    return [...savedMovies, ...fetchedMovies.filter(Boolean)];
  } catch (error) {
    console.error("Failed to load favorite movies:", error);
    return [];
  }
};

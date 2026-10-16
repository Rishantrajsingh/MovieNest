import axios from "axios";

const CACHE_DURATION = 24 * 60 * 60 * 1000;
const CACHE_PREFIX = "movienest_details_cache_";

const detailsCache = async (url, movieId) => {
  const cacheKey = `${CACHE_PREFIX}${encodeURIComponent(
    String(movieId || url)
      .trim()
      .toLowerCase(),
  )}`;

  // Read cached details
  try {
    const cachedItem = localStorage.getItem(cacheKey);

    if (cachedItem) {
      const cached = JSON.parse(cachedItem);
      const isExpired =
        !cached.cachedAt || Date.now() - cached.cachedAt > CACHE_DURATION;

      if (!isExpired && cached.data) {
        console.log("Movie details cache hit:", movieId);
        return cached.data;
      }

      localStorage.removeItem(cacheKey);
      console.log("Movie details cache expired:", movieId);
    } else {
      console.log("Movie details cache miss:", movieId);
    }
  } catch (error) {
    console.warn("Could not read movie details cache:", error);
  }

  // Fetch fresh details
  try {
    const response = await axios.get(url);
    const movieData = response.data;

    if (!movieData || movieData.Response === "False") {
      return movieData;
    }

    // Store details for 24 hours
    try {
      localStorage.setItem(
        cacheKey,
        JSON.stringify({
          data: movieData,
          cachedAt: Date.now(),
        }),
      );
    } catch (error) {
      console.warn("Could not save movie details cache:", error);
    }

    return movieData;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

export default detailsCache;

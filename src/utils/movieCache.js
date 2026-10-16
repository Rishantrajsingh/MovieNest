import axios from "axios";

const CACHE_DURATION = 24 * 60 * 60 * 1000;
const CACHE_PREFIX = "movienest_movie_cache_";

const movieCache = async (url, movieName) => {
  const cacheKey = `${CACHE_PREFIX}${String(movieName || url)
    .trim()
    .toLowerCase()}`;

  // Read cached movie data from localStorage
  try {
    const cachedItem = localStorage.getItem(cacheKey);

    if (cachedItem) {
      const cached = JSON.parse(cachedItem);
      const isExpired =
        !cached.cachedAt || Date.now() - cached.cachedAt > CACHE_DURATION;

      if (!isExpired && cached.data) {
        console.log("Movie cache hit:", movieName);
        return cached.data;
      }

      localStorage.removeItem(cacheKey);
      console.log("Movie cache expired:", movieName);
    } else {
      console.log("Movie cache miss:", movieName);
    }
  } catch (error) {
    console.warn("Could not read movie cache:", error);
  }

  // Fetch fresh data from the API
  try {
    const response = await axios.get(url);
    const movieData = response.data;

    if (!movieData || movieData.Response === "False") {
      return movieData;
    }

    // Save movie data locally for 24 hours
    try {
      localStorage.setItem(
        cacheKey,
        JSON.stringify({
          data: movieData,
          cachedAt: Date.now(),
        }),
      );
    } catch (error) {
      // App still works if localStorage is full or unavailable
      console.warn("Could not save movie cache:", error);
    }

    return movieData;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    throw error;
  }
};

export default movieCache;

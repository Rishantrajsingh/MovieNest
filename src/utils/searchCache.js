import axios from "axios";

const CACHE_DURATION = 24 * 60 * 60 * 1000;
const CACHE_PREFIX = "movienest_search_cache_";

const searchCache = async (url, searchText, pageNumber) => {
  const normalizedSearch = String(searchText || "")
    .trim()
    .toLowerCase();

  const cacheKey = `${CACHE_PREFIX}${encodeURIComponent(
    normalizedSearch,
  )}_${pageNumber}`;

  // Check localStorage cache
  try {
    const cachedItem = localStorage.getItem(cacheKey);

    if (cachedItem) {
      const cached = JSON.parse(cachedItem);
      const isExpired =
        !cached.cachedAt || Date.now() - cached.cachedAt > CACHE_DURATION;

      if (!isExpired && cached.data) {
        console.log("Search cache hit:", normalizedSearch, pageNumber);
        return cached.data;
      }

      localStorage.removeItem(cacheKey);
      console.log("Search cache expired:", normalizedSearch, pageNumber);
    } else {
      console.log("Search cache miss:", normalizedSearch, pageNumber);
    }
  } catch (error) {
    console.warn("Could not read search cache:", error);
  }

  // Fetch fresh search results
  try {
    const response = await axios.get(url);
    const searchData = response.data;

    if (!searchData || searchData.Response === "False") {
      return searchData;
    }

    // Cache successful results for 24 hours
    try {
      localStorage.setItem(
        cacheKey,
        JSON.stringify({
          data: searchData,
          cachedAt: Date.now(),
        }),
      );
    } catch (error) {
      console.warn("Could not save search cache:", error);
    }

    return searchData;
  } catch (error) {
    console.error("Error while caching search results:", error);
    throw error;
  }
};

export default searchCache;

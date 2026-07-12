import axios from "axios";

const apiCache = async (url) => {
  try {
    // create unique cache key
    const cacheKey = `cache_${url}`;

    // check cache
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      const parsedData = JSON.parse(cachedData);

      const currentTime = Date.now();

      // cache valid for 24 hours
      const cacheLimit = 24 * 60 * 60 * 1000;

      if (currentTime - parsedData.time < cacheLimit) {
        console.log("api hit");
        return parsedData.data;
      }
      console.log("api expired");
      // remove old cache
      localStorage.removeItem(cacheKey);
    }

    // fetch new data

    const response = await axios.get(url);
    const data = response.data;

    // save to cache
    const cacheObject = {
      data: data,
      time: Date.now(),
    };

    localStorage.setItem(cacheKey, JSON.stringify(cacheObject));
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default apiCache;

import axios from "axios";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

const database = db;

const searchCache = async (url, searchText, pageNumber) => {
  try {
    const docRef = doc(
      database,
      "searchedMovies",
      `${searchText.toLowerCase()}_${pageNumber}`,
    );
    const docSnap = await getDoc(docRef);

    const cacheTime = 24 * 60 * 60 * 1000;

    if (docSnap.exists()) {
      const cachedData = docSnap.data();
      const cachedAt = docSnap.data().cachedAt;

      const isExpired = Date.now() - cachedAt > cacheTime;

      if (!isExpired) {
        console.log("Caching");
        console.log(cachedData);
        return cachedData;
      }

      console.log("cache expired");
    } else {
      console.log("cache miss");
    }

    const response = await axios.get(url);
    console.log(response.data);

    const searchData = {
      ...response.data,
      cachedAt: Date.now(),
    };

    await setDoc(docRef, searchData);

    return searchData;
  } catch (error) {
    console.log("Error while caching", error);
  }
};

export default searchCache;

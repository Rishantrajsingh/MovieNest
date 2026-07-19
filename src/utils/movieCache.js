import axios from "axios";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

const database = db;

const movieCache = async (url, movieName) => {
  try {
    const docRef = doc(database, "movies", movieName);
    const docSnap = await getDoc(docRef);

    const cacheTime = 24 * 60 * 60 * 1000;

    if (docSnap.exists()) {
      const cachedData = docSnap.data();
      const cachedAt = docSnap.data().cachedAt;

      const isExpired = Date.now() - cachedAt > cacheTime;

      if (!isExpired) {
        console.log("Caching");
        return cachedData;
      }

      console.log("cache expired");
    } else {
      console.log("cache miss");
    }

    const response = await axios.get(url);

    const movieData = {
      ...response.data,
      cachedAt: Date.now(),
    };

    await setDoc(docRef, movieData);

    return movieData;
  } catch (error) {
    console.log("Error while caching", error);
  }
};

export default movieCache;

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import detailsCache from "../utils/detailsCache";

const apiKey = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

export const getFavoriteMovies = async (uid) => {
  const snapshot = await getDocs(collection(db, "users", uid, "favorites"));
  console.log(snapshot.docs);
  const favoriteIds = snapshot.docs.map((doc) => doc.id);

  if (favoriteIds.length === 0) return [];

  const movies = await Promise.all(
    favoriteIds.map((id) =>
      detailsCache(`${BASE_URL}?i=${id}&apikey=${apiKey}`, id),
    ),
  );

  return movies.filter(Boolean);
};

import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import CategoryLoader from "../components/CategoryLoader";
import { noPoster } from "../constants/imageConstants";
import { getFavoriteMovies } from "../service/favoritesApi";
import { collection, deleteDoc, getDocs, doc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useFirebase } from "../context/FirebaseContext";

const Favorites = () => {
  const { user } = useFirebase();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchMovies = async () => {
      try {
        setLoading(true);

        const data = await getFavoriteMovies(user.uid);

        setMovies(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [user]);

  const removeFromFav = async (id) => {
    if (!user) return;

    await deleteDoc(doc(db, "users", user.uid, "favorites", id));

    setMovies((prev) => prev.filter((movie) => movie.imdbID !== id));
  };

  const clearAllFavorites = async () => {
    if (!user) return;

    const snapshot = await getDocs(
      collection(db, "users", user.uid, "favorites"),
    );

    const deletePromises = snapshot.docs.map((docSnap) =>
      deleteDoc(docSnap.ref),
    );

    await Promise.all(deletePromises);

    setMovies([]);
  };

  // const removeFromFav = (id) => {
  //   const favMovies = JSON.parse(localStorage.getItem("favMovies")) || [];

  //   const updated = favMovies.filter((movie) => movie.id !== id);

  //   localStorage.setItem("favMovies", JSON.stringify(updated));

  //   setMovies((prev) => prev.filter((movie) => movie.imdbID !== id));
  // };

  // // clear all favorites
  // const clearAllFavorites = () => {
  //   localStorage.removeItem("favMovies");
  //   setMovies([]);
  // };

  if (movies.length === 0) {
    return (
      <div className="relative overflow-hidden min-h-screen w-full p-5 bg-slate-950 flex flex-col justify-center">
        {/* background gradient */}
        <div className="fixed top-0 left-0 w-125 h-125 bg-purple-700/20 blur-3xl rounded-full z-0"></div>
        <div className="fixed bottom-0 right-0 w-100 h-100 bg-pink-600/20 blur-3xl rounded-full z-0"></div>

        <div className="fixed top-0 left-0 z-20 bg-slate-950 w-full py-5 px-4">
          <Header searchBtn={true} favbtn={false} />
        </div>

        <h2 className="relative z-10 text-center text-white text-xl">
          Your favorites list is empty 😢 <br />
          Go to Home and add some movies 🎬
        </h2>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden min-h-screen w-full py-5 bg-slate-950 flex flex-col gap-5">
      {/* background gradient */}
      <div className="fixed top-0 left-0 w-125 h-125 bg-purple-700/20 blur-3xl rounded-full z-0"></div>
      <div className="fixed bottom-0 right-0 w-100 h-100 bg-pink-600/20 blur-3xl rounded-full z-0"></div>

      <div className="fixed z-20 flex flex-col items-center top-0 left-0 bg-slate-950/10 w-full py-5 px-4 backdrop-blur-lg rounded shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)]">
        <Header searchBtn={true} favbtn={false} />
      </div>

      {loading ? (
        <div className="flex justify-center items-center pt-15">
          <CategoryLoader />
        </div>
      ) : (
        <div className="relative z-10 pt-20 px-2 text-right">
          <button
            onClick={clearAllFavorites}
            className="text-white font-semibold text-xl md:text-2xl mr-2"
          >
            Clear all
          </button>
          <div className="z-10 grid grid-cols-3 md:grid-cols-4 gap-2 pt-5 pb-5 justify-items-center">
            {movies.map((elem, idx) => {
              return (
                <div key={idx} className="relative w-fit md:w-fit">
                  <img
                    onClick={() => navigate(`/movie/${elem.imdbID}`)}
                    className="w-35 md:w-45 rounded object-contain"
                    src={elem.Poster !== "N/A" ? elem.Poster : noPoster}
                    onError={(e) => (e.target.src = noPoster)}
                  />

                  {/* remove single movie */}
                  <button
                    onClick={() => removeFromFav(elem.imdbID)}
                    className="absolute top-2 right-2 bg-white text-red-500 text-xs px-2 py-1 rounded"
                  >
                    X
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorites;

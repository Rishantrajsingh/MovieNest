import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import CategoryLoader from "../components/CategoryLoader";
import { noPoster } from "../constants/imageConstants";
import { useFirebase } from "../context/FirebaseContext";

const Favorites = () => {
  const { user, loading: authLoading } = useFirebase();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // User-specific localStorage key
  const favoritesKey = user ? `movienest_favorites_${user.uid}` : null;

  // Load favorites from localStorage
  useEffect(() => {
    if (authLoading) return;

    if (!favoritesKey) {
      setMovies([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const savedMovies = localStorage.getItem(favoritesKey);
      const parsedMovies = savedMovies ? JSON.parse(savedMovies) : [];

      setMovies(Array.isArray(parsedMovies) ? parsedMovies : []);
    } catch (error) {
      console.error("Failed to load favorites:", error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, [favoritesKey, authLoading]);

  // Remove one favorite
  const removeFromFav = (id) => {
    if (!favoritesKey) return;

    const updatedMovies = movies.filter((movie) => movie.imdbID !== id);

    try {
      localStorage.setItem(favoritesKey, JSON.stringify(updatedMovies));

      setMovies(updatedMovies);
    } catch (error) {
      console.error("Failed to remove favorite:", error);
      alert("Unable to update favorites. Please try again.");
    }
  };

  // Clear all favorites
  const clearAllFavorites = () => {
    if (!favoritesKey) return;

    try {
      localStorage.removeItem(favoritesKey);
      setMovies([]);
    } catch (error) {
      console.error("Failed to clear favorites:", error);
      alert("Unable to clear favorites. Please try again.");
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex justify-center items-center">
        <CategoryLoader />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="relative overflow-hidden min-h-screen w-full p-5 bg-slate-950 flex flex-col justify-center">
        <div className="fixed top-0 left-0 w-125 h-125 bg-purple-700/20 blur-3xl rounded-full z-0"></div>
        <div className="fixed bottom-0 right-0 w-100 h-100 bg-pink-600/20 blur-3xl rounded-full z-0"></div>

        <div className="fixed top-0 left-0 z-20 bg-slate-950 w-full py-5 px-4">
          <Header searchBtn={true} favbtn={false} />
        </div>

        <div className="relative z-10 text-center text-white">
          <h2 className="text-xl mb-4">
            Please sign in to view your favorites 🎬
          </h2>

          <button
            onClick={() => navigate("/login")}
            className="bg-yellow-600 hover:bg-yellow-700 px-5 py-2 rounded-lg font-semibold"
          >
            Continue with Google
          </button>
        </div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="relative overflow-hidden min-h-screen w-full p-5 bg-slate-950 flex flex-col justify-center">
        <div className="fixed top-0 left-0 w-125 h-125 bg-purple-700/20 blur-3xl rounded-full z-0"></div>
        <div className="fixed bottom-0 right-0 w-100 h-100 bg-pink-600/20 blur-3xl rounded-full z-0"></div>

        <div className="fixed top-0 left-0 z-20 bg-slate-950 w-full py-5 px-4">
          <Header searchBtn={true} favbtn={false} />
        </div>

        <h2 className="relative z-10 text-center text-white text-xl">
          Your favorites list is empty 😢
          <br />
          Go to Home and add some movies 🎬
        </h2>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden min-h-screen w-full py-5 bg-slate-950 flex flex-col gap-5">
      <div className="fixed top-0 left-0 w-125 h-125 bg-purple-700/20 blur-3xl rounded-full z-0"></div>
      <div className="fixed bottom-0 right-0 w-100 h-100 bg-pink-600/20 blur-3xl rounded-full z-0"></div>

      <div className="fixed z-20 flex flex-col items-center top-0 left-0 bg-slate-950/10 w-full py-5 px-4 backdrop-blur-lg rounded shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)]">
        <Header searchBtn={true} favbtn={false} />
      </div>

      <div className="relative z-10 pt-20 px-2 text-right">
        <button
          onClick={clearAllFavorites}
          className="text-white font-semibold text-xl md:text-2xl mr-2"
        >
          Clear all
        </button>

        <div className="z-10 grid grid-cols-3 md:grid-cols-4 gap-2 pt-5 pb-5 justify-items-center">
          {movies.map((elem) => (
            <div key={elem.imdbID} className="relative w-fit md:w-fit">
              <img
                onClick={() => navigate(`/movie/${elem.imdbID}`)}
                className="w-35 md:w-45 rounded object-contain cursor-pointer"
                src={
                  elem.Poster && elem.Poster !== "N/A" ? elem.Poster : noPoster
                }
                alt={elem.Title || "Movie poster"}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = noPoster;
                }}
              />

              <button
                onClick={() => removeFromFav(elem.imdbID)}
                aria-label={`Remove ${elem.Title || "movie"} from favorites`}
                className="absolute top-2 right-2 bg-white text-red-500 text-xs px-2 py-1 rounded"
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;

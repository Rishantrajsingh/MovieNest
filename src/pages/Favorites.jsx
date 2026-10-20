import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import CategoryLoader from "../components/CategoryLoader";
import { noPoster } from "../constants/imageConstants";

const FAVORITES_KEY = "movienest_favorites";

const Favorites = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Load favorites from localStorage
  useEffect(() => {
    try {
      const savedMovies = localStorage.getItem(FAVORITES_KEY);
      const parsedMovies = savedMovies ? JSON.parse(savedMovies) : [];

      setMovies(Array.isArray(parsedMovies) ? parsedMovies : []);
    } catch (error) {
      console.error("Failed to load favorites:", error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Remove one favorite
  const removeFromFav = (id) => {
    const updatedMovies = movies.filter((movie) => movie.imdbID !== id);

    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedMovies));

      setMovies(updatedMovies);
    } catch (error) {
      console.error("Failed to remove favorite:", error);
      alert("Unable to update favorites. Please try again.");
    }
  };

  // Clear all favorites
  const clearAllFavorites = () => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify([]));
      setMovies([]);
    } catch (error) {
      console.error("Failed to clear favorites:", error);
      alert("Unable to clear favorites. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex justify-center items-center">
        <CategoryLoader />
      </div>
    );
  }

  // Empty favorites
  if (movies.length === 0) {
    return (
      <div className="relative overflow-hidden min-h-screen w-full p-5 bg-slate-950 flex flex-col justify-center">
        <div className="fixed top-0 left-0 w-125 h-125 bg-purple-700/20 blur-3xl rounded-full z-0" />
        <div className="fixed bottom-0 right-0 w-100 h-100 bg-pink-600/20 blur-3xl rounded-full z-0" />

        <div className="fixed top-0 left-0 z-20 bg-slate-950 w-full py-5 px-4">
          <Header searchBtn={true} favbtn={false} />
        </div>

        <div className="relative z-10 text-center text-white">
          <h2 className="text-xl">
            Your favorites list is empty 😢
            <br />
            Go to Home and add some movies 🎬
          </h2>

          <button
            onClick={() => navigate("/home")}
            className="mt-5 bg-yellow-500 hover:bg-yellow-600 text-black px-5 py-2 rounded-lg font-semibold"
          >
            Explore Movies
          </button>
        </div>
      </div>
    );
  }

  // Favorites list
  return (
    <div className="relative overflow-hidden min-h-screen w-full py-5 bg-slate-950 flex flex-col gap-5">
      <div className="fixed top-0 left-0 w-125 h-125 bg-purple-700/20 blur-3xl rounded-full z-0" />
      <div className="fixed bottom-0 right-0 w-100 h-100 bg-pink-600/20 blur-3xl rounded-full z-0" />

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

        <div className="grid grid-cols-3 md:grid-cols-4 gap-2 pt-5 pb-5 justify-items-center">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="relative w-fit">
              <img
                onClick={() => navigate(`/movie/${movie.imdbID}`)}
                className="w-35 md:w-45 rounded object-contain cursor-pointer"
                src={
                  movie.Poster && movie.Poster !== "N/A"
                    ? movie.Poster
                    : noPoster
                }
                alt={movie.Title || "Movie poster"}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = noPoster;
                }}
              />

              <button
                onClick={() => removeFromFav(movie.imdbID)}
                aria-label={`Remove ${movie.Title || "movie"} from favorites`}
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

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Header from "./Header";
import DetailsLoader from "./DetailsLoader";
import { getMovieDetails } from "../service/movieDetailsApi";
import { noPoster } from "../constants/imageConstants";

const FAVORITES_KEY = "movienest_favorites";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState({});
  const [favIds, setFavIds] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch movie details
  useEffect(() => {
    let isMounted = true;

    const fetchDetails = async () => {
      setLoading(true);

      try {
        const data = await getMovieDetails(id);

        if (isMounted) {
          setMovie(data || {});
        }
      } catch (error) {
        console.error("Failed to fetch movie details:", error);

        if (isMounted) {
          setMovie({});
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchDetails();

    return () => {
      isMounted = false;
    };
  }, [id]);

  // Load favorites from localStorage
  useEffect(() => {
    try {
      const savedFavorites = JSON.parse(
        localStorage.getItem(FAVORITES_KEY) || "[]",
      );

      if (!Array.isArray(savedFavorites)) {
        setFavIds([]);
        return;
      }

      const ids = savedFavorites
        .map((item) =>
          typeof item === "string" ? item : item?.imdbID || item?.id,
        )
        .filter(Boolean);

      setFavIds([...new Set(ids)]);
    } catch (error) {
      console.error("Failed to load favorites:", error);
      setFavIds([]);
    }
  }, []);

  // Add movie to favorites
  const addToFav = (movieToAdd) => {
    if (!movieToAdd?.imdbID) return;

    try {
      const savedFavorites = JSON.parse(
        localStorage.getItem(FAVORITES_KEY) || "[]",
      );

      const favorites = Array.isArray(savedFavorites) ? savedFavorites : [];

      const alreadyExists = favorites.some((item) => {
        const favoriteId =
          typeof item === "string" ? item : item?.imdbID || item?.id;

        return favoriteId === movieToAdd.imdbID;
      });

      if (!alreadyExists) {
        const updatedFavorites = [
          ...favorites.filter(
            (item) => typeof item === "object" && item !== null,
          ),
          movieToAdd,
        ];

        localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
      }

      setFavIds((prev) =>
        prev.includes(movieToAdd.imdbID) ? prev : [...prev, movieToAdd.imdbID],
      );
    } catch (error) {
      console.error("Failed to add favorite:", error);
      alert("Could not save this favorite. Please try again.");
    }
  };

  // Remove movie from favorites
  const removeFromFav = (movieId) => {
    try {
      const savedFavorites = JSON.parse(
        localStorage.getItem(FAVORITES_KEY) || "[]",
      );

      const favorites = Array.isArray(savedFavorites) ? savedFavorites : [];

      const updatedFavorites = favorites.filter((item) => {
        const favoriteId =
          typeof item === "string" ? item : item?.imdbID || item?.id;

        return favoriteId !== movieId;
      });

      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));

      setFavIds((prev) => prev.filter((favoriteId) => favoriteId !== movieId));
    } catch (error) {
      console.error("Failed to remove favorite:", error);
      alert("Could not remove this favorite. Please try again.");
    }
  };

  const isFavorite = movie?.imdbID ? favIds.includes(movie.imdbID) : false;

  return (
    <div className="relative overflow-hidden min-h-screen w-full bg-slate-950 flex flex-col gap-5">
      {/* Background gradient */}
      <div className="fixed top-0 left-0 w-125 h-125 bg-purple-700/20 blur-3xl rounded-full z-0" />
      <div className="fixed bottom-0 right-0 w-100 h-100 bg-pink-600/20 blur-3xl rounded-full z-0" />

      <div className="fixed z-20 flex flex-col items-center gap-5 top-0 left-0 bg-slate-950/10 w-full py-5 px-4 backdrop-blur-lg rounded shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)]">
        <Header searchBtn={true} favbtn={true} />
      </div>

      {loading ? (
        <div className="flex justify-center items-center mt-20">
          <DetailsLoader />
        </div>
      ) : !movie?.imdbID ? (
        <div className="relative z-10 mt-32 flex flex-col items-center px-4 text-center text-white">
          <h1 className="text-xl font-bold mb-2">Movie details unavailable</h1>

          <p className="text-gray-400">
            Could not load this movie. Please try again.
          </p>

          <button
            onClick={() => navigate(-1)}
            className="mt-5 bg-white text-black px-5 py-2 rounded-lg font-semibold hover:bg-gray-200"
          >
            Go Back
          </button>
        </div>
      ) : (
        <div className="relative z-10 mt-20 flex flex-col items-center px-2">
          <div className="w-full text-white flex flex-col items-start py-5">
            <img
              src={
                movie.Poster && movie.Poster !== "N/A" ? movie.Poster : noPoster
              }
              alt={movie.Title || "Movie poster"}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = noPoster;
              }}
              className="w-full h-full rounded-lg mb-4"
            />

            <div className="w-full">
              <h1 className="text-2xl font-bold mb-2">{movie.Title}</h1>

              <div className="text-sm text-gray-400 mb-3">
                <p>Year: {movie.Year || "N/A"}</p>
                <p>Genre: {movie.Genre || "N/A"}</p>
                <p>Runtime: {movie.Runtime || "N/A"}</p>
              </div>

              <p className="text-yellow-400 font-semibold mb-4">
                ⭐ {movie.imdbRating || "N/A"} / 10
              </p>

              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-1">Plot</h2>

                <p className="text-gray-300 text-sm leading-relaxed">
                  {movie.Plot || "Plot not available."}
                </p>
              </div>

              <p className="text-sm mb-1">
                <span className="font-semibold">Director:</span>{" "}
                {movie.Director || "N/A"}
              </p>

              <p className="text-sm mb-4">
                <span className="font-semibold">Actors:</span>{" "}
                {movie.Actors || "N/A"}
              </p>

              <button
                onClick={() =>
                  isFavorite ? removeFromFav(movie.imdbID) : addToFav(movie)
                }
                className="w-full bg-white hover:bg-red-600 transition-colors py-2 rounded-lg font-semibold text-black"
              >
                {isFavorite ? "💔 Remove from Fav" : "❤️ Add to Favorites"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;

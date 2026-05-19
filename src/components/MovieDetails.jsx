import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import DetailsLoader from "./DetailsLoader";

const MovieDetails = () => {
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;

  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [favIds, setFavIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await axios.get(
        `https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`,
      );
      setMovie(res.data);
      setLoading(false);
    };
    fetchMovie();
  }, []);

  useEffect(() => {
    const favMovies = JSON.parse(localStorage.getItem("favMovies")) || [];
    const ids = favMovies.map((m) => m.id);
    setFavIds(ids);
  }, []);

  const addToFav = (value) => {
    const favMovies = JSON.parse(localStorage.getItem("favMovies")) || [];
    const exists = favMovies.some((movie) => movie.id === value);
    if (!exists) {
      const updated = [...favMovies, { id: value }];
      localStorage.setItem("favMovies", JSON.stringify(updated));

      setFavIds([...favIds, value]);
    }
  };

  const removeFromFav = (id) => {
    const favMovies = JSON.parse(localStorage.getItem("favMovies")) || [];

    const updated = favMovies.filter((movie) => movie.id !== id);

    localStorage.setItem("favMovies", JSON.stringify(updated));

    setFavIds(updated.map((m) => m.id));
  };

  const noPoster =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYY-4QN85YJRDZ3twNWtHBpYgypmHu5ZZk0w&s";

  return (
    <div className="min-h-screen w-full p-5 bg-slate-950 flex flex-col gap-5">
      <div className="flex flex-col items-center gap-5 fixed top-0 left-0 bg-slate-950/10 w-full py-5 px-4 backdrop-blur-lg rounded shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)]">
        <Header />
      </div>
      {loading ? (
        <div className="flex justify-center items-center">
          <DetailsLoader />
        </div>
      ) : (
        <div className="mt-20 flex flex-col items-center">
          <div className="text-white flex flex-col items-start">
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : noPoster}
              onError={(e) => (e.target.src = noPoster)}
              className="w-full h-auto rounded-lg mb-4"
            />

            <h1 className="text-2xl font-bold mb-2">{movie.Title}</h1>

            <div className="text-sm text-gray-400 mb-3">
              <p>Year: {movie.Year}</p>
              <p>Genre: {movie.Genre}</p>
              <p>Runtime: {movie.Runtime}</p>
            </div>

            <p className="text-yellow-400 font-semibold mb-4">
              ⭐ {movie.imdbRating} / 10
            </p>

            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-1">Plot</h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                {movie.Plot}
              </p>
            </div>

            <p className="text-sm mb-1">
              <span className="font-semibold">Director:</span> {movie.Director}
            </p>

            <p className="text-sm mb-4">
              <span className="font-semibold">Actors:</span> {movie.Actors}
            </p>

            <button
              onClick={() => {
                if (favIds.includes(movie.imdbID)) {
                  removeFromFav(movie.imdbID);
                } else {
                  addToFav(movie.imdbID);
                }
              }}
              className="w-full bg-white hover:bg-red-600 transition-colors py-2 rounded-lg font-semibold text-black"
            >
              {favIds.includes(movie.imdbID)
                ? "💔 Remove from Fav"
                : "❤️ Add to Favorites"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default MovieDetails;

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CategoryLoader from "../components/CategoryLoader";
import apiCache from "../../utils/apiCache";

const SearchMovies = () => {
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;

  const navigate = useNavigate();

  const isSearched = useRef(false);

  const searchPageMovies = [
    "Inception",
    "3 Idiots",
    "John Wick",
    "Toy Story",
    "The Dark Knight",
    "Jawan",
    "Interstellar",
    "Frozen",
    "Deadpool",
    "Hera Pheri",
    "Avengers: Endgame",
    "Doraemon",
    "Gladiator",
    "RRR",
    "The Hangover",
    "Finding Nemo",
    "Pathaan",
    "Spider-Man: No Way Home",
    "Kung Fu Panda",
    "The Matrix",
    "Bhool Bhulaiyaa",
    "Top Gun: Maverick",
    "Cars",
    "Shershaah",
    "The Lion King",
  ];

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const noPoster =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYY-4QN85YJRDZ3twNWtHBpYgypmHu5ZZk0w&s";

  // ---------------- DEFAULT MOVIES ----------------
  const getDefaultMovies = async () => {
    try {
      setLoading(true);

      const requests = searchPageMovies.map((movie) =>
        apiCache(
          `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(
            movie,
          )}`,
        ),
      );

      const responses = await Promise.all(requests);

      const validMovies = responses
        .map((movie) => movie?.data || movie)
        .filter((movie) => movie && movie.Response !== "False");

      setMovies(validMovies);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // ---------------- SEARCH SUGGESTIONS ----------------
  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await axios.get(
          `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`,
        );

        if (!res.data.Search) {
          setSuggestions([]);
          return;
        }

        setSuggestions(res.data.Search.slice(0, 5));
      } catch (error) {
        console.log(error);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  // ---------------- SEARCH MOVIES ----------------
  const searchMovies = async (searchText) => {
    try {
      setLoading(true);

      setSuggestions([]);

      const res = await axios.get(
        `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchText}`,
      );

      if (res.data.Search) {
        setMovies(res.data.Search);

        isSearched.current = true;

        sessionStorage.setItem(
          "searchedMovies",
          JSON.stringify(res.data.Search),
        );

        sessionStorage.setItem("searchedQuery", searchText);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // ---------------- ENTER SEARCH ----------------
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setShowSuggestions(false);

      if (query.trim() === "") {
        sessionStorage.removeItem("searchedMovies");
        sessionStorage.removeItem("searchedQuery");

        getDefaultMovies();
      } else {
        searchMovies(query);
      }
    }
  };

  // ---------------- INITIAL LOAD ----------------
  useEffect(() => {
    const savedMovies = sessionStorage.getItem("searchedMovies");

    const savedQuery = sessionStorage.getItem("searchedQuery");

    if (savedMovies) {
      setMovies(JSON.parse(savedMovies));
      setQuery(savedQuery || "");
      setLoading(false);
    } else {
      getDefaultMovies();
    }

    return () => {
      if (!isSearched.current) {
        sessionStorage.removeItem("searchedMovies");
        sessionStorage.removeItem("searchedQuery");
      }
    };
  }, []);

  return (
    <div className="relative overflow-hidden w-full min-h-screen bg-slate-950">
      {/* background gradients */}
      <div className="fixed top-0 left-0 w-125 h-125 bg-purple-700/20 blur-3xl rounded-full z-0"></div>

      <div className="fixed bottom-0 right-0 w-100 h-100 bg-pink-600/20 blur-3xl rounded-full z-0"></div>

      {/* SEARCH BAR */}
      <div className="fixed z-20 top-0 left-0 w-full bg-slate-950/10 flex justify-center items-center px-3 py-4 backdrop-blur-lg shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)]">
        <div className="relative w-full">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search for movies..."
            className="outline-none px-5 py-3 w-full text-lg rounded-full bg-white text-black"
          />

          {/* suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-zinc-900 border border-zinc-700 rounded-2xl mt-2 overflow-hidden z-50">
              {suggestions.map((movie) => (
                <div
                  key={movie.imdbID}
                  onClick={() => {
                    setQuery(movie.Title);

                    setShowSuggestions(false);

                    searchMovies(movie.Title);
                  }}
                  className="px-5 py-4 text-white hover:bg-zinc-800 cursor-pointer transition border-b border-zinc-800"
                >
                  {movie.Title}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MOVIES */}
      {loading ? (
        <div className="flex justify-center items-center pt-25">
          <CategoryLoader />
        </div>
      ) : (
        <div className="relative z-10 grid grid-cols-3 gap-3 px-3 pt-24 pb-5">
          {movies.map((movie, idx) => (
            <div key={idx}>
              <img
                onClick={() => navigate(`/movie/${movie.imdbID}`)}
                className="rounded-lg object-cover cursor-pointer hover:scale-105 transition"
                src={movie.Poster !== "N/A" ? movie.Poster : noPoster}
                onError={(e) => (e.target.src = noPoster)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchMovies;

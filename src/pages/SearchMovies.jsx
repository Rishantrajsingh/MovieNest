import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CategoryLoader from "../components/CategoryLoader";
import { getDefaultMovies, getSearchedMovies } from "../service/searchPageApis";
import { noPoster } from "../constants/imageConstants";
import Header from "../components/Header";

const SearchMovies = ({ movieNames }) => {
  const navigate = useNavigate();
  // const isSearched = useRef(false);
  const [isSearched, setIsSearched] = useState(false);
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getDefaultMovies(movieNames);
      setMovies(data);
      console.log(data);
      setLoading(false);
    };

    fetchMovies();
  }, []);

  // ---------------- SEARCH MOVIES ----------------

  useEffect(() => {
    const fetchSearchedMovies = async () => {
      if (debouncedQuery.trim() === "") {
        setPage(1);

        const data = await getDefaultMovies(movieNames);
        setMovies(data);
        return;
      }

      const data = await getSearchedMovies(debouncedQuery, page);
      setMovies(data);
    };

    fetchSearchedMovies();
  }, [debouncedQuery, page]);

  // ---------------- DEBOUNCING ----------------

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);

      if (debouncedQuery.trim() === "") {
        setPage(1);

        sessionStorage.removeItem("searchedMovies");
        sessionStorage.removeItem("searchedQuery");

        const data = await getDefaultMovies(movieNames);

        setMovies(data);

        setLoading(false);

        return;
      }

      const data = await getSearchedMovies(debouncedQuery, page);
      console.log(data);
      console.log(Array.isArray(data));

      setMovies(data);

      // isSearched.current = true;
      setIsSearched(true);

      sessionStorage.setItem("searchedMovies", JSON.stringify(data));

      sessionStorage.setItem("searchedQuery", debouncedQuery);

      setLoading(false);
    };

    fetchMovies();
  }, [debouncedQuery, page]);

  // ---------------- INITIAL LOAD ----------------
  useEffect(() => {
    const savedMovies = sessionStorage.getItem("searchedMovies");
    const savedQuery = sessionStorage.getItem("searchedQuery");

    const loadMovies = async () => {
      if (savedMovies && savedQuery) {
        setMovies(JSON.parse(savedMovies));
        setQuery(savedQuery);
        setDebouncedQuery(savedQuery);
        setLoading(false);
      } else {
        const data = await getDefaultMovies(movieNames);
        setMovies(data);
        setLoading(false);
      }
    };

    loadMovies();

    return () => {
      if (!isSearched) {
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
      <div className="fixed z-20 top-0 left-0 w-full bg-slate-950/10 flex flex-col gap-3 justify-center items-center px-4 py-4 backdrop-blur-lg shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)]">
        <Header searchBtn={false} favbtn={true} />
        <div className="relative w-full">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            placeholder="Search for movies..."
            className="outline-none px-5 py-3 w-full text-lg rounded-full bg-white text-black"
          />
        </div>
      </div>

      {/* MOVIES */}
      {loading ? (
        <div className="flex justify-center items-center pt-25">
          <CategoryLoader />
        </div>
      ) : (
        <div className="relative z-10 pt-35 md:pt-20 pb-5 px-2">
          {/* Movie Grid */}
          <div className="grid grid-cols-3 md:grid-cols-4 justify-items-center gap-2">
            {movies.map((elem, idx) => (
              <div key={idx} className="w-full">
                <img
                  onClick={() => navigate(`/movie/${elem.imdbID}`)}
                  className="rounded-lg object-cover"
                  src={elem.Poster !== "N/A" ? elem.Poster : noPoster}
                  onError={(e) => (e.target.src = noPoster)}
                />
              </div>
            ))}
          </div>

          {/* Pagination */}
          {isSearched && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="px-5 py-2 rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              <span className="text-white font-semibold">Page {page}</span>

              <button
                onClick={() => setPage((prev) => prev + 1)}
                className="px-5 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchMovies;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CategoryLoader from "../components/CategoryLoader";
import { getDefaultMovies, getSearchedMovies } from "../service/searchPageApis";
import { noPoster } from "../constants/imageConstants";
import Header from "../components/Header";

const SearchMovies = ({ movieNames }) => {
  const navigate = useNavigate();

  const [query, setQuery] = useState(() => {
    return sessionStorage.getItem("searchedQuery") || "";
  });

  const [debouncedQuery, setDebouncedQuery] = useState(() => {
    return sessionStorage.getItem("searchedQuery") || "";
  });

  const [movies, setMovies] = useState(() => {
    try {
      const savedMovies = sessionStorage.getItem("searchedMovies");
      const savedQuery = sessionStorage.getItem("searchedQuery");

      if (savedMovies && savedQuery) {
        const parsedMovies = JSON.parse(savedMovies);

        if (Array.isArray(parsedMovies)) {
          return parsedMovies;
        }
      }
    } catch (error) {
      console.error("Failed to restore search results:", error);
    }

    return [];
  });

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const isSearched = debouncedQuery.trim().length > 0;

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      setDebouncedQuery(query.trim());
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  // Fetch default movies or search results
  useEffect(() => {
    let isMounted = true;

    const fetchMovies = async () => {
      setLoading(true);

      try {
        if (!debouncedQuery) {
          sessionStorage.removeItem("searchedMovies");
          sessionStorage.removeItem("searchedQuery");

          const data = await getDefaultMovies(movieNames);

          if (isMounted) {
            setMovies(Array.isArray(data) ? data : []);
          }

          return;
        }

        const data = await getSearchedMovies(debouncedQuery, page);
        const results = Array.isArray(data) ? data : [];

        if (isMounted) {
          setMovies(results);

          sessionStorage.setItem("searchedMovies", JSON.stringify(results));

          sessionStorage.setItem("searchedQuery", debouncedQuery);
        }
      } catch (error) {
        console.error("Failed to fetch movies:", error);

        if (isMounted) {
          setMovies([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchMovies();

    return () => {
      isMounted = false;
    };
  }, [debouncedQuery, page, movieNames]);

  return (
    <div className="relative overflow-hidden w-full min-h-screen bg-slate-950">
      {/* Background gradients */}
      <div className="fixed top-0 left-0 w-125 h-125 bg-purple-700/20 blur-3xl rounded-full z-0"></div>
      <div className="fixed bottom-0 right-0 w-100 h-100 bg-pink-600/20 blur-3xl rounded-full z-0"></div>

      {/* Search bar */}
      <div className="fixed z-20 top-0 left-0 w-full bg-slate-950/10 flex flex-col gap-3 justify-center items-center px-4 py-4 backdrop-blur-lg shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)]">
        <Header searchBtn={false} favbtn={true} />

        <div className="relative w-full">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movies..."
            aria-label="Search for movies"
            className="outline-none px-5 py-3 w-full text-lg rounded-full bg-white text-black"
          />
        </div>
      </div>

      {/* Movies */}
      {loading ? (
        <div className="flex justify-center items-center pt-25">
          <CategoryLoader />
        </div>
      ) : (
        <div className="relative z-10 pt-35 md:pt-20 pb-5 px-2">
          {/* Movie grid */}
          {movies.length > 0 ? (
            <div className="grid grid-cols-3 md:grid-cols-4 justify-items-center gap-2">
              {movies.map((elem) => (
                <div key={elem.imdbID} className="w-full">
                  <img
                    onClick={() => navigate(`/movie/${elem.imdbID}`)}
                    className="rounded-lg object-cover cursor-pointer"
                    src={
                      elem.Poster && elem.Poster !== "N/A"
                        ? elem.Poster
                        : noPoster
                    }
                    alt={elem.Title || "Movie poster"}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = noPoster;
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 py-10">
              {isSearched
                ? "No movies found. Try another search."
                : "No movies available."}
            </div>
          )}

          {/* Pagination */}
          {isSearched && movies.length > 0 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1 || loading}
                className="px-5 py-2 rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              <span className="text-white font-semibold">Page {page}</span>

              <button
                onClick={() => setPage((prev) => prev + 1)}
                disabled={loading}
                className="px-5 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
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

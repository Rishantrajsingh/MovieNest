import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getMovies } from "../service/movieSectionApi";
import { noPoster } from "../constants/imageConstants";

const MovieSection = ({ movieNames, title, moviePageTitle }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchMovies = async () => {
      try {
        const data = await getMovies(movieNames);

        if (isMounted) {
          setMovies(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error(`Failed to load ${title}:`, error);

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
  }, [movieNames, title]);

  return (
    <div className="pt-5 pb-3">
      <NavLink
        to={`/${moviePageTitle}`}
        className="text-white font-semibold text-xl md:text-2xl pl-3"
      >
        {title}
      </NavLink>

      <div className="flex gap-2 w-full py-2 overflow-auto scrollbar-hide px-2">
        {loading ? (
          <div className="text-gray-400 px-2 py-4">Loading movies...</div>
        ) : movies.length === 0 ? (
          <div className="text-gray-400 px-2 py-4">No movies available.</div>
        ) : (
          movies.map((elem) => (
            <div
              key={elem.imdbID}
              className="flex items-center justify-center rounded"
            >
              <div className="w-35 md:w-45 lg:w-55 h-full rounded overflow-hidden">
                <img
                  onClick={() => navigate(`/movie/${elem.imdbID}`)}
                  className="rounded object-contain cursor-pointer"
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
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MovieSection;

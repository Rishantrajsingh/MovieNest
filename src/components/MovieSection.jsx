import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import HomeLoader from "./HomeLoader";
import { getMovies } from "../service/movieSectionApi";
import { noPoster } from "../constants/imageConstants";

const MovieSection = ({ movieNames, title, moviePageTitle }) => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getMovies(movieNames);
      setMovies(data);
      console.log(data);
    };

    fetchMovies();
  }, []);

  return (
    <div className="pt-5 pb-3">
      <NavLink
        to={`/${moviePageTitle}`}
        className="text-white font-semibold text-xl md:text-2xl pl-3"
      >
        {title}
      </NavLink>
      <div className="flex gap-2 w-full py-2 overflow-auto scrollbar-hide px-3">
        {movies.map((elem, idx) => {
          return (
            <div key={idx} className="flex items-center justify-center rounded">
              <div className="w-35 md:w-45 lg:w-55 h-full rounded overflow-hidden">
                <img
                  onClick={() => navigate(`/movie/${elem.imdbID}`)}
                  className="rounded object-contain"
                  src={elem.Poster !== "N/A" ? elem.Poster : noPoster}
                  onError={(e) => (e.target.src = noPoster)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MovieSection;

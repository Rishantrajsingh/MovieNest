import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import HomeLoader from "./HomeLoader";
import apiCache from "../../utils/apiCache";

const TvShows = () => {
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;

  const mixedTvShows = [
    "Breaking Bad",
    "Game of Thrones",
    "Stranger Things",
    "Money Heist",
    "The Boys",
    "Dark",
    "Wednesday",
    "The Witcher",
    "Peaky Blinders",
    "Sherlock",
    "Friends",
    "The Office",
    "How I Met Your Mother",
    "Brooklyn Nine-Nine",
    "The Big Bang Theory",
  ];

  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const requests = mixedTvShows.map((name) =>
          apiCache(
            `https://www.omdbapi.com/?t=${encodeURIComponent(name)}&apikey=${apiKey}`,
          ),
        );
        const responses = await Promise.all(requests);
        setMovies(responses);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const noPoster =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYY-4QN85YJRDZ3twNWtHBpYgypmHu5ZZk0w&s";

  return (
    <div className="pt-5 pl-3 pb-3">
      <NavLink
        to="/tvshows"
        className="text-white font-semibold text-xl md:text-2xl"
      >
        Tv Show's
      </NavLink>
      <div className="flex gap-2 w-full py-2 overflow-auto pr-3">
        {movies.map((elem, idx) => {
          return (
            <div key={idx} className="flex items-center justify-center rounded">
              <div className="w-35 md:w-45 h-full rounded overflow-hidden">
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

export default TvShows;

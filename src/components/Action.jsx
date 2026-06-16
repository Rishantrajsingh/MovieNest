import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import HomeLoader from "./HomeLoader";
import apiCache from "../../utils/apiCache";

const Action = () => {
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;

  const actionMovies = [
    "John Wick",
    "Mad Max: Fury Road",
    "The Dark Knight",
    "Mission: Impossible – Fallout",
    "Gladiator",
    "Die Hard",
    "Top Gun: Maverick",
    "Avengers: Endgame",
    "The Matrix",
    "Extraction",
    "Nobody",
    "Bullet Train",
    "Casino Royale",
    "Terminator 2: Judgment Day",
    "The Raid",
  ];

  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const requests = actionMovies.map((name) =>
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
    <div className="pt-5 pb-3">
      <NavLink
        to="/action"
        className="text-white font-semibold text-xl md:text-2xl pl-3"
      >
        Action Reloaded
      </NavLink>
      <div className="flex gap-2 w-full py-2 overflow-auto px-3">
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

export default Action;

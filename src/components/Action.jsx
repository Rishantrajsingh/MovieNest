import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Action = () => {
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
    "Fast & Furious 7",
    "Casino Royale",
    "Terminator 2: Judgment Day",
    "The Raid",
  ];

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const requests = actionMovies.map((name) =>
          axios.get(
            `https://www.omdbapi.com/?t=${encodeURIComponent(name)}&apikey=900e3577`,
          ),
        );

        const responses = await Promise.all(requests);
        const movie = responses.map((res) => res.data);
        setMovies(movie);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const noPoster =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYY-4QN85YJRDZ3twNWtHBpYgypmHu5ZZk0w&s";

  return (
    <div className="pt-10 pl-3 pb-3">
      {/* <p className="text-white font-semibold text-xl">Action Reloaded &gt;</p> */}
      <NavLink to="/action" className="text-white font-semibold text-xl">
        Action Reloaded &gt;
      </NavLink>
      <div className="flex gap-2 w-full py-2 overflow-auto no-scrollbar">
        {movies.map((elem, idx) => {
          return (
            <div
              key={idx}
              className="flex items-center justify-center rounded no-scrollbar"
            >
              <div
                onClick={() => navigate(`/movie/${elem.imdbID}`)}
                className="w-50 h-full rounded overflow-hidden"
              >
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

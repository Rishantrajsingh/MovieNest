import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import apiCache from "../../utils/apiCache";

const Comedy = () => {
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;

  const comedyMovies = [
    "The Hangover",
    "Superbad",
    "21 Jump Street",
    "Deadpool",
    "Home Alone",
    "The Mask",
    "Rush Hour",
    "Jumanji",
    "Free Guy",
    "Central Intelligence",
    "3 Idiots",
    "Hera Pheri",
    "Phir Hera Pheri",
    "Bhool Bhulaiyaa",
    "Welcome",
  ];
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const requests = comedyMovies.map((name) =>
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
      <NavLink to="/comedy" className="text-white font-semibold text-xl">
        Comedy Fully Loaded &gt;
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

export default Comedy;

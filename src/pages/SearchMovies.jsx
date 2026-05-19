import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CategoryLoader from "../components/CategoryLoader";

const SearchMovies = () => {
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;

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
    "Mission: Impossible – Fallout",
    "Coco",
    "War",
    "Jumanji",
    "The Prestige",
    "Minions",
    "URI: The Surgical Strike",
    "Mad Max: Fury Road",
    "Up",
    "Golmaal",
    "Doctor Strange",
    "Hotel Transylvania",
    "Don",
    "The Batman",
    "Moana",
    "Free Guy",
    "Animal",
    "Singham",
    "The Incredibles",
    "Rush Hour",
    "Krrish",
    "Zootopia",
    "The Wolf of Wall Street",
    "Leo",
    "Puss in Boots: The Last Wish",
  ];

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getDefaultMovies = async () => {
    try {
      const requests = searchPageMovies.map((movie) =>
        axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&t=${movie}`),
      );
      const responses = await Promise.all(requests);
      const data = responses.map((res) => res.data);
      setMovies(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const searchMovies = async () => {
    setLoading(true);
    try {
      const responses = await axios.get(
        `https://www.omdbapi.com/?s=${encodeURIComponent(search)}&apikey=${apiKey}`,
      );
      setMovies(responses.data.Search || []);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDefaultMovies();
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (search.trim() === "") {
        getRandomMovies();
      } else {
        searchMovies();
      }
    }
  };

  const noPoster =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYY-4QN85YJRDZ3twNWtHBpYgypmHu5ZZk0w&s";

  return (
    <div className="relative overflow-hidden w-full h-screen bg-slate-950">
      {/* background gradient  */}
      <div className="fixed top-0 left-0 w-125 h-125 bg-purple-700/20 blur-3xl rounded-full z-0"></div>
      <div className="fixed bottom-0 right-0 w-100 h-100 bg-pink-600/20 blur-3xl rounded-full z-0"></div>

      <div className="fixed z-20 top-0 left-0 w-full bg-slate-950/10 flex justify-center items-center px-3 py-4 gap-3 backdrop-blur-lg rounded shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)]">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search for movies ..."
          className="outline-none border-none px-5 py-2 w-full text-xl rounded-full bg-white text-black"
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center pt-15">
          <CategoryLoader />
        </div>
      ) : (
        <div className="relative z-10 grid grid-cols-3 gap-2 px-2 pt-20 pb-5">
          {movies.map((elem, idx) => {
            return (
              <div key={idx}>
                <div>
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
      )}
    </div>
  );
};

export default SearchMovies;

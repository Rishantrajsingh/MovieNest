import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import CategoryLoader from "../components/CategoryLoader";
import apiCache from "../../utils/apiCache";

const TopRatedMovies = () => {
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;

  const topRatedNames = [
    "The Shawshank Redemption",
    "The Godfather",
    "The Dark Knight",
    "The Godfather Part II",
    "12 Angry Men",
    "Schindler's List",
    "The Lord of the Rings: The Return of the King",
    "Pulp Fiction",
    "The Lord of the Rings: The Fellowship of the Ring",
    "The Good, the Bad and the Ugly",
    "Forrest Gump",
    "Fight Club",
    "Inception",
    "The Lord of the Rings: The Two Towers",
    "The Matrix",
    "Goodfellas",
    "Star Wars: Episode V - The Empire Strikes Back",
    "One Flew Over the Cuckoo's Nest",
    "Se7en",
    "Seven Samurai",
    "The Silence of the Lambs",
    "City of God",
    "Saving Private Ryan",
    "Interstellar",
    "Life Is Beautiful",
    "The Green Mile",
    "Spirited Away",
    "Parasite",
    "The Pianist",
    "Gladiator",
    "The Lion King",
    "Terminator 2: Judgment Day",
    "Back to the Future",
    "Whiplash",
    "The Departed",
    "The Prestige",
    "The Intouchables",
    "Modern Times",
    "Alien",
    "Apocalypse Now",
    "The Great Dictator",
    "Cinema Paradiso",
    "Grave of the Fireflies",
    "Once Upon a Time in the West",
    "Memento",
    "Raiders of the Lost Ark",
    "Django Unchained",
    "WALL-E",
    "Avengers: Infinity War",
    "Oldboy",
  ];

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const requests = topRatedNames.map((name) =>
          apiCache(
            `https://www.omdbapi.com/?t=${encodeURIComponent(name)}&apikey=${apiKey}`,
          ),
        );

        const responses = await Promise.all(requests);
        setMovies(responses);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const noPoster =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYY-4QN85YJRDZ3twNWtHBpYgypmHu5ZZk0w&s";

  return (
    <div className="relative overflow-hidden min-h-screen w-full py-5 bg-slate-950 flex flex-col gap-5">
      {/* background gradient  */}
      <div className="fixed top-0 left-0 w-125 h-125 bg-purple-700/20 blur-3xl rounded-full z-0"></div>
      <div className="fixed bottom-0 right-0 w-100 h-100 bg-pink-600/20 blur-3xl rounded-full z-0"></div>

      <div className="fixed z-20 flex flex-col items-center top-0 left-0 bg-slate-950/10 w-full py-5 px-4 backdrop-blur-lg rounded shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)]">
        <Header />
      </div>

      {loading ? (
        <div className="flex justify-center items-center pt-15">
          <CategoryLoader />
        </div>
      ) : (
        <div className="relative z-10 grid grid-cols-3 md:grid-cols-4 justify-items-center gap-2 px-2 pt-16 md:pt-20 pb-5">
          {movies.map((elem, idx) => {
            return (
              <div key={idx} className="w-30 md:w-45">
                <img
                  onClick={() => navigate(`/movie/${elem.imdbID}`)}
                  className="rounded object-contain"
                  src={elem.Poster !== "N/A" ? elem.Poster : noPoster}
                  onError={(e) => (e.target.src = noPoster)}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TopRatedMovies;

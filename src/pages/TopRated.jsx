import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import HomeLoader from "../components/HomeLoader";
import { useNavigate } from "react-router-dom";

const TopRated = () => {
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
  const [message, setMessage] = useState("");
  const [favIds, setFavIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const requests = topRatedNames.map((name) =>
          axios.get(
            `https://www.omdbapi.com/?t=${encodeURIComponent(name)}&apikey=900e3577`,
          ),
        );

        const responses = await Promise.all(requests);

        const movies = responses.map((res) => res.data);

        setMovies(movies);
        setLoading(false);
        // console.log(movies);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const favMovies = JSON.parse(localStorage.getItem("favMovies")) || [];
    const ids = favMovies.map((m) => m.id);
    setFavIds(ids);
  }, []);

  const addToFav = (value) => {
    const favMovies = JSON.parse(localStorage.getItem("favMovies")) || [];
    const exists = favMovies.some((movie) => movie.id === value);
    if (!exists) {
      const updated = [...favMovies, { id: value }];
      localStorage.setItem("favMovies", JSON.stringify(updated));

      setFavIds([...favIds, value]);
      setMessage("Movie added to favorites");
    } else {
      setMessage("Already added to favorites");
    }
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  const noPoster =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYY-4QN85YJRDZ3twNWtHBpYgypmHu5ZZk0w&s";

  return (
    <div className="min-h-screen w-full p-5 bg-slate-950 flex flex-col gap-5">
      <div className="flex flex-col items-center gap-5 fixed top-0 left-0 bg-slate-950 w-full py-5 px-4">
        <Header />
      </div>

      {loading ? (
        <div className="flex justify-center items-center pt-20">
          <HomeLoader />
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-2 gap-5 pt-20 pb-3 w-full">
            {movies.map((elem, idx) => {
              return (
                <div
                  key={idx}
                  className="flex flex-col text-center items-center gap-2 w-full pb-3 border border-slate-700 rounded bg-slate-900"
                >
                  <div
                    onClick={() => navigate(`/movie/${elem.imdbID}`)}
                    className="h-60 w-full"
                  >
                    <img
                      className="w-full h-60 rounded object-cover"
                      src={elem.Poster !== "N/A" ? elem.Poster : noPoster}
                      onError={(e) => (e.target.src = noPoster)}
                    />
                  </div>
                  <div className="flex flex-col justify-between items-center gap-5 h-full px-2">
                    <h1 className="text-white text-lg font-semibold">
                      {elem.Title}
                    </h1>
                    <button
                      onClick={() => {
                        addToFav(elem.imdbID);
                      }}
                      className="text-black bg-white px-3 rounded py-1 font-semibold w-fit"
                    >
                      {favIds.includes(elem.imdbID)
                        ? "✅ Added to Fav"
                        : "❤️ Add to Fav"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          {message && (
            <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-white text-black rounded">
              {message}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TopRated;

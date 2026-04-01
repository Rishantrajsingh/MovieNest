import Buttons from "../components/Buttons";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const words = [
    "Action",
    "Adventure",
    "Drama",
    "Comedy",
    "Thriller",
    "Horror",
    "Romance",
    "Sci-Fi",
    "Fantasy",
    "Mystery",
    "Crime",
    "Animation",
    "Biography",
    "Documentary",
    "Family",
    "Musical",
    "War",
    "Western",
    "Superhero",
  ];

  const [randomWord] = useState(
    words[Math.floor(Math.random() * words.length)],
  );
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [favIds, setFavIds] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const api =
    search && isSearching
      ? `https://www.omdbapi.com/?s=${encodeURIComponent(search.trim())}&apikey=900e3577&page=${page}`
      : `https://www.omdbapi.com/?s=${encodeURIComponent(
          randomWord,
        )}&apikey=900e3577&page=${page}`;

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const res = await axios.get(api);
        const movies = res.data.Search || [];

        const uniqueMovies = movies.filter(
          (movie, index, self) =>
            index === self.findIndex((m) => m.imdbID === movie.imdbID),
        );

        const bannedWords = ["adult", "erotic", "sex", "porn", "romance"];

        const filteredMovies = uniqueMovies.filter((movie) => {
          if (!movie.Title) return false;

          return !bannedWords.some((word) =>
            movie.Title.toLowerCase().includes(word),
          );
        });

        setMovies(filteredMovies);

        console.log(filteredMovies);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [api]);

  const handleSearch = (query) => {
    setSearch(query);
    setIsSearching(true);
    setPage(1);
  };

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
        <SearchBar
          search={search}
          setSearch={setSearch}
          handleSearch={handleSearch}
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <Loader />
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-2 gap-5 pt-32 pb-3 w-full">
            {movies.map((elem, idx) => {
              return (
                <div
                  key={idx}
                  onClick={() => navigate(`/movie/${elem.imdbID}`)}
                  className="flex flex-col text-center items-center gap-2 w-full pb-3 border border-slate-700 rounded bg-slate-900"
                >
                  <div className="h-60 w-fit">
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
          <Buttons page={page} setPage={setPage} />
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

export default Home;

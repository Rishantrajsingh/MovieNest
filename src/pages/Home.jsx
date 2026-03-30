import Buttons from "../components/Buttons";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";

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
  // const [isFav, setIsFav] = useState(false);

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
        setMovies(uniqueMovies);
        console.log(uniqueMovies);
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

  const [favIds, setFavIds] = useState([]);

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
    }

    // if (!exists) {
    //   const movieObj = {
    //     id: value,
    //   };
    //   favMovies.push(movieObj);
    //   localStorage.setItem("favMovies", JSON.stringify(favMovies));
    //   setIsFav(true);
    // } else {
    //   console.log("Already Added to Favorites");
    //   setIsFav(false);
    // }
  };

  const noPoster = "src/images/noPoster.jpeg";

  return (
    <div className="min-h-screen w-full p-5 bg-gray-900 flex flex-col gap-5">
      <div className="flex flex-col items-center gap-5 fixed top-0 left-0 bg-gray-900 w-full py-5 px-4">
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
                  className="flex flex-col text-center items-center gap-2 w-full py-2 px-2 border rounded bg-gray-800"
                >
                  <div className="h-60 w-fit">
                    <img
                      className="w-full h-60 "
                      src={elem.Poster !== "N/A" ? elem.Poster : noPoster}
                      onError={(e) => (e.target.src = noPoster)}
                    />
                  </div>
                  <h1 className="text-white text-xl font-semibold">
                    {elem.Title}
                  </h1>
                  <button
                    onClick={() => {
                      addToFav(elem.imdbID);
                    }}
                    className="text-white"
                  >
                    {favIds.includes(elem.imdbID) ? "✅" : "❤️"}
                  </button>
                </div>
              );
            })}
          </div>
          <Buttons page={page} setPage={setPage} />
        </div>
      )}
    </div>
  );
};

export default Home;

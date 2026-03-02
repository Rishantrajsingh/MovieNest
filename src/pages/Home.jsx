import MovieCard from "../components/MovieCard";
import Buttons from "../components/Buttons";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Header from "../components/Header";

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

  const api =
    search && isSearching
      ? `https://www.omdbapi.com/?s=${encodeURIComponent(search)}&apikey=900e3577&page=${page}`
      : `https://www.omdbapi.com/?s=${encodeURIComponent(
          randomWord,
        )}&apikey=900e3577&page=${page}`;

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const res = await axios.get(api);
        setMovies(res.data.Search || []);
        console.log(res.data.Search || []);
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

  const nextPage = () => setPage((prev) => prev + 1);

  const prevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  return (
    <div className="min-h-screen w-full p-5 bg-gray-900 flex flex-col gap-5">
      <Header
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      {loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <Loader />
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-2 gap-5 pt-32 pb-3 w-full">
            {movies.map((elem, idx) => {
              return (
                <div key={idx}>
                  <MovieCard
                    poster={elem.Poster}
                    title={elem.Title}
                    id={elem.imdbID}
                  />
                </div>
              );
            })}
          </div>
          <Buttons
            page={page}
            setPage={setPage}
            nextPage={nextPage}
            prevPage={prevPage}
          />
        </div>
      )}
    </div>
  );
};

export default Home;

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

  const [isSearching, setIsSearching] = useState(false);
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const homeUrl = `https://www.omdbapi.com/?s=${encodeURIComponent(
    randomWord,
  )}&apikey=900e3577&page=${page}`;
  const searched = `https://www.omdbapi.com/?s=${search}&apikey=900e3577`;

  useEffect(() => {
    setLoading(true);
    const homePage = async () => {
      try {
        const res = await axios.get(homeUrl);
        setMovies(res.data.Search || []);
        console.log(res.data.Search || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    homePage();
  }, [page, randomWord]);

  useEffect(() => {
    setLoading(true);
    const resultPage = async () => {
      try {
        const res = await axios.get(searched);
        setMovies(res.data.Search || []);
        console.log(res.data.Search || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    resultPage();
  }, [search]);

  const nextPage = () => {
    setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen w-full p-5 bg-gray-900 flex flex-col gap-5">
      <Header
        isSearching={isSearching}
        setIsSearching={setIsSearching}
        search={search}
        setSearch={setSearch}
        movies={movies}
        setMovies={setMovies}
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

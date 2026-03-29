import { useEffect, useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";

const Favorites = () => {
  const [favMovies, setFavMovies] = useState([]);

  useEffect(() => {
    const movies = JSON.parse(localStorage.getItem("favorites")) || [];

    setFavMovies(movies);
  }, []);

  return (
    <div className="min-h-screen w-full p-5 bg-gray-900 ">
      <Header />
      <div className="grid grid-cols-2 gap-5 pt-32 pb-3 w-full">
        {favMovies.map((elem, idx) => {
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
    </div>
  );
};

export default Favorites;

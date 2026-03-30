import { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";

const Favorites = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const favMovies = JSON.parse(localStorage.getItem("favMovies")) || [];
      const urls = favMovies.map((value) => {
        return `https://www.omdbapi.com/?i=${value.id}&apikey=900e3577`;
      });
      const responses = await Promise.all(urls.map((url) => axios.get(url)));
      const data = responses.map((res) => res.data);
      setMovies(data);
    };
    fetchMovies();
  }, []);

  return (
    <div className="min-h-screen w-full p-5 bg-gray-900 ">
      <div className="fixed top-0 left-0 bg-gray-900 w-full py-5 px-4">
        <Header />
      </div>
      <div className="grid grid-cols-2 gap-5 pt-20 pb-3 w-full">
        {movies.map((elem, idx) => {
          return (
            <div
              key={idx}
              className="flex flex-col text-center items-center gap-2 w-full py-2 px-2 border rounded bg-gray-800"
            >
              <div className="h-60 w-fit">
                <img className="w-full h-60 rounded" src={elem.Poster} />
              </div>
              <h1 className="text-white text-xl font-semibold">{elem.Title}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Favorites;

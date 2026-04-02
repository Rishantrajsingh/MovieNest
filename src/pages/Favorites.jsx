import { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const favMovies = JSON.parse(localStorage.getItem("favMovies")) || [];
      const urls = favMovies.map((value) => {
        return `https://www.omdbapi.com/?i=${value.id}&apikey=900e3577`;
      });
      const responses = await Promise.all(urls.map((url) => axios.get(url)));
      const data = responses.map((res) => res.data);
      setMovies(data);
    };
    fetchMovies();
    setInterval(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const removeFromFav = (id) => {
    const favMovies = JSON.parse(localStorage.getItem("favMovies")) || [];

    const updated = favMovies.filter((movie) => movie.id !== id);

    localStorage.setItem("favMovies", JSON.stringify(updated));

    setMovies((prev) => prev.filter((movie) => movie.imdbID !== id));
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full p-5 bg-slate-950 flex flex-col justify-center">
        <div className="fixed top-0 left-0 bg-slate-950 w-full py-5 px-4">
          <Header />
        </div>
        <Loader />
      </div>
    );
  } else if (movies.length === 0) {
    return (
      <div className="min-h-screen w-full p-5 bg-gray-900 flex flex-col justify-center">
        <div className="fixed top-0 left-0 bg-gray-900 w-full py-5 px-4">
          <Header />
        </div>
        <h2 className="text-center text-white text-xl">
          Your favorites list is empty 😢 <br />
          Go to Home and add some movies 🎬
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full p-5 bg-slate-950 ">
      <div className="fixed top-0 left-0 bg-slate-950 w-full py-5 px-4">
        <Header />
      </div>
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
                  src={elem.Poster}
                />
              </div>
              <div className="flex flex-col justify-between items-center gap-5 h-full px-2">
                <h1 className="text-white text-lg font-semibold">
                  {elem.Title}
                </h1>
                <button
                  onClick={() => removeFromFav(elem.imdbID)}
                  className="text-black bg-white px-3 rounded py-1 font-semibold w-fit"
                >
                  💔 Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Favorites;

import { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CategoryLoader from "../components/CategoryLoader";

const Favorites = () => {
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const favMovies = JSON.parse(localStorage.getItem("favMovies")) || [];
      const urls = favMovies.map((value) => {
        return `https://www.omdbapi.com/?i=${value.id}&apikey=${apiKey}`;
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

  if (movies.length === 0) {
    return (
      <div className="relative overflow-hidden min-h-screen w-full p-5 bg-slate-950 flex flex-col justify-center">
        {/* background gradient  */}
        <div className="fixed top-0 left-0 w-125 h-125 bg-purple-700/20 blur-3xl rounded-full z-0"></div>
        <div className="fixed bottom-0 right-0 w-100 h-100 bg-pink-600/20 blur-3xl rounded-full z-0"></div>

        <div className="fixed top-0 left-0 z-20 bg-slate-950 w-full py-5 px-4">
          <Header />
        </div>
        <h2 className="relative z-10 text-center text-white text-xl">
          Your favorites list is empty 😢 <br />
          Go to Home and add some movies 🎬
        </h2>
      </div>
    );
  } else {
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
          <div className="relative z-10 grid grid-cols-3 gap-2 px-2 pt-16 pb-5">
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
  }
};

export default Favorites;

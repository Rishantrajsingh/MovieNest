import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import CategoryLoader from "../components/CategoryLoader";
import { getMovies } from "../service/movieSectionApi";
import { noPoster } from "../constants/imageConstants";

const MoviePages = ({ movieNames }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getMovies(movieNames);
      setMovies(data);
      console.log(data);
      setLoading(false);
    };

    fetchMovies();
  }, []);

  return (
    <div className="relative overflow-hidden min-h-screen w-full py-5 bg-slate-950 flex flex-col gap-5">
      {/* background gradient  */}
      <div className="fixed top-0 left-0 w-125 h-125 bg-purple-700/20 blur-3xl rounded-full z-0"></div>
      <div className="fixed bottom-0 right-0 w-100 h-100 bg-pink-600/20 blur-3xl rounded-full z-0"></div>

      <div className="fixed z-20 flex flex-col items-center top-0 left-0 bg-slate-950/10 w-full py-5 px-4 backdrop-blur-lg rounded shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)]">
        <Header searchBtn={true} />
      </div>

      {loading ? (
        <div className="flex justify-center items-center pt-15">
          <CategoryLoader />
        </div>
      ) : (
        <div className="relative z-10 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-10 justify-items-center gap-2 px-2 pt-16 md:pt-20 pb-5">
          {movies.map((elem, idx) => {
            return (
              <div key={idx} className="w-full">
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

export default MoviePages;

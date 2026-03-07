import axios from "axios";
import { useEffect, useState } from "react";
import Buttons from "../components/Buttons";
import MovieCard from "../components/MovieCard";
import Header from "../components/Header";

const TopRated = () => {
  const api = "https://www.omdbapi.com/?s=starwars&apikey=900e3577";

  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [topRatings, setTopRatings] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getApi = async () => {
      try {
        const res = await axios.get(api);
        console.log(res.data.Search || []);
        setTopRatedMovies(res.data.Search || []);
      } catch (error) {
        console.log(error);
      }
    };
    getApi();
  }, [page]);

  return (
    <div className="min-h-screen w-full p-5 bg-gray-900 ">
      <Header />
      <div>
        <div className="grid grid-cols-2 gap-5 pt-7 pb-3 w-full">
          {topRatedMovies.map((elem, idx) => {
            return (
              <div key={idx}>
                <MovieCard
                  poster={elem.Poster}
                  title={elem.Title}
                  imdbID={elem.imdbID}
                />
              </div>
            );
          })}
        </div>
        <Buttons page={page} setPage={setPage} />
      </div>
    </div>
  );
};

export default TopRated;

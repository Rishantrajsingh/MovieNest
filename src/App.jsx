import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Trending from "./pages/Trending";
import Popular from "./pages/Popular";
import TopRated from "./pages/TopRated";
import Header from "./components/Header";
import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const api = "http://www.omdbapi.com/?s=star wars&apikey=900e3577";

  const [movies, setMovies] = useState([]);
  const [searchMovie, setSearchMovie] = useState();
  useEffect(() => {
    const getMovies = async () => {
      try {
        const res = await axios.get(api);
        setMovies(res.data.Search);
        console.log(res.data.Search);
      } catch (error) {
        console.log(error);
      }
    };
    getMovies();
  }, [searchMovie]);

  return (
    <div className="h-full w-screen p-5 bg-gray-900 flex flex-col gap-5">
      <Header />
      <Routes>
        <Route path="/" element={<Home movies={movies} />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/top_rated" element={<TopRated />} />
      </Routes>
    </div>
  );
};

export default App;

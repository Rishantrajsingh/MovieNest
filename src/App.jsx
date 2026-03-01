import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import MovieCard from "./components/MovieCard";
import Buttons from "./components/Buttons";

const App = () => {
  const [searchMovies, setSearchMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchUrl = `https://www.omdbapi.com/?s=${search}&apikey=900e3577`;

  useEffect(() => {
    const searchApi = async () => {
      try {
        const res = await axios.get(searchUrl);
        setSearchMovies(res.data.Search || []);
        console.log(res.data.Search || []);
      } catch (error) {
        console.log(error);
      }
    };
    searchApi();
  }, [search]);

  return (
    <div className="min-h-screen w-full p-5 bg-gray-900 flex flex-col gap-5">
      <Header
        isSearching={isSearching}
        setIsSearching={setIsSearching}
        search={search}
        setSearch={setSearch}
      />
      <Home />
    </div>
  );
};

export default App;

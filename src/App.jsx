import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const words = [
    "love",
    "war",
    "night",
    "dark",
    "life",
    "king",
    "ghost",
    "star",
    "fire",
  ];
  const randomWord = words[Math.floor(Math.random() * words.length)];

  const homeUrl = `https://www.omdbapi.com/?s=${randomWord}&apikey=900e3577`;
  const searchUrl = `https://www.omdbapi.com/?s=${search}&apikey=900e3577`;

  useEffect(() => {
    const homePage = async () => {
      try {
        const res = await axios.get(homeUrl);
        setMovies(res.data.Search || []);
        console.log(res.data.Search || []);
      } catch (error) {
        console.log(error);
      }
    };
    homePage();
  }, []);

  useEffect(() => {
    const searchApi = async () => {
      try {
        if (isSearching && search !== "") {
          const res = await axios.get(searchUrl);
          setMovies(res.data.Search || []);
          console.log(res.data.Search || []);
        }
      } catch (error) {
        console.log(error);
      }
    };
    searchApi();
  }, [search]);

  return (
    <div className="h-full w-screen p-5 bg-gray-900 flex flex-col gap-5">
      <Header
        isSearching={isSearching}
        setIsSearching={setIsSearching}
        search={search}
        setSearch={setSearch}
      />
      <Routes>
        <Route path="/" element={<Home movies={movies} />} />
      </Routes>
    </div>
  );
};

export default App;

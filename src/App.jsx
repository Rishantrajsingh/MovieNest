import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

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

  const url = `https://www.omdbapi.com/?s=${randomWord}&apikey=900e3577`;

  console.log(randomWord);
  // const url = `https://www.omdbapi.com/?s=avengers&apikey=900e3577`;

  useEffect(() => {
    const getMovies = async () => {
      try {
        const res = await axios.get(url);
        setMovies(res.data.Search);
        console.log(res.data.Search);
      } catch (error) {
        console.log(error);
      }
    };
    getMovies();
  }, [search]);

  return (
    <div className="h-full w-screen p-5 bg-gray-900 flex flex-col gap-5">
      <Header search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home movies={movies} />} />
      </Routes>
    </div>
  );
};

export default App;

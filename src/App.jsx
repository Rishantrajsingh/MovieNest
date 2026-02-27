import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import SideBar from "./components/SideBar";

const App = () => {
  const [movies, setMovies] = useState([]);

  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const page = Math.floor(Math.random() * 5) + 1;

  const searchUrl = `https://www.omdbapi.com/?s=${search}&apikey=900e3577`;

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
    <div className="min-h-screen w-full p-5 bg-gray-900 flex flex-col gap-5">
      <SideBar />
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

import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Trending from "./pages/Trending";
import Popular from "./pages/Popular";
import TopRated from "./pages/TopRated";
import Header from "./components/Header";
import axios from "axios";

const App = () => {
  const api = "http://www.omdbapi.com/?i=tt3896198&apikey=900e3577";

  const getApi = async () => {
    try {
      const res = await axios.get(api);
      console.log(res.data.Poster);
    } catch (error) {
      console.log(error);
    }
  };

  getApi();

  return (
    <div className="h-screen w-screen p-5 bg-gray-900 flex flex-col gap-5">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/top_rated" element={<TopRated />} />
      </Routes>
    </div>
  );
};

export default App;

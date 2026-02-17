import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Trending from "./pages/Trending";
import Popular from "./pages/Popular";
import TopRated from "./pages/TopRated";
import Header from "./components/Header";

const App = () => {
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

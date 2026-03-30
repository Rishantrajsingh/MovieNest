import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TopRated from "./pages/TopRated";
import Favorites from "./pages/Favorites";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/toprated" element={<TopRated />} />
      <Route path="/fav" element={<Favorites />} />
    </Routes>
  );
};

export default App;

import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TopRated from "./pages/TopRated";
import Favourites from "./pages/Favourites";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/toprated" element={<TopRated />} />
      <Route path="/fav" element={<Favourites />} />
    </Routes>
  );
};

export default App;

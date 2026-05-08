import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TopRated from "./pages/TopRated";
import Favorites from "./pages/Favorites";
import MovieDetails from "./components/MovieDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Home />} />
      <Route path="/toprated" element={<TopRated />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
    </Routes>
  );
};

export default App;

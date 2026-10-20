import { Route, Routes, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import MovieDetails from "./components/MovieDetails";
import SearchMovies from "./pages/SearchMovies";
import LandingPage from "./pages/LandingPage";
import MoviePages from "./pages/MoviePages";

import {
  actionReloaded,
  comedyFullyLoaded,
  kidsCorner,
  searchMoviess,
  topRatedMovies,
  tvShows,
} from "./data/moviePages";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/home" element={<Home />} />

      <Route
        path="/action"
        element={<MoviePages movieNames={actionReloaded} />}
      />

      <Route path="/kids" element={<MoviePages movieNames={kidsCorner} />} />

      <Route
        path="/comedy"
        element={<MoviePages movieNames={comedyFullyLoaded} />}
      />

      <Route
        path="/toprated"
        element={<MoviePages movieNames={topRatedMovies} />}
      />

      <Route path="/tvshows" element={<MoviePages movieNames={tvShows} />} />

      <Route
        path="/search"
        element={<SearchMovies movieNames={searchMoviess} />}
      />

      <Route path="/favorites" element={<Favorites />} />

      <Route path="/movie/:id" element={<MovieDetails />} />

      {/* Redirect removed authentication pages */}
      <Route path="/login" element={<Navigate to="/home" replace />} />

      <Route path="/signup" element={<Navigate to="/home" replace />} />

      <Route path="/profile" element={<Navigate to="/home" replace />} />

      {/* Unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;

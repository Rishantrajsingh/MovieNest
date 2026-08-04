import { Route, Routes } from "react-router-dom";
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
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/action"
        element={
          <ProtectedRoute>
            <MoviePages movieNames={actionReloaded} />{" "}
          </ProtectedRoute>
        }
      />
      <Route path="/kids" element={<MoviePages movieNames={kidsCorner} />} />
      <Route
        path="/comedy"
        element={
          <ProtectedRoute>
            <MoviePages movieNames={comedyFullyLoaded} />
          </ProtectedRoute>
        }
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
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default App;

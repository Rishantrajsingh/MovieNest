import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import MovieDetails from "./components/MovieDetails";
import ActionReloaded from "./pages/ActionReloaded";
import KidsCorner from "./pages/KidsCorner";
import ComedyFullyLoaded from "./pages/ComedyFullyLoaded";
import TopRatedMovies from "./pages/TopRatedMovies";
import SearchMovies from "./pages/SearchMovies";
import LandingPage from "./pages/LandingPage";
import TvShowsPage from "./pages/TvShowsPage";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/" element={<Home />} />
      <Route path="/action" element={<ActionReloaded />} />
      <Route path="/kidscorner" element={<KidsCorner />} />
      <Route path="/tvshows" element={<TvShowsPage />} />
      <Route path="/comedy" element={<ComedyFullyLoaded />} />
      <Route path="/toprated" element={<TopRatedMovies />} />
      <Route path="/search" element={<SearchMovies />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
    </Routes>
  </BrowserRouter>,
);

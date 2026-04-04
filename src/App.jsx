import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TopRated from "./pages/TopRated";
import Favorites from "./pages/Favorites";
import MovieDetails from "./components/MovieDetails";
import { useState } from "react";
import Splash from "./components/Splash";

const App = () => {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <Splash onFinish={() => setLoading(false)} />;
  }
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/toprated" element={<TopRated />} /> */}
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
    </Routes>
  );
};

export default App;

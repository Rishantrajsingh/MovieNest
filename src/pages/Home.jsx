import { useEffect, useState } from "react";
import HomeLoader from "../components/HomeLoader";
import Header from "../components/Header";
import MovieSection from "../components/MovieSection";
import {
  actionMovies,
  comedyMovies,
  kidsCartoons,
  mixedTvShows,
  topRatedMovies,
} from "../data/movieSection";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen w-full py-5 bg-slate-950 flex flex-col gap-5 overflow-hidden">
      {/* Background gradient */}
      <div className="fixed top-0 left-0 w-125 h-125 bg-purple-700/20 blur-3xl rounded-full z-0"></div>
      <div className="fixed bottom-0 right-0 w-100 h-100 bg-pink-600/20 blur-3xl rounded-full z-0"></div>

      <div className="fixed z-20 flex flex-col items-center top-0 left-0 bg-slate-950/10 w-full py-5 px-4 backdrop-blur-lg rounded shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)]">
        <Header searchBtn={true} favbtn={true} />
      </div>

      {loading ? (
        <div className="flex justify-center items-center pt-15">
          <HomeLoader />
        </div>
      ) : (
        <div className="relative z-10 pt-15">
          <div className="w-full h-fit overflow-hidden bg-slate-950 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)]">
            <img
              src="/images/homebanner.png"
              alt="MovieNest home banner"
              className="w-full h-fit object-cover shrink-0"
            />
          </div>

          <div className="pt-5">
            <MovieSection
              movieNames={actionMovies}
              title="Action Reloaded"
              moviePageTitle="action"
            />

            <MovieSection
              movieNames={kidsCartoons}
              title="Kid's Corner"
              moviePageTitle="kids"
            />

            <MovieSection
              movieNames={comedyMovies}
              title="Comedy Fully Loaded"
              moviePageTitle="comedy"
            />

            <MovieSection
              movieNames={topRatedMovies}
              title="Top Rated Movies"
              moviePageTitle="toprated"
            />

            <MovieSection
              movieNames={mixedTvShows}
              title="Tv Show's"
              moviePageTitle="tvshows"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

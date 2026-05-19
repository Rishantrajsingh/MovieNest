import { useEffect, useState, useRef } from "react";
import axios from "axios";
import HomeLoader from "../components/HomeLoader";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";
import Action from "../components/Action";
import Cartoons from "../components/Cartoons";
import TvShows from "../components/TvShows";
import Comedy from "../components/Comedy";
import TopRated from "../components/TopRated";

const Home = () => {
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;

  const moviePosters = [
    "/images/banner3.png",
    "/images/banner2.png",
    "/images/banner1.png",
  ];

  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const [loading, setLoading] = useState(true);

  // Auto Slide
  useEffect(() => {
    if (!moviePosters?.length) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev === moviePosters.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [moviePosters]);

  // Next Slide
  const nextSlide = () => {
    setCurrent((prev) => (prev === moviePosters.length - 1 ? 0 : prev + 1));
  };

  // Prev Slide
  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? moviePosters.length - 1 : prev - 1));
  };

  // Touch Start
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  // Touch End
  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;

    const distance = touchStartX.current - touchEndX.current;

    // Swipe Left
    if (distance > 50) {
      nextSlide();
    }

    // Swipe Right
    if (distance < -50) {
      prevSlide();
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="relative min-h-screen w-full py-5 bg-slate-950 flex flex-col gap-5 overflow-hidden">
      {/* background gradient  */}
      <div className="fixed top-0 left-0 w-125 h-125 bg-purple-700/20 blur-3xl rounded-full z-0"></div>
      <div className="fixed bottom-0 right-0 w-100 h-100 bg-pink-600/20 blur-3xl rounded-full z-0"></div>

      <div className="fixed z-20 flex flex-col items-center top-0 left-0 bg-slate-950/10 w-full py-5 px-4 backdrop-blur-lg rounded shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)]">
        <Header />
      </div>

      {loading ? (
        <div className="flex justify-center items-center pt-15">
          <HomeLoader />
        </div>
      ) : (
        <div className="relative z-10 pt-15">
          <div
            className="w-full h-fit overflow-hidden bg-slate-950 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)]"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Slides */}
            <div
              className="flex h-fit transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${current * 100}%)`,
              }}
            >
              {moviePosters.map((movie, index) => (
                <img
                  key={index}
                  src={movie}
                  className="w-full h-fit object-cover shrink-0"
                />
              ))}
            </div>
          </div>

          <div className="pt-5">
            <Action />
            <Cartoons />
            <TvShows />
            <Comedy />
            <TopRated />
          </div>
        </div>
      )}
    </div>
  );
};
export default Home;

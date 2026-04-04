import { useEffect, useState } from "react";

const posters = [
  "https://image.tmdb.org/t/p/original/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
  "https://image.tmdb.org/t/p/original/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg",
  "https://image.tmdb.org/t/p/original/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg",
  "https://image.tmdb.org/t/p/original/3CxUndGhUcZdt1Zggjdb2HkLLQX.jpg",
];

const Splash = ({ onFinish }) => {
  const [poster, setPoster] = useState("");

  useEffect(() => {
    const randomPoster = posters[Math.floor(Math.random() * posters.length)];
    setPoster(randomPoster);

    const timer = setTimeout(() => {
      onFinish();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      className="h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${poster})` }}
    >
      <div className="bg-black/70 backdrop-blur-md p-10 text-center text-white max-w-lg h-full shadow-2xl border border-white/10 flex flex-col items-center justify-center">
        <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-800 via-yellow-500 to-yellow-500 bg-clip-text text-transparent tracking-wide">
          🎬 MovieNest
        </h1>

        <p className="text-gray-300 text-base leading-relaxed mb-6">
          Your personal space to{" "}
          <span className="text-white font-semibold">discover</span>, explore
          and save amazing movies. Dive into stories, ratings, and build your
          own favorite collection.
        </p>

        <div className="flex justify-center items-center gap-2">
          <span className="text-gray-400 text-sm">
            Loading your movie world
          </span>

          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default Splash;

import { motion } from "framer-motion";
import { Play, Star, Film } from "lucide-react";
import { NavLink } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-125 h-125 bg-purple-700/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-100 h-100 bg-pink-600/20 blur-3xl rounded-full"></div>

      {/* Navbar */}
      <div className="relative z-10 flex items-center justify-between px-6 py-6 mt-5">
        <h1 className="text-5xl font-bold tracking-wide">
          Movie<span className="text-yellow-400">Nest</span>
        </h1>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-6 pb-20 gap-14">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <p className="text-yellow-400 font-medium mb-4 tracking-widest uppercase">
            Unlimited Movies
          </p>

          <h1 className="text-5xl font-black leading-tight">
            Discover Movies <br />
            You'll <span className="text-yellow-400">Love.</span>
          </h1>

          <p className="text-gray-400 text-lg mt-6 leading-relaxed">
            Search trending movies, explore ratings, save favorites, and dive
            into a cinematic universe built for movie lovers.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-10">
            <NavLink
              to="/login"
              className="flex items-center gap-2 px-7 py-4 rounded-2xl bg-yellow-500 transition text-lg font-semibold shadow-lg shadow-yellow-800/40"
            >
              <Play size={20} />
              Browse Movies
            </NavLink>
          </div>
        </motion.div>
      </div>

      {/* Features */}
      <div className="relative z-10 px-6 pb-10">
        <div className="grid gap-6">
          <div className="bg-[#0f172a] border border-gray-800 rounded-3xl p-8 hover:border-purple-500 transition">
            <div className="w-14 h-14 rounded-2xl bg-purple-600/20 flex items-center justify-center mb-5">
              <Film className="text-purple-400" />
            </div>

            <h2 className="text-2xl font-bold mb-3">Massive Collection</h2>

            <p className="text-gray-400">
              Explore thousands of movies from every genre imaginable.
            </p>
          </div>

          <div className="bg-[#0f172a] border border-gray-800 rounded-3xl p-8 hover:border-purple-500 transition">
            <div className="w-14 h-14 rounded-2xl bg-pink-600/20 flex items-center justify-center mb-5">
              <Star className="text-pink-400" />
            </div>

            <h2 className="text-2xl font-bold mb-3">Ratings & Reviews</h2>

            <p className="text-gray-400">
              Discover top-rated movies with detailed information.
            </p>
          </div>

          <div className="bg-[#0f172a] border border-gray-800 rounded-3xl p-8 hover:border-purple-500 transition">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/20 flex items-center justify-center mb-5">
              <Play className="text-blue-400" />
            </div>

            <h2 className="text-2xl font-bold mb-3">Smooth Experience</h2>

            <p className="text-gray-400">
              Fast, responsive, and beautifully designed for movie lovers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

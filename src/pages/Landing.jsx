const Landing = () => {
  const movies = [
    "Dune",
    "Interstellar",
    "Joker",
    "Inception",
    "Avatar",
    "The Batman",
    "John Wick",
    "Oppenheimer",
  ];

  return (
    <div className="min-h-screen w-full bg-[#07111f] text-white">
      {/* Background Glow */}
      <div className="absolute w-full h-full bg-blue-500/20 blur-3xl rounded-full" />
      <div className="absolute w-full h-full bg-cyan-400/10 blur-3xl rounded-full" />

      {/* Navbar */}
      <div className="flex items-center justify-between p-5">
        <h1 className="text-3xl font-black tracking-wide bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          MovieNest
        </h1>

        <button className="bg-blue-600 transition px-5 py-2 rounded-xl font-semibold shadow-lg shadow-blue-500/20">
          Sign In
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 px-4 pt-6 pb-16 grid gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full text-sm text-cyan-300 mb-6">
            ✨ Discover Unlimited Movies
          </div>

          <h2 className="text-4xl font-black leading-tight">
            Your Ultimate
            <span className="block bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Movie Universe
            </span>
          </h2>

          <p className="mt-5 text-base text-gray-400 max-w-xl leading-relaxed">
            Search movies instantly, explore top-rated films, save your
            favorites, and create your own cinematic collection with MovieNest.
          </p>

          <div className="flex flex-col gap-4 mt-8">
            <button className="w-full bg-blue-600 hover:bg-blue-500 transition px-7 py-4 rounded-2xl text-base font-semibold shadow-xl shadow-blue-500/30">
              Explore Movies
            </button>

            <button className="w-full border border-white/10 bg-white/5 hover:bg-white/10 transition px-7 py-4 rounded-2xl text-base font-semibold backdrop-blur-md">
              Watch Trailer
            </button>
          </div>

          {/* Stats */}
          <div className="flex justify-evenly gap-4 mt-12 max-w-lg">
            <div>
              <h3 className="text-3xl font-bold text-cyan-300">50K+</h3>
              <p className="text-gray-400 mt-1">Movies</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-cyan-300">10K+</h3>
              <p className="text-gray-400 mt-1">Users</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-cyan-300">4.9★</h3>
              <p className="text-gray-400 mt-1">Rating</p>
            </div>
          </div>
        </div>

        {/* Right Side Cards */}
        <div className="relative flex justify-center items-center mt-6">
          <div className="grid grid-cols-2 gap-3 rotate-3 sm:rotate-6 scale-90 sm:scale-100">
            {movies.map((movie, index) => (
              <div
                key={index}
                className="w-35 h-52.5 rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-lg shadow-2xl hover:-translate-y-3 transition duration-300"
              >
                <div className="h-full w-full bg-linear-to-br from-blue-900 to-cyan-500 p-4 flex flex-col justify-end">
                  <div className="bg-black/40 backdrop-blur-sm p-3 rounded-2xl border border-white/10">
                    <p className="font-bold text-lg">{movie}</p>
                    <p className="text-sm text-gray-300 mt-1">
                      Top Rated Movie
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 px-4 sm:px-6 md:px-16 pb-20 md:pb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black">
            Why Choose <span className="text-cyan-400">MovieNest</span>?
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Designed like a real product experience — modern, fast, and
            cinematic.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl hover:border-cyan-400/30 transition">
            <div className="text-5xl mb-5">🔍</div>
            <h3 className="text-2xl font-bold mb-3">Smart Search</h3>
            <p className="text-gray-400 leading-relaxed">
              Search any movie instantly with clean and fast results.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl hover:border-cyan-400/30 transition">
            <div className="text-5xl mb-5">⭐</div>
            <h3 className="text-2xl font-bold mb-3">Top Rated</h3>
            <p className="text-gray-400 leading-relaxed">
              Discover trending and highest-rated movies curated for users.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl hover:border-cyan-400/30 transition">
            <div className="text-5xl mb-5">❤️</div>
            <h3 className="text-2xl font-bold mb-3">Favorites</h3>
            <p className="text-gray-400 leading-relaxed">
              Save movies to your personal watchlist and access anytime.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-4 sm:px-6 md:px-16 pb-20">
        <div className="rounded-[40px] overflow-hidden bg-linear-to-r from-blue-600 to-cyan-500 p-px shadow-2xl shadow-blue-500/20">
          <div className="bg-[#081423] rounded-[40px] px-5 sm:px-8 md:px-16 py-12 sm:py-16 text-center">
            <h2 className="text-4xl md:text-5xl font-black max-w-3xl mx-auto leading-tight">
              Start Exploring The World Of Cinema Today
            </h2>

            <p className="text-gray-400 text-lg mt-5 max-w-2xl mx-auto">
              Build your collection, discover masterpieces, and enjoy the
              ultimate movie experience.
            </p>

            <button className="mt-8 bg-blue-600 hover:bg-blue-500 transition px-8 py-4 rounded-2xl text-lg font-bold shadow-xl shadow-blue-500/30">
              Get Started
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;

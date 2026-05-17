import Buttons from "../components/Buttons";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import HomeLoader from "../components/HomeLoader";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";
import Action from "../components/Action";
import Cartoons from "../components/Cartoons";
import Comedy from "../components/Comedy";

const Home = () => {
  const words = [
    "Action",
    "Adventure",
    "Drama",
    "Comedy",
    "Thriller",
    "Horror",
    "Romance",
    "Sci-Fi",
    "Fantasy",
    "Mystery",
    "Crime",
    "Animation",
    "Biography",
    "Documentary",
    "Family",
    "Musical",
    "War",
    "Western",
    "Superhero",
  ];

  const [randomWord] = useState(
    words[Math.floor(Math.random() * words.length)],
  );
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [favIds, setFavIds] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const api =
    search && isSearching
      ? `https://www.omdbapi.com/?s=${encodeURIComponent(search.trim())}&apikey=900e3577&page=${page}`
      : `https://www.omdbapi.com/?s=${encodeURIComponent(
          randomWord,
        )}&apikey=900e3577&page=${page}`;

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const res = await axios.get(api);
        const movies = res.data.Search || [];

        const uniqueMovies = movies.filter(
          (movie, index, self) =>
            index === self.findIndex((m) => m.imdbID === movie.imdbID),
        );

        const bannedWords = ["adult", "erotic", "sex", "porn", "romance"];
        const filteredMovies = uniqueMovies.filter((movie) => {
          if (!movie.Title) return false;
          return !bannedWords.some((word) =>
            movie.Title.toLowerCase().includes(word),
          );
        });

        setMovies(filteredMovies);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [api]);

  useEffect(() => {
    const favMovies = JSON.parse(localStorage.getItem("favMovies")) || [];
    const ids = favMovies.map((m) => m.id);
    setFavIds(ids);
  }, []);

  const addToFav = (value) => {
    const favMovies = JSON.parse(localStorage.getItem("favMovies")) || [];
    const exists = favMovies.some((movie) => movie.id === value);
    if (!exists) {
      const updated = [...favMovies, { id: value }];
      localStorage.setItem("favMovies", JSON.stringify(updated));
      setFavIds([...favIds, value]);
      setMessage("Movie added to favorites");
    } else {
      setMessage("Already added to favorites");
    }
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  const noPoster =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYY-4QN85YJRDZ3twNWtHBpYgypmHu5ZZk0w&s";

  const moviePosters = [
    "https://image.tmdb.org/t/p/original/9BBTo63ANSmhC4e6r62OJFuK2GL.jpg",
    "https://image.tmdb.org/t/p/original/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg",
    "https://image.tmdb.org/t/p/original/5YZbUmjbMa3ClvSW1Wj3D6XGolb.jpg",
    "https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
    "https://image.tmdb.org/t/p/original/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg",
    "https://image.tmdb.org/t/p/original/wcKFYIiVDvRURrzglV9kGu7fpfY.jpg",
    "https://image.tmdb.org/t/p/original/AaV1YIdWKnjAIAOe8UUKBFm327v.jpg",
    "https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    "https://image.tmdb.org/t/p/original/xDMIl84Qo5Tsu62c9DGWhmPI67A.jpg",
    "https://image.tmdb.org/t/p/original/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
  ];

  const [current, setCurrent] = useState(0);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

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

  return (
    <div className="min-h-screen w-full py-5 bg-slate-950 flex flex-col gap-5">
      <div className="fixed z-10 flex flex-col items-center gap-5 top-0 left-0 bg-slate-950 w-full py-5 px-4">
        <Header />
        <SearchBar
          search={search}
          setSearch={setSearch}
          setIsSearching={setIsSearching}
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center pt-32">
          <HomeLoader />
        </div>
      ) : (
        <div className="z-0 pt-32">
          <div
            className="w-full h-fit overflow-hidden bg-white"
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
                  alt={movie}
                  className="w-full h-fit object-cover shrink-0"
                />
              ))}
            </div>
          </div>

          {/* action movies section  */}
          <Action />
          <Cartoons />
          {/* <Comedy /> */}

          {/* <Buttons page={page} setPage={setPage} /> */}
          {message && (
            <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-white text-black rounded">
              {message}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Home;

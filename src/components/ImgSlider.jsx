import { useEffect, useState } from "react";

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

const [randomWord] = useState(words[Math.floor(Math.random() * words.length)]);
const [movies, setMovies] = useState([]);

const api = `https://www.omdbapi.com/?s=${encodeURIComponent(
  randomWord,
)}&apikey=900e3577`;

useEffect(() => {
  const fetchMovies = async () => {
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

const ImgSlider = () => {
  const [current, setCurrent] = useState(0);

  // Next Slide
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  // Previous Slide
  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex justify-center items-center pt-32">
      <div className="w-full h-62.5 overflow-hidden">
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {movies.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="slide"
              className="w-full h-full object-cover flex-shrink-0"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImgSlider;

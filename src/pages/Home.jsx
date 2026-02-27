import MovieCard from "../components/MovieCard";
import Buttons from "../components/Buttons";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";

const Home = (props) => {
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
    "Psychological",
    "Suspense",
    "Dark",
    "Emotional",
    "Inspirational",
    "Blockbuster",
    "Indie",
    "Classic",
    "Cult",
    "Epic",
    "Romantic Comedy",
    "Survival",
    "Time Travel",
    "Dystopian",
    "Post-Apocalyptic",
    "Based on True Story",
    "Coming of Age",
    "Revenge",
    "Heist",
    "Spy",
    "Martial Arts",
    "Historical",
    "Political",
    "Legal Drama",
    "Sports",
    "Teen",
    "Road Trip",
    "Alien",
    "Zombie",
    "Mythology",
    "Experimental",
  ];
  const randomWord = words[Math.floor(Math.random() * words.length)];
  const [page, setPage] = useState(1);
  const [homeMovies, setHomeMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const homeUrl = `https://www.omdbapi.com/?s=${randomWord}&apikey=900e3577&page=${page}`;

  useEffect(() => {
    setLoading(true);
    const homePage = async () => {
      try {
        const res = await axios.get(homeUrl);
        setHomeMovies(res.data.Search || []);
        console.log(res.data.Search || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    homePage();
  }, [page]);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <Loader />
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-2 gap-5 pt-32 pb-3 w-full">
            {homeMovies.map((elem, idx) => {
              return (
                <div key={idx}>
                  <MovieCard
                    poster={elem.Poster}
                    title={elem.Title}
                    id={elem.imdbID}
                  />
                </div>
              );
            })}
          </div>
          <Buttons page={page} setPage={setPage} />
        </div>
      )}
    </div>
  );
};

export default Home;

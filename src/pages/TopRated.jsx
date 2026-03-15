import axios from "axios";
import { useEffect, useState } from "react";
import Buttons from "../components/Buttons";
import MovieCard from "../components/MovieCard";
import Header from "../components/Header";

const TopRated = () => {
  const topRatedNames = [
    "The Shawshank Redemption",
    "The Godfather",
    "The Dark Knight",
    "The Godfather Part II",
    "12 Angry Men",
    "Schindler's List",
    "The Lord of the Rings: The Return of the King",
    "Pulp Fiction",
    "The Good, the Bad and the Ugly",
    "Fight Club",
    "Forrest Gump",
    "Inception",
    "The Lord of the Rings: The Fellowship of the Ring",
    "Star Wars: Episode V - The Empire Strikes Back",
    "The Lord of the Rings: The Two Towers",
    "The Matrix",
    "Goodfellas",
    "One Flew Over the Cuckoo's Nest",
    "Seven Samurai",
    "Se7en",
    "City of God",
    "The Silence of the Lambs",
    "It's a Wonderful Life",
    "Life Is Beautiful",
    "Saving Private Ryan",
    "Spirited Away",
    "Interstellar",
    "Parasite",
    "The Green Mile",
    "Léon: The Professional",
    "The Usual Suspects",
    "Harakiri",
    "The Lion King",
    "Back to the Future",
    "Terminator 2: Judgment Day",
    "American History X",
    "Modern Times",
    "Psycho",
    "Gladiator",
    "The Departed",
    "Whiplash",
    "The Prestige",
    "Casablanca",
    "Grave of the Fireflies",
    "Once Upon a Time in the West",
    "Rear Window",
    "Cinema Paradiso",
    "Apocalypse Now",
    "Alien",
    "Memento",
  ];

  // const topNames = topRatedNames.map((e) => {
  //   for (let i = 0; i < e.length; i++) {
  //     return `https://www.omdbapi.com/?s=${e}&apikey=900e3577`;
  //   }
  // });

  const topNames = "https://www.omdbapi.com/?t=avengers&apikey=900e3577";

  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getApi = async () => {
      try {
        const res = await axios.get(topNames);
        setTopRatedMovies(res.data || []);
        console.log(res.data || []);
      } catch (error) {
        console.log(error);
      }
    };
    getApi();
  }, [topNames]);

  return (
    <div className="min-h-screen w-full p-5 bg-gray-900 ">
      <Header />
      <div>
        <div className="grid grid-cols-2 gap-5 pt-7 pb-3 w-full">
          {topRatedMovies.map((elem, idx) => {
            return (
              <div key={idx}>
                <MovieCard
                  poster={elem.Poster}
                  title={elem.Title}
                  imdbID={elem.imdbID}
                />
              </div>
            );
          })}
        </div>
        {/* <Buttons page={page} setPage={setPage} /> */}
      </div>
    </div>
  );
};

export default TopRated;

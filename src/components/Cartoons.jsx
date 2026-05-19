import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const Cartoons = () => {
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;

  const kidsCartoons = [
    "Doraemon",
    "Dragon Tales",
    "Ben 10",
    "Tom and Jerry",
    "Scooby-Doo",
    "Pokemon",
    "Peppa Pig",
    "Motu Patlu",
    "Chhota Bheem",
    "Oggy and the Cockroaches",
    "Kung Fu Panda",
    "The Powerpuff Girls",
    "Teen Titans Go!",
    "SpongeBob SquarePants",
    "Adventure Time",
  ];

  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const requests = kidsCartoons.map((name) =>
          axios.get(
            `https://www.omdbapi.com/?t=${encodeURIComponent(name)}&apikey=${apiKey}`,
          ),
        );

        const responses = await Promise.all(requests);

        const movie = responses.map((res) => res.data);

        setMovies(movie);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const noPoster =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYY-4QN85YJRDZ3twNWtHBpYgypmHu5ZZk0w&s";

  return (
    <div className="pt-5 pl-3 pb-3">
      <NavLink to="/kidscorner" className="text-white font-semibold text-xl">
        Kid's Corner &gt;
      </NavLink>
      <div className="flex gap-2 w-full py-2 overflow-x-auto">
        {movies.map((elem, idx) => {
          return (
            <div key={idx} className="flex items-center justify-center rounded">
              <div
                onClick={() => navigate(`/movie/${elem.imdbID}`)}
                className="w-50 h-full rounded overflow-hidden"
              >
                <img
                  onClick={() => navigate(`/movie/${elem.imdbID}`)}
                  className="rounded object-contain"
                  src={elem.Poster !== "N/A" ? elem.Poster : noPoster}
                  onError={(e) => (e.target.src = noPoster)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cartoons;

import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import CategoryLoader from "../components/CategoryLoader";

const KidsCorner = () => {
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
    "Phineas and Ferb",
    "We Bare Bears",
    "Mr. Bean: The Animated Series",
    "Paw Patrol",
    "Bluey",
    "Shrek",
    "Frozen",
    "Frozen II",
    "Toy Story",
    "Toy Story 2",
    "Toy Story 3",
    "Toy Story 4",
    "Finding Nemo",
    "Finding Dory",
    "Cars",
    "Cars 2",
    "Cars 3",
    "Coco",
    "Moana",
    "Encanto",
    "Zootopia",
    "Big Hero 6",
    "Inside Out",
    "Ratatouille",
    "Up",
    "Wall-E",
    "Luca",
    "Soul",
    "Turning Red",
    "The Incredibles",
    "Incredibles 2",
    "Minions",
    "Despicable Me",
    "Despicable Me 2",
    "Despicable Me 3",
  ];
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
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
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const noPoster =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYY-4QN85YJRDZ3twNWtHBpYgypmHu5ZZk0w&s";

  return (
    <div className="relative overflow-hidden min-h-screen w-full py-5 bg-slate-950 flex flex-col gap-5">
      {/* background gradient  */}
      <div className="fixed top-0 left-0 w-125 h-125 bg-purple-700/20 blur-3xl rounded-full z-0"></div>
      <div className="fixed bottom-0 right-0 w-100 h-100 bg-pink-600/20 blur-3xl rounded-full z-0"></div>

      <div className="fixed z-20 flex flex-col items-center top-0 left-0 bg-slate-950/10 w-full py-5 px-4 backdrop-blur-lg rounded shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)]">
        <Header />
      </div>

      {loading ? (
        <div className="flex justify-center items-center pt-15">
          <CategoryLoader />
        </div>
      ) : (
        <div className="relative z-10 grid grid-cols-3 gap-2 px-2 pt-16 pb-5">
          {movies.map((elem, idx) => {
            return (
              <div key={idx}>
                <div>
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
      )}
    </div>
  );
};

export default KidsCorner;

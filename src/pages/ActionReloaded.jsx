import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import CategoryLoader from "../components/CategoryLoader";
import apiCache from "../../utils/apiCache";

const ActionReloaded = () => {
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;

  const actionMovies = [
    "John Wick",
    "Mad Max: Fury Road",
    "The Dark Knight",
    "Mission: Impossible – Fallout",
    "Gladiator",
    "Die Hard",
    "Top Gun: Maverick",
    "Avengers: Endgame",
    "The Matrix",
    "Extraction",
    "Nobody",
    "Bullet Train",
    "Casino Royale",
    "Terminator 2: Judgment Day",
    "The Raid",
    "War",
    "Pathaan",
    "Jawan",
    "Tiger Zinda Hai",
    "Dhoom 2",
    "Krrish",
    "Don",
    "Animal",
    "Shershaah",
    "URI: The Surgical Strike",
    "Singham",
    "Ghajini",
    "RRR",
    "Ra.One",
    "Baaghi",
    "The Equalizer",
    "Taken",
    "Skyfall",
    "Black Panther",
    "Captain America: Civil War",
    "Thor: Ragnarok",
    "300",
    "Inception",
    "Edge of Tomorrow",
    "Pacific Rim",
    "The Expendables",
    "Kill Bill: Vol. 1",
    "Rambo",
    "Commando",
    "Baby",
    "Satyameva Jayate",
    "Rocky Handsome",
    "Vikram",
    "Leo",
    "The Wolverine",
  ];

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const requests = actionMovies.map((name) =>
          apiCache(
            `https://www.omdbapi.com/?t=${encodeURIComponent(name)}&apikey=${apiKey}`,
          ),
        );

        const responses = await Promise.all(requests);
        setMovies(responses);
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
        <div className="relative z-10 grid grid-cols-3 md:grid-cols-4 justify-items-center md:justify-items-center gap-2 px-2 pt-16 md:pt-20 pb-5">
          {movies.map((elem, idx) => {
            return (
              <div key={idx} className="w-30 md:w-45">
                <img
                  onClick={() => navigate(`/movie/${elem.imdbID}`)}
                  className="rounded object-contain"
                  src={elem.Poster !== "N/A" ? elem.Poster : noPoster}
                  onError={(e) => (e.target.src = noPoster)}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ActionReloaded;

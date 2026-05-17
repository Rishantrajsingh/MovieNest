import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";

const ActionReloaded = () => {
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
    "Force",
    "Satyameva Jayate",
    "Rocky Handsome",
    "Vikram",
    "Leo",
    "The Wolverine",
    "Logan",
    "Doctor Strange",
    "Iron Man",
    "Spider-Man: No Way Home",
    "Deadpool",
    "Deadpool 2",
    "The Batman",
    "Man of Steel",
    "Aquaman",
    "Tenet",
    "Dunkirk",
    "Sherlock Holmes",
    "Uncharted",
    "Venom",
    "Blade Runner 2049",
    "Kingsman: The Secret Service",
    "Salt",
    "Lucy",
    "Atomic Blonde",
    "Jack Reacher",
    "Olympus Has Fallen",
    "London Has Fallen",
    "White House Down",
    "Transformers",
    "Transformers: Dark of the Moon",
    "Godzilla vs. Kong",
    "Kong: Skull Island",
    "Mortal Kombat",
    "Mulan",
    "Prince of Persia",
    "The Mummy",
    "Predator",
    "Aliens",
    "Indiana Jones and the Last Crusade",
    "Pirates of the Caribbean",
    "Bad Boys",
    "Bad Boys for Life",
    "Rush Hour 2",
    "Shootout at Lokhandwala",
    "Wanted",
    "Sultan",
    "Kick",
    "Race",
    "Race 2",
    "A Wednesday",
    "Kaithi",
    "Master",
    "Theri",
    "Beast",
  ];

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const requests = actionMovies.map((name) =>
          axios.get(
            `https://www.omdbapi.com/?t=${encodeURIComponent(name)}&apikey=900e3577`,
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
    <div className="min-h-screen w-full py-5 bg-slate-950 flex flex-col gap-5">
      <div className="fixed z-10 flex flex-col items-center gap-5 top-0 left-0 bg-slate-950 w-full py-5 px-4">
        <Header />
      </div>

      <div className="grid grid-cols-3 gap-2 px-2 pt-16 pb-5">
        {movies.map((elem, idx) => {
          return (
            <div key={idx}>
              <div className="">
                <img
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

export default ActionReloaded;

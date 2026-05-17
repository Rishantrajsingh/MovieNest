import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";

const KidsCorner = () => {
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
    "The Secret Life of Pets",
    "Rio",
    "Rio 2",
    "Ice Age",
    "Ice Age: The Meltdown",
    "Ice Age: Dawn of the Dinosaurs",
    "Madagascar",
    "Madagascar 2",
    "Madagascar 3",
    "How to Train Your Dragon",
    "How to Train Your Dragon 2",
    "How to Train Your Dragon: The Hidden World",
    "The Croods",
    "The Boss Baby",
    "Hotel Transylvania",
    "Hotel Transylvania 2",
    "Hotel Transylvania 3",
    "Tangled",
    "Brave",
    "The Lion King",
    "Aladdin",
    "Beauty and the Beast",
    "The Little Mermaid",
    "Bolt",
    "Hercules",
    "Tarzan",
    "Mulan",
    "Kung Fu Panda 2",
    "Kung Fu Panda 3",
    "Megamind",
    "The Lego Movie",
    "The Lego Batman Movie",
    "Sing",
    "Sing 2",
    "Bee Movie",
    "Monsters, Inc.",
    "Monsters University",
    "Cloudy with a Chance of Meatballs",
    "The Angry Birds Movie",
    "The Angry Birds Movie 2",
    "Puss in Boots",
    "Puss in Boots: The Last Wish",
    "Teenage Mutant Ninja Turtles",
    "Turbo",
    "Open Season",
    "Arthur Christmas",
    "Paddington",
    "Paddington 2",
    "Spies in Disguise",
  ];

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const requests = kidsCartoons.map((name) =>
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

export default KidsCorner;

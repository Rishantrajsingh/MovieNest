import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";

const KidsCorner = () => {
  const comedyMovies = [
    "The Hangover",
    "Superbad",
    "21 Jump Street",
    "Deadpool",
    "Home Alone",
    "The Mask",
    "Rush Hour",
    "Jumanji",
    "Free Guy",
    "Central Intelligence",
    "3 Idiots",
    "Hera Pheri",
    "Phir Hera Pheri",
    "Bhool Bhulaiyaa",
    "Welcome",
  ];

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const requests = comedyMovies.map((name) =>
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

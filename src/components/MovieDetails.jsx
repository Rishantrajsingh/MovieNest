import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await axios.get(
        `https://www.omdbapi.com/?i=${id}&apikey=900e3577`,
      );
      setMovie(res.data);
      console.log(res.data);
    };
    fetchMovie();
  }, []);

  const noPoster =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYY-4QN85YJRDZ3twNWtHBpYgypmHu5ZZk0w&s";

  return (
    <div className="min-h-screen w-full p-5 bg-gray-900 flex flex-col gap-5">
      <div className="flex flex-col items-center gap-5 fixed top-0 left-0 bg-gray-900 w-full py-5 px-4">
        <Header />
      </div>
      <div className="mt-20 flex flex-col items-center">
        <img
          className="w-60 h-100"
          src={movie.Poster !== "N/A" ? movie.Poster : noPoster}
          onError={(e) => (e.target.src = noPoster)}
        />
        <div className="text-white">
          <h1 className="text-lg">{movie.Title}</h1>

          <p>Year: {movie.Year}</p>
          <p>Rating: {movie.imdbRating}</p>
          <p>Genre: {movie.Genre}</p>
          <p>Runtime: {movie.Runtime}</p>

          <h2>Plot</h2>
          <p>{movie.Plot}</p>

          <p>Director: {movie.Director}</p>
          <p>Actors: {movie.Actors}</p>
        </div>
      </div>
    </div>
  );
};
export default MovieDetails;

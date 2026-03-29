import { useState } from "react";

const MovieCard = (props) => {
  const Poster = props.Poster;
  const Title = props.Title;
  const imdbID = props.imdbID;

  const addToFav = () => {
    const movie = { Poster, Title, imdbID };

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const exists = favorites.find((m) => m.imdbID === imdbID);

    if (!exists) {
      favorites.push(movie);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  };

  return (
    <div className="flex flex-col text-center items-center gap-2 w-full border border-amber-200 bg-gray-800">
      <div className="h-60 w-fit">
        <img className="w-full h-60 rounded" src={props.poster} />
      </div>
      <h1 className="text-white text-xl font-semibold">{props.title}</h1>
      <button onClick={addToFav} className="text-white">
        "❤️ Add to Fav"
      </button>
    </div>
  );
};

export default MovieCard;

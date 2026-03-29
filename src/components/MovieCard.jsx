import { useState } from "react";

const MovieCard = (props) => {
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

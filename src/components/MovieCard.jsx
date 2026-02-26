const MovieCard = (props) => {
  return (
    <div className="flex flex-col text-center items-center gap-2 w-full bg-red-300 ">
      <div className="bg-pink-400 h-60 w-fit">
        <img
          className="w-full h-60 object-cover"
          src={props.poster}
          alt={props.title}
        />
      </div>
      <h1 className="text-white text-xl font-semibold">{props.title}</h1>
    </div>
  );
};

export default MovieCard;

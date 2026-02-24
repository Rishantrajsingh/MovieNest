const MovieCard = (props) => {
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <img
        className="grid grid-cols-2 h-50 w-50"
        src={props.poster}
        alt={props.title}
      />
      <h1 className="text-white">{props.title}</h1>
    </div>
  );
};

export default MovieCard;

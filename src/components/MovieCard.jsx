const MovieCard = (props) => {
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <img src={props.poster} alt={props.title} />
      <h1 className="text-white">{props.title}</h1>
    </div>
  );
};

export default MovieCard;

const MovieCard = (props) => {
  return (
    <div className="flex flex-col text-center gap-3">
      <img className="object-cover" src={props.poster} alt={props.title} />
      <h1 className="text-white text-xl font-semibold">{props.title}</h1>
    </div>
  );
};

export default MovieCard;

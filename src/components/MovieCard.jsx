const MovieCard = (props) => {
  return (
    <div>
      <img className="object-cover" src={props.poster} alt={props.title} />
      <h1 className="text-white">{props.title}</h1>
    </div>
  );
};

export default MovieCard;

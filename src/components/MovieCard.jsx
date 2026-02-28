const MovieCard = (props) => {
  const noPoster = "public/noPoster.jpeg";
  return (
    <div className="flex flex-col text-center items-center gap-2 w-full">
      <div className="h-60 w-fit">
        <img
          className="w-full h-60 rounded"
          src={props.poster}
          alt={props.title}
          onError={(e) => (e.target.src = noPoster)}
        />
      </div>
      <h1 className="text-white text-xl font-semibold">{props.title}</h1>
    </div>
  );
};

export default MovieCard;

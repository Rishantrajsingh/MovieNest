const MovieCard = (props) => {
  return (
    <div>
      {props.map((e) => (
        <div key={e.movies.imdbID} className="h-fit w-fit">
          <img src={e.movies.Poster} alt="" />
          <h1>{e.movies.Title}</h1>
        </div>
      ))}
    </div>
  );
};

export default MovieCard;

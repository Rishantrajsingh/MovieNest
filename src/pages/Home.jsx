import MovieCard from "../components/MovieCard";

const Home = (props) => {
  return (
    <div className="grid grid-cols-2 place-items-center">
      {props.movies.map((elem, idx) => {
        return (
          <div
            className="h-50 w-40 flex flex-col bg-blue-200 items-center"
            key={idx}
          >
            <MovieCard
              poster={elem.Poster}
              title={elem.Title}
              id={elem.imdbID}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Home;

import MovieCard from "../components/MovieCard";

const Home = (props) => {
  return (
    <div className="grid grid-cols-2 gap-5 pt-32 pb-3 w-full">
      {props.movies.map((elem, idx) => {
        return (
          <div key={idx}>
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

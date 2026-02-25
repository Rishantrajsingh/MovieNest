import MovieCard from "../components/MovieCard";

const Home = (props) => {
  return (
    <div className="grid grid-cols-2 gap-5 place-items-center py-32">
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

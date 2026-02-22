import MovieCard from "../components/MovieCard";

const Home = (props) => {
  return (
    <div>
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

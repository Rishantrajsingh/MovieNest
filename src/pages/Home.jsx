import MovieCard from "../components/MovieCard";

const Home = (props) => {
  return (
    <div>
      <MovieCard movies={props.movies} />
    </div>
  );
};

export default Home;

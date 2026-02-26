import MovieCard from "../components/MovieCard";

const Home = (props) => {
  return (
    <div className="grid grid-cols-2 gap-5 py-32 w-full bg-white">
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
      <div className="flex bg-red-400 items-center h-20 w-fit gap-15">
        <button className="text-white bg-yellow-500 font-semibold rounded-xl h-fit w-fit px-7 py-3">
          Prev
        </button>
        <button className="text-white bg-yellow-500 font-semibold rounded-xl h-fit w-fit px-7 py-3">
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;

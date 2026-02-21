const Home = (props) => {
  return (
    <div className="w-full p-10 flex flex-col items-center justify-center">
      <div className="w-fit h-fit flex flex-col justify-center items-center gap-3">
        <img
          className="h-50"
          src={props.movies.Poster}
          alt={props.movies.Title}
        />
        <h1 className="text-white font-semibold">{props.movies.Title}</h1>
      </div>
    </div>
  );
};

export default Home;

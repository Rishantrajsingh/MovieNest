const Home = (props) => {
  return (
    <div className="bg-white w-full p-10">
      <div className="bg-black w-20 h-20">
        <img src={props.movies.Poster} alt={props.movies.Title} />
      </div>
    </div>
  );
};

export default Home;

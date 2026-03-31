import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await axios.get(
        `https://www.omdbapi.com/?i=${id}&apikey=900e3577`,
      );
      setMovie(res.data);
      console.log(res.data.Title);
    };
    fetchMovie();
  }, [id]);

  return (
    <div>
      {movie.map((elem, idx) => {
        return <div key={idx}>movie Name {elem.Title}</div>;
      })}
    </div>
  );
};

export default MovieDetails;

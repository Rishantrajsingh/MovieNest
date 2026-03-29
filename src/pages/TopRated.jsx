import axios from "axios";
import { useEffect, useState } from "react";
import Buttons from "../components/Buttons";
import MovieCard from "../components/MovieCard";
import Header from "../components/Header";

const TopRated = () => {
  const topRatedNames = [
    "The Godfather",
    "The Dark Knight",
    "12 Angry Men",
    "Schindler's List",
    "The Lord of the Rings: The Return of the King",
  ];

  const [title, setTitle] = useState([]);
  const [rating, setRating] = useState([]);
  const [poster, setPoster] = useState([]);

  const movies = title.map((t, index) => {
    return {
      title: t,
      poster: poster[index],
      rating: rating[index],
    };
  });

  console.log(movies);

  // const api1 = `https://www.omdbapi.com/?s=avengers&apikey=900e3577`;

  // const get2 = async () => {
  //   try {
  //     const res = await axios.get(api1);
  //     const arr = Object.entries(res.data);
  //     console.log(arr);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // get2();

  const getData = async () => {
    try {
      for (let i = 0; i < topRatedNames.length; i++) {
        const movieNames = topRatedNames[i];
        const res = await axios.get(
          `https://www.omdbapi.com/?t=${encodeURIComponent(movieNames)}&apikey=900e3577`,
        );
        const arr = Object.values(res.data);
        setTitle(arr[0]);
        setPoster(arr[13]);
        setRating(arr[16]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  getData();

  // const [forPoster, setForPoster] = useState([]);
  // const [forRating, setForRating] = useState([]);
  // const [forTitle, setForTitle] = useState([]);

  // useEffect(() => {
  //   const getPoster = async () => {
  //     try {
  //       for (let i = 0; i < topRatedNames.length; i++) {
  //         const movies = topRatedNames[i];
  //         const res = await axios.get(
  //           `https://www.omdbapi.com/?s=${encodeURIComponent(movies)}&apikey=900e3577`,
  //         );
  //         setForPoster(res.data.Search[0].Poster);
  //         // console.log(res.data.Search[0]);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getPoster();
  // }, []);

  // useEffect(() => {
  //   const getRating = async () => {
  //     try {
  //       for (let i = 0; i < topRatedNames.length; i++) {
  //         const movies = topRatedNames[i];
  //         const res = await axios.get(
  //           `https://www.omdbapi.com/?t=${encodeURIComponent(movies)}&apikey=900e3577`,
  //         );
  //         setForRating(res.data.imdbRating);
  //         setForTitle(res.data.Title);
  //         // console.log(res.data);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getRating();
  // }, []);

  return (
    <div className="min-h-screen w-full p-5 bg-gray-900 ">
      <Header />
      <div>
        <div className="grid grid-cols-2 gap-5 pt-7 pb-3 w-full">
          {movies.map((elem, idx) => {
            return (
              <div key={idx}>
                <MovieCard
                  poster={elem[13]}
                  title={elem[0]}
                  rating={elem[16]}
                />
              </div>
            );
          })}
        </div>
        {/* <Buttons page={page} setPage={setPage} /> */}
      </div>
    </div>
  );
};

export default TopRated;

import axios from "axios";
import { useEffect, useState } from "react";
import Buttons from "../components/Buttons";
import Header from "../components/Header";

const TopRated = () => {
  const topRatedNames = [
    "The Godfather",
    "The Dark Knight",
    "12 Angry Men",
    "Schindler's List",
    "The Lord of the Rings: The Return of the King",
  ];

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
        console.log(res);
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
      {/* <div>
        <div className="grid grid-cols-2 gap-5 pt-7 pb-3 w-full">
          {movies.map((elem, idx) => {
            return (
              <div className="grid grid-cols-2 gap-5 pt-32 pb-3 w-full">
                {movies.map((elem, idx) => {
                  return (
                    <div
                      key={idx}
                      className="flex flex-col text-center items-center gap-2 w-full border border-amber-200 bg-gray-800"
                    >
                      <div className="h-60 w-fit">
                        <img
                          className="w-full h-60 rounded"
                          src={elem.Poster}
                        />
                      </div>
                      <h1 className="text-white text-xl font-semibold">
                        {elem.Title}
                      </h1>
                      <button onClick={() => addToFav(elem.imdbID)}>
                        add to fav
                      </button>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <Buttons page={page} setPage={setPage} />
      </div> */}
    </div>
  );
};

export default TopRated;

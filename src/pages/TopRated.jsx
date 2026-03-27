import axios from "axios";
import { useEffect, useState } from "react";
import Buttons from "../components/Buttons";
import MovieCard from "../components/MovieCard";
import Header from "../components/Header";

const TopRated = () => {
  const topRatedNames = [
    "The Godfather",
    "The Dark Knight",
    "The Godfather Part II",
    "12 Angry Men",
    "Schindler's List",
    "The Lord of the Rings: The Return of the King",
  ];

  const getPoster = async () => {
    try {
      for (let i = 0; i < topRatedNames.length; i++) {
        const movies = topRatedNames[i];
        const res = await axios.get(
          `https://www.omdbapi.com/?s=${encodeURIComponent(movies)}&apikey=900e3577`,
        );
        console.log(res.data.Search[0].Poster);
      }
    } catch (error) {
      console.log(error);
    }
  };
  getPoster();

  const getTitle = async () => {
    try {
      for (let i = 0; i < topRatedNames.length; i++) {
        const movies = topRatedNames[i];
        const res = await axios.get(
          `https://www.omdbapi.com/?t=${encodeURIComponent(movies)}&apikey=900e3577`,
        );
        console.log(res.data.Title);
      }
    } catch (error) {
      console.log(error);
    }
  };
  getTitle();

  return (
    <div className="min-h-screen w-full p-5 bg-gray-900 ">
      <Header />
      {/* <div>
        <div className="grid grid-cols-2 gap-5 pt-7 pb-3 w-full">
          {movies.map((elem, idx) => {
            return (
              <div key={idx}>
                <MovieCard
                  poster={elem.Poster}
                  title={elem.Title}
                  imdbID={elem.imdbID}
                />
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

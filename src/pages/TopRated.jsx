import axios from "axios";
import { useEffect, useState } from "react";
import Buttons from "../components/Buttons";
import MovieCard from "../components/MovieCard";
import Header from "../components/Header";

const TopRated = () => {
  const topRatedNames = [
    "TheShawshankRedemption",
    "TheGodfather",
    "TheDarkKnight",
    "TheGodfatherPartII",
    "12AngryMen",
    "Schindler'sList",
    "TheLordoftheRings:TheReturnoftheKing",
    "PulpFiction",
    "TheGood,theBadandtheUgly",
    "FightClub",
    "ForrestGump",
    "Inception",
    "TheLordoftheRings:TheFellowshipoftheRing",
    "StarWars:EpisodeV-TheEmpireStrikesBack",
    "TheLordoftheRings:TheTwoTowers",
    "TheMatrix",
    "Goodfellas",
    "OneFlewOvertheCuckoo'sNest",
    "SevenSamurai",
    "Se7en",
    "CityofGod",
    "TheSilenceoftheLambs",
    "It'saWonderfulLife",
    "LifeIsBeautiful",
    "SavingPrivateRyan",
    "SpiritedAway",
    "Interstellar",
    "Parasite",
    "TheGreenMile",
    "Léon:TheProfessional",
    "TheUsualSuspects",
    "Harakiri",
    "TheLionKing",
    "BacktotheFuture",
    "Terminator2:JudgmentDay",
    "AmericanHistoryX",
    "ModernTimes",
    "Psycho",
    "Gladiator",
    "TheDeparted",
    "Whiplash",
    "ThePrestige",
    "Casablanca",
    "GraveoftheFireflies",
    "OnceUponaTimeintheWest",
    "RearWindow",
    "CinemaParadiso",
    "ApocalypseNow",
    "Alien",
    "Memento",
  ];

  let topNames = topRatedNames.map((e) => {
    for (let i = 0; i < e.length; i++) {
      return `https://www.omdbapi.com/?s=${e}&apikey=900e3577`;
    }
  });

  // const api = "https://www.omdbapi.com/?t=topNames&apikey=900e3577";

  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getApi = async () => {
      try {
        const res = await axios.get(topNames);
        setTopRatedMovies(res.data.Search || []);
        console.log(res.data.Search || []);
      } catch (error) {
        console.log(error);
      }
    };
    getApi();
  }, [topNames]);

  return (
    <div className="min-h-screen w-full p-5 bg-gray-900 ">
      <Header />
      <div>
        <div className="grid grid-cols-2 gap-5 pt-7 pb-3 w-full">
          {topRatedMovies.map((elem, idx) => {
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
      </div>
    </div>
  );
};

export default TopRated;

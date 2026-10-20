import { Link, NavLink } from "react-router-dom";
import { Heart, Search } from "lucide-react";

const Header = ({ searchBtn, favbtn }) => {
  return (
    <div className="flex justify-between items-center w-full md:px-5">
      <Link to="/home" aria-label="MovieNest Home">
        <h1 className="text-4xl font-bold text-white">
          Movie<span className="text-yellow-400">Nest</span>
        </h1>
      </Link>

      <div className="flex items-center justify-center gap-5">
        {searchBtn && (
          <NavLink
            to="/search"
            aria-label="Search movies"
            className="transition-transform hover:scale-110"
          >
            <Search size={30} color="white" />
          </NavLink>
        )}

        {favbtn && (
          <NavLink
            to="/favorites"
            aria-label="Favorite movies"
            className="transition-transform hover:scale-110"
          >
            <Heart size={30} color="white" />
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Header;

import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex flex-col items-center gap-5 bg-red-400">
      <Link to="/">
        <h1 className="text-4xl font-bold text-white">
          Movie<span className="text-yellow-400">Nest</span>
        </h1>
      </Link>

      <div className="flex items-center w-fit h-10 px-3 rounded-full bg-white">
        <Search size={30} />
        <input
          className="outline-none border-none px-3 h-full text-xl"
          type="text"
          placeholder="Search for movies ..."
        />
      </div>
      <nav className="flex items-center justify-around w-full">
        <Link className="text-white" to="/trending">
          Trending
        </Link>
        <Link className="text-white" to="/popular">
          Popular
        </Link>
        <Link className="text-white" to="/top_rated">
          Top rated
        </Link>
      </nav>
    </div>
  );
};

export default Header;

import { Link, NavLink } from "react-router-dom";
import { Heart, Search } from "lucide-react";

const Header = () => {
  return (
    <div className="flex justify-center items-center gap-10">
      <Link to="/">
        <h1 className="text-4xl font-bold text-white">
          Movie<span className="text-yellow-400">Nest</span>
        </h1>
      </Link>
      <NavLink to="/search">
        <Search size={30} color="white" />
      </NavLink>
      <NavLink to="/favorites">
        <Heart size={30} color="white" />
      </NavLink>
    </div>
  );
};

export default Header;

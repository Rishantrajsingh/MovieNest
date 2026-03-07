import { Link } from "react-router-dom";
import SideBar from "./SideBar";

const Header = () => {
  return (
    <div className="flex justify-center items-center">
      <SideBar />
      <Link to="/">
        <h1 className="text-4xl font-bold text-white">
          Movie<span className="text-yellow-400">Nest</span>
        </h1>
      </Link>
    </div>
  );
};

export default Header;

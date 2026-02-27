import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";

const Header = (props) => {
  return (
    <div className="flex flex-col items-center gap-5 fixed top-0 left-0 bg-gray-900 w-full py-5 px-4">
      <SideBar />
      <Link to="/">
        <h1 className="text-4xl font-bold text-white">
          Movie<span className="text-yellow-400">Nest</span>
        </h1>
      </Link>

      <div className="flex items-center w-full h-10 pl-3 rounded-full bg-white">
        <Search size={30} />
        <input
          value={props.search}
          onChange={(e) => {
            props.setSearch(e.target.value);
            props.setIsSearching(true);
          }}
          className="outline-none border-none px-3 w-full h-full text-xl rounded-full"
          type="text"
          placeholder="Search for movies ..."
        />
      </div>
    </div>
  );
};

export default Header;

import { useState } from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute top-4.4 left-2">
      {/* Hamburger Icon */}
      <button
        onClick={() => setOpen(true)}
        className="m-4 flex flex-col gap-1 md:hidden"
      >
        <span className="h-1 w-7 bg-white"></span>
        <span className="h-1 w-7 bg-white"></span>
        <span className="h-1 w-7 bg-white"></span>
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40"
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white z-50
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Close button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-4xl"
        >
          ×
        </button>

        {/* Nav Links */}
        <div className="mt-25 flex flex-col space-y-4 px-6 text-white font-semibold text-xl">
          <Link to="/">Home</Link>
          {/* <Link to="/toprated">Top Rated Movies</Link> */}
          <Link to="/fav">Favourites</Link>
        </div>
      </div>
    </div>
  );
};

export default SideBar;

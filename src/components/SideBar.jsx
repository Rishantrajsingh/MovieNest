import { useState } from "react";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute top-4.4 left-2">
      <button
        onClick={() => setOpen(true)}
        className="m-4 flex flex-col gap-1 md:hidden"
      >
        <span className="h-1 w-7 bg-white"></span>
        <span className="h-1 w-7 bg-white"></span>
        <span className="h-1 w-7 bg-white"></span>
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40"
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-slate-950 text-white z-50
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-4xl"
        >
          ×
        </button>

        <div className="mt-25 flex flex-col space-y-4 px-6 text-white font-semibold text-xl">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-400 underline border-yellow-400"
                : "text-white"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/toprated"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-400 underline border-yellow-400"
                : "text-white"
            }
          >
            Top Rated Movies
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-400 underline border-yellow-400"
                : "text-white"
            }
          >
            Favourites
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SideBar;

import { Link } from "react-router-dom";
import { FaUserCircle, FaHeart, FaSignOutAlt } from "react-icons/fa";
import { useFirebase } from "../context/FirebaseContext";

const Profile = () => {
  const { user } = useFirebase();

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-900 rounded-2xl border border-zinc-800 shadow-xl p-8">
        {/* Avatar */}
        {/* <div className="flex flex-col items-center">
          <FaUserCircle className="text-8xl text-red-500" />

          <h1 className="text-3xl font-bold text-white mt-4">
            {user?.displayName || "Movie Lover"}
          </h1>

          <p className="text-zinc-400 mt-2">{user.email}</p>
        </div> */}

        {/* Divider */}
        <div className="border-t border-zinc-800 my-8"></div>

        {/* Favorites */}
        <Link
          to="/favorites"
          className="flex items-center justify-between bg-zinc-800 hover:bg-zinc-700 transition rounded-xl p-4"
        >
          <div className="flex items-center gap-3">
            <FaHeart className="text-red-500 text-xl" />
            <span className="text-white font-medium">My Favorites</span>
          </div>

          <span className="text-zinc-400">{">"}</span>
        </Link>

        {/* Logout */}
        <button className="w-full mt-6 flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 transition py-3 rounded-xl text-white font-semibold">
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;

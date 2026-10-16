import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaHeart, FaSignOutAlt } from "react-icons/fa";
import { useFirebase } from "../context/FirebaseContext";
import { useState } from "react";

const Profile = () => {
  const { user, logoutUser, loading } = useFirebase();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await logoutUser();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-2xl font-bold text-white">Please sign in first</h1>

        <p className="text-zinc-400 mt-2">
          Sign in with Google to view your profile.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="mt-6 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded-xl"
        >
          Continue with Google
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      {/* Background gradients */}
      <div className="fixed top-0 left-0 w-125 h-125 bg-purple-700/20 blur-3xl rounded-full z-0"></div>
      <div className="fixed bottom-0 right-0 w-100 h-100 bg-pink-600/20 blur-3xl rounded-full z-0"></div>

      <div className="relative z-10 w-full max-w-md bg-zinc-900 rounded-2xl shadow-xl p-8">
        {/* Avatar */}
        <div className="flex flex-col items-center">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName || "User profile"}
              referrerPolicy="no-referrer"
              className="w-24 h-24 rounded-full object-cover border-2 border-yellow-500"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <FaUserCircle className="text-8xl text-yellow-500" />
          )}

          <h1 className="text-3xl font-bold text-white mt-4 text-center">
            {user.displayName || "Movie Lover"}
          </h1>

          <p className="text-zinc-400 mt-2 text-center break-all">
            {user.email || "No email available"}
          </p>
        </div>

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
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full mt-6 flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed transition py-3 rounded-xl text-white font-semibold"
        >
          <FaSignOutAlt />
          {loggingOut ? "Logging out..." : "Logout"}
        </button>
      </div>
    </div>
  );
};

export default Profile;

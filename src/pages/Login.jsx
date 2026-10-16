import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useFirebase } from "../context/FirebaseContext";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { signInWithGoogle } = useFirebase();
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      await signInWithGoogle();

      navigate("/home");
    } catch (error) {
      console.error("Google login failed:", error);
      alert("Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="fixed top-0 left-0 w-125 h-125 bg-purple-700/20 blur-3xl rounded-full z-0"></div>
      <div className="fixed bottom-0 right-0 w-100 h-100 bg-pink-600/20 blur-3xl rounded-full z-0"></div>

      <div className="relative w-full max-w-md bg-zinc-900/80 rounded-2xl p-8 shadow-xl border border-zinc-800">
        <h1 className="text-4xl font-bold text-center text-white">
          Movie<span className="text-yellow-500">Nest</span>
        </h1>

        <p className="text-zinc-400 text-center mt-2">
          Welcome back! Sign in to continue.
        </p>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full mt-8 flex items-center justify-center gap-3 border border-zinc-700 hover:bg-zinc-800 transition py-3 rounded-lg text-white active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaGoogle />
          {loading ? "Signing in..." : "Continue with Google"}
        </button>
      </div>
    </div>
  );
};

export default Login;

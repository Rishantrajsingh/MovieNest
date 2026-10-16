import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useFirebase } from "../context/FirebaseContext";

const Signup = () => {
  const navigate = useNavigate();
  const { signInWithGoogle } = useFirebase();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleSignup = async () => {
    try {
      setLoading(true);
      setError("");

      await signInWithGoogle();

      navigate("/home", { replace: true });
    } catch (error) {
      console.error("Google signup failed:", error);

      if (error.code === "auth/popup-closed-by-user") {
        setError("Google sign-in was cancelled. Please try again.");
      } else if (error.code === "auth/popup-blocked") {
        setError(
          "Your browser blocked the popup. Please allow popups and try again.",
        );
      } else {
        setError("Unable to continue with Google. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="fixed top-0 left-0 w-125 h-125 bg-purple-700/20 blur-3xl rounded-full z-0"></div>

      <div className="fixed bottom-0 right-0 w-100 h-100 bg-pink-600/20 blur-3xl rounded-full z-0"></div>

      <div className="relative w-full max-w-md bg-zinc-900/80 rounded-2xl p-8 shadow-xl border border-zinc-800">
        {/* Logo */}
        <h1 className="text-4xl font-bold text-center text-white">
          Movie<span className="text-yellow-500">Nest</span>
        </h1>

        <p className="text-zinc-400 text-center mt-2">
          Create your account and start exploring movies.
        </p>

        {/* Error message */}
        {error && (
          <p role="alert" className="mt-6 text-sm text-red-400 text-center">
            {error}
          </p>
        )}

        {/* Google Signup */}
        <button
          type="button"
          onClick={handleGoogleSignup}
          disabled={loading}
          className="w-full mt-8 flex items-center justify-center gap-3 border border-zinc-700 hover:bg-zinc-800 transition py-3 rounded-lg text-white active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaGoogle />
          {loading ? "Please wait..." : "Continue with Google"}
        </button>

        {/* Login Link */}
        <p className="text-center text-zinc-400 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-500 hover:text-yellow-400">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useFirebase } from "../context/FirebaseContext";
import { useState } from "react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { signUpUser, signInWithGoogle } = useFirebase();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signUpUser(name, email, password);
      console.log("success");
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithGoogle();
      navigate("/home");
    } catch (error) {
      console.log(error);
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

        {/* Form */}
        <form onSubmit={handleSignup} className="mt-8 space-y-5">
          <div>
            <label className="block text-sm text-zinc-300 mb-2">
              Full Name
            </label>

            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-300 mb-2">Email</label>

            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-300 mb-2">Password</label>

            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Create a password"
              className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-600 transition py-3 rounded-lg text-white font-semibold active:scale-90"
          >
            Create Account
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-zinc-700"></div>
          <span className="text-zinc-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-zinc-700"></div>
        </div>

        {/* Google Signup */}
        <button
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center gap-3 border border-zinc-700 hover:bg-zinc-800 transition py-3 rounded-lg text-white active:scale-90"
        >
          <FaGoogle />
          Continue with Google
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

import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useFirebase } from "../context/FirebaseContext";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { signInUser, signInWithGoogle } = useFirebase();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInUser(email, password);
      console.log("success");
      // if (!userCredential.user.emailVerified) {
      //   alert("Please verify your email first.");
      //   return;
      // }

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-900 rounded-2xl p-8 shadow-xl border border-zinc-800">
        {/* Logo */}
        <h1 className="text-4xl font-bold text-center text-red-500">
          MovieNest
        </h1>

        <p className="text-zinc-400 text-center mt-2">
          Welcome back! Sign in to continue.
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          <div>
            <label className="block text-sm text-zinc-300 mb-2">Email</label>

            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-300 mb-2">Password</label>

            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 transition py-3 rounded-lg text-white font-semibold"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-zinc-700"></div>
          <span className="text-zinc-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-zinc-700"></div>
        </div>

        {/* Google */}
        <button
          onClick={signInWithGoogle}
          className="w-full flex items-center justify-center gap-3 border border-zinc-700 hover:bg-zinc-800 transition py-3 rounded-lg text-white"
        >
          <FaGoogle />
          Continue with Google
        </button>

        {/* Signup */}
        <p className="text-center text-zinc-400 mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-red-500 hover:text-red-400">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

const Login = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center p-5 relative">
      <img
        src="public/mobileres.png"
        className="h-full w-full object-cover absolute z-0 "
      />

      <div className="h-fit w-full bg-slate-500/60 border border-slate-600 rounded-xl px-5 py-5 z-1">
        <h1 className="text-white text-4xl text-center font-semibold">Login</h1>
        <form className="h-full w-full flex flex-col mt-10">
          <input
            className="bg-white border-none rounded-md w-full py-2 pl-5 text-xl outline-none"
            type="email"
            placeholder="Enter your email"
            required
          />
          <input
            className="bg-white border-none rounded-md w-full py-2 pl-5 text-xl outline-none mt-5"
            type="password"
            placeholder="Enter your password"
            required
          />
          <a className="text-white text-right mt-2" href="#">
            Forgot Password?
          </a>
          <button className="bg-slate-900 text-white border border-slate-700 rounded-full w-full py-2 text-xl font-semibold mt-5 active:scale-90">
            Log in
          </button>
          <p className="text-center mt-2 text-white">
            Don't have account?
            <a className="text-blue-500 underline" href="#">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Login;

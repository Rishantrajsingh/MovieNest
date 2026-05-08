const Signup = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center p-5 relative">
      <img
        src="public/mobileres.png"
        className="h-full w-full absolute z-0 object-cover"
      />

      <div className="h-fit w-full bg-slate-500/60 border border-slate-600 rounded-xl px-5 py-5 z-1">
        <h1 className="text-center font-semibold text-3xl text-white">
          Sign up
        </h1>
        <form className="flex flex-col gap-5 w-full mt-10">
          <input
            className="bg-white border-none rounded-md w-full py-2 pl-5 text-xl outline-none"
            type="email"
            placeholder="E-mail"
            required
          />
          <input
            className="bg-white border-none rounded-md w-full py-2 pl-5 text-xl outline-none"
            type="text"
            placeholder="Username"
            required
          />
          <input
            className="bg-white border-none rounded-md w-full py-2 pl-5 text-xl outline-none"
            type="password"
            placeholder="Password"
            required
          />
          <input
            className="bg-white border-none rounded-md w-full py-2 pl-5 text-xl outline-none"
            type="password"
            placeholder="Confirm Password"
            required
          />
          <button className="bg-slate-900 text-white border border-slate-700 rounded-full w-full py-2 text-xl font-semibold mt-5 active:scale-90">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

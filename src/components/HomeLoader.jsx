const HomeLoader = () => {
  return (
    <div className="w-full bg-slate-950 animate-pulse">
      <div className="w-full h-80 pt-10 bg-slate-700"></div>
      <div>
        <div className="pt-10 px-3">
          {/* title */}
          <div className="bg-slate-700 w-1/2 h-5 rounded"></div>
          <div className="pt-3 flex justify-between items-center">
            <div className="bg-slate-700 w-45 h-70 rounded"></div>
            <div className="bg-slate-700 w-45 h-70 rounded"></div>
          </div>
        </div>
        <div className="pt-10 px-3">
          {/* title */}
          <div className="bg-slate-700 w-1/2 h-5 rounded"></div>
          <div className="pt-3 flex justify-between items-center">
            <div className="bg-slate-700 w-45 h-70 rounded"></div>
            <div className="bg-slate-700 w-45 h-70 rounded"></div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default HomeLoader;

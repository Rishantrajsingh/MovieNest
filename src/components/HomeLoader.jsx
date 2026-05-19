const HomeLoader = () => {
  return (
    <div className="w-full bg-slate-950 animate-pulse">
      <div className="w-full h-80 pt-10 bg-slate-700">
        {/* <div className="grid grid-cols-2 gap-5 pt-10 pb-3 w-full animate-pulse">
        {Array.from({ length: 4 }).map((_, idx) => (
          // titles
          <div key={idx} className="bg-slate-700 h-10 w-1/2"></div>
        ))}
      </div> */}
      </div>
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

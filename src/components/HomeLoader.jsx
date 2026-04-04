const HomeLoader = () => {
  return (
    <div className="grid grid-cols-2 gap-5 pt-32 pb-3 w-full animate-pulse">
      {Array.from({ length: 8 }).map((_, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center gap-3 w-full pb-3 border border-slate-700 rounded bg-slate-900"
        >
          {/* Poster */}
          <div className="h-60 w-full bg-slate-700 rounded"></div>

          {/* Title */}
          <div className="h-5 w-3/4 bg-slate-700 rounded"></div>

          {/* Button */}
          <div className="h-8 w-28 bg-slate-700 rounded"></div>
        </div>
      ))}
    </div>
  );
};

export default HomeLoader;

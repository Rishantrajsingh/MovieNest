const DetailsLoader = () => {
  return (
    <div className="mt-20 flex flex-col items-center animate-pulse w-full">
      <div className="flex flex-col items-start w-full">
        {/* Poster */}
        <div className="w-105 bg-slate-700 rounded-lg mb-4 border border-slate-700"></div>

        {/* Title */}
        <div className="h-7 w-3/4 bg-slate-700 rounded mb-3"></div>

        {/* Year / Genre / Runtime */}
        <div className="space-y-2 mb-4 w-full">
          <div className="h-4 w-1/3 bg-slate-700 rounded"></div>
          <div className="h-4 w-1/2 bg-slate-700 rounded"></div>
          <div className="h-4 w-1/4 bg-slate-700 rounded"></div>
        </div>

        {/* Rating */}
        <div className="h-5 w-24 bg-slate-700 rounded mb-4"></div>

        {/* Plot title */}
        <div className="h-5 w-20 bg-slate-700 rounded mb-2"></div>

        {/* Plot text */}
        <div className="space-y-2 mb-4 w-full">
          <div className="h-4 w-full bg-slate-700 rounded"></div>
          <div className="h-4 w-full bg-slate-700 rounded"></div>
          <div className="h-4 w-5/6 bg-slate-700 rounded"></div>
        </div>

        {/* Director */}
        <div className="h-4 w-2/3 bg-slate-700 rounded mb-2"></div>

        {/* Actors */}
        <div className="h-4 w-3/4 bg-slate-700 rounded mb-5"></div>

        {/* Button */}
        <div className="h-10 w-full bg-slate-700 rounded-lg"></div>
      </div>
    </div>
  );
};

// <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

export default DetailsLoader;

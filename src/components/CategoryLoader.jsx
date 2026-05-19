const CategoryLoader = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-2 px-2 pt-5 pb-5">
        {Array.from({ length: 100 }).map((_, index) => (
          <div
            key={index}
            className="h-40 rounded bg-slate-700 animate-pulse"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default CategoryLoader;

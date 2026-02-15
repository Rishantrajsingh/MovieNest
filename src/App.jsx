import { CircleX, Search } from "lucide-react";

const App = () => {
  return (
    <div className="h-screen w-screen p-5 bg-gray-900">
      {/* logo and search bar  */}
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-3xl font-semibold text-white">
          Movie<span className="text-yellow-400">Nest</span>
        </h1>
        <div className="flex items-center w-fit h-10 px-3 rounded-full bg-white">
          <Search size={30} />
          <input
            className="outline-none border-none px-3 h-full text-xl"
            type="text"
            placeholder="Search for movies ..."
          />
          <CircleX size={30} />
        </div>
      </div>
    </div>
  );
};

export default App;

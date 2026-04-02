import { Search } from "lucide-react";
import { useState } from "react";

const SearchBar = (props) => {
  const [input, setInput] = useState("");

  return (
    <div className="flex items-center w-full h-10 pl-3 rounded bg-white">
      <Search size={30} />
      <input
        type="text"
        value={input}
        onChange={(e) => {
          // props.handleSearch(e.target.value);
          setInput(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            props.setIsSearching(true);
            props.setSearch(input);
          }
        }}
        placeholder="Search for movies ..."
        className="outline-none border-none px-3 w-full h-full text-xl rounded-full"
      />
    </div>
  );
};

export default SearchBar;

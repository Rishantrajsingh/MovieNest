import { Search } from "lucide-react";

const SearchBar = (props) => {
  return (
    <div className="flex items-center w-full h-10 pl-3 rounded-full bg-white">
      <Search size={30} />
      <input
        value={props.search}
        onChange={(e) => {
          props.handleSearch(e.target.value);
        }}
        className="outline-none border-none px-3 w-full h-full text-xl rounded-full"
        type="text"
        placeholder="Search for movies ..."
      />
    </div>
  );
};

export default SearchBar;

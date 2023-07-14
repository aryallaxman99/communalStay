import { HiOutlineSearch } from "react-icons/hi";
import { Link } from "react-router-dom";
import Input from "../../widgets/input/Input";
import { useState } from "react";

const HeaderSearch = () => {
  const [searchText, setSearchText] = useState("");
  console.log(searchText);
  return (
    <div className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md -300">
      <Link to="/places/map" className="font-bold text-gray-700 cursor-pointer">
        Anywhere
      </Link>
      <div className="border border-left border-gray-300"></div>
      <Link to="/place/anyweek" className="font-bold text-gray-700">
        Any week
      </Link>

      <div className="border border-left border-gray-300"></div>
      <div className="flex">
        <Input
          type="search"
          className="z-10 w-24 h-5 rounded-full border-hidden text-gray-500 focus:w-full focus:h-7"
          placeholder="Search..."
          onKeyUp={(event) => setSearchText(event.target.value)}
        />
        <div className="bg-primary p-2 text-white w-auto rounded-full">
          <HiOutlineSearch className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default HeaderSearch;

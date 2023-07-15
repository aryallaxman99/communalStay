import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HiOutlineSearch } from "react-icons/hi";

import Input from "../../widgets/input/Input";
import requests from "../../Requests";

const HeaderSearch = () => {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  const search = async (event) => {
    setSearchText(event.target.value);

    if (event.keyCode === 13 && searchText.length > 0) {
      if (loading) {
        return;
      }
      setLoading(true);
      await axios
        .get(requests.search + searchText)
        .then((res) => {
          navigate(`/search?q=${searchText}`, {
            state: { places: res.data.data },
          });
        })
        .catch(() => {
          toast.error("Something went wrong");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

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
          className="z-10 w-24 h-5 rounded-full border-hidden text-gray-500 focus:w-full focus:h-6"
          placeholder="Search..."
          onKeyUp={(event) => search(event)}
        />
        <div className="bg-primary p-2 text-white w-auto rounded-full">
          <HiOutlineSearch className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default HeaderSearch;

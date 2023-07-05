import { HiOutlineSearch } from "react-icons/hi";
import { Link } from "react-router-dom";
import Button from "../../widgets/button/Button";

const HeaderSearch = () => {
  return (
    <div className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md -300">
      <Link to="/place/map" className="font-bold text-gray-700 cursor-pointer">
        Anywhere
      </Link>
      <div className="border border-left border-gray-300"></div>
      <div className="font-bold text-gray-700">Any week</div>
      <div className="border border-left border-gray-300"></div>
      <div>Any guest</div>
      <Button className="bg-primary w-auto rounded-full">
        <HiOutlineSearch className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default HeaderSearch;

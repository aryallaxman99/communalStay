import React from "react";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { BiUser } from "react-icons/bi";

const Slidebar = () => {
  return (
    <div className="bg-primary h-screen">
      <div className="px-3.5 py-7 flex items-center justify-center border">
        <h1 className="text-white text-sm">Admin panel</h1>
      </div>
      <div className=" text-white items-center justify-center mt-2 py-4 px-6 space-y-2 cursor-pointer">
        <div className="flex">
          <MdOutlineSpaceDashboard className="h-6 w-6" />
          Dashboard
        </div>
        <div className="flex">
          <BiUser className="h-6 w-6" /> User
        </div>
      </div>
    </div>
  );
};

export default Slidebar;

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ClickAwayListener } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUserCircle, FaHome, FaCalendarCheck } from "react-icons/fa";
import { HiOutlineSearch } from "react-icons/hi";
import {
  HiOutlineBuildingOffice2,
  HiOutlineBars3,
  HiOutlinePencilSquare,
} from "react-icons/hi2";
import { FiLogIn, FiLogOut } from "react-icons/fi";

import Button from "../../widgets/button/Button";
import { resetUserDetails } from "../../reducers/userSlice";
import requests from "../../Requests";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { firstName } = useSelector((state) => state.user);
  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    dispatch(resetUserDetails());
    axios.delete(requests.userLogout).then((res) => {
      toast[res.data.type](res.data.msg);
    });
    navigate("/");
  };

  return (
    <ClickAwayListener onClickAway={() => setShowMenu(false)}>
      <div>
        <header className="flex justify-between py-4 px-6">
          <Link to={"/"} className="flex items-center space-x-1">
            <FaHome className="h-7 w-7 text-secondary" />
            <span className="text-secondary mt-1 font-bold">CommunalStay</span>
          </Link>

          <div className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md -300">
            <div className="font-bold">Anywhere</div>
            <div className="border border-left border-gray-300"></div>
            <div className="font-bold">Any week</div>
            <div className="border border-left border-gray-300"></div>
            <div>Any guest</div>
            <Button className="bg-primary w-fit rounded-full">
              <HiOutlineSearch className="w-4 h-4" />
            </Button>
          </div>

          <div className="relative" onClick={() => setShowMenu(true)}>
            <div className="flex item-center gap-2 border border-gray-300 rounded-full py-2 px-4">
              <HiOutlineBars3 className="w-6 h-6" />
              <FaUserCircle className="h-6 w-6 text-gray-400" />
              {firstName && <div>{firstName}</div>}
            </div>
            {showMenu ? (
              firstName ? (
                <div className="right-0  mt-2 rounded-md shadow lg:absolute">
                  <ul className="space-y-2 lg:w-48 bg-white rounded-md">
                    <li>
                      <a
                        href="/account"
                        className="flex p-2 rounded-md gap-2 hover:bg-gray-100"
                      >
                        <FaUserCircle className="h-6 w-6 text-gray-700" />
                        Profile
                      </a>
                    </li>
                    <li>
                      <a
                        href="/account/bookings"
                        className="flex p-2 rounded-md gap-2 hover:bg-gray-100"
                      >
                        <FaCalendarCheck className="h-6 w-6 text-gray-700" />
                        My Reservation
                      </a>
                    </li>
                    <li>
                      <a
                        href="/account/places"
                        className="flex gap-2 p-2 rounded-md  hover:bg-gray-100"
                      >
                        <HiOutlineBuildingOffice2 className="h-6 w-6" />
                        My properties
                      </a>
                    </li>
                    <hr />
                    <li>
                      <a
                        onClick={logout}
                        className="flex p-2 gap-2 rounded-md cursor-pointer hover:bg-gray-100"
                      >
                        <FiLogOut className="h-6 w-6" />
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="right-0 p-2 mt-1 rounded-md shadow lg:absolute">
                  <ul className="space-y-2 lg:w-48 bg-white rounded-md">
                    <li>
                      <a
                        href="/register"
                        className="flex p-2 font-medium rounded-md gap-2 hover:bg-gray-100"
                      >
                        <HiOutlinePencilSquare className="h-6 w-6" />
                        Sign up
                      </a>
                    </li>
                    <li>
                      <a
                        href="/login"
                        className="flex p-2 rounded-md gap-2 hover:bg-gray-100"
                      >
                        <FiLogIn className="h-6 w-6" />
                        Log in
                      </a>
                    </li>
                  </ul>
                </div>
              )
            ) : null}
          </div>
        </header>
      </div>
    </ClickAwayListener>
  );
};

export default Header;

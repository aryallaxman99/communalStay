import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ClickAwayListener } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUserCircle, FaHome, FaCalendarCheck } from "react-icons/fa";
import {
  HiOutlineBuildingOffice2,
  HiOutlineBars3,
  HiOutlinePencilSquare,
} from "react-icons/hi2";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { RxUpdate } from "react-icons/rx";
import { BsCalendar2WeekFill } from "react-icons/bs";

import { resetUserDetails } from "../../reducers/userSlice";
import requests from "../../Requests";
import ImageViewer from "../../utils/ImageViewer";
import HeaderSearch from "./HeaderSearch";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { firstName, profilePicture } = useSelector((state) => state.user);
  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    dispatch(resetUserDetails());
    axios
      .delete(requests.userLogout)
      .then((res) => {
        toast[res.data.type](res.data.msg);
        navigate("/");
      })
      .catch((error) => {
        toast[error.response.data.type](error.response.data.msg);
      });
  };

  const HeaderMenu = ({ showMenu, firstName, logout }) => {
    return (
      <div>
        {showMenu ? (
          firstName ? (
            <div className="right-0 fixed mt-2 rounded-md shadow lg:absolute z-20">
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
                    My Properties
                  </a>
                </li>
                <hr />
                <li>
                  <a
                    href="/account/request"
                    className="flex gap-2 p-2 rounded-md  hover:bg-gray-100"
                  >
                    <BsCalendar2WeekFill className="h-6 w-6 text-gray-700" />
                    Booking Requests
                  </a>
                </li>
                <li>
                  <a
                    href="/account/password"
                    className="flex gap-2 p-2 rounded-md  hover:bg-gray-100"
                  >
                    <RxUpdate className="h-6 w-6" />
                    Change Password
                  </a>
                </li>
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
    );
  };

  return (
    <ClickAwayListener onClickAway={() => setShowMenu(false)}>
      <div>
        <header className="flex justify-between py-4 px-6">
          <Link to={"/"} className="flex items-center space-x-1">
            <FaHome className="h-7 w-7 text-secondary" />
            <span className="text-secondary mt-1 font-bold">CommunalStay</span>
          </Link>

          <HeaderSearch />

          <div className="relative" onClick={() => setShowMenu(!showMenu)}>
            <div className="flex item-center gap-2 border border-gray-300 rounded-full py-2 px-4">
              <HiOutlineBars3 className="w-6 h-6" />
              {profilePicture ? (
                <ImageViewer
                  imageName={profilePicture}
                  styling={"h-6 w-6 rounded-full"}
                />
              ) : (
                <FaUserCircle className="h-6 w-6 text-gray-400" />
              )}
              {firstName && <div>{firstName}</div>}
            </div>
            <HeaderMenu
              showMenu={showMenu}
              firstName={firstName}
              logout={logout}
            />
          </div>
        </header>
      </div>
    </ClickAwayListener>
  );
};

export default Header;

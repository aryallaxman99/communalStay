import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { MenuItem } from "@mui/material";

import { resetUserDetails } from "../../reducers/userSlice";
import requests from "../../Requests";

import { HomeIcon } from "@heroicons/react/24/outline";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { firstName } = useSelector((state) => state.user);
  const [showMenu, setShowMenu] = useState(false);
  const toogleMenu = () => {
    setShowMenu(!showMenu);
  };

  const logout = () => {
    dispatch(resetUserDetails());
    axios.delete(requests.userLogout).then((res) => {
      toast[res.data.type](res.data.msg);
    });
    navigate("/");
    <ToastContainer />;
  };

  return (
    <div>
      <header className="flex justify-between py-4 px-6">
        <Link to={"/"} className="flex items-center space-x-1">
          <HomeIcon className="h-7 text-secondary" />
          <span className="text-secondary font-bold">CommunialStay</span>
        </Link>

        <div className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md -300">
          <div className="font-bold">Anywhere</div>
          <div className="border border-left border-gray-300"></div>
          <div className="font-bold">Any week</div>
          <div className="border border-left border-gray-300"></div>
          <div>Any guest</div>
          <button className="bg-primary text-white p-1 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>

        <div className="relative" onClick={toogleMenu}>
          <div className="flex item-center gap-2 border border-gray-300 rounded-full py-2 px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            <div className="bg-gray-500 rounded-full text-white border border-gray-500 overflow-hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 relative top-1"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
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
                      <img
                        src="https://t4.ftcdn.net/jpg/05/49/98/39/240_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"
                        className="w-6 h-6 rounded-full"
                        alt=""
                      />
                      Profile
                    </a>
                  </li>
                  <li>
                    <a
                      href="/account/bookings"
                      className="flex p-2 rounded-md gap-2 hover:bg-gray-100"
                    >
                      <img
                        src="https://i.shgcdn.com/6364e357-626c-4725-9151-b4c279ddab3d/-/format/auto/-/preview/3000x3000/-/quality/lighter/"
                        className="w-5 h-5 mt-1"
                        alt=""
                      />
                      My Reservation
                    </a>
                  </li>
                  <li>
                    <a
                      href="/account/places"
                      className="flex gap-2 p-2 rounded-md  hover:bg-gray-100"
                    >
                      <img
                        src="https://img.uxwing.com/wp-content/themes/uxwing/download/buildings-architecture-real-estate/property-icon.svg"
                        className="w-4 h-4 mt-1"
                        alt=""
                      />
                      My properties
                    </a>
                  </li>
                  <hr />
                  <li>
                    <MenuItem
                      onClick={logout}
                      className="flex p-2 gap-2 rounded-md  hover:bg-gray-100"
                    >
                      <img
                        src="https://static-00.iconduck.com/assets.00/logout-icon-507x512-l4hzrlty.png"
                        className="w-4 h-4"
                        alt=""
                      />
                      Logout
                    </MenuItem>
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
                      <img
                        src="https://icon-library.com/images/sign-up-icon-png/sign-up-icon-png-1.jpg"
                        className="w-5 h-5 mt-1"
                        alt=""
                      />
                      Sign up
                    </a>
                  </li>
                  <li>
                    <a
                      href="/login"
                      className="flex p-2 rounded-md gap-2 hover:bg-gray-100"
                    >
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/130/130924.png"
                        className="w-5 h-5 mt-1"
                        alt=""
                      />
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
  );
};

export default Header;

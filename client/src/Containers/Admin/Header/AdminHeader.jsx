import React, { useState } from "react";
import { FaHome, FaUserCircle } from "react-icons/fa";
import { FaSearch, FaEnvelope, FaRegBell } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import requests from "../../../Requests";
import ImageViewer from "../../../utils/ImageViewer";
import { resetUserDetails } from "../../../reducers/userSlice";

const AdminHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { firstName, profilePicture } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const showProfile = () => {
    setOpen(!open);
  };

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

  return (
    <div>
      <div className="flex items-center justify-between h-[70px] shadow-lg px-[25px] ">
        <Link to="/" className="flex text-secondary gap-1 font-semibold">
          <FaHome className="h-6 w-6" />
          communalStay
        </Link>
        <div className="flex items-center rounded-[5px]">
          <input
            type="text"
            className=" bg-[#F8F9FC] h-[40px] outline-none pl-[13px] w-[350px] rounded-[5px] placeholder:text-[14px] leading-[20px] font-normal"
            placeholder="Search for..."
          />
          <div className="bg-secondary h-[40px] px-[14px] flex items-center justify-center cursor-pointer rounded-tr-[5px] rounded-br-[5px]">
            <FaSearch color="white" />
          </div>
        </div>
        <div className="flex items-center gap-[20px]">
          <div className="flex items-center gap-[25px] border-r-[1px] pr-[25px]">
            <FaRegBell />
            <FaEnvelope />
          </div>
          <div
            className="flex items-center gap-[15px] relative"
            onClick={showProfile}
          >
            <p>{firstName}</p>
            <div className="h-[50px] w-[50px] rounded-full bg-white cursor-pointer flex items-center justify-center relative z-40">
              {profilePicture ? (
                <ImageViewer
                  imageName={profilePicture}
                  styling={"h-6 w-6 rounded-full"}
                />
              ) : (
                <FaUserCircle className="h-6 w-6 text-gray-400" />
              )}
            </div>

            {open && (
              <div className="bg-white border h-[120px] w-[150px] absolute bottom-[-135px] z-20 right-0 pt-[15px] pl-[15px] space-y-[10px]">
                <ul>
                  <li>
                    <a
                      href="account/password"
                      className="cursor-pointer hover:text-primary font-semibold"
                    >
                      Change password
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={logout}
                      className="cursor-pointer hover:text-primary font-semibold"
                    >
                      Log out
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;

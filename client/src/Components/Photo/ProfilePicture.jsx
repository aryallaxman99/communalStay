import React, { useState } from "react";
import { ClickAwayListener } from "@mui/material";
import { FcImageFile, FcEditImage, FcRemoveImage } from "react-icons/fc";

import Button from "../../widgets/button/Button";

const ProfilePicture = ({ profilePicture, setProfilePicture }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [openImage, setOpenImage] = useState(false);

  return (
    <ClickAwayListener onClickAway={() => setToggleMenu(false)}>
      <div>
        <img
          src={profilePicture}
          alt="Profile"
          className="w-20 h-20 rounded-full"
          onClick={() => {
            setToggleMenu(true);
          }}
        />

        {toggleMenu && (
          <div className="mt-2 rounded-md shadow lg:absolute">
            <ul className="space-y-2 lg:w-60 bg-white rounded-md">
              <li>
                <div
                  className="flex p-2 rounded-md gap-2 hover:bg-gray-100"
                  onClick={() => {
                    setOpenImage(true);
                  }}
                >
                  <FcImageFile className="h-6 w-6" />
                  See profile Picture
                </div>
              </li>
              <li>
                <div className="flex p-2 gap-2 rounded-md hover:bg-gray-100">
                  <FcEditImage className="h-6 w-6" />
                  Update profile picture
                </div>
              </li>
              <li>
                <div className="flex p-2 gap-2 rounded-md hover:bg-gray-100">
                  <FcRemoveImage className="h-6 w-6" />
                  Remove profile picture
                </div>
              </li>
            </ul>
          </div>
        )}

        {openImage && (
          <div className="fixed inset-0 flex items-center bg-gray-600 bg-opacity-50	justify-center">
            <div className="relative">
              <img
                src={profilePicture}
                alt=""
                className="object-contain max-h-screen max-w-90 outline-none"
              />

              <Button
                className="absolute top-4 right-2 text-white bg-red-500 rounded z-10 px-4 w-auto"
                onClick={() => {
                  setOpenImage(false);
                  setToggleMenu(false);
                }}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
};

export default ProfilePicture;

import React, { useState } from "react";
import { ClickAwayListener } from "@mui/material";

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
            setOpenImage(false);
          }}
        />
        {toggleMenu && (
          <>
            <div className=" mt-2 rounded-md shadow lg:absolute">
              <ul className="space-y-2 lg:w-60 bg-white rounded-md">
                <li>
                  <div
                    className="flex p-2 rounded-md gap-2 hover:bg-gray-100"
                    onClick={() => {
                      setOpenImage(true);
                    }}
                  >
                    {openImage && (
                      <div className="fixed inset-0 flex items-center bg-gray-600 bg-opacity-50	justify-center">
                        <div className="relative object-fill max-w-90 max-h-90 ">
                          <img
                            src={profilePicture}
                            alt=""
                            className="object-contain max-w-90 max-h-90 outline-none"
                          />
                          <button
                            className="absolute top-4 right-2 p-2 mt-4 text-white bg-red-500 rounded z-10"
                            onClick={() => {
                              setToggleMenu(false);
                            }}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    )}
                    <img
                      src="https://maxst.icons8.com/_nuxt/icon/c93fe3d57e7dbfbf052ea5b1ce1c89c9.svg"
                      className="w-6 h-6"
                      alt=""
                    />
                    See profile Picture
                  </div>
                </li>
                <li>
                  <div className="flex p-2 gap-2 rounded-md hover:bg-gray-100">
                    <img
                      src="https://img.icons8.com/?size=512&id=7uH7N1cCI8Bt&format=png"
                      className="w-6 h-6"
                      alt=""
                    />
                    Update profile picture
                  </div>
                </li>
                <li>
                  <div className="flex p-2 gap-2 rounded-md hover:bg-gray-100">
                    <img
                      src="https://img.icons8.com/?size=512&id=54218&format=png"
                      className="w-6 h-6"
                      alt=""
                    />
                    Remove profile picture
                  </div>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </ClickAwayListener>
  );
};

export default ProfilePicture;

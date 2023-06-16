import React, { useState } from "react";
import { ClickAwayListener } from "@mui/material";
import Button from "../../widgets/button/Button";

const ProfilePicture = ({ profilePicture, setProfilePicture }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [openImage, setOpenImage] = useState(false);

  return (
    <ClickAwayListener onClickAway={() => setToggleMenu(false)}>
      <div>
        <img
          // src={profilePicture}
          src="https://scontent.fktm17-1.fna.fbcdn.net/v/t39.30808-6/278740100_3227816557490633_5934562896153253871_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=q-rIlEbc768AX8Hdduj&_nc_ht=scontent.fktm17-1.fna&oh=00_AfBenBk_vMDojUkX8sFC9QV1QmswCqC6u_9PMRd_IjbZ9Q&oe=64922557"
          alt="Profile"
          className="w-20 h-20 rounded-full"
          onClick={() => {
            setToggleMenu(true);
            // setOpenImage(false);
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
        )}

        {openImage && (
          <div className="fixed inset-0 flex items-center bg-gray-600 bg-opacity-50	justify-center">
            <div className="relative">
              <img
                // src={profilePicture}
                src="https://scontent.fktm17-1.fna.fbcdn.net/v/t39.30808-6/278740100_3227816557490633_5934562896153253871_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=q-rIlEbc768AX8Hdduj&_nc_ht=scontent.fktm17-1.fna&oh=00_AfBenBk_vMDojUkX8sFC9QV1QmswCqC6u_9PMRd_IjbZ9Q&oe=64922557"
                alt=""
                className="object-contain max-h-screen max-w-90 outline-none"
              />

              <Button
                className="absolute top-4 right-2 text-white bg-red-500 rounded z-10 px-4 w-fit"
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

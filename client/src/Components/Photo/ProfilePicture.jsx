import React, { useState } from "react";
import { ClickAwayListener } from "@mui/material";
import { FcImageFile, FcEditImage, FcRemoveImage } from "react-icons/fc";
import { RiCloseCircleLine } from "react-icons/ri";
import axios from "axios";
import { toast } from "react-toastify";
import { HiUserCircle } from "react-icons/hi";

import Button from "../../widgets/button/Button";
import { PhotoUploader } from "./PhotoUploader";
import ImageViewer from "../../utils/ImageViewer";
import requests from "../../Requests";

const ProfilePicture = ({ profilePicture }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [imageUploader, setImageUploader] = useState(false);

  const removeProfilePicture = () => {
    axios
      .put(requests.userProfile, { profilePicture: "" })
      .then((res) => {
        if (res.data) {
          toast.success("Profile picture removed");
          setImageUploader(false);
        }
      })
      .catch(() => {
        toast.error("Error on Uploading");
      });
  };

  return (
    <ClickAwayListener onClickAway={() => setToggleMenu(false)}>
      <div>
        <div
          onClick={() => {
            setToggleMenu(true);
          }}
        >
          {profilePicture ? (
            <ImageViewer
              styling={"w-20 h-20 rounded-full"}
              imageName={profilePicture}
            />
          ) : (
            <HiUserCircle className="w-20 h-20 rounded-full bg-gray-500 text-white" />
          )}
        </div>

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
                <div
                  className="flex p-2 gap-2 rounded-md hover:bg-gray-100"
                  onClick={() => setImageUploader(true)}
                >
                  <FcEditImage className="h-6 w-6" />
                  Update profile picture
                </div>
              </li>
              <li>
                <div
                  className="flex p-2 gap-2 rounded-md hover:bg-gray-100"
                  onClick={() =>
                    profilePicture
                      ? removeProfilePicture()
                      : toast.info("Profile picture didn't set")
                  }
                >
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
              <ImageViewer
                styling={"object-contain max-h-screen max-w-90 outline-none"}
                imageName={profilePicture}
              />
              <Button
                className="absolute top-4 right-2 bg-gray-500 bg-opacity-50 rounded-full w-auto"
                onClick={() => {
                  setOpenImage(false);
                  setToggleMenu(false);
                }}
              >
                <RiCloseCircleLine className="h-6 w-6 text-white" />
              </Button>
            </div>
          </div>
        )}

        {imageUploader && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="bg-white border-4 border-red-400 p-10">
                <PhotoUploader
                  profilePicture={profilePicture}
                  setImageUploader={setImageUploader}
                  fromProfile={true}
                />
              </div>

              <Button
                className="absolute top-4 right-2 bg-gray-500 bg-opacity-50 rounded-full w-auto"
                onClick={() => {
                  setImageUploader(false);
                  setToggleMenu(false);
                }}
              >
                <RiCloseCircleLine className="h-6 w-6 text-white" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
};

export default ProfilePicture;

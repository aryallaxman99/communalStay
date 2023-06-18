import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { RxCrossCircled } from "react-icons/rx";
import { MdFavoriteBorder, MdFavorite, MdUploadFile } from "react-icons/md";

import requests from "../../Requests";
import Input from "../../widgets/input/Input";
import Button from "../../widgets/button/Button";
import ImageViewer from "../../utils/ImageViewer";

export const PhotoUploader = (props) => {
  const [photoLink, setPhotoLink] = useState("");
  const [profilePicture, setProfilePicture] = useState(props.profilePicture);

  const addPhotoByLink = async () => {
    if (!photoLink) {
      toast.warn("Enter a link");
    } else {
      const { data } = await axios.post(requests.photoUploadViaLink, {
        photoLink,
      });
      if (props.fromProfile) {
        setProfilePicture(data.imageName);
      } else {
        props.setPhotos([...props.photos, data.imageName]);
      }
    }
    setPhotoLink("");
  };

  const uploadPhoto = (event) => {
    axios
      .post(
        requests.photoUpload,
        { photos: event.target.files[0] },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then((res) => {
        props.fromProfile
          ? setProfilePicture(res.data.imageName)
          : props.setPhotos([...props.photos, res.data.imageName]);
      })
      .catch(() => {
        toast.error("Uploading error..");
      });
  };

  const removePhoto = (imageName) => {
    props.setPhotos([...props.photos.filter((photo) => photo !== imageName)]);
  };

  const displayFrontPhoto = (event, imageName) => {
    event.preventDefault();
    props.setPhotos([
      imageName,
      ...props.photos.filter((photo) => photo !== imageName),
    ]);
  };

  const saveProfilePicture = () => {
    axios
      .put(requests.userProfile, { profilePicture })
      .then((res) => {
        if (res.data) {
          toast[res.data.type](res.data.msg);
          props.setImageUploader(false);
        }
      })
      .catch(() => {
        toast.error("Error on Uploading");
      });
  };

  return (
    <div>
      {props.fromProfile ? (
        <>
          <h3 className="mt-4">Profile Picture </h3>
          <p className="text-sm text-gray-500">Change your profile picture</p>
        </>
      ) : (
        <>
          <h3 className="mt-4">Photos</h3>
          <p className="text-sm text-gray-500">More picture will be great</p>
        </>
      )}
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder={"Add photos via link"}
          onKeyUp={(event) => setPhotoLink(event.target.value)}
        />
        <Button
          type="button"
          onClick={addPhotoByLink}
          className="bg-secondary grow px-4"
        >
          Add photos
        </Button>
        <ToastContainer position="top-center" />
      </div>
      <div className="grid gird-cols-3 md:grid-cols-4 lg:grid-cols-6 mt-2 gap-2">
        {props.fromProfile ? (
          <>
            {profilePicture && (
              <ImageViewer
                imageName={profilePicture}
                styling={"rounded-2xl w-full object-cover"}
              />
            )}
          </>
        ) : (
          <>
            {props.photos
              ? props.photos.length > 0 &&
                props.photos.map((items) => (
                  <div className="h-30 flex relative" key={items}>
                    <ImageViewer
                      styling={"rounded-2xl w-full object-cover"}
                      imageName={items}
                    />
                    <Button
                      onClick={() => removePhoto(items)}
                      className="absolute right-0 bg-black bg-opacity-50 w-auto p-0"
                    >
                      <RxCrossCircled className="h-8 w-8" />
                    </Button>
                    <Button
                      onClick={(event) => displayFrontPhoto(event, items)}
                      className="top-1 left-1 absolute bg-black bg-opacity-50 w-auto p-0"
                    >
                      {props.photos
                        ? props.photos[0] === items && (
                            <>
                              <MdFavorite className="w-8 h-8 text-red-600" />
                            </>
                          )
                        : null}
                      {props.photos
                        ? props.photos[0] !== items && (
                            <>
                              <MdFavoriteBorder className="h-8 w-8 text-white" />
                            </>
                          )
                        : null}
                    </Button>
                  </div>
                ))
              : null}
          </>
        )}
        <label
          type="button"
          className="h-32 border cursor-pointer justify-center flex gap-2 bg-transparent rounded-2xl p-2 items-center text-2xl text-gray-600 "
        >
          <Input type="file" className="hidden" onChange={uploadPhoto} />
          <MdUploadFile className="h-8 w-8" />
          Upload
        </label>
      </div>
      {props.fromProfile ? (
        <Button
          className="bg-secondary mt-6"
          onClick={() => saveProfilePicture()}
        >
          Save
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
};

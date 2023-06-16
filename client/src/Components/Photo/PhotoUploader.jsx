import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { RxCrossCircled } from "react-icons/rx";
import { MdFavoriteBorder, MdFavorite, MdUploadFile } from "react-icons/md";

import requests from "../../Requests";
import Input from "../../widgets/input/Input";
import Button from "../../widgets/button/Button";

export const PhotoUploader = ({ photos, setPhotos }) => {
  const [photoLink, setPhotoLink] = useState("");

  const addPhotoByLink = async () => {
    if (!photoLink) {
      toast.warn("Enter a link");
    } else {
      const { data } = await axios.post(requests.photoUploadViaLink, {
        photoLink,
      });
      setPhotos([...photos, data.imageName]);
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
        setPhotos([...photos, res.data.imageName]);
      });
  };

  const removePhoto = (imageName) => {
    setPhotos([...photos.filter((photo) => photo !== imageName)]);
  };

  const displayFrontPhoto = (event, imageName) => {
    event.preventDefault();
    setPhotos([imageName, ...photos.filter((photo) => photo !== imageName)]);
  };

  return (
    <div>
      <h3 className="mt-4">Photos</h3>
      <p className="text-sm text-gray-500">More picture will be great</p>
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
        {photos
          ? photos.length > 0 &&
            photos.map((items) => (
              <div className="h-32 flex relative" key={items}>
                <img
                  alt=""
                  className="rounded-2xl w-full object-cover"
                  src={`http://localhost:8000/uploads/${items}`}
                />
                <button
                  onClick={() => removePhoto(items)}
                  className="absolute right-0 cursor-pointer bg-black bg-opacity-50 rounded-2xl"
                >
                  <RxCrossCircled className="h-6 w-6 text-white" />
                </button>
                <button
                  onClick={(event) => displayFrontPhoto(event, items)}
                  className="top-1 left-1 absolute cursor-pointer text-red bg-red bg-opacity-50 rounded-2xl"
                >
                  {photos
                    ? photos[0] === items && (
                        <>
                          <MdFavorite className="w-6 h-6 text-red-600" />
                        </>
                      )
                    : null}
                  {photos
                    ? photos[0] !== items && (
                        <>
                          <MdFavoriteBorder className="h-6 w-6 text-white" />
                        </>
                      )
                    : null}
                </button>
              </div>
            ))
          : null}
        <label
          type="button"
          className="h-32 border cursor-pointer justify-center flex gap-2 bg-transparent rounded-2xl p-2 items-center text-2xl text-gray-600 "
        >
          <Input type="file" className="hidden" onChange={uploadPhoto} />
          <MdUploadFile className="h-8 w-8" />
          Upload
        </label>
      </div>
    </div>
  );
};

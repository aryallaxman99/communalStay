import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="white"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
                <button
                  onClick={(event) => displayFrontPhoto(event, items)}
                  className="top-1 left-1 absolute cursor-pointer bg-black bg-opacity-50 rounded-2xl"
                >
                  {photos
                    ? photos[0] === items && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="#76B1F7"
                          className="w-6 h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )
                    : null}
                  {photos
                    ? photos[0] !== items && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="white"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                          />
                        </svg>
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          Upload
        </label>
      </div>
    </div>
  );
};

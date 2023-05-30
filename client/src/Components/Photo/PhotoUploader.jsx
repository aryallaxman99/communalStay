import React, { useState } from "react";
import axios from "axios";
import requests from "../../Requests";
import Input from "../../widgets/input/Input";
import Button from "../../widgets/button/Button";

export const PhotoUploader = ({ values }) => {
  const [photo, setPhoto] = useState([]);
  const [photoLink, setPhotoLink] = useState("");

  const addPhotoByLink = async () => {
    const { data } = await axios.post(requests.photoUploadViaLink, {
      photoLink,
    });
    setPhoto([...photo, data.imageName]);
    values.photos = [...values.photos, data.imageName];
  };

  const uploadPhoto = (event) => {
    axios
      .post(
        requests.photoUpload,
        { photo: event.target.files[0] },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then((res) => {
        setPhoto([...photo, res.data.imageName]);
        values.photos = [...values.photos, res.data.imageName];
      });
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
      </div>
      <div className="grid gird-cols-3 md:grid-cols-4 lg:grid-cols-6 mt-2 gap-2">
        {photo.length > 0 &&
          photo.map((items) => (
            <div className="h-32 flex" key={items}>
              <img
                alt=""
                className="rounded-2xl "
                src={`http://localhost:8000/uploads/${items}`}
              />
            </div>
          ))}
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

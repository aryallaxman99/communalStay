import React from "react";
import { Link, useParams } from "react-router-dom";
import Input from "../../widgets/input/Input";
import Button from "../../widgets/button/Button";

const Places = () => {
  const { action } = useParams();
  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            className="bg-primary text-white py-2 px-6 rounded-full inline-flex gap-2"
            to={"/account/places/new"}
          >
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new Places
          </Link>
        </div>
      )}
      {action === "new" && (
        <div>
          <form>
            <h3 className="mt-4">Title</h3>
            <p className="text-gray-500 text-sm">Title for your place</p>
            <Input type="textf" placeholder="Title" />
            <h3 className="mt-4">Address</h3>
            <p className="text-gray-500 text-sm">Address to your place</p>
            <Input type="text" placeholder="Address" />
            <h3 className="mt-4">Photos</h3>
            <p className="text-sm text-gray-500">More picture will greate</p>
            <div className="flex gap-2">
              <Input type="text" placeholder={"Add photos via link"} />
              <Button className="bg-primary grow px-4"> Add photos</Button>
            </div>
            <div className="grid gird-cols-3 md:grid-cols-4 lg:grid-cols-6 mt-2">
              <button className="border justify-center flex gap-2 bg-transparent rounded-2xl p-8 text-2xl text-gray-600 ">
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
              </button>
            </div>
            <h3 className="mt-4">Description</h3>
            <p className="text-sm text-gray-500">Description of the place</p>
            <textarea />
            <h3 className="mt-4">Features</h3>
            <p className="text-sm text-gray-500">
              Select all the features of your place
            </p>
            <div className="grid mt-2 grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
              <label className="border p-4 flex rounded-2xl cursor-pointer gap-2 items-center">
                <input type="checkbox" />
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
                    d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
                  />
                </svg>
                <span>Wifi</span>
              </label>
              <label className="border p-4 flex rounded-2xl cursor-pointer gap-2 items-center">
                <input type="checkbox" />
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
                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                  />
                </svg>

                <span>Electricity</span>
              </label>
              <label className="border p-4 flex rounded-2xl gap-2 cursor-pointer items-center">
                <input type="checkbox" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  viewBox="0 0 512 512"
                >
                  <path d="M64 131.9C64 112.1 80.1 96 99.9 96c9.5 0 18.6 3.8 25.4 10.5l16.2 16.2c-21 38.9-17.4 87.5 10.9 123L151 247c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0L345 121c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-1.3 1.3c-35.5-28.3-84.2-31.9-123-10.9L170.5 61.3C151.8 42.5 126.4 32 99.9 32C44.7 32 0 76.7 0 131.9V448c0 17.7 14.3 32 32 32s32-14.3 32-32V131.9zM256 352a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm64 64a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm0-128a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm64 64a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm0-128a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm64 64a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm32-32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" />
                </svg>
                <span>Shower</span>
              </label>
              <label className="border p-4 flex rounded-2xl gap-2 cursor-pointer items-center">
                <input type="checkbox" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  viewBox="0 0 640 512"
                >
                  <path d="M560 160A80 80 0 1 0 560 0a80 80 0 1 0 0 160zM55.9 512H381.1h75H578.9c33.8 0 61.1-27.4 61.1-61.1c0-11.2-3.1-22.2-8.9-31.8l-132-216.3C495 196.1 487.8 192 480 192s-15 4.1-19.1 10.7l-48.2 79L286.8 81c-6.6-10.6-18.3-17-30.8-17s-24.1 6.4-30.8 17L8.6 426.4C3 435.3 0 445.6 0 456.1C0 487 25 512 55.9 512z" />
                </svg>
                <span>Mountain view</span>
              </label>
              <label className="border p-4 flex rounded-2xl gap-2 cursor-pointer items-center">
                <input type="checkbox" />
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
                    d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"
                  />
                </svg>
                <span>Tv</span>
              </label>
              <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" />
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
                    d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
                  />
                </svg>

                <span>Indoor fireplace: gas</span>
              </label>
            </div>
            <h3 className="mt-4">Extra info</h3>
            <p className="text-gray-500 text-sm">
              Extra information about your place
            </p>
            <textarea />
            <h3 className="mt-4">Check In and Check Out</h3>
            <p className="text-gray-500 text-sm">add check in and out times</p>
            <div className="grid gap-2 sm:grid-cols-3 mb-2">
              <div className="mt-2 -mb-1">
                <h5>Check In time</h5>
                <Input placeholder="12:00" />
              </div>
              <div className="mt-2 -mb-1">
                <h5>Check Out time</h5>
                <Input placeholder="12:00" />
              </div>
              <div className="mt-2 -mb-1">
                <h5>Number of guests</h5>
                <Input placeholder="12:00" />
              </div>
            </div>
            <Button className="bg-primary">Save</Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Places;

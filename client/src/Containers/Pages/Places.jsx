import React from "react";
import { Link, useParams } from "react-router-dom";
import Input from "../../widgets/input/Input";
import Button from "../../widgets/button/Button";
import { useFormik } from "formik";
import Features from "./Features";

const Places = () => {
  const { action } = useParams();

  const onSubmit = (values) => {
    console.log(values);
  };

  const { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      title: "",
      address: "",
      photos: [],
      descriptions: "",
      features: "",
      extraInfo: "",
      checkIn: "",
      checkOut: "",
      maxGuests: "",
    },
    onSubmit,
  });
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
          <form onSubmit={handleSubmit}>
            <h3 className="mt-4">Title</h3>
            <p className="text-gray-500 text-sm">Title for your place</p>
            <Input
              id="title"
              type="text"
              placeholder="Title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <h3 className="mt-4">Address</h3>
            <p className="text-gray-500 text-sm">Address to your place</p>
            <Input
              id="address"
              type="text"
              placeholder="Address"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <h3 className="mt-4">Photos</h3>
            <p className="text-sm text-gray-500">More picture will greate</p>
            <div className="flex gap-2">
              <Input
                id="photos"
                type="text"
                placeholder={"Add photos via link"}
                value={values.photos}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Button className="primary grow px-4"> Add photos</Button>
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
            <textarea
              id="descriptions"
              placeholder="Description about your place"
              value={values.descriptions}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <h3 className="mt-4">Features</h3>
            <p className="text-sm text-gray-500">
              Select all the features of your place
            </p>
            <div className="grid mt-2 grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
              <Features
                values={values}
                handleBlur={handleBlur}
                handleChange={handleChange}
              />
            </div>
            <h3 className="mt-4">Extra info</h3>
            <p className="text-gray-500 text-sm">
              Extra information about your place
            </p>
            <textarea
              id="extraInfo"
              value={values.extraInfo}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <h3 className="mt-4">Check In and Check Out</h3>
            <p className="text-gray-500 text-sm">add check in and out times</p>
            <div className="grid gap-2 sm:grid-cols-3 mb-2">
              <div className="mt-2 -mb-1">
                <h5>Check In time</h5>
                <Input
                  placeholder="12:00"
                  id="checkIn"
                  value={values.checkIn}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-2 -mb-1">
                <h5>Check Out time</h5>
                <Input
                  placeholder="12:00"
                  id="checkOut"
                  value={values.checkOut}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-2 -mb-1">
                <h5>Number of guests</h5>
                <Input
                  id="maxGuests"
                  value={values.maxGuests}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Guests"
                />
              </div>
            </div>
            <Button type="submit" className="primary">
              Save
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Places;

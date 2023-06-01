import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
import axios from "axios";

import Input from "../../widgets/input/Input";
import Button from "../../widgets/button/Button";
import Features from "../Pages/Features";
import { PhotoUploader } from "../../Components/Photo/PhotoUploader";
import requests from "../../Requests";

const PlacesForm = () => {
  const navigate = useNavigate();

  const onSubmit = (values, actions) => {
    axios.post(requests.places, values).then((res) => {
      toast[res.data.type](res.data.msg);
      if (res.data.status === true) {
        actions.resetForm();
        navigate("/account/places");
      }
    });
  };

  const fromSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    descriptions: Yup.string().required("Required"),
    checkIn: Yup.string().required("Required"),
    checkOut: Yup.string().required("Required"),
    maxGuests: Yup.string().required("Required"),
  });

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        title: "",
        address: "",
        photos: [],
        descriptions: "",
        features: [],
        extraInfo: "",
        checkIn: "",
        checkOut: "",
        maxGuests: "",
      },
      validationSchema: fromSchema,
      onSubmit,
    });
  return (
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
        {errors.title && touched.title ? (
          <div className="text-red-500 text-xs px-4 py-2 sm:px-8 sm:py-3">
            {errors.title}
          </div>
        ) : null}
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
        {errors.address && touched.address ? (
          <div className="text-red-500 text-xs px-4 py-2 sm:px-8 sm:py-3">
            {errors.address}
          </div>
        ) : null}
        <PhotoUploader values={values} />
        <h3 className="mt-4">Description</h3>
        <p className="text-sm text-gray-500">Description of the place</p>
        <textarea
          id="descriptions"
          placeholder="Description about your place"
          value={values.descriptions}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.descriptions && touched.descriptions ? (
          <div className="text-red-500 text-xs px-4 py-2 sm:px-8 sm:py-3">
            {errors.descriptions}
          </div>
        ) : null}
        <h3 className="mt-4">Features</h3>
        <p className="text-sm text-gray-500">
          Select all the features of your place
        </p>
        <div className="grid mt-2 grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
          <Features values={values} handleBlur={handleBlur} />
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
            {errors.checkIn && touched.checkIn ? (
              <div className="text-red-500 text-xs px-4 py-2 sm:px-8 sm:py-3">
                {errors.checkIn}
              </div>
            ) : null}
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
            {errors.checkOut && touched.checkOut ? (
              <div className="text-red-500 text-xs px-4 py-2 sm:px-8 sm:py-3">
                {errors.checkOut}
              </div>
            ) : null}
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
            {errors.maxGuests && touched.maxGuests ? (
              <div className="text-red-500 text-xs px-4 py-2 sm:px-8 sm:py-3">
                {errors.maxGuests}
              </div>
            ) : null}
          </div>
        </div>
        <Button type="submit" className="bg-secondary">
          Save
        </Button>
      </form>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default PlacesForm;

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

import ShowAndHidePassword from "../widgets/showAndHidePassword/ShowAndHidePassword";
import FormError from "../Components/formError/FormError";
import Button from "../widgets/button/Button";
import requests from "../Requests";

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const passwordRule = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  const onSubmit = (values, actions) => {
    if (loading) {
      return;
    }
    setLoading(true);
    axios
      .put(requests.changePassword, values)
      .then((res) => {
        toast[res.data.type](res.data.msg);
        actions.resetForm();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const passwordSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Required"),
    newPassword: Yup.string().required("Required").matches(passwordRule, {
      message: "Please create a stronger password",
    }),
  });

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: {
        currentPassword: "",
        newPassword: "",
      },
      validationSchema: passwordSchema,
      onSubmit,
    });

  return (
    <div>
      <div className="flex flex-col items-center justify-center py-8">
        <h3>Change Password</h3>

        <form
          onSubmit={handleSubmit}
          className="w-full sm:max-w-sm sm:p-8 space-y-5"
        >
          <ShowAndHidePassword
            id="currentPassword"
            placeholder="Current Password"
            autoComplete="current-password"
            field={values.currentPassword}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
          <FormError
            message={errors.currentPassword}
            touched={touched.currentPassword}
          />

          <ShowAndHidePassword
            id="newPassword"
            placeholder="New Password"
            autoComplete="new-password"
            field={values.newPassword}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
          <FormError
            message={errors.newPassword}
            touched={touched.newPassword}
          />

          <Button type="submit" className="bg-secondary">
            Update Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;

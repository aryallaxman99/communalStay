import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

import ShowAndHidePassword from "../widgets/showAndHidePassword/ShowAndHidePassword";
import FormError from "../Components/formError/FormError";
import Button from "../widgets/button/Button";
import requests from "../Requests";

const ChangePassword = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const passwordRule = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  console.log(state);
  const submitChangePassword = (values, actions) => {
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
      .catch((error) => {
        toast[error.response.data.type](error.response.data.msg);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const submitResetPassword = (values, actions) => {
    values.otp = state.otp;
    if (loading) {
      return;
    }
    setLoading(true);
    axios
      .put(requests.resetPassword, values)
      .then((res) => {
        toast[res.data.type](res.data.msg);
        actions.resetForm();
        navigate("/login");
      })
      .catch((error) => {
        toast[error.response.data.type](error.response.data.msg);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const changePasswordSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Required"),
    newPassword: Yup.string().required("Required").matches(passwordRule, {
      message: "Please create a stronger password",
    }),
  });

  const resetPasswordSchema = Yup.object().shape({
    newPassword: Yup.string().required("Required").matches(passwordRule, {
      message: "Please create a stronger password",
    }),
    confirmPassword: Yup.string().required("Required"),
  });

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik(
      state && state.fromOTP
        ? {
            initialValues: {
              newPassword: "",
              confirmPassword: "",
            },
            validationSchema: resetPasswordSchema,
            onSubmit: submitResetPassword,
          }
        : {
            initialValues: {
              currentPassword: "",
              newPassword: "",
            },
            validationSchema: changePasswordSchema,
            onSubmit: submitChangePassword,
          }
    );

  return (
    <div>
      <div className="flex flex-col items-center justify-center py-8">
        <h3>{state && state.fromOTP ? "Reset Password" : "Change Password"}</h3>
        <div className="mt-4 border dark:border-gray rounded-lg w-full sm:max-w-sm sm:p-8 space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
            <ShowAndHidePassword
              id={state && state.fromOTP ? "newPassword" : "currentPassword"}
              placeholder={
                state && state.fromOTP ? "New Password" : "Current Password"
              }
              autoComplete={
                state && state.fromOTP ? "new-password" : "current-password"
              }
              field={
                state && state.fromOTP
                  ? values.newPassword
                  : values.currentPassword
              }
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
            <FormError
              message={
                state && state.fromOTP
                  ? errors.newPassword
                  : errors.currentPassword
              }
              touched={
                state && state.fromOTP
                  ? touched.newPassword
                  : touched.currentPassword
              }
            />

            <ShowAndHidePassword
              id={state && state.fromOTP ? "confirmPassword" : "newPassword"}
              placeholder={
                state && state.fromOTP ? "Confirm Password" : "New Password"
              }
              autoComplete={
                state && state.fromOTP ? "confirm-Password" : "new-password"
              }
              field={
                state && state.fromOTP
                  ? values.confirmPassword
                  : values.newPassword
              }
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
            <FormError
              message={
                state && state.fromOTP
                  ? errors.confirmPassword
                  : errors.newPassword
              }
              touched={
                state && state.fromOTP
                  ? touched.confirmPassword
                  : touched.newPassword
              }
            />

            <Button type="submit" className="bg-secondary">
              {state ? "Reset" : "Update Password"}
            </Button>
          </form>
        </div>
        {!state && (
          <div className="mt-4">
            <Link to={"/identify/otp"} className="font-medium text-blue-600">
              Forgot password?
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangePassword;

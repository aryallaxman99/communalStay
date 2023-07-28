import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import getApiResponse from "../apiCall";
import requests from "../Requests";

export function useUserRegistration() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userResponse, setUserResponse] = useState(null);

  const passwordRule = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      setError(null);

      const url = requests.userRegister;
      const userRegistrationResponse = await getApiResponse({
        url,
        method: "post",
        data: values,
      });
      setUserResponse(userRegistrationResponse.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const registerSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required").min(6).matches(passwordRule, {
      message: "Please create a stronger password",
    }),
    phoneNumber: Yup.string()
      .required("Required")
      .min(10, "too short")
      .max(10, "too long")
      .matches(phoneRegExp, "Phone number is not valid"),
  });

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNumber: "",
      },
      validationSchema: registerSchema,
      onSubmit,
    });

  return {
    loading,
    error,
    userResponse,
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
  };
}

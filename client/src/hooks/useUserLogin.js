import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import requests from "../Requests";
import getApiResponse from "../apiCall";

export default function useUserLOgin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userResponse, setUserResponse] = useState(null);

  const onSubmit = async (values) => {
    try {
      if (loading) {
        return;
      }
      setLoading(true);
      setError(null);
      const url = requests.userLogin;
      const loginResponse = await getApiResponse({
        url,
        method: "post",
        data: values,
      });
      setUserResponse(loginResponse.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
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

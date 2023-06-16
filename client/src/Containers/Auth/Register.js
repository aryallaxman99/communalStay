import axios from "axios";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import requests from "../../Requests";
import Input from "../../widgets/input/Input";
import Button from "../../widgets/button/Button";
import { useState } from "react";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const passwordRule = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const onSubmit = async (values, actions) => {
    if (loading) {
      return;
    }
    setLoading(true);
    await axios
      .post(requests.userRegister, { values })
      .then((res) => {
        toast[res.data.type](res.data.msg);
        if (res.data.response === true) {
          actions.resetForm();
        }
      })
      .finally(() => {
        setLoading(false);
      });
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

  return (
    <div className="flex items-center justify-center app-height">
      <div className="w-full max-w-md">
        <div className="text-center space-y-1">
          <h2 className="text-center mb-4">Sign Up</h2>
          <h4 className="text-center mb-4">Welcome to CommunialStay</h4>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full mx-auto mt-10 space-y-5"
        >
          <div className="space-y-2">
            <div>
              <Input
                id="firstName"
                type="text"
                placeholder="First name"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              {errors.firstName && touched.firstName ? (
                <div className="text-red-500 text-xs px-4 py-2 sm:px-8 sm:py-3">
                  {errors.firstName}
                </div>
              ) : null}
            </div>

            <div>
              <Input
                id="lastName"
                type="text"
                placeholder="Last name"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.lastName && touched.lastName ? (
                <div className="text-red-500 text-xs px-4 py-2 sm:px-8 sm:py-3">
                  {errors.lastName}
                </div>
              ) : null}
            </div>

            <div>
              <Input
                id="phoneNumber"
                type="number"
                placeholder="Phone Number"
                value={values.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.phoneNumber && touched.phoneNumber ? (
                <div className="text-red-500 text-xs px-4 py-2 sm:px-8 sm:py-3">
                  {errors.phoneNumber}
                </div>
              ) : null}
            </div>

            <div>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              {errors.email && touched.email ? (
                <div className="text-red-500 text-xs px-4 py-2 sm:px-8 sm:py-3">
                  {errors.email}
                </div>
              ) : null}
            </div>

            <div>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && touched.password ? (
                <div className="text-red-500 text-xs px-4 py-2 sm:px-8 sm:py-3">
                  {errors.password}
                </div>
              ) : null}
            </div>
          </div>

          <Button type="submit" className="bg-secondary">
            SignUp
          </Button>

          <div className="text-center py-2">
            Already have an account?
            <Link className="underline text-black" to={"/login"}>
              <span className="ml-2">Login</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

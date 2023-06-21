import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

import Input from "../../widgets/input/Input";
import Button from "../../widgets/button/Button";
import requests from "../../Requests";
import { setUserDetails } from "../../reducers/userSlice";
import FormError from "../../Components/formError/FormError";
import ShowAndHidePassword from "../../widgets/showAndHidePassword/ShowAndHidePassword";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values, actions) => {
    if (loading) {
      return;
    }
    setLoading(true);
    await axios
      .post(requests.userLogin, { values })
      .then((res) => {
        toast[res.data.type](res.data.msg);
        if (res.data.status === true) {
          dispatch(setUserDetails(res.data.userDetails));
          actions.resetForm();
          navigate("/");
        }
      })
      .catch((error) => {
        toast[error.response.data.type](error.response.data.msg);
      })
      .finally(() => {
        setLoading(false);
      });
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

  return (
    <div className="flex items-center justify-center app-height">
      <div className="w-full max-w-md">
        <div className="text-center space-y-1">
          <h2>Login</h2>
          <h4>Welcome to CommunalStay</h4>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full mx-auto mt-10 space-y-5"
        >
          <div className="space-y-2">
            <div className="w-full">
              <Input
                id="email"
                type="email"
                placeholder="Email"
                className="w-full"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <FormError message={errors.email} touched={touched.email} />
            </div>

            <div>
              <ShowAndHidePassword
                placeholder={"Password"}
                field={values.password}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
              <FormError message={errors.password} touched={touched.password} />
            </div>
          </div>

          <Button type="submit" className="bg-secondary">
            Login
          </Button>
        </form>

        <p className="text-center mt-5" text-gray-500>
          Don't have account yet?
          <Link className="underline text-black" to={"/register"}>
            <span className="ml-2">Register</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

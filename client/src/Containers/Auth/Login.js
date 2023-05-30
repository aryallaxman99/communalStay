import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import Input from "../../widgets/input/Input";
import Button from "../../widgets/button/Button";
import requests from "../../Requests";
import { setUserDetails } from "../../reducers/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const passwordRule = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  const onSubmit = async (values, actions) => {
    axios.post(requests.userLogin, { values }).then((res) => {
      toast[res.data.type](res.data.msg);
      if (res.data.status === true) {
        dispatch(setUserDetails(res.data.userDetails));
        actions.resetForm();
        navigate("/");
      }
    });
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required").min(6).matches(passwordRule, {
      message: "Please create a strong password",
    }),
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
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-40">
        <h2 className="text-center mb-4">Login</h2>
        <h4 className="text-center mb-4">Welcome to CommunialStay</h4>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
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
          <Button type="submit" className="mt-1 bg-secondary">
            Login
          </Button>
          <ToastContainer position="top-center" />
          <div className="text-center py-2" text-gray-500>
            Don't have account yet?
            <Link className="underline text-black" to={"/register"}>
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

import axios from "axios";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../../widgets/input/Input";
import Button from "../../widgets/button/Button";

const Register = () => {
  const passwordRule = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  const onSubmit = async (values, actions) => {
    await axios.post("/auth/register", { values }).then((res) => {
      if (res.data.msg === "user registered") {
        toast.success(res.data.msg);
      } else {
        toast.error(res.data.msg);
      }
    });
    actions.resetForm();
  };

  const registerSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required").min(6).matches(passwordRule, {
      message: "Please create a stronger password",
    }),
  });

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
      validationSchema: registerSchema,
      onSubmit,
    });

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div>
        <h1 className="text-center mb-4">Sign Up</h1>
        <h4 className="text-center mb-4">Welcome to CommunialStay</h4>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
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
          <Button type="submit" className="primary">
            SignUp
          </Button>
          <ToastContainer position="top-center" />
          <div className="text-center py-2" text-gray-500>
            Already have an account?
            <Link className="underline text-black" to={"/login"}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

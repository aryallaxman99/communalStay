import axios from "axios";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";

const Register = () => {
  const passwordRule = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  const onSubmit = (values, actions) => {
    axios.post("/auth/register", { values });
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
      <div className="mb-40">
        <h1 className="text-4xl text-center mb-4">Sign Up</h1>
        <h2 className="text-xl text-center mb-4">Welcome to CommunialStay</h2>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <input
            id="firstName"
            type="text"
            placeholder="First name"
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.firstName && touched.firstName ? (
            <div className="text-red-500 px-4 py-2 sm:px-8 sm:py-3">
              {errors.firstName}
            </div>
          ) : null}
          <input
            id="lastName"
            type="text"
            placeholder="Last name"
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.lastName && touched.lastName ? (
            <div className="text-red-500 px-4 py-2 sm:px-8 sm:py-3">
              {errors.lastName}
            </div>
          ) : null}
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && touched.email ? (
            <div className="text-red-500 px-4 py-2 sm:px-8 sm:py-3">
              {errors.email}
            </div>
          ) : null}
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password && touched.password ? (
            <div className="text-red-500 px-4 py-2 sm:px-8 sm:py-3">
              {errors.password}
            </div>
          ) : null}
          <button type="submit" className="primary">
            SignUp
          </button>
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

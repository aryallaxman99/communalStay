import { Link, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Input from "../../widgets/input/Input";
import Button from "../../widgets/button/Button";
import { setUserDetails } from "../../reducers/userSlice";
import FormError from "../../Components/formError/FormError";
import ShowAndHidePassword from "../../widgets/showAndHidePassword/ShowAndHidePassword";
import useUserLogin from "../../hooks/useUserLogin";

const Login = () => {
  const dispatch = useDispatch();
  const {
    error,
    userResponse,
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
  } = useUserLogin();

  if (userResponse && userResponse.status === true) {
    dispatch(setUserDetails(userResponse.userDetails));
    return <Navigate to={"/"} />;
  }

  if (error) {
    return <p className="text-red-500">{error.data.msg}</p>;
  }

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

        <div className="text-center mt-5">
          <Link to={"/identify"} className="text-blue-600 hover:underline">
            Forgot password?
          </Link>
          <div className="inline-flex items-center justify-center w-full">
            <div className="w-full h-px my-8 bg-gray-200 border-0 " />
            <span className="absolute px-3 -translate-x-1/2 bg-white left-1/2  text-gray-500">
              or
            </span>
          </div>
          Don't have account yet?
          <Link className="underline text-black" to={"/register"}>
            <span className="ml-2">Register</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

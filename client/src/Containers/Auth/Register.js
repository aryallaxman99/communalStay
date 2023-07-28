import { Link, useNavigate } from "react-router-dom";

import Input from "../../widgets/input/Input";
import Button from "../../widgets/button/Button";
import FormError from "../../Components/formError/FormError";
import ShowAndHidePassword from "../../widgets/showAndHidePassword/ShowAndHidePassword";
import { usePostUserData } from "../../hooks/usePostUserData";

const Register = () => {
  const navigate = useNavigate();
  const {
    error,
    userResponse,
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
  } = usePostUserData();

  if (userResponse && userResponse.response === true) {
    navigate("/login");
  }

  if (error) {
    return <p className="text-red-500">{error.data.msg}</p>;
  }

  return (
    <div className="flex items-center justify-center app-height">
      <div className="w-full max-w-md">
        <div className="text-center space-y-1">
          <h2 className="text-center mb-4">Sign Up</h2>
          <h4 className="text-center mb-4">Welcome to CommunalStay</h4>
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
              <FormError
                message={errors.firstName}
                touched={touched.firstName}
              />
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
              <FormError message={errors.lastName} touched={touched.lastName} />
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
              <FormError
                message={errors.phoneNumber}
                touched={touched.phoneNumber}
              />
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

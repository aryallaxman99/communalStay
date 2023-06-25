import React from "react";
import { MdOutlineMail } from "react-icons/md";
import Input from "../../widgets/input/Input";
import Button from "../../widgets/button/Button";
import FormError from "../../Components/formError/FormError";
import * as Yup from "yup";
import { useFormik } from "formik";

const EmailIdentification = () => {
  const submitEmail = async (values) => {
    console.log(values);
  };

  const emailSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
  });

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: emailSchema,
      onSubmit: submitEmail,
    });

  return (
    <div className="p-24">
      <h3>Forgot password</h3>
      <h5 className="mt-2">
        Enter your email address below to reset your password
      </h5>
      <form onSubmit={handleSubmit}>
        <div className="relative mt-4">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <MdOutlineMail className="h-6 w-6 text-gray-400" />
          </div>
          <Input
            id="email"
            type="email"
            placeholder="Your email address..."
            className=" w-full p-4 pl-10 rounded-lg border"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Button
            type="submit"
            className="absolute right-2.5 bottom-3 bg-primary hover:bg-secondary p-2 rounded-lg text-white w-auto"
          >
            Search
          </Button>
        </div>
        <FormError message={errors.email} touched={touched.email} />
      </form>
    </div>
  );
};

export default EmailIdentification;

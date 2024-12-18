import React, { useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import Input from "../../widgets/input/Input";
import Button from "../../widgets/button/Button";
import FormError from "../../Components/formError/FormError";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import requests from "../../Requests";
import { useNavigate } from "react-router-dom";

const EmailIdentification = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitEmail = async (values) => {
    if (loading) {
      return;
    }
    setLoading(true);
    await axios
      .post(requests.verifyEmail, values)
      .then((res) => {
        if (res.data.status) {
          toast[res.data.type](res.data.msg);
          navigate("/identify/otp", { state: { email: values.email } });
        }
      })
      .catch((error) => {
        if (!error.response.data.status) {
          toast[error.response.data.type](error.response.data.msg);
        }
      })
      .finally(() => {
        setLoading(false);
      });
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
            className=" w-full p-4 pl-10 pr-28 rounded-lg border"
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

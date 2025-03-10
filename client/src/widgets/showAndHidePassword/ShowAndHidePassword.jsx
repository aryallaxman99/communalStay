import React, { useState } from "react";
import Input from "../input/Input";
import Button from "../button/Button";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ShowAndHidePassword = ({
  id,
  placeholder,
  field,
  handleChange,
  handleBlur,
  autoComplete,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className="relative">
      <Input
        id={id ? id : "password"}
        type={isPasswordVisible ? "text" : "password"}
        placeholder={placeholder}
        autoComplete={autoComplete ? autoComplete : ""}
        className="w-full"
        value={field}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Button
        type="button"
        className="absolute inset-y-0 right-3 flex items-center text-black w-auto bg-opacity-0"
        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
      >
        {isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
      </Button>
    </div>
  );
};

export default ShowAndHidePassword;

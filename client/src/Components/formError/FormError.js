import React from "react";

const FormError = ({ message, touched, className }) => {
  return (
    <div>
      {touched && message ? (
        <p className={`text-red-500 text-sm ${className}`}>{message}</p>
      ) : (
        <></>
      )}
    </div>
  );
};

export default FormError;

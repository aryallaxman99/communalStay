import React from "react";
import { twMerge } from "tailwind-merge";

const Button = (props) => {
  const { children, className, ...rest } = props;
  return (
    <button
      {...rest}
      className={twMerge(
        `p-2 w-full text-white rounded-2xl ${className ?? ""}`
      )}
    >
      {children}
    </button>
  );
};

export default Button;

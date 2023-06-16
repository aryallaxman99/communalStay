import React from "react";
import { Link } from "react-router-dom";
import { BiError } from "react-icons/bi";

export const Error = () => {
  return (
    <div className="text-center gap-1 mt-40">
      <div className="mx-auto flex justify-center gap-2">
        <BiError className="h-10 w-10 text-red-500" />
        <h2>404</h2>
      </div>

      <h4>
        You didn't break the internet, but we can't find what you are looking
        for
      </h4>
      <Link className=" underline" to="/">
        back to home
      </Link>
    </div>
  );
};

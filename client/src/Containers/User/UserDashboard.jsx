import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

import Places from "../Places/Places";
import Account from "./Account";

const UserDashboard = () => {
  const user = useSelector((state) => state.user);

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  if (!user.firstName) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div>
      <Account />
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          <h6>
            Hello {user.firstName} {user.lastName}
          </h6>
        </div>
      )}
      {subpage === "places" && <Places />}
    </div>
  );
};

export default UserDashboard;

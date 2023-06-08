import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import Button from "../../widgets/button/Button";
import { resetUserDetails } from "../../reducers/userSlice";
import Places from "../Places/Places";
import Account from "./Account";
import requests from "../../Requests";

const UserDashboard = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  const logout = () => {
    dispatch(resetUserDetails());
    axios.delete(requests.userLogout).then((res) => {
      toast[res.data.type](res.data.msg);
    });
    navigate("/");
  };

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
          <Button className="bg-secondary max-w-sm mt-2" onClick={logout}>
            Logout
          </Button>
          <ToastContainer />
        </div>
      )}
      {subpage === "places" && <Places />}
    </div>
  );
};

export default UserDashboard;

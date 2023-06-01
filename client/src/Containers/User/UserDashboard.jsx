import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Button from "../../widgets/button/Button";
import { resetUserDetails } from "../../reducers/userSlice";
import Places from "../Places/Places";
import Account from "./Account";

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
        </div>
      )}
      {subpage === "places" && <Places />}
    </div>
  );
};

export default UserDashboard;

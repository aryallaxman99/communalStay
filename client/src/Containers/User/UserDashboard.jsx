import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Button from "../../widgets/button/Button";
import { resetUserDetails } from "../../reducers/userSlice";
import { resetTokenDetails } from "../../reducers/tokenSlice";

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
    dispatch(resetTokenDetails());
    navigate("/");
  };

  if (!user.firstName) {
    return <Navigate to={"/login"} />;
  }

  const linkClasses = (type) => {
    let classes = "px-4 py-1 bg-secondary text-white rounded-full";
    if (type !== subpage) {
      classes = "py-2 px-6";
    } else {
      return classes;
    }
  };
  return (
    <div>
      <nav className="w-full flex justify-center mt-8 gap-7">
        <Link className={linkClasses("profile")} to={"/account"}>
          My Profile
        </Link>
        <Link className={linkClasses("bookings")} to={"/account/bookings"}>
          My Bookings
        </Link>
        <Link className={linkClasses("places")} to={"/account/places"}>
          My Accommodations
        </Link>
      </nav>
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          <h6>
            Hello {user.firstName} {user.lastName}
          </h6>
          <Button className="bg-primary max-w-sm mt-2" onClick={logout}>
            Logout
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;

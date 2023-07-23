import { Link, useLocation } from "react-router-dom";
import { ImProfile } from "react-icons/im";
import { FaRegCalendarCheck } from "react-icons/fa";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { BsCalendar2WeekFill } from "react-icons/bs";

const Account = () => {
  const { pathname } = useLocation();
  let subPage = pathname.split("/")[2];
  if (subPage === undefined) {
    subPage = "profile";
  }

  const linkClasses = (type = null) => {
    let classes = "inline-flex gap-1 py-2  px-6 rounded-full";
    if (type === subPage) {
      return (classes = `${classes} text-white bg-primary`);
    } else {
      return (classes = `${classes} bg-gray-300`);
    }
  };

  return (
    <nav className="w-full flex justify-center mt-8 mb-8 gap-7">
      <Link className={linkClasses("profile")} to={"/account"}>
        <ImProfile className="h-6 w-6" />
        My Profile
      </Link>

      <Link className={linkClasses("bookings")} to={"/account/bookings"}>
        <FaRegCalendarCheck className="h-6 w-6" />
        My Bookings
      </Link>
      <Link className={linkClasses("places")} to={"/account/places"}>
        <HiOutlineBuildingOffice2 className="h-6 w-6" />
        My Accommodations
      </Link>
      <Link className={linkClasses("request")} to={"/account/request"}>
        <BsCalendar2WeekFill className="h-6 w-6" />
        Booking Requests
      </Link>
    </nav>
  );
};

export default Account;

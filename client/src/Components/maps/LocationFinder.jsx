import { HiOutlineLocationMarker } from "react-icons/hi";
import { NavLink } from "react-router-dom";

const LocationFinder = ({ location, styling }) => {
  return (
    <div className="flex">
      <HiOutlineLocationMarker className="h-5 w-5" />
      <NavLink
        className={styling}
        target="_blank"
        to={`https://maps.google.com/?q=${location}`}
      >
        {location}
      </NavLink>
    </div>
  );
};

export default LocationFinder;

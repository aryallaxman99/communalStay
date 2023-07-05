import { HiOutlineLocationMarker } from "react-icons/hi";

const LocationFinder = ({ location, styling }) => {
  return (
    <div className="flex">
      <HiOutlineLocationMarker className="h-5 w-5" />
      <a
        className={styling}
        target="_blank"
        rel="noreferrer"
        href={`https://maps.google.com/?q=${location}`}
      >
        {location}
      </a>
    </div>
  );
};

export default LocationFinder;

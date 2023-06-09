import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Account from "../User/Account";
import axios from "axios";

import requests from "../../Requests";

const Places = () => {
  const [placesInfo, setPlacesInfo] = useState([]);

  useEffect(() => {
    axios.get(requests.getPlacesByOwnerId).then(({ data }) => {
      setPlacesInfo(data);
    });
  }, []);

  return (
    <div>
      <Account />
      <div className="text-center">
        <Link
          className="bg-secondary text-white py-2 px-6 rounded-full inline-flex gap-2"
          to={"/account/places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new Places
        </Link>
        <div className="mt-4">
          {placesInfo.length > 0
            ? placesInfo.map((items) => (
                <Link
                  to={`/account/places/${items._id}`}
                  className="flex mb-4 gap-4 bg-gray-200 p-2 rounded-2xl"
                >
                  <div className="flex gap-4 w-32 h-32 bg-gray-300 shrink-0">
                    {items.photos.length > 0 ? (
                      <img
                        className="object-cover"
                        src={`http://localhost:8000/uploads/${items.photos[0]}`}
                        alt=""
                      />
                    ) : null}
                  </div>
                  <div className="grow-0 shrink">
                    <h2>{items.title}</h2>
                    <p className="mt-2">{items.descriptions}</p>
                  </div>
                </Link>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default Places;

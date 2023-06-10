import { useEffect, useState } from "react";
import axios from "axios";
import requests from "../Requests";
import { Link } from "react-router-dom";

const IndexPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get(requests.getAllPlaces).then((res) => setPlaces(res.data));
  }, []);

  return (
    <div className="mt-8 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places
        ? places.map((items) => (
            <Link to={`/place/${items._id}`}>
              <div className="flex bg-gray-500 rounded-2xl mb-2">
                {items.photos?.[0] && (
                  <img
                    className="rounded-2xl object-cover aspect-square"
                    alt=""
                    src={`http://localhost:8000/uploads/${items.photos[0]}`}
                  />
                )}
              </div>
              <h5 className="truncate">{items.title}</h5>
              <h6 className="text-sm text-gray-600">{items.address}</h6>
              <div className="mt-1">
                <b>NPR {items.price} </b> night
              </div>
            </Link>
          ))
        : null}
    </div>
  );
};

export default IndexPage;

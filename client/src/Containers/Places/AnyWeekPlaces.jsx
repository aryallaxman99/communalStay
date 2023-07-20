import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineReadMore } from "react-icons/md";
import { TbCurrencyRupeeNepalese } from "react-icons/tb";

import requests from "../../Requests";
import ImageViewer from "../../utils/ImageViewer";
import LocationFinder from "../../Components/maps/LocationFinder";

const AnyWeekPlaces = () => {
  const [place, setPlace] = useState([]);

  useEffect(() => {
    axios.get(requests.getAllPlaces).then((res) => setPlace(res.data));
  }, []);

  return (
    <div id="top">
      {place && place.length > 0
        ? place.map((items) => (
            <Link
              to={`/listings/${items._id}`}
              className="flex m-5 p-5 gap-5 bg-gray-100 rounded-xl"
            >
              <ImageViewer
                styling={
                  "h-48 w-80 overflow-hidden rounded-md hover:opacity-80"
                }
                imageName={items.photos?.[0]}
              />
              <div className="flex flex-col justify-between">
                <h1 className="text-xl text-gray-600">{items.title}</h1>
                <LocationFinder
                  styling={"hover:underline"}
                  location={items.address}
                />
                <p className="flex flex-row gap-2 text-gray-500">
                  {`${items.features[0]} · ${items.features[1]} · ${items.features[2]} · ${items.features[3]}`}
                  <MdOutlineReadMore className="h-6 w-6" />
                </p>

                <div className="flex flex-row gap-2 text-gray-600">
                  <TbCurrencyRupeeNepalese className="h-6 w-6 mt-1" />
                  <h3 className="text-xl">{items.price} / night</h3>
                </div>
                <br />
              </div>
            </Link>
          ))
        : null}
      <p className="text-end hover:underline text-red-500 mb-3">
        <a href="#top">Back to Top</a>
      </p>
    </div>
  );
};

export default AnyWeekPlaces;

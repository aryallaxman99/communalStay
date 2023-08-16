import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsHouseAdd } from "react-icons/bs";
import axios from "axios";

import Account from "../User/Account";
import requests from "../../Requests";
import ImageViewer from "../../utils/ImageViewer";

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
          <BsHouseAdd className="h-6 w-6" />
          Add new Places
        </Link>
        <div className="mt-4">
          {placesInfo.length > 0
            ? placesInfo.map((items) => (
                <Link
                  key={items._id}
                  to={`/account/places/${items._id}`}
                  className="flex mb-4 gap-4 bg-gray-200 p-2 rounded-2xl"
                >
                  <div>
                    {items.photos.length > 0 ? (
                      <div className="flex gap-4 w-32 h-32 bg-gray-300 shrink-0">
                        <ImageViewer
                          imageName={items.photos[0]}
                          styling={"object-cover rounded-md"}
                        />
                      </div>
                    ) : null}
                  </div>
                  <div className="text-left">
                    <h2>{items.title}</h2>
                    <p className="mt-1">{items.descriptions}</p>
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

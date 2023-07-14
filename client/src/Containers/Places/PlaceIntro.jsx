import axios from "axios";
import { useEffect, useState } from "react";
import requests from "../../Requests";
import LocationFinder from "../../Components/maps/LocationFinder";
import ImageViewer from "../../utils/ImageViewer";
import { Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import { TbCurrencyRupeeNepalese } from "react-icons/tb";

const PlaceIntro = ({ placeId }) => {
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (placeId) {
      axios
        .get(requests.getPlacesById + placeId)
        .then((res) => setPlace([res.data.placeInfo]));
    }
  }, [placeId]);

  return (
    <div>
      {place && place.length > 0 ? (
        place.map((items) => (
          <div>
            {items.photos.length > 0 && (
              <div className="rounded-xl shadow-lg hover:shadow-slate-950 hover:opacity-90">
                <ImageViewer
                  styling={"rounded-xl w-full max-h-72"}
                  imageName={items.photos[0]}
                />
              </div>
            )}
            <div className="mt-3 space-y-1.5">
              <Link
                to={`/listings/${placeId}`}
                target="_blank"
                className="text-xl font-semibold hover:underline"
              >
                {items.title}
              </Link>
              <div className="text-gray-600">
                <LocationFinder
                  styling={"text-sm underline"}
                  location={items.address}
                />
              </div>
              {items.price && (
                <h5 className="flex gap-1">
                  <TbCurrencyRupeeNepalese className="mt-1 h-5 w-5" />{" "}
                  {items.price} / night
                </h5>
              )}
            </div>
          </div>
        ))
      ) : (
        <div>
          {placeId && !place ? (
            <div>
              <Skeleton width={400} height={400} animation="pulse" />
              <Skeleton height={50} animation="wave" />
              <Skeleton height={30} width="60%" animation="wave" />
              <Skeleton height={50} width="40%" animation="wave" />
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default PlaceIntro;

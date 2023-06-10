import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import requests from "../../Requests";
import { Skeleton } from "@mui/material";

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState();
  const [p, setPlaces] = useState();
  useEffect(() => {
    if (id) {
      axios
        .get(requests.getPlacesById + id)
        .then((res) => setPlace(res.data.placeInfo));
    }
  }, [id]);
  console.log(place);
  return (
    <div className="mt-4 -mx-8 px-8 py-8">
      <h1 className="text-3xl">
        {place ? (
          place.title
        ) : (
          <Skeleton width={"60%"} height={60} animation="wave" />
        )}
      </h1>
      <a
        target="_blank"
        href={place ? `https://maps.google.com/?q=${place.address}` : null}
        className="my-2 block font-semibold underline"
      >
        {place ? (
          place.address
        ) : (
          <Skeleton width={"30%"} height={40} animation="wave" />
        )}
      </a>
      <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr]">
          <div>
            {place ? (
              place.photos[0] && (
                <div>
                  <img
                    className="aspect-square object-cover "
                    src={`http://localhost:8000/uploads/${place.photos[0]}`}
                  />
                </div>
              )
            ) : (
              <Skeleton
                sx={{ height: 190, width: 200 }}
                animation="wave"
                variant="rectangular"
              />
            )}
          </div>
          <div className="grid">
            {place ? (
              place.photos[1] && (
                <img
                  className="aspect-square object-cover "
                  src={`http://localhost:8000/uploads/${place.photos[1]}`}
                />
              )
            ) : (
              <Skeleton
                sx={{ height: 190, width: 200 }}
                animation="wave"
                variant="rectangular"
              />
            )}
            <div className="overflow-hidden">
              {place ? (
                place.photos[2] && (
                  <img
                    className="aspect-square object-cover relative top-2"
                    src={`http://localhost:8000/uploads/${place.photos[2]}`}
                  />
                )
              ) : (
                <Skeleton
                  sx={{ height: 190, width: 200 }}
                  animation="wave"
                  variant="rectangular"
                />
              )}
            </div>
          </div>
        </div>
        <button className="flex gap-2 absolute border border-black bottom-2 right-2 py-2 px-4 bg-white rounded-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            className="w-7 h-7"
          >
            <path
              fill-rule="evenodd"
              d="M3 11.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-10-5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-10-5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"
            ></path>
          </svg>
          <span className="font-semibold">Show all Photos </span>
        </button>
      </div>
    </div>
  );
};

export default PlacePage;

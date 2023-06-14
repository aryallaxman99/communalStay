import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import requests from "../../Requests";
import { Skeleton } from "@mui/material";
import DisplayFeatures from "../Features/DisplayFeatures";
import Booking from "../../widgets/booking/Booking";

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState();

  const [allPhotos, setAllPhotos] = useState(false);

  useEffect(() => {
    if (id) {
      axios
        .get(requests.getPlacesById + id)
        .then((res) => setPlace(res.data.placeInfo));
    }
  }, [id]);

  if (allPhotos) {
    return (
      <div className="absolute bg-white inset-0 min-h-screen">
        <div className="p-8 grid gap-4">
          <div>
            <button onClick={() => setAllPhotos(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 bg-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                />
              </svg>
            </button>
          </div>
          {place.photos
            ? place.photos.length > 0 &&
              place.photos.map((items) => (
                <div>
                  <img src={`http://localhost:8000/uploads/${items}`} alt="" />
                </div>
              ))
            : null}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 -mx-8 px-8 py-8">
      <h1 className="text-3xl">
        {place ? (
          place.title
        ) : (
          <Skeleton width={"60%"} height={60} animation="wave" />
        )}
      </h1>
      {place ? (
        <div className="flex gap-1 text-sm text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 mt-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
          <a
            target="_blank"
            href={`https://maps.google.com/?q=${place.address}`}
            className="my-2 block font-semibold underline"
          >
            {place.address}
          </a>
        </div>
      ) : (
        <Skeleton width={"30%"} height={40} animation="wave" />
      )}
      <div className="relative mt-4">
        <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden">
          <div>
            {place ? (
              place.photos[0] && (
                <div>
                  <img
                    alt=""
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
                  alt=""
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
                    alt=""
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
        {place ? (
          <button
            onClick={() => setAllPhotos(true)}
            className="flex gap-2 absolute border border-black bottom-2 right-2 py-2 px-4 bg-white rounded-xl"
          >
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
        ) : null}
      </div>
      <div className=" h-px my-6 bg-gray-300" />
      {place ? (
        <>
          <h2 className="font-semibold my-4 text-2xl">Description</h2>
          {place.descriptions}
        </>
      ) : (
        <Skeleton variant="rounded" height={100} />
      )}
      <div className="h-px my-6 bg-gray-300" />
      <DisplayFeatures place={place} />
      <div className="h-1 w-60 my-6 bg-gray-300" />
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div className="mt-2">
          {place ? (
            place.owner.firstName && `Hosted by ${place.owner.firstName}`
          ) : (
            <Skeleton variant="rounded" height={40} width={240} />
          )}
          <br />
          {place ? (
            `Check-in time: ${place.checkIn}`
          ) : (
            <Skeleton variant="rounded" height={40} width={240} />
          )}
          <br />
          {place ? (
            `Check-out time: ${place.checkOut}`
          ) : (
            <Skeleton variant="rounded" height={40} width={240} />
          )}
          <br />
          {place ? (
            `Maximum number of guests: ${place.maxGuests}`
          ) : (
            <Skeleton variant="rounded" height={40} width={240} />
          )}
        </div>
        <Booking place={place} />
      </div>
      <div>
        {place ? (
          <>
            <div className="h-px my-6 bg-gray-300" />
            <h2 className="mt-2 font-semibold text-2xl">Extra Info</h2>
            <div className="mt-4 text-sm text-gray-700 leading-1">
              {place.extraInfo}
            </div>
          </>
        ) : (
          <Skeleton variant="rounded" height={150} />
        )}
      </div>
    </div>
  );
};

export default PlacePage;

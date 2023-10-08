import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Skeleton } from "@mui/material";
import { ImImages } from "react-icons/im";
import { TiArrowBackOutline } from "react-icons/ti";

import requests from "../../Requests";
import DisplayFeatures from "../Features/DisplayFeatures";
import Booking from "../../widgets/booking/Booking";
import ImageViewer from "../../utils/ImageViewer";
import Button from "../../widgets/button/Button";
import LocationFinder from "../../Components/maps/LocationFinder";
import { useSelector } from "react-redux";

const PlacePage = () => {
  const { userRole } = useSelector((state) => state.user);
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
      <div key={id} className="absolute bg-white inset-0 min-h-screen">
        <div className="p-8 grid gap-4">
          <div>
            <Button
              className="text-black w-fit bg-white"
              onClick={() => setAllPhotos(false)}
            >
              <TiArrowBackOutline className="h-6 w-6" />
            </Button>
          </div>
          {place.photos
            ? place.photos.length > 0 &&
              place.photos.map((items) => (
                <div key={items}>
                  <ImageViewer imageName={items} />
                </div>
              ))
            : null}
          <div className="text-end hover:underline text-red-500 mb-3">
            <a href="#top">Back to Top</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div key={id} className="mt-4 -mx-8 px-8 py-8">
      <h1 className="text-3xl">
        {place ? (
          place.title
        ) : (
          <Skeleton width={"60%"} height={60} animation="wave" />
        )}
      </h1>
      {place ? (
        <div className="flex gap-1 text-sm text-gray-600">
          <LocationFinder
            styling={"font-semibold underline"}
            location={place.address}
          />
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
                  <ImageViewer
                    imageName={place.photos[0]}
                    styling={"aspect-square object-cover "}
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
                <ImageViewer
                  imageName={place.photos[1]}
                  styling={"aspect-square object-cover "}
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
                  <ImageViewer
                    imageName={place.photos[2]}
                    styling={"aspect-square object-cover relative top-2"}
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
          <Button
            onClick={() => setAllPhotos(true)}
            className="flex gap-2 absolute bottom-2 right-2 bg-white text-gray-700 w-fit px-4"
          >
            <ImImages className="h-6 w-6 text-gray-700" />

            <span className="font-semibold">Show all Photos </span>
          </Button>
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
        {!userRole ? <Booking place={place} /> : null}
      </div>
      <div>
        {place ? (
          <>
            <div className="h-px my-6 bg-gray-300" />
            <div className="bg-gray-100 w-full rounded-md">
              <h2 className="mt-2 font-semibold text-2xl">Extra Info</h2>
              <div className="mt-4 text-sm text-gray-700 leading-1">
                {place.extraInfo}
              </div>
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

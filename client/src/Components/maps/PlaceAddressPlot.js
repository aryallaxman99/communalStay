import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { toast } from "react-toastify";
import axios from "axios";
import requests from "../../Requests";
import { BiCurrentLocation } from "react-icons/bi";
import Button from "../../widgets/button/Button";

const PlaceAddressPlot = () => {
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const [center, setCenter] = useState({
    lat: 27.700001,
    lng: 85.333336,
  });
  const [place, setPlace] = useState();

  console.log(place);
  useEffect(() => {
    axios.get(requests.getAllPlaces).then((res) => setPlace(res.data));
  }, []);

  const getCurrentLocation = () => {
    const success = (position) => {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    };

    const error = (err) => {
      toast.warn(err.message);
    };

    navigator.geolocation.getCurrentPosition(success, error, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    });
  };

  return (
    <div className="flex">
      <div className="border relative">
        <LoadScript googleMapsApiKey={googleMapsApiKey}>
          <div className="relative">
            <GoogleMap
              mapContainerStyle={{ height: "600px", width: "800px" }}
              center={center}
              zoom={10}
            ></GoogleMap>
            <Button className="absolute bottom-48 right-3 bg-white rounded-sm w-auto">
              <BiCurrentLocation
                className="h-6 w-6 text-current hover:text-gray-700"
                onClick={() => getCurrentLocation()}
              />
            </Button>
          </div>
        </LoadScript>
      </div>
    </div>
  );
};

export default PlaceAddressPlot;

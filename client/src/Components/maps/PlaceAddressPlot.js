import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { toast } from "react-toastify";

const PlaceAddressPlot = () => {
  const googleMapsApiKey = "AIzaSyA0O_MV5VjO7FMAl6kZFok35pyI1x6YMl4";
  const [loading, setLoading] = useState(true);
  const [center, setCenter] = useState({
    lat: 27.700001,
    lng: 85.333336,
  });

  if (loading) {
    (() => {
      const success = (position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLoading(false);
      };

      const error = (err) => {
        toast.warn(err.message);
      };

      navigator.geolocation.getCurrentPosition(success, error, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      });
    })();
  }

  return (
    <div>
      <LoadScript googleMapsApiKey={googleMapsApiKey}>
        <GoogleMap
          mapContainerStyle={{ height: "600px", width: "800px" }}
          center={center}
          zoom={10}
        ></GoogleMap>
      </LoadScript>
    </div>
  );
};

export default PlaceAddressPlot;

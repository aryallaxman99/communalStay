import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { toast } from "react-toastify";

const Map = ({ address, setAddress, setOpenMap }) => {
  const googleMapsApiKey = "AIzaSyA0O_MV5VjO7FMAl6kZFok35pyI1x6YMl4";
  const [loading, setLoading] = useState(true);
  const [center, setCenter] = useState({
    lat: 27.700001,
    lng: 85.333336,
  });
  const [latLng, setLatLng] = useState("");

  if (address && loading) {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${googleMapsApiKey}`
    )
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        if (jsonData.results[0].geometry.location) {
          setCenter(jsonData.results[0].geometry.location);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }

  const onMarkerDragEnd = (event) => {
    setLatLng(`${event.latLng.lat()}, ${event.latLng.lng()}`);
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latLng}&key=${googleMapsApiKey}`
    )
      .then((responseText) => {
        return responseText.json();
      })
      .then((jsonData) => {
        setAddress(jsonData.results[0].formatted_address);
        setOpenMap(false);
      })
      .catch(() => {
        toast.error("can't set address. Try later");
      });
  };

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey}>
      <GoogleMap
        mapContainerStyle={{ height: "600px", width: "800px" }}
        center={center}
        zoom={15}
      >
        <Marker
          position={center}
          draggable={true}
          onDragEnd={(event) => onMarkerDragEnd(event)}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;

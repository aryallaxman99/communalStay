import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { toast } from "react-toastify";
import { BiCurrentLocation } from "react-icons/bi";
import Button from "../../widgets/button/Button";

const Map = ({ address, setAddress, setOpenMap }) => {
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
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
      <div className="relative">
        <GoogleMap
          mapContainerStyle={{ height: "600px", width: "800px" }}
          center={center}
          zoom={13}
        >
          <Marker
            position={center}
            draggable={true}
            onDragEnd={(event) => onMarkerDragEnd(event)}
          />
        </GoogleMap>
        <Button className="absolute bottom-48 right-3 bg-white rounded-sm w-auto">
          <BiCurrentLocation
            className="h-6 w-6 text-current hover:text-gray-700"
            onClick={() => getCurrentLocation()}
          />
        </Button>
      </div>
    </LoadScript>
  );
};

export default Map;

import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
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
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [markers, setMarkers] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const arr = [];

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

  if (place && loading) {
    place.map(async (items) => {
      await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${items.address}&key=${googleMapsApiKey}`
      )
        .then((response) => {
          return response.json();
        })
        .then((jsonData) => {
          if (jsonData.results[0].geometry.location) {
            arr.push({
              id: items._id,
              name: items.title,
              position: jsonData.results[0].geometry.location,
            });
          }
          setMarkers(arr);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    });
  }

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const getDirection = () => {
    console.log("directions");
  };

  useEffect(() => {
    axios.get(requests.getAllPlaces).then((res) => setPlace(res.data));
  }, []);

  return (
    <div className="flex gap-2">
      <div className="border relative">
        <LoadScript googleMapsApiKey={googleMapsApiKey}>
          <div className="relative">
            <GoogleMap
              onClick={() => setActiveMarker(null)}
              mapContainerStyle={{ height: "600px", width: "800px" }}
              center={center}
              zoom={10}
            >
              {markers &&
                markers.map(({ id, name, position }) => (
                  <Marker
                    key={id}
                    position={position}
                    onClick={() => handleActiveMarker(id)}
                  >
                    {activeMarker === id ? (
                      <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                        <div onClick={() => getDirection()}>{name}</div>
                      </InfoWindow>
                    ) : null}
                  </Marker>
                ))}
            </GoogleMap>
            <Button
              type="button"
              className="absolute bottom-48 right-3 bg-white rounded-sm w-auto"
            >
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

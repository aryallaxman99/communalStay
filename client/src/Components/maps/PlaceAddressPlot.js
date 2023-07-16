import React, { useEffect, useState } from "react";
import {
  DirectionsRenderer,
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import { toast } from "react-toastify";
import axios from "axios";
import requests from "../../Requests";
import { BiCurrentLocation } from "react-icons/bi";
import { MdNearMe, MdNearMeDisabled } from "react-icons/md";
import Button from "../../widgets/button/Button";
import PlaceIntro from "../../Containers/Places/PlaceIntro";

const PlaceAddressPlot = () => {
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const [center, setCenter] = useState({
    lat: 27.700604,
    lng: 85.356384,
  });
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [flexiblePlaces, setflexiblePlaces] = useState([]);
  const [nearMePlaces, setnearMePlaces] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [isUserFlexible, setIsUserFlexible] = useState(true);
  const radius = 5000;
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

  const flexible = () => {
    setIsUserFlexible(true);
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
            setflexiblePlaces(arr);
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
      });
    }
  };

  const nearByPlaces = () => {
    setIsUserFlexible(false);
    let km = radius / 1000;
    let kx = Math.cos((Math.PI * center.lat) / 180) * 111;
    setnearMePlaces([
      ...flexiblePlaces.filter((items) => {
        let dx = Math.abs(center.lng - items.position.lng) * kx;
        let dy = Math.abs(center.lat - items.position.lat) * 111;
        return Math.sqrt(dx * dx + dy * dy) <= km;
      }),
    ]);
  };

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const calculateRoute = async (position) => {
    await new window.google.maps.DirectionsService().route(
      {
        origin: center,
        destination: position,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirectionsResponse(result);
        } else {
          toast.error("Error on fetching directions");
        }
      }
    );
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
              onLoad={() => flexible()}
              mapContainerStyle={{ height: "600px", width: "800px" }}
              center={center}
              zoom={10}
            >
              <Marker position={center} />
              {isUserFlexible ? (
                <>
                  {flexiblePlaces &&
                    flexiblePlaces.map(({ id, name, position }) => (
                      <Marker
                        icon={{
                          url: "https://cdn-icons-png.flaticon.com/512/3295/3295110.png",
                          scaledSize: new window.google.maps.Size(40, 40),
                        }}
                        key={id}
                        position={position}
                        onClick={() => {
                          handleActiveMarker(id);
                          calculateRoute(position);
                        }}
                      >
                        {activeMarker === id ? (
                          <InfoWindow
                            onCloseClick={() => {
                              setActiveMarker(null);
                              setDirectionsResponse(null);
                            }}
                          >
                            <div>{name}</div>
                          </InfoWindow>
                        ) : null}
                      </Marker>
                    ))}
                </>
              ) : (
                <>
                  {nearMePlaces &&
                    nearMePlaces.map(({ id, name, position }) => (
                      <Marker
                        icon={{
                          url: "https://cdn-icons-png.flaticon.com/512/3295/3295110.png",
                          scaledSize: new window.google.maps.Size(40, 40),
                        }}
                        key={id}
                        position={position}
                        onClick={() => {
                          handleActiveMarker(id);
                          calculateRoute(position);
                        }}
                      >
                        {activeMarker === id ? (
                          <InfoWindow
                            onCloseClick={() => {
                              setActiveMarker(null);
                              setDirectionsResponse(null);
                            }}
                          >
                            <div>{name}</div>
                          </InfoWindow>
                        ) : null}
                      </Marker>
                    ))}
                </>
              )}
              {directionsResponse && (
                <DirectionsRenderer directions={directionsResponse} />
              )}
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
      <div className="p-3">
        <div>
          <Button
            onClick={() => {
              isUserFlexible ? nearByPlaces() : flexible();
            }}
            className="bg-secondary w-auto rounded-xl"
          >
            <div className="flex p-1 gap-2">
              {isUserFlexible ? (
                <>
                  <MdNearMe className="h-6 w-6" />
                  Near Me
                </>
              ) : (
                <>
                  <MdNearMeDisabled className="h-6 w-6" />
                  I’m Flexible
                </>
              )}
            </div>
          </Button>
        </div>
        <div className="mt-3">
          {!isUserFlexible && nearMePlaces.length <= 0 && (
            <p>No any places found.</p>
          )}
          <PlaceIntro placeId={activeMarker} />
        </div>
      </div>
    </div>
  );
};

export default PlaceAddressPlot;

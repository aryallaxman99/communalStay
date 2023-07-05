import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "800px",
  height: "600px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const Map = () => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyA0O_MV5VjO7FMAl6kZFok35pyI1x6YMl4">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;

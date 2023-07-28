import { useState, useEffect } from "react";
import getApiResponse from "../apiCall";
import requests from "../Requests";
import { toast } from "react-toastify";

export function useGetPlaceData() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [places, setPlaces] = useState([]);
  const [page, setPage] = useState(1);
  const [totalDataInDB, setTotalDataInDB] = useState(null);

  const getPlaceData = async () => {
    try {
      if (places.length !== totalDataInDB) {
        setLoading(true);
        setError(null);

        const url = `${requests.placeByUserReq}limit=8&page=${page}`;

        const placesResponse = await getApiResponse({
          url,
        });

        setPlaces([...places, ...placesResponse.data.data]);
        setTotalDataInDB(placesResponse.data.total);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = async () => {
    try {
      if (
        document.scrollingElement.scrollHeight <=
        window.innerHeight + document.scrollingElement.scrollTop + 1
      ) {
        setPage((previous) => previous + 1);
      }
    } catch (error) {
      toast.error("Something went wrong. Try again...");
    }
  };

  useEffect(() => {
    getPlaceData();
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return {
    loading,
    error,
    places,
  };
}

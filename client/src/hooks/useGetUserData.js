import { useEffect, useState } from "react";
import getApiResponse from "../apiCall";
import requests from "../Requests";

export function useGetUserData() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [userData, setUserData] = useState();

  const getUserData = async () => {
    try {
      setLoading(true);
      setError(false);
      const { data } = await getApiResponse({
        url: requests.userProfile,
        method: "get",
      });
      setUserData(data.userData);
    } catch (err) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return {
    loading,
    error,
    userData,
  };
}

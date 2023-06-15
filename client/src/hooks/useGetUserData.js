import { useEffect, useState } from "react";
import getApiResponse from "../apiCall";
import requests from "../Requests";
import Cookies from "js-cookie";

export function useGetUserData() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [userData, setUserData] = useState();
  const cookies = Cookies.get();
  const getUserData = async () => {
    try {
      setLoading(true);
      setError(false);

      if (cookies.refreshToken) {
        const { data } = await getApiResponse({
          url: requests.verifyToken,
          method: "get",
        });
        setUserData(data.userData);
      }
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
    cookies,
  };
}

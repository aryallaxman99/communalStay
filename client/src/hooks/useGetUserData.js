import { useState } from "react";
import getApiResponse from "../apiCall";
import requests from "../Requests";

export function useGetUserData() {
  const [loading, setLoading] = useState();
  const [errorm, setError] = useState();

  const getUserData = async () => {
    await getApiResponse({
      url: requests.userProfile,
      method: "get",
    });
  };
}

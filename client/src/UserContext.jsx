import { createContext, useEffect } from "react";
import axios from "axios";
import requests from "./Requests";
import { useSelector } from "react-redux";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const accessToken = useSelector((state) => state.token);
  useEffect(() => {
    if (accessToken.token) {
      axios.get(requests.userProfile, {
        headers: {
          Authorization: `Bearer ${accessToken.token}`,
        },
      });
    }
  }, []);
  return <UserContext.Provider>{children}</UserContext.Provider>;
};

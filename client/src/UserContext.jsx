import { createContext, useEffect } from "react";
import axios from "axios";
import requests from "./Requests";
import { useDispatch, useSelector } from "react-redux";
import { resetUserDetails } from "./reducers/userSlice";
import { resetTokenDetails } from "./reducers/tokenSlice";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const userDetails = useSelector((state) => state.user);
  const accessToken = useSelector((state) => state.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (accessToken.token) {
      axios
        .get(requests.userProfile, {
          headers: {
            Authorization: `Bearer ${accessToken.token}`,
          },
        })
        .then((data) => {
          if (data.data.id !== userDetails.id) {
            dispatch(resetUserDetails());
            dispatch(resetTokenDetails());
          }
        });
    }
  }, []);

  return <UserContext.Provider>{children}</UserContext.Provider>;
};

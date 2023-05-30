import { createContext, useEffect, useState } from "react";
import axios from "axios";
import requests from "./Requests";
import { useDispatch, useSelector } from "react-redux";
import { resetUserDetails } from "./reducers/userSlice";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const userDetails = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      axios.get(requests.userProfile).then((res) => {
        if (
          userDetails.email !== res.data.email ||
          userDetails.id !== res.data.id
        ) {
          dispatch(resetUserDetails());
        } else {
          setUser(res.data);
        }
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

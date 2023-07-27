import React, { createContext } from "react";
import { useGetUserData } from "./hooks/useGetUserData";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const { loading, error } = useGetUserData();

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <p>Error</p>;
  }

  return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
};

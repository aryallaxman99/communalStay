import { createContext } from "react";
import { useGetUserData } from "./hooks/useGetUserData";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const { loading, error, userData } = useGetUserData();

  if (loading) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>Error</p>;
  }

  if (!userData) {
    return <p>User not found</p>;
  }

  return <UserContext.Provider>{children}</UserContext.Provider>;
};

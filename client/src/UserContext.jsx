import React, { createContext } from "react";
import { useGetUserData } from "./hooks/useGetUserData";
import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const { loading, error, userData } = useGetUserData();

  if (loading) {
    return (
      <Card>
        <CardHeader />
        <Skeleton sx={{ height: 90 }} animation="pulse" variant="rectangular" />
      </Card>
    );
  }

  if (error) {
    return <p>Error</p>;
  }

  if (document.cookie && !userData) {
    return <p>User not found</p>;
  }

  return <UserContext.Provider>{children}</UserContext.Provider>;
};

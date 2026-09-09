import React from "react";
import LayoutWithNavbar from "./LayoutWithNavbar";
import PrivateRoute from "utils/PrivateRoute/PrivateRoute";

const RouteWithNavbar = ({ element, isPrivate = false }) => {
  if (isPrivate) {
    return (
      <PrivateRoute>
        <LayoutWithNavbar>{element}</LayoutWithNavbar>
      </PrivateRoute>
    );
  }

  return <LayoutWithNavbar>{element}</LayoutWithNavbar>;
};

export default RouteWithNavbar;

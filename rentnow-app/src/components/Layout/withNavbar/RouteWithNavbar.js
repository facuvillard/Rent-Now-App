import React from "react";
import { Route } from "react-router-dom";
import LayoutWithNavbar from "components/Layout/withNavbar/LayoutWithNavbar";
import PrivateRoute from "utils/PrivateRoute/PrivateRoute";

const RouteWithNavbar = ({
  component: Component,
  title,
  isPrivate,
  ...rest
}) => {
  const RouteToRender = () => {
    if (isPrivate) {
      return (
        <LayoutWithNavbar>
          <PrivateRoute
            component={(props) => <Component {...props} />}
            {...rest}
          />
        </LayoutWithNavbar>
      );
    } else {
      return (
        <Route 
          {...rest}
          render={(props) => (
            <LayoutWithNavbar>
              <Component {...props} />
            </LayoutWithNavbar>
          )}
        />
      );
    }
  };
  return RouteToRender();
};

export default RouteWithNavbar;
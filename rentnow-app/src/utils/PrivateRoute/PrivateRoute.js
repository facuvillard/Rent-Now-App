import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "Auth/Auth";

const PrivateRoute = ({
  component: RouteComponent,
  permiso,
  elemento,
  ...rest
}) => {
  const { currentUser } = useContext(AuthContext);
  const componentToRender = (routeProps) => {
        return <RouteComponent {...routeProps} />;
  };

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        currentUser ? componentToRender(routeProps) : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;

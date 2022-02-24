import React from "react";
import { Redirect, Route } from "react-router";
import { getItem } from "../utils/sessionStorageFn";

const AuthRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        getItem("user") ? <Component {...props} /> : <Redirect to="/Login" />
      }
    />
  );
};

export default AuthRoute;

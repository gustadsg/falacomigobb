import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { Context } from "../context/Context";

export default function PrivateRoute({ path, component, ...restProps }) {
  const context = useContext(Context);
  return context.user && context.room ? (
    <Route path={path} component={component} {...restProps} />
  ) : (
    <Redirect to="/" />
  );
}

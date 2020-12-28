import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";

import Join from "./pages/Join";
import Chat from "./pages/Chat";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Join} />
        <PrivateRoute exact path="/chat" component={Chat} />
      </Switch>
    </BrowserRouter>
  );
}

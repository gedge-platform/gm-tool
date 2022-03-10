import React from "react";
import { Route, Switch } from "react-router-dom";
import {
  TotalDashboard,
  Cluster,
  Project,
  Monitoring,
  Login,
  NotFound,
  ServiceProject,
} from "@/pages";
import AuthRoute from "./routes/AuthRoute";

export const App = () => {
  return (
    <>
      <AuthRoute exact path="/" component={TotalDashboard} />
      <Switch>
        {/* PA */}
        <AuthRoute path="/cluster" component={Cluster} />
        <AuthRoute path="/project" component={Project} />
        <AuthRoute path="/monitoring" component={Monitoring} />

        {/* SA */}
        <AuthRoute path="/service/project" component={ServiceProject} />

        <Route path="/login" component={Login} />

        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export default App;

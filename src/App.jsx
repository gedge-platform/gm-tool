import React from "react";
import { Route, Switch } from "react-router-dom";
import {
  TotalDashboard,
  Cluster,
  Project,
  Login,
  NotFound,
  WorkSpace,
  User,
  Monitoring,
  ServiceProject,
  ServiceWorkload,
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
        <AuthRoute path="/workSpace" component={WorkSpace} />
        <AuthRoute path="/user" component={User} />

        {/* SA */}
        <AuthRoute path="/service/project" component={ServiceProject} />
        <AuthRoute path="/service/workload" component={ServiceWorkload} />

        <Route path="/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export default App;

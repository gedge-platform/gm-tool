import React from "react";
import { Route, Switch } from "react-router-dom";
import { TotalDashboard, Cluster, Project, Login, NotFound } from "@/pages";
import AuthRoute from "./routes/AuthRoute";

export const App = () => {
  return (
    <>
      <AuthRoute exact path="/" component={TotalDashboard} />
      <Switch>
        {/* 인프라 관리 */}
        <AuthRoute path="/cluster" component={Cluster} />
        <AuthRoute path="/project" component={Project} />

        <Route path="/login" component={Login} />

        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export default App;

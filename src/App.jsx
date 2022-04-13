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
  ComponentManage,
  ServiceProject,
  ServiceWorkload,
  ServiceWorkSpace,
  ServiceMonitoring,
  Volume,
  Configuration,
} from "@/pages";
import AuthRoute from "./routes/AuthRoute";
import DeploymentPopup from "./pages/ServiceAdmin/Workload/Dialog/DeploymentPopup";

export const App = () => {
  return (
    <>
      <AuthRoute exact path="/" component={TotalDashboard} />
      <Switch>
        {/* PA */}
        <AuthRoute path="/cluster" component={Cluster} />
        <AuthRoute path="/project" component={Project} />
        <AuthRoute path="/component" component={ComponentManage} />
        <AuthRoute path="/monitoring" component={Monitoring} />
        <AuthRoute path="/workSpace" component={WorkSpace} />
        <AuthRoute path="/user" component={User} />
        <AuthRoute path="/volumes" component={Volume} />
        <AuthRoute path="/configuration" component={Configuration} />

        {/* SA */}
        <AuthRoute path="/service/project" component={ServiceProject} />
        <AuthRoute path="/service/workload" component={ServiceWorkload} />
        <AuthRoute path="/service/workspace" component={ServiceWorkSpace} />
        <AuthRoute path="/service/monitoring" component={ServiceMonitoring} />

        <Route path="/login" component={Login} />
        <Route path="/callback" component={DeploymentPopup} />

        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export default App;

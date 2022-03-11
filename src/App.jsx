import React from "react";
import { Route, Switch } from "react-router-dom";
import { TotalDashboard, Cluster, Project, Login, NotFound, WorkSpace, User  } from "@/pages";
import AuthRoute from "./routes/AuthRoute";

export const App = () => {
  return (
    <>
      <AuthRoute exact path="/" component={TotalDashboard} />
      <Switch>

        <AuthRoute path="/cluster" component={Cluster} />
        <AuthRoute path="/project" component={Project} />

        <AuthRoute path="/workSpace" component={WorkSpace} />
        <AuthRoute path="/user" component={User} />

        <Route path="/login" component={Login} />
        
      </Switch>
    </>
  );
};

export default App;

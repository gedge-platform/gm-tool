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
  Certification,
  PlatformUser,
  // CloudZone,
  Topology,
  Roadbalancer,
  Storage,
  CreateUser,
  PlatformControl,
  Template,
  ServiceAdmin,
  StorageDashboard,
} from "@/pages";
import EdgeZoneDashboard from "./pages/Gedge/Platform/EdgeZone/EdgeZoneDashboard";
import CloudZoneDashboard from "./pages/Gedge/Platform/CloudZone/CloudZoneDashboard";
import PlatformDashboard from "./pages/Gedge/Platform/PlatformDashboard";
import EdgeClusterListTab from "./pages/Gedge/Cluster/TabList/EdgeClusterListTab";
import CoreClusterListTab from "./pages/Gedge/Cluster/TabList/CoreClusterListTab";
import AuthRoute from "./routes/AuthRoute";
import DeploymentPopup from "./pages/ServiceAdmin/Workload/Dialog/DeploymentPopup";
import { getItem } from "./utils/sessionStorageFn";
import axios from "axios";
import userStore from "./store/UserStore";
import UserCreate from "./pages/Gedge/Service/Project/CreateUser/CreateUser";

export const App = () => {
  // 새로고침하면 api header 설정이 날아가니까 안 날아가게 설정
  const token = getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

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
        <AuthRoute path="/certification" component={NotFound} />
        <AuthRoute path="/platformUser" component={PlatformUser} />
        <AuthRoute path="/edgeZone" component={EdgeClusterListTab} />
        <AuthRoute path="/cloudZone" component={CoreClusterListTab} />
        <AuthRoute path="/platformDashboard" component={PlatformDashboard} />
        <AuthRoute path="/topology" component={NotFound} />
        <AuthRoute path="/roadbalancer" component={NotFound} />
        <AuthRoute path="/storage" component={Storage} />
        <AuthRoute path="/createUser" component={CreateUser} />
        <AuthRoute path="/platformControl" component={NotFound} />
        <AuthRoute path="/template" component={NotFound} />
        <AuthRoute path="/StorageDashboard" component={StorageDashboard} />

        {/* SA */}
        <AuthRoute path="/service/project" component={ServiceProject} />
        <AuthRoute path="/service/workload" component={ServiceWorkload} />
        <AuthRoute path="/service/workspace" component={ServiceWorkSpace} />
        <AuthRoute path="/service/monitoring" component={ServiceMonitoring} />
        <AuthRoute path="/service/ServiceAdmin" component={ServiceAdmin} />

        <Route path="/login" component={Login} />
        <Route path="/callback" component={DeploymentPopup} />

        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export default App;

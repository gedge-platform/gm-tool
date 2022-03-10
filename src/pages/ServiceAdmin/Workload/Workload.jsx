import React, { useState, useEffect } from "react";
import Layout from "@/layout";
import { Title, SubTitle } from "@/pages";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import DeploymentListTab from "./Tablist/DeploymentListTab";

const Workload = () => {
  const currentPageTitle = Title.Project;

  const [tabvalue, setTabvalue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabvalue(newValue);
  };

  return (
    <Layout currentPageTitle={currentPageTitle}>
      <CTabs type="tab1" value={tabvalue} onChange={handleTabChange}>
        <CTab label="Deployment" />
        <CTab label="Service" />
        <CTab label="Job" />
        <CTab label="CronJob" />
        <CTab label="Pod" />
        <CTab label="StatefulSet" />
        <CTab label="DemonSet" />
      </CTabs>
      <div className="tabPanelContainer">
        <CTabPanel value={tabvalue} index={0}>
          <DeploymentListTab />
        </CTabPanel>
      </div>
    </Layout>
  );
};
export default Workload;

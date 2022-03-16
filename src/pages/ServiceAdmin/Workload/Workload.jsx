import React, { useState, useEffect } from "react";
import Layout from "@/layout";
import { Title, SubTitle } from "@/pages";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import DeploymentListTab from "./Tablist/DeploymentListTab";
import ServiceListTab from "./Tablist/ServiceListTab";
import JobListTab from "./Tablist/JobListTab";
import CronJobListTab from "./Tablist/CronJobListTab";
import PodListTab from "./Tablist/PodListTab";
import StatefulSetListTab from "./Tablist/StatefulSetListTab";
import DaemonSetListTab from "./Tablist/DaemonSetListTab";

const Workload = () => {
  const currentPageTitle = Title.Workload;

  const [tabvalue, setTabvalue] = useState(4);

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
        <CTab label="DaemonSet" />
      </CTabs>
      <div className="tabPanelContainer">
        <CTabPanel value={tabvalue} index={0}>
          <DeploymentListTab />
        </CTabPanel>
        <CTabPanel value={tabvalue} index={1}>
          <ServiceListTab />
        </CTabPanel>
        <CTabPanel value={tabvalue} index={2}>
          <JobListTab />
        </CTabPanel>
        <CTabPanel value={tabvalue} index={3}>
          <CronJobListTab />
        </CTabPanel>
        <CTabPanel value={tabvalue} index={4}>
          <PodListTab />
        </CTabPanel>
        <CTabPanel value={tabvalue} index={5}>
          <StatefulSetListTab />
        </CTabPanel>
        <CTabPanel value={tabvalue} index={6}>
          <DaemonSetListTab />
        </CTabPanel>
      </div>
    </Layout>
  );
};
export default Workload;

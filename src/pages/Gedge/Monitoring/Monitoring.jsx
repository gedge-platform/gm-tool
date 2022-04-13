import React, { useState, useEffect } from "react";
import Layout from "@/layout";
import { Title } from "@/pages";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import ClusterOverview from "./TabList/ClusterOverviewTab";
import PsysicalResource from "./TabList/PhysicalResourceTab";
import APIServer from "./TabList/APIServerTab";
import Scheduler from "./TabList/SchedulerTab";

const Monitoring = () => {
  const currentPageTitle = Title.Monitoring;

  const [tabvalue, setTabvalue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabvalue(newValue);
  };

  return (
    <Layout currentPageTitle={currentPageTitle}>
      <CTabs type="tab1" value={tabvalue} onChange={handleTabChange}>
        <CTab label="클러스터 개요" />
        <CTab label="물리 자원" />
        <CTab label="API 서버" />
        <CTab label="스케쥴러" />
      </CTabs>
      <div className="tabPanelContainer">
        <CTabPanel value={tabvalue} index={0}>
          <ClusterOverview />
        </CTabPanel>
        <CTabPanel value={tabvalue} index={1}>
          <PsysicalResource />
        </CTabPanel>
        <CTabPanel value={tabvalue} index={2}>
          <APIServer />
        </CTabPanel>
        <CTabPanel value={tabvalue} index={3}>
          <Scheduler />
        </CTabPanel>
      </div>
    </Layout>
  );
};

export default Monitoring;

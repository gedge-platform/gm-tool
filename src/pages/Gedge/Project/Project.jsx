import React, { useState, useEffect } from "react";
import Layout from "@/layout";
import { Title, SubTitle } from "@/pages";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import UserServiceListTab from "./Tablist/UserServiceListTab";
import PlatfromServiceListTab from "./Tablist/PlatfromServiceListTab";

const Project = () => {
  const currentPageTitle = Title.Project;

  const [tabvalue, setTabvalue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabvalue(newValue);
  };

  return (
    <Layout currentPageTitle={currentPageTitle}>
      <CTabs type="tab1" value={tabvalue} onChange={handleTabChange}>
        <CTab label="사용자 서비스" />
        <CTab label="플랫폼 서비스" />
      </CTabs>
      <div className="tabPanelContainer">
        <CTabPanel value={tabvalue} index={0}>
          <UserServiceListTab />
        </CTabPanel>
        <CTabPanel value={tabvalue} index={1}>
          <PlatfromServiceListTab />
        </CTabPanel>
      </div>
    </Layout>
  );
};
export default Project;

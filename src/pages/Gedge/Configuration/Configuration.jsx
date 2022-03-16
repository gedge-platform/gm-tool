import React, { useState, useEffect } from "react";
import Layout from "@/layout";
import { Title, SubTitle } from "@/pages";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import ConfigurationListTab from "./TabList/ConfigurationListTab";

const Configuration = () => {
  const currentPageTitle = Title.Cluster;
  const [tabvalue, setTabvalue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabvalue(newValue);
  };

  return (
    <Layout currentPageTitle={currentPageTitle}>
      <div className="tabPanelContainer">
        <CTabPanel value={tabvalue} index={0}>
          <ConfigurationListTab />
        </CTabPanel>
      </div>
    </Layout>
  );
};
export default Configuration;

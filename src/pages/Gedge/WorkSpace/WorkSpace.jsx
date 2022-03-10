import React, { useState, useEffect } from "react";
import Layout from "@/layout";
import { Title, SubTitle } from "@/pages";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import APIListTab from "./TabList/APIListTab";

const WorkSpace = () => {
  const currentPage = SubTitle.WorkSpace;
  const currentPageTitle = Title.Infra;

  const [tabvalue, setTabvalue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabvalue(newValue);
  };

  return (
    <Layout currentPageTitle={currentPageTitle} currentPage={currentPage}>
      <div className="tabPanelContainer">
        <CTabPanel value={tabvalue} index={0}>
          <APIListTab />
        </CTabPanel>
      </div>
    </Layout>
  );
};
export default WorkSpace;

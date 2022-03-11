import React, { useState, useEffect } from "react";
import Layout from "@/layout";
import { Title, SubTitle } from "@/pages";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import ComponentListTab from "./Tablist/ComponentListTab";

const ComponentManage = () => {
  const currentPageTitle = Title.Component;

  const [tabvalue, setTabvalue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabvalue(newValue);
  };

  return (
    <Layout currentPageTitle={currentPageTitle}>
      <CTabs type="tab1" value={tabvalue} onChange={handleTabChange}></CTabs>
      <div className="tabPanelContainer">
        <CTabPanel value={tabvalue} index={0}>
          <ComponentListTab />
        </CTabPanel>
      </div>
    </Layout>
  );
};

export default ComponentManage;
{/*
 - app.jsx

import { ComponentManage } from "@/pages";
<Route path="/component" component={ComponentManage}/>
-----------------------------------------------------------------------
 - store/ComponentManage.jsx

import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { BASIC_AUTH, SERVER_URL } from "../config";

class ComponentManage {
  componentList = [];
  componentDetail = {};
  totalElements = 0;

  constructor() {
    makeAutoObservable(this);
  }

  loadComponentList = async () => {
    await axios
      .get(`${SERVER_URL}/component`, {
        auth: BASIC_AUTH,
      })
      .then((res) => {
        runInAction(() => {
          const list = res.data.data;
          this.componentList = list;
          this.componentDetail = list[0];
          this.totalElements = list.length;
        });
      });
  };
}

const ComponentStore = new ComponentManage();
export default ComponentStore;

----------------------------------------------------
 - index.jsx
export { default as ComponentManage } from "./Gedge/ComponentManage/ComponentManage";
*/}


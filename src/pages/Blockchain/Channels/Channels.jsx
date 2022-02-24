import React, { useState, useEffect } from "react";
import Layout from "@/layout";
import { Title, SubTitle } from "@/pages";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import ChannelListTab from "./TabList/ChannelListTab";
// import APIAppTab from './TabList/APIAppTab'
import channelsStore from "../../../Store/ChannelsStore";
import { observer } from "mobx-react";
import shareStore from "../../../Store/ShareStore";

const Channels = observer(() => {
  const currentPage = SubTitle.Blockchain.Channels;
  const currentPageTitle = Title.Blockchain;
  const [tabvalue, setTabvalue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabvalue(newValue);
  };

  useEffect(() => {
    channelsStore.init();
    return () => {};
  }, []);

  shareStore.height(2.3);

  return (
    <Layout currentPageTitle={currentPageTitle} currentPage={currentPage}>
      <div className="tabPanelContainer">
        <CTabPanel value={tabvalue} index={0}>
          <ChannelListTab />
        </CTabPanel>
      </div>
    </Layout>
  );
});
export default Channels;

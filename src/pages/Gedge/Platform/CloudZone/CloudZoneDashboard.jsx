import React, { useState, useEffect, useLayoutEffect } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import { CReflexBox } from "@/layout/Common/CReflexBox";
import { CTabPanel } from "@/components/tabs";
import { useHistory } from "react-router";
import { observer } from "mobx-react";
import CloudClusterInfo from "@/pages/Dashboard/DashboardCont/CloudClusterInfo";
import CloudZoneSummary from "./CloudZoneSummary";
import CloudZoneSlider from "./CloudZoneSlider";
import styled from "styled-components";
import NodeList from "@/pages/Dashboard/DashboardCont/NodeList";
import { dashboardStore } from "@/store";

const CloudZoneWrap = styled.div`
  .panel_summary {
    width: 100%;
    padding: 20px;
    background: #202842;
    border: 0;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    &::before {
      display: none;
    }
  }
`;

const CloudZoneDashboard = observer(() => {
  const [tabvalue, setTabvalue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTabvalue(newValue);
  };

  const { loadCloudZoneDashboard, loadCloudZoneDetailDashboard } =
    dashboardStore;
  const history = useHistory();

  useLayoutEffect(() => {
    loadCloudZoneDashboard();
  }, []);

  return (
    <>
      <CloudZoneWrap>
        <PanelBox className="panel_summary">
          <div className="tabPanelContainer">
            <CTabPanel value={tabvalue} index={1}></CTabPanel>
          </div>
          <div className="ClusterInfoWrap">
            <CloudClusterInfo />
          </div>
          <div className="ClusterSliderWrap">
            <CloudZoneSlider />
          </div>

          <div className="SummaryWrap">
            <CloudZoneSummary />
          </div>
        </PanelBox>
        <div className="panel_summary">
          <CReflexBox>
            <NodeList />
          </CReflexBox>
        </div>
      </CloudZoneWrap>
    </>
  );
});

export default CloudZoneDashboard;

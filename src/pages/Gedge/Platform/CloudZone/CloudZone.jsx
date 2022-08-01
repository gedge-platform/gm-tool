import React, { useState, useEffect, useLayoutEffect } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import CommActionBar from "@/components/common/CommActionBar";
import { AgGrid } from "@/components/datagrids";
import { agDateColumnFilter, dateFormatter } from "@/utils/common-utils";
import { CReflexBox } from "@/layout/Common/CReflexBox";
import { CCreateButton } from "@/components/buttons";
import { CIconButton } from "@/components/buttons"
import { CTabPanel } from "@/components/tabs";
import { useHistory } from "react-router";
import { observer } from "mobx-react";
import Detail from "../Detail";
import clusterStore from "../../../../store/Cluster";
import CreateCluster from "../Dialog/CreateCluster";
import Terminal from "../Dialog/Terminal";
import Layout from "@/layout";
import { Title } from "@/pages";
import ClusterInfo from "@/pages/Dashboard/DashboardCont/ClusterInfo";
import MapContent from "@/pages/Dashboard/DashboardCont/MapContent";
import CloudZoneSummary from "./CloudZoneSummary"
import CloudZoneSlider from "./CloudZoneSlider"
import styled from "styled-components";

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
      display: none;;
    }
  }
`

const CloudZone = observer(() => {
  const currentPageTitle = Title.CloudZone;
  const [open, setOpen] = useState(false);
  const [tabvalue, setTabvalue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTabvalue(newValue);
  };
  const [openTerminal, setOpenTerminal] = useState(false);
  const {
    clusterDetail,
    clusterList,
    loadClusterList,
    loadCluster,
    currentPage,
    totalPages,
    viewList,
    goPrevPage,
    goNextPage,
    totalElements,
  } = clusterStore;


  const [columDefs] = useState([
    {
      headerName: "이름",
      field: "clusterName",
      filter: true,
    },
    {
      headerName: "타입",
      field: "clusterType",
      filter: true,
    },
    {
      headerName: "생성자",
      field: "clusterCreator",
      filter: true,
    },
    {
      headerName: "노드개수",
      field: "nodeCnt",
      filter: true,
    },
    {
      headerName: "IP",
      field: "clusterEndpoint",
      filter: true,
    },
    {
      headerName: "생성날짜",
      field: "created_at",
      filter: "agDateColumnFilter",
      filterParams: agDateColumnFilter(),
      minWidth: 150,
      maxWidth: 200,
      cellRenderer: function (data) {
        return `<span>${dateFormatter(data.value)}</span>`;
      },
    },
    {
      headerName: "",
      field: "terminal",
      minWidth: 100,
      maxWidth: 100,
      cellRenderer: function () {
        // return `<span class="state_ico_new terminal" onClick></span> `;
        return `<button class="tb_volume_yaml" onClick>Terminal</button>`
      },
      cellStyle: { textAlign: "center" },
    },
  ]);

  const history = useHistory();

  const handleClick = (e) => {
    let fieldName = e.colDef.field;
    loadCluster(e.data.clusterName);
    if (fieldName === "terminal") {
      handleOpenTerminal();
    }
  };

  const handleOpen = (e) => {
    setOpen(true);

  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleOpenTerminal = () => {
    setOpenTerminal(true);
  };

  const handleCloseTerminal = () => {
    setOpenTerminal(false);
  };


  useLayoutEffect(() => {
    loadClusterList("core");
  }, []);

  return (
    <Layout currentPageTitle={currentPageTitle}>
      <CloudZoneWrap>
        <PanelBox className="panel_summary">
          <div className="ClusterInfoWrap">
            <ClusterInfo />
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
              <Detail cluster={clusterDetail} />
          </CReflexBox>
        </div>
      </CloudZoneWrap>
    </Layout>
  );
});

export default CloudZone;

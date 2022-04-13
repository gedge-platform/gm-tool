import React, { useState, useEffect } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import CommActionBar from "@/components/common/CommActionBar";
import { AgGrid } from "@/components/datagrids";
import { agDateColumnFilter } from "@/utils/common-utils";
import { CReflexBox } from "@/layout/Common/CReflexBox";
import { CCreateButton } from "@/components/buttons";
import { CTabPanel } from "@/components/tabs";
import { useHistory } from "react-router";
import { observer } from "mobx-react";
import moment from "moment";
import Detail from "../Detail";
import clusterStore from "../../../../store/Cluster";
import CreateCluster from "../Dialog/CreateCluster";

const EdgeClusterListTab = observer(() => {
  const [open, setOpen] = useState(false);
  const [tabvalue, setTabvalue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTabvalue(newValue);
  };

  const {
    clusterDetail,
    clusterList,
    totalElements,
    loadClusterList,
    loadCluster,
  } = clusterStore;

  const [columDefs] = useState([
    // {
    //     headerName: "",
    //     field: "check",
    //     minWidth: 53,
    //     maxWidth: 53,
    //     filter: false,
    //     headerCheckboxSelection: true,
    //     headerCheckboxSelectionFilteredOnly: true,
    //     checkboxSelection: true,
    // },
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
        return `<span>${moment(new Date(data.value))
          // .subtract(9, "h")
          .format("YYYY-MM-DD HH:mm")}</span>`;
      },
    },
  ]);

  const history = useHistory();

  const handleClick = (e) => {
    loadCluster(e.data.clusterName);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    loadClusterList("edge");
  }, []);

  return (
    <>
      <CReflexBox>
        <PanelBox>
          <CommActionBar isSearch={true} isSelect={true} keywordList={["이름"]}>
            <CCreateButton onClick={handleOpen}>생성</CCreateButton>
          </CommActionBar>

          <div className="tabPanelContainer">
            <CTabPanel value={tabvalue} index={0}>
              <div className="grid-height2">
                <AgGrid
                  rowData={clusterList}
                  columnDefs={columDefs}
                  isBottom={true}
                  totalElements={totalElements}
                  onCellClicked={handleClick}
                />
              </div>
            </CTabPanel>
          </div>
          <CreateCluster type={"edge"} open={open} onClose={handleClose} />
        </PanelBox>
        <Detail cluster={clusterDetail} />
      </CReflexBox>
    </>
  );
});
export default EdgeClusterListTab;

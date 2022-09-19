import React, { useState, useLayoutEffect } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import CommActionBar from "@/components/common/CommActionBar";
import { AgGrid } from "@/components/datagrids";
import { agDateColumnFilter, dateFormatter } from "@/utils/common-utils";
import { CReflexBox } from "@/layout/Common/CReflexBox";
import { CCreateButton } from "@/components/buttons";
import { observer } from "mobx-react";
import Detail from "../Detail";
import clusterStore from "../../../../store/Cluster";
import CreateCluster from "../Dialog/CreateCluster";
import { drawStatus } from "../../../../components/datagrids/AggridFormatter";

const CloudClusterListTab = observer(() => {
  const [open, setOpen] = useState(false);

  const {
    clusterDetail,
    clusterList,
    totalElements,
    loadClusterList,
    loadCluster,

    currentPage,
    totalPages,
    viewList,
    goPrevPage,
    goNextPage,
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
      headerName: "상태",
      field: "status",
      filter: true,
      cellRenderer: ({ value }) => {
        return drawStatus(value);
      },
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
  ]);

  const handleClick = e => {
    loadCluster(e.data.clusterName);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useLayoutEffect(() => {
    loadClusterList("cloud");
  }, []);

  return (
    <>
      <CReflexBox>
        <PanelBox>
          <CommActionBar>
            <CCreateButton onClick={handleOpen}>생성</CCreateButton>
          </CommActionBar>

          <div className="tabPanelContainer">
            <div className="grid-height2">
              <AgGrid
                rowData={viewList}
                columnDefs={columDefs}
                isBottom={false}
                totalElements={totalElements}
                onCellClicked={handleClick}
                totalPages={totalPages}
                currentPage={currentPage}
                goNextPage={goNextPage}
                goPrevPage={goPrevPage}
              />
            </div>
            {/* </CTabPanel> */}
          </div>
          <CreateCluster type="cloud" open={open} onClose={handleClose} />
        </PanelBox>
        <Detail cluster={clusterDetail} />
      </CReflexBox>
    </>
  );
});
export default CloudClusterListTab;

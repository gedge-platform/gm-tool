import React, { useState, useLayoutEffect } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import CommActionBar from "@/components/common/CommActionBar";
import { AgGrid } from "@/components/datagrids";
import { agDateColumnFilter, dateFormatter } from "@/utils/common-utils";
import { CReflexBox } from "@/layout/Common/CReflexBox";
import { CCreateButton } from "@/components/buttons";
import { CDeleteButton } from "@/components/buttons/CDeleteButton";
import { observer } from "mobx-react";
import Detail from "../Detail";
import clusterStore from "../../../../store/Cluster";
import CreateCluster from "../Dialog/CreateCluster";
import { drawStatus } from "../../../../components/datagrids/AggridFormatter";
import { swalUpdate, swalError } from "../../../../utils/swal-utils";

const CloudClusterListTab = observer(() => {
  const [Create, setCreateOpen] = useState(false);
  const [Delete, setDeleteOpen] = useState(false);
  const [reRun, setReRun] = useState(false);
  const [clusterName, setClusterName] = useState("");

  const {
    deleteCluster,
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
    setClusterName(e.data.clusterName);
  };

  const handleCreateOpen = () => {
    setCreateOpen(true);
  };

  const handleCreateClose = () => {
    setCreateOpen(false);
  };

  const handleDelete = () => {
    if (clusterName === "") {
      swalError("클러스터를 선택해주세요!");
    }
    if (clusterName != "") {
      swalUpdate(clusterName + "를 삭제하시겠습니까?", () => deleteCluster(clusterName, reloadData));
    }
  };

  const reloadData = () => {
    setReRun(true);
  };

  useLayoutEffect(() => {
    loadClusterList("cloud");
    return () => {
      setReRun(false);
    };
  }, [reRun]);

  return (
    <>
      <CReflexBox>
        <PanelBox>
          <CommActionBar>
            <CCreateButton onClick={handleCreateOpen}>생성</CCreateButton>
            <CDeleteButton onClick={handleDelete}>삭제</CDeleteButton>
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
          <CreateCluster type="cloud" open={Create} onClose={handleCreateClose} reloadFunc={reloadData} />
        </PanelBox>
        <Detail cluster={clusterDetail} />
      </CReflexBox>
    </>
  );
});
export default CloudClusterListTab;

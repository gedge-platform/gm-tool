import React, { useState, useEffect } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import CommActionBar from "@/components/common/CommActionBar";
import { CCreateButton, CDeleteButton } from "@/components/buttons";
import { AgGrid } from "@/components/datagrids";
import { agDateColumnFilter, dateFormatter } from "@/utils/common-utils";
import { CReflexBox } from "@/layout/Common/CReflexBox";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import { useHistory } from "react-router";
import { observer } from "mobx-react";
import { drawStatus } from "@/components/datagrids/AggridFormatter";
import gsLinkStatusStore from "../../../../../store/GsLink";

const GsLinkListTab = observer(() => {
  const handleTabChange = (event, newValue) => {
    setTabvalue(newValue);
  };

  const {
    gsLinkList,
    loadGsLinkList,
    totalElements,
    currentPage,
    totalPages,
    viewList,
    initViewList,
    goPrevPage,
    goNextPage,
  } = gsLinkStatusStore;

  const [columDefs] = useState([
    {
      headerName: "리퀘스트 아이디",
      field: "request_id",
      filter: true,
    },
    {
      headerName: "소스 클러스터",
      field: "source_cluster",
      filter: true,
      cellRenderer: function (data) {
        return `<span>${data.data.parameters.source_cluster}</span>`;
      },
    },
    {
      headerName: "타겟 클러스터",
      field: "target_cluster",
      filter: true,
      cellRenderer: function (data) {
        return `<span>${data.data.parameters.target_cluster}</span>`;
      },
    },
    {
      headerName: "파드 이름",
      field: "job_pod_name",
      filter: true,
    },
    {
      headerName: "상태",
      field: "status",
      filter: true,
      cellRenderer: function ({ data }) {
        return `${
          data.status ? `<span>${drawStatus(data.status)}</span>` : "-"
        }`;
      },
    },
    {
      headerName: "실패 회수",
      field: "fail_count",
      filter: true,
    },
    {
      headerName: "리퀘스트 시간",
      field: "request_time",
      filter: "agDateColumnFilter",
      filterParams: agDateColumnFilter(),
      minWidth: 150,
      maxWidth: 200,
      cellRenderer: function (data) {
        return `<span>${dateFormatter(data.value)}</span>`;
      },
    },
    {
      headerName: "스케줄 시간",
      field: "scheduled_time",
      filter: "agDateColumnFilter",
      filterParams: agDateColumnFilter(),
      minWidth: 150,
      maxWidth: 200,
      cellRenderer: function (data) {
        return `<span>${dateFormatter(data.value)}</span>`;
      },
    },
    {
      headerName: "완료 시간",
      field: "finished_time",
      filter: "agDateColumnFilter",
      filterParams: agDateColumnFilter(),
      minWidth: 150,
      maxWidth: 200,
      cellRenderer: function (data) {
        return `${
          data.value ? `<span>${dateFormatter(data.value)}</span>` : "-"
        }`;
      },
    },
  ]);

  const history = useHistory();

  useEffect(() => {
    loadGsLinkList();
    return () => {
      initViewList();
    };
  }, []);

  return (
    <>
      <CReflexBox>
        <PanelBox>
          <CommActionBar reloadFunc={loadGsLinkList} />
          <CCreateButton onClick={handleOpen}>생성</CCreateButton>

          <div className="tabPanelContainer">
            <div className="grid-height2">
              <AgGrid
                rowData={gsLinkList}
                columnDefs={columDefs}
                totalElements={totalElements}
                isBottom={false}
                totalPages={totalPages}
                currentPage={currentPage}
                goNextPage={goNextPage}
                goPrevPage={goPrevPage}
              />
            </div>
          </div>
        </PanelBox>
      </CReflexBox>
    </>
  );
});

export default GsLinkListTab;

import React, { useState, useEffect } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import CommActionBar from "@/components/common/CommActionBar";
import { AgGrid } from "@/components/datagrids";
import { agDateColumnFilter } from "@/utils/common-utils";
import { CReflexBox } from "@/layout/Common/CReflexBox";
import { CCreateButton, CSelectButton } from "@/components/buttons";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import { useHistory } from "react-router";
import { observer } from "mobx-react";
import Detail from "../PodDetail";
import podStore from "../../../../store/Pod";
import moment from "moment";
import CreatePod from "../Dialog/CreatePod";
import { drawStatus } from "../../../../components/datagrids/AggridFormatter";

const PodListTab = observer(() => {
  const [open, setOpen] = useState(false);
  const [tabvalue, setTabvalue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTabvalue(newValue);
  };

  const { podList, podDetail, totalElements, loadPodList, loadPodDetail } =
    podStore;

  const [columDefs] = useState([
    {
      headerName: "파드 이름",
      field: "name",
      filter: true,
    },
    {
      headerName: "클러스터",
      field: "cluster",
      filter: true,
    },
    {
      headerName: "프로젝트",
      field: "project",
      filter: true,
    },
    {
      headerName: "워크스페이스",
      field: "workspace",
      filter: true,
    },
    {
      headerName: "호스트 IP",
      field: "hostIP",
      filter: true,
    },
    {
      headerName: "파드 IP",
      field: "podIP",
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
      headerName: "생성 날짜",
      field: "creationTimestamp",
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

  const handleCreateOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (e) => {
    const fieldName = e.colDef.field;
    loadPodDetail(e.data.name, e.data.cluster, e.data.project);
  };

  const history = useHistory();

  useEffect(() => {
    loadPodList();
  }, []);

  return (
    <>
      <CReflexBox>
        <PanelBox>
          <CommActionBar isSearch={true} isSelect={true} keywordList={["이름"]}>
            <CCreateButton onClick={handleCreateOpen}>생성</CCreateButton>
          </CommActionBar>

          <div className="tabPanelContainer">
            <CTabPanel value={tabvalue} index={0}>
              <div className="grid-height2">
                <AgGrid
                  onCellClicked={handleClick}
                  rowData={podList}
                  columnDefs={columDefs}
                  isBottom={true}
                  totalElements={totalElements}
                />
              </div>
            </CTabPanel>
          </div>
          <CreatePod
            open={open}
            onClose={handleClose}
            reloadFunc={loadPodList}
          />
        </PanelBox>
        <Detail pod={podDetail} />
      </CReflexBox>
    </>
  );
});
export default PodListTab;

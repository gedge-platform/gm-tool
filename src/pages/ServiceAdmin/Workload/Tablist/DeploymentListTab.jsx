import React, { useState, useEffect } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import CommActionBar from "@/components/common/CommActionBar";
import { AgGrid } from "@/components/datagrids";
import { CReflexBox } from "@/layout/Common/CReflexBox";
import { CCreateButton, CSelectButton } from "@/components/buttons";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import { useHistory } from "react-router";
import { observer } from "mobx-react";
import Detail from "../Detail";
import deploymentStore from "../../../../store/Deployment";
import moment from "moment";
import CreateDeployment from "../Dialog/CreateDeployment";
import { agDateColumnFilter } from "@/utils/common-utils";
import { drawStatus } from "@/components/datagrids/AggridFormatter";

const DeploymentListTab = observer(() => {
  const [open, setOpen] = useState(false);
  const [tabvalue, setTabvalue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTabvalue(newValue);
  };

  const {
    deploymentList,
    deploymentDetail,
    totalElements,
    loadDeploymentList,
  } = deploymentStore;

  const [columDefs] = useState([
    {
      headerName: "디플로이먼트 이름",
      field: "name",
      filter: true,
    },
    {
      headerName: "상태",
      field: "status",
      filter: true,
      cellRenderer: function ({ value }) {
        return drawStatus(value.toLowerCase());
      },
    },
    {
      headerName: "프로젝트명",
      field: "project",
      filter: true,
    },
    {
      headerName: "생성일",
      field: "createAt",
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

  useEffect(() => {
    loadDeploymentList();
  }, []);
  const handleCreateOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
                  rowData={deploymentList}
                  columnDefs={columDefs}
                  isBottom={true}
                  totalElements={totalElements}
                />
              </div>
            </CTabPanel>
          </div>
          <CreateDeployment
            open={open}
            onClose={handleClose}
            reloadFunc={loadDeploymentList}
          />
        </PanelBox>
        <Detail deployment={deploymentDetail} />
      </CReflexBox>
    </>
  );
});
export default DeploymentListTab;

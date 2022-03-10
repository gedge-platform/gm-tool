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
import moment from "moment";
import axios from "axios";
import { BASIC_AUTH, SERVER_URL } from "../../../../config";
import workspacesStore from "../../../../store/WorkSpace";

const APIListTab = observer(() => {
  const [tabvalue, setTabvalue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTabvalue(newValue);
  };

  const { WorkSpaceDetail, workSpaceList, loadWorkSpaceList } = workspacesStore;

  const [columDefs] = useState([
    {
      headerName: "",
      field: "check",
      minWidth: 53,
      maxWidth: 53,
      filter: false,
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
    },
    {
      headerName: "이름",
      field: "workspaceName",
      filter: true,
    },
    {
      headerName: "설명",
      field: "workspaceDescription",
      filter: true,
    },
    {
      headerName: "클러스터",
      field: "selectCluster",
      filter: true,
    },
    {
      headerName: "OWNER",
      field: "workspaceOwner",
      filter: true,
    },
    {
      headerName: "CREATOR",
      field: "workspaceCreator",
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

  useEffect(() => {
    loadWorkSpaceList();
  }, []);

  return (
    <>
      <CReflexBox>
        <PanelBox>
          <CommActionBar isSearch={true} isSelect={true} keywordList={["이름"]}>
            <CCreateButton>생성</CCreateButton>
            {/* <CSelectButton items={[]}>{"All Cluster"}</CSelectButton> */}
          </CommActionBar>

          <div className="tabPanelContainer">
            <CTabPanel value={tabvalue} index={0}>
              <div className="grid-height2">
                <AgGrid
                  rowData={workSpaceList}
                  columnDefs={columDefs}
                  isBottom={true}
                />
              </div>
            </CTabPanel>
          </div>
        </PanelBox>
      </CReflexBox>
    </>
  );
});
export default APIListTab;

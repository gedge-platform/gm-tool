import React, { useState, useEffect } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import CommActionBar from "@/components/common/CommActionBar";
import { AgGrid } from "@/components/datagrids";
import { agDateColumnFilter, dateFormatter } from "@/utils/common-utils";
import { CReflexBox } from "@/layout/Common/CReflexBox";
import { CCreateButton, CSelectButton } from "@/components/buttons";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import { useHistory } from "react-router";
import { observer } from "mobx-react";

import workspacesStore from "../../../../store/WorkSpace";

const APIListTab = observer(() => {
  const [tabvalue, setTabvalue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTabvalue(newValue);
  };

  const { workSpaceList, loadWorkSpaceList, totalElements } = workspacesStore;

  const [columDefs] = useState([
    {
      headerName: "이름",
      field: "workspaceName",
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
        return `<span>${dateFormatter(data.value)}</span>`;
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
                  totalElements={totalElements}
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

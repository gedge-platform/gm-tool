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
import serviceAccountStore from "../../../../store/ServiceAccount";
import ServiceAccountsDetail from "../ServiceAccountsDetail";

const ServiceAccountListTab = observer(() => {
  const [tabvalue, setTabvalue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTabvalue(newValue);
  };

  const {
    serviceAccountList,
    serviceAccountDetail,
    totalElements,
    loadServiceAccountList,
    loadServiceAccountTabList,
  } = serviceAccountStore;

  const [columDefs] = useState([
    {
      headerName: "이름",
      field: "name",
      filter: true,
    },
    {
      headerName: "프로젝트",
      field: "namespace",
      filter: true,
    },
    {
      headerName: "클러스터",
      field: "cluster",
      filter: true,
    },
    {
      headerName: "시크릿",
      field: "name", // data[{ secrets: [{name}] }]
      filter: true,
    },
    {
      headerName: "생성날짜",
      field: "createAt",
      filter: "agDateColumnFilter",
      filterParams: agDateColumnFilter(),
      minWidth: 150,
      maxWidth: 200,
      cellRenderer: function (data) {
        return `<span>${dateFormatter(data.value)}</span>`;
      },
    },
  ]);

  const handleClick = (e) => {
    const fieldName = e.colDef.field;
    loadServiceAccountTabList(e.data.name, e.data.cluster, e.data.namespace);
  };

  const history = useHistory();

  useEffect(() => {
    loadServiceAccountList();
  }, []);

  return (
    <>
      <CReflexBox>
        <PanelBox>
          <CommActionBar isSearch={true} isSelect={true} keywordList={["이름"]}>
            <CCreateButton>생성</CCreateButton>
          </CommActionBar>

          <div className="tabPanelContainer">
            <CTabPanel value={tabvalue} index={0}>
              <div className="grid-height2">
                <AgGrid
                  onCellClicked={handleClick}
                  rowData={serviceAccountList}
                  columnDefs={columDefs}
                  isBottom={true}
                  totalElements={totalElements}
                />
              </div>
            </CTabPanel>
          </div>
        </PanelBox>
        <ServiceAccountsDetail serviceAccount={serviceAccountDetail} />
      </CReflexBox>
    </>
  );
});
export default ServiceAccountListTab;

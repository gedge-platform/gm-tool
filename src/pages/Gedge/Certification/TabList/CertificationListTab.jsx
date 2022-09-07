import React, { useState, useEffect, useLayoutEffect } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import CommActionBar from "@/components/common/CommActionBar";
import { AgGrid } from "@/components/datagrids";
import { agDateColumnFilter, dateFormatter } from "@/utils/common-utils";
import Layout from "@/layout";
import { CReflexBox } from "@/layout/Common/CReflexBox";
import { CCreateButton } from "@/components/buttons";
import { CIconButton } from "@/components/buttons";
import { CTabPanel } from "@/components/tabs";
import { useHistory } from "react-router";
import { observer } from "mobx-react";
import { Title } from "@/pages";
import certificationStore from "../../../../store/Certification";
import Terminal from "../Dialog/Terminal";
import CreateCluster from "../Dialog/CreateOPENSTACK";
import CreateCertification from "../Dialog/CreateCertification";
import SelectProvider from "../Dialog/SelectProvider";

const CertificationListTab = observer(() => {
  const currentPageTitle = Title.Certification;
  const [open, setOpen] = useState(false);
  const [tabvalue, setTabvalue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTabvalue(newValue);
  };
  const [openTerminal, setOpenTerminal] = useState(false);
  const {
    loadCredentialList,
    credential,
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
  } = certificationStore;

  const [columDefs] = useState([
    {
      headerName: "이름",
      field: "name",
      filter: true,
    },
    {
      headerName: "타입",
      field: "type",
      filter: true,
    },
    {
      headerName: "도메인",
      field: "domain",
      filter: true,
    },
    {
      headerName: "테넌트 ID",
      field: "project",
      filter: true,
    },
    {
      headerName: "URL",
      field: "endpoint",
      filter: true,
    },
    {
      headerName: "username",
      field: "username",
      filter: true,
    },
    {
      headerName: "password",
      field: "password",
      filter: true,
    },
    {
      headerName: "access_id",
      field: "access_id",
      filter: true,
    },
    {
      headerName: "access_token",
      field: "access_token",
      filter: true,
    },
    {
      headerName: "Zone",
      field: "zone",
      filter: true,
    },
    {
      headerName: "생성날짜",
      field: "created_at",
      filter: true,
    },
  ]);

  const history = useHistory();

  const handleClick = e => {
    let fieldName = e.colDef.field;
    loadCluster(e.data.clusterName);
    if (fieldName === "terminal") {
      handleOpenTerminal();
    }
  };

  const handleOpen = e => {
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
    // loadClusterList("core");
    loadCredentialList();
  }, []);

  return (
    // con/so/le.log(CredentialName),
    <CReflexBox>
      <PanelBox>
        <CommActionBar
        // reloadFunc={() => loadClusterList("core")}
        // isSearch={true}
        // isSelect={true}
        // keywordList={["이름"]}
        >
          <CCreateButton onClick={handleOpen}>생성</CCreateButton>
          {/* <CSelectButton items={[]}>{"All Cluster"}</CSelectButton> */}
        </CommActionBar>

        <div className="tabPanelContainer">
          {/* <CTabPanel value={tabvalue} index={0}> */}
          <div className="grid-height2">
            <AgGrid
              rowData={viewList}
              columnDefs={columDefs}
              isBottom={false}
              onCellClicked={handleClick}
              totalElements={totalElements}
              totalPages={totalPages}
              currentPage={currentPage}
              goNextPage={goNextPage}
              goPrevPage={goPrevPage}
            />
          </div>
          {/* </CTabPanel> */}
        </div>
        {/* <Terminal
          open={openTerminal}
          // yaml={getYamlFile}
          onClose={handleCloseTerminal}
        /> */}
        <CreateCertification open={open} onClose={handleClose} reloadFunc={loadCredentialList} />
      </PanelBox>
    </CReflexBox>
  );
});
export default CertificationListTab;

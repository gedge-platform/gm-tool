import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { PanelBox } from "@/components/styles/PanelBox";
import CommActionBar from "@/components/common/CommActionBar";
import { AgGrid } from "@/components/datagrids";
import { CReflexBox } from "@/layout/Common/CReflexBox";
import { CCreateButton, CDeleteButton } from "@/components/buttons";
import CreatePackage from "../Dialog/CreatePackage";
import FaasStore from "../../../../../store/Faas";

const PackageListTab = observer(() => {
  const [reRun, setReRun] = useState(false);
  const [open, setOpen] = useState(false);

  const {
    loadPackageListAPI,
    packageList,
    totalElements,
    totalPages,
    currentPage,
    goNextPage,
    goPrevPage,
  } = FaasStore;

  useEffect(() => {
    loadPackageListAPI();
  }, []);

  const [columDefs] = useState([
    {
      headerName: "이름",
      field: "fission_meta.name",
      filter: true,
    },
    {
      headerName: "네임스페이스",
      field: "fission_meta.namespace",
      filter: true,
    },
    {
      headerName: "Env",
      field: "env_name",
      filter: true,
    },

    // {
    //   headerName: "상태",
    //   field: "ready",
    //   filter: true,
    //   cellRenderer: function ({ value }) {
    //     return drawStatus(value.toLowerCase());
    //   },
    // },
    {
      headerName: "생성일",
      field: "fission_meta.creationTimestamp",
      filter: "agDateColumnFilter",
      // filterParams: agDateColumnFilter(),
      minWidth: 150,
      maxWidth: 200,
      // cellRenderer: function (data) {
      //   return `<span>${dateFormatter(data.value)}</span>`;
      // },
    },
  ]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const reloadData = () => {
    setReRun(true);
  };

  useEffect(() => {}, [reRun]);

  return (
    <CReflexBox>
      <PanelBox>
        <CommActionBar reloadFunc={reloadData}>
          <CCreateButton onClick={handleOpen}>생성</CCreateButton>
          &nbsp;&nbsp;
          <CDeleteButton>삭제</CDeleteButton>
        </CommActionBar>
        <div className="tabPanelContainer">
          <div className="grid-height2">
            <AgGrid
              rowData={packageList}
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
        <CreatePackage
          open={open}
          onClose={handleClose}
          reloadFunc={reloadData}
        />
      </PanelBox>
    </CReflexBox>
  );
});
export default PackageListTab;

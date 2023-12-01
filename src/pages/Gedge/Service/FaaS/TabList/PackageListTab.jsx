import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { PanelBox } from "@/components/styles/PanelBox";
import CommActionBar from "@/components/common/CommActionBar";
import { AgGrid } from "@/components/datagrids";
import { CReflexBox } from "@/layout/Common/CReflexBox";
import { CCreateButton, CDeleteButton } from "@/components/buttons";
import CreatePackage from "../Dialog/CreatePackage";

const PackageListTab = observer(() => {
  const [reRun, setReRun] = useState(false);
  const [open, setOpen] = useState(false);

  const [columDefs] = useState([
    {
      headerName: "이름",
      field: "name",
      filter: true,
    },
    {
      headerName: "ID",
      field: "uid",
      filter: true,
    },
    {
      headerName: "크기",
      field: "poolsize",
      filter: true,
    },
    {
      headerName: "네임스페이스",
      field: "namespace",
      filter: true,
      cellRenderer: function (data) {
        return `<span>${data.value ? data.value : "-"}</span>`;
      },
    },
    {
      headerName: "상태",
      field: "ready",
      filter: true,
      // cellRenderer: function ({ value }) {
      //   return drawStatus(value.toLowerCase());
      // },
    },
    // {
    //   headerName: "생성일",
    //   field: "createAt",
    //   filter: "agDateColumnFilter",
    //   filterParams: agDateColumnFilter(),
    //   minWidth: 150,
    //   maxWidth: 200,
    //   cellRenderer: function (data) {
    //     return `<span>${dateFormatter(data.value)}</span>`;
    //   },
    // },
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
              rowData={[]}
              columnDefs={columDefs}
              totalElements={0}
              isBottom={false}
              totalPages={1}
              currentPage={1}
              goNextPage={2}
              goPrevPage={0}
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

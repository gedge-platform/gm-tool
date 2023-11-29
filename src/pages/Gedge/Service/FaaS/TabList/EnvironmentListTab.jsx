import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { PanelBox } from "@/components/styles/PanelBox";
import CommActionBar from "@/components/common/CommActionBar";
import { AgGrid } from "@/components/datagrids";
import { CReflexBox } from "@/layout/Common/CReflexBox";
import { CCreateButton, CDeleteButton } from "@/components/buttons";
import CreateEnvironment from "../Dialog/CreateEnvironment";

const EnvironmentListTab = observer(() => {
  const [reRun, setReRun] = useState(false);
  const [open, setOpen] = useState(false);

  const [columDefs] = useState([
    {
      headerName: "이름",
      field: "name",
      filter: true,
    },
    {
      headerName: "워크스페이스",
      field: "workspace",
      filter: true,
      cellRenderer: function (data) {
        return `<span>${data.value ? data.value : "-"}</span>`;
      },
    },
    {
      headerName: "이미지",
      field: "image",
      filter: true,
    },
    {
      headerName: "풀 사이즈  ",
      field: "poolsize",
      filter: true,
    },
    {
      headerName: "생성일",
      field: "create_at",
      // filter: "agDateColumnFilter",
      // filterParams: agDateColumnFilter(),
      // minWidth: 150,
      // maxWidth: 200,
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
        <CreateEnvironment
          open={open}
          onClose={handleClose}
          reloadFunc={reloadData}
        />
      </PanelBox>
    </CReflexBox>
  );
});
export default EnvironmentListTab;

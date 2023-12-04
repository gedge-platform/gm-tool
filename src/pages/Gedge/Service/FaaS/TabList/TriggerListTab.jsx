import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { PanelBox } from "@/components/styles/PanelBox";
import CommActionBar from "@/components/common/CommActionBar";
import { AgGrid } from "@/components/datagrids";
import { CReflexBox } from "@/layout/Common/CReflexBox";
import { CCreateButton, CDeleteButton } from "@/components/buttons";
import CreateTrigger from "../Dialog/CreateTrigger";
import FaasStore from "../../../../../store/Faas";

const TriggerListTab = observer(() => {
  const [reRun, setReRun] = useState(false);
  const [open, setOpen] = useState(false);

  const {
    loadTriggerListAPI,
    triggerList,
    totalElements,
    totalPages,
    currentPage,
    goNextPage,
    goPrevPage,
  } = FaasStore;

  useEffect(() => {
    loadTriggerListAPI();
  }, []);
  console.log("triggerList: ", triggerList);

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
      headerName: "Function",
      field: "function",
      filter: true,
    },
    {
      headerName: "Method",
      field: "method",
      filter: true,
    },
    {
      headerName: "RelativeUrl",
      field: "url",
      filter: true,
    },
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
              rowData={triggerList}
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
        <CreateTrigger
          open={open}
          onClose={handleClose}
          reloadFunc={reloadData}
        />
      </PanelBox>
    </CReflexBox>
  );
});
export default TriggerListTab;

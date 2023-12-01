import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { PanelBox } from "@/components/styles/PanelBox";
import CommActionBar from "@/components/common/CommActionBar";
import { AgGrid } from "@/components/datagrids";
import { CReflexBox } from "@/layout/Common/CReflexBox";
import { CCreateButton, CDeleteButton } from "@/components/buttons";
import CreateFunction from "../Dialog/CreateFunction";
import FaasStore from "../../../../../store/Faas";
import { agDateColumnFilter, dateFormatter } from "@/utils/common-utils";

const FunctionListTab = observer(() => {
  // const [reRun, setReRun] = useState(false);
  const [open, setOpen] = useState(false);
  const { loadFuncionsListAPI, functionsList } = FaasStore;

  const [columDefs] = useState([
    {
      headerName: "이름",
      field: "func_name",
      filter: true,
    },
    {
      headerName: "네임스페이스",
      field: "namespace",
      filter: true,
      cellRenderer: function ({ data: { fission_meta } }) {
        return `<span>${fission_meta.namespace}</span>`;
      },
    },
    {
      headerName: "Env",
      field: "env_name",
      filter: true,
    },

    {
      headerName: "Concurrency",
      field: "concurrency",
      filter: true,
      cellRenderer: function ({ data: { fission_spec } }) {
        return `<span>${fission_spec.concurrency}</span>`;
      },
    },
    {
      headerName: "생성일",
      field: "create_at",
      filter: "agDateColumnFilter",
      filterParams: agDateColumnFilter(),
      minWidth: 150,
      maxWidth: 200,
      cellRenderer: function ({ data: { fission_meta } }) {
        return `<span>${dateFormatter(fission_meta.creationTimestamp)}</span>`;
      },
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

  // useEffect(() => {}, [reRun]);
  useEffect(() => {
    loadFuncionsListAPI();
  }, []);

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
              rowData={functionsList}
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
        <CreateFunction
          open={open}
          onClose={handleClose}
          reloadFunc={reloadData}
        />
      </PanelBox>
    </CReflexBox>
  );
});
export default FunctionListTab;

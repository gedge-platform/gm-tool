import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { PanelBox } from "@/components/styles/PanelBox";
import CommActionBar from "@/components/common/CommActionBar";
import { AgGrid } from "@/components/datagrids";
import { CReflexBox } from "@/layout/Common/CReflexBox";
import { CCreateButton, CDeleteButton } from "@/components/buttons";
import CreateEnvironment from "../Dialog/CreateEnvironment";
import FaasStore from "../../../../../store/Faas";
import { agDateColumnFilter, dateFormatter } from "@/utils/common-utils";

const EnvironmentListTab = observer(() => {
  // const [reRun, setReRun] = useState(false);
  const [open, setOpen] = useState(false);
  const { loadEnvListAPI, envList } = FaasStore;

  const [columDefs] = useState([
    {
      headerName: "이름",
      field: "env_name",
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
      headerName: "이미지",
      field: "image",
      filter: true,
    },
    {
      headerName: "풀 사이즈  ",
      field: "poolsize",
      filter: true,
      cellRenderer: function ({ data: { fission_spec } }) {
        return `<span>${fission_spec.poolsize}</span>`;
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
    loadEnvListAPI();
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
              rowData={envList}
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

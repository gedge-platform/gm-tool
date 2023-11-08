import React, { useState, useEffect } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import CommActionBar from "@/components/common/CommActionBar";
import { AgGrid } from "@/components/datagrids";
import { agDateColumnFilter, dateFormatter } from "@/utils/common-utils";
import { CReflexBox } from "@/layout/Common/CReflexBox";
import { CCreateButton } from "@/components/buttons";
import { CTabPanel } from "@/components/tabs";
import { useHistory } from "react-router";
import { observer } from "mobx-react";
import { Title } from "@/pages";
import { StorageClassStore } from "@/store";
import StorageClassAdminDetail from "../Detail/StorageClassAdminDetail";
import ViewDialog from "../../../Infra/Storage/Dialog/ViewYaml";

const StorageClassAdminTab = observer(() => {
  const currentPageTitle = Title.Storage;
  const [tabvalue, setTabvalue] = useState(0);
  const [open, setOpen] = useState(false);
  const [openYaml, setOpenYaml] = useState(false);
  const handleTabChange = (event, newValue) => {
    setTabvalue(newValue);
  };

  const {
    loadAdminStorageClasses,
    totalElements,
    currentPage,
    totalPages,
    goPrevPage,
    goNextPage,
    loadStorageClass,
    viewList,
    initViewList,
    getYamlFile,
    loadStorageClassYaml,
    storageclass,
    storageClasses
  } = StorageClassStore;

  const [columDefs] = useState([
    {
      headerName: "Name",
      field: "name",
      filter: true,
    },
    {
      headerName: "Cluster",
      field: "cluster",
      filter: true,
    },
    {
      headerName: "Reclaim Policy",
      field: "reclaimPolicy",
      filter: true,
    },
    {
      headerName: "Provisioner",
      field: "provisioner",
      filter: true,
    },
    {
      headerName: "VolumeBindingMode",
      field: "volumeBindingMode",
      filter: true,
    },
    // {
    //   headerName: "AllowVolumeExpansion",
    //   field: "allowVolumeExpansion",
    //   filter: true,
    //   cellRenderer: ({ value }) => {
    //     return drawStatus(value);
    //   },
    // },
    {
      headerName: "Created",
      field: "createAt",
      filter: "agDateColumnFilter",
      filterParams: agDateColumnFilter(),
      minWidth: 150,
      maxWidth: 200,
      cellRenderer: function (data) {
        return `<span>${dateFormatter(data.value)}</span>`;
      },
    },
    {
      headerName: "Yaml",
      field: "yaml",
      maxWidth: 150,
      cellRenderer: function () {
        return `<button class="tb_volume_yaml" onClick>View</button>`;
      },
      cellStyle: { textAlign: "center" },
    },
  ]);

  const handleOpen = (e) => {
    let fieldName = e.colDef.field;
    loadStorageClass(e.data.name, e.data.cluster);
    loadStorageClassYaml(e.data.name, e.data.cluster, null, "storageclasses");
    if (fieldName === "yaml") {
      handleOpenYaml();
    }
  };

  const handleOpenYaml = () => {
    setOpenYaml(true);
  };

  const handleCloseYaml = () => {
    setOpenYaml(false);
  };

  const handleCreateOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const history = useHistory();

  useEffect(() => {
    loadAdminStorageClasses();
    return () => {
      initViewList();
    }
  }, []);

  return (
    <div style={{ height: 900 }}>
      <CReflexBox>
        <PanelBox>
          <CommActionBar reloadFunc={loadAdminStorageClasses}>
            {/* <CCreateButton onClick={handleCreateOpen}>생성</CCreateButton> */}
          </CommActionBar>
          <div className="tabPanelContainer">
            <CTabPanel value={tabvalue} index={0}>
              <div className="grid-height2">
                <AgGrid
                  onCellClicked={handleOpen}
                  rowData={storageClasses}
                  columnDefs={columDefs}
                  isBottom={false}
                  totalElements={totalElements}
                  totalPages={totalPages}
                  currentPage={currentPage}
                  goNextPage={goNextPage}
                  goPrevPage={goPrevPage}
                />
              </div>
            </CTabPanel>
          </div>
          <ViewDialog
            open={openYaml}
            yaml={getYamlFile}
            onClose={handleCloseYaml}
          />
          {/* <CreateStorageClass open={open} onClose={handleClose} reloadFunc={loadStorageClasses} /> */}
        </PanelBox>
        <StorageClassAdminDetail storageclass={storageclass} />
      </CReflexBox>
    </div>
  );
});

export default StorageClassAdminTab;

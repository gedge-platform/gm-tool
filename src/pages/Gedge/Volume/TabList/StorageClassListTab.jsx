import React, { useState, useEffect } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import CommActionBar from "@/components/common/CommActionBar";
import { AgGrid } from "@/components/datagrids";
import { agDateColumnFilter } from "@/utils/common-utils";
import { CReflexBox } from "@/layout/Common/CReflexBox";
import {
    CCreateButton,
    CSelectButton,
    BtnCellRenderer,
} from "@/components/buttons";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import { useHistory } from "react-router";
import { observer } from "mobx-react";
import moment from "moment";
import axios from "axios";
// import { BASIC_AUTH, SERVER_URL } from "../../../../config";
import StorageClassDetail from "../StorageClassDetail";
import volumeStore from "@/store/Volume";
import ViewYaml from "../Dialog/ViewYaml";
import {
    converterCapacity,
    drawStatus,
} from "@/components/datagrids/AggridFormatter";

const StorageClassListTab = observer(() => {
    const [tabvalue, setTabvalue] = useState(0);
    const [open, setOpen] = useState(false);
    const handleTabChange = (event, newValue) => {
        setTabvalue(newValue);
    };

    const {
        storageClasses,
        storageClass,
        scYamlFile,
        scParameters,
        scLables,
        scAnnotations,
        totalElements,
        loadStorageClasses,
        loadStorageClass,
    } = volumeStore;

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
            headerName: "ReclaimPolicy",
            field: "reclaimPolicy",
            filter: true,
        },
        {
            headerName: "Storage Class",
            field: "provisioner",
            filter: true,
        },
        {
            headerName: "Volume Mode",
            field: "volumeBindingMode",
            filter: true,
        },
        {
            headerName: "Cluster",
            field: "allowVolumeExpansion",
            filter: true,
            cellRenderer: ({ value }) => {
                return drawStatus(value);
            },
        },
        {
            headerName: "Create At",
            field: "createAt",
            filter: "agDateColumnFilter",
            filterParams: agDateColumnFilter(),
            minWidth: 150,
            maxWidth: 200,
            cellRenderer: function (data) {
                return `<span>${moment(new Date(data.value))
                    // .subtract(9, "h")
                    .format("YYYY-MM-DD HH:mm")}</span>`;
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
        if (fieldName === "yaml") {
            handleOpenYaml();
        }
    };

    const handleOpenYaml = () => {
        setOpen(true);
    };

    const handleCloseYaml = () => {
        setOpen(false);
    };

    const history = useHistory();

    useEffect(() => {
        loadStorageClasses();
    }, []);

    return (
        <>
            <CReflexBox>
                <PanelBox>
                    <CommActionBar
                        isSearch={true}
                        isSelect={true}
                        keywordList={["이름"]}
                    >
                        <CCreateButton>생성</CCreateButton>
                    </CommActionBar>

                    <div className="tabPanelContainer">
                        <CTabPanel value={tabvalue} index={0}>
                            <div className="grid-height2">
                                <AgGrid
                                    onCellClicked={handleOpen}
                                    rowData={storageClasses}
                                    columnDefs={columDefs}
                                    isBottom={true}
                                    totalElements={totalElements}
                                />
                            </div>
                        </CTabPanel>
                    </div>
                    <ViewYaml
                        open={open}
                        yaml={scYamlFile}
                        onClose={handleCloseYaml}
                    />
                </PanelBox>
                <StorageClassDetail />
            </CReflexBox>
        </>
    );
});

export default StorageClassListTab;

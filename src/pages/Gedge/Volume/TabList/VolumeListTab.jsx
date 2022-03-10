import React, { useState, useEffect } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import CommActionBar from "@/components/common/CommActionBar";
import { AgGrid } from "@/components/datagrids";
import { agDateColumnFilter } from "@/utils/common-utils";
import { CReflexBox } from "@/layout/Common/CReflexBox";
import { CCreateButton, CSelectButton } from "@/components/buttons";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import { useHistory } from "react-router";
import { observer } from "mobx-react";
import moment from "moment";
import axios from "axios";
// import { BASIC_AUTH, SERVER_URL } from "../../../../config";
// import Detail from "../Detail";
import volumeStore from "../../../../store/Volume";

const VolumeListTab = observer(() => {
    const [tabvalue, setTabvalue] = useState(0);
    const handleTabChange = (event, newValue) => {
        setTabvalue(newValue);
    };

    const { volumeDetail, volumeList, totalElements, loadVolumeList } =
        volumeStore;

    const [columDefs] = useState([
        {
            headerName: "Name",
            field: "name",
            filter: true,
        },
        {
            headerName: "Capacity",
            field: "capacity",
            filter: true,
        },
        {
            headerName: "Status",
            field: "status",
            filter: true,
        },
        {
            headerName: "Storage Class",
            field: "storageClass",
            filter: true,
        },
        {
            headerName: "Volume Mode",
            field: "volumeMode",
            filter: true,
        },
        {
            headerName: "Cluster",
            field: "cluster",
            filter: true,
        },
        {
            headerName: "Claim",
            field: "claim.name",
            filter: true,
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
    ]);

    const history = useHistory();

    useEffect(() => {
        loadVolumeList();
    }, []);
    console.log(volumeList);
    return (
        <>
            <CReflexBox>
                <PanelBox>
                    <CommActionBar
                        isSearch={true}
                        isSelect={true}
                        keywordList={["이름"]}
                    >
                        {/* <CCreateButton>생성</CCreateButton> */}
                    </CommActionBar>

                    <div className="tabPanelContainer">
                        <CTabPanel value={tabvalue} index={0}>
                            <div className="grid-height2">
                                <AgGrid
                                    rowData={volumeList}
                                    columnDefs={columDefs}
                                    isBottom={true}
                                    totalElements={totalElements}
                                />
                            </div>
                        </CTabPanel>
                    </div>
                </PanelBox>
                {/* <Detail cluster={clusterDetail} /> */}
            </CReflexBox>
        </>
    );
});
export default VolumeListTab;

import React, { useState, useEffect } from 'react';
import { PanelBox } from "@/components/styles/PanelBox";
import CommActionBar from '@/components/common/CommActionBar';
import { AgGrid } from '@/components/datagrids'
import { agDateColumnFilter } from "@/utils/common-utils";
import { CReflexBox } from "@/layout/Common/CReflexBox";
import { CCreateButton, CSelectButton } from "@/components/buttons";
// import LogDialog from '../Dialog/LogDialog';
// import CreateDialog from '../Dialog/CreateDialog';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import { useHistory } from "react-router";


const APIListTab = () => {
    // const [open, setOpen] = useState(false);
    const [rowData] = useState([
        {
            ccname: "code1",
            version: "",
            peername: "Peer1",
            auth: "auth key",
            modify: "2021-02-01 14:00:00",
            instance: "",
            upgrade: ""
        },
        {
            ccname: "code2",
            version: "",
            peername: "Peer2",
            auth: "auth key",
            modify: "2021-02-01 14:00:00",
            instance: "",
            upgrade: ""
        },
        {
            ccname: "code3",
            version: "",
            peername: "Peer3",
            auth: "auth key",
            modify: "2021-02-01 14:00:00",
            state: "요청"
        },
        {
            ccname: "code4",
            version: "",
            peername: "Peer4",
            auth: "auth key",
            modify: "2021-02-01 14:00:00",
            instance: "",
            upgrade: ""
        },
        {
            ccname: "code5",
            version: "",
            peername: "Peer5",
            auth: "auth key",
            modify: "2021-02-01 14:00:00",
            instance: "",
            upgrade: ""
        }
    ]);
    const [columnDefs] = useState([
        {
            headerName: '',
            field: 'check',
            minWidth: 53,
            maxWidth: 53,
            filter: false,
            headerCheckboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            checkboxSelection: true,
        },
        {
            headerName: 'Chaincode 이름',
            field: 'ccname',
            filter: true,
        },
        {
            headerName: '버전',
            field: 'version',
            filter: true,
        },
        {
            headerName: 'Peer 이름',
            field: 'peername',
            filter: true,
        },
        {
            headerName: '변경일시',
            field: 'modify',
            filter: 'agDateColumnFilter',
            filterParams: agDateColumnFilter(),
            minWidth: 150,
            maxWidth: 200,
        },
        {
            headerName: '인스턴스화',
            field: 'instance',
            filter: true,
            minWidth: 150,
            maxWidth: 150,
            cellRenderer: function (state) {
                return `<button class='MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButtonBase-root css-1e6y48t-MuiButtonBase-root-MuiButton-root'>실행(I)</button>`;
            }
        },
        {
            headerName: '업그레이드',
            field: 'upgrade',
            filter: true,
            minWidth: 150,
            maxWidth: 150,
            cellRenderer: function (state) {
                return `<button class='MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButtonBase-root css-1e6y48t-MuiButtonBase-root-MuiButton-root'>실행(U)</button>`;
            }
        },
    ]);


    const [rowData2] = useState([
        {
            ccname: "code1",
            version: "",
            channel: "Channel1"
        },
        {
            ccname: "code2",
            version: "",
            channel: "Channel2"
        },
        {
            ccname: "code3",
            version: "",
            channel: "Channel3"
        },
        {
            ccname: "code4",
            version: "",
            channel: "Channel4"
        },
        {
            ccname: "code5",
            version: "",
            channel: "Channel5"
        }
    ]);
    const [columnDefs2] = useState([
        {
            headerName: '',
            field: 'check',
            minWidth: 53,
            maxWidth: 53,
            filter: false,
            headerCheckboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            checkboxSelection: true,
        },
        {
            headerName: 'Chaincode 이름',
            field: 'ccname',
            filter: true,
        },
        {
            headerName: '버전',
            field: 'version',
            filter: true,
        },
        {
            headerName: 'Channel',
            field: 'channel',
            filter: true,
        },
    ]);


    const history = useHistory();
    const chainCreate = () => {
        history.push('/chaincodes/create');
    }

    const actionList = [
        {
            name: 'my-blick-net-1',
            onClick: () => {
                setOpen2(true);
            },
        },
        {
            name: 'my-blick-net-2',
            onClick: () => {
            },
        },
    ]

    // const handleOpen = () => {
    //     setOpen(true);
    // };
    // const handleClose = () => {
    //     setOpen(false);
    // };

    return (
        <>
            <PanelBox>
                <div className="panelTitBar panelTitBar_clear">
                    <div className="tit">설치된 Chaincode 목록 </div>
                </div>
                <div className="panelTitBar panelTitBar_clear">
                    <div style={{ display: "flex" }}>
                        <div>
                            <CSelectButton
                                items={actionList}
                            >
                                네트워크 선택
                            </CSelectButton>
                        </div>
                    </div>
                    <div>
                        <Button startIcon={<AddIcon />} onClick={chainCreate}>
                            Chaincode 설치
                        </Button>
                    </div>
                </div>
                <div className="grid-height_5">
                    <AgGrid
                        rowData={rowData}
                        columnDefs={columnDefs}
                    />
                </div>
            </PanelBox>
            <div><br /></div>
            <PanelBox>
                <div className="panelTitBar panelTitBar_clear">
                    <div className="tit">인스턴스화 된 Chaincode 목록 </div>
                </div>
                <div className="grid-height_5">
                    <AgGrid
                        rowData={rowData2}
                        columnDefs={columnDefs2}
                    />
                </div>
            </PanelBox>
        </>
    );
}
export default APIListTab;

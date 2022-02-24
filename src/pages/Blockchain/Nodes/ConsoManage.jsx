import React, { useState, useEffect } from 'react';
import Layout from "@/layout";
import { Title, SubTitle } from '@/pages';
import { PanelBox } from "@/components/styles/PanelBox";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { AgGrid } from '@/components/datagrids'
import { agDateColumnFilter } from "@/utils/common-utils";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { useHistory } from "react-router";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const ConsoManage = () => {
    const currentPage = SubTitle.Blockchain.Channels;
    const [currency, setCurrency] = React.useState('USD');

    const handleChange = (event) => {
        setCurrency(event.target.value);
    };


    const handleModifyOpen = (e) => {
        const fieldName = e.colDef.field;
        if (fieldName === "action") {
            // setOpen(true);
            alert("haha");
        }
    };


    const history = useHistory();
    const channelCreate = () => {
        history.push('/nodes');
    }
    const goBack = () => {
        history.goBack();
    }

    const currencies = [
        {
            value: 'USD',
            label: 'Block-Orderer',
        },
        {
            value: 'EUR',
            label: 'Block-Orderer',
        },
        {
            value: 'BTC',
            label: 'Block-Orderer',
        },
        {
            value: 'JPY',
            label: 'Block-Orderer',
        },
    ];

    const [orgrowData] = useState([
        {
            mspname: "block-msp",
            import: "Y",
            action: "",
        },
        {
            mspname: "msp2",
            import: "N",
            action: "",
        },
        {
            mspname: "msp3",
            import: "N",
            action: "",
        },
    ]);
    const [orgcolumnDefs] = useState([
        {
            headerName: 'MSP 이름',
            field: 'mspname',
            filter: true,
        },
        {
            headerName: 'import 여부',
            field: 'import',
            filter: true,
        },
        {
            headerName: '비고',
            field: 'action',
            filter: true,
            cellRenderer: function () {
                return `<button>제외</button>`;
            }
        },
    ]);


    const [totalrowData] = useState([
        {
            mspname: "block-msp",
            import: "Y",
            action: "y",
        },
        {
            mspname: "msp2",
            import: "N",
            action: "y",
        },
        {
            mspname: "msp3",
            import: "N",
            action: "y",
        },
        {
            mspname: "msp4",
            import: "N",
            action: "n",
        },
        {
            mspname: "msp5",
            import: "N",
            action: "n",
        },
        {
            mspname: "msp6",
            import: "N",
            action: "n",
        },
    ]);
    const [totalcolumnDefs] = useState([
        {
            headerName: 'MSP 이름',
            field: 'mspname',
            filter: true,
        },
        {
            headerName: 'import 여부',
            field: 'import',
            filter: true,
        },
        {
            headerName: '비고',
            field: 'action',
            filter: true,
            cellRenderer: function (state) {
                if (state.data.action == "y") {
                    return `<span>등록 됨</span>`;
                }
                return `<button>추가</button>`;
            }
        },
    ]);

    return (
        <Layout currentPage={currentPage}>
            <PanelBox>
                <div className="panelTitBar panelTitBar_clear">
                    <div className="tit">컨소시엄 관리</div>
                </div>
                <div className="grid-height2">
                    <div style={{ padding: "30px" }}>
                        <div>
                            <p style={{ fontSize: "20px", paddingBottom: "10px" }}>조직에 소속된 MSP</p>
                            <hr />
                            <p style={{ fontSize: "15px", paddingBottom: "10px", paddingTop: "15px" }}>MSP</p>
                            <div className="grid-height_5">
                                <AgGrid
                                    rowData={orgrowData}
                                    columnDefs={orgcolumnDefs}
                                    onCellClicked={handleModifyOpen}
                                />
                            </div>
                            <br />
                            <br />
                            <br />
                        </div>
                        <div>
                            <p style={{ fontSize: "20px", paddingBottom: "10px" }}>전체 MSP 리스트</p>
                            <hr />
                            <p style={{ fontSize: "15px", paddingBottom: "10px", paddingTop: "15px" }}>MSP</p>
                            <div className="grid-height_5">
                                <AgGrid
                                    rowData={totalrowData}
                                    columnDefs={totalcolumnDefs}
                                    onCellClicked={handleModifyOpen}
                                />
                            </div>
                        </div>
                    </div>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, padding: '30px' }}>
                        <Button
                            variant="outlined"
                            onClick={goBack}
                            sx={{ mr: 1 }}
                        >
                            이전
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                    </Box>
                </div>
            </PanelBox>
        </Layout >
    );
}
export default ConsoManage;

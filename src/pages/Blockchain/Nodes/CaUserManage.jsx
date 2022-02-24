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

const CaUserManage = () => {
    const currentPage = SubTitle.Blockchain.Channels;
    const [currency, setCurrency] = React.useState('USD');

    const handleChange = (event) => {
        setCurrency(event.target.value);
    };

    const [open, setOpen] = React.useState(false);

    //Form Dialogs
    const handleClickOpen = () => {
        setOpen(true);
    };    

    const handleModifyOpen = (e) => {
        const fieldName = e.colDef.field;
        if (fieldName === "action") {
            // setOpen(true);
            alert("haha");
        }
    };    

    const history = useHistory();
    const nodesCaCreate = () => {
        history.push('/nodes#cas');
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


    const [rowData] = useState([
        {
            caname: "admin",
            catype: "Root CA",
            usrtype: "admin",
            network: "net1",
            castatus: "정상",
            camgmt: "",
            action: "",
        },
        {
            caname: "orderer1",
            catype: "조직 CA",
            usrtype: "user",
            network: "-",
            castatus: "정상",
            camgmt: "",
            action: "",
        },
        {
            caname: "orderer2",
            catype: "조직 CA",
            usrtype: "user",
            network: "-",
            castatus: "정상",
            camgmt: "",
            action: "",
        },
    ]);
    const [columnDefs] = useState([
        {
            headerName: 'ID',
            field: 'caname',
            filter: true,
        },
        {
            headerName: 'CA 유형',
            field: 'catype',
            filter: true,
        },
        {
            headerName: '사용자 유형',
            field: 'usrtype',
            filter: true,
        },
        {
            headerName: '소속 네트워크',
            field: 'network',
            filter: true,
        },
        {
            headerName: '인증서 상태',
            field: 'castatus',
            filter: true,
        },
        {
            headerName: '인증서 관리',
            field: 'camgmt',
            filter: true,
            cellRenderer: function () {
                return `<select name="camgmt" id="camgmt">
                    <option value="Export">Export</option>
                  <option value="Delete">Delete</option>
                </select>`;
            }
        },
        {
            headerName: '액션',
            field: 'action',
            filter: true,
            cellRenderer: function () {
                return `<button>재발급</button>`;
            }
        },
    ]);


    return (
        <Layout currentPage={currentPage}>
            <PanelBox>
                <div className="panelTitBar panelTitBar_clear">
                    <div className="tit">CA 사용자 관리</div>
                </div>
                <div className="grid-height2">
                    <div style={{ padding: "30px" }}>
                        <div>
                            <p style={{ fontSize: "20px", paddingBottom: "10px" }}>사용자 ID 및 인증서 관리</p>
                            <hr />
                            <br />
                            <div style={{ float: "right" }}>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleClickOpen} variant="outlined" size="small">
                                    추가
                                </Button>
                            </div>
                            <br />
                            <p style={{ fontSize: "15px", paddingBottom: "10px", paddingTop: "15px" }}>현재 등록된 Peer</p>
                            <div className="grid-height_5">
                                <AgGrid
                                    rowData={rowData}
                                    columnDefs={columnDefs}
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
export default CaUserManage;

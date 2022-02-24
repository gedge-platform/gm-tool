import React, { useState, useEffect } from 'react';
import Layout from "@/layout";
import { Title, SubTitle } from '@/pages';
import { PanelBox } from "@/components/styles/PanelBox";

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { makeStyles } from '@mui/styles';
import { AgGrid } from '@/components/datagrids'
import { agDateColumnFilter } from "@/utils/common-utils";

import CreateListTab from "./TabList/CreateListTab"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import networkStore from '../../../Store/NetworkStore';
import { observer } from "mobx-react";
import OrdererAdd from './Dialog/OrdererAdd';
import { set } from 'mobx';

const steps = ['블록체인 네트워크 기본 정보', 'Orderer 설정', 'Peer 설정', 'Channel', '설정', '검토 및 생성'];

const NetworkCreateOrderer = observer(() => {

    const currentPage = SubTitle.Blockchain.Networks;
    const [open, setOpen] = React.useState(false);
    const [editable, setEditable] = React.useState(false)
    const [rootCaName, setRootCaName] = React.useState("");
    const [rootCaId, setRootCaId] = React.useState("");
    const [rootCaPw, setRootCaPw] = React.useState("");
    const [rootCaDB, setRootCaDB] = React.useState("");
    const [rootCaMSP, setRootCaMSP] = React.useState("");
    const [ordererName, setOrdererName] = React.useState("");
    const [raft, setRaft] = React.useState(1);
    const changeRootCaName = (event) => {
        setRootCaName(event.target.value)
        networkStore.setOrdererInfo(event.target.value, rootCaId, rootCaPw, rootCaDB, rootCaMSP, ordererName, raft)
    }
    const changeRootCaId = (event) => {
        setRootCaId(event.target.value)
        networkStore.setOrdererInfo(rootCaName, event.target.value, rootCaPw, rootCaDB, rootCaMSP, ordererName, raft)
    }

    const changeRootCaPw = (event) => {
        setRootCaPw(event.target.value)
        networkStore.setOrdererInfo(rootCaName, rootCaId, event.target.value, rootCaDB, rootCaMSP, ordererName, raft)
    }
    const changeRootCaDB = (event) => {
        setRootCaDB(event.target.value)
        networkStore.setOrdererInfo(rootCaName, rootCaId, rootCaPw, event.target.value, rootCaMSP, ordererName, raft)
    }
    const changeOrdererMSP = (event) => {
        setRootCaMSP(event.target.value)
        networkStore.setOrdererInfo(rootCaName, rootCaId, rootCaPw, rootCaDB, event.target.value, ordererName, raft)
    }
    const changeOrdererName = (event) => {
        setOrdererName(event.target.value)
        networkStore.setOrdererInfo(rootCaName, rootCaId, rootCaPw, rootCaDB, rootCaMSP, event.target.value, raft)
        console.log(networkStore.ordererInfo)
    }
    const changeRaft = (event) => {
        setRaft(event.target.value)
        networkStore.setOrdererInfo(rootCaName, rootCaId, rootCaPw, rootCaDB, rootCaMSP, ordererName, event.target.value)
        console.log(networkStore.ordererInfo)
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        setRootCaName(networkStore.ordererInfo.rootCaName)
        setRootCaId(networkStore.ordererInfo.rootCaId)
        setRootCaPw(networkStore.ordererInfo.rootCaPw)
        setRootCaDB(networkStore.ordererInfo.rootCaDB)
        setRootCaMSP(networkStore.ordererInfo.rootCaMSP)
        setOrdererName(networkStore.ordererInfo.ordererName)
        setRaft(networkStore.ordererInfo.raft)
    }, [])

    useEffect(() => {
        if (networkStore.netDBList.length > 0) {
            setRootCaDB(networkStore.netDBList[0].value);
        }
        return () => {
        }

    }, [])

    const handleChange = (event) => {
        networkStore.rootCaDB = event.target.value
    };

    const [modify, setModify] = React.useState(false)

    const handleModify = () => {
        setModify(!modify)
        networkStore.ordererList = rows
    }

    const columns = [
        { field: 'caUser', headerName: 'Orderer 이름', flex: 1, editable: modify ? true : false, filterable: false, },
        { field: 'caPw', headerName: 'Ordering 설정', flex: 1, editable: modify ? true : false, filterable: false },
        {
            field: 'cpu',
            headerName: 'Cpu',
            type: 'number',
            editable: modify ? true : false,
            flex: 1,
            filterable: false
        },
        {
            field: 'memory',
            headerName: 'Memory',
            type: 'number',
            editable: modify ? true : false,
            flex: 1,
            filterable: false
        },
        {
            field: 'storage',
            headerName: 'Storage',
            type: 'number',
            editable: modify ? true : false,
            flex: 1,
            filterable: false
        },
    ];

    let list = networkStore.ordererList.map((item, idx) => {
        return (
            { ...item, "id": idx }
        )
    })
    const rows = list
    const [contView, setContView] = React.useState(networkStore.orderCheck);

    const handleRadioChange = (event) => {
        setContView(event.target.value)
        networkStore.ordererSet = event.target.value
        networkStore.orderCheck = event.target.value
    };

    const handleDelete = () => {
        console.log(networkStore.curSelOderer)
        networkStore.curSelOderer.map((tmp, idx) => {
            console.log(tmp)
            list = list.filter(data => data.id != tmp)
        })
        networkStore.ordererList = list
        console.log(networkStore.ordererList)
    }

    return (
        <>
            <div>
                <p style={{ fontSize: "20px", paddingBottom: "10px", fontWeight: "900" }}>Orderer 기본 설정</p>
                <p style={{ paddingBottom: "10px", paddingTop: "10px" }}>Orderer 서비스 구성 기본 설정 정보를 입력하세요.</p>
                <hr />
            </div>

            <div style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                <div style={{ display: "flex" }}>
                    <div style={{ flexGrow: 1, margin: "auto", fontSize: "16px", fontWeight: "500" }}> Orderer 생성 여부</div>
                    <div style={{ flexGrow: 2 }}>
                        <FormControl component="fieldset">
                            <RadioGroup row onChange={handleRadioChange} value={contView}>
                                <FormControlLabel value="true" control={<Radio />} label="Orderer 생성" />
                                <FormControlLabel value="false" control={<Radio />} disabled={true} label="Orderer 생성하지 않음" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
                <hr />
            </div>

            {contView === "true" ?
                <>
                    {/* <div style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                        <p style={{ fontSize: "16px", fontWeight: "500" }}>Root CA 설정</p>
                        <div style={{ display: "flex" }}>
                            <div style={{ width: "50%", paddingLeft: "10px", paddingRight: "10px" }}>
                                <TextField
                                    required
                                    TextField
                                    margin="normal"
                                    placeholder="Root CA 이름"
                                    size="small"
                                    fullWidth
                                    onChange={changeRootCaName}
                                    value={networkStore.ordererInfo.rootCaName}
                                />
                            </div>
                        </div>
                        <div style={{ display: "flex" }}>
                            <div style={{ width: "50%", paddingLeft: "10px", paddingRight: "10px" }}>
                                <TextField
                                    required
                                    TextField
                                    margin="normal"
                                    placeholder="Root CA 아이디"
                                    size="small"
                                    fullWidth
                                    onChange={changeRootCaId}
                                    value={networkStore.ordererInfo.rootCaId}
                                />
                            </div>
                            <div style={{ width: "50%", paddingLeft: "10px", paddingRight: "10px" }}>
                                <TextField
                                    required
                                    TextField
                                    margin="normal"
                                    placeholder="Root CA 비밀번호"
                                    size="small"
                                    type="password"
                                    fullWidth
                                    onChange={changeRootCaPw}
                                    value={networkStore.ordererInfo.rootCaPw}
                                />
                            </div>
                        </div>
                        <div>
                            <div style={{ width: "100%", paddingLeft: "10px", paddingRight: "10px", paddingBottom: "10px" }}>
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    onChange={changeRootCaDB}
                                    margin="normal"
                                    size="small"
                                    fullWidth
                                    value={networkStore.ordererInfo.rootCaDB}
                                >
                                    {networkStore.netDBList.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.value}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                        </div>
                    </div>

                    <div style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                        <p style={{ fontSize: "16px", fontWeight: "500" }}> Root CA MSP 설정</p>
                        <div style={{ padding: "10px" }}>
                            <TextField
                                required
                                TextField
                                fullWidth
                                margin="normal"
                                placeholder="MSP 이름을 입력하세요"
                                size="small"
                                onChange={changeOrdererMSP}
                                value={networkStore.ordererInfo.rootCaMSP}
                            />
                        </div>
                        <hr />
                    </div> */}
                    <div style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                        <p style={{ fontSize: "16px", fontWeight: "500" }}> Orderer 서비스 설정</p>
                        <div style={{ display: "flex" }}>
                            <div style={{ width: "50%", paddingLeft: "10px", paddingRight: "10px" }}>
                                <TextField
                                    required
                                    TextField
                                    margin="normal"
                                    placeholder="Orderer 서비스 이름을 입력하세요"
                                    size="small"
                                    fullWidth
                                    onChange={changeOrdererName}
                                    value={networkStore.ordererInfo.ordererName}
                                />
                            </div>
                        </div>
                        <div style={{ display: "flex" }}>
                            <div style={{ width: "50%", paddingLeft: "10px", paddingRight: "10px", paddingBottom: "10px" }}>
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    onChange={changeRaft}
                                    margin="normal"
                                    size="small"
                                    fullWidth
                                    value={networkStore.ordererInfo.raft}
                                >
                                    <MenuItem key={1} value={1}>Raft 1</MenuItem>
                                    <MenuItem key={5} value={5}>Raft 5</MenuItem>
                                    {/* {networkStore.netDBList.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.value}
                                        </MenuItem>
                                    ))} */}
                                </TextField>
                            </div>
                        </div>

                        <hr />
                    </div>
                    {/* <div style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "20px" }}>
                            <p style={{ fontSize: "16px", fontWeight: "500" }}>Orderer 설정</p>
                            <div style={{ display: "flex" }}>
                                <div style={{ marginRight: "10px" }}>
                                    {modify ? <Button size="small" variant="contained" onClick={handleModify}>
                                        수정완료
                                    </Button> : <Button size="small" variant="contained" onClick={handleModify}>
                                        수정하기
                                    </Button>}
                                </div>
                                <div style={{ marginRight: "10px" }}>
                                    <div>
                                        <Button size="small" variant="contained" onClick={handleDelete}>
                                            삭제하기
                                        </Button>
                                    </div>
                                </div>
                                <div>
                                    <Button size="small" variant="contained" onClick={handleClickOpen}>
                                        추가하기
                                    </Button>
                                </div>
                                <OrdererAdd open={open} onClose={handleClose} />
                            </div>
                        </div>

                        <CreateListTab columns={columns} rows={rows} state="orderer" />
                        
                    </div> */}
                </> : <></>}
        </>
    );
})
export default NetworkCreateOrderer;

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
import { GridActionsCellItem } from '@mui/x-data-grid';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import networkStore from '../../../Store/NetworkStore';
import ChannelAdd from './Dialog/ChannelAdd'
import CreateListTab from './TabList/CreateListTab'
const NetworkCreateChannel = () => {

    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [channelName, setChannelName] = useState("")
    const [name, setName] = useState("")
    const [id, setId] = useState("")
    const [pw, setPw] = useState("")
    const [port, setPort] = useState(5984)

    // const [modifyIdx, setModifyIdx] = React.useState(-1);
    // const [state, setState] = React.useState("")
    // const [channelList, setChannelList] = React.useState([]);
    // const [rows, setRows] = React.useState([]);
    // const [list, setList] = React.useState([]);
    //Form Dialogs
    const handleClickOpen = () => {
        setState("add")
        setOpen(true);

    };

    const handleClose = () => {
        setState("")
        setOpen(false);
    };
    //
    const changeChannelName = (event) => {
        setChannelName(event.target.value)
        networkStore.setChannelInfo(event.target.value, name, id, pw, port)
    }
    const changeName = (event) => {
        setName(event.target.value)
        networkStore.setChannelInfo(channelName, event.target.value, id, pw, port)
    }
    const changeId = (event) => {
        setId(event.target.value)
        networkStore.setChannelInfo(channelName, name, event.target.value, pw, port)
    }
    const changePw = (event) => {
        setPw(event.target.value)
        networkStore.setChannelInfo(channelName, name, id, event.target.value, port)
    }
    const changePort = (event) => {
        setPort(event.target.value)
        networkStore.setChannelInfo(channelName, name, id, pw, event.target.value)
    }

    // const [currency, setCurrency] = React.useState('USD');


    // let list = networkStore.channelInfo.map((item, idx) => {
    //     return (
    //         { ...item, "id": idx }
    //     )
    // })

    // const rows = list
    // setRows(list)
    const handleModify = (id) => {
        setState("modify")
        setModifyIdx(id)
        setOpen(true);
        console.log(id)
    }
    const handleClose2 = () => {
        setOpen(false);
    };
    const handleDelete = (id) => {
        networkStore.deleteChannelList(id, rows)
        // list = networkStore.channelInfo
        // setChannelList(networkStore.channelInfo)
        // console.log(id)
        // list = list.filter(data => data.id != id)
        // networkStore.channelInfo = list

        console.log(networkStore.channelInfo, "networkStore.channelInfo")
    }
    // setRows(list)
    // const columns = [
    //     { field: 'channelName', headerName: '채널 이름', flex: 1, editable: false, filterable: false, },
    //     { field: 'peerCnt', headerName: '참여 피어 수', flex: 1, editable: false, filterable: false },
    //     {
    //         field: 'dbName',
    //         headerName: 'DB 정보',
    //         editable: false,
    //         flex: 1,
    //         filterable: false
    //     },
    //     {
    //         field: 'actions',
    //         type: 'actions',
    //         renderHeader: () => (
    //             <strong>
    //                 {' '}
    //             </strong>
    //         ),
    //         // description: 'This column has a value getter and is not sortable.',
    //         sortable: false,
    //         filterable: false,
    //         flex: 1,

    //         renderCell: (params) => (
    //             // console.log(param.id);
    //             // console.log(e);
    //             // return (
    //             <strong>
    //                 <Button
    //                     variant="contained"
    //                     color="primary"
    //                     size="small"
    //                     style={{ marginLeft: 16 }}
    //                     onClick={() => handleModify(params.id)}
    //                 >
    //                     수정
    //                 </Button>
    //                 <Button
    //                     variant="contained"
    //                     color="primary"
    //                     size="small"
    //                     style={{ marginLeft: 16 }}
    //                     onClick={() => handleDelete(params.id)}
    //                 >
    //                     삭제
    //                 </Button>
    //             </strong>

    //         )

    //     },
    // ];

    const [contView, setContView] = React.useState(networkStore.channelCheck);

    const handleRadioChange = (event) => {
        setContView(event.target.value)
        networkStore.channelCheck = event.target.value
    };

    useEffect(() => {

        if (networkStore.peerCheck === "false") {
            setContView(networkStore.peerCheck)
        }
    }, [])
    // useEffect(() => {
    //     setRows(list)
    //     setChannelList(networkStore.channelInfo.map((item, idx) => {
    //         return (
    //             { ...item, "id": idx }
    //         )
    //     }))
    // }, [])

    return (
        <>
            <div>
                <p style={{ fontSize: "20px", paddingBottom: "10px", fontWeight: "900" }}>Channel 기본 설정</p>
                <p style={{ paddingBottom: "10px", paddingTop: "10px" }}>Channel 기본 설정 정보를 입력하세요.</p>
                <hr />
            </div>

            <div style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                <div style={{ display: "flex" }}>
                    <div style={{ flexGrow: 1, margin: "auto", fontSize: "16px", fontWeight: "500" }}> Channel 생성 여부</div>
                    <div style={{ flexGrow: 2 }}>
                        <FormControl component="fieldset">
                            <RadioGroup row onChange={handleRadioChange} value={contView}>
                                {networkStore.peerCheck === "false" ?
                                    <>
                                        <FormControlLabel value="true" control={<Radio disabled="true" />} label="Channel 생성" />
                                        <FormControlLabel value="false" control={<Radio />} label="Channel 생성하지 않음" />
                                    </> :
                                    <>
                                        <FormControlLabel value="true" control={<Radio />} label="Channel 생성" />
                                        <FormControlLabel value="false" control={<Radio disabled={true} />} label="Channel 생성하지 않음" />
                                    </>}
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
                <hr />
            </div>

            {contView === "true" ?
                <>

                    <div style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                        <p style={{ fontSize: "16px", fontWeight: "500" }}>Channel 설정</p>
                        <div style={{ padding: "10px" }}>
                            <TextField
                                required
                                TextField
                                fullWidth
                                margin="normal"
                                placeholder="Channel ID"
                                size="small"
                                onChange={changeChannelName}
                                value={networkStore.channelInfo.channelId}
                            />
                        </div>
                        <div style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                            <p style={{ fontSize: "16px", fontWeight: "500" }}>Couch DB 설정</p>
                            <div style={{ display: "flex" }}>
                                <div style={{ width: "50%", paddingLeft: "10px", paddingRight: "10px" }}>
                                    <TextField
                                        required
                                        TextField
                                        margin="normal"
                                        placeholder="Couch DB Name"
                                        size="small"
                                        fullWidth
                                        onChange={changeName}
                                        value={networkStore.channelInfo.DBinfo.name}
                                    />
                                </div>
                                <div style={{ width: "50%", paddingLeft: "10px", paddingRight: "10px" }}>
                                    <TextField
                                        required
                                        TextField
                                        margin="normal"
                                        placeholder="Couch DB Port Number"
                                        size="small"
                                        fullWidth
                                        disabled={true}
                                        onChange={changePort}
                                        value={networkStore.channelInfo.DBinfo.port}
                                    />
                                </div>
                            </div>
                            <div style={{ display: "flex" }}>
                                <div style={{ width: "50%", paddingLeft: "10px", paddingRight: "10px" }}>
                                    <TextField
                                        required
                                        TextField
                                        margin="normal"
                                        placeholder="Couch DB ID"
                                        size="small"
                                        fullWidth
                                        onChange={changeId}
                                        value={networkStore.channelInfo.DBinfo.id}
                                    />
                                </div>
                                <div style={{ width: "50%", paddingLeft: "10px", paddingRight: "10px" }}>
                                    <TextField
                                        required
                                        TextField
                                        margin="normal"
                                        placeholder="Couch DB PW"
                                        size="small"
                                        fullWidth
                                        onChange={changePw}
                                        value={networkStore.channelInfo.DBinfo.pw}
                                    />
                                </div>
                            </div>
                            <hr />
                        </div>
                        {/* <div style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "20px" }}>
                            <p style={{ fontSize: "16px", fontWeight: "500" }}>Channel 설정</p>
                            <div style={{ display: "flex" }}>
                                <div style={{ marginRight: "10px" }}>
                                </div>
                                <div>
                                    <Button size="small" variant="contained" onClick={handleClickOpen}>
                                        추가하기
                                    </Button>
                                </div>
                                <ChannelAdd open={open} onClose={handleClose} state={state} modifyIdx={modifyIdx} />
                            </div>
                        </div>

                        <CreateListTab columns={columns} rows={rows} state="channel" /> */}

                    </div>
                </> : <></>}

        </>
    );
}
export default NetworkCreateChannel;

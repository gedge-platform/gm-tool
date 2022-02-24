import React, { useEffect } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import networkStore from '../../../Store/NetworkStore';
import { observer } from "mobx-react";
import PeerAdd from './Dialog/PeerAdd'
import CreateListTab from './TabList/CreateListTab'

const steps = ['블록체인 네트워크 기본 정보', 'Orderer 설정', 'Peer 설정', 'Channel', '설정', '검토 및 생성'];

const NetworkCreatePeer = observer(() => {

    const [open, setOpen] = React.useState(false);
    const [orgName, setOrgName] = React.useState("");
    const [orgCaName, setOrgCaName] = React.useState("");
    const [orgCaId, setOrgCaId] = React.useState("");
    const [orgCaPw, setOrgCaPw] = React.useState("");
    const [orgCaDB, setOrgCaDB] = React.useState("");
    const [orgMSP, setOrgMSP] = React.useState("");


    const changeOrgName = (event) => {
        setOrgName(event.target.value)
        networkStore.setPeerInfo(event.target.value, orgCaName, orgCaId, orgCaPw, orgCaDB, orgMSP, networkStore.peerList)
    }
    const changeOrgCaName = (event) => {
        setOrgCaName(event.target.value)
        networkStore.setPeerInfo(orgName, event.target.value, orgCaId, orgCaPw, orgCaDB, orgMSP, networkStore.peerList)
    }
    const changeOrgCaId = (event) => {
        setOrgCaId(event.target.value)
        networkStore.setPeerInfo(orgName, orgCaName, event.target.value, orgCaPw, orgCaDB, orgMSP, networkStore.peerList)
    }
    const changeOrgCaPw = (event) => {
        setOrgCaPw(event.target.value)
        networkStore.setPeerInfo(orgName, orgCaName, orgCaId, event.target.value, orgCaDB, orgMSP, networkStore.peerList)
    }

    const changeOrgCaDB = (event) => {
        setOrgCaDB(event.target.value)
        networkStore.setPeerInfo(orgName, orgCaName, orgCaId, orgCaPw, event.target.value, orgMSP, networkStore.peerList)
    }
    const changeOrgMSP = (event) => {
        setOrgMSP(event.target.value)
        networkStore.setPeerInfo(orgName, orgCaName, orgCaId, orgCaPw, orgCaDB, event.target.value, networkStore.peerList)
    }


    //Form Dialogs
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (networkStore.netDBList.length > 0) {
            setOrgCaDB(networkStore.netDBList[0].value)
        }
        return () => {
        }
    }, [])


    const handleChange = (event) => {
        networkStore.orgCaDB = (event.target.value);
        networkStore.peerCheck = event.target.value
    };
    const [modify, setModify] = React.useState(false)

    const handleModify = () => {
        setModify(!modify)
        networkStore.peerList = rows
        networkStore.peerInfo.peerList = networkStore.peerList
    }
    const columns = [
        // { field: 'caUser', headerName: 'Peer 이름', flex: 1, editable: modify ? true : false, filterable: false, },
        // { field: 'caPw', headerName: 'Peer PW', flex: 1, editable: modify ? true : false, filterable: false },
        { field: 'peerName', headerName: 'Peer 이름', flex: 1, editable: modify ? true : false, filterable: false },
        {
            field: 'cpu',
            headerName: 'Cpu',
            type: 'number',
            editable: false,
            // editable: modify ? true : false,
            flex: 1,
            filterable: false
        },
        {
            field: 'memory',
            headerName: 'Memory',
            type: 'number',
            editable: false,
            // editable: modify ? true : false,
            flex: 1,
            filterable: false
        },
        {
            field: 'storage',
            headerName: 'Storage',
            type: 'number',
            editable: false,
            // editable: modify ? true : false,
            flex: 1,
            filterable: false
        },
    ];

    let list = networkStore.peerList.map((item, idx) => {
        return (
            { ...item, "id": idx }
        )
    })

    const rows = list

    const [contView, setContView] = React.useState(networkStore.peerCheck);

    const handleRadioChange = (event) => {
        setContView(event.target.value)

        networkStore.peerSet = event.target.value
        networkStore.peerCheck = event.target.value
    };
    const handleDelete = () => {
        networkStore.curSelPeer.map((tmp, idx) => {
            console.log(tmp)
            list = list.filter(data => data.id != tmp)
        })
        networkStore.peerList = list
        networkStore.peerInfo.peerList = networkStore.peerList
    }


    return (
        <>
            <div>
                <p style={{ fontSize: "20px", paddingBottom: "10px", fontWeight: "900" }}>Peer 기본 설정</p>
                <p style={{ paddingBottom: "10px", paddingTop: "10px" }}>Peer 및 Organization 서비스 구성 기본 설정 정보를 입력하세요.</p>
                <hr />
            </div>

            <div style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                <div style={{ display: "flex" }}>
                    <div style={{ flexGrow: 1, margin: "auto", fontSize: "16px", fontWeight: "500" }}> Peer 생성 여부</div>
                    <div style={{ flexGrow: 2 }}>
                        <FormControl component="fieldset">
                            <RadioGroup row onChange={handleRadioChange} value={contView}>
                                <FormControlLabel value="true" control
                                    ={<Radio />} label="Peer 생성" />
                                <FormControlLabel value="false" control={<Radio />} disabled={true} label="Peer 생성하지 않음" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
                <hr />
            </div>

            {contView === "true" ?
                <>
                    <div style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                        <p style={{ fontSize: "16px", fontWeight: "500" }}>Organization 설정</p>
                        <div style={{ padding: "10px" }}>
                            <TextField
                                required
                                TextField
                                fullWidth
                                margin="normal"
                                placeholder="Organization Name"
                                size="small"
                                onChange={changeOrgName}
                                value={networkStore.peerInfo.orgName}
                            />
                        </div>
                        {/* <div style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                            <p style={{ fontSize: "16px", fontWeight: "500" }}>Organization CA 설정</p>
                            <div style={{ display: "flex" }}>
                                <div style={{ width: "50%", paddingLeft: "10px", paddingRight: "10px" }}>
                                    <TextField
                                        required
                                        TextField
                                        margin="normal"
                                        placeholder="Organization CA Name"
                                        size="small"
                                        fullWidth
                                        onChange={changeOrgCaName}
                                        value={networkStore.peerInfo.orgCaName}
                                    />
                                </div>
                            </div>
                            <div style={{ display: "flex" }}>
                                <div style={{ width: "50%", paddingLeft: "10px", paddingRight: "10px" }}>
                                    <TextField
                                        required
                                        TextField
                                        margin="normal"
                                        placeholder="CA 관리자 ID"
                                        size="small"
                                        fullWidth
                                        onChange={changeOrgCaId}
                                        value={networkStore.peerInfo.orgCaId}
                                    />
                                </div>
                                <div style={{ width: "50%", paddingLeft: "10px", paddingRight: "10px" }}>
                                    <TextField
                                        required
                                        TextField
                                        margin="normal"
                                        placeholder="CA 관리자 비밀번호"
                                        size="small"
                                        type="password"
                                        fullWidth
                                        onChange={changeOrgCaPw}
                                        value={networkStore.peerInfo.orgCaPw}
                                    />
                                </div>
                            </div>
                            <div>
                                <div style={{ width: "100%", paddingLeft: "10px", paddingRight: "10px", paddingBottom: "10px" }}>
                                    <TextField
                                        id="outlined-select-currency"
                                        select
                                        value={networkStore.peerInfo.orgCaDB}
                                        onChange={changeOrgCaDB}
                                        margin="normal"
                                        size="small"
                                        fullWidth
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
                        <div style={{ width: "50%", paddingTop: "10px" }}>
                            <p style={{ fontSize: "16px", fontWeight: "500" }}>Organization MSP 설정</p>
                            <div style={{ width: "100%", padding: "10px" }}>
                                <TextField
                                    required
                                    TextField
                                    fullWidth
                                    margin="normal"
                                    placeholder="Organization MSP 이름을 입력하세요"
                                    size="small"
                                    onChange={changeOrgMSP}
                                    value={networkStore.peerInfo.orgMSP}
                                />
                            </div>
                        </div> */}
                        <hr />
                    </div>
                    <div style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "20px" }}>
                            <p style={{ fontSize: "16px", fontWeight: "500" }}>Peer 설정</p>
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
                                <PeerAdd open={open} onClose={handleClose} />
                            </div>
                        </div>

                        <CreateListTab columns={columns} rows={rows} state="peer" />
                        {/* <div style={{ height: "200px", padding: "10px" }}>
                            <AgGrid
                                rowData={rowData}
                                columnDefs={columnDefs}
                            />
                        </div> */}
                    </div>
                </> : <></>}
        </>
    );
})
export default NetworkCreatePeer;

import React, { useState, useEffect } from 'react';
import { CDialog } from "@/components/dialogs";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import styled from 'styled-components';
// import { swalConfirm } from "@/utils/swal-utils";
import Swal from "sweetalert2";
import FormControl from '@material-ui/core/FormControl';
import { CTextField } from "@/components/textfields";
import { CFileField } from "@/components/textfields/CFilefield";
import { CCreateButton, CSelectButton } from "@/components/buttons";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import orgStore from '../../../../Store/OrganizationStore';
import { observer } from "mobx-react";
import { useHistory } from "react-router";
import networkStore from '../../../../Store/NetworkStore';
import { DataGrid } from '@mui/x-data-grid';

const FormTitle = styled.div`
    font-size: 16px;
    font-weight: 500;
    margin-top: 10px;
    margin-bottom: 10px;
    `;
const ChannelAdd = observer((props) => {
    const { open, state, modifyIdx } = props;
    // const [dbView, setDbView] = useState("false")
    const [channelName, setChannelName] = useState("")
    const [id, setId] = useState("")
    const [pw, setPw] = useState("")
    const [port, setPort] = useState(5984)
    const [name, setName] = useState("")
    const [currentSel, setCurrentSel] = useState([])
    const handleClose = () => {
        props.onClose && props.onClose();
        setChannelName("")
        setId("")
        setPw("")
        setPort(5984)
        setName("")
    };
    const inputProps = { min: 0, max: 65535 }
    const handleCreateAlert = () => {
        let swal_text = ""
        if (state === "add") {
            swal_text = "추가하시겠습니까?"
        } else if (state === "modify") {
            swal_text = "수정하시겠습니까?"
        }
        return Swal.fire({
            text: swal_text,
            width: 270,
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText: '취소',
        }).then((result) => {
            if (result.isConfirmed) {
                let list = []
                currentSel.map((tmp) => {
                    list.push(networkStore.peerList[tmp])
                })


                const channelList = {
                    channelName: channelName,
                    DBinfo: {
                        name: name,
                        id: id,
                        pw: pw,
                        port: 5984
                    },
                    peerList: list,
                    peerCnt: currentSel.length,
                    dbName: "Couch DB"
                }
                console.log(channelList, "channelList")
                if (state === "add") {
                    networkStore.channelInfo.push(channelList)
                }
                else if (state === "modify") {
                    networkStore.channelInfo[modifyIdx] = channelList
                }
                handleClose()
            } else if (result.isDenied) {

                console.log("취소")
            }
        });
        // swalConfirm("추가하시겠습니까??");
    }

    const handleChange = (event) => {
        let newlang = event.target.value;
        setValue(newlang);
        // i18n.changeLanguage(newlang);
    };
    const date = new Date();
    const handleChange2 = (event) => {
        orgStore.orgSelectCA = (event.target.value);

    };


    useEffect(() => {
        console.log(state, "state")
        setCurrentSel([])
        if (state === "modify" && modifyIdx > -1) {

            setChannelName(networkStore.channelInfo[modifyIdx].channelName)
            setId(networkStore.channelInfo[modifyIdx].DBinfo.id)
            setPw(networkStore.channelInfo[modifyIdx].DBinfo.pw)
            setPort(networkStore.channelInfo[modifyIdx].DBinfo.port)
            setName(networkStore.channelInfo[modifyIdx].DBinfo.name)
        }

    }, [state])
    // const { columns, rows, state } = props

    const [editRowsModel, setEditRowsModel] = React.useState({});
    const handleEditRowsModelChange = React.useCallback((model) => {
        setEditRowsModel(model);
        const listidx = Object.keys(model)[0]
        const temp = Object.values(model)[0]
        const listKey = Object.keys(temp)[0]
        const listValue = Object.values(temp)[0].value

    }, []);
    const handleRowsModelSelect = React.useCallback((idx) => {
        setCurrentSel(idx)
        console.log(idx)
        // let list = []
        // idx.map((tmp) => {
        //     networkStore.channelPeerList.push(networkStore.peerList[tmp])
        // })
        // networkStore.setChannelList(channelName, name, id, pw, port, this.networkStore.channelPeerList)
        // console.log(networkStore.channelList)
        // networkStore.curSelOderer = ids[0]
        // console.log(networkStore.curSelOderer, "1111")
        // delete networkStore.ordererList[ids[0]]
        // console.log(networkStore.ordererList, "networkStore.ordererList")
    }, []);
    //     console.log(selectedRows)
    let list = networkStore.peerList.map((item, idx) => {
        return (
            { ...item, "id": idx }
        )
    })

    const rows = list

    const columns = [
        { field: 'caUser', headerName: 'Peer 이름', flex: 1, editable: false, filterable: false, },
        { field: 'caPw', headerName: 'Peer 설정', flex: 1, editable: false, filterable: false },
        {
            field: 'cpu',
            headerName: 'Cpu',
            type: 'number',
            editable: false,
            flex: 1,
            filterable: false
        },
        {
            field: 'memory',
            headerName: 'Memory',
            type: 'number',
            editable: false,
            flex: 1,
            filterable: false
        },
        {
            field: 'storage',
            headerName: 'Storage',
            type: 'number',
            editable: false,
            flex: 1,
            filterable: false
        },
    ];
    const dbList = [
        {
            name: 'LevelDB',
            onClick: () => {
                setDbName('LevelDB')
                setDbView("false")
                changeDbName
            },
        },
        {
            name: 'CouchDB',
            onClick: () => {
                setDbName('CouchDB')
                setDbView("true")
                changeDbName
            },
        },
    ]

    return (
        <CDialog
            id="myDialog"
            open={open}
            maxWidth="sm"
            title={`Channel 설정`}
            onClose={handleClose}
            onCustom={handleCreateAlert}
            modules={['custom', 'close']}
        >
            <FormTitle>Channel 설정</FormTitle>
            <table className="tb_data tb_write">
                <tbody>
                    <tr>
                        <th style={{ width: "20%" }}>Channel 네임</th>
                        <td>
                            <CTextField
                                id="template-name"
                                type="text"
                                placeholder="Channel Servcie Name"
                                className="form_fullWidth"
                                onChange={(e) => { setChannelName(e.target.value) }}
                                value={channelName}
                            />
                        </td>
                    </tr>
                    {/* <tr>
                        <th>DB 설정</th>
                        <td>
                            <CSelectButton
                                items={dbList}
                            >
                                {dbName}
                            </CSelectButton>

                        </td>
                    </tr> */}
                </tbody>
            </table>

            {/* {dbView === "true" ?
                <> */}
            <div style={{ margin: "20px" }}></div>
            <FormTitle>CouchDB 설정</FormTitle>
            <table className="tb_data tb_write">
                <tbody>
                    <tr>
                        <th style={{ width: "20%" }}>DB 유저</th>
                        <td>
                            <CTextField
                                id="template-name"
                                type="text"
                                placeholder="CouchDB Name"
                                className="form_fullWidth"
                                onChange={(e) => { setName(e.target.value) }}
                                value={name}
                            />
                        </td>
                        <th style={{ width: "20%" }}>DB 포트</th>
                        <td>
                            <CTextField
                                id="template-name"
                                type="number"
                                placeholder="CouchDB Port"
                                className="form_fullWidth"
                                inputProps={inputProps}
                                disabled="disabled"
                                onChange={(e) => { setPort(e.target.value) }}
                                value={port}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th style={{ width: "20%" }}>DB ID</th>
                        <td>
                            <CTextField
                                id="template-name"
                                type="text"
                                placeholder="CouchDB ID"
                                className="form_fullWidth"
                                onChange={(e) => { setId(e.target.value) }}
                                value={id}
                            />
                        </td>
                        <th style={{ width: "20%" }}>DB PW</th>
                        <td>
                            <CTextField
                                id="template-name"
                                type="text"
                                placeholder="CouchDB PW"
                                className="form_fullWidth"
                                onChange={(e) => { setPw(e.target.value) }}
                                value={pw}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>

            {/* </> : <></>} */}

            <div style={{ margin: "20px" }}></div>
            <FormTitle>Channel 참여 Peer 목록</FormTitle>
            <div style={{ height: 200, width: '100%' }}>
                <div style={{ display: 'flex', height: '100%' }}>
                    <div style={{ flexGrow: 1 }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            rowLength={5}
                            checkboxSelection={true}
                            onSelectionModelChange={handleRowsModelSelect}
                        // editRowsModel={editRowsModel}
                        // onEditRowsModelChange={handleEditRowsModelChange}
                        // onSelectionModelChange={handleRowsModelSelect}
                        />
                    </div>
                </div>
            </div>
        </CDialog >
    );
})
export default ChannelAdd;

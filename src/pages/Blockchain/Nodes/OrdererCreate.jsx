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

import nodestore from '../../../Store/NodesStore';
import { observer } from "mobx-react";

import { useHistory } from "react-router";

const OrdererCreate = observer(() => {
    const currentPage = SubTitle.Blockchain.Channels;

    const handleMSP = (event) => {
        nodestore.selectMSP = (event.target.value);
    };

    const handleOrderer = (event) => {
        nodestore.selectOrderer = (event.target.value);
    };

    useEffect(() => {
        if (nodestore.MSPList.length > 0) {
            nodestore.selectMSP = nodestore.MSPList[0].value
        }
        if (nodestore.OrderList.length > 0) {
            nodestore.selectOrderer = nodestore.OrderList[0].value
        }


        return () => { }
    }, [])
    const history = useHistory();

    const ordCreate = () => {
        history.push('/nodes');
    }

    const goBack = () => {
        history.goBack();
    }

    return (
        <Layout currentPage={currentPage}>
            <PanelBox>
                <div className="panelTitBar panelTitBar_clear">
                    <div className="tit">Orderer 생성</div>
                </div>
                <div className="grid-height2">
                    <div className="paperCont">
                        <div>
                            <p style={{ fontSize: "20px", paddingBottom: "10px", fontWeight: "900" }}>Ordering 서비스 MSP 설정</p>
                            <hr />
                        </div>
                        <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                            <p style={{ fontSize: "16px", fontWeight: "500" }}>Orderer MSP</p>
                            <div style={{ width: "50%", padding: "10px" }}>
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    value={nodestore.selectMSP}
                                    onChange={handleMSP}
                                    margin="normal"
                                    size="small"
                                    fullWidth
                                >
                                    {nodestore.MSPList.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.value}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                        </div>
                        <div >
                            <p style={{ fontSize: "20px", paddingBottom: "10px", fontWeight: "900" }}>Ordering Service 구성</p>
                            <hr />
                        </div>
                        <div style={{ paddingTop: "10px" }}>
                            <p style={{ fontSize: "16px", fontWeight: "500" }}>Orderer 기본 설정</p>
                            <div style={{ display: "flex" }}>
                                <div style={{ width: "50%", padding: "10px" }}>
                                    <TextField
                                        required
                                        TextField
                                        fullWidth
                                        margin="normal"
                                        placeholder="Channel Name"
                                        size="small"
                                        value={nodestore.ordererName}
                                        onChange={(e) => { nodestore.ordererName = e.target.value }}
                                    />
                                </div>
                                <div style={{ width: "50%", padding: "10px" }}>
                                    <TextField
                                        id="outlined-select-currency"
                                        select
                                        value={nodestore.selectOrderer}
                                        onChange={handleOrderer}
                                        margin="normal"
                                        size="small"
                                        fullWidth
                                    >
                                        {nodestore.OrderList.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.value}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                            </div>
                            <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                                <p style={{ fontSize: "16px", fontWeight: "500" }}>Raft 설정</p>
                                <div style={{ width: "50%", padding: "10px" }}>
                                    <TextField
                                        required
                                        TextField
                                        fullWidth
                                        margin="normal"
                                        placeholder="1 - N"
                                        size="small"
                                        value={nodestore.Raft}
                                        onChange={(e) => { nodestore.Raft = e.target.value }}
                                    />
                                </div>
                            </div>
                            <p style={{ fontSize: "16px", fontWeight: "500" }}>Orderer 자원 설정</p>
                            <div style={{ display: "flex", fontSize: "14px", paddingBottom: "10px" }}>
                                <div style={{ width: "33.3%", padding: "10px 20px 0px 10px", display: "flex" }}>
                                    <div style={{ margin: "auto", marginRight: "20px" }}>cpu</div>
                                    <TextField
                                        required
                                        TextField
                                        margin="normal"
                                        placeholder="0"
                                        size="small"
                                        fullWidth
                                        value={nodestore.ordererCPU}
                                        onChange={(e) => { nodestore.ordererCPU = e.target.value }}
                                    />
                                    <div style={{ margin: "auto", marginLeft: "20px" }}>core</div>
                                </div>
                                <div style={{ width: "33.3%", padding: "10px 20px 0px 20px", display: "flex" }}>
                                    <div style={{ margin: "auto", marginRight: "20px" }}>memory</div>

                                    <TextField
                                        required
                                        TextField
                                        margin="normal"
                                        placeholder="0"
                                        size="small"
                                        fullWidth
                                        value={nodestore.ordererMemory}
                                        onChange={(e) => { nodestore.ordererMemory = e.target.value }}
                                    />
                                    <div style={{ margin: "auto", marginLeft: "20px" }}>MB</div>

                                </div>
                                <div style={{ width: "33.3%", padding: "10px 10px 0px 20px", display: "flex" }}>
                                    <div style={{ margin: "auto", marginRight: "20px" }}>storage</div>
                                    <TextField
                                        required
                                        TextField
                                        margin="normal"
                                        placeholder="0"
                                        size="small"
                                        fullWidth
                                        value={nodestore.ordererStorage}
                                        onChange={(e) => { nodestore.ordererStorage = e.target.value }}
                                    />
                                    <div style={{ margin: "auto", marginLeft: "20px" }}> GB</div>
                                </div>
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
                        <Button onClick={ordCreate} variant="outlined">
                            변경
                        </Button>
                    </Box>
                </div>
            </PanelBox>
        </Layout >
    );
})
export default OrdererCreate;

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

import nodestore from '../../../Store/NodesStore';
import { observer } from "mobx-react";

const PeerCreate = observer(() => {
    const currentPage = SubTitle.Blockchain.Channels;

    const handleDB = (event) => {
        nodestore.selectDB = (event.target.value);
    };
    const handleGPU = (event) => {
        nodestore.selectGPU = (event.target.value);
    }
    const handleCSD = (event) => {
        nodestore.selectCSD = (event.target.value);
    }

    useEffect(() => {

        if (nodestore.DBList.length > 0) {
            nodestore.selectDB = nodestore.DBList[0].value
        }

        if (nodestore.GPUList.length > 0) {
            nodestore.selectGPU = nodestore.GPUList[0].value
        }

        if (nodestore.CSDList.length > 0) {
            nodestore.selectCSD = nodestore.CSDList[0].value
        }

        return () => { }
    }, [])

    const history = useHistory();
    const peerCreate = () => {
        history.push('/nodes');
    }
    const goBack = () => {
        history.goBack();
    }

    return (
        <Layout currentPage={currentPage}>
            <PanelBox>
                <div className="panelTitBar panelTitBar_clear">
                    <div className="tit">Peer 생성</div>
                </div>
                <div className="grid-height2">
                    <div style={{ padding: "30px" }}>
                        <div>
                            <p style={{ fontSize: "20px", paddingBottom: "10px", fontWeight: "900" }}>Peer 구성</p>
                            <hr />
                        </div>
                        <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                            <p style={{ fontSize: "16px", fontWeight: "500" }}>Peer 기본 설정</p>
                            <div style={{ display: "flex" }}>
                                <div style={{ width: "50%", paddingLeft: "10px", paddingRight: "10px", paddingTop: "10px" }}>
                                    <TextField
                                        required
                                        TextField
                                        fullWidth
                                        margin="normal"
                                        placeholder="Peer Name"
                                        size="small"
                                        value={nodestore.peerName}
                                        onChange={(e) => { nodestore.peerName = e.target.value }}
                                    />
                                </div>
                                <div style={{ width: "50%", paddingLeft: "10px", paddingRight: "10px", paddingTop: "10px" }}>
                                    <TextField
                                        required
                                        TextField
                                        fullWidth
                                        margin="normal"
                                        placeholder="CA 사용자 ID(peer)"
                                        size="small"
                                        value={nodestore.CAUserID}
                                        onChange={(e) => { nodestore.CAUserID = e.target.value }}
                                    />
                                </div>
                            </div>
                            <div style={{ display: "flex" }}>
                                <div style={{ width: "50%", paddingLeft: "10px", paddingRight: "10px" }}>
                                    <TextField
                                        id="outlined-select-currency"
                                        select
                                        margin="normal"
                                        size="small"
                                        fullWidth
                                        value={nodestore.selectDB}
                                        onChange={handleDB}
                                    >
                                        {nodestore.DBList.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.value}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                <div style={{ width: "50%", paddingLeft: "10px", paddingRight: "10px" }}>
                                    <TextField
                                        required
                                        TextField
                                        fullWidth
                                        margin="normal"
                                        placeholder="CA 사용자 비밀번호(peer)"
                                        size="small"
                                        type="password"
                                        value={nodestore.CAUserPASS}
                                        onChange={(e) => { nodestore.CAUserPASS = e.target.value }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                            <p style={{ fontSize: "16px", fontWeight: "500" }}>Peer 유형 설정</p>
                            <div style={{ display: "flex" }}>
                                <div style={{ width: "50%", marginTop: "auto", marginBottom: "auto", padding: "10px" }}>
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox defaultChecked />} label="Endorsing Peer" />
                                        <FormControlLabel control={<Checkbox />} label="Committing Peer" />
                                    </FormGroup>
                                </div>
                            </div>
                        </div>
                        <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                            <p style={{ fontSize: "16px", fontWeight: "500" }}>Peer 자원 설정</p>
                            <div style={{ display: "flex", fontSize: "15px" }}>
                                <div style={{ width: "33.3%", display: "flex", padding: "10px 20px 0px 10px" }}>
                                    <div style={{ margin: "auto", marginRight: "20px" }}>cpu</div>
                                    <TextField
                                        required
                                        TextField
                                        margin="normal"
                                        placeholder="0"
                                        size="small"
                                        fullWidth
                                        value={nodestore.peervCPU}
                                        onChange={(e) => { nodestore.peervCPU = e.target.value }}
                                    />
                                    <div style={{ margin: "auto", marginLeft: "20px" }}>core</div>
                                </div>
                                <div style={{ width: "33.3%", display: "flex", padding: "10px 20px 0px 20px" }}>
                                    <div style={{ margin: "auto", marginRight: "20px" }}>memory</div>
                                    <TextField
                                        required
                                        TextField
                                        margin="normal"
                                        placeholder="0"
                                        size="small"
                                        fullWidth
                                        value={nodestore.peerMemory}
                                        onChange={(e) => { nodestore.peerMemory = e.target.value }}
                                    />
                                    <div style={{ margin: "auto", marginLeft: "20px" }}>MB</div>
                                </div>
                                <div style={{ width: "33.3%", display: "flex", padding: "10px 10px 0px 20px" }}>
                                    <div style={{ margin: "auto", marginRight: "20px" }}>storage</div>
                                    <TextField
                                        required
                                        TextField
                                        margin="normal"
                                        placeholder="0"
                                        size="small"
                                        fullWidth
                                        value={nodestore.peerStorage}
                                        onChange={(e) => { nodestore.peerStorage = e.target.value }}
                                    />
                                    <div style={{ margin: "auto", marginLeft: "20px" }}> GB</div>
                                </div>
                            </div>
                            <div style={{ display: "flex", fontSize: "14px" }}>
                                <div style={{ width: "50%", display: "flex", padding: "10px 20px 0px 10px" }}>
                                    <div style={{ margin: "auto", marginRight: "20px" }}>GPU</div>
                                    <TextField
                                        id="outlined-select-currency"
                                        select
                                        value={nodestore.selectGPU}
                                        onChange={handleGPU}
                                        margin="normal"
                                        size="small"
                                        fullWidth
                                    >
                                        {nodestore.GPUList.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.value}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                <div style={{ width: "50%", display: "flex", padding: "10px 10px 0px 20px" }}>
                                    <div style={{ margin: "auto", marginRight: "20px" }}>CSD</div>
                                    <TextField
                                        id="outlined-select-currency"
                                        select
                                        value={nodestore.selectCSD}
                                        onChange={handleCSD}
                                        margin="normal"
                                        size="small"
                                        fullWidth
                                    >
                                        {nodestore.CSDList.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.value}
                                            </MenuItem>
                                        ))}
                                    </TextField>
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
                        <Button onClick={peerCreate} variant="outlined">
                            생성
                        </Button>
                    </Box>
                </div>
            </PanelBox>
        </Layout >
    );
})
export default PeerCreate;

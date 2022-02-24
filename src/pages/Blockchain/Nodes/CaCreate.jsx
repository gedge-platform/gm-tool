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
import Checkbox from '@mui/material/Checkbox';

import nodestore from '../../../Store/NodesStore';
import { observer } from "mobx-react";

const CaCreate = observer(() => {
    const currentPage = SubTitle.Blockchain.Channels;

    const handleChange = (event) => {
        nodestore.selectDB = (event.target.value);
    };

    useEffect(() => {
        if (nodestore.DBList.length > 0) {
            nodestore.selectDB = nodestore.DBList[0].value
        }
        return () => { }
    }, [])
    const history = useHistory();
    const caCreate = () => {
        //생성
        history.push('/nodes');
    }
    const goBack = () => {
        history.goBack();
    }

    return (
        <Layout currentPage={currentPage}>
            <PanelBox>
                <div className="panelTitBar panelTitBar_clear">
                    <div className="tit">CA 생성</div>
                </div>
                <div className="grid-height2">
                    <div style={{ padding: "30px" }}>
                        <div>
                            <p style={{ fontSize: "20px", paddingBottom: "10px", fontWeight: "900" }}>CA 설정</p>
                            <hr />
                        </div>
                        <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                            <p style={{ fontSize: "16px", fontWeight: "500" }}>CA 기본 설정</p>
                            <div style={{ display: "flex" }}>
                                <div style={{ width: "50%", paddingLeft: "10px", paddingRight: "10px", paddingTop: "10px" }}>
                                    <TextField
                                        required
                                        TextField
                                        fullWidth
                                        margin="normal"
                                        placeholder="CA Name"
                                        size="small"
                                        value={nodestore.CAName}
                                        onChange={(e) => { nodestore.CAName = e.target.value }}
                                    />
                                </div>
                                <div style={{ width: "50%", paddingLeft: "10px", paddingRight: "10px", paddingTop: "10px" }}>
                                    <TextField
                                        required
                                        TextField
                                        fullWidth
                                        margin="normal"
                                        placeholder="CA 관리자 ID"
                                        size="small"
                                        value={nodestore.CAManageID}
                                        onChange={(e) => { nodestore.CAManageID = e.target.value }}
                                    />
                                </div>
                            </div>
                            <div style={{ display: "flex" }}>
                                <div style={{ width: "50%", paddingLeft: "10px", paddingRight: "10px" }}>
                                    <TextField
                                        id="outlined-select-currency"
                                        select
                                        value={nodestore.selectDB}
                                        onChange={handleChange}
                                        margin="normal"
                                        size="small"
                                        fullWidth
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
                                        placeholder="CA 관리자 비밀번호"
                                        size="small"
                                        type="password"
                                    />
                                </div>
                            </div>
                        </div>
                        <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                            <p style={{ fontSize: "16px", fontWeight: "500" }}>CA 자원 설정</p>
                            <div style={{ display: "flex", fontSize: "14px" }}>
                                <div style={{ width: "33.3%", marginTop: "auto", marginBottom: "auto", display: "flex", padding: "10px 20px 0px 10px" }}>
                                    <div style={{ margin: "auto", marginRight: "20px" }}>cpu</div>
                                    <TextField
                                        required
                                        TextField
                                        margin="normal"
                                        placeholder="0"
                                        size="small"
                                        fullWidth
                                        value={nodestore.CACPU}
                                        onChange={(e) => { nodestore.CACPU = e.target.value }}
                                    />
                                    <div style={{ margin: "auto", marginLeft: "20px" }}>core</div>
                                </div>
                                <div style={{ width: "33.3%", marginTop: "auto", marginBottom: "auto", display: "flex", padding: "10px 20px 0px 20px" }}>
                                    <div style={{ margin: "auto", marginRight: "20px" }}>memory</div>
                                    <TextField
                                        required
                                        TextField
                                        margin="normal"
                                        placeholder="0"
                                        size="small"
                                        fullWidth
                                        value={nodestore.CAMemory}
                                        onChange={(e) => { nodestore.CAMemory = e.target.value }}
                                    />
                                    <div style={{ margin: "auto", marginLeft: "20px" }}>MB</div>
                                </div>
                                <div style={{ width: "33.3%", marginTop: "auto", marginBottom: "auto", display: "flex", padding: "10px 10px 0px 20px" }}>
                                    <div style={{ margin: "auto", marginRight: "20px" }}>storage</div>
                                    <TextField
                                        required
                                        TextField
                                        margin="normal"
                                        placeholder="0"
                                        size="small"
                                        fullWidth
                                        value={nodestore.CAStorage}
                                        onChange={(e) => { nodestore.CAStorage = e.target.value }}
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
                        <Button onClick={caCreate} variant="outlined">
                            생성
                        </Button>
                    </Box>
                </div>
            </PanelBox>
        </Layout >
    );
})
export default CaCreate;

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

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { fontWeight } from '@mui/system';
import networkStore from '../../../Store/NetworkStore';
import { observer } from "mobx-react";

const steps = ['블록체인 네트워크 기본 정보', 'Orderer 설정', 'Peer 설정', 'Channel', '설정', '검토 및 생성'];

const NetworkCreateBasicInfo = observer(() => {

    const currentPage = SubTitle.Blockchain.Networks;
    const [blockName, setBlockName] = React.useState("");
    const [blockFramework, setBlockFramework] = React.useState("");
    const handleChange = (event) => {
        setBlockName(event.target.value)
        networkStore.setNetworkInfo(event.target.value, blockFramework)

    };
    const handleChange2 = (event) => {
        setBlockFramework(event.target.value)
        networkStore.setNetworkInfo(blockName, event.target.value)

    };

    useEffect(() => {
        if (networkStore.netFrameworkList.length > 0) {
            setBlockFramework(networkStore.netFrameworkList[0].value)
            // networkStore.blockFrameWork = networkStore.netFrameworkList[0].value;
        }
        return () => {
        }
    }, [])

    return (
        <>
            <div>
                <p style={{ fontSize: "20px", paddingBottom: "10px", fontWeight: "900" }}>블록체인 네트워크 기본 설정</p>
                <p style={{ paddingBottom: "10px", paddingTop: "10px" }}>블록체인 네트워크 설정을 위한 기본 정보를 입력하세요.</p>
                <hr />
            </div>

            <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                <p style={{ fontSize: "16px", fontWeight: "500" }}>블록체인 네트워크 이름</p>
                <div style={{ padding: "10px" }}>
                    <TextField
                        required
                        TextField
                        fullWidth
                        margin="normal"
                        placeholder="블록체인 네트워크 이름을 입력하세요."
                        size="small"
                        value={networkStore.blockNetInfo.blockNetName}
                        onChange={handleChange}
                    />
                </div>
            </div >
            <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                <p style={{ fontSize: "16px", fontWeight: "500" }}>블록체인 프레임워크</p>
                <div style={{ padding: "10px" }}>
                    <TextField
                        id="outlined-select-currency"
                        select
                        value={networkStore.blockNetInfo.blockFrameWork}
                        onChange={handleChange2}
                        fullWidth
                        margin="normal"
                        size="small"
                    >
                        {networkStore.netFrameworkList.map((option) => (
                            <MenuItem key={option.label} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
            </div>
        </>
    );
})
export default NetworkCreateBasicInfo;

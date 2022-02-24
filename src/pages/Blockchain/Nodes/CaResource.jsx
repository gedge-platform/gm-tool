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

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { useHistory } from "react-router";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ClusterMonit from '../../Management/ClusterCont/ClusterMonit';
import { LineChart, Line, AreaChart, linearGradient, defs, XAxis, YAxis, CartesianGrid, Tooltip, Area, Legend, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';

const TextContainer = styled.div`
  position: absolute;
  left: 10%;
  top: 15%;
  transform: translate(-50%, -50%);

  p:first-child {
    white-space: nowrap;
    font-weight: 300;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
    letter-spacing: -0.5px;
    color: #000000;
  }
`;

const CaResource = () => {
    const currentPage = SubTitle.Blockchain.Channels;

    const handleModifyOpen = (e) => {
        const fieldName = e.colDef.field;
        if (fieldName === "action") {
            // setOpen(true);
            alert("haha");
        }
    };

    const history = useHistory();

    const channelCreate = () => {
        history.push('/channels/create');
    }

    const goBack = () => {
        history.goBack();
    }

    const [rowData] = useState([
        {
            ordername: "name1",
            containername: "Block-orderer1",
            cpu: "1",
            memory: "512",
            storage: "100",
            action: "",
        },
        {
            ordername: "name2",
            containername: "Block-orderer2",
            cpu: "2",
            memory: "1024",
            storage: "200",
            action: "",
        },
        {
            ordername: "name3",
            containername: "Block-orderer3",
            cpu: "4",
            memory: "2048",
            storage: "300",
            action: "",
        },
    ]);
    const [columnDefs] = useState([
        {
            headerName: 'Orderer Name',
            field: 'orderername',
            filter: true,
        },
        {
            headerName: 'Container Name',
            field: 'containername',
            filter: true,
        },
        {
            headerName: 'CPU (vCPU)',
            field: 'cpu',
            filter: true,
        },
        {
            headerName: 'Memory (MB)',
            field: 'memory',
            filter: true,
        },
        {
            headerName: 'Storage (GB)',
            field: 'storage',
            filter: true,
        },
        {
            headerName: '비고',
            field: 'action',
            filter: true,
            cellRenderer: function () {
                return `<button>변경</button>`;
            }
        },
    ]);

    const data = [
        {
            "name": "Page A",
            "uv": 4000,
            "pv": 2400,
            "amt": 2400
        },
        {
            "name": "Page B",
            "uv": 3000,
            "pv": 1398,
            "amt": 2210
        },
        {
            "name": "Page C",
            "uv": 2000,
            "pv": 9800,
            "amt": 2290
        },
        {
            "name": "Page D",
            "uv": 2780,
            "pv": 3908,
            "amt": 2000
        },
        {
            "name": "Page E",
            "uv": 1890,
            "pv": 4800,
            "amt": 2181
        },
        {
            "name": "Page F",
            "uv": 2390,
            "pv": 3800,
            "amt": 2500
        },
        {
            "name": "Page G",
            "uv": 3490,
            "pv": 4300,
            "amt": 2100
        }
    ]

    return (
        <Layout currentPage={currentPage}>
            <PanelBox>
                <div className="panelTitBar panelTitBar_clear">
                    <div className="tit">CA 리소스 관리</div>
                </div>
                <div className="grid-height2">
                    <div style={{ padding: "30px" }}>
                        <div>
                            <p style={{ fontSize: "20px", paddingBottom: "10px" }}>리소스 크기 변경</p>
                            <hr />
                            <p style={{ fontSize: "15px", paddingBottom: "10px", paddingTop: "15px" }}>Container 정보</p>
                            <div className="grid-height_5">
                                <AgGrid
                                    rowData={rowData}
                                    columnDefs={columnDefs}
                                    onCellClicked={handleModifyOpen}
                                />
                            </div>
                            <br />
                        </div>
                        <div>
                            <p style={{ fontSize: "20px", paddingBottom: "10px", paddingTop: "10px" }}>리소스 모니터링</p>
                            <hr />
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <div style={{ height: "300px", width: "50%", position: "relative" }}>

                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart width={800} height={340} data={data}
                                        margin={{ top: 80, right: 10, left: 10, bottom: 20 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                                        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                                    </LineChart>
                                </ResponsiveContainer>
                                ️<TextContainer>
                                    <p>CPU</p>
                                </TextContainer>
                            </div>

                            <div style={{ height: "300px", width: "50%", position: "relative" }}>

                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart width={800} height={340} data={data}
                                        margin={{ top: 80, right: 10, left: 10, bottom: 20 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                                        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                                    </LineChart>
                                </ResponsiveContainer>
                                ️<TextContainer>
                                    <p>Memory</p>
                                </TextContainer>
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
export default CaResource;

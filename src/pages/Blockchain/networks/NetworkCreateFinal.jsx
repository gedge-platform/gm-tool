import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import networkStore from '../../../Store/NetworkStore';
import { observer } from "mobx-react";
const DivTitle = styled.div`
width: 50%;
font-family: "Roboto","Helvetica","Arial",sans-serif;
font-family: "Roboto","Helvetica","Arial",sans-serif;
font-weight: 500;
font-size: 0.875rem;
letter-spacing: 0.01071em;
text-align: center;
color: rgba(0, 0, 0, 0.87);
    `;
const DivInner = styled.div`
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    font-weight: 400;
    font-size: 0.875rem;
    letter-spacing: 0.01071em;
    vertical-align: inherit;
    text-align: left;
    color: rgba(0, 0, 0, 0.87);
    width: 25%;
    `;
function createOrdererData(name, setting, cpu, memory, storage) {
    return { name, setting, cpu, memory, storage };
}

function createPeerData(name, db, cpu, memory, storage) {
    return { name, db, cpu, memory, storage };
}

function createChannelData(name, peers) {
    return { name, peers };
}

function ordererCheck(check) {
    console.log(check, "ordererCheck")
    let List = []
    if (check == "true") {
        List = [createOrdererData('orderer1', 'Raft 1', 2, 512, 100),
        createOrdererData('orderer1', 'Raft 5', 2, 512, 100)]
        return List

    } else {
        return List
    }
}
function peerCheck(check) {
    console.log(check, "peerCheck")
    let List = []
    if (check == "true") {
        List = [createPeerData('Peer1', 'LevelDB', 2, 512, 100),
        createPeerData('peer2', 'CouchDB', 2, 512, 100),]
        return List
    } else {
        return List
    }
}
function channelCheck(check) {
    console.log(check, "channelCheck")
    let List = []
    if (check == "true") {
        List = [createChannelData('channel1', 2),
        createChannelData('channel2', 3),]
        return List

    } else {
        return List
    }
}


const NetworkCreateFinal = observer(() => {
    const orderers = ordererCheck(networkStore.orderCheck)
    const peers = peerCheck(networkStore.peerCheck)
    const channels = channelCheck(networkStore.channelCheck)
    return (
        <>
            <div>
                <p style={{ fontSize: "20px", paddingBottom: "10px", fontWeight: "900" }}>Summary</p>
                <p style={{ paddingBottom: "10px", paddingTop: "10px" }}>설정 정보 확인후 생성 버튼을 클릭하세요.</p>
                <hr />
            </div>
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                <p style={{ fontSize: "16px", fontWeight: "500" }}>Network</p>
                <div style={{ border: "1px solid gray", padding: "5px", width: "98%", margin: "auto", marginTop: "10px" }}>
                    <TableContainer component={"span"}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Network Name</TableCell>
                                    <TableCell align="center">Framework</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                <TableRow
                                    key={networkStore.blockNetInfo.blockNetName}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" align="center">
                                        {networkStore.blockNetInfo.blockNetName}
                                    </TableCell>
                                    <TableCell align="center">{networkStore.blockNetInfo.blockFrameWork}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
            {/* <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                <p style={{ fontSize: "16px", fontWeight: "500" }}>Root CA</p>
                <div style={{ border: "1px solid gray", padding: "5px", width: "98%", margin: "auto", marginTop: "10px" }}>
                    <TableContainer component={"span"}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">RootCA 이름</TableCell>
                                    <TableCell align="center">RootCA DB</TableCell>
                                    <TableCell align="center">RootCA ID</TableCell>
                                    <TableCell align="center">RootCA MSP</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                <TableRow
                                    key={networkStore.ordererInfo.rootCaName}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" align="center">
                                        {networkStore.ordererInfo.rootCaName}
                                    </TableCell>
                                    <TableCell align="center">{networkStore.ordererInfo.rootCaDB}</TableCell>
                                    <TableCell align="center">{networkStore.ordererInfo.rootCaId}</TableCell>
                                    <TableCell align="center">{networkStore.ordererInfo.rootCaMSP}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div> */}
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                <p style={{ fontSize: "16px", fontWeight: "500" }}>Orderer</p>
                <div style={{ border: "1px solid gray", padding: "5px", width: "98%", margin: "auto", marginTop: "10px" }}>
                    <TableContainer component={"span"}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Orderer Name</TableCell>
                                    <TableCell align="center">Raft</TableCell>
                                    <TableCell align="center">cpu</TableCell>
                                    <TableCell align="center">memory</TableCell>
                                    <TableCell align="center">storage</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                <TableRow
                                    key={networkStore.ordererInfo.ordererName}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" align="center">
                                        {networkStore.ordererInfo.ordererName}
                                    </TableCell>
                                    <TableCell align="center">{networkStore.ordererInfo.raft}</TableCell>
                                    <TableCell align="center">{networkStore.ordererInfo.cpu}</TableCell>
                                    <TableCell align="center">{networkStore.ordererInfo.memory}</TableCell>
                                    <TableCell align="center">{networkStore.ordererInfo.storage}</TableCell>
                                </TableRow>

                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
            {/* <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                <p style={{ fontSize: "16px", fontWeight: "500" }}>Organization</p>
                <div style={{ border: "1px solid gray", padding: "5px", width: "98%", margin: "auto", marginTop: "10px" }}>
                    <TableContainer component={"span"}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Organization Name</TableCell>
                                    <TableCell align="center">Organization CA Name</TableCell>
                                    <TableCell align="center">Organization CA Name</TableCell>
                                    <TableCell align="center">Organization CA DB</TableCell>
                                    <TableCell align="center">Organization MSP Name</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                <TableRow
                                    key={networkStore.peerInfo.orgName}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" align="left">
                                        {networkStore.peerInfo.orgName}
                                    </TableCell>
                                    <TableCell align="center">{networkStore.peerInfo.orgCaName}</TableCell>
                                    <TableCell align="center">{networkStore.peerInfo.orgCaDB}</TableCell>
                                    <TableCell align="center">{networkStore.peerInfo.memory}</TableCell>
                                    <TableCell align="center">{networkStore.ordererInfo.memory}</TableCell>
                                </TableRow>

                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div> */}
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                <p style={{ fontSize: "16px", fontWeight: "500" }}>Organization</p>
                <div style={{ display: "flex", fontSize: "15px", border: "1px solid gray", padding: "15px", width: "98%", margin: "auto", marginTop: "10px" }}>
                    <DivTitle >Organization Name</DivTitle>
                    <DivInner >{networkStore.peerInfo.orgName}</DivInner>
                </div>
            </div>
            {/* <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                <p style={{ fontSize: "16px", fontWeight: "500" }}>Organization CA</p>
                <div style={{ display: "flex", fontSize: "15px", border: "1px solid gray", padding: "15px", width: "98%", margin: "auto", marginTop: "10px" }}>
                    <div style={{ width: "25%" }}>Organization CA Name</div>
                    <div style={{ width: "25%" }}>{networkStore.peerInfo.orgCaName}</div>
                    <div style={{ width: "25%" }}>CA 데이터베이스</div>
                    <div style={{ width: "25%" }}>{networkStore.peerInfo.orgCaDB}</div>
                </div>
            </div>
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                <p style={{ fontSize: "16px", fontWeight: "500" }}>Organization MSP</p>
                <div style={{ display: "flex", fontSize: "15px", border: "1px solid gray", padding: "15px", width: "98%", margin: "auto", marginTop: "10px" }}>
                    <div style={{ width: "25%" }}>Organization MSP Name</div>
                    <div style={{ width: "25%" }}>{networkStore.peerInfo.orgMSP}</div>
                </div>
            </div> */}

            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                <p style={{ fontSize: "16px", fontWeight: "500" }}>Peer</p>
                <div style={{ border: "1px solid gray", padding: "5px", width: "98%", margin: "auto", marginTop: "10px" }}>
                    <TableContainer component={'span'}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Peer 이름</TableCell>
                                    <TableCell align="center">cpu</TableCell>
                                    <TableCell align="center">memory</TableCell>
                                    <TableCell align="center">storage</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>


                                {networkStore.peerInfo.peerList.map((row) => (
                                    <TableRow
                                        key={row.peerName}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" align="center">
                                            {row.peerName}
                                        </TableCell>
                                        <TableCell align="center">{row.cpu}</TableCell>
                                        <TableCell align="center">{row.memory}</TableCell>
                                        <TableCell align="center">{row.storage}</TableCell>
                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                <p style={{ fontSize: "16px", fontWeight: "500" }}>Couch DB</p>
                <div style={{ border: "1px solid gray", padding: "5px", width: "98%", margin: "auto", marginTop: "10px" }}>
                    <TableContainer component={'span'}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">DB 이름</TableCell>

                                    <TableCell align="center">DB ID</TableCell>
                                    <TableCell align="center">DB Port</TableCell>
                                    {/* <TableCell align="center">storage</TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                <TableRow
                                    key={networkStore.channelInfo.DBinfo.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" align="center">
                                        {networkStore.channelInfo.DBinfo.name}
                                    </TableCell>

                                    <TableCell align="center">{networkStore.channelInfo.DBinfo.id}</TableCell>
                                    <TableCell align="center">{networkStore.channelInfo.DBinfo.port}</TableCell>
                                    {/* <TableCell align="center">{networkStore.channelInfo.DBinfo}</TableCell> */}
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                <p style={{ fontSize: "16px", fontWeight: "500" }}>Channel</p>
                <div style={{ border: "1px solid gray", padding: "5px", width: "98%", margin: "auto", marginTop: "10px" }}>
                    <TableContainer component={'div'}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Channel 이름</TableCell>
                                    <TableCell align="center">Channel에 등록된 Peer 수</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow
                                    key={networkStore.channelInfo.channelName}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" align="center">
                                        {networkStore.channelInfo.channelId}
                                    </TableCell>
                                    <TableCell align="center">{networkStore.peerInfo.peerList.length}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </>
    );
})
export default NetworkCreateFinal;

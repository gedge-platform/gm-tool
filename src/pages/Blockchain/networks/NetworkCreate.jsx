import React, { useState, useEffect } from 'react';
import Layout from "@/layout";
import { Title, SubTitle } from '@/pages';
import { PanelBox } from "@/components/styles/PanelBox";
import Swal from "sweetalert2";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import NetworkCreateBasicInfo from './NetworkCreateBasicInfo'
import NetworkCreateOrderer from './NetworkCreateOrderer'
import NetworkCreatePeer from './NetworkCreatePeer'
import NetworkCreateChannel from './NetworkCreateChannel'
import NetworkCreateFinal from './NetworkCreateFinal'
import networkStore from '../../../Store/NetworkStore';
import { observer } from "mobx-react";
import { useHistory } from "react-router";

const steps = ['블록체인 네트워크 기본 정보', 'Orderer 설정', 'Peer 설정', 'Channel 설정', '검토 및 생성'];

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NetworkCreate = observer(() => {
    //snackbar
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen2(false);
    };
    const handleClose2 = () => {
        setOpen(false);

    };

    const currentPage = SubTitle.Blockchain.Networks;
    const currentPageTitle = Title.Blockchain;

    const [activeStep, setActiveStep] = React.useState(0);

    const history = useHistory();

    const handleNext = () => {

        const valid = validCheck()
        if (valid) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }

    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleHome = () => {
        history.push('/networks');
    }

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleCreate = () => {
        // const valid = validCheck()
        // if (valid) {
        //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
        // }
        let odererlist = []
        let channelList = []
        let peerList = []
        let peerInfoList = []
        if (networkStore.ordererSet === "true") {
            let index = networkStore.ordererInfo.raft
            for (var i = 0; i < index; i++) {
                let ran = Math.random().toString(36).substr(2, 11);
                odererlist.push(networkStore.ordererInfo.ordererName + i + "-" + ran)
            }
        }
        if (networkStore.channelSet === "true") {
            channelList.push(networkStore.channelInfo.channelId)
        }
        if (networkStore.peerSet === "true") {
            networkStore.peerInfo.peerList.map((peer) => {
                peerList.push(peer.peerName)
                const peerInfo = {
                    peername: peer.peerName,
                    peerspec: {
                        cpu: peer.cpu,
                        memory: peer.memory,
                        storage: peer.storage
                    }
                }
                peerInfoList.push(peerInfo)
                // peerList.push(peer.)
            })
        }
        const createNetwork = {
            networkname: networkStore.blockNetInfo.blockNetName,
            version: networkStore.blockNetInfo.blockFrameWork,
            ordererlist: odererlist,
            channellist: channelList,
            channelID: networkStore.channelInfo.channelId,
            orglist: [
                {
                    peerlist: peerList,
                    orgname: networkStore.peerInfo.orgName,
                    db: {
                        dbname: networkStore.channelInfo.DBinfo.name,
                        dbid: networkStore.channelInfo.DBinfo.id,
                        dbpwd: networkStore.channelInfo.DBinfo.pw
                    },
                    peer: peerInfoList
                }
            ]
        }
        return Swal.fire({
            text: "생성하시겠습니까?",
            width: 270,
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText: '취소',
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(createNetwork)
                networkStore.setNetwork(createNetwork)
                handleClose2()
                history.push('/networks');
            } else if (result.isDenied) {

                console.log("취소")
            }
        });


        // networkStore.init()
    }

    const [errorMessage, setErrorMessage] = React.useState("");

    const validCheck = () => {
        if (activeStep === 0) {
            if (networkStore.blockNetInfo.blockNetName === "") {
                setErrorMessage("네트워크 이름을 입력하세요.")
                handleClick()
                return false
            }
        }

        if (activeStep === 1 && networkStore.ordererSet === "true") {
            // if (networkStore.ordererInfo.rootCaName === "") {
            //     setErrorMessage("Root CA 이름을 입력하세요.")
            //     handleClick()
            //     return false
            // }
            // if (networkStore.ordererInfo.rootCaId === "") {
            //     setErrorMessage("Root CA 아이디를 입력하세요.")
            //     handleClick()
            //     return false
            // }
            // if (networkStore.ordererInfo.rootCaPw === "") {
            //     setErrorMessage("Root CA 비밀번호를 입력하세요.")
            //     handleClick()
            //     return false
            // }
            // if (networkStore.ordererInfo.rootCaMSP === "") {
            //     setErrorMessage("Root CA MSP 이름을 입력하세요.")
            //     handleClick()
            //     return false
            // }
            if (networkStore.ordererInfo.ordererName === "") {
                setErrorMessage("Orderer 서비스 이름을 입력하세요.")
                handleClick()
                return false
            }
        }

        if (activeStep === 2 && networkStore.peerSet === "true") {
            if (networkStore.peerInfo.orgName === "") {
                setErrorMessage("조직 이름을 입력하세요.")
                handleClick()
                return false
            }
            if (networkStore.peerInfo.peerList.length === 0) {
                setErrorMessage("Peer 정보를 입력하세요.")
                handleClick()
                return false
            }
            // if (networkStore.peerInfo.orgCaName === "") {
            //     setErrorMessage("조직 CA 이름을 입력하세요.")
            //     handleClick()
            //     return false
            // }
            // if (networkStore.peerInfo.orgCaId === "") {
            //     setErrorMessage("조직 CA 아이디를 입력하세요.")
            //     handleClick()
            //     return false
            // }
            // if (networkStore.peerInfo.orgCaPw === "") {
            //     setErrorMessage("조직 CA 비밀번호를 입력하세요.")
            //     handleClick()
            //     return false
            // }
            // if (networkStore.peerInfo.orgMSP === "") {
            //     setErrorMessage("조직 MSP 이름을 입력하세요.")
            //     handleClick()
            //     return false
            // }
        }

        if (activeStep === 3 && networkStore.channelSet === "true") {
            if (networkStore.channelInfo.channelId === "") {
                setErrorMessage("채널 이름을 입력하세요.")
                handleClick()
                return false
            }
            if (networkStore.channelInfo.DBinfo.name === "") {
                setErrorMessage("DB 이름을 입력하세요.")
                handleClick()
                return false
            }
            if (networkStore.channelInfo.DBinfo.id === "") {
                setErrorMessage("DB ID를 입력하세요.")
                handleClick()
                return false
            }
            if (networkStore.channelInfo.DBinfo.pw === "") {
                setErrorMessage("DB PW를 입력하세요.")
                handleClick()
                return false
            }
        }

        return true
    }

    return (
        <Layout currentPageTitle={currentPageTitle} currentPage={currentPage}>
            <PanelBox>
                <div className="panelTitBar panelTitBar_clear">
                    <div className="tit">네트워크 생성</div>
                </div>
                <div className="grid-height2">
                    <Stack spacing={2} sx={{ width: '100%' }}>
                        <Snackbar open={open2} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                                {errorMessage}
                            </Alert>
                        </Snackbar>
                    </Stack>
                    <div className="paperCont">
                        <Stepper activeStep={activeStep}>
                            {steps.map((label, index) => {
                                const stepProps = {};
                                const labelProps = {};
                                return (
                                    <Step key={label} {...stepProps}>
                                        <StepLabel {...labelProps}>{label}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>

                        <React.Fragment>
                            {activeStep === 0 ?
                                <>
                                    <div style={{ display: "flex", flexDirection: "column", padding: "30px" }}>
                                        <NetworkCreateBasicInfo />
                                    </div>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                        <Button
                                            variant="outlined"
                                            onClick={handleHome}
                                            sx={{ mr: 1 }}
                                        >
                                            처음으로
                                        </Button>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        <Button onClick={handleNext} variant="outlined">
                                            {activeStep === steps.length - 1 ? '생성' : '다음'}
                                        </Button>
                                    </Box>
                                </>
                                : <></>}

                            {activeStep === 1 ?
                                <>
                                    <div style={{ padding: "30px", display: "flex", flexDirection: "column" }}>
                                        <NetworkCreateOrderer />
                                    </div>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                        <Button
                                            variant="outlined"
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            sx={{ mr: 1 }}
                                        >
                                            이전
                                        </Button>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        <Button onClick={handleNext} variant="outlined">
                                            {activeStep === steps.length - 1 ? '생성' : '다음'}
                                        </Button>
                                    </Box>
                                </>
                                : <></>}

                            {activeStep === 2 ?
                                <>
                                    <div style={{ padding: "30px", display: "flex", flexDirection: "column" }}>
                                        <NetworkCreatePeer />
                                    </div>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                        <Button
                                            variant="outlined"
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            sx={{ mr: 1 }}
                                        >
                                            이전
                                        </Button>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        <Button onClick={handleNext} variant="outlined">
                                            {activeStep === steps.length - 1 ? '생성' : '다음'}
                                        </Button>
                                    </Box>
                                </>
                                : <></>}

                            {activeStep === 3 ?
                                <>
                                    <div style={{ padding: "30px", display: "flex", flexDirection: "column" }}>
                                        <NetworkCreateChannel />
                                    </div>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                        <Button
                                            variant="outlined"
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            sx={{ mr: 1 }}
                                        >
                                            이전
                                        </Button>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        <Button onClick={handleNext} variant="outlined">
                                            {activeStep === steps.length - 1 ? '생성' : '다음'}
                                        </Button>
                                    </Box>
                                </>
                                : <></>}
                            {activeStep === 4 ?
                                <>
                                    <div style={{ padding: "30px", display: "flex", flexDirection: "column" }}>
                                        <NetworkCreateFinal />
                                    </div>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                        <Button
                                            variant="outlined"
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            sx={{ mr: 1 }}
                                        >
                                            이전
                                        </Button>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        <Button onClick={handleCreate} variant="outlined">
                                            {activeStep === steps.length - 1 ? '생성' : '다음'}
                                        </Button>
                                    </Box>
                                </>
                                : <></>}
                        </React.Fragment>

                    </div>
                </div>
            </PanelBox>
        </Layout >
    );
})
export default NetworkCreate;

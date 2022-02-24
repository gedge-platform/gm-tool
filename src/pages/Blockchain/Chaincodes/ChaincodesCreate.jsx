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

import { useHistory } from "react-router";

import { DropzoneArea } from 'material-ui-dropzone';

const ChaincodesCreate = () => {

    const currentPage = SubTitle.Blockchain.Networks;


    const history = useHistory();
    const chainCodeCreate = () => {
        history.push('/chaincodes');
    }

    const goBack = () => {
        history.goBack();
    }

    return (
        <Layout currentPage={currentPage}>
            <PanelBox>
                <div className="panelTitBar panelTitBar_clear">
                    <div className="tit">Chaincode 생성</div>
                </div>
                <div className="grid-height2">
                    <div style={{ padding: "30px" }}>
                        <div>
                            <p style={{ fontSize: "20px", paddingBottom: "10px" }}>Chaincode 업로드</p>
                            <hr />
                        </div>
                        <DropzoneArea
                            onChange={(files) => console.log('Files:', files)}
                            dropzoneText="마우스로 파일을 끌고 오거나 여기를 클릭하세요. (.cds 포맷)"
                        />
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
                        <Button variant="outlined" onClick={chainCodeCreate}>
                            설치
                        </Button>
                    </Box>
                </div>
            </PanelBox>
        </Layout >
    );
}
export default ChaincodesCreate;

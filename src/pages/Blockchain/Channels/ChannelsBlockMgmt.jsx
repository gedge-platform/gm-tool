import React, { useState, useEffect } from "react";
import Layout from "@/layout";
import { Title, SubTitle } from "@/pages";
import { PanelBox } from "@/components/styles/PanelBox";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { AgGrid } from "@/components/datagrids";
import { agDateColumnFilter } from "@/utils/common-utils";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { useHistory } from "react-router";

const ChannelsBlockMgmt = () => {
  const currentPage = SubTitle.Blockchain.Channels;
  const currentPageTitle = Title.Blockchain;
  const [currency, setCurrency] = React.useState("USD");

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  const [open, setOpen] = React.useState(false);

  //Form Dialogs
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const history = useHistory();
  const channelCreate = () => {
    history.push("/channels/create");
  };
  const goBack = () => {
    history.goBack();
  };

  return (
    <Layout currentPage={currentPage} currentPageTitle={currentPageTitle}>
      <PanelBox>
        <div className="panelTitBar panelTitBar_clear">
          <div className="tit">Channel Block 정책 관리</div>
        </div>
        <div className="grid-height2">
          <div style={{ padding: "30px" }}>
            <div>
              <p style={{ fontSize: "20px", paddingBottom: "10px" }}>
                Block 생성 정책 설정
              </p>
              <hr />
            </div>
            <div>
              <p style={{ fontSize: "15px", marginTop: "15px" }}>
                블록 생성 간격(초)
              </p>
              <div
                style={{
                  width: "50%",
                  marginTop: "auto",
                  marginBottom: "auto",
                }}
              >
                <TextField
                  required
                  TextField
                  fullWidth
                  margin="normal"
                  placeholder="2"
                  size="small"
                />
              </div>
            </div>
            <div>
              <p style={{ fontSize: "15px", marginTop: "15px" }}>
                최대 메시지 수(개)
              </p>
              <div
                style={{
                  width: "50%",
                  marginTop: "auto",
                  marginBottom: "auto",
                }}
              >
                <TextField
                  required
                  TextField
                  fullWidth
                  margin="normal"
                  placeholder="500"
                  size="small"
                />
              </div>
            </div>
            <div>
              <p style={{ fontSize: "15px", marginTop: "15px" }}>
                기준 블록 크기(MB)
              </p>
              <div
                style={{
                  width: "50%",
                  marginTop: "auto",
                  marginBottom: "auto",
                }}
              >
                <TextField
                  required
                  TextField
                  fullWidth
                  margin="normal"
                  placeholder="0.5"
                  size="small"
                />
              </div>
            </div>
            <div>
              <p style={{ fontSize: "15px", marginTop: "15px" }}>
                최대 블록 크기(MB)
              </p>
              <div
                style={{
                  width: "50%",
                  marginTop: "auto",
                  marginBottom: "auto",
                }}
              >
                <TextField
                  required
                  TextField
                  fullWidth
                  margin="normal"
                  placeholder="50"
                  size="small"
                />
              </div>
            </div>
          </div>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              pt: 2,
              padding: "30px",
            }}
          >
            <Button variant="outlined" onClick={goBack} sx={{ mr: 1 }}>
              이전
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={channelCreate} variant="outlined">
              확인
            </Button>
          </Box>
        </div>
      </PanelBox>
    </Layout>
  );
};
export default ChannelsBlockMgmt;

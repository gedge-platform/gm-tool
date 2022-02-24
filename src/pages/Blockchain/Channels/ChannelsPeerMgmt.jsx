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
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { useHistory } from "react-router";

const ChannelsOrgMgmt = (props) => {
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

  const currencies = [
    {
      value: "USD",
      label: "Block-Orderer",
    },
    {
      value: "EUR",
      label: "Block-Orderer",
    },
    {
      value: "BTC",
      label: "Block-Orderer",
    },
    {
      value: "JPY",
      label: "Block-Orderer",
    },
  ];

  const [rowData] = useState([
    {
      peername: "block-peer1",
      orgname: "msp",
      role: "-",
    },
    {
      peername: "block-peer2",
      orgname: "msp",
      role: "-",
    },
    {
      peername: "block-peer3",
      orgname: "msp",
      role: "-",
    },
  ]);
  const [columnDefs] = useState([
    {
      headerName: "Peer 이름",
      field: "peername",
      filter: true,
    },
    {
      headerName: "조직 이름",
      field: "orgname",
      filter: true,
    },
    {
      headerName: "역할",
      field: "role",
      filter: true,
    },
  ]);

  const [peerRowData] = useState([
    {
      peername: "peer1",
      role: "역할",
      check: "참여",
    },
    {
      peername: "peer2",
      role: "역할",
      check: "참여",
    },
    {
      peername: "peer3",
      role: "역할",
      check: "참여",
    },
  ]);
  const [peerColumnDefs] = useState([
    {
      headerName: "조직 이름",
      field: "peername",
      filter: true,
    },
    {
      headerName: "역할",
      field: "role",
      filter: true,
      cellRenderer: function () {
        return `<select name="role" id="role">
                    <option value="Endorsing Peer">Endorsing Peer</option>
                  <option value="Endorsing Peer">Endorsing Peer</option>
                  <option value="Endorsing Peer">Endorsing Peer</option>
                  <option value="Endorsing Peer">Endorsing Peer</option>
                </select>`;
      },
    },
    {
      headerName: "",
      field: "check",
      minWidth: 53,
      maxWidth: 53,
      filter: false,
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
    },
  ]);

  return (
    <Layout currentPage={currentPage} currentPageTitle={currentPageTitle}>
      <PanelBox>
        <div className="panelTitBar panelTitBar_clear">
          <div className="tit">Channel Peer 관리</div>
        </div>
        <div>
          <div style={{ padding: "30px" }}>
            <div>
              <div>
                <p
                  style={{
                    fontSize: "20px",
                    paddingBottom: "10px",
                    paddingTop: "15px",
                  }}
                >
                  Peer 관리
                </p>
              </div>
              <hr />
              <br />
              <div style={{ float: "right" }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button
                  onClick={handleClickOpen}
                  variant="outlined"
                  size="small"
                >
                  관리
                </Button>
              </div>
              <br />
              <p
                style={{
                  fontSize: "15px",
                  paddingBottom: "10px",
                  paddingTop: "15px",
                }}
              >
                현재 등록된 Peer
              </p>
              <div className="grid-height_5">
                <AgGrid rowData={rowData} columnDefs={columnDefs} />
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
              생성
            </Button>
          </Box>
        </div>
      </PanelBox>
      <div style={{ marginTop: "auto", marginBottom: "auto" }}>
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="true"
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Peer 관리"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Table sx={{ minWidth: 650 }} aria-label="caption table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">조직 이름</TableCell>
                    <TableCell align="center">조직 역할</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">msp</TableCell>
                    <TableCell align="center">Operator</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </DialogContentText>
          </DialogContent>
          <DialogTitle id="alert-dialog-title">
            {"Channel 참여 Peer 관리"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <div style={{ height: "200px", padding: "10px" }}>
                <AgGrid rowData={peerRowData} columnDefs={peerColumnDefs} />
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>취소</Button>
            <Button onClick={handleClose}>추가</Button>
          </DialogActions>
        </Dialog>
      </div>
    </Layout>
  );
};
export default ChannelsOrgMgmt;

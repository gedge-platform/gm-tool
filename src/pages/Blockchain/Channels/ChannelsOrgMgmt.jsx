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
      orgname: "msp",
      role: "operator",
      peers: "2",
      management: "",
    },
    {
      orgname: "msp",
      role: "particiant",
      peers: "2",
      management: "",
    },
  ]);
  const [columnDefs] = useState([
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
    {
      headerName: "참여 Peer 개수",
      field: "peers",
      filter: true,
    },
  ]);

  const [mspRowData] = useState([
    {
      orgname: "조직 이름",
      role: "역할",
      management: "auth key",
    },
  ]);
  const [mspColumnDefs] = useState([
    {
      headerName: "조직 이름",
      field: "orgname",
      filter: true,
      cellRenderer: function () {
        return `<select name="msp-names" id="msp-names">
                    <option value="Mspname1">Mspname1</option>
                  <option value="Mspname2">Mspname2</option>
                  <option value="Mspname3">Mspname3</option>
                  <option value="Mspname4">Mspname4</option>
                </select>`;
      },
    },
    {
      headerName: "역할",
      field: "role",
      filter: true,
      cellRenderer: function () {
        return `<select name="operator" id="operator">
                    <option value="Operator1">Operator1</option>
                  <option value="Operator2">Operator2</option>
                  <option value="Operator3">Operator3</option>
                  <option value="Operator4">Operator4</option>
                </select>`;
      },
    },
    {
      headerName: "",
      field: "management",
      filter: true,
      maxWidth: 200,
      cellRenderer: function () {
        return `<button>추가</button>`;
      },
    },
  ]);

  return (
    <Layout currentPage={currentPage} currentPageTitle={currentPageTitle}>
      <PanelBox>
        <div className="panelTitBar panelTitBar_clear">
          <div className="tit">Channel 구성원 관리</div>
        </div>
        <div className="grid-height2">
          <div style={{ padding: "30px" }}>
            <div>
              <p
                style={{
                  fontSize: "20px",
                  paddingBottom: "10px",
                  paddingTop: "15px",
                }}
              >
                Channel 구성원 설정
              </p>
              <hr />
              <p
                style={{
                  fontSize: "15px",
                  paddingBottom: "10px",
                  paddingTop: "15px",
                }}
              >
                현재 등록된 Channel 구성원
              </p>
              <div style={{ height: "200px", padding: "10px" }}>
                <AgGrid rowData={rowData} columnDefs={columnDefs} />
              </div>
              <p
                style={{
                  fontSize: "15px",
                  paddingBottom: "10px",
                  paddingTop: "15px",
                }}
              >
                전체 MSP 리스트
              </p>
              <div style={{ height: "200px", padding: "10px" }}>
                <AgGrid rowData={mspRowData} columnDefs={mspColumnDefs} />
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
    </Layout>
  );
};
export default ChannelsOrgMgmt;

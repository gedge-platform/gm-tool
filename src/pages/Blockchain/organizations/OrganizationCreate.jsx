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
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import orgStore from "../../../Store/OrganizationStore";
import { observer } from "mobx-react";
import { useHistory } from "react-router";
import CAcreate from "./CAcreate";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const OrganizationCreate = observer(() => {
  const {
    orgSelectCA,
    orgCAList,
    netList,
    netSelect,
    createOrg,
    setCA,
    setNet,
  } = orgStore;
  const [inputs, setInputs] = React.useState({
    orgName: "",
    orgMSPName: "",
    caName: "",
    caOrdererID: "",
    caOrdererPW: "",
  });
  const { orgName, orgMSPName, caName, caOrdererID, caOrdererPW } = inputs;

  const onChange = ({ target }) => {
    const { name, value } = target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const currentPage = SubTitle.Blockchain.Organization;
  const currentPageTitle = Title.Blockchain;
  const [errorMessage, setErrorMessage] = React.useState("");

  const [snackOpen, setSnackOpen] = React.useState(false);

  const snackClick = () => {
    setSnackOpen(true);
  };
  const SnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
  };

  const handleChange = ({ target: { value } }) => {
    setCA(value);
  };

  const handleNet = ({ target: { value } }) => {
    setNet(value);
  };

  const handleBack = () => {
    history.push("/organization");
  };

  const history = useHistory();
  //생성버튼 함수
  const handleCreate = () => {
    if (validCheck()) {
      //1. 생성 요청
      const org = {
        orgName,
        orgMSPName,
        caName,
        orgSelectCA,
        caOrdererID,
        caOrdererPW,
        netSelect,
      };
      createOrg(org);
      //2. 처음 화면으로 돌아감
      history.push("/organization");
    }
  };

  const validCheck = () => {
    if (orgName === "") {
      snackClick();
      setErrorMessage("조직 이름을 입력하세요.");
      return false;
    }

    if (orgMSPName === "") {
      snackClick();
      setErrorMessage("조직 MSP 이름을 입력하세요.");
      return false;
    }

    if (caName === "") {
      snackClick();
      setErrorMessage("CA 이름을 입력하세요.");
      return false;
    }

    if (caOrdererID === "") {
      snackClick();
      setErrorMessage("CA 사용자 ID를 입력하세요.");
      return false;
    }

    if (caOrdererPW === "") {
      snackClick();
      setErrorMessage("CA 사용자 PW를 입력하세요.");
      return false;
    }

    return true;
  };

  return (
    <Layout currentPage={currentPage} currentPageTitle={currentPageTitle}>
      <PanelBox>
        <div className="panelTitBar panelTitBar_clear">
          <div className="tit">조직 생성</div>
        </div>

        <div className="grid-height2">
          <div className="paperCont">
            <Stack spacing={2} sx={{ width: "100%" }}>
              <Snackbar
                open={snackOpen}
                autoHideDuration={3000}
                onClose={SnackClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <Alert
                  onClose={SnackClose}
                  severity="error"
                  sx={{ width: "100%" }}
                >
                  {errorMessage}
                </Alert>
              </Snackbar>
            </Stack>
            <div
              style={{
                paddingBottom: "20px",
                width: "50%",
              }}
            >
              <p style={{ fontSize: "16px", fontWeight: "500" }}>
                네트워크 선택
              </p>
              <div>
                <TextField
                  id="outlined-select-currency"
                  select
                  value={netSelect}
                  onChange={handleNet}
                  margin="normal"
                  size="small"
                >
                  {netList.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
            <div>
              <p
                style={{
                  fontSize: "20px",
                  paddingBottom: "10px",
                  fontWeight: "900",
                }}
              >
                조직 기본 설정
              </p>
              <p style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                조직 생성을 위한 기본 정보를 입력하세요.
              </p>
              <hr />
            </div>

            <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
              <p style={{ fontSize: "16px", fontWeight: "500" }}>조직 이름</p>
              <div style={{ width: "50%" }}>
                <TextField
                  required
                  TextField
                  fullWidth
                  margin="normal"
                  placeholder="Organization Name"
                  size="small"
                  name="orgName"
                  value={orgName}
                  onChange={onChange}
                />
              </div>
            </div>
            {/* <div style={{ paddingBottom: "10px" }}>
              <p style={{ fontSize: "16px", fontWeight: "500" }}>
                조직 MSP 이름
              </p>
              <div style={{ width: "50%" }}>
                <TextField
                  required
                  TextField
                  fullWidth
                  margin="normal"
                  placeholder="Organization MSP Name"
                  size="small"
                  name="orgMSPName"
                  value={orgMSPName}
                  onChange={onChange}
                />
              </div>
            </div> */}
            <p
              style={{
                fontSize: "18px",
                marginTop: "15px",
                paddingBottom: "15px",
                fontWeight: "700",
              }}
            >
              CA 설정
            </p>
            <hr />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: "15px",
              }}
            >
              <div style={{ paddingBottom: "10px", width: "49%" }}>
                <p style={{ fontSize: "16px", fontWeight: "500" }}>CA 이름</p>
                <div>
                  <TextField
                    required
                    TextField
                    fullWidth
                    margin="normal"
                    placeholder="CA 이름"
                    size="small"
                    name="caName"
                    value={caName}
                    onChange={onChange}
                  />
                </div>
              </div>
              <div style={{ paddingBottom: "10px", width: "49%" }}>
                <p style={{ fontSize: "16px", fontWeight: "500" }}>
                  CA 데이터베이스
                </p>
                <div>
                  <TextField
                    id="outlined-select-currency"
                    select
                    value={orgSelectCA}
                    onChange={handleChange}
                    margin="normal"
                    size="small"
                    fullWidth
                  >
                    {orgCAList.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ paddingBottom: "10px", width: "49%" }}>
                <p style={{ fontSize: "16px", fontWeight: "500" }}>
                  CA 사용자(Orderer) ID
                </p>
                <div>
                  <TextField
                    required
                    TextField
                    fullWidth
                    margin="normal"
                    placeholder="CA 사용자 이름"
                    size="small"
                    name="caOrdererID"
                    value={caOrdererID}
                    onChange={onChange}
                  />
                </div>
              </div>
              <div style={{ paddingBottom: "10px", width: "49%" }}>
                <p style={{ fontSize: "16px", fontWeight: "500" }}>
                  CA 사용자(Orderer) PW
                </p>
                <div>
                  <TextField
                    required
                    TextField
                    fullWidth
                    type="password"
                    margin="normal"
                    placeholder="CA 사용자 PW"
                    name="caOrdererPW"
                    value={caOrdererPW}
                    size="small"
                    onChange={onChange}
                  />
                </div>
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
            <Button variant="outlined" onClick={handleBack} sx={{ mr: 1 }}>
              이전
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleCreate} variant="outlined">
              생성
            </Button>
          </Box>
        </div>
      </PanelBox>
    </Layout>
  );
});
export default OrganizationCreate;

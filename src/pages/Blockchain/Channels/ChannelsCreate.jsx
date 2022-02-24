import React, { useState, useEffect } from "react";
import Layout from "@/layout";
import { Title, SubTitle } from "@/pages";
import { PanelBox } from "@/components/styles/PanelBox";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { AgGrid } from "@/components/datagrids";
import { agDateColumnFilter } from "@/utils/common-utils";
import { DataGrid } from "@mui/x-data-grid";
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
import { swalUpdate } from "@/utils/swal-utils";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import { useHistory } from "react-router";
import channelsStore from "../../../Store/ChannelsStore";
import { observer } from "mobx-react";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ChannelsCreate = observer(() => {
  const currentPage = SubTitle.Blockchain.Channels;
  const currentPageTitle = Title.Blockchain;

  const {
    orderingServiceList,
    selectOrderingService,
    channelMemberList,
    orgList,
    setOrderingService,
    addMember,
    createChannel,
    filterChannelMember,
  } = channelsStore;

  const [errorMessage, setErrorMessage] = React.useState("");
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [channelName, setChannelName] = useState("");

  const onChange = ({ target: { value } }) => {
    setChannelName(value);
  };

  const snackClick = () => {
    setSnackOpen(true);
  };
  const SnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
  };

  //텍스트 필드 리스트 선택
  const handleChange = ({ target: { value } }) => {
    setOrderingService(value);
  };

  useEffect(() => {
    // if (channelsStore.orderingServiceList.length > 0) {
    //   channelsStore.selectOrderingService =
    //     channelsStore.orderingServiceList[0].value;
    // }
    // return () => {};
  }, []);

  const [open, setOpen] = React.useState(false);

  //Form Dialogs
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleModifyOpen = (e) => {
    const fieldName = e.colDef.field;
    if (fieldName === "management") {
      setOpen(true);
    }
  };

  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  const handleCreate = () => {
    //1. 생성요청
    //2. 처음으로
    if (validCheck()) {
      createChannel(channelName);
      history.push("/channels");
    }
  };

  const validCheck = () => {
    if (channelName === "") {
      snackClick();
      setErrorMessage("채널명을 입력하세요.");
      return false;
    }

    return true;
  };

  const [columnDefs] = useState([
    {
      headerName: "조직 이름",
      field: "orgname",
      filter: true,
      width: 300,
    },
    {
      headerName: "역할",
      field: "role",
      filter: true,
      width: 300,
    },
    {
      headerName: "참여 Peer 개수",
      field: "peers",
      filter: true,
      width: 300,
    },
    {
      headerName: "",
      field: "management",
      filter: true,
      width: 200,
      renderCell: () => (
        <button
          style={{
            backgroundColor: "#1355ce",
            color: "white",
            border: "none",
            fontSize: "14px",
            borderRadius: "3px",
            padding: "2px 15px",
          }}
        >
          관리
        </button>
      ),
    },
    {
      headerName: "",
      field: "delete",
      filter: true,
      width: 200,
      renderCell: () => (
        <button
          style={{
            backgroundColor: "#ee4436",
            color: "white",
            border: "none",
            fontSize: "14px",
            borderRadius: "3px",
            padding: "2px 15px",
          }}
        >
          삭제
        </button>
      ),
    },
  ]);

  const [peerRowData] = useState([
    {
      id: 0,
      peername: "peer1",
      role: "역할",
    },
    {
      id: 1,
      peername: "peer2",
      role: "역할",
    },
    {
      id: 2,
      peername: "peer3",
      role: "역할",
    },
  ]);
  const [peerColumnDefs] = useState([
    {
      headerName: "조직 이름",
      field: "peername",
      filter: true,
      width: 250,
    },
    {
      headerName: "역할",
      field: "role",
      filter: true,
      width: 250,
      renderCell: function () {
        return (
          <select name="role" id="role">
            <option value="Endorsing Peer">Endorsing Peer</option>
            <option value="Endorsing Peer">Endorsing Peer</option>
            <option value="Endorsing Peer">Endorsing Peer</option>
            <option value="Endorsing Peer">Endorsing Peer</option>
          </select>
        );
      },
    },
    // {
    //   headerName: "체크",
    //   field: "check",
    //   width: 150,
    //   filter: false,
    //   renderCell: () => <input type="checkbox" />,
    // },
  ]);

  const clickMgmt = ({ field, row }) => {
    if (field === "management") {
      setOpen(true);
      return;
    }
    if (field === "delete") {
      swalUpdate("삭제하시겠습니까?", () => filterChannelMember(row.id));
    }
  };

  const [orgName, setOrgName] = React.useState(orgList[0]);
  const [role, setRole] = React.useState("operator");

  const changeSelect = ({ target }) => {
    const { name, value } = target;
    if (name === "orgName") {
      setOrgName(value);
      return;
    }
    if (name === "role") {
      setRole(value);
      return;
    }
  };

  const clickAdd = () => {
    addMember(orgName, role);
  };

  return (
    <Layout currentPage={currentPage} currentPageTitle={currentPageTitle}>
      <PanelBox>
        <div className="panelTitBar panelTitBar_clear">
          <div className="tit">Channel 생성</div>
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
            <div>
              <p
                style={{
                  fontSize: "20px",
                  paddingBottom: "10px",
                  fontWeight: "900",
                }}
              >
                Channel 기본 정보 입력
              </p>
              <hr />
            </div>
            <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
              <p style={{ fontSize: "16px", fontWeight: "500" }}>
                채널 기본 설정
              </p>
              <div style={{ width: "50%", padding: "10px" }}>
                <TextField
                  required
                  TextField
                  fullWidth
                  margin="normal"
                  placeholder="Channel Name"
                  size="small"
                  name="channelName"
                  value={channelName}
                  onChange={onChange}
                />
              </div>
            </div>
            <div style={{ paddingBottom: "10px" }}>
              <p style={{ fontSize: "16px", fontWeight: "500" }}>
                Ordering Service
              </p>
              <div style={{ display: "flex" }}>
                <div style={{ width: "50%", padding: "10px" }}>
                  <TextField
                    id="outlined-select-currency"
                    select
                    value={selectOrderingService}
                    onChange={handleChange}
                    margin="normal"
                    size="small"
                    fullWidth
                  >
                    {orderingServiceList.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.value}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
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
                Channel 구성원 설정
              </p>
              <hr />
            </div>
            <div>
              <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                <p style={{ fontSize: "16px", fontWeight: "500" }}>
                  현재 등록된 Channel 구성원
                </p>
                <div
                  style={{
                    height: "300px",
                    padding: "10px",
                    paddingTop: "20px",
                  }}
                >
                  <DataGrid
                    rows={[...channelMemberList]}
                    columns={columnDefs}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    rowLength={5}
                    onCellClick={clickMgmt}
                  />
                  {/* <AgGrid
                    rowData={channelMemberList}
                    columnDefs={columnDefs}
                    onCellClicked={clickMgmt}
                    isBottom={true}
                    totalElements={channelMemberList.length}
                  /> */}
                </div>
              </div>
              <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                <p style={{ fontSize: "16px", fontWeight: "500" }}>
                  전체 MSP 리스트
                </p>
                <div
                  style={{
                    height: "200px",
                    padding: "10px",
                    paddingTop: "20px",
                  }}
                >
                  <table className="msplist">
                    <th>조직 이름</th>
                    <th>역할</th>
                    <th></th>
                    <tbody>
                      <tr>
                        <td>
                          <select
                            style={{ width: "100%" }}
                            name="orgName"
                            id="orgName"
                            onChange={changeSelect}
                          >
                            {orgList.map((org) => (
                              <option value={org}>{org}</option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select
                            style={{ width: "100%" }}
                            name="role"
                            id="role"
                            onChange={changeSelect}
                          >
                            <option value="operator">operator</option>
                            <option value="participant">participant</option>
                          </select>
                        </td>
                        <td
                          style={{
                            textAlign: "center",
                            borderBottom: "1px solid #e0e2e5",
                            borderRight: "1px solid #e0e2e5",
                          }}
                        >
                          <span onClick={clickAdd}>추가</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  {/* <AgGrid
                    rowData={mspRowData}
                    columnDefs={mspColumnDefs}
                    onCellClicked={handleModifyOpen}
                  /> */}
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
            <Button variant="outlined" onClick={goBack} sx={{ mr: 1 }}>
              이전
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleCreate} variant="outlined">
              생성/변경
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
              <div style={{ height: "250px", padding: "10px" }}>
                <DataGrid
                  rows={[...peerRowData]}
                  columns={peerColumnDefs}
                  pageSize={3}
                  rowsPerPageOptions={[3]}
                  rowLength={3}
                  checkboxSelection={true}
                />
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
});
export default ChannelsCreate;

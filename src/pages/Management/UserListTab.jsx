import React, { useState, useEffect } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import { AgGrid } from "@/components/datagrids";
import { agDateColumnFilter } from "@/utils/common-utils";
import { CReflexBox } from "@/layout/Common/CReflexBox";
import { CSelectButton } from "@/components/buttons";
import UserDetail from "./UserDetail";
import { observer } from "mobx-react";
import userStore from "../../Store/UserStore";
import moment from "moment";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { swalUpdate } from "@/utils/swal-utils";
import axios from "axios";
import { SERVER_URL } from "@/config.jsx";
import { getItem } from "../../utils/sessionStorageFn";
import { swalError } from "../../utils/swal-utils";
import UserAdd from "./UserCont/UserAdd";

const UserListTab = observer(() => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const { userList, userDetail, loadUserList, setDetail } = userStore;

  const [columnDefs] = useState([
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
    {
      headerName: "NO",
      field: "num",
      filter: false,
      minWidth: 80,
      maxWidth: 80,
    },
    {
      headerName: "사용자 이름",
      field: "name",
      filter: true,
    },
    {
      headerName: "사용자 역할",
      field: "role",
      filter: true,
    },
    {
      headerName: "Last Login",
      field: "logined_at",
      filter: true,
      cellRenderer: function (data) {
        if (moment(data.value).year() === 1) {
          return `<span>-</span>`;
        }
        return `<span>${moment(new Date(data.value)).format(
          "YYYY-MM-DD HH:mm"
        )}</span>`;
      },
    },
    {
      headerName: "등록일",
      field: "created_at",
      filter: "agDateColumnFilter",
      filterParams: agDateColumnFilter(),
      minWidth: 150,
      maxWidth: 200,
      cellRenderer: function (data) {
        return `<span>${moment(new Date(data.value))
          // .subtract(9, "h")
          .format("YYYY-MM-DD HH:mm")}</span>`;
      },
    },
    {
      headerName: "상태",
      field: "enabled",
      filter: true,
      cellRenderer: function (state) {
        if (state.value == 0) {
          return `<span class="state_ico state_04">승인 대기</span>`;
        }
        return `<span class="state_ico state_02">승인</span>`;
      },
    },
  ]);

  const actionList = [
    {
      name: "승인",
      onClick: () => {
        swalUpdate("승인하시겠습니까?", setEnabled);
      },
    },
    {
      name: "반려",
      onClick: () => {
        swalUpdate("반려하시겠습니까?", setDisabled);
      },
    },
  ];

  const setEnabled = async () => {
    await axios
      .get(`${SERVER_URL}/users/${userDetail.id}/enabled`, {
        auth: getItem("auth"),
      })
      .then(({ data: { status } }) => {
        if (status === 200) {
          swalError("사용자 승인이 완료되었습니다.");
          loadUserList();
        } else {
          swalError("사용자 승인에 실패하였습니다.");
        }
      })
      .catch((e) => console.log(e));
  };

  const setDisabled = async () => {
    await axios
      .get(`${SERVER_URL}/users/${userDetail.id}/disabled`, {
        auth: getItem("auth"),
      })
      .then(({ data: { status } }) => {
        if (status === 200) {
          swalError("사용자 반려가 완료되었습니다.");
          loadUserList();
        } else {
          swalError("사용자 반려에 실패하였습니다.");
        }
      })
      .catch((e) => console.log(e));
  };

  const handleCreateOpen = () => {
    setOpen2(true);
  };
  const handleCreateClose = () => {
    setOpen2(false);
  };

  const handleTabChange = (event, newValue) => {
    setTabvalue(newValue);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen2(false);
  };

  const clickUser = (e) => {
    setDetail(e.data.id);
  };

  const deleteUser = () => {
    swalUpdate("삭제하시겠습니까", deleteAPI);
  };
  const deleteAPI = async () => {
    await axios
      .delete(`${SERVER_URL}/users/${userDetail.id}`, {
        auth: getItem("auth"),
      })
      .then(({ status }) => {
        if (status === 200) {
          swalError("User 삭제에 성공하였습니다.");
          loadUserList();
        } else {
          swalError("User 삭제에 실패하였습니다.");
        }
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    loadUserList();
  }, []);

  return (
    <>
      <CReflexBox>
        <PanelBox>
          <div className="panelTitBar panelTitBar_clear">
            <div className="tit">사용자 관리</div>
          </div>
          {/* <CommActionBar isSearch={true}> */}
          {/* </CommActionBar> */}
          {/* <CommActionBar isSearch={false}>
            <CCreateButton onClick={handleOpen}>생성</CCreateButton>
            <UserAdd open={open} onClose={handleClose} />

            <CSelectButton items={actionList}>액션</CSelectButton>

            <div className="iconBtnGrope">
              <CIconButton icon="edit" tooltip="수정" />
              <CIconButton icon="del" tooltip="삭제" disabled />
            </div>
            <div>
              <Button startIcon={<AddIcon />}>User 생성</Button>
              <Button color="error" startIcon={<DeleteIcon />}>
                User 삭제
              </Button>
            </div>
          </CommActionBar> */}
          <div className="panelTitBar panelTitBar_clear">
            <div style={{ display: "flex" }}>
              <div style={{ margin: "auto 10px auto auto" }}>
                <CSelectButton className="none_transform" items={actionList}>
                  액션
                </CSelectButton>
              </div>
              <div>
                {/* <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                    width: "160px",
                  }}
                >
                  <input
                    style={{
                      height: "30px",
                      width: "160px",
                      paddingLeft: "10px",
                    }}
                  ></input>
                  <SearchIcon
                    sx={{ fontSize: "26px" }}
                    style={{
                      position: "absolute",
                      right: "5px",
                      cursor: "pointer",
                    }}
                    className="search_icon"
                  />
                </div> */}
              </div>
            </div>
            <div>
              <Button startIcon={<AddIcon />} onClick={handleCreateOpen}>
                User 생성
              </Button>
              <Button
                color="error"
                startIcon={<DeleteIcon />}
                onClick={deleteUser}
              >
                User 삭제
              </Button>
            </div>
          </div>
          <div className="grid-height">
            <AgGrid
              rowData={userList}
              columnDefs={columnDefs}
              totalElements={userList.length}
              isBottom={true}
              onCellClicked={clickUser}
              setDetail={setDetail}
            />
          </div>
          <UserAdd open={open2} onClose={handleClose} />
        </PanelBox>
        <UserDetail />
      </CReflexBox>
    </>
  );
});
export default UserListTab;

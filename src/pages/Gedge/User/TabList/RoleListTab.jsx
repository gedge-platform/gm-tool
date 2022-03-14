import React, { useState, useEffect } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import { AgGrid } from "@/components/datagrids";
import { agDateColumnFilter } from "@/utils/common-utils";
import { CReflexBox } from "@/layout/Common/CReflexBox";
import { CSelectButton } from "@/components/buttons";
import UserDetail from "../../User/UserDetail";
import { observer } from "mobx-react";
import userStore from "../../store/UserStore";
import moment from "moment";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { swalUpdate } from "@/utils/swal-utils";
import axios from "axios";
import { SERVER_URL } from "@/config.jsx";
import { getItem } from "../../../../utils/sessionStorageFn";
import { swalError } from "../../../../utils/swal-utils";
import UserAdd from "../../../Management/UserCont/UserAdd";

const RoleListTab = observer(() => {
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
      field: "memberNum",
      filter: false,
      minWidth: 80,
      maxWidth: 80,
    },
    {
      headerName: "사용자 이름",
      field: "memberName",
      filter: true,
    },
    {
      headerName: "설명",
      field: "description",
      filter: true,
    },
    {
      headerName: "생성날짜",
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
  ]);

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
      .delete(`${SERVER_URL}/users/${userDetail.memberId}`, {
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
          {/* <div className="panelTitBar panelTitBar_clear">
            <div className="tit"></div>
          </div>
          <CommActionBar isSearch={true}></CommActionBar>
          <CommActionBar isSearch={false}>
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
              <div style={{ margin: "auto 10px auto auto" }} />
            </div>
            <div className="panelTitBar panelTitBar_clear">
              <div>
                <Button startIcon={<AddIcon />} onClick={handleCreateOpen}>
                  생성
                </Button>
                <Button
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={deleteUser}
                >
                  삭제
                </Button>
              </div>
            </div>
          </div>
          <div className="grid-height2">
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
        <UserDetail user={userDetail} />
      </CReflexBox>
    </>
  );
});
export default RoleListTab;

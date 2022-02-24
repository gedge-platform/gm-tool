import React, { useEffect, useState } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import { AgGrid } from "@/components/datagrids";
import { CReflexBox } from "@/layout/Common/CReflexBox";
import { CSelectButton } from "@/components/buttons";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useHistory } from "react-router";
import { observer } from "mobx-react";
import OrganizationDetail from "../OrganizationDetail";
import OrganizationStore from "../../../../Store/OrganizationStore";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { toJS } from "mobx";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    // marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1),
  // height: '100%',
  position: "absolute",
  // pointerEvents: 'none',
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: "999",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(0.8, 0, 0.8, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
    backgroundColor: "white",
  },
}));

const OranizationsListTab = observer(() => {
  const {
    filterOrgList,
    totalElements,
    totalPages,
    currentPage,
    netList,
    netSelect,
    loadOrg,
    filterNetwork,
    setDetail,
    goNextPage,
    goPrevPage,
    deleteOrg,
    searchKeyword,
    setNet,
  } = OrganizationStore;

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
      headerName: "조직 이름",
      field: "name",
      filter: true,
    },
    {
      headerName: "조직 ID",
      field: "orgId",
      filter: true,
    },
    {
      headerName: "Import 여부",
      field: "import",
      filter: true,
    },
    {
      headerName: "네트워크",
      field: "network",
      filter: true,
    },
  ]);

  const history = useHistory();
  const orgCreate = () => {
    history.push("/organization/create");
  };
  const orgManage = () => {};

  const clickCell = (e) => {
    setDetail(toJS(e.data));
  };

  const actionList = netList.map((net) => ({
    name: net,
    onClick: () => {
      setNet(net);
      filterNetwork(net);
    },
  }));

  const [view, setView] = React.useState(false);
  const [keyword, setKeyword] = React.useState("");

  const handleSearch = () => {
    setView(!view);
    console.log();
  };

  useEffect(() => {
    loadOrg();
  }, []);

  return (
    <>
      <CReflexBox>
        <PanelBox>
          <div className="panelTitBar panelTitBar_clear">
            <div className="tit">Organization 리스트 </div>
          </div>
          <div className="panelTitBar panelTitBar_clear">
            <div style={{ display: "flex" }}>
              <div style={{ margin: "auto 10px auto auto" }}>
                <CSelectButton className="none_transform" items={actionList}>
                  {netSelect === "" ? "네트워크 선택" : netSelect}
                </CSelectButton>
              </div>
              <div>
                <div
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
                    onChange={(e) => setKeyword(e.target.value)}
                  ></input>
                  <SearchIcon
                    sx={{ fontSize: "26px" }}
                    style={{
                      position: "absolute",
                      right: "5px",
                      cursor: "pointer",
                    }}
                    className="search_icon"
                    onClick={() => searchKeyword(keyword)}
                  />
                </div>
              </div>
            </div>
            <div>
              <Button startIcon={<AddIcon />} onClick={orgCreate}>
                조직 생성
              </Button>
              <Button
                color="primary"
                startIcon={<ManageAccountsIcon />}
                onClick={orgManage}
              >
                조직 관리
              </Button>
              <Button
                color="error"
                startIcon={<DeleteIcon />}
                onClick={deleteOrg}
              >
                조직 삭제
              </Button>
            </div>
          </div>
          <div className="grid-height2">
            <AgGrid
              rowData={filterOrgList}
              columnDefs={columnDefs}
              onCellClicked={clickCell}
              totalElements={totalElements}
              totalPages={totalPages}
              currentPage={currentPage}
              goPrevPage={goPrevPage}
              goNextPage={goNextPage}
              setDetail={setDetail}
            />
          </div>
        </PanelBox>
        <OrganizationDetail />
      </CReflexBox>
    </>
  );
});
export default OranizationsListTab;

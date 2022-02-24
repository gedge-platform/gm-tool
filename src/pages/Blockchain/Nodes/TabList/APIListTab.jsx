import React, { useState, useEffect } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import CommActionBar from "@/components/common/CommActionBar";
import { AgGrid } from "@/components/datagrids";
import { agDateColumnFilter } from "@/utils/common-utils";
import { CReflexBox } from "@/layout/Common/CReflexBox";
import { CCreateButton, CSelectButton } from "@/components/buttons";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
// import LogDialog from '../Dialog/LogDialog';
// import CreateDialog from '../Dialog/CreateDialog';
import { swalConfirm } from "@/utils/swal-utils";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import { useHistory } from "react-router";

import OrdererDetail from "../OrdererDetail";
import PeerDetail from "../PeerDetail";
import CaDetail from "../CaDetail";
import { observer } from "mobx-react";
import NodesStore from "../../../../Store/NodesStore";
import moment from "moment";

const APIListTab = observer(() => {
  const [tabvalue, setTabvalue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTabvalue(newValue);
  };

  const {
    filterOrderList,
    networkList,
    selectNetwork,
    filterPeerList,
    filterCAList,
    loadPeerList,
    setNetwork,
    loadOrdererList,
    loadNetworkNameList,
    filterOrder,
    filterPeer,
    loadCAList,
    filterCA,
  } = NodesStore;
  const [ordColumnDefs] = useState([
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
      headerName: "Ordering Service 이름",
      field: "name",
      filter: true,
    },
    {
      headerName: "타입",
      field: "type",
      filter: true,
    },
    {
      headerName: "네트워크",
      field: "network",
      filter: true,
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
      field: "state",
      filter: "agDateColumnFilter",
      minWidth: 150,
      maxWidth: 200,
      cellRenderer: function (data) {
        console.log(data.value);
        if (data.value === "ContainerCreating") {
          return `<span class="state_ico state_02>생성중</span>`;
        } else if (data.value === "Running") {
          return `<span class="state_ico state_01">운영중</span>`;
        } else if (data.value === "Terminating") {
          return `<span class="state_ico state_04>삭제중</span>`;
        } else {
          return `<span class="state_ico state_03>Pending</span>`;
        }
      },
    },
  ]);

  const [peerColumnDefs] = useState([
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
      headerName: "Peer 이름",
      field: "name",
      filter: true,
    },
    {
      headerName: "네트워크",
      field: "network",
      filter: true,
    },
    {
      headerName: "Organization 이름",
      field: "org",
      filter: true,
    },
    {
      headerName: "역할",
      field: "rule",
      filter: true,
    },
    {
      headerName: "타입",
      field: "type",
      filter: true,
    },
    {
      headerName: "데이터베이스",
      field: "database",
      filter: true,
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
      field: "state",
      filter: "agDateColumnFilter",
      minWidth: 150,
      maxWidth: 200,
      cellRenderer: function (data) {
        console.log(data.value);
        if (data.value === "ContainerCreating") {
          return `<span class="state_ico state_02>생성중</span>`;
        } else if (data.value === "Running") {
          return `<span class="state_ico state_01">운영중</span>`;
        } else if (data.value === "Terminating") {
          return `<span class="state_ico state_04>삭제중</span>`;
        } else {
          return `<span class="state_ico state_03>Pending</span>`;
        }
      },
    },
  ]);

  const [caColumnDefs] = useState([
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
      headerName: "CA 이름",
      field: "name",
      filter: true,
    },
    {
      headerName: "데이터베이스",
      field: "database",
      filter: true,
    },
    {
      headerName: "네트워크",
      field: "network",
      filter: true,
    },
    {
      headerName: "종륲",
      field: "kind",
      filter: true,
    },
    {
      headerName: "상태",
      field: "state",
      filter: "agDateColumnFilter",
      minWidth: 150,
      maxWidth: 200,
      cellRenderer: function (data) {
        console.log(data.value);
        if (data.value === "ContainerCreating") {
          return `<span class="state_ico state_02>생성중</span>`;
        } else if (data.value === "Running") {
          return `<span class="state_ico state_01">운영중</span>`;
        } else if (data.value === "Terminating") {
          return `<span class="state_ico state_04>삭제중</span>`;
        } else {
          return `<span class="state_ico state_03>Pending</span>`;
        }
      },
    },
  ]);

  const history = useHistory();

  const ordCreate = () => {
    history.push("/nodes/orderer/create");
  };

  const peerCreate = () => {
    history.push("/nodes/peer/create");
  };

  const casCreate = () => {
    history.push("/nodes/ca/create");
  };
  //   let tmpList = [
  //     {
  //       name: "전체 보기",
  //       onClick: () => {
  //         setNetwork("");
  //         filterOrder("");
  //         filterPeer("");
  //       },
  //     },
  //   ].push(
  //     networkList.map((network) => ({
  //       name: network,
  //       onClick: () => {
  //         setNetwork(network);
  //         filterOrder(network);
  //         filterPeer(network);
  //       },
  //     }))
  //   );
  let actionList = networkList.map((network) => ({
    name: network,
    onClick: () => {
      setNetwork(network);
      filterOrder(network);
      filterPeer(network);
      filterCA(network);
    },
  }));

  useEffect(() => {
    loadNetworkNameList();
    loadOrdererList();
    loadPeerList();
    loadCAList();
  }, []);

  return (
    <>
      <CReflexBox>
        <PanelBox>
          <div className="panelTitBar panelTitBar_clear">
            <div className="tit">Nodes 리스트</div>
          </div>
          <div className="panelTitBar panelTitBar_clear">
            <div>
              <CSelectButton items={actionList}>
                {selectNetwork === "" ? "네트워크 선택" : selectNetwork}
              </CSelectButton>
            </div>
          </div>
          <div className="panelTitBar panelTitBar_clear">
            <div>
              <CTabs type="tab2" value={tabvalue} onChange={handleTabChange}>
                <CTab label="Orderers" />
                <CTab label="Peers" />
                <CTab label="CAs" />
              </CTabs>
            </div>
            {/* <div style={{ display: "flex" }}> */}
            {/* <div>
                                <CSelectButton
                                    items={actionList}
                                >
                                    네트워크 선택
                                </CSelectButton>
                            </div> */}
            {/* </div> */}
            <div>
              {tabvalue === 0 ? (
                <div>
                  <Button startIcon={<AddIcon />} onClick={ordCreate}>
                    Orderer 생성
                  </Button>
                  <Button color="error" startIcon={<DeleteIcon />}>
                    Orderer 삭제
                  </Button>
                </div>
              ) : (
                <></>
              )}

              {tabvalue === 1 ? (
                <div>
                  <Button startIcon={<AddIcon />} onClick={peerCreate}>
                    Peer 생성
                  </Button>
                  <Button color="error" startIcon={<DeleteIcon />}>
                    Peer 삭제
                  </Button>
                </div>
              ) : (
                <></>
              )}

              {tabvalue === 2 ? (
                <div>
                  <Button startIcon={<AddIcon />} onClick={casCreate}>
                    CA 생성
                  </Button>
                  <Button color="error" startIcon={<DeleteIcon />}>
                    CA 삭제
                  </Button>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="tabPanelContainer">
            <CTabPanel value={tabvalue} index={0}>
              <div className="grid-height2">
                <AgGrid
                  rowData={filterOrderList}
                  columnDefs={ordColumnDefs}
                  isBottom={true}
                  totalElements={filterOrderList.length}
                />
              </div>
            </CTabPanel>
            <CTabPanel value={tabvalue} index={1}>
              <div className="grid-height2">
                <AgGrid
                  rowData={filterPeerList}
                  columnDefs={peerColumnDefs}
                  isBottom={true}
                  totalElements={filterPeerList.length}
                />
              </div>
            </CTabPanel>
            <CTabPanel value={tabvalue} index={2}>
              <div className="grid-height2">
                <AgGrid
                  rowData={filterCAList}
                  columnDefs={caColumnDefs}
                  isBottom={true}
                  totalElements={filterCAList.length}
                />
              </div>
            </CTabPanel>
          </div>
        </PanelBox>

        {tabvalue === 0 ? (
          <OrdererDetail />
        ) : tabvalue === 1 ? (
          <PeerDetail />
        ) : tabvalue === 2 ? (
          <CaDetail />
        ) : (
          <></>
        )}
      </CReflexBox>
    </>
  );
});
export default APIListTab;

import React, { useState, useEffect } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import SearchIcon from "@mui/icons-material/Search";
import { AgGrid } from "@/components/datagrids";
import { CReflexBox } from "@/layout/Common/CReflexBox";
import { CSelectButton } from "@/components/buttons";
// import LogDialog from '../Dialog/LogDialog';
// import CreateDialog from '../Dialog/CreateDialog';
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useHistory } from "react-router";
import ChannelsDetail from "../ChannelsDetail";
import { observer } from "mobx-react";
import channelsStore from "../../../../Store/ChannelsStore";

const ChannelListTab = observer(() => {
  const {
    filterChannelList,
    netList,
    totalPages,
    totalElements,
    currentPage,
    setDetail,
    goPrevPage,
    goNextPage,
    filterNetwork,
    deleteChannel,
  } = channelsStore;
  const [network, setNetwork] = useState("");
  useEffect(() => {
    channelsStore.getNetworkName()
    channelsStore.getChannelList()
    console.log(channelsStore.channelList, "test")
  }, [])
  const onCellClicked = (e) => {
    console.log(e)


    // networkStore.selectNetwork
    // setRows(e.data)
    // console.log(e.rowIndex)

    // networkStore.selectNetwork = rowData[e.rowIndex]
  }
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
      selectionChanged: function (e) {
        console.log(e);
      }
    },
    {
      headerName: "Channel ID",
      field: "id",
      filter: true,
    },
    {
      headerName: "오더링 서비스 이름",
      field: "orderer",
      filter: true,
    },
    {
      headerName: "네트워크 이름",
      field: "network",
      filter: true,
    },
  ]);

  const history = useHistory();
  const channelCreate = () => {
    history.push("/channels/create");
  };

  const actionList = netList.map((net) => {
    return {
      name: net,
      onClick: () => {
        setNetwork(net);
        filterNetwork(net);
      },
    };
  });

  const clickCell = (e) => {
    setDetail(e.data.id);
  };
  return (
    <>
      <CReflexBox>
        <PanelBox>
          <div className="panelTitBar panelTitBar_clear">
            <div className="tit">Channels 리스트</div>
          </div>
          <div className="panelTitBar panelTitBar_clear">
            <div style={{ display: "flex" }}>
              <div style={{ margin: "auto 10px auto auto" }}>
                <CSelectButton className="none_transform" items={actionList}>
                  {network === "" ? "네트워크 선택" : network}
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
                  // onChange={(e) => setKeyword(e.target.value)}
                  ></input>
                  <SearchIcon
                    sx={{ fontSize: "26px" }}
                    style={{
                      position: "absolute",
                      right: "5px",
                      cursor: "pointer",
                    }}
                    className="search_icon"
                  // onClick={() => searchKeyword(keyword)}
                  />
                </div>
              </div>
            </div>
            <div>
              <Button startIcon={<AddIcon />} onClick={channelCreate}>
                Channel 생성
              </Button>
              <Button
                color="error"
                startIcon={<DeleteIcon />}
                onClick={deleteChannel}
              >
                Channel 삭제
              </Button>
            </div>
          </div>
          <div className="grid-height2">
            <AgGrid
              rowData={filterChannelList}
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
        <ChannelsDetail />
      </CReflexBox>
    </>
  );
});
export default ChannelListTab;

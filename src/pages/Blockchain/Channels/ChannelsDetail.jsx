import React, { useState } from "react";
// import CommActionBar from "@/components/common/CommActionBar";
// import { CIconButton, CSelectButton } from "@/components/buttons";
import { PanelBox } from "@/components/styles/PanelBox";
// import { swalConfirm } from "@/utils/swal-utils";
// import { CScrollbar } from "@/components/scrollbars";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
// import { AgGrid } from '@/components/datagrids'
// import { agDateColumnFilter } from "@/utils/common-utils";
// import LogDialog from "../Dialog/LogDialog";
// import { CDatePicker } from "@/components/textfields/CDatePicker";
import { useHistory } from "react-router";

const ChannelsDetail = (props) => {
  const [open, setOpen] = useState(false);
  const [tabvalue, setTabvalue] = useState(0);
  // const actionList = [
  //     {
  //         name: '요청',
  //         onClick: () => {
  //             swalConfirm("요청하시겠습니까?")
  //         },
  //     },
  //     {
  //         name: '완료',
  //         onClick: () => {
  //             swalConfirm("완료하시겠습니까?")
  //         },
  //     },
  //     {
  //         name: '반려',
  //         onClick: () => {
  //             swalConfirm("반려하시겠습니까?")
  //         },
  //     },
  // ]

  const handleTabChange = (event, newValue) => {
    setTabvalue(newValue);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const history = useHistory();
  const historyPush = (value) => {
    switch (value) {
      case 0:
        history.push("/channels/blockMgmt");
        break;
      case 1:
        history.push("/channels/orgMgmt");
        break;
      case 2:
        history.push("/channels/peerMgmt");
        break;
      default:
        break;
    }
  };
  return (
    <PanelBox>
      <CTabs type="tab2" value={tabvalue} onChange={handleTabChange}>
        <CTab label="상세정보" />
        <CTab label="Channel 구성원" />
        <CTab label="Peer 정보" />
      </CTabs>
      <div className="tabPanelContainer">
        <CTabPanel value={tabvalue} index={0}>
          <div className="panelCont">
            <span style={{ fontSize: "14px", fontWeight: "bold" }}>
              상세정보
            </span>
            <span
              style={{
                marginLeft: "15px",
                color: "#4d8ac1",
                cursor: "pointer",
              }}
              onClick={() => historyPush(0)}
            >
              Edit
            </span>
            <table className="tb_data" style={{ marginTop: "10px" }}>
              <tbody>
                <tr>
                  <th>Channel 이름</th>
                  <td>my-channel</td>
                  <th>Order 이름</th>
                  <td>orderer</td>
                </tr>
                <tr>
                  <th>네트워크 이름</th>
                  <td>my-block-net-1</td>
                  <th>트랜잭션 수</th>
                  <td>1</td>
                </tr>
                <tr>
                  <th>Blocks</th>
                  <td>1</td>
                  <th>BLock 최종 수집 및 일시</th>
                  <td>{Date()}</td>
                </tr>
                <tr>
                  <th>오더러</th>
                  <td>Raft(5)</td>
                  <th>생성 일시</th>
                  <td>{Date()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CTabPanel>
        <CTabPanel value={tabvalue} index={1}>
          <div className="panelCont">
            <div className="grid-height">
              <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                Channel 구성원
              </span>
              <span
                style={{
                  marginLeft: "15px",
                  color: "#4d8ac1",
                  cursor: "pointer",
                }}
                onClick={() => historyPush(1)}
              >
                Edit
              </span>
              <table className="tb_data" style={{ marginTop: "10px" }}>
                <tbody>
                  <tr>
                    <th>조직 이름</th>
                    <th>네트워크 위치</th>
                    <th>역할</th>
                  </tr>
                  <tr>
                    <td>msp</td>
                    <td>my-block-net-1</td>
                    <td>Operator</td>
                  </tr>
                  <tr>
                    <td>msp</td>
                    <td>my-block-net-2</td>
                    <td>Operator</td>
                  </tr>
                  <tr>
                    <td>msp</td>
                    <td>my-block-net-3</td>
                    <td>Particiant</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CTabPanel>
        <CTabPanel value={tabvalue} index={2}>
          <div className="panelCont">
            <div className="grid-height">
              <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                Peer 정보
              </span>
              <span
                style={{
                  marginLeft: "15px",
                  color: "#4d8ac1",
                  cursor: "pointer",
                }}
                onClick={() => historyPush(2)}
              >
                Edit
              </span>
              <table className="tb_data" style={{ marginTop: "10px" }}>
                <tbody>
                  <tr>
                    <th>조직 이름</th>
                    <th>Peer 이름</th>
                    <th>역할</th>
                    <th>종류</th>
                    <th>상태</th>
                  </tr>
                  <tr>
                    <td>msp</td>
                    <td>peer1</td>
                    <td>Endorser</td>
                    <td>아카이브노드</td>
                    <td>운영중</td>
                  </tr>
                  <tr>
                    <td>msp</td>
                    <td>peer2</td>
                    <td>Committer</td>
                    <td>풀노드</td>
                    <td>운영중</td>
                  </tr>
                  <tr>
                    <td>msp</td>
                    <td>peer3</td>
                    <td>Endorser</td>
                    <td>풀노드</td>
                    <td>운영중</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CTabPanel>
      </div>
    </PanelBox>
  );
};
export default ChannelsDetail;

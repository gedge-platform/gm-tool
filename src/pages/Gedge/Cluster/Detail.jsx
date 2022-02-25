import React, { useState, useEffect } from "react";
import CommActionBar from "@/components/common/CommActionBar";
import { CIconButton, CSelectButton } from "@/components/buttons";
import { PanelBox } from "@/components/styles/PanelBox";
import { swalConfirm } from "@/utils/swal-utils";
import { CScrollbar } from "@/components/scrollbars";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import { AgGrid } from "@/components/datagrids";
import { agDateColumnFilter } from "@/utils/common-utils";
import LogDialog from "../../Template/Dialog/LogDialog";
import { CDatePicker } from "@/components/textfields/CDatePicker";
import { observer } from "mobx-react";
import OrganizationStore from "../../../Store/OrganizationStore";
import { toJS } from "mobx";

const OrganizationDetail = observer((props) => {
    const { orgInfo } = OrganizationStore;
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

    // useEffect(() => {
    //     console.log(tabvalue)
    //     if (tabvalue === 0) {
    //         shareStore.height(2)
    //     }
    //     if (tabvalue === 1) {
    //         shareStore.height(4)
    //     }
    //     if (tabvalue === 2) {
    //         shareStore.height(6)
    //     }
    // }, [tabvalue])

    // shareStore.height(4)
    console.log(orgInfo);
    return (
        <PanelBox style={{ overflowY: "scroll" }}>
            <CTabs type="tab2" value={tabvalue} onChange={handleTabChange}>
                <CTab label="상세정보" />
                <CTab label="채널 정보" />
            </CTabs>
            <CTabPanel value={tabvalue} index={0}>
                <div className="tb_container">
                    <p
                        style={{
                            marginBottom: "8px",
                            fontSize: "14px",
                            fontWeight: "bold",
                        }}
                    ></p>
                    <table className="tb_data">
                        <tbody>
                            <tr>
                                <th>Node Type</th>
                                <th>Node 이름</th>
                                <th>상태</th>
                            </tr>
                            {toJS(orgInfo)?.map((item) => (
                                <tr>
                                    <td>{item.metadata.labels.hlfCategory}</td>
                                    <td>{item.metadata.labels.app}</td>
                                    <td>{item.status.phase}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CTabPanel>
            <CTabPanel value={tabvalue} index={1}>
                <div className="panelCont">
                    <div className="grid-height">
                        <table className="tb_data">
                            <tbody>
                                <tr>
                                    <th>조직 이름</th>
                                    <th>채널 이름</th>
                                </tr>
                                <tr>
                                    <td>block-orderer</td>
                                    <td>my-block-channel-1</td>
                                </tr>
                                <tr>
                                    <td>block-orderer</td>
                                    <td>my-block-channel-2</td>
                                </tr>
                                <tr>
                                    <td>block-orderer</td>
                                    <td>my-block-channel-3</td>
                                </tr>
                                <tr>
                                    <td>block-orderer</td>
                                    <td>my-block-channel-4</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </CTabPanel>
        </PanelBox>
    );
});
export default OrganizationDetail;

/*
    <PanelBox>
      <CTabs type="tab2" value={tabvalue} onChange={handleTabChange}>
        <CTab label="상세정보" />
        <CTab label="노드 정보" />
        <CTab label="채널 정보" />
      </CTabs>
      <div className="tabPanelContainer">
        <CTabPanel value={tabvalue} index={0}>
          <div className="tb_container">
            <table className="tb_data">
              <tbody>
                <tr>
                  <th>네트워크 이름</th>
                  <td>OOO 조회</td>
                  <th>조직ID</th>
                  <td>JSON</td>
                </tr>
                <tr>
                  <th>Import 여부</th>
                  <td colSpan={1}>N</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="tb_container">
            <table className="tb_data">
              <tbody>
                <tr>
                  <th>Node Type</th>
                  <th>Node 이름</th>
                  <th>상태</th>
                </tr>
                <tr>
                  <td>CA</td>
                  <td>block-ca</td>
                  <td>운영 중</td>
                </tr>
                <tr>
                  <td>Peer(Endorser)</td>
                  <td>block-peer1(Committer)</td>
                  <td>운영 중</td>
                </tr>
                <tr>
                  <td>Peer</td>
                  <td>block-peer2</td>
                  <td>운영 중</td>
                </tr>
                <tr>
                  <td>Peer</td>
                  <td>block-peer3</td>
                  <td>운영 중</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="tb_container">
            <table className="tb_data">
              <tbody>
                <tr>
                  <th>조직 이름</th>
                  <th>채널 이름</th>
                </tr>
                <tr>
                  <td>block-orderer</td>
                  <td>my-block-channel-1</td>
                </tr>
                <tr>
                  <td>block-orderer</td>
                  <td>my-block-channel-2</td>
                </tr>
                <tr>
                  <td>block-orderer</td>
                  <td>my-block-channel-3</td>
                </tr>
                <tr>
                  <td>block-orderer</td>
                  <td>my-block-channel-4</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CTabPanel>
        <CTabPanel value={tabvalue} index={1}>
          <div className="panelCont">
            <div className="grid-height">
              <table className="tb_data">
                <tbody>
                  <tr>
                    <th>Node Type</th>
                    <th>Node 이름</th>
                    <th>상태</th>
                  </tr>
                  <tr>
                    <td>CA</td>
                    <td>block-ca</td>
                    <td>운영 중</td>
                  </tr>
                  <tr>
                    <td>Peer(Endorser)</td>
                    <td>block-peer1(Committer)</td>
                    <td>운영 중</td>
                  </tr>
                  <tr>
                    <td>Peer</td>
                    <td>block-peer2</td>
                    <td>운영 중</td>
                  </tr>
                  <tr>
                    <td>Peer</td>
                    <td>block-peer3</td>
                    <td>운영 중</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CTabPanel>
        <CTabPanel value={tabvalue} index={2}>
          <div className="panelCont">
            <div className="grid-height">
              <table className="tb_data">
                <tbody>
                  <tr>
                    <th>조직 이름</th>
                    <th>채널 이름</th>
                  </tr>
                  <tr>
                    <td>block-orderer</td>
                    <td>my-block-channel-1</td>
                  </tr>
                  <tr>
                    <td>block-orderer</td>
                    <td>my-block-channel-2</td>
                  </tr>
                  <tr>
                    <td>block-orderer</td>
                    <td>my-block-channel-3</td>
                  </tr>
                  <tr>
                    <td>block-orderer</td>
                    <td>my-block-channel-4</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CTabPanel>
      </div>
    </PanelBox>
*/

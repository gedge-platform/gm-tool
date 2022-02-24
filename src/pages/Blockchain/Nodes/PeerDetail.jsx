import React, { useState } from 'react';
import CommActionBar from "@/components/common/CommActionBar";
import { CIconButton, CSelectButton } from "@/components/buttons";
import { PanelBox } from "@/components/styles/PanelBox";
import { swalConfirm } from "@/utils/swal-utils";
import { CScrollbar } from "@/components/scrollbars";
import { CTabs, CTab, CTabPanel } from '@/components/tabs';
import { AgGrid } from '@/components/datagrids'
import { agDateColumnFilter } from "@/utils/common-utils";
import LogDialog from "../../Template/Dialog/LogDialog";
import { CDatePicker } from "@/components/textfields/CDatePicker";
import Button from '@mui/material/Button';
import { XTerm } from 'xterm-for-react'


import { useHistory } from "react-router";

const PeerDetail = (props) => {

    const [tabvalue, setTabvalue] = useState(0);


    const handleTabChange = (event, newValue) => {
        setTabvalue(newValue);
    };

    const history = useHistory();

    const peerResource = () => {
        history.push('/nodes/peer/resource');
    }

    const peerChannel = () => {
        history.push('/nodes/peer/resource');
    }
    const openTerminal = () => {
        window.open('http://192.168.150.197:8070?network=default&podName=hello-world-5869894b4d-sx9kl&containerName=hello-world')
    }
    const openTerminal2 = () => {
        window.open('http://192.168.150.197:8070?network=default&podName=nginx&containerName=nginx')
    }

    return (
        <PanelBox>
            <CTabs
                type="tab2"
                value={tabvalue}
                onChange={handleTabChange}
            >
                <CTab label="상세정보" />
                <CTab label="Channel 정보" />
                <CTab label="Chaincode 정보" />
                <CTab label="Peer Endpoint 정보" />
                <CTab label="Peer 리소스 정보" />
                <CTab label="Peer container terminal" />
            </CTabs>
            <div className="tabPanelContainer">
                <CTabPanel
                    value={tabvalue}
                    index={0}
                >
                    <div className="panelCont">
                        <table className="tb_data">
                            <tbody>
                                <tr>
                                    <th>Organization 이름</th>
                                    <td>org1</td>
                                    <th>조직 MSP</th>
                                    <td>org-msp</td>
                                </tr>
                                <tr>
                                    <th>peer 이름</th>
                                    <td>peer1</td>
                                    <th>MSP CA</th>
                                    <td>block-organization</td>
                                </tr>
                                <tr>
                                    <th>데이터베이스</th>
                                    <td>LevelDB</td>
                                    <th>타입</th>
                                    <td>라이트 노드</td>
                                </tr>
                                <tr>
                                    <th>역할</th>
                                    <td>Endorsing</td>
                                    <th>블록체인 프레임워크</th>
                                    <td>Hyperledger Fbric 2.2.1</td>
                                </tr>
                                <tr>
                                    <th>CA 사용자 ID(Orderer)</th>
                                    <td>block-msp</td>
                                    <th>생성 일시</th>
                                    <td>{Date()}</td>
                                </tr>
                                <tr>
                                    <th>상태</th>
                                    <td>운영 중</td>
                                    <th>컨테이너 접속</th>
                                    <td><Button onClick={openTerminal}>컨테이너 접속</Button><Button onClick={openTerminal2}>컨테이너 접속2</Button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </CTabPanel>
                <CTabPanel
                    value={tabvalue}
                    index={1}
                >
                    <div className="panelCont">
                        <div className="grid-height">
                            <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                                <Button onClick={peerChannel}>Edit</Button>
                            </div>
                            <table className="tb_data">
                                <tbody>
                                    <tr>
                                        <th>Chnnel 이름</th>
                                    </tr>
                                    <tr>
                                        <td>my-block-channel1</td>
                                    </tr>
                                    <tr>
                                        <td>my-block-channel2</td>
                                    </tr>
                                    <tr>
                                        <td>my-block-channel3</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </CTabPanel>
                <CTabPanel
                    value={tabvalue}
                    index={2}
                >
                    <div className="panelCont">
                        <div className="grid-height">
                            <table className="tb_data">
                                <tbody>
                                    <tr>
                                        <th>Chaincode 이름</th>
                                        <th>버전</th>
                                        <th>변경일시</th>
                                        <th>등록자</th>
                                    </tr>
                                    <tr>
                                        <td>Chaincode01</td>
                                        <td>1.0</td>
                                        <td>{Date()}</td>
                                        <td>user1</td>
                                    </tr>
                                    <tr>
                                        <td>Chaincode02</td>
                                        <td>1.0</td>
                                        <td>{Date()}</td>
                                        <td>user2</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </CTabPanel>
                <CTabPanel
                    value={tabvalue}
                    index={3}
                >
                    <div className="panelCont">
                        <div className="grid-height">
                            <table className="tb_data">
                                <tbody>
                                    <tr>
                                        <th>URL</th>
                                        <td>grpcs://block-orderer-ekjwksfj.blockchain/etri:8080</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </CTabPanel>
                <CTabPanel
                    value={tabvalue}
                    index={4}
                >
                    <div className="panelCont">
                        <div className="grid-height">
                            <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                                <Button onClick={peerResource}>Edit</Button>
                            </div>
                            <table className="tb_data">
                                <tbody>
                                    <tr>
                                        <th>Peer 이름</th>
                                        <th>Container ID</th>
                                        <th>Status</th>
                                        <th>CPU(vCPU)</th>
                                        <th>Memory(MB)</th>
                                        <th>Storage(GB)</th>
                                        <th>GPU</th>
                                        <th>CSD</th>
                                        <th>비고</th>
                                    </tr>
                                    <tr>
                                        <td>block-orderer</td>
                                        <td>my-block-channel-1</td>
                                        <td>Running</td>
                                        <td>0.2</td>
                                        <td>400</td>
                                        <td>100</td>
                                        <td>Nvidia xxx</td>
                                        <td></td>
                                        <td>Terminal</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>

                    </div>
                </CTabPanel>
                <CTabPanel
                    value={tabvalue}
                    index={5}
                >

                    {/* <XTerm /> */}
                    {/* <ContainerTerminal baseUrl="" accessToken="" selfLink="" /> */}
                </CTabPanel>
            </div>
        </PanelBox >
    );
}
export default PeerDetail;

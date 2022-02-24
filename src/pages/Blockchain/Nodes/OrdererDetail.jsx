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
import { useHistory } from "react-router";

const OrdererDetail = (props) => {
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

    const history = useHistory();

    const ordResource = () => {
        history.push('/nodes/orderer/resource');
    }

    const ordInfo = () => {
        history.push('/nodes/orderer/resource');
    }

    const ordService = () => {
        history.push('/nodes/orderer/resource');
    }

    return (
        <PanelBox>
            <CTabs
                type="tab2"
                value={tabvalue}
                onChange={handleTabChange}
            >
                <CTab label="상세정보" />
                <CTab label="오더링 서비스 정보" />
                <CTab label="전체 Channel 정보" />
                <CTab label="오더링 서비스의 엔드포인트 정보" />
                <CTab label="Orderer 리소스 정보" />
            </CTabs>
            <div className="tabPanelContainer">
                <CTabPanel
                    value={tabvalue}
                    index={0}
                >
                    <div className="panelCont">
                        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                            <Button onClick={ordInfo}>Edit</Button>
                        </div>
                        <table className="tb_data">
                            <tbody>
                                <tr>
                                    <th>Ordering 서비스 이름</th>
                                    <td>orderer1</td>
                                    <th>Ordeing 서비스 MSP</th>
                                    <td>block-msp</td>
                                </tr>
                                <tr>
                                    <th>Orderer 유형</th>
                                    <td>Raft 1</td>
                                    <th>Import 여부</th>
                                    <td>N</td>
                                </tr>
                                <tr>
                                    <th>오더링 서비스 CA</th>
                                    <td>block_ca</td>
                                    <th>네트워크 위치</th>
                                    <td>my-block-net1</td>
                                </tr>
                                <tr>
                                    <th>CA 사용자 ID(Orderer)</th>
                                    <td>block-msp</td>
                                    <th>블록체인 프레임워크</th>
                                    <td>Hyperledger Fbric 2.2.1</td>
                                </tr>
                                <tr>
                                    <th>상태</th>
                                    <td>운영중</td>
                                    <th>생성 일시</th>
                                    <td>{Date()}</td>
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
                                <Button onClick={ordService}>Edit</Button>
                            </div>
                            <table className="tb_data">
                                <tbody>
                                    <tr>
                                        <th>Chnnel 이름</th>
                                        <th>Import 여부</th>
                                        <th>네트워크 위치</th>
                                    </tr>
                                    <tr>
                                        <td>msp</td>
                                        <td>n</td>
                                        <td>my-block-net1</td>
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
                                        <th>channel 이름</th>
                                        <th>channel 운영자</th>
                                    </tr>
                                    <tr>
                                        <td>block-channel</td>
                                        <td>msp</td>
                                    </tr>
                                    <tr>
                                        <td>channel</td>
                                        <td>msp2</td>
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
                                        <th>오더링 서비스의 엔드포인트 정보</th>
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
                                <Button onClick={ordResource}>Edit</Button>
                            </div>
                            <table className="tb_data">
                                <tbody>
                                    <tr>
                                        <th>Container </th>
                                        <th>Status</th>
                                        <th>CPU(vCPU)</th>
                                        <th>Memory(MB)</th>
                                        <th>Storage(GB)</th>
                                        <th>비고</th>
                                    </tr>
                                    <tr>
                                        <td>my-block-channel-1</td>
                                        <td>Running</td>
                                        <td>0.2</td>
                                        <td>400</td>
                                        <td>100</td>
                                        <td>Terminal</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </CTabPanel>
            </div>
        </PanelBox>
    );
}
export default OrdererDetail;

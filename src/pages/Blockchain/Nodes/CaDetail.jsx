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

const CaDetail = (props) => {
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

    const caResource = () => {
        history.push('/nodes/ca/resource');
    }

    return (
        <PanelBox>
            <CTabs
                type="tab2"
                value={tabvalue}
                onChange={handleTabChange}
            >
                <CTab label="상세정보" />
                <CTab label="Endpoint 정보" />
                <CTab label="리소스 정보" />
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
                                    <th>CA 이름</th>
                                    <td>orderer1</td>
                                    <th>CA 관리자 ID</th>
                                    <td>block-msp</td>
                                </tr>
                                <tr>
                                    <th>데이터베이스</th>
                                    <td>SQLite</td>
                                    <th>블록체인 프레임워크</th>
                                    <td>Hyperledger Fabric 2.2.1</td>
                                </tr>
                                <tr>
                                    <th>상태</th>
                                    <td>운영 중</td>
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
                            <table className="tb_data">
                                <tbody>
                                    <tr>
                                        <th>URL</th>
                                    </tr>
                                    <tr>
                                        <td>grpcs://block-orderer-ekjwksfj.blockchain/etri:8080</td>
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
                            <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                                <Button onClick={caResource}>Edit</Button>
                            </div>
                            <table className="tb_data">
                                <tbody>
                                    <tr>
                                        <th>Container</th>
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
export default CaDetail;

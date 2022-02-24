import React, { useState } from 'react';
import CommActionBar from "@/components/common/CommActionBar";
import { CIconButton, CSelectButton } from "@/components/buttons";
import { PanelBox } from "@/components/styles/PanelBox";
import { swalConfirm } from "@/utils/swal-utils";
import { CScrollbar } from "@/components/scrollbars";
import { CTabs, CTab, CTabPanel } from '@/components/tabs';
import { AgGrid } from '@/components/datagrids'
import { agDateColumnFilter } from "@/utils/common-utils";
// import LogDialog from "../Dialog/LogDialog";
import { CDatePicker } from "@/components/textfields/CDatePicker";
import networkStore from '../../../Store/NetworkStore';
import { observer } from 'mobx-react';
import moment from "moment";
import { getItem } from "@/utils/sessionStorageFn";
const NetworkDetail = observer((props) => {
    const [open, setOpen] = useState(false);
    const [tabvalue, setTabvalue] = useState(0);
    const handleTabChange = (event, newValue) => {
        setTabvalue(newValue);
    };

    const networkInfo = networkStore.selectNetwork;
    console.log(networkInfo)

    return (
        <PanelBox>
            <CTabs
                type="tab2"
                value={tabvalue}
                onChange={handleTabChange}
            >
                <CTab label="상세정보" />
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
                                    <th>네트워크 이름</th>
                                    <td>{networkInfo.name}</td>
                                    <th>블록체인 버전</th>
                                    <td>{networkInfo.version}</td>
                                </tr>
                                <tr>
                                    <th>상태</th>
                                    {networkInfo.state === "1" ?
                                        <>
                                            <td>운영중</td>
                                        </> :
                                        <>
                                            <td>삭제중</td>
                                        </>}
                                    <th>생성 일시</th>
                                    <td>{moment(new Date(networkInfo.created_at)).format(
                                        "YYYY-MM-DD HH:mm"
                                    )}</td>

                                </tr>
                                <tr>
                                    <th>Oragnizations</th>
                                    <td>{networkInfo.organization}</td>
                                    <th>Peers</th>
                                    <td>{networkInfo.peer}</td>
                                </tr>
                                <tr>
                                    <th>Orderers</th>
                                    <td>{networkInfo.orderer}</td>
                                    <th>생성자</th>
                                    <td>{getItem("user")}</td>
                                </tr>
                                <tr>
                                    <th>Channels</th>
                                    <td>{networkInfo.channel}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </CTabPanel>
            </div>
        </PanelBox>


    );
})
export default NetworkDetail;

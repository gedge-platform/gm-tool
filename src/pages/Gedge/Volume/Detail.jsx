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
import { toJS } from "mobx";
import volumeStore from "../../../store/Volume";

const Detail = observer(({ pVolume }) => {
    Object.entries(pVolume?.annotations).forEach(([keys, value]) => {
        {
            if (typeof value === "string") {
                try {
                    console.log(JSON.parse(value));
                } catch (e) {
                    console.log(keys, value);
                }
            }
        }
    });

    const [open, setOpen] = useState(false);
    const [tabvalue, setTabvalue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabvalue(newValue);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {}, []);
    return (
        <PanelBox style={{ overflowY: "scroll" }}>
            <CTabs type="tab2" value={tabvalue} onChange={handleTabChange}>
                <CTab label="Detail" />
                <CTab label="Claim" />
                <CTab label="Metadata" />
                <CTab label="Event" />
            </CTabs>
            <CTabPanel value={tabvalue} index={0}>
                <div className="panelCont">
                    <table className="tb_data">
                        <tbody>
                            <tr>
                                <th className="tb_volume_detail_th">name</th>
                                <td>{pVolume?.name}</td>
                                <th>capacity</th>
                                <td>{pVolume?.capacity}</td>
                            </tr>
                            <tr>
                                <th className="tb_volume_detail_th">
                                    accessMode
                                </th>
                                <td>{pVolume?.accessMode}</td>
                                <th>reclaimPolicy</th>
                                <td>{pVolume?.reclaimPolicy}</td>
                            </tr>
                            <tr>
                                <th>status</th>
                                <td>{pVolume?.status}</td>
                                <th>claim</th>
                                <td>{pVolume?.claim?.name}</td>
                            </tr>
                            <tr>
                                <th>cluster</th>
                                <td>{pVolume?.cluster}</td>
                                <th>storageClass</th>
                                <td>{pVolume?.storageClass}</td>
                            </tr>
                            <tr>
                                <th>volumeMode</th>
                                <td>{pVolume?.volumeMode}</td>
                                <th>createAt</th>
                                <td>{pVolume?.createAt}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </CTabPanel>
            <CTabPanel value={tabvalue} index={1}>
                <div className="panelCont">
                    <table className="tb_data">
                        <tbody>
                            <tr>
                                <th className="tb_volume_detail_th">name</th>
                                <td>{pVolume?.claim?.name}</td>
                                <th className="tb_volume_detail_th">
                                    capacity
                                </th>
                                <td>{pVolume?.claim?.namespace}</td>
                            </tr>
                            <tr>
                                <th>accessMode</th>
                                <td>{pVolume?.claim?.kind}</td>
                                <th>reclaimPolicy</th>
                                <td>{pVolume?.claim?.apiVersion}</td>
                            </tr>
                            <tr>
                                <th>status</th>
                                <td>{pVolume?.claim?.resourceVersion}</td>
                                <th>uid</th>
                                <td>{pVolume?.claim?.uid}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </CTabPanel>
            <CTabPanel value={tabvalue} index={2}>
                <div className="panelCont">
                    <table className="tb_data">
                        <tbody></tbody>
                    </table>
                </div>
            </CTabPanel>
            <CTabPanel value={tabvalue} index={3}>
                <div className="panelCont">
                    <table className="tb_data">
                        <tbody>
                            <tr>
                                <th className="tb_volume_detail_th">event</th>
                                <td>{pVolume?.event}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </CTabPanel>
        </PanelBox>
    );
});
export default Detail;

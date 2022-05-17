import React, { useState, useEffect } from "react";
import CommActionBar from "@/components/common/CommActionBar";
import { CIconButton, CSelectButton } from "@/components/buttons";
import { PanelBox } from "@/components/styles/PanelBox";
import { swalConfirm } from "@/utils/swal-utils";
import { CScrollbar } from "@/components/scrollbars";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import { AgGrid } from "@/components/datagrids";
import LogDialog from "../../Template/Dialog/LogDialog";
import { CDatePicker } from "@/components/textfields/CDatePicker";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import ReactJson from "react-json-view";
import { isValidJSON } from "@/utils/common-utils";
import EventAccordion from "@/components/detail/EventAccordion";
import volumeStore from "../../../store/Volume";

const ClaimDetail = observer(({ pvClaim1, metadata }) => {
  const [open, setOpen] = useState(false);
  const [tabvalue, setTabvalue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabvalue(newValue);
  };

  const { pvClaimLables, pvClaim } = volumeStore;

  const annotationTable = [];
  const eventTable = [];

  Object.entries(metadata).map(([key, value]) => {
    annotationTable.push(
      <tr>
        <th className="tb_volume_detail_th">{key}</th>
        <td>{value}</td>
      </tr>
    );
  });

  const metaTable = [];
  if (pvClaim?.annotations) {
    Object.entries(pvClaim?.annotations).map(([key, value]) => {
      console.log(value);
      console.log(isValidJSON(value));
      metaTable.push(
        <tr>
          <th style={{ width: "20%" }}>{key}</th>
          <td>
            {isValidJSON(value) ? (
              <ReactJson
                src={JSON.parse(value)}
                theme="summerfruit"
                displayDataTypes={false}
                displayObjectSize={false}
              />
            ) : (
              value
            )}
          </td>
        </tr>
      );
    });
  }

  return (
    <PanelBox style={{ overflowY: "scroll" }}>
      <CTabs type="tab2" value={tabvalue} onChange={handleTabChange}>
        <CTab label="Overview" />
        <CTab label="Annotations" />
        <CTab label="Event" />
        <CTab label="Finalizers" />
      </CTabs>
      <CTabPanel value={tabvalue} index={0}>
        <div className="panelCont">
          <table className="tb_data">
            <tbody>
              <tr>
                <th className="tb_volume_detail_th">name</th>
                <td className="tb_volume_detail_td">{pvClaim?.name}</td>
                <th>capacity</th>
                <td>{pvClaim?.capacity}</td>
              </tr>
              <tr>
                <th className="tb_volume_detail_th">namespace</th>
                <td className="tb_volume_detail_td">{pvClaim?.namespace}</td>
                <th>accessMode</th>
                <td>{pvClaim?.accessMode}</td>
              </tr>
              <tr>
                <th>status</th>
                <td>{pvClaim?.status}</td>
                <th>volume</th>
                <td>{pvClaim?.volume}</td>
              </tr>
              <tr>
                <th>clusterName</th>
                <td>{pvClaim?.clusterName}</td>
                <th>storageClass</th>
                <td>{pvClaim?.storageClass}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={1}>
        <div className="panelCont">
          <table className="tb_data">
            <tbody>{metaTable}</tbody>
          </table>
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={2}>
        <EventAccordion events={pvClaim.events} />
      </CTabPanel>
      <CTabPanel value={tabvalue} index={3}>
        <div className="panelCont">
          <table className="tb_data">
            <tbody>
              <tr>
                <th className="tb_volume_detail_th">Finalizers</th>
                <td>{pvClaim?.finalizers}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CTabPanel>
    </PanelBox>
  );
});
export default ClaimDetail;

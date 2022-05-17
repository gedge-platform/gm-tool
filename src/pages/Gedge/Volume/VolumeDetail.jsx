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
import {
  agDateColumnFilter,
  dateFormatter,
  isValidJSON,
  nullCheck,
} from "@/utils/common-utils";
import EventAccordion from "@/components/detail/EventAccordion";
import volumeStore from "../../../store/Volume";

const VolumeDetail = observer(({ pVolume1, metadata }) => {
  const [open, setOpen] = useState(false);
  const [tabvalue, setTabvalue] = useState(0);

  const { pVolume } = volumeStore;
  const handleTabChange = (event, newValue) => {
    setTabvalue(newValue);
  };

  const labelTable = [];

  Object.entries(metadata).map(([key, value]) => {
    labelTable.push(
      <tr>
        <th>{key}</th>
        <td>{value}</td>
      </tr>
    );
  });

  // Object.entries(pVolume?.annotations).map(([key, value]) => {
  //   <tr>
  //     <th style={{ width: "40%" }}>{key}</th>
  //     {/* <td>
  //       {isValidJSON(value) ? (
  //         <ReactJson
  //           src={JSON.parse(value)}
  //           theme="summerfruit"
  //           displayDataTypes={false}
  //           displayObjectSize={false}
  //         />
  //       ) : (
  //         value
  //       )}
  //     </td> */}
  //     <td></td>
  //   </tr>;
  // });
  const metaTable = [];
  if (pVolume?.annotations) {
    Object.entries(pVolume?.annotations).map(([key, value]) => {
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
    <PanelBox>
      <CTabs type="tab2" value={tabvalue} onChange={handleTabChange}>
        <CTab label="Overview" />
        <CTab label="Claim" />
        <CTab label="Annotations" />
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
                <th className="tb_volume_detail_th">accessMode</th>
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
                <th className="tb_volume_detail_th">namespace</th>
                <td>{pVolume?.claim?.namespace}</td>
              </tr>
              <tr>
                <th>kind</th>
                <td>{pVolume?.claim?.kind}</td>
                <th>apiVersion</th>
                <td>{pVolume?.claim?.apiVersion}</td>
              </tr>
              <tr>
                <th>resourceVersion</th>
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
            <tbody>{metaTable}</tbody>
          </table>
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={3}>
        <EventAccordion events={pVolume.events} />
      </CTabPanel>
    </PanelBox>
  );
});
export default VolumeDetail;

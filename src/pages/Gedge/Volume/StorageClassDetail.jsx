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
import { create } from "lodash";
//
const StorageClassDetail = observer(() => {
  const [open, setOpen] = useState(false);
  const [tabvalue, setTabvalue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabvalue(newValue);
  };

  const { storageClass, scAnnotations, scLables, scParameters } = volumeStore;

  const annotationTable = [];
  const labelTable = [];
  const parameterTable = [];

  const createTableTemplate = (table, param) => {
    if (param) {
      Object.entries(param).map(([key, value]) => {
        table.push(
          <tr>
            <th className="tb_volume_detail_th">{key}</th>
            <td>{value}</td>
          </tr>
        );
      });
    } else {
      table.push(
        <tr>
          <th className="tb_volume_detail_th">Emtpy</th>
          <td></td>
        </tr>
      );
    }
  };

  createTableTemplate(annotationTable, scAnnotations);
  createTableTemplate(labelTable, scLables);
  createTableTemplate(parameterTable, scParameters);

  return (
    <PanelBox style={{ overflowY: "hidden" }}>
      <CTabs type="tab2" value={tabvalue} onChange={handleTabChange}>
        <CTab label="Detail" />
        <CTab label="Annotations" />
        <CTab label="Labels" />
        <CTab label="Parameters" />
      </CTabs>
      <CTabPanel value={tabvalue} index={0}>
        <div className="panelCont">
          <table className="tb_data">
            <tbody>
              <tr>
                <th className="tb_volume_detail_th">name</th>
                <td className="tb_volume_detail_td">{storageClass?.name}</td>
                <th>capacity</th>
                <td>{storageClass?.cluster}</td>
              </tr>
              <tr>
                <th className="tb_volume_detail_th">namespace</th>
                <td className="tb_volume_detail_td">
                  {storageClass?.reclaimPolicy}
                </td>
                <th>accessMode</th>
                <td>{storageClass?.provisioner}</td>
              </tr>
              <tr>
                <th>status</th>
                <td>{storageClass?.volumeBindingMode}</td>
                <th>volume</th>
                <td>{storageClass?.allowVolumeExpansion}</td>
              </tr>
              <tr>
                <th>clusterName</th>
                <td>{storageClass?.createAt}</td>
                <th>{null}</th>
                <td>{null}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={1}>
        <div className="panelCont">
          <table className="tb_data">
            <tbody>{annotationTable}</tbody>
          </table>
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={2}>
        <div className="panelCont">
          <table className="tb_data">
            <tbody>{labelTable}</tbody>
          </table>
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={3}>
        <div className="panelCont">
          <table className="tb_data">
            <tbody>{parameterTable}</tbody>
          </table>
        </div>
      </CTabPanel>
    </PanelBox>
  );
});

export default StorageClassDetail;

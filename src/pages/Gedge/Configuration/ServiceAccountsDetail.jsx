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
import styled from "styled-components";
import moment from "moment";
import serviceAccountStore from "../../../store/ServiceAccount";

const TableTitle = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin: 8px 0;
`;

const ServiceAccountsDetail = observer(() => {
  const { serviceAccountTabList } = serviceAccountStore;
  // toJS // console.log(toJS(serviceAccountTabList));

  const annotionsTable = [];
  const annotaions = serviceAccountTabList.annotations;

  const labelTable = [];
  const label = serviceAccountTabList.label;

  const secretTable = [];
  const secrets = serviceAccountTabList.secrets;

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

  Object.entries(annotaions).map(([keys, value]) => {
    annotionsTable.push(
      <tr>
        <th>key</th>
        <td>{keys}</td>
        <th>value</th>
        <td style={{ wordBreak: "break-all", wordWrap: "break-word" }}>
          {/* 강제로 줄바꿈 */}
          {value}
        </td>
      </tr>
    );
  });

  Object.entries(label).map(([keys, value]) => {
    labelTable.push(
      <tr>
        <th>Label Account</th>
        <td
          colspan="2"
          style={{ wordBreak: "break-all", wordWrap: "break-word" }}
        >
          {/* 강제로 줄바꿈 */}
          {value}
        </td>
      </tr>
    );
  });

  secrets.map((event) => {
    secretTable.push(
      <tr>
        <th>Secrets Name</th>
        <td>{event.name}</td>
      </tr>
    );
  });

  return (
    <PanelBox style={{ overflowY: "scroll" }}>
      <CTabs type="tab2" value={tabvalue} onChange={handleTabChange}>
        <CTab label="Data" />
      </CTabs>
      <CTabPanel value={tabvalue} index={0}>
        <div className="tb_container">
          <table className="tb_data">
            <tbody>
              <tr>
                <th>Name</th>
                <td>{serviceAccountTabList.name}</td>
              </tr>
              <tr>
                <th>Project</th>
                <td>{serviceAccountTabList.namespace}</td>
              </tr>
              <tr>
                <th>Cluster</th>
                <td>{serviceAccountTabList.cluster}</td>
              </tr>
              {secretTable}
              <tr>
                <th>Secrets Count</th>
                <td>{serviceAccountTabList.secretCnt}</td>
              </tr>
              {labelTable}
              <tr>
                <th>Create Time</th>
                <td>
                  {moment(serviceAccountTabList.createAt).format(
                    "YYYY-MM-DD HH:MM"
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <TableTitle>Annotations</TableTitle>
          <table className="tb_data">
            <tbody>{annotionsTable}</tbody>
          </table>
          <br />
        </div>
      </CTabPanel>
    </PanelBox>
  );
});
export default ServiceAccountsDetail;

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
import configmapsStore from "../../../store/Configmaps";
import moment from "moment";
import styled from "styled-components";

const TableTitle = styled.p`
  font-size: 14px;
  font-weight: 500;
  margin: 8px 0;
  color: rgba(255, 255, 255, 0.8);
`;

const ConfigmapsDetail = observer(() => {
  const {
    configmapsList,
    configmapsDetail,
    configmapsData,
    configmapsTabList,
  } = configmapsStore;

  const dataTable = [];
  const metadata = configmapsTabList.data;

  const annotationsTable = [];
  const annotations = configmapsTabList.annotations;

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

  Object.entries(metadata).map(([key, value]) => {
    dataTable.push(
      <tr>
        <th>{key}</th>
        <td>{value}</td>
      </tr>
    );
  });

  Object.entries(annotations).map(([key, value]) => {
    annotationsTable.push(
      <tr>
        <th>{key}</th>
        <td>{value}</td>
        {/* <td style={{ whiteSpace: "pre-line" }}>{value.String()}</td> */}
      </tr>
    );
  });

  return (
    <PanelBox style={{ overflowY: "hidden" }}>
      <CTabs type="tab2" value={tabvalue} onChange={handleTabChange}>
        <CTab label="Data" />
      </CTabs>
      <CTabPanel value={tabvalue} index={0}>
        <div className="tb_container">
          <table className="tb_data">
            <tbody className="tb_data_detail">
              <tr>
                <th>Name</th>
                <td>{configmapsTabList.name}</td>
                <th>Project</th>
                <td>{configmapsTabList.namespace}</td>
              </tr>
              <tr>
                <th>Cluster</th>
                <td>{configmapsTabList.cluster}</td>
                <th>Data Count</th>
                <td>{configmapsTabList.dataCnt}</td>
              </tr>
              <tr>
                <th>Create Time</th>
                <td>
                  {moment(configmapsTabList.createAt).format(
                    "YYYY-MM-DD HH:MM"
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <TableTitle>Annotations</TableTitle>
          <table className="tb_data">
            <tbody>
              {annotationsTable.length > 0 ? (
                annotationsTable
              ) : (
                <tr>
                  <td>No Annotations Info.</td>
                </tr>
              )}
            </tbody>
          </table>

          <br />
          <TableTitle>Data</TableTitle>
          <table className="tb_data">
            <tbody>{dataTable}</tbody>
          </table>
          <br />
        </div>
      </CTabPanel>
    </PanelBox>
  );
});
export default ConfigmapsDetail;

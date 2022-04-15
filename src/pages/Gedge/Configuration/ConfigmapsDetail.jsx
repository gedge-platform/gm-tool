import React, { useState } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import { observer } from "mobx-react";
import configmapsStore from "../../../store/Configmaps";
import styled from "styled-components";
import { dateFormatter, isValidJSON } from "../../../utils/common-utils";
import ReactJson from "react-json-view";

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
                <td>{dateFormatter(configmapsTabList.createAt)}</td>
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

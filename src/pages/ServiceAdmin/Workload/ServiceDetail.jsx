import React, { useState, useEffect } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import styled from "styled-components";
import moment from "moment";
import serviceStore from "../../../store/Service";
import { observer } from "mobx-react-lite";

const TableTitle = styled.p`
  font-size: 14px;
  font-weight: 500;
  margin: 8px 0;
  color: #fff;
`;

const Detail = observer(() => {
  const { serviceDetail, portTemp, involvesPods, involvesWorkloads } =
    serviceStore;
  const [open, setOpen] = useState(false);
  const [tabvalue, setTabvalue] = useState(0);

  const port = portTemp;
  const portTable = [];

  // port.map((event) => {
  //   portTable.push(
  //     <tr>
  //       <th className="tb_workload_detail_th">Port</th>
  //       <td>{event["port"]}</td>
  //       <th className="tb_workload_detail_th">Protocol</th>
  //       <td>{event["protocol"]}</td>
  //       <th className="tb_workload_detail_th">TargerPort</th>
  //       <td>{event["targetPort"]}</td>
  //     </tr>
  //   );
  // });
  const podInfo = involvesPods;
  const podTable = [];

  const workloadInfo = involvesWorkloads;
  const workloadTable = [];

  {
    port &&
      port.map((item) => {
        portTable.push(
          <>
            <th>Port</th>
            <td>{item["port"]}</td>
          </>
        );
      });
  }

  {
    podInfo &&
      podInfo.map((item) => {
        podTable.push(
          <>
            <th>Pod</th>
            <td>{item["ip"]}</td>
            <th>Node name</th>
            <td>{item["nodename"]}</td>
            <th>Name</th>
            <td>{item["name"]}</td>
          </>
        );
      });
  }

  {
    workloadInfo &&
      workloadInfo.map((item) => {
        workloadTable.push(
          <>
            <th>Name</th>
            <td>{item["name"]}</td>
            <th>Kind</th>
            <td>{item["kind"]}</td>
            <th>Replica Name</th>
            <td>{item["replicaName"]}</td>
          </>
        );
      });
  }

  const handleTabChange = (event, newValue) => {
    setTabvalue(newValue);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <PanelBox style={{ overflowY: "hidden" }}>
      <CTabs type="tab2" value={tabvalue} onChange={handleTabChange}>
        ``
        <CTab label="Overview" />
        <CTab label="Resources" />
        <CTab label="Port Info" />
      </CTabs>
      <CTabPanel value={tabvalue} index={0}>
        <div className="tb_container">
          <TableTitle>상세정보</TableTitle>
          <table className="tb_data" style={{ tableLayout: "fixed" }}>
            <tbody>
              <tr>
                <th className="tb_workload_detail_th">Name</th>
                <td>{serviceDetail.name}</td>
                <th className="tb_workload_detail_th">Cluster</th>
                <td>{serviceDetail.cluster}</td>
              </tr>
              <tr>
                <th>Project</th>
                <td>{serviceDetail.project}</td>
                <th>Workspace</th>
                <td></td>
              </tr>
              <tr>
                <th>Type</th>
                <td>{serviceDetail.type}</td>
                <th>Cluster IP</th>
                <td>{serviceDetail.clusterIp}</td>
              </tr>
              <tr>
                <th>Session Affinity</th>
                <td>{serviceDetail.sessionAffinity}</td>
                <th>Created</th>
                <td>
                  {moment(serviceDetail.createAt).format("YYYY-MM-DD HH:mm")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={1}>
        <div className="tb_container">
          <TableTitle>Pod</TableTitle>
          <table className="tb_data">
            <tbody>
              <tr>{podTable}</tr>
            </tbody>
          </table>
          <br />
          <TableTitle>Workload</TableTitle>
          <table className="tb_data">
            <tbody>
              <tr>{workloadTable}</tr>
            </tbody>
          </table>
          <br />
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={2}>
        <div className="tb_container">
          <TableTitle>포트</TableTitle>
          <table className="tb_data" style={{ tableLayout: "fixed" }}>
            <tbody>{portTable}</tbody>
          </table>
          <br />
        </div>
      </CTabPanel>
    </PanelBox>
  );
});

export default Detail;

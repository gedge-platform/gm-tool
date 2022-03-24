import React, { useState, useEffect } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import styled from "styled-components";
import moment from "moment";
import deploymentStore from "../../../store/Deployment";
import { observer } from "mobx-react-lite";

const TableTitle = styled.p`
  font-size: 14px;
  font-weight: 500;
  margin: 8px 0;
  color: #fff;
`;

const Detail = observer(() => {
  const {
    deploymentDetail,
    rollingUpdate,
    labels,
    annotations,
    deploymentResource,
    pods,
  } = deploymentStore;
  const [open, setOpen] = useState(false);
  const [tabvalue, setTabvalue] = useState(0);

  const strategyTable = [];
  const strategy = rollingUpdate;

  const labelTable = [];
  const label = labels;

  const annotationTable = [];
  const annotation = annotations;

  const podInfoTable = [];
  // const podInfo = deploymentResource;

  const handleTabChange = (event, newValue) => {
    setTabvalue(newValue);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  Object.entries(strategy).map(([key, value]) => {
    strategyTable.push(
      <>
        <th>{key}</th>
        <td>{value}</td>
      </>
    );
  });

  Object.entries(label).map(([key, value]) => {
    labelTable.push(
      <tr>
        <th>{key}</th>
        <td>{value}</td>
      </tr>
    );
  });
  /*
  Object.entries(pods).map((event) => {
    podInfoTable.push(<tr>{console.log(event)}</tr>);
  });
*/
  pods.map((event) => {
    podInfoTable.push(
      <div>
        <tr>
          <th>{event["name"]}</th>
          <th>{event["status"]}</th>
          <th>{event["node"]}</th>
          <th>{event["podIP"]}</th>
          <th>{event["restart"]}</th>
        </tr>
      </div>
    );
  });

  Object.entries(annotation).map(([key, value]) => {
    annotationTable.push(
      <tr>
        {console.log(key, value)}
        <th>{key}</th>
        <td>{value}</td>
      </tr>
    );
  });

  return (
    <PanelBox>
      <CTabs type="tab2" value={tabvalue} onChange={handleTabChange}>
        <CTab label="Overview" />
        <CTab label="Resources" />
        <CTab label="Metadata" />
        <CTab label="Events" />
      </CTabs>
      <CTabPanel value={tabvalue} index={0}>
        <div className="tb_container">
          <TableTitle>상세정보</TableTitle>
          <table className="tb_data">
            <tbody>
              <tr>
                <th>Name</th>
                <td>{deploymentDetail.name}</td>
                <th>Cluster</th>
                <td>{deploymentDetail.cluster}</td>
              </tr>
              <tr>
                <th>Project</th>
                <td>{deploymentDetail.project}</td>
                <th>Workspace</th>
                <td>{deploymentDetail.workspace}</td>
              </tr>
              <tr>
                <th>Status</th>
                <td>{deploymentDetail.ready}</td>
                <th>Strategy</th>
                <tr>{strategyTable}</tr>
              </tr>
              <tr>
                <th>Created</th>
                <td>
                  {moment(deploymentDetail.createAt).format("YYYY-MM-DD HH:mm")}
                </td>
                <th>Updated</th>
                <td>
                  {moment(deploymentDetail.updateAt).format("YYYY-MM-DD HH:mm")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={1}>
        <div className="tb_container">
          <TableTitle>Pod Info</TableTitle>
          <table className="tb_data">
            <tbody>
              <tr>{podInfoTable}</tr>
            </tbody>
          </table>
          <br />
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={2}>
        <div className="tb_container">
          <TableTitle>라벨</TableTitle>
          <table className="tb_data">
            <tbody>{labelTable}</tbody>
          </table>
          <br />
          <TableTitle>어노테이션</TableTitle>
          <table className="tb_data">
            <tbody>{annotationTable}</tbody>
          </table>
          <br />
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={3}>
        <div className="tb_container">
          <TableTitle>이벤트</TableTitle>
          <table className="tb_data">
            <tbody>
              <tr>
                <th>Events</th>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </CTabPanel>
    </PanelBox>
  );
});

export default Detail;

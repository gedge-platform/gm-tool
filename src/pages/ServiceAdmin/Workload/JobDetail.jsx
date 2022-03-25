import React, { useState, useEffect } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import styled from "styled-components";
import moment from "moment";
import { observer } from "mobx-react";
import jobStore from "../../../store/Job";

const TableTitle = styled.p`
  font-size: 14px;
  font-weight: 500;
  margin: 8px 0;
  color: #fff;
`;

const Detail = observer(() => {
  const { jobDetailData, jobDetailInvolves, labels, annotations, events } =
    jobStore;
  const [open, setOpen] = useState(false);
  const [tabvalue, setTabvalue] = useState(0);

  const labelTable = [];
  const label = labels;

  const annotationTable = [];
  const annotation = annotations;

  const eventsTable = [];

  Object.entries(label).map(([key, value]) => {
    labelTable.push(
      <tr>
        <th>{key}</th>
        <td>{value}</td>
      </tr>
    );
  });

  Object.entries(annotation).map(([key, value]) => {
    annotationTable.push(
      <tr>
        <th>{key}</th>
        <td>{value}</td>
      </tr>
    );
  });

  if (events !== null) {
    events.map((event) => {
      eventsTable.push(
        <tr>
          <th>Message</th>
          <td>{event["message"]}</td>
        </tr>
      );
    });
  } else {
    eventsTable.push(
      <tr>
        <th>Message</th>
        <td></td>
      </tr>
    );
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
    <PanelBox style={{ overflowY: "scroll" }}>
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
                <td>{jobDetailData.name}</td>
                <th>Cluster</th>
                <td>{jobDetailData.cluster}</td>
              </tr>
              <tr>
                <th>Project</th>
                <td>{jobDetailData.project}</td>
                <th>Status</th>
                <td>{jobDetailData.status}</td>
              </tr>
              <tr>
                <th>BackOffLimit</th>
                <td>{jobDetailData.backoffLimit}</td>
                <th>Completions</th>
                <td>{jobDetailData.completions}</td>
              </tr>
              <tr>
                <th>Created</th>
                <td>{moment(jobDetailData.created_at).format("YYYY-MM-DD")}</td>
                <th>Creator</th>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={1}>
        <div className="tb_container">
          <TableTitle>라벨</TableTitle>
          <table className="tb_data">
            <tbody>
              <tr>
                <th>app</th>
                <td>{jobDetailInvolves.PodList}</td>
              </tr>
              <tr>
                <th>ceph-version</th>
                <td></td>
              </tr>
              <tr>
                <th>rook-version</th>
                <td></td>
              </tr>
              <tr>
                <th>rook_cluster</th>
                <td></td>
              </tr>
            </tbody>
          </table>
          <br />
          <TableTitle>어노테이션</TableTitle>
          <table className="tb_data">
            <tbody>
              <tr>
                <th>Annotations</th>
                <td>{jobDetailData.annotations}</td>
              </tr>
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
            <tbody>{eventsTable}</tbody>
          </table>
        </div>
      </CTabPanel>
    </PanelBox>
  );
});
export default Detail;

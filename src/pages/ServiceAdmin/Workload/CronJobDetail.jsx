import React, { useState, useEffect } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import styled from "styled-components";
import moment from "moment";
import cronJobStore from "../../../store/CronJob";
import { observer } from "mobx-react-lite";

const TableTitle = styled.p`
  font-size: 14px;
  font-weight: 500;
  margin: 8px 0;
  color: #fff;
`;

const Detail = observer(() => {
  const { cronJobDetail, label, annotations, events } = cronJobStore;
  const [open, setOpen] = useState(false);
  const [tabvalue, setTabvalue] = useState(0);

  const labelTemp = label;
  const annotationsTemp = annotations;
  const labelTable = [];
  const annotationsTable = [];

  Object.entries(labelTemp).map(([key, value]) => {
    labelTable.push(
      <tr>
        <th>{key}</th>
        <td>{value}</td>
      </tr>
    );
  });

  Object.entries(annotationsTemp).map(([key, value]) => {
    annotationsTable.push(
      <tr>
        <th>{key}</th>
        <td>{value}</td>
      </tr>
    );
  });

  const eventsTable = [];

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
                <td>{cronJobDetail.name}</td>
                <th>Cluster</th>
                <td>{cronJobDetail.cluster}</td>
              </tr>
              <tr>
                <th>Project</th>
                <td>{cronJobDetail.project}</td>
                <th>Schedule</th>
                <td>{cronJobDetail.schedule}</td>
              </tr>
              <tr>
                <th>Concurrency Policy</th>
                <td>{cronJobDetail.concurrencyPolicy}</td>
                <th>Successful Jobs History Limit</th>
                <td>{cronJobDetail.successfulJobsHistoryLimit}</td>
              </tr>
              <tr>
                <th>Created</th>
                <td>
                  {moment(cronJobDetail.creationTimestamp).format(
                    "YYYY-MM-DD HH:mm"
                  )}
                </td>
                <th>Lasted</th>
                <td>
                  {moment(cronJobDetail.lastScheduleTime).format(
                    "YYYY-MM-DD HH:mm"
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={1}>
        <div className="tb_container">
          <TableTitle>워크로드</TableTitle>
          <table className="tb_data">
            <tbody>
              <tr>
                <th>app</th>
                <td></td>
                <th>app.gedge-platform.io/name</th>
                <td></td>
                <th>app.Kubernates.io/version</th>
                <td></td>
              </tr>
            </tbody>
          </table>
          <br />
          <TableTitle>어노테이션</TableTitle>
          <table className="tb_data">
            <tbody>
              <tr>
                <th>gedge-platform.io/creator</th>
                <td></td>
              </tr>
              <tr>
                <th>gedge-platform.io/workloadType</th>
                <td></td>
              </tr>
              <tr>
                <th>text</th>
                <td></td>
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
            <tbody>{annotationsTable}</tbody>
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

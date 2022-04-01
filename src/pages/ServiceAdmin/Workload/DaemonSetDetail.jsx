import React, { useState, useEffect } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import styled from "styled-components";
import moment from "moment";
import { observer } from "mobx-react";
import daemonSetStore from "../../../store/DaemonSet";

import theme from "@/styles/theme";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

const TableTitle = styled.p`
  font-size: 14px;
  font-weight: 500;
  margin: 8px 0;
  color: #fff;
`;

const Detail = observer(() => {
  const { daemonSetDetail, label, annotations, events } = daemonSetStore;
  const [open, setOpen] = useState(false);
  const [tabvalue, setTabvalue] = useState(0);

  const labelTable = [];
  const labelTemp = label;

  const annotationsTable = [];
  const annotationsTemp = annotations;

  const eventTable = [];

  const handleTabChange = (event, newValue) => {
    setTabvalue(newValue);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  Object.entries(labelTemp).map(([key, value]) => {
    labelTable.push(
      <tr>
        <th className="tb_workload_detail_labels_th">{key}</th>
        <td style={{ whiteSpace: "pre-line" }}>{value}</td>
      </tr>
    );
  });

  Object.entries(annotationsTemp).map(([key, value]) => {
    annotationsTable.push(
      <tr>
        <th className="tb_workload_detail_labels_th">{key}</th>
        <td style={{ whiteSpace: "pre-line" }}>{value}</td>
      </tr>
    );
  });

  // if (events !== null) {
  //   events.map((event) => {
  //     eventsTable.push(
  //       <tr>
  //         <th className="tb_workload_detail_th">Message</th>
  //         <td>{event["message"]}</td>
  //       </tr>
  //     );
  //   });
  // } else {
  //   eventsTable.push(
  //     <tr>
  //       <th className="tb_workload_detail_th">Message</th>
  //       <td></td>
  //     </tr>
  //   );
  {
    events &&
      events.map((event, message) => {
        eventTable.push(
          <div>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreRoundedIcon sx={{ color: "white" }} />}
                aria-controls="ProjectEvent-content"
                id="ProjectEvent-header"
                sx={{ bgcolor: theme.colors.primaryDark }}
              >
                <Typography
                  sx={{
                    width: "10%",
                    fontSize: 13,
                    color: "white",
                  }}
                >
                  Message
                </Typography>
                <Typography sx={{ fontSize: 13, color: "white" }}>
                  {event["message"]}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ bgcolor: theme.colors.panelTit }}>
                <Typography
                  sx={{
                    fontSize: 13,
                    color: "white",
                    bgcolor: theme.colors.primary,
                  }}
                >
                  <table className="tb_data">
                    <tr>
                      <th>Kind</th>
                      <td>{event["kind"]}</td>
                      <th>Name</th>
                      <td>{event["name"]}</td>
                    </tr>
                    <tr>
                      <th>Namespace</th>
                      <td>{event["namespace"]}</td>
                      <th>Cluster</th>
                      <td>{event["cluster"]}</td>
                    </tr>
                    <tr>
                      <th>Reason</th>
                      <td>{event["reason"]}</td>
                      <th>Type</th>
                      <td>{event["type"]}</td>
                    </tr>
                    <tr>
                      <th>Event Time</th>
                      <td>{event["eventTime"]}</td>
                      <th></th>
                      <td></td>
                    </tr>
                  </table>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        );
      });
  }

  return (
    <PanelBox style={{ overflowY: "hidden" }}>
      <CTabs type="tab2" value={tabvalue} onChange={handleTabChange}>
        <CTab label="Overview" />
        <CTab label="Resources" />
        <CTab label="Metadata" />
        <CTab label="Events" />
      </CTabs>
      <CTabPanel value={tabvalue} index={0}>
        <div className="tb_container">
          <TableTitle>상세정보</TableTitle>
          <table className="tb_data" style={{ tableLayout: "fixed" }}>
            <tbody>
              <tr>
                <th className="tb_workload_detail_th">Name</th>
                <td>{daemonSetDetail.name}</td>
                <th className="tb_workload_detail_th">Cluster</th>
                <td>{daemonSetDetail.cluster}</td>
              </tr>
              <tr>
                <th>Project</th>
                <td>{daemonSetDetail.project}</td>
                <th>Created</th>
                <td>
                  {moment(daemonSetDetail.createAt).format("YYYY-MM-DD HH:MM")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={1}>
        <div className="tb_container">
          <TableTitle>라벨</TableTitle>
          <table className="tb_data" style={{ tableLayout: "fixed" }}>
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
          <table className="tb_data" style={{ tableLayout: "fixed" }}>
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
          <table className="tb_data" style={{ tableLayout: "fixed" }}>
            <tbody style={{ whiteSpace: "pre-line" }}>{labelTable}</tbody>
          </table>
          <br />
          <TableTitle>어노테이션</TableTitle>
          <table className="tb_data" style={{ tableLayout: "fixed" }}>
            <tbody style={{ whiteSpace: "pre-line" }}>{annotationsTable}</tbody>
          </table>
          <br />
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={3}>
        <div className="tb_container">
          <TableTitle>이벤트</TableTitle>
          <table className="tb_data">
            <tbody>{eventTable}</tbody>
          </table>
        </div>
      </CTabPanel>
    </PanelBox>
  );
});

export default Detail;

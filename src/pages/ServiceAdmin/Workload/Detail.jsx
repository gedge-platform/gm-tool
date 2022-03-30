import React, { useState, useEffect } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import styled from "styled-components";
import moment from "moment";
import deploymentStore from "../../../store/Deployment";
import { observer } from "mobx-react-lite";

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
  const {
    deploymentDetail,
    strategy,
    labels,
    annotations,
    pods,
    depServices,

    depServicesPort,
  } = deploymentStore;

  const [open, setOpen] = useState(false);
  const [tabvalue, setTabvalue] = useState(0);

  const labelTable = [];
  const label = labels;

  const annotationTable = [];
  const annotation = annotations;

  const podInfoTable = [];

  const port = depServicesPort;
  const portTable = [];

  const events = deploymentDetail.events;
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

  let strategyTable = [];
  let strategyTemp = strategy;

  if (strategyTemp.type === "Recreate") {
    strategyTable = strategyTemp.type;
  } else if (strategyTemp.type === "RollingUpdate") {
    strategyTable =
      "maxUnavailable : " +
      strategyTemp.rollingUpdate.maxUnavailable +
      "\n maxSurge : " +
      strategyTemp.rollingUpdate.maxSurge;
  }

  Object.entries(label).map(([key, value]) => {
    labelTable.push(
      <tr>
        <th>{key}</th>
        <td>{value}</td>
      </tr>
    );
  });

  pods.map((item) => {
    podInfoTable.push(
      <div>
        <tr>
          <th>{item["name"]}</th>
          <th>{item["status"]}</th>
          <th>{item["node"]}</th>
          <th>{item["podIP"]}</th>
          <th>{item["restart"]}</th>
        </tr>
      </div>
    );
  });

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

  Object.entries(annotation).map(([key, value]) => {
    annotationTable.push(
      <tr>
        <th>{key}</th>
        <td>{value}</td>
      </tr>
    );
  });

  // events.map((event) => {
  //   console.log(event);
  //   eventsTable.push(
  //     <tr>
  //       <th>Message</th>
  //       <td>{event["message"]}</td>
  //     </tr>
  //   );
  // });

  // pods.map((event) => {
  //   podsTable.push(
  //     <tr>
  //       <th>Status</th>
  //       <td>{event.status}</td>
  //     </tr>
  //   );
  // });

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
                <td style={{ whiteSpace: "pre-line" }}>{strategyTable}</td>
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
            <tbody>{podInfoTable}</tbody>
          </table>
          <br />
          <TableTitle>Deployment Services</TableTitle>
          <table className="tb_data">
            <tbody>
              <th>Name</th>
              <td>{depServices.name}</td>
              <th>Port</th>
              <td>{portTable}</td>
            </tbody>
          </table>
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
          <table className="tb_data">{eventTable}</table>
        </div>
      </CTabPanel>
    </PanelBox>
  );
});

export default Detail;

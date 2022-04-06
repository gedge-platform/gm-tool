import React, { useState, useEffect } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import styled from "styled-components";
import moment from "moment";
import { Podcasts } from "@mui/icons-material";
import podStore from "../../../store/Pod";
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
    podDetail,
    label,
    annotations,
    events,
    containerResources,
    podContainerVolume,
    statusConditions,
  } = podStore;
  const [open, setOpen] = useState(false);
  const [tabvalue, setTabvalue] = useState(0);

  const labelTable = [];
  const labelTemp = label;

  const annotationsTable = [];
  const annotationsTemp = annotations;

  // const eventsTable = [];
  const statusConditionsTable = [];
  const podContainer = containerResources;
  const podContainerTable = [];

  const podContainerVolumes = podContainerVolume;
  const podContainerVolumesTable = [];

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
        <td>{value}</td>
      </tr>
    );
  });

  Object.entries(annotationsTemp).map(([key, value]) => {
    annotationsTable.push(
      <tr>
        <th className="tb_workload_detail_labels_th">{key}</th>
        <td>{value}</td>
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
    podContainer &&
      podContainer.map((item) => {
        podContainerTable.push(
          <>
            <tr>
              <th>Container ID</th>
              <td>{item["containerID"]}</td>
              <th>Name</th>
              <td>{item["name"]}</td>
              <th>ready</th>
              <td>{item["ready"]}</td>
              <th>restartCount</th>
              <td>{item["restartCount"]}</td>
              <th>image</th>
              <td>{item["image"]}</td>
              <th>started</th>
              <td>{item["started"]}</td>
            </tr>
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
  {
    /*
    podContainerVolumes &&
      podContainerVolumes.map((item, index) => {
        podContainerVolumesTable.push(
          <>
            <tr>
              <th>Volumes</th>
              <td>{item[index]}</td>
            </tr>
          </>
        );
      });
    */
  }

  statusConditions.map((event) => {
    statusConditionsTable.push(
      <tr>
        <th className="tb_workload_detail_th">LastTransition Time</th>
        <td>{event["lastTransitionTime"]}</td>
        <th className="tb_workload_detail_th">Status</th>
        <td>{event["status"]}</td>
        <th className="tb_workload_detail_th">Type</th>
        <td>{event["type"]}</td>
      </tr>
    );
  });

  return (
    <PanelBox style={{ overflowY: "hidden" }}>
      <CTabs type="tab2" value={tabvalue} onChange={handleTabChange}>
        <CTab label="Overview" />
        <CTab label="Resources" />
        <CTab label="Metadata" />
        <CTab label="Status" />
        <CTab label="Events" />
      </CTabs>
      <CTabPanel value={tabvalue} index={0}>
        <div className="tb_container">
          <TableTitle>상세정보</TableTitle>
          <table className="tb_data" style={{ tableLayout: "fixed" }}>
            <tbody>
              <tr>
                <th className="tb_workload_detail_th">Name</th>
                <td>{podDetail.name}</td>
                <th className="tb_workload_detail_th">Cluster</th>
                <td>{podDetail.cluster}</td>
              </tr>
              <tr>
                <th>Project</th>
                <td>{podDetail.project}</td>
                <th>Status</th>
                <td>{podDetail.status}</td>
              </tr>
              <tr>
                <th>PodIP</th>
                <td>{podDetail.podIP}</td>
                <th>Node Name</th>
                <td>{podDetail.node_name}</td>
              </tr>
              <tr>
                <th>Qos Class</th>
                <td>{podDetail.qosClass}</td>
                <th>Created</th>
                <td>
                  {moment(podDetail.creationTimestamp).format(
                    "YYYY-MM-DD HH:MM"
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={1}>
        <div className="tb_container">
          <TableTitle>Pod Containers</TableTitle>
          <table className="tb_data">
            <tbody>
              <tr>
                <th>{podContainerTable}</th>
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
            <tbody>{labelTable}</tbody>
          </table>
          <br />
          <TableTitle>어노테이션</TableTitle>
          <table className="tb_data" style={{ tableLayout: "fixed" }}>
            <tbody>{annotationsTable}</tbody>
          </table>
          <br />
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={3}>
        <div className="tb_container">
          <TableTitle>상태</TableTitle>
          <table className="tb_data">
            <tbody>{podContainerVolumesTable}</tbody>
          </table>
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={4}>
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

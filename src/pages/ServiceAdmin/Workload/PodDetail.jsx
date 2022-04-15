import React, { useState, useEffect } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import styled from "styled-components";
import { dateFormatter } from "@/utils/common-utils";
import { Podcasts } from "@mui/icons-material";
import podStore from "../../../store/Pod";
import { observer } from "mobx-react-lite";

import theme from "@/styles/theme";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { toJS } from "mobx";

const TableTitle = styled.p`
  font-size: 14px;
  font-weight: 500;
  margin: 8px 0;
  color: rgba(255, 255, 255, 0.8);
`;

const LabelContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 12px;
  border-radius: 4px;
  background-color: #2f3855;
`;

const Label = styled.span`
  height: 20px;
  background-color: #20263a;
  vertical-align: middle;
  padding: 0 2px 0 2px;
  line-height: 20px;
  font-weight: 600;
  margin: 6px 6px;

  .key {
    padding: 0 2px;
    background-color: #eff4f9;
    color: #36435c;
    text-align: center;
  }
  .value {
    padding: 0 2px;
    text-align: center;
    color: #eff4f9;
  }
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
  const annotationsTable = [];
  const statusConditionsTable = [];
  const podContainer = containerResources;
  const podContainerTable = [];
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

  const labelTable = () => {
    return Object.entries(label).map(([key, value]) => (
      <Label>
        <span className="key">{key}</span>
        <span className="value">{value}</span>
      </Label>
    ));
  };

  Object.entries(annotations).map(([key, value]) => {
    annotationsTable.push(
      <tr>
        <th className="tb_workload_detail_labels_th">{key}</th>
        <td>{value}</td>
      </tr>
    );
  });

  const temp = podContainerVolume.map((item) => item?.volumemounts);
  const temp2 = temp.map((item) => toJS(item));
  const newArr = temp2.flat();
  newArr.map((vol) => {
    podContainerVolumesTable.push(
      <tr>
        <th style={{ width: "10%" }}>Mountpath</th>
        <td style={{ width: "30%" }}>{vol?.mountpath}</td>
        <th style={{ width: "10%" }}>Name</th>
        <td style={{ width: "20%" }}>{vol?.name}</td>
        <th style={{ width: "10%" }}>Readonly</th>
        <td style={{ width: "20%" }}>{vol?.readonly ? "true" : "false"}</td>
      </tr>
    );
  });

  const eventsTable = [];
  if (events !== null) {
    events?.map((events) => {
      eventsTable.push(
        <div>
          <Accordion>
            <AccordionSummary
              expandIcon={
                <ExpandMoreRoundedIcon
                  sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                />
              }
              aria-controls="ProjectEvent-content"
              id="ProjectEvent-header"
              sx={{ bgcolor: theme.colors.primaryDark }}
            >
              <Typography
                sx={{
                  width: "10%",
                  fontSize: 13,
                  color: "rgba(255, 255, 255, 0.7)",
                }}
              >
                Message
              </Typography>
              <Typography
                sx={{ fontSize: 13, color: "rgba(255, 255, 255, 0.7)" }}
              >
                {events?.message}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: theme.colors.panelTit }}>
              <Typography
                sx={{
                  fontSize: 13,
                  color: "rgba(255, 255, 255, 0.7)",
                  bgcolor: theme.colors.primary,
                }}
              >
                <table className="tb_data">
                  <tr>
                    <th>Kind</th>
                    <td>{events?.kind}</td>
                    <th>Name</th>
                    <td>{events?.name}</td>
                  </tr>
                  <tr>
                    <th>Namespace</th>
                    <td>{events?.namespace}</td>
                    <th>Cluster</th>
                    <td>{events?.cluster}</td>
                  </tr>
                  <tr>
                    <th>Reason</th>
                    <td>{events?.reason}</td>
                    <th>Type</th>
                    <td>{events?.type}</td>
                  </tr>
                  <tr>
                    <th>Event Time</th>
                    <td>{dateFormatter(events?.eventTime)}</td>
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
  } else {
    eventsTable.push(
      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={
              <ExpandMoreRoundedIcon
                sx={{ color: "rgba(255, 255, 255, 0.7)" }}
              />
            }
            aria-controls="ProjectEvent-content"
            id="ProjectEvent-header"
            sx={{ bgcolor: theme.colors.primaryDark }}
          >
            <Typography
              sx={{
                width: "10%",
                fontSize: 13,
                color: "rgba(255, 255, 255, 0.7)",
              }}
            >
              Message
            </Typography>
            <Typography
              sx={{ fontSize: 13, color: "rgba(255, 255, 255, 0.7)" }}
            ></Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ bgcolor: theme.colors.panelTit }}>
            <Typography
              sx={{
                fontSize: 13,
                color: "rgba(255, 255, 255, 0.7)",
                bgcolor: theme.colors.primary,
              }}
            >
              <table className="tb_data">
                <tr>
                  <th>No Have Events List </th>
                </tr>
              </table>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  }

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
                <th>Pod IP</th>
                <td>{podDetail.podIP}</td>
                <th>Node Name</th>
                <td>{podDetail.node_name}</td>
              </tr>
              <tr>
                <th>Qos Class</th>
                <td>{podDetail.qosClass}</td>
                <th>Created</th>
                <td>{dateFormatter(podDetail.creationTimestamp)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={1}>
        <div className="tb_container" style={{ tableLayout: "fixed" }}>
          <TableTitle>Pod Containers</TableTitle>
          {podContainer.map((item) => (
            <>
              <table className="tb_data">
                <tbody>
                  <tr>
                    <th style={{ width: "10%" }}>Container ID</th>
                    <td style={{ width: "40%" }}>{item?.containerID}</td>
                    <th style={{ width: "10%" }}>Name</th>
                    <td style={{ width: "40%" }}>{item?.name}</td>
                  </tr>
                  <tr>
                    <th style={{ width: "10%" }}>ready</th>
                    <td style={{ width: "40%" }}>
                      {item?.ready ? "true" : "false"}
                    </td>
                    <th style={{ width: "10%" }}>restartCount</th>
                    <td style={{ width: "40%" }}>{item?.restartCount}</td>
                  </tr>
                  <tr>
                    <th style={{ width: "10%" }}>image</th>
                    <td style={{ width: "40%" }}>{item?.image}</td>
                    <th style={{ width: "10%" }}>started</th>
                    <td style={{ width: "40%" }}>
                      {item?.started ? "true" : "false"}
                    </td>
                  </tr>
                </tbody>
              </table>
              <br />
            </>
          ))}
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={2}>
        <div>
          <TableTitle>Labels</TableTitle>
          <LabelContainer>{labelTable()}</LabelContainer>

          <br />
          <TableTitle>Annotaions</TableTitle>
          <table className="tb_data" style={{ tableLayout: "fixed" }}>
            <tbody>{annotationsTable}</tbody>
          </table>
          <br />
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={3}>
        <div className="tb_container">
          <table className="tb_data">
            <tbody>{podContainerVolumesTable}</tbody>
          </table>
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={4}>
        <div className="tb_container">
          <table className="tb_data">
            <tbody>{eventsTable}</tbody>
          </table>
        </div>
      </CTabPanel>
    </PanelBox>
  );
});

export default Detail;

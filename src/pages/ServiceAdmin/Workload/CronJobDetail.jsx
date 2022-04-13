import React, { useState, useEffect } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import styled from "styled-components";
import moment from "moment";
import cronJobStore from "../../../store/CronJob";
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
  const { cronJobDetail, label, annotations, events, cronjobInvolvesJobs } =
    cronJobStore;
  const [open, setOpen] = useState(false);
  const [tabvalue, setTabvalue] = useState(0);
  const annotationsTable = [];
  const eventsTable = [];
  const InvolvesJobs = cronjobInvolvesJobs;
  const InvolvesJobsTable = [];
  const containers = cronJobDetail.containers;
  // const containersTable = [];

  // const containersTable = () => {
  //   return containers?.map((item) => {
  //     <table className="tb_data">
  //       <tbody>
  //         <tr>
  //           <th className="tb_workload_detail_th">Name</th>
  //           <td>{item?.name}</td>
  //           <th>Image</th>
  //           <td>{item?.image}</td>
  //         </tr>
  //       </tbody>
  //     </table>;
  //   });
  // };
  // containers?.map((item) => {
  //   containersTable.push(
  //     <tr>
  //       <th className="tb_workload_detail_th">Name</th>
  //       <td>{item?.name}</td>
  //       <th>Image</th>
  //       <td>{item?.image}</td>
  //     </tr>
  //   );
  // });

  const labelTable = () => {
    return Object.entries(label).map(([key, value]) => {
      <Label>
        <span className="key">{key}</span>
        <span className="value">{value}</span>
      </Label>;
    });
  };

  Object.entries(annotations).map(([key, value]) => {
    annotationsTable.push(
      <tr>
        <th className="tb_workload_detail_labels_th">{key}</th>
        <td>{value}</td>
      </tr>
    );
  });

  if (events !== null) {
    events?.map((events) => {
      eventsTable.push(
        <div>
          <Accordion>
            <AccordionSummary
              expandIcon={
                <ExpandMoreRoundedIcon
                  sx={{ color: "rgba(255,255,255,0.7)" }}
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
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                Message
              </Typography>
              <Typography
                sx={{
                  width: "80%",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                {events?.message}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: theme.colors.panelTit }}>
              <Typography
                sx={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.7)",
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
                    <td>
                      {moment(events?.eventTime).format("YYYY-MM-DD HH:mm")}
                    </td>
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
              <ExpandMoreRoundedIcon sx={{ color: "rgba(255,255,255,0.7)" }} />
            }
            aria-controls="ProjectEvent-content"
            id="ProjectEvent-header"
            sx={{ bgcolor: theme.colors.primaryDark }}
          >
            <Typography
              sx={{
                width: "10%",
                fontSize: 13,
                color: "rgba(255,255,255,0.7)",
              }}
            >
              Message
            </Typography>
            <Typography
              sx={{
                width: "80%",
                fontSize: 13,
                color: "rgba(255,255,255,0.7)",
              }}
            ></Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ bgcolor: theme.colors.panelTit }}>
            <Typography
              sx={{
                fontSize: 13,
                color: "rgba(255,255,255,0.7)",
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
        <CTab label="Overview" />
        <CTab label="Resources" />
        <CTab label="Metadata" />
        <CTab label="Events" />
      </CTabs>
      <CTabPanel value={tabvalue} index={0}>
        <div className="tb_container">
          <table className="tb_data" style={{ tableLayout: "fixed" }}>
            <tbody>
              <tr>
                <th className="tb_workload_detail_th">Name</th>
                <td>{cronJobDetail.name}</td>
                <th className="tb_workload_detail_th">Cluster</th>
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
          <TableTitle>Containers</TableTitle>
          <table className="tb_data">
            {containers?.map((item) => (
              <tbody>
                <tr>
                  <th className="tb_workload_detail_th">Name</th>
                  <td>{item?.name}</td>
                  <th>Image</th>
                  <td>{item?.image}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={2}>
        <div className="tb_container">
          <TableTitle>Labels</TableTitle>
          <LabelContainer>{labelTable()}</LabelContainer>
          <br />
          <TableTitle>Annotations</TableTitle>
          <table className="tb_data" style={{ tableLayout: "fixed" }}>
            <tbody>{annotationsTable}</tbody>
          </table>
          <br />
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={3}>
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

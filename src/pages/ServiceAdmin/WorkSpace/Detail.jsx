import React, { useState, useEffect } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import { observer } from "mobx-react";
import styled from "styled-components";
import workspaceStore from "../../../store/WorkSpace";
import "@grapecity/wijmo.styles/wijmo.css";
import theme from "@/styles/theme";
import { toJS } from "mobx";
import {
  MenuItem,
  FormControl,
  Select,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  formLabelClasses,
} from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { dateFormatter } from "@/utils/common-utils";

const EventWrap = styled.div`
  .MuiInputBase-input {
    color: rgba(255, 255, 255, 0.8);
    width: 200px;
    margin: 10px;
    font-weight: 400;
    font-size: 15px;
  }

  .MuiInputBase-root {
    font: inherit;
    line-height: inherit;
  }

  .MuiPopover-paper {
    color: red;
  }

  .MuiOutlinedInput-notchedOutline {
    border: none;
  }

  .MuiSvgIcon-root {
    color: white;
  }

  .MuiOutlinedInput-input {
    padding: 8px;
    box-sizing: content-box;
  }

  .MuiPopover-paper {
    color: rgba(255, 255, 255, 0.8);
  }

  .MuiPaper-elevation8 {
    height: 40px;
  }
`;

const TableTitle = styled.p`
  font-size: 14px;
  font-weight: 500;
  margin: 8px 0;
  color: rgba(255, 255, 255, 0.8);
`;

const ClusterTitle = styled.p`
  font-size: 13px;
  font-weight: 500;
  margin: 6px 0;
  color: rgba(255, 255, 255, 0.7);
`;

const LabelContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 12px;
  border-radius: 4px;
  background-color: #2f3855;

  p {
    color: rgba(255, 255, 255, 0.6);
  }
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
    workSpaceDetail,
    labels,
    annotations,
    detailInfo,
    clusterList,
    projectList,
    selectProject,
    // selectProject,
    changeCluster,
    changeProject,
  } = workspaceStore;
  const [tabvalue, setTabvalue] = useState(0);

  const eventsTable = () => {
    return (
      <EventWrap className="event-wrap">
        <FormControl>
          <Select
            value={selectProject}
            inputProps={{ "aria-label": "Without label" }}
            onChange={projectChange}
          >
            {projectList.map((project) => (
              <MenuItem
                style={{
                  color: "black",
                  backgroundColor: "white",
                  fontSize: 15,
                }}
                value={project}
              >
                {project}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </EventWrap>
    );
  };

  const projectChange = (e) => {
    changeProject(e.target.value);
  };

  const eventsMessageTable = [];
  const eventsTemp = detailInfo.map((event) => event?.events);
  const temp = eventsTemp.map((item) => toJS(item));
  const newArr = temp.flat();
  newArr.filter((events) => {
    if (events?.cluster === selectProject) {
      eventsMessageTable.push(
        <div>
          <Accordion>
            <AccordionSummary
              expandIcon={
                <ExpandMoreRoundedIcon
                  sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                />
              }
              aria-controls="WorkSpaceEvent-content"
              id="WorkSpaceEvent-header"
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
    } else {
      eventsMessageTable.push(
        <div>
          <Accordion>
            <AccordionSummary
              expandIcon={
                <ExpandMoreRoundedIcon
                  sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                />
              }
              aria-controls="WorkSpaceEvent-content"
              id="WorkSpaceEvent-header"
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
  });

  const clusterResourceTable = () => {
    return detailInfo.map((cluster) => (
      <>
        <ClusterTitle>{cluster.clusterName}</ClusterTitle>
        <table className="tb_data">
          <tbody className="tb_workload_detail_th">
            <tr>
              {cluster?.resourceUsage ? (
                <>
                  <th>CPU</th>
                  <td>{cluster?.resourceUsage?.cpu_usage}</td>
                  <th>MEMORY</th>
                  <td>{cluster?.resourceUsage?.memory_usage}</td>
                </>
              ) : (
                <></>
              )}
            </tr>
          </tbody>
        </table>
        <br />
      </>
    ));
  };
  

  const resourcesTable = () => {
    return detailInfo.map((resources) => (
      <>
        <ClusterTitle>{resources.clusterName}</ClusterTitle>
        <table className="tb_data" style={{ tableLayout: "fixed" }}>
          <tbody>
            {resources?.resource ? (
              <>
                <tr>
                  <th>Deployment</th>
                  <td>{resources?.resource?.deployment_count}</td>
                  <th>Pod</th>
                  <td>{resources?.resource?.pod_count}</td>
                </tr>
                <tr>
                  <th>Service</th>
                  <td>{resources?.resource?.service_count}</td>
                  <th>CronJob</th>
                  <td>{resources?.resource?.cronjob_count}</td>
                </tr>
                <tr>
                  <th>Job</th>
                  <td>{resources?.resource?.job_count}</td>
                  <th>Volume</th>
                  <td>{resources?.resource?.volume_count}</td>
                </tr>
                <tr>
                  <th>Statefulset</th>
                  <td>{resources?.resource?.Statefulset_count}</td>
                  <th>Daemonset</th>
                  <td>{resources?.resource?.daemonset_count}</td>
                </tr>
              </>
            ) : (
              <></>
            )}
          </tbody>
        </table>
        <br />
      </>
    ));
  };

  const handleTabChange = (event, newValue) => {
    setTabvalue(newValue);
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
                <td>{workSpaceDetail.workspaceName}</td>
                <th className="tb_workload_detail_th">Cluster</th>
                <td>{workSpaceDetail.selectProject}</td>
              </tr>
              <tr>
                <th>Workspace</th>
                <td>{workSpaceDetail.workspaceName}</td>
                <th>Creator</th>
                <td>{workSpaceDetail.workspaceCreator}</td>
              </tr>
              <tr>
                <th>Owner</th>
                <td>{workSpaceDetail.workspaceOwner}</td>
                <th>Created</th>
                <td>{dateFormatter(workSpaceDetail.created_at)}</td>
              </tr>
            </tbody>
          </table>
          <br />
          {clusterResourceTable()}
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={1}>
        <div className="tb_container">{resourcesTable()}</div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={2}>
        <div className="tb_container">
          <TableTitle>Labels</TableTitle>
          <LabelContainer>
            {labels ? (
              Object.entries(labels).map(([key, value]) => (
                <Label>
                  <span className="key">{key}</span>
                  <span className="value">{value}</span>
                </Label>
              ))
            ) : (
              <p>No Labels Info.</p>
            )}
          </LabelContainer>
          <br />

          <TableTitle>Annotations</TableTitle>
          {annotations ? (
            <table className="tb_data" style={{ tableLayout: "fixed" }}>
              <tbody style={{ whiteSpace: "pre-line" }}>
                {Object.entries(annotations).map(([key, value]) => (
                  <tr>
                    <th className="tb_workload_detail_labels_th">{key}</th>
                    <td style={{ whiteSpace: "pre-line" }}>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <LabelContainer>
              <p>No Annotations Info.</p>
            </LabelContainer>
          )}
          <br />
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={3}>
        <div className="tb_container">
          {eventsTable()}
          <table className="tb_data" style={{ tableLayout: "fixed" }}>
            <tbody>{eventsMessageTable}</tbody>
          </table>
          <br />
        </div>
      </CTabPanel>
    </PanelBox>
  );
});
export default Detail;


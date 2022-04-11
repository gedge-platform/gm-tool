import React, { useState } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import { observer } from "mobx-react";
import styled from "styled-components";
import moment from "moment";
import projectStore from "../../../store/Project";
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
} from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

const EventWrap = styled.div`
  .MuiInputBase-input {
    color: rgba(255, 255, 255, 0.8);
    width: 200px;
    margin: 10px;
    font-weight: 400;
    font-size: 15px;
    box-size: small;
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

const Detail = observer(() => {
  const {
    projectDetail,
    labels,
    annotations,
    detailInfo,
    clusterList,
    selectCluster,
    changeCluster,
  } = projectStore;

  // const { projectDetail :{selectCluster, resources:{deployment_count}} } = projectStore;
  const [open, setOpen] = useState(false);
  const [tabvalue, setTabvalue] = useState(0);
  const labelsTable = [];
  const annotationsTable = [];
  const eventsTable = () => {
    return (
      <EventWrap className="event-wrap">
        <FormControl>
          <Select
            value={selectCluster}
            inputProps={{ "aria-label": "Without label" }}
            onChange={clusterChange}
          >
            {clusterList.map((cluster) => (
              <MenuItem
                style={{
                  color: "black",
                  backgroundColor: "white",
                  fontSize: 15,
                }}
                value={cluster}
              >
                {cluster}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </EventWrap>
    );
  };

  const clusterChange = (e) => {
    changeCluster(e.target.value);
  };

  const eventsMessageTable = [];
  const eventsTemp = detailInfo.map((event) => event?.events);
  const temp = eventsTemp.map((item) => toJS(item));
  const newArr = temp.flat();

  newArr.filter((events) => {
    events?.cluster === selectCluster ? (
      eventsMessageTable.push(
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
                {events?.message}
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
      )
    ) : (
      <></>
    );
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
                  <td>{cluster?.resourceUsage?.namespace_cpu}</td>
                  <th>MEMORY</th>
                  <td>{cluster?.resourceUsage?.namespace_memory}</td>
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

  Object.entries(labels).map(([key, value]) => {
    labelsTable.push(
      <tr>
        <th className="tb_workload_detail_labels_th">{key}</th>
        <td>{value}</td>
      </tr>
    );
  });

  Object.entries(annotations).map(([key, value]) => {
    annotationsTable.push(
      <tr>
        <th className="tb_workload_detail_labels_th">{key}</th>
        <td>{value}</td>
      </tr>
    );
  });

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
                <td>{projectDetail.projectName}</td>
                <th className="tb_workload_detail_th">Cluster</th>
                <td>{projectDetail.selectCluster}</td>
              </tr>
              <tr>
                <th>Workspace</th>
                <td>{projectDetail.workspaceName}</td>
                <th>Creator</th>
                <td>{projectDetail.projectCreator}</td>
              </tr>
              <tr>
                <th>Owner</th>
                <td>{projectDetail.projectOwner}</td>
                <th>Created</th>
                <td>
                  {moment(projectDetail.created_at).format("YYYY-MM-DD HH:mm")}
                </td>
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
          <table className="tb_data" style={{ tableLayout: "fixed" }}>
            <tbody>{labelsTable}</tbody>
          </table>
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
          <table className="tb_data" style={{ tableLayout: "fixed" }}>
            {eventsTable()}
            <tbody>{eventsMessageTable}</tbody>
          </table>
        </div>
      </CTabPanel>
    </PanelBox>
  );
});
export default Detail;

/*
    <PanelBox>
      <CTabs type="tab2" value={tabvalue} onChange={handleTabChange}>
        <CTab label="상세정보" />
        <CTab label="노드 정보" />
        <CTab label="채널 정보" />
      </CTabs>
      <div className="tabPanelContainer">
        <CTabPanel value={tabvalue} index={0}>
          <div className="tb_container">
            <table className="tb_data">
              <tbody>
                <tr>
                  <th>네트워크 이름</th>
                  <td>OOO 조회</td>
                  <th>조직ID</th>
                  <td>JSON</td>
                </tr>
                <tr>
                  <th>Import 여부</th>
                  <td colSpan={1}>N</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="tb_container">
            <table className="tb_data">
              <tbody>
                <tr>
                  <th>Node Type</th>
                  <th>Node 이름</th>
                  <th>상태</th>
                </tr>
                <tr>
                  <td>CA</td>
                  <td>block-ca</td>
                  <td>운영 중</td>
                </tr>
                <tr>
                  <td>Peer(Endorser)</td>
                  <td>block-peer1(Committer)</td>
                  <td>운영 중</td>
                </tr>
                <tr>
                  <td>Peer</td>
                  <td>block-peer2</td>
                  <td>운영 중</td>
                </tr>
                <tr>
                  <td>Peer</td>
                  <td>block-peer3</td>
                  <td>운영 중</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="tb_container">
            <table className="tb_data">
              <tbody>
                <tr>
                  <th>조직 이름</th>
                  <th>채널 이름</th>
                </tr>
                <tr>
                  <td>block-orderer</td>
                  <td>my-block-channel-1</td>
                </tr>
                <tr>
                  <td>block-orderer</td>
                  <td>my-block-channel-2</td>
                </tr>
                <tr>
                  <td>block-orderer</td>
                  <td>my-block-channel-3</td>
                </tr>
                <tr>
                  <td>block-orderer</td>
                  <td>my-block-channel-4</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CTabPanel>
        <CTabPanel value={tabvalue} index={1}>
          <div className="panelCont">
            <div className="grid-height">
              <table className="tb_data">
                <tbody>
                  <tr>
                    <th>Node Type</th>
                    <th>Node 이름</th>
                    <th>상태</th>
                  </tr>
                  <tr>
                    <td>CA</td>
                    <td>block-ca</td>
                    <td>운영 중</td>
                  </tr>
                  <tr>
                    <td>Peer(Endorser)</td>
                    <td>block-peer1(Committer)</td>
                    <td>운영 중</td>
                  </tr>
                  <tr>
                    <td>Peer</td>
                    <td>block-peer2</td>
                    <td>운영 중</td>
                  </tr>
                  <tr>
                    <td>Peer</td>
                    <td>block-peer3</td>
                    <td>운영 중</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CTabPanel>
        <CTabPanel value={tabvalue} index={2}>
          <div className="panelCont">
            <div className="grid-height">
              <table className="tb_data">
                <tbody>
                  <tr>
                    <th>조직 이름</th>
                    <th>채널 이름</th>
                  </tr>
                  <tr>
                    <td>block-orderer</td>
                    <td>my-block-channel-1</td>
                  </tr>
                  <tr>
                    <td>block-orderer</td>
                    <td>my-block-channel-2</td>
                  </tr>
                  <tr>
                    <td>block-orderer</td>
                    <td>my-block-channel-3</td>
                  </tr>
                  <tr>
                    <td>block-orderer</td>
                    <td>my-block-channel-4</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CTabPanel>
      </div>
    </PanelBox>
*/

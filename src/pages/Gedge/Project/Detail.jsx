import React, { useState, useEffect } from "react";
import CommActionBar from "@/components/common/CommActionBar";
import { PanelBox } from "@/components/styles/PanelBox";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import { observer } from "mobx-react";
import styled from "styled-components";
import moment from "moment";
import projectStore from "../../../store/Project";
import { keys } from "lodash";
import "@grapecity/wijmo.styles/wijmo.css";
import theme from "@/styles/theme";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

const TableTitle = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin: 8px 0;
`;

const Detail = observer(() => {
  const { projectDetail } = projectStore;
  const labelTable = [];
  const eventTable = [];

  // const { projectDetail :{selectCluster, resources:{deployment_count}} } = projectStore;
  const [open, setOpen] = useState(false);
  const [tabvalue, setTabvalue] = useState(0);
  const labels = projectDetail.labels;
  const events = projectDetail.events;

  Object.entries(labels).map(([keys, value]) => {
    labelTable.push(
      <tr>
        <th>{keys}</th>
        <td>{value}</td>
      </tr>
    );
  });

  // events.map((event) => {
  //   Object.entries(event).map(([key, value]) => {
  //     console.log(key, value);
  //   });
  // });

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
        <CTab label="Labels" />
        <CTab label="Events" />
      </CTabs>
      <CTabPanel value={tabvalue} index={0}>
        <div className="tb_container">
          {/* <TableTitle>상세 정보</TableTitle> */}
          <table className="tb_data">
            <tbody>
              <tr>
                <th>Cluster</th>
                <td>{projectDetail.selectCluster}</td>
                <th>Project</th>
                <td>{projectDetail.projectName}</td>
              </tr>
              <tr>
                <th>Status</th>
                <td>{projectDetail.status}</td>
                <th>WorkSpace</th>
                <td>{projectDetail.workspaceName}</td>
              </tr>
              <tr>
                <th>Creator</th>
                <td>{projectDetail.projectCreator}</td>
                <th>Creation Date</th>
                <td>
                  {moment(projectDetail.created_at).format("YYYY-MM-DD HH:mm")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={1}>
        <div className="tb_container">
          <table className="tb_data">
            <tbody>
              <tr>
                <th>Deployments</th>
                <td>{projectDetail.resource.deployment_count}</td>
              </tr>
              <tr>
                <th>Pods</th>
                <td>{projectDetail.resource.pod_count}</td>
              </tr>
              <tr>
                <th>Services</th>
                <td>{projectDetail.resource.service_count}</td>
              </tr>
              <tr>
                <th>Cronjob</th>
                <td>{projectDetail.resource.cronjob_count}</td>
              </tr>
              <tr>
                <th>Job</th>
                <td>{projectDetail.resource.job_count}</td>
              </tr>
              <tr>
                <th>Volume</th>
                <td>{projectDetail.resource.volume_count}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={2}>
        <div className="tb_container">
          <table className="tb_data">
            <tbody>{labelTable}</tbody>
          </table>
          <br />
          <table className="tb_data">
            <tbody>
              <tr>
                <th>Annotations</th>
                <td>{projectDetail.annotations}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={3}>
        <div className="tb_container">
          <table className="tb_data">
            <tbody>{eventTable}</tbody>
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

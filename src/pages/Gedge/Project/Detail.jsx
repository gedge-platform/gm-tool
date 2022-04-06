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

import { toJS } from "mobx";

import {
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  Select,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

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
  const { projectDetail, labels, annotations, DetailInfo } = projectStore;

  // const { projectDetail :{selectCluster, resources:{deployment_count}} } = projectStore;
  const [open, setOpen] = useState(false);
  const [tabvalue, setTabvalue] = useState(0);
  const labelsTable = [];
  const annotationsTable = [];

  const clusterResourceTable = () => {
    return DetailInfo.map((cluster) => (
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

  const eventsTemp = DetailInfo.map((event) => event?.events);

  const eventsTempTable = [];
  const test = eventsTemp.map((item) => {
    toJS(item)?.map((events) => events);
  });
  console.log(test);
  // eventsTemp.map((item) => {
  //   toJS(item)?.map((event) => {
  //     eventsTempTable.push(
  //       <>
  //         <th>Message</th>
  //         <td>{event?.message}</td>
  //       </>
  //     );
  //   });
  // });

  const clusterName = DetailInfo.map((cluster) => cluster?.clusterName);
  const [cluster, setCluster] = useState("");

  const clusterChange = (e) => {
    setCluster(e.target.value);
  };

  const eventsTable = () => {
    return (
      <div>
        <FormControl sx={{ m: 1, minWidth: 300 }}>
          <Select
            value={cluster === "" ? clusterName[0] : cluster}
            inputProps={{ "aria-label": "Without label" }}
            onChange={clusterChange}
          >
            {clusterName.map((cluster) => (
              <MenuItem value={cluster}>{cluster}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  };

  const eventsAccodion = () => {
    return (
      <div>
        <Accordion>
          <AccordionSummary
            // expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Accordion 1</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            // expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Accordion 2</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion disabled>
          <AccordionSummary
            // expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography>Disabled Accordion</Typography>
          </AccordionSummary>
        </Accordion>
      </div>
    );
  };

  // const list = DetailInfo.map((item) => item.clusterName);
  // const clusterNameList = DetailInfo.filter(
  //   (event) => event.clusterName === list[0]
  // );
  // console.log(clusterNameList);

  // clusterNameList.map((event) => {
  //   console.log(event?.events);
  // });

  // const eventsTable = () => {
  //   return DetailInfo.map((event) => (
  //     <>
  //       <ClusterTitle>{event.clusterName}</ClusterTitle>
  //       <table className="tb_data">
  //         <tbody className="ttb_workload_detail_th">
  //           <tr>
  //             {event?.events ? (
  //               <>
  //                 <th>Message</th>
  //                 <td>{event?.events?.kind}</td>
  //               </>
  //             ) : (
  //               <>
  //                 <th>Message</th>
  //                 <td>No Have Events List</td>
  //               </>
  //             )}
  //           </tr>
  //         </tbody>
  //       </table>
  //     </>
  //   ));
  // };

  // {
  //   /* {event?.events !== null ? (
  //               <>
  //                 <th>Message</th>
  //                 <td>{event?.events?.kind}</td>
  //               </>
  //             ) : (
  //               <>
  //                 <th>Message</th>
  //                 <td>No Have Events List</td>
  //               </>
  //             )} */
  // }
  const resourcesTable = () => {
    return DetailInfo.map((resources) => (
      <>
        <ClusterTitle>{resources.clusterName}</ClusterTitle>
        <table className="tb_data">
          <tbody className="ttb_workload_detail_th">
            <tr>
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
            </tr>
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

  // if (events !== null) {
  //   events.map((event) => {
  //     eventsTable.push(
  //       <div>
  //         <Accordion>
  //           <AccordionSummary
  //             expandIcon={<ExpandMoreRoundedIcon sx={{ color: "white" }} />}
  //             aria-controls="ProjectEvent-content"
  //             id="ProjectEvent-header"
  //             sx={{ bgcolor: theme.colors.primaryDark }}
  //           >
  //             <Typography
  //               sx={{
  //                 width: "10%",
  //                 fontSize: 13,
  //                 color: "white",
  //               }}
  //             >
  //               Message
  //             </Typography>
  //             <Typography sx={{ fontSize: 13, color: "white" }}>
  //               {event["message"]}
  //             </Typography>
  //           </AccordionSummary>
  //           <AccordionDetails sx={{ bgcolor: theme.colors.panelTit }}>
  //             <Typography
  //               sx={{
  //                 fontSize: 13,
  //                 color: "white",
  //                 bgcolor: theme.colors.primary,
  //               }}
  //             >
  //               <table className="tb_data">
  //                 <tr>
  //                   <th>Kind</th>
  //                   <td>{event["kind"]}</td>
  //                   <th>Name</th>
  //                   <td>{event["name"]}</td>
  //                 </tr>
  //                 <tr>
  //                   <th>Namespace</th>
  //                   <td>{event["namespace"]}</td>
  //                   <th>Cluster</th>
  //                   <td>{event["cluster"]}</td>
  //                 </tr>
  //                 <tr>
  //                   <th>Reason</th>
  //                   <td>{event["reason"]}</td>
  //                   <th>Type</th>
  //                   <td>{event["type"]}</td>
  //                 </tr>
  //                 <tr>
  //                   <th>Event Time</th>
  //                   <td>
  //                     {moment(event["eventTime"]).format("YYYY-MM-DD HH:mm")}
  //                   </td>
  //                   <th></th>
  //                   <td></td>
  //                 </tr>
  //               </table>
  //             </Typography>
  //           </AccordionDetails>
  //         </Accordion>
  //       </div>
  //     );
  //   });
  // } else {
  //   eventsTable.push(
  //     <div>
  //       <Accordion>
  //         <AccordionSummary
  //           expandIcon={<ExpandMoreRoundedIcon sx={{ color: "white" }} />}
  //           aria-controls="ProjectEvent-content"
  //           id="ProjectEvent-header"
  //           sx={{ bgcolor: theme.colors.primaryDark }}
  //         >
  //           <Typography
  //             sx={{
  //               width: "10%",
  //               fontSize: 13,
  //               color: "white",
  //             }}
  //           >
  //             Message
  //           </Typography>
  //           <Typography sx={{ fontSize: 13, color: "white" }}></Typography>
  //         </AccordionSummary>
  //         <AccordionDetails sx={{ bgcolor: theme.colors.panelTit }}>
  //           <Typography
  //             sx={{
  //               fontSize: 13,
  //               color: "white",
  //               bgcolor: theme.colors.primary,
  //             }}
  //           >
  //             <table className="tb_data">
  //               <tr>
  //                 <th>No Have Events List </th>
  //               </tr>
  //             </table>
  //           </Typography>
  //         </AccordionDetails>
  //       </Accordion>
  //     </div>
  //   );
  // }

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
          <TableTitle>상세정보</TableTitle>
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
        <div className="tb_container">
          <TableTitle>리소스 사용량</TableTitle>
          {resourcesTable()}
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={2}>
        <div className="tb_container">
          <TableTitle>라벨</TableTitle>
          <table className="tb_data" style={{ tableLayout: "fixed" }}>
            <tbody>{labelsTable}</tbody>
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
          <TableTitle>이벤트</TableTitle>
          <table className="tb_data" style={{ tableLayout: "fixed" }}></table>
          {/* {eventsTable()}
          {eventsAccodion()} */}
          <tbody>{eventsTempTable}</tbody>
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

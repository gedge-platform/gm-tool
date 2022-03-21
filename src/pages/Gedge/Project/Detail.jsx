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

import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";

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
      /*<tr>
        <th>{message}</th>
        <td>{event["message"]}</td>
      </tr>*/

      <tr>
        <TreeView
          aria-label="project-event"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          <div>
            <TreeItem nodeId="1" label={event["message"]}>
              <tr>
                <th>kind</th>
                <td>
                  <TreeItem nodeId="2" label={event["kind"]} />
                </td>
              </tr>
              <tr>
                <th>name</th>
                <td>
                  <TreeItem nodeId="3" label={event["name"]} />
                </td>
              </tr>
              <tr>
                <th>namespace</th>
                <td>
                  <TreeItem nodeId="4" label={event["namespace"]} />
                </td>
              </tr>
              <tr>
                <th>cluster</th>
                <td>
                  <TreeItem nodeId="5" label={event["cluster"]} />
                </td>
              </tr>
              <tr>
                <th>reson</th>
                <td>
                  <TreeItem nodeId="6" label={event["reson"]} />
                </td>
              </tr>
              <tr>
                <th>type</th>
                <td>
                  <TreeItem nodeId="7" label={event["type"]} />
                </td>
              </tr>
              <tr>
                <th>eventTime</th>
                <td>
                  <TreeItem nodeId="8" label={event["evenTime"]} />
                </td>
              </tr>
            </TreeItem>
          </div>
        </TreeView>
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
                <th>클러스터</th>
                <td>{projectDetail.selectCluster}</td>
                <th>프로젝트</th>
                <td>{projectDetail.projectName}</td>
              </tr>
              <tr>
                <th>status</th>
                <td>{projectDetail.status}</td>
                <th>워크스페이스</th>
                <td>{projectDetail.workspaceName}</td>
              </tr>
              <tr>
                <th>생성자</th>
                <td>{projectDetail.projectCreator}</td>
                <th>생성일</th>
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
                <th>annotations</th>
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

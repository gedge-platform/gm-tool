import React, { useState, useEffect } from "react";
import CommActionBar from "@/components/common/CommActionBar";
import { CIconButton, CSelectButton } from "@/components/buttons";
import { PanelBox } from "@/components/styles/PanelBox";
import { swalConfirm } from "@/utils/swal-utils";
import { CScrollbar } from "@/components/scrollbars";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import { AgGrid } from "@/components/datagrids";
import { agDateColumnFilter } from "@/utils/common-utils";
import LogDialog from "../../Template/Dialog/LogDialog";
import { CDatePicker } from "@/components/textfields/CDatePicker";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import clusterStore from "../../../store/Cluster";
import styled from "styled-components";
import { isValidJSON, nullCheck } from "../../../utils/common-utils";
import ReactJson from "react-json-view";

const TableTitle = styled.p`
  font-size: 14px;
  font-weight: 500;
  margin: 8px 0;
  color: rgba(255, 255, 255, 0.8);
`;
const TableSubTitle = styled.p`
  font-size: 12px;
  font-weight: 500;
  margin: 12px 0;
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

const Detail = observer((props) => {
  const {
    clusterDetail: {
      clusterName,
      clusterEndpoint,
      clusterCreator,
      gpu,
      clusterType,
      created_at,
      events,
      ipAddr,
      nodes,
      resource: {
        cronjob_count,
        deployment_count,
        job_count,
        pod_count,
        service_count,
        volume_count,
      },
    },
  } = clusterStore;

  const [open, setOpen] = useState(false);
  const [tabvalue, setTabvalue] = useState(0);
  const [nodeNum, setNodeNum] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabvalue(newValue);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const nodeList = () => {
    return nodes.map((node, idx) => (
      <tr onClick={() => setNodeNum(idx)}>
        <td>{node.name}</td>
        <td>{node.type}</td>
        <td>{node.nodeIP}</td>
        <td>{node.kubeVersion}</td>
        <td>{node.os}</td>
        <td>{node.created_at}</td>
      </tr>
    ));
  };

  const labelByNode = () => {
    return Object.entries(nodes[nodeNum].labels).map(([key, value]) => (
      <Label>
        <span className="key">{key}</span>
        <span className="value">{value}</span>
      </Label>
    ));
  };
  const annotationByNode = () => {
    return Object.entries(nodes[nodeNum].annotations).map(([key, value]) => (
      <tr>
        <th style={{ width: "40%" }}>{key}</th>
        <td>
          {isValidJSON(value) ? (
            <ReactJson src={JSON.parse(value)} theme="summerfruit" />
          ) : (
            value
          )}
        </td>
      </tr>
    ));
  };

  useEffect(() => {
    labelByNode();
    annotationByNode();
  }, [nodeNum]);

  return (
    <PanelBox>
      <CTabs type="tab2" value={tabvalue} onChange={handleTabChange}>
        <CTab label="Overview" />
        <CTab label="Node Info" />
        <CTab label="Events" />
      </CTabs>
      <CTabPanel style={{ overflowY: "scroll" }} value={tabvalue} index={0}>
        <div className="tb_container" style={{ width: "95%" }}>
          <TableTitle>상세정보</TableTitle>
          <table className="tb_data">
            <tbody className="tb_data_detail">
              <tr>
                <th>Cluster Name</th>
                <td>{clusterName}</td>
                <th>IP</th>
                <td>{ipAddr}</td>
              </tr>
              <tr>
                <th>Type</th>
                <td>{clusterType}</td>
                <th>Creator</th>
                <td>{clusterCreator}</td>
              </tr>
              <tr>
                <th>GPU</th>
                <td>{nullCheck(gpu)}</td>
                <th>Created</th>
                <td>{created_at}</td>
              </tr>
            </tbody>
          </table>
          <TableTitle>리소스 상태</TableTitle>
          <table className="tb_data">
            <tbody className="tb_data_detail">
              <tr>
                <th>Deployment</th>
                <td>{deployment_count}</td>
                <th>Pod</th>
                <td>{pod_count}</td>
              </tr>
              <tr>
                <th>Service</th>
                <td>{service_count}</td>
                <th>Cronjob</th>
                <td>{cronjob_count}</td>
              </tr>
              <tr>
                <th>Job</th>
                <td>{job_count}</td>
                <th>Volume</th>
                <td>{volume_count}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CTabPanel>
      <CTabPanel style={{ overflowY: "scroll" }} value={tabvalue} index={1}>
        <div className="tb_container" style={{ width: "95%" }}>
          <TableTitle>Node List</TableTitle>
          <table className="tb_data">
            <tbody className="tb_data_nodeInfo">
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>IP</th>
                <th>Kube-Version</th>
                <th>OS</th>
                <th>Created</th>
              </tr>
              {nodes.length >= 1 ? (
                nodeList()
              ) : (
                <tr>
                  <td>No Nodes Information</td>
                </tr>
              )}
            </tbody>
          </table>

          <TableSubTitle>Labels({nodes[nodeNum].name})</TableSubTitle>
          <LabelContainer>{labelByNode()}</LabelContainer>

          <TableSubTitle>Annotations({nodes[nodeNum].name})</TableSubTitle>
          <table className="tb_data">
            <tbody>{annotationByNode()}</tbody>
          </table>
        </div>
      </CTabPanel>
    </PanelBox>
  );
});
export default Detail;

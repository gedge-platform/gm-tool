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
import { nullCheck } from "../../../utils/common-utils";

const TableTitle = styled.p`
  font-size: 14px;
  font-weight: 500;
  margin: 8px 0;
  color: rgba(255, 255, 255, 0.8);
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

  console.log(nodes);
  const [open, setOpen] = useState(false);
  const [tabvalue, setTabvalue] = useState(0);

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
    <PanelBox>
      <CTabs type="tab2" value={tabvalue} onChange={handleTabChange}>
        <CTab label="Overview" />
        <CTab label="Node Info" />
        <CTab label="Metadata" />
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
              <tr>
                <td style={{ textAlign: "center" }}>No Nodes Information</td>
              </tr>
              {nodes ? (
                nodes.map((node) => <tr></tr>)
              ) : (
                <tr>No Nodes Information</tr>
              )}
            </tbody>
          </table>
        </div>
      </CTabPanel>
    </PanelBox>
  );
});
export default Detail;

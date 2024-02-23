import React, { useState, useEffect } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import styled from "styled-components";
import { dateFormatter } from "@/utils/common-utils";
import { serviceStore } from "@/store";
import { observer } from "mobx-react-lite";

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
  border: 1px double #141a30;
  background-color: #2f3855;
  margin: 10px 0;

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

const ServiceAdminDetail = observer(() => {
  const { portTemp, involvesPods, involvesWorkloads, adminServiceDetail } =
    serviceStore;
  console.log("adminServiceDetail ???", adminServiceDetail);
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
    <PanelBox style={{ overflowY: "hidden" }}>
      <CTabs type="tab2" value={tabvalue} onChange={handleTabChange}>
        <CTab label="Overview" />
        <CTab label="Involves Data" />
        <CTab label="Port Info" />
      </CTabs>
      <CTabPanel value={tabvalue} index={0}>
        <div className="tb_container">
          {Object.keys(adminServiceDetail).length !== 0 ? (
            <table className="tb_data" style={{ tableLayout: "fixed" }}>
              <tbody>
                <tr>
                  <th style={{ width: "25%" }}>Service Name</th>
                  <td>
                    {adminServiceDetail.name ? adminServiceDetail.name : "-"}
                  </td>
                </tr>
                <tr>
                  <th>Cluster</th>
                  <td>
                    {adminServiceDetail.cluster
                      ? adminServiceDetail.cluster
                      : "-"}
                  </td>
                </tr>
                <tr>
                  <th>Project</th>
                  <td>
                    {adminServiceDetail.project
                      ? adminServiceDetail.project
                      : "-"}
                  </td>
                </tr>
                <tr>
                  <th>Selector</th>
                  <td>
                    {adminServiceDetail.selector ? (
                      Object.entries(adminServiceDetail.selector).map(
                        ([key, value]) => (
                          <>
                            <table className="tb_data" style={{ width: "50%" }}>
                              <tbody>
                                <tr>
                                  <th>{key}</th>
                                </tr>
                                <tr>
                                  <td>{value}</td>
                                </tr>
                              </tbody>
                            </table>
                            <br />
                          </>
                        )
                      )
                    ) : (
                      <>-</>
                    )}
                  </td>
                </tr>
                <tr>
                  <th>Type</th>
                  <td>
                    {adminServiceDetail.type ? adminServiceDetail.type : "-"}
                  </td>
                </tr>
                <tr>
                  <th>Cluster IP</th>
                  <td>
                    {adminServiceDetail.clusterIp
                      ? adminServiceDetail.clusterIp
                      : "-"}
                  </td>
                </tr>
                <tr>
                  <th>Session Affinity</th>
                  <td>
                    {adminServiceDetail.sessionAffinity
                      ? adminServiceDetail.sessionAffinity
                      : "-"}
                  </td>
                </tr>
                <tr>
                  <th>Created</th>
                  <td>
                    {adminServiceDetail.createAt
                      ? dateFormatter(adminServiceDetail.createAt)
                      : "-"}
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <LabelContainer>
              <p>No Resources Info</p>
            </LabelContainer>
          )}
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={1}>
        <div className="tb_container">
          <TableTitle>Pod</TableTitle>
          {involvesPods ? (
            involvesPods.length !== 0 ? (
              involvesPods.map((pod) => (
                <>
                  <table className="tb_data" style={{ tableLayout: "fixed" }}>
                    <tbody>
                      <tr>
                        <th style={{ width: "25%" }}>Name</th>
                        <td>{pod?.name ? pod?.name : "-"}</td>
                      </tr>
                      <tr>
                        <th>IP</th>
                        <td>{pod?.ip ? pod?.ip : "-"}</td>
                      </tr>
                      <tr>
                        <th>Node Name</th>
                        <td>{pod?.nodeName ? pod?.nodeName : "-"}</td>
                      </tr>
                    </tbody>
                  </table>
                  <br />
                </>
              ))
            ) : (
              <LabelContainer>
                <p>No Pods Info</p>
              </LabelContainer>
            )
          ) : (
            <LabelContainer>
              <p>No Pods Info</p>
            </LabelContainer>
          )}

          <TableTitle>Workload</TableTitle>
          {involvesWorkloads ? (
            involvesWorkloads.length !== 0 ? (
              involvesWorkloads.map((workload) => (
                <>
                  <table className="tb_data" style={{ tableLayout: "fixed" }}>
                    <tbody>
                      <tr>
                        <th style={{ width: "25%" }}>Name</th>
                        <td>{workload?.name ? workload?.name : "-"}</td>
                      </tr>
                      <tr>
                        <th>Kind</th>
                        <td>{workload?.kind ? workload?.kind : "-"}</td>
                      </tr>
                      <tr>
                        <th>Replica Name</th>
                        <td>
                          {workload?.replicaName ? workload?.replicaName : "-"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <br />
                </>
              ))
            ) : (
              <LabelContainer>
                <p>No Workloads Info</p>
              </LabelContainer>
            )
          ) : (
            <LabelContainer>
              <p>No Workloads Info</p>
            </LabelContainer>
          )}
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={2}>
        <div className="tb_container">
          {portTemp.length !== 0 ? (
            portTemp.map((port) => (
              <>
                <table className="tb_data" style={{ tableLayout: "fixed" }}>
                  <tbody>
                    <tr>
                      <th>Name</th>
                      <td>{port?.name ? port?.name : "-"}</td>
                      <th>Port</th>
                      <td>{port?.port ? port?.port : "-"}</td>
                    </tr>
                    <tr>
                      <th>Protocol</th>
                      <td>{port?.protocol ? port?.protocol : "-"}</td>
                      <th>TargetPort</th>
                      <td>{port?.targetPort ? port?.targetPort : "-"}</td>
                    </tr>
                  </tbody>
                </table>
                <br />
              </>
            ))
          ) : (
            <LabelContainer>
              <p>No Port Info</p>
            </LabelContainer>
          )}
        </div>
      </CTabPanel>
    </PanelBox>
  );
});

export default ServiceAdminDetail;

import React, { useState, useEffect } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import styled from "styled-components";
import { dateFormatter } from "@/utils/common-utils";
import serviceStore from "../../../store/Service";
import { observer } from "mobx-react-lite";

const TableTitle = styled.p`
  font-size: 14px;
  font-weight: 500;
  margin: 8px 0;
  color: rgba(255, 255, 255, 0.8);
`;

const Detail = observer(() => {
  const { serviceDetail, portTemp, involvesPods, involvesWorkloads } =
    serviceStore;
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
          <table className="tb_data" style={{ tableLayout: "fixed" }}>
            <tbody>
              <tr>
                <th style={{ width: "25%" }}>Service Name</th>
                <td>{serviceDetail.name}</td>
              </tr>
              <tr>
                <th>Cluster</th>
                <td>{serviceDetail.cluster}</td>
              </tr>
              <tr>
                <th>Project</th>
                <td>{serviceDetail.project}</td>
              </tr>
              <tr>
                <th>Selector</th>
                <td>
                  {serviceDetail.selector ? (
                    Object.entries(serviceDetail.selector).map(
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
                <td>{serviceDetail.type}</td>
              </tr>
              <tr>
                <th>Cluster IP</th>
                <td>{serviceDetail.clusterIp}</td>
              </tr>
              <tr>
                <th>Session Affinity</th>
                <td>{serviceDetail.sessionAffinity}</td>
              </tr>
              <tr>
                <th>Created</th>
                <td>{dateFormatter(serviceDetail.createAt)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={1}>
        <div className="tb_container">
          <TableTitle>Pod</TableTitle>
          {involvesPods ? (
            involvesPods.map((pod) => (
              <>
                <table className="tb_data" style={{ tableLayout: "fixed" }}>
                  <tbody>
                    <tr>
                      <th style={{ width: "25%" }}>Name</th>
                      <td>{pod?.name}</td>
                    </tr>
                    <tr>
                      <th>IP</th>
                      <td>{pod?.ip}</td>
                    </tr>
                    <tr>
                      <th>Node Name</th>
                      <td>{pod?.nodeName}</td>
                    </tr>
                  </tbody>
                </table>
                <br />
              </>
            ))
          ) : (
            <></>
          )}
          <br />
          <TableTitle>Workload</TableTitle>
          {involvesWorkloads.map((workload) => (
            <>
              <table className="tb_data" style={{ tableLayout: "fixed" }}>
                <tbody>
                  <tr>
                    <th style={{ width: "25%" }}>Name</th>
                    <td>
                      {workload?.name === undefined ? <>-</> : workload?.name}
                    </td>
                  </tr>
                  <tr>
                    <th>Kind</th>
                    <td>
                      {workload?.kind === undefined ? <>-</> : workload?.kind}
                    </td>
                  </tr>
                  <tr>
                    <th>Replica Name</th>
                    <td>
                      {workload?.replicaName === undefined ? (
                        <>-</>
                      ) : (
                        workload?.replicaName
                      )}
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
        <div className="tb_container">
          {portTemp.map((port) => (
            <>
              <table className="tb_data" style={{ tableLayout: "fixed" }}>
                <tbody>
                  <tr>
                    <th>Name</th>
                    <td>{port?.name}</td>
                    <th>Port</th>
                    <td>{port?.port}</td>
                  </tr>
                  <tr>
                    <th>Protocol</th>
                    <td>{port?.protocol}</td>
                    <th>TargetPort</th>
                    <td>{port?.targetPort}</td>
                  </tr>
                </tbody>
              </table>
              <br />
            </>
          ))}
        </div>
      </CTabPanel>
    </PanelBox>
  );
});

export default Detail;

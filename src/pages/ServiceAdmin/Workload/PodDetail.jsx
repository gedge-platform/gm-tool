import React, { useState, useEffect } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import styled from "styled-components";
import { dateFormatter, isValidJSON } from "@/utils/common-utils";
import { Podcasts } from "@mui/icons-material";
import podStore from "../../../store/Pod";
import { observer } from "mobx-react-lite";
import theme from "@/styles/theme";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { toJS } from "mobx";
import ReactJson from "react-json-view";

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
  const {
    podDetail,
    label,
    annotations,
    events,
    containerResources,
    podContainers,
    containerStatuses,
    involvesData,
  } = podStore;

  const [open, setOpen] = useState(false);
  const [tabvalue, setTabvalue] = useState(0);
  const annotationsTable = [];
  const statusConditionsTable = [];
  const podContainer = containerResources;
  const podContainersTable = [];
  const eventTable = [];

  const handleTabChange = (event, newValue) => {
    setTabvalue(newValue);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const labelTable = () => {
    return Object.entries(label).map(([key, value]) => (
      <Label>
        <span className="key">{key}</span>
        <span className="value">{value}</span>
      </Label>
    ));
  };

  Object.entries(annotations).map(([key, value]) => {
    annotationsTable.push(
      <tr>
        <th className="tb_workload_detail_labels_th">{key}</th>
        <td>{value}</td>
      </tr>
    );
  });

  const eventsTable = [];
  if (events !== null) {
    events?.map((events) => {
      eventsTable.push(
        <div>
          <Accordion>
            <AccordionSummary
              expandIcon={
                <ExpandMoreRoundedIcon
                  sx={{ color: "rgba(255, 255, 255, 0.7)" }}
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
    });
  } else {
    eventsTable.push(
      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={
              <ExpandMoreRoundedIcon
                sx={{ color: "rgba(255, 255, 255, 0.7)" }}
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

  return (
    <PanelBox style={{ overflowY: "hidden" }}>
      <CTabs type="tab2" value={tabvalue} onChange={handleTabChange}>
        <CTab label="Overview" />
        <CTab label="Resources" />
        <CTab label="Metadata" />
        <CTab label="Status" />
        <CTab label="Events" />
        <CTab label="Involves Data" />
      </CTabs>
      <CTabPanel value={tabvalue} index={0}>
        <div className="tb_container">
          <table className="tb_data" style={{ tableLayout: "fixed" }}>
            <tbody>
              <tr>
                <th className="tb_workload_detail_th">Name</th>
                <td>{podDetail.name}</td>
                <th>Cluster</th>
                <td>{podDetail.cluster}</td>
              </tr>
              <tr>
                <th>Project</th>
                <td>{podDetail.project}</td>
                <th>Status</th>
                <td>{podDetail.status}</td>
              </tr>
              <tr>
                <th>Pod IP</th>
                <td>{podDetail.podIP}</td>
                <th>Node Name</th>
                <td>{podDetail.node_name}</td>
              </tr>
              <tr>
                <th>Qos Class</th>
                <td>{podDetail.qosClass}</td>
                <th>Created</th>
                <td>{dateFormatter(podDetail.creationTimestamp)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={1}>
        <div className="tb_container" style={{ tableLayout: "fixed" }}>
          <TableTitle>Pod Containers</TableTitle>
          {podContainers.map((pod) => (
            <>
              <table className="tb_data">
                <tbody>
                  <tr>
                    <th style={{ width: "20%" }}>Name</th>
                    <td>{pod?.name}</td>
                  </tr>
                  <tr>
                    <th>image</th>
                    <td>{pod?.image}</td>
                  </tr>
                  <tr>
                    <th>Ports</th>
                    <td>
                      {pod?.ports ? (
                        <>
                          <table className="tb_data">
                            <tbody className="tb_services_detail_th">
                              <tr>
                                <th>Name</th>
                                <th>ContainerPort</th>
                                <th>Protocol</th>
                              </tr>
                              {pod?.ports.map((port) => (
                                <tr>
                                  <td>{port?.name ? port.name : "-"}</td>
                                  <td>
                                    {port?.containerPort
                                      ? port.containerPort
                                      : "-"}
                                  </td>
                                  <td>
                                    {port?.protocol ? port.protocol : "-"}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <br />
                        </>
                      ) : (
                        <>-</>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>Volumemounts</th>
                    <td>
                      <>
                        <table className="tb_data">
                          <tbody className="tb_services_detail_th">
                            <tr>
                              <th>Name</th>
                              <th>Mountpath</th>
                              <th>readonly</th>
                            </tr>
                            {pod?.volumemounts.map((vol) => (
                              <tr>
                                <td>{vol.name ? vol.name : "-"}</td>
                                <td>{vol.mountpath ? vol.mountpath : "-"}</td>
                                <td>{vol.readonly ? "true" : "false"}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <br />
                      </>
                    </td>
                  </tr>
                  <tr>
                    <th>Environment</th>
                    <td>
                      {/* 배열은 length */}
                      {pod?.env?.length >= 1 ? (
                        <>
                          <table className="tb_data">
                            <tbody className="tb_resources_detail_th">
                              <tr>
                                <th>Name</th>
                                <th>Value</th>
                              </tr>
                              {pod.env?.map((item) => (
                                <tr>
                                  <td>{item.name ? item.name : <>-</>}</td>
                                  <td>{item.value ? item.value : <>-</>}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <br />
                        </>
                      ) : (
                        <>-</>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>ready</th>
                    <td> {pod?.ready ? "true" : "false"}</td>
                  </tr>
                  <tr>
                    <th>restartCount</th>
                    <td>{podDetail?.restart}</td>
                  </tr>
                  <tr>
                    <th>started</th>
                    <td>{pod?.started ? "true" : "false"}</td>
                  </tr>
                </tbody>
              </table>
              <br />
            </>
          ))}
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={2}>
        <div>
          <TableTitle>Labels</TableTitle>
          <LabelContainer>{labelTable()}</LabelContainer>

          <br />
          <TableTitle>Annotaions</TableTitle>
          <table className="tb_data" style={{ tableLayout: "fixed" }}>
            <tbody>{annotationsTable}</tbody>
          </table>
          <br />
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={3}>
        <div className="tb_container">
          <TableTitle>Container Statuses</TableTitle>
          {containerStatuses.map((status) => (
            <>
              <table className="tb_data">
                <tbody>
                  <tr>
                    <th>containerID</th>
                    <td>{status?.containerID}</td>
                  </tr>
                  <tr>
                    <th>Name</th>
                    <td>{status?.name}</td>
                  </tr>
                  <tr>
                    <th>Ready</th>
                    <td>{status?.ready ? "true" : "false"}</td>
                  </tr>
                  <tr>
                    <th>RestartCount</th>
                    <td>{status?.restartCount}</td>
                  </tr>
                  <tr>
                    <th>Image</th>
                    <td>{status?.image}</td>
                  </tr>
                  <tr>
                    <th>started</th>
                    <td>{status?.started ? "true" : "false"}</td>
                  </tr>
                </tbody>
              </table>
              <br />
            </>
          ))}
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={4}>
        <div className="tb_container">
          <table className="tb_data">
            <tbody>{eventsTable}</tbody>
          </table>
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={5}>
        <div className="tb_container">
          <TableTitle>Workload</TableTitle>
          <table className="tb_data">
            <tbody className="tb_workload_pod_detail">
              <tr>
                <th>Name</th>
                <td>
                  {involvesData.workloadList.name
                    ? involvesData.workloadList.name
                    : "-"}
                </td>
              </tr>
              <tr>
                <th>Kind</th>
                <td>
                  {involvesData.workloadList.kind
                    ? involvesData.workloadList.kind
                    : "-"}
                </td>
              </tr>
              <tr>
                <th>ReplicaName</th>
                <td>
                  {involvesData.workloadList.replicaName
                    ? involvesData.workloadList.replicaName
                    : "-"}
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <TableTitle>Srvice</TableTitle>
          <table className="tb_data">
            <tbody className="tb_workload_pod_detail">
              <tr>
                <th>Metadata</th>
                <td>
                  <table className="tb_data">
                    <tbody className="tb_services_detail_th">
                      <tr>
                        <th>Name</th>
                        <th>Namespace</th>
                        <th>Created</th>
                      </tr>
                      {involvesData?.serviceList ? (
                        involvesData?.serviceList?.map((item) => (
                          <tr>
                            <td>
                              {item.metadata.name ? item.metadata.name : "-"}
                            </td>
                            <td>
                              {item.metadata.namespace
                                ? item.metadata.namespace
                                : "-"}
                            </td>
                            <td>
                              {item.metadata.creationTimestamp
                                ? dateFormatter(item.metadata.creationTimestamp)
                                : "-"}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                        </>
                      )}
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <th>Subsets</th>
                <td>
                  <TableTitle>Addresses</TableTitle>
                  <table className="tb_data">
                    <tbody className="tb_workload_pod_detail">
                      <tr>
                        <th>Nodename</th>
                        <th>IP</th>
                      </tr>
                      {involvesData?.serviceList === null ? (
                        <tr>
                          <td>-</td>
                          <td>-</td>
                        </tr>
                      ) : (
                        involvesData?.serviceList?.map((item) =>
                          Object.entries(item?.subsets).map(([inx, value]) =>
                            value.addresses === undefined ? (
                              <tr>
                                <td>-</td>
                                <td>-</td>
                              </tr>
                            ) : (
                              involvesData?.serviceList?.map((item) =>
                                Object.entries(item?.subsets).map(
                                  ([inx, value]) =>
                                    Object.entries(value?.addresses).map(
                                      ([key, value]) => (
                                        <tr>
                                          <td>
                                            {value?.nodename
                                              ? value?.nodename
                                              : "-"}
                                          </td>
                                          <td>{value?.ip ? value?.ip : "-"}</td>
                                        </tr>
                                      )
                                    )
                                )
                              )
                            )
                          )
                        )
                      )}
                    </tbody>
                  </table>
                  <br />
                  <TableTitle>Ports</TableTitle>
                  <table className="tb_data">
                    <tbody className="tb_workload_pod_detail">
                      <tr>
                        <th>Name</th>
                        <th>Port</th>
                        <th>Protocol</th>
                      </tr>
                      {involvesData?.serviceList === null ? (
                        <tr>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                        </tr>
                      ) : (
                        // ) : (
                        //   involvesData?.serviceList?.map((item) =>
                        //     Object.entries(item?.subsets).map(([inx, value]) =>
                        //       value.ports === undefined ? (
                        //         <tr>
                        //           <td>-</td>
                        //           <td>-</td>
                        //           <td>-</td>
                        //         </tr>
                        involvesData?.serviceList?.map((item) =>
                          Object.entries(item?.subsets).map(([inx, value]) =>
                            Object.entries(value?.ports).map(([key, value]) => (
                              <tr>
                                <td>{value?.name ? value?.name : "-"}</td>
                                <td>{value?.port ? value?.port : "-"}</td>
                                <td>
                                  {value?.protocol ? value?.protocol : "-"}
                                </td>
                              </tr>
                            ))
                          )
                        )
                      )}
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CTabPanel>
    </PanelBox>
  );
});

export default Detail;

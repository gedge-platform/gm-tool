import React, { useState, useEffect } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import styled from "styled-components";
import { observer } from "mobx-react";
import daemonSetStore from "../../../store/DaemonSet";
import { dateFormatter } from "@/utils/common-utils";
import theme from "@/styles/theme";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

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
    daemonSetDetail,
    label,
    annotations,
    events,
    pods,
    services,
    containers,
  } = daemonSetStore;
  const [open, setOpen] = useState(false);
  const [tabvalue, setTabvalue] = useState(0);

  const annotationsTable = [];
  const annotationsTemp = annotations;

  const eventsTable = [];

  const handleTabChange = (event, newValue) => {
    setTabvalue(newValue);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  Object.entries(annotationsTemp).map(([key, value]) => {
    annotationsTable.push(
      <tr>
        <th className="tb_workload_detail_labels_th">{key}</th>
        <td style={{ whiteSpace: "pre-line" }}>{value}</td>
      </tr>
    );
  });

  if (events !== null) {
    events?.map((events) => {
      eventsTable.push(
        <div>
          <Accordion>
            <AccordionSummary
              expandIcon={
                <ExpandMoreRoundedIcon
                  sx={{ color: "rgba(255,255,255,0.7)" }}
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
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                Message
              </Typography>
              <Typography
                sx={{
                  width: "80%",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                {events?.message}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: theme.colors.panelTit }}>
              <Typography
                sx={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.7)",
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
              <ExpandMoreRoundedIcon sx={{ color: "rgba(255,255,255,0.7)" }} />
            }
            aria-controls="ProjectEvent-content"
            id="ProjectEvent-header"
            sx={{ bgcolor: theme.colors.primaryDark }}
          >
            <Typography
              sx={{
                width: "10%",
                fontSize: 13,
                color: "rgba(255,255,255,0.7)",
              }}
            >
              Message
            </Typography>
            <Typography
              sx={{
                width: "80%",
                fontSize: 13,
                color: "rgba(255,255,255,0.7)",
              }}
            ></Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ bgcolor: theme.colors.panelTit }}>
            <Typography
              sx={{
                fontSize: 13,
                color: "rgba(255,255,255,0.7)",
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
        <CTab label="Events" />
        <CTab label="Involves Data" />
      </CTabs>
      <CTabPanel value={tabvalue} index={0}>
        <div className="tb_container">
          <table className="tb_data" style={{ tableLayout: "fixed" }}>
            <tbody>
              <tr>
                <th className="tb_workload_detail_th">Name</th>
                <td>{daemonSetDetail.name}</td>
                <th className="tb_workload_detail_th">Cluster</th>
                <td>{daemonSetDetail.cluster}</td>
              </tr>
              <tr>
                <th>Project</th>
                <td>{daemonSetDetail.project}</td>
                <th>Created</th>
                <td>{dateFormatter(daemonSetDetail.createAt)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={1}>
        <div className="tb_container">
          <TableTitle>Containers</TableTitle>
          {containers.map((container) => (
            <>
              <table className="tb_data" style={{ tableLayout: "fixed" }}>
                <tbody className="tb_workload_pod_detail">
                  <tr>
                    <th>Container Name</th>
                    <td>{container.name}</td>
                  </tr>
                  <tr>
                    <th>Args</th>
                    <td>
                      {container.args ? JSON.stringify(container.args) : <>-</>}
                    </td>
                  </tr>
                  <tr>
                    <th>Command</th>
                    <td>
                      {container.command ? (
                        JSON.stringify(container.command)
                      ) : (
                        <>-</>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>Environment</th>
                    <td>
                      <table
                        className="tb_data"
                        style={{ tableLayout: "fixed" }}
                      >
                        <tbody className="tb_workload_pod_detail">
                          <tr>
                            <th>Name</th>
                            <th>Value</th>
                            <th>Source</th>
                          </tr>
                          {container.env ? (
                            container.env?.map((env) => (
                              <>
                                <tr>
                                  <td>{env.name ? env.name : "-"}</td>
                                  <td>{env.value ? env.value : "-"}</td>
                                  <td>
                                    {env.valueFrom?.fieldRef?.fieldPath
                                      ? env.valueFrom?.fieldRef?.fieldPath
                                      : "-"}
                                  </td>
                                </tr>
                              </>
                            ))
                          ) : (
                            <tr>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <th>Image</th>
                    <td>{container.image}</td>
                  </tr>
                  <tr>
                    <th>volumeMounts</th>
                    <td>
                      <table
                        className="tb_data"
                        style={{ tableLayout: "fixed" }}
                      >
                        <tbody className="tb_workload_pod_detail">
                          <tr>
                            <th>Name</th>
                            <th>Mount Path</th>
                            <th>Propagation</th>
                          </tr>
                          {container.volumeMounts ? (
                            container.volumeMounts.map((volume) => (
                              <tr>
                                <td>{volume.name}</td>
                                <td>{volume.mountPath}</td>
                                <td></td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
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
          <TableTitle>Labels</TableTitle>
          <LabelContainer>
            {label ? (
              Object.entries(label).map(([key, value]) => (
                <Label>
                  <span className="key">{key}</span>
                  <span className="value">{value}</span>
                </Label>
              ))
            ) : (
              <p>No Labels Info.</p>
            )}
          </LabelContainer>
          <TableTitle>Annotations</TableTitle>
          <table className="tb_data" style={{ tableLayout: "fixed" }}>
            <tbody style={{ whiteSpace: "pre-line" }}>{annotationsTable}</tbody>
          </table>
          <br />
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={3}>
        <div className="tb_container">
          <table className="tb_data">
            <tbody>{eventsTable}</tbody>
          </table>
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={4}>
        <div className="tb_container">
          <TableTitle>Pod</TableTitle>
          {pods ? (
            pods.map((item) => (
              <>
                <table className="tb_data" style={{ tableLayout: "fixed" }}>
                  <tbody className="tb_workload_pod_detail">
                    <tr>
                      <th>Name</th>
                      <td>{item.name}</td>
                    </tr>
                    <tr>
                      <th>Node</th>
                      <td>{item.node}</td>
                    </tr>
                    <tr>
                      <th>Pod IP</th>
                      <td>{item.podIP}</td>
                    </tr>
                    <tr>
                      <th>Status</th>
                      <td>{item.status}</td>
                    </tr>
                    <tr>
                      <th>Restart</th>
                      <td>{item.restart}</td>
                    </tr>
                  </tbody>
                </table>
                <br />
              </>
            ))
          ) : (
            <>
              <table className="tb_data" style={{ tableLayout: "fixed" }}>
                <tbody className="tb_workload_pod_detail">
                  <tr>
                    <th>Name</th>
                    <td>-</td>
                  </tr>
                  <tr>
                    <th>Node</th>
                    <td>-</td>
                  </tr>
                  <tr>
                    <th>Pod IP</th>
                    <td>-</td>
                  </tr>
                  <tr>
                    <th>Status</th>
                    <td>-</td>
                  </tr>
                  <tr>
                    <th>Restart</th>
                    <td>-</td>
                  </tr>
                </tbody>
              </table>
              <br />
            </>
          )}
          <TableTitle>Service</TableTitle>
          <table className="tb_data" style={{ tableLayout: "fixed" }}>
            <>
              <tbody className="tb_workload_pod_detail">
                <tr>
                  <th>Name</th>
                  <td>{services.name ? services.name : "-"}</td>
                </tr>
                <tr>
                  <th>Port</th>
                  <td>
                    <table className="tb_data">
                      <tbody className="tb_services_detail_th">
                        <tr>
                          <th>Name</th>
                          <th>Port</th>
                          <th>Protocol</th>
                        </tr>
                        <tr>
                          {services.port ? (
                            services.port?.map((port) => (
                              <>
                                <td>{port.name}</td>
                                <td>{port.port}</td>
                                <td>{port.protocol}</td>
                              </>
                            ))
                          ) : (
                            <>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                            </>
                          )}
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </>
          </table>
        </div>
      </CTabPanel>
    </PanelBox>
  );
});

export default Detail;

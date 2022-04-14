import React, { useState, useEffect } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import styled from "styled-components";
import moment from "moment";
import statefulSetStore from "../../../store/StatefulSet";
import { observer } from "mobx-react-lite";
import { isValidJSON } from "../../../utils/common-utils";
import ReactJson from "react-json-view";
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

const StatefulSetDetail = observer(() => {
  const {
    statefulSetDetail: {
      annotations,
      cluster,
      containers,
      createAt,
      events,
      label,
      name,
      ownerReferences,
      project,
      status,
    },
  } = statefulSetStore;

  const [open, setOpen] = useState(false);
  const [tabvalue, setTabvalue] = useState(0);

  const labelTable = [];
  const labelTemp = label;

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
    <PanelBox>
      <CTabs type="tab2" value={tabvalue} onChange={handleTabChange}>
        <CTab label="Overview" />
        <CTab label="Metadata" />
        <CTab label="Events" />
      </CTabs>
      <CTabPanel value={tabvalue} index={0}>
        <div className="tb_container">
          <table className="tb_data" style={{ tableLayout: "fixed" }}>
            <tbody className="tb_data_detail">
              <tr>
                <th className="tb_workload_detail_th">Name</th>
                <td>{name}</td>
                <th className="tb_workload_detail_th">Cluster</th>
                <td>{cluster}</td>
              </tr>
              <tr>
                <th>Project</th>
                <td>{project}</td>
                <th>Created</th>
                <td>{moment(createAt).format("YYYY-MM-DD HH:MM")}</td>
              </tr>
            </tbody>
          </table>
          <TableTitle>Containers</TableTitle>
          {containers
            ? containers.map((container) => (
                <table className="tb_data tb_data_container">
                  <tbody>
                    <tr>
                      <th>Container Name</th>
                      <td>{container.name}</td>
                    </tr>
                    <tr>
                      <th>Image</th>
                      <td>{container.image}</td>
                    </tr>
                    <tr>
                      <th>Container Ports</th>
                      <td>
                        {container.ports?.map((port) => (
                          <p>
                            {port.containerPort}/{port.protocol}
                          </p>
                        ))}
                      </td>
                    </tr>

                    <tr>
                      <th>Environment</th>
                      <td>
                        {container.env ? (
                          <table className="tb_data">
                            <tbody>
                              <tr>
                                <th>Name</th>
                                <th>Value</th>
                                <th>Source</th>
                              </tr>
                              {container.env.map((item) => (
                                <tr>
                                  <td>{item.name}</td>
                                  <td>{item.value}</td>
                                  <td>{item.valueFrom?.fieldRef?.fieldPath}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        ) : (
                          "No Env Info."
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>Args</th>
                      <td>{JSON.stringify(container.args)}</td>
                    </tr>
                    <tr>
                      <th>Volume Mounts</th>
                      <td>
                        <table className="tb_data">
                          <tbody>
                            <tr>
                              <th>Name</th>
                              <th>Mount Path</th>
                              <th>Propagation</th>
                            </tr>
                            {container.volumeMounts
                              ? container.volumeMounts.map((volume) => (
                                  <tr>
                                    <td>{volume.name}</td>
                                    <td>{volume.mountPath}</td>
                                    <td></td>
                                  </tr>
                                ))
                              : "No Volume Info."}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              ))
            : "No Containers Info."}
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={1}>
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
          <table className="tb_data">
            <tbody>
              {annotations ? (
                Object.entries(annotations).map(([key, value]) => (
                  <tr>
                    <th style={{ width: "20%" }}>{key}</th>
                    <td>
                      {isValidJSON(value) ? (
                        <ReactJson
                          src={JSON.parse(value)}
                          theme="summerfruit"
                          displayDataTypes={false}
                          displayObjectSize={false}
                        />
                      ) : (
                        value
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>No Annotations Info.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={2}>
        <div className="tb_container">
          <table className="tb_data">
            <tbody>{eventsTable}</tbody>
          </table>
        </div>
      </CTabPanel>
    </PanelBox>
  );
});
export default StatefulSetDetail;

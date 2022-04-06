import React, { useState, useEffect } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import styled from "styled-components";
import moment from "moment";
import { observer } from "mobx-react";
import jobStore from "../../../store/Job";

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
  color: #fff;
`;

const Detail = observer(() => {
  const { jobDetailData, InvolvesPodList, labels, annotations, events } =
    jobStore;
  const [open, setOpen] = useState(false);
  const [tabvalue, setTabvalue] = useState(0);

  const labelTable = [];
  const label = labels;

  const annotationTable = [];
  const annotation = annotations;
  const detailInvolvesPodList = InvolvesPodList;
  const detailInvolvesPodListTable = [];
  const eventTable = [];

  Object.entries(label).map(([key, value]) => {
    labelTable.push(
      <tr>
        <th className="tb_workload_detail_labels_th">{key}</th>
        <td>{value}</td>
      </tr>
    );
  });

  Object.entries(annotation).map(([key, value]) => {
    annotationTable.push(
      <tr>
        <th className="tb_workload_detail_labels_th">{key}</th>
        <td>{value}</td>
      </tr>
    );
  });

  // {
  //   detailInvolvesPodList &&
  //     detailInvolvesPodList.map((item) => {
  //       detailInvolvesPodListTable.push(
  //         <>
  //           <tr>
  //             <th>Metdata</th>
  //             <td>{item.metadata["name"]}</td>
  //           </tr>
  //           <tr>
  //             <th>Phase</th>
  //             <td>{item.status["phase"]}</td>
  //             <th>Host IP</th>
  //             <td>{item.status["hostIP"]}</td>
  //             <th>Pod IP</th>
  //             <td>{item.status["podIP"]}</td>
  //           </tr>
  //           <tr>
  //             <th>Node name</th>
  //             <td>{item.spec["nodeName"]}</td>
  //           </tr>
  //         </>
  //       );
  //     });
  // }

  // {
  //   events &&
  //     events.map((event, message) => {
  //       eventTable.push(
  //         <div>
  //           <Accordion>
  //             <AccordionSummary
  //               expandIcon={<ExpandMoreRoundedIcon sx={{ color: "white" }} />}
  //               aria-controls="ProjectEvent-content"
  //               id="ProjectEvent-header"
  //               sx={{ bgcolor: theme.colors.primaryDark }}
  //             >
  //               <Typography
  //                 sx={{
  //                   width: "10%",
  //                   fontSize: 13,
  //                   color: "white",
  //                 }}
  //               >
  //                 Message
  //               </Typography>
  //               <Typography sx={{ fontSize: 13, color: "white" }}>
  //                 {event["message"]}
  //               </Typography>
  //             </AccordionSummary>
  //             <AccordionDetails sx={{ bgcolor: theme.colors.panelTit }}>
  //               <Typography
  //                 sx={{
  //                   fontSize: 13,
  //                   color: "white",
  //                   bgcolor: theme.colors.primary,
  //                 }}
  //               >
  //                 <table className="tb_data">
  //                   <tr>
  //                     <th>Kind</th>
  //                     <td>{event["kind"]}</td>
  //                     <th>Name</th>
  //                     <td>{event["name"]}</td>
  //                   </tr>
  //                   <tr>
  //                     <th>Namespace</th>
  //                     <td>{event["namespace"]}</td>
  //                     <th>Cluster</th>
  //                     <td>{event["cluster"]}</td>
  //                   </tr>
  //                   <tr>
  //                     <th>Reason</th>
  //                     <td>{event["reason"]}</td>
  //                     <th>Type</th>
  //                     <td>{event["type"]}</td>
  //                   </tr>
  //                   <tr>
  //                     <th>Event Time</th>
  //                     <td>{event["eventTime"]}</td>
  //                     <th></th>
  //                     <td></td>
  //                   </tr>
  //                 </table>
  //               </Typography>
  //             </AccordionDetails>
  //           </Accordion>
  //         </div>
  //       );
  //     });
  // }

  {
    events &&
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
  }

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
                <th>Name</th>
                <td>{jobDetailData.name}</td>
                <th>Cluster</th>
                <td>{jobDetailData.cluster}</td>
              </tr>
              <tr>
                <th>Project</th>
                <td>{jobDetailData.project}</td>
                <th>Status</th>
                <td>{jobDetailData.status}</td>
              </tr>
              <tr>
                <th>BackOffLimit</th>
                <td>{jobDetailData.backoffLimit}</td>
                <th>Completions</th>
                <td>{jobDetailData.completions}</td>
              </tr>
              <tr>
                <th>Created</th>
                <td>{moment(jobDetailData.created_at).format("YYYY-MM-DD")}</td>
                <th>Creator</th>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={1}>
        <div className="tb_container">
          <TableTitle>Pod List</TableTitle>
          <table className="tb_data">
            <tbody>
              <tr>{detailInvolvesPodListTable}</tr>
            </tbody>
          </table>
          <br />
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={2}>
        <div className="tb_container">
          <TableTitle>라벨</TableTitle>
          <table className="tb_data" style={{ tableLayout: "fixed" }}>
            <tbody>{labelTable}</tbody>
          </table>
          <br />
          <TableTitle>어노테이션</TableTitle>
          <table className="tb_data" style={{ tableLayout: "fixed" }}>
            <tbody>{annotationTable}</tbody>
          </table>
          <br />
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={3}>
        <div className="tb_container">
          <TableTitle>이벤트</TableTitle>
          <table className="tb_data">
            <tbody>{eventTable}</tbody>
          </table>
        </div>
      </CTabPanel>
    </PanelBox>
  );
});
export default Detail;

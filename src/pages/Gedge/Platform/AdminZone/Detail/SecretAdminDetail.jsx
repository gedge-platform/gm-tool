import React, { useState } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import { observer } from "mobx-react";
import { secretStore } from "@/store";
import styled from "styled-components";
import EventAccordion from "@/components/detail/EventAccordion";
import { dateFormatter } from "@/utils/common-utils";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { ExpandMoreRounded } from "@mui/icons-material";
import SeeMoreBtn from "../../../Configuration/SeeMoreBtn";

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

const EventsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 99%;
  margin: 8px 8px 8px 8px;
  padding: 12px 12px;
  border-radius: 4px;
  background-color: #2f3855;

  p {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const SecretAdminDetail = observer(() => {
  const { secretTabList, events, data, label, annotations } = secretStore;
  const secretTable = [];
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

  // const [isShowMore, setIsShowMore] = useState(false); // 더보기 열고 닫는 스위치
  // const textLimit = useRef(170); // 글자수 제한 선언
  // const commenter = useMemo(() => {
  //   // 조건에 따라 게시글을 보여주는 함수
  //   const shortReview = comment.slice(0, textLimit.current); // 원본에서 글자 수만큼 잘라서 짧은 버전 준비
  //   if (comment.length > textLimit.current) {
  //     // 원본이 길면
  //     if (isShowMore) {
  //       // 더보기가 true이면
  //       return comment; // 원본을 return
  //     }
  //     return shortReview; // 더보기가 false이면 짧은 버전을 리턴
  //   }
  //   return comment; //원본이 길지 않으면 comment를 return
  // }, [isShowMore]); // isShowMore의 상태가 바뀔 때마다 호출

  // const accordion = () => {
  //   {
  //     Object.entries(data).map(([keys, value]) => {
  //       secretTable.push(
  //         <div>
  //           <Accordion>
  //             <AccordionSummary
  //               expandIcon={
  //                 <ExpandMoreRounded
  //                   sx={{
  //                     backgroundColor: "#2f3855",
  //                     color: "rgba(255,255,255,0.7)",
  //                   }}
  //                 />
  //               }
  //               aria-controls="ProjectEvent-content"
  //               id="ProjectEvent-header"
  //               sx={{ backgroundColor: "#2f3855" }}
  //             >
  //               <Typography
  //                 sx={{
  //                   width: "15%",
  //                   fontSize: 13,
  //                   color: "rgba(255,255,255,0.7)",
  //                   backgroundColor: "#2f3855",
  //                 }}
  //               >
  //                 {keys}
  //               </Typography>

  //               <Typography
  //                 sx={{
  //                   fontSize: 13,
  //                   color: "rgba(255,255,255,0.7)",
  //                   backgroundColor: "#2f3855",
  //                 }}
  //               >
  //                 {value.length < 150 ? value : value.substr(0, 150)}
  //               </Typography>
  //             </AccordionSummary>
  //             <AccordionDetails sx={{ backgroundColor: "#2f3855" }}>
  //               <Typography
  //                 sx={{
  //                   fontSize: 13,
  //                   color: "rgba(255,255,255,0.7)",
  //                   backgroundColor: "#2f3855",
  //                 }}
  //               >
  //                 <table className="tb_data">
  //                   <tbody className="tb_data_detail">
  //                     <tr>
  //                       <td
  //                         style={{
  //                           wordBreak: "break-all",
  //                           wordWrap: "break-word",
  //                         }}
  //                       >
  //                         {value}
  //                       </td>
  //                     </tr>
  //                   </tbody>
  //                 </table>
  //               </Typography>
  //             </AccordionDetails>
  //           </Accordion>
  //         </div>
  //       );
  //     });
  //   }
  //   return secretTable;
  // };

  const dataAccordion = () => {
    data.length !== 0
      ? Object.entries(data).map(([keys, value]) => {
          secretTable.push(
            <SeeMoreBtn name={secretTabList.name} keys={keys} value={value} />
          );
        })
      : secretTable.push(
          <LabelContainer>
            <p>No Data Info</p>
          </LabelContainer>
        );
    return secretTable;
  };

  return (
    <PanelBox style={{ overflowY: "hidden" }}>
      <CTabs type="tab2" value={tabvalue} onChange={handleTabChange}>
        <CTab label="Overview" />
        <CTab label="Metadata" />
        <CTab label="Events" />
      </CTabs>
      <CTabPanel value={tabvalue} index={0}>
        <div className="tb_container">
          <table className="tb_data">
            <tbody>
              {secretTabList ? (
                secretTabList.length !== 0 ? (
                  <>
                    <tr>
                      <th style={{ width: "15%" }}>Name</th>
                      <td>{secretTabList.name ? secretTabList.name : "-"}</td>
                    </tr>
                    <tr>
                      <th>Type</th>
                      <td>{secretTabList.type ? secretTabList.type : "-"}</td>
                    </tr>
                    <tr>
                      <th>Created</th>
                      <td>
                        {secretTabList.createAt
                          ? dateFormatter(secretTabList.createAt)
                          : "-"}
                      </td>
                    </tr>
                  </>
                ) : (
                  <LabelContainer>
                    <p>No Detail Info</p>
                  </LabelContainer>
                )
              ) : (
                <LabelContainer>
                  <p>No Detail Info</p>
                </LabelContainer>
              )}
            </tbody>
          </table>
          <br />
          <TableTitle>Data</TableTitle>
          <table className="tb_data">
            <tbody>{dataAccordion()}</tbody>
          </table>
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={1}>
        <div className="tb_container">
          <TableTitle>Labels</TableTitle>
          <LabelContainer>
            {label ? (
              label.length !== 0 ? (
                Object.entries(label).map(([key, value]) => (
                  <Label>
                    <span className="key">{key}</span>
                    <span className="value">{value}</span>
                  </Label>
                ))
              ) : (
                <p>No Labels Info</p>
              )
            ) : (
              <p>No Labels Info</p>
            )}
          </LabelContainer>
          <br />

          <TableTitle>Annotations</TableTitle>
          {annotations ? (
            annotations.length !== 0 ? (
              <table className="tb_data" style={{ tableLayout: "fixed" }}>
                <tbody style={{ whiteSpace: "pre-line" }}>
                  {Object.entries(annotations).map(([key, value]) => (
                    <tr>
                      <th className="tb_workload_detail_labels_th">{key}</th>
                      <td style={{ whiteSpace: "pre-line" }}>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <LabelContainer>
                <p>No Annotations Info</p>
              </LabelContainer>
            )
          ) : (
            <LabelContainer>
              <p>No Annotations Info</p>
            </LabelContainer>
          )}
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={2}>
        <EventAccordion events={events} />
      </CTabPanel>
    </PanelBox>
  );
});
export default SecretAdminDetail;

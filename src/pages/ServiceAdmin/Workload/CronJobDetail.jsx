import React, { useState, useEffect } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import styled from "styled-components";
import moment from "moment";

const TableTitle = styled.p`
  font-size: 14px;
  font-weight: 500;
  margin: 8px 0;
  color: #fff;
`;

const Detail = (props) => {
  const { cronJob } = props;
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
    <PanelBox style={{ overflowY: "scroll" }}>
      <CTabs type="tab2" value={tabvalue} onChange={handleTabChange}>
        <CTab label="Overview" />
        <CTab label="Resources" />
        <CTab label="Metadata" />
        <CTab label="Events" />
      </CTabs>
      <CTabPanel value={tabvalue} index={0}>
        <div className="tb_container">
          <TableTitle>상세정보</TableTitle>
          <table className="tb_data">
            <tbody>
              <tr>
                <th>클러스터</th>
                <td></td>
                <th>프로젝트</th>
                <td></td>
              </tr>
              <tr>
                <th>앱</th>
                <td></td>
                <th>생성일</th>
                <td></td>
              </tr>
              <tr>
                <th>업데이트 날짜</th>
                <td></td>
                <th>생성자</th>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={1}>
        <div className="tb_container">
          <TableTitle>워크로드</TableTitle>
          <table className="tb_data">
            <tbody>
              <tr>
                <th>app</th>
                <td></td>
                <th>app.gedge-platform.io/name</th>
                <td></td>
                <th>app.Kubernates.io/version</th>
                <td></td>
              </tr>
            </tbody>
          </table>
          <br />
          <TableTitle>어노테이션</TableTitle>
          <table className="tb_data">
            <tbody>
              <tr>
                <th>gedge-platform.io/creator</th>
                <td></td>
              </tr>
              <tr>
                <th>gedge-platform.io/workloadType</th>
                <td></td>
              </tr>
              <tr>
                <th>text</th>
                <td></td>
              </tr>
            </tbody>
          </table>
          <br />
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={2}>
        <div className="tb_container">
          <TableTitle>라벨</TableTitle>
          <table className="tb_data">
            <tbody></tbody>
          </table>
          <br />
          <TableTitle>어노테이션</TableTitle>
          <table className="tb_data">
            <tbody></tbody>
          </table>
          <br />
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={3}>
        <div className="tb_container">
          <TableTitle>이벤트</TableTitle>
          <table className="tb_data">
            <tbody>
              <tr>
                <th>Events</th>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </CTabPanel>
    </PanelBox>
  );
};
export default Detail;

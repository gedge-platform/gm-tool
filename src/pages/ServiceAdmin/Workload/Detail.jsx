import React, { useState, useEffect } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import styled from "styled-components";

const TableTitle = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin: 8px 0;
`;

const Detail = (props) => {
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
        <CTab label="리소스 상태" />
        <CTab label="메타데이터" />
      </CTabs>
      <CTabPanel value={tabvalue} index={0}>
        <div className="tb_container">
          <table className="tb_data">
            <tbody>
              <tr>
                <th>디플로이먼트</th>
                <td></td>
                <th>파드</th>
                <td></td>
              </tr>
              <tr>
                <th>서비스</th>
                <td></td>
                <th>크론잡</th>
                <td></td>
              </tr>
              <tr>
                <th>잡</th>
                <td></td>
                <th>볼륨</th>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={1}>
        <div className="tb_container">
          <TableTitle>라벨</TableTitle>
          <table className="tb_data">
            <tbody>
              <tr>
                <th>key</th>
                <th>Value</th>
              </tr>
              <tr>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <TableTitle>어노테이션</TableTitle>
          <table className="tb_data">
            <tbody>
              <tr>
                <th>key</th>
                <th>Value</th>
              </tr>
              <tr>
                <td></td>
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

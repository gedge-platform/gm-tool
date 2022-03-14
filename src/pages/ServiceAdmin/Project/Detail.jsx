import React, { useState, useEffect } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import { observer } from "mobx-react";
import styled from "styled-components";
import moment from "moment";

const TableTitle = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin: 8px 0;
`;

const Detail = observer((props) => {
  const { project } = props;
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
        <CTab label="프로젝트 정보" />
        <CTab label="파드 정보" />
        <CTab label="게이트웨이 정보" />
        <CTab label="프로젝트 할당" />
      </CTabs>
      <CTabPanel value={tabvalue} index={0}>
        <div className="tb_container">
          <TableTitle>상세정보</TableTitle>
          <table className="tb_data">
            <tbody>
              <tr>
                <th>클러스터</th>
                <td>{project.clusterName}</td>
                <th>프로젝트</th>
                <td>{project.projectName}</td>
              </tr>
              <tr>
                <th>status</th>
                <td>{project.status}</td>
                <th>워크스페이스</th>
                <td>{project.workspaceName}</td>
              </tr>
              <tr>
                <th>생성자</th>
                <td>{project.projectCreator}</td>
                <th>생성일</th>
                <td>{moment(project.created_at).format("YYYY-MM-DD")}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={1}>
        <div className="tb_container">
          <TableTitle>파드</TableTitle>
          <table className="tb_data">
            <tbody>
              <tr>
                <th>파드</th>
                <td></td>
                <th>클러스터</th>
                <td></td>
              </tr>
              <tr>
                <th>파드 IP</th>
                <td></td>
                <th>워크스페이스</th>
                <td></td>
              </tr>
              <tr>
                <th>생성자</th>
                <td></td>
                <th>생성일</th>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={2}>
        <div className="tb_container">
          <TableTitle>인터넷 접근</TableTitle>
          <table className="tb_data">
            <tbody>
              <tr>
                <th>게이트웨이</th>
                <td></td>
                <th>서브넷</th>
                <td></td>
              </tr>
              <tr>
                <th>상태</th>
                <td></td>
                <th>네트워크</th>
                <td></td>
              </tr>
              <tr>
                <th>생성일</th>
                <td></td>
                <th>설명</th>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={3}>
        <div className="tb_container">
          <TableTitle>컨테이너 기본 리소스</TableTitle>
          <table className="tb_data">
            <tbody>
              <tr>
                <th>파드</th>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <br />
          <TableTitle>리소스 할당량</TableTitle>
          <table className="tb_data">
            <tbody>
              <tr>
                <th>Limits.cpu</th>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th>Limits.memory</th>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th>Pods</th>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th>services</th>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <br />
        </div>
      </CTabPanel>
    </PanelBox>
  );
});
export default Detail;

/*
    <PanelBox>
      <CTabs type="tab2" value={tabvalue} onChange={handleTabChange}>
        <CTab label="상세정보" />
        <CTab label="노드 정보" />
        <CTab label="채널 정보" />
      </CTabs>
      <div className="tabPanelContainer">
        <CTabPanel value={tabvalue} index={0}>
          <div className="tb_container">
            <table className="tb_data">
              <tbody>
                <tr>
                  <th>네트워크 이름</th>
                  <td>OOO 조회</td>
                  <th>조직ID</th>
                  <td>JSON</td>
                </tr>
                <tr>
                  <th>Import 여부</th>
                  <td colSpan={1}>N</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="tb_container">
            <table className="tb_data">
              <tbody>
                <tr>
                  <th>Node Type</th>
                  <th>Node 이름</th>
                  <th>상태</th>
                </tr>
                <tr>
                  <td>CA</td>
                  <td>block-ca</td>
                  <td>운영 중</td>
                </tr>
                <tr>
                  <td>Peer(Endorser)</td>
                  <td>block-peer1(Committer)</td>
                  <td>운영 중</td>
                </tr>
                <tr>
                  <td>Peer</td>
                  <td>block-peer2</td>
                  <td>운영 중</td>
                </tr>
                <tr>
                  <td>Peer</td>
                  <td>block-peer3</td>
                  <td>운영 중</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="tb_container">
            <table className="tb_data">
              <tbody>
                <tr>
                  <th>조직 이름</th>
                  <th>채널 이름</th>
                </tr>
                <tr>
                  <td>block-orderer</td>
                  <td>my-block-channel-1</td>
                </tr>
                <tr>
                  <td>block-orderer</td>
                  <td>my-block-channel-2</td>
                </tr>
                <tr>
                  <td>block-orderer</td>
                  <td>my-block-channel-3</td>
                </tr>
                <tr>
                  <td>block-orderer</td>
                  <td>my-block-channel-4</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CTabPanel>
        <CTabPanel value={tabvalue} index={1}>
          <div className="panelCont">
            <div className="grid-height">
              <table className="tb_data">
                <tbody>
                  <tr>
                    <th>Node Type</th>
                    <th>Node 이름</th>
                    <th>상태</th>
                  </tr>
                  <tr>
                    <td>CA</td>
                    <td>block-ca</td>
                    <td>운영 중</td>
                  </tr>
                  <tr>
                    <td>Peer(Endorser)</td>
                    <td>block-peer1(Committer)</td>
                    <td>운영 중</td>
                  </tr>
                  <tr>
                    <td>Peer</td>
                    <td>block-peer2</td>
                    <td>운영 중</td>
                  </tr>
                  <tr>
                    <td>Peer</td>
                    <td>block-peer3</td>
                    <td>운영 중</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CTabPanel>
        <CTabPanel value={tabvalue} index={2}>
          <div className="panelCont">
            <div className="grid-height">
              <table className="tb_data">
                <tbody>
                  <tr>
                    <th>조직 이름</th>
                    <th>채널 이름</th>
                  </tr>
                  <tr>
                    <td>block-orderer</td>
                    <td>my-block-channel-1</td>
                  </tr>
                  <tr>
                    <td>block-orderer</td>
                    <td>my-block-channel-2</td>
                  </tr>
                  <tr>
                    <td>block-orderer</td>
                    <td>my-block-channel-3</td>
                  </tr>
                  <tr>
                    <td>block-orderer</td>
                    <td>my-block-channel-4</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CTabPanel>
      </div>
    </PanelBox>
*/

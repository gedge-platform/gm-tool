import React, { useEffect, useState } from "react";
import Layout from "@/layout";
import { Title, SubTitle } from "@/pages";
import { PanelBox } from "@/components/styles/PanelBox";
import { AgGrid } from "@/components/datagrids";
import styled from "styled-components";

import { CSelectButton } from "@/components/buttons";
import moment from "moment";
import { observer } from "mobx-react";
import CommActionBar from "@/components/common/CommActionBar";

const DashboardWrap = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  margin-bottom: 12px;
  .panel_graph {
    width: 50%;
  }
  .panel_service {
    width: 100%;
  }
  .panel_list {
    flex-grow: 1;
  }
  .panel_dashboard {
    width: 100%;
    margin: 12px 12px 0 0;
    &:first-child {
      margin-top: 0;
    }
    .panelCont {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
  .slash {
    position: relative;
    display: inline-block;
    width: 20px;
    padding: 0 5px;
    font-weight: 300;
    font-size: 10px;
    color: transparent;
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: -4px;
      width: 29px;
      border-top: 1px solid #b7b7b7;
      transform: rotate(-70deg);
    }
  }
  .vm_01 {
    color: #1d90ff;
  }
  .vm_02 {
    color: #00b91a;
  }
  .vm_03 {
    color: #ff5a00;
  }
`;

const TotalDashboard = observer(() => {
  const currentPageTitle = Title.Dashboard;

  const [channel, setChannel] = useState("");

  const [columnDefs] = useState([
    {
      headerName: "네트워크 이름",
      field: "name",
      filter: false,
      sortable: false,
    },
    {
      headerName: "블록체인 버전",
      field: "version",
      filter: false,
      sortable: false,
    },
    {
      headerName: "Organization",
      field: "organization",
      filter: false,
      sortable: false,
    },
    {
      headerName: "Channel",
      field: "channel",
      filter: false,
      sortable: false,
    },
    {
      headerName: "Orderer",
      field: "orderer",
      filter: false,
      sortable: false,
    },
    {
      headerName: "Peer",
      field: "peer",
      filter: false,
      sortable: false,
    },
    {
      headerName: "생성 일시",
      field: "created_at",
      filter: false,
      sortable: false,
      cellRenderer: (date) => {
        return `<span>${moment(new Date(date.value)).format(
          "YYYY-MM-DD HH:mm"
        )}</span>`;
      },
    },
    {
      headerName: "상태",
      field: "state",
      filter: false,
      sortable: false,
      cellRenderer: function (state) {
        if (state.data.state == "1") {
          return `<span class="state_ico state_02">운영중</span>`;
        }
        return `<span class="state_ico state_04">삭제중</span>`;
      },
    },
  ]);

  //테이블 관련
  const totalElements = [].length;
  const rowPerPage = 10;
  const totalPages = 1;
  const [currentTablePage, setCurrentTablePage] = React.useState(1);

  const goPrevPage = () => {
    if (currentTablePage > 1) {
      setCurrentTablePage(currentTablePage - 1);
    }
    console.log("이전 페이지");
  };

  const goNextPage = () => {
    if (currentTablePage < totalPages) {
      setCurrentTablePage(currentTablePage + 1);
    }
    console.log("다음 페이지");
  };

  const actionList = [].map((net) => {
    return {
      name: net.name,
      onClick: () => {},
    };
  });

  const actionList2 = [
    {
      name: "my-channel-1",
      onClick: () => {
        // setNetwork("my-channel-1");
      },
    },
    {
      name: "my-channel-2",
      onClick: () => {
        // setNetwork("my-channel-2");
      },
    },
  ];

  useEffect(() => {}, []);

  return (
    <Layout currentPageTitle={currentPageTitle}>
      <DashboardWrap>
        <div className="panel_column">
          <PanelBox
            className="panel_dashboard"
            style={{ marginBottom: "10px" }}
          >
            <div className="panelTitBar panelTitBar_clear">
              <div className="tit">
                <span style={{ marginRight: "10px" }}>
                  블록체인 정보 서비스
                </span>
                <CSelectButton className="none_transform" items={actionList}>
                  네트워크 선택
                </CSelectButton>
              </div>
              <div className="date">
                {moment(new Date()).format("YYYY-MM-DD HH:mm")}
              </div>
            </div>
            <div className="panelCont"></div>
          </PanelBox>
          <CSelectButton className="none_transform" items={actionList2}>
            {channel === "" ? "채널 선택" : channel}
          </CSelectButton>

          <PanelBox className="panel_dashboard">
            <div className="panelTitBar panelTitBar_clear">
              <div className="tit">블록체인 정보 서비스 모니터링</div>
              <div className="date">
                {moment(Date()).format("YYYY-MM-DD HH:mm")}
              </div>
            </div>
            <div
              className="panelCont"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <div style={{ width: "45%" }}></div>
              <div style={{ width: "45%" }}></div>
            </div>
          </PanelBox>
        </div>

        <PanelBox className="panel_graph" style={{ height: "800px" }}>
          <div className="panelTitBar panelTitBar_clear">
            <div className="tit">클러스터 정보</div>
            <div className="date">
              {moment(new Date()).format("YYYY-MM-DD HH:mm")}
            </div>
          </div>
          <div className="panelCont"></div>
        </PanelBox>
      </DashboardWrap>

      <DashboardWrap>
        <PanelBox className="panel_list">
          <div className="panelTitBar panelTitBar_clear">
            <div
              className="tit"
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
              <span>블록체인 네트워크</span>
              <CommActionBar />
            </div>
            {/* <div className="date">
              <CButton type="btn2">더보기</CButton>
            </div> */}
          </div>
          <div className="grid-height_10">
            <AgGrid
              rowData={[]}
              columnDefs={columnDefs}
              totalElements={totalElements}
              totalPages={totalPages}
              currentPage={currentTablePage}
              goPrevPage={goPrevPage}
              goNextPage={goNextPage}
              rowPerPage={rowPerPage}
            />
          </div>
        </PanelBox>
      </DashboardWrap>
    </Layout>
  );
});
export default TotalDashboard;

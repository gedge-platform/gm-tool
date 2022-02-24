import React from "react";
import { Doughnut } from "react-chartjs-2";
import styled from "styled-components";
import {
  LineChart,
  Line,
  AreaChart,
  linearGradient,
  defs,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  Legend,
  ResponsiveContainer,
} from "recharts";
// import LineCharts from "./LineCharts";
import Chart from "react-apexcharts";
import dashboardStore from "../../../Store/DashboardStore";
import { observer } from "mobx-react";

const GraphContainer = styled.article`
  position: relative;
  width: 33%;
`;

// const DashboardCont = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

const TextContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 47%;
  transform: translate(-50%, -50%);

  p:first-child {
    white-space: nowrap;
    font-weight: 600;
    font-size: 1.275rem;
    line-height: 24px;
    text-align: center;
    letter-spacing: -0.5px;
    color: #000000;
  }

  p:last-child {
    white-space: nowrap;
    font-size: 1.075rem;
    line-height: 24px;
    text-align: center;
    letter-spacing: -0.5px;
    color: #000000;
  }
`;

const ServiceInfo = observer(() => {
  const { selectNetwork } = dashboardStore;
  const pieOptions1 = {
    legend: {
      show: false,
    },
    labels: ["사용 중", "사용 가능"],
    fill: {
      colors: ["#008FFB", "rgba(50, 64, 145, 0.1)"],
    },
    dataLabels: {
      enabled: false,
    },
  };

  const pieOptions2 = {
    legend: {
      show: false,
    },
    labels: ["사용 중", "사용 가능"],
    fill: {
      colors: ["#00E396", "rgba(50, 64, 145, 0.1)"],
    },
    dataLabels: {
      enabled: false,
    },
  };

  const pieOptions3 = {
    legend: {
      show: false,
    },
    labels: ["사용 중", "사용 가능"],
    fill: {
      colors: ["#118BBB", "rgba(50, 64, 145, 0.1)"],
    },
    dataLabels: {
      enabled: false,
    },
  };

  const networkSeries = dashboardStore.network;
  const userSeries = dashboardStore.users;
  const contractSeries = dashboardStore.contracts;

  return (
    <div
      style={{
        height: "300px",
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        alignItems: "center",
        padding: "10px 10px",
      }}
    >
      <div
        style={{
          width: "40%",
          height: "40%",
          border: "1px solid black",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          paddingLeft: "20px",
        }}
      >
        <p style={{ fontWeight: "bold", fontSize: "18px" }}>Organizations</p>
        <p style={{ fontWeight: "normal", fontSize: "30px" }}>
          {selectNetwork?.organization ? selectNetwork?.organization : 0}
        </p>
      </div>
      <div
        style={{
          width: "40%",
          height: "40%",
          border: "1px solid black",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          paddingLeft: "20px",
        }}
      >
        <p style={{ fontWeight: "bold", fontSize: "18px" }}>Orderers</p>
        <p style={{ fontWeight: "normal", fontSize: "30px" }}>
          {selectNetwork?.orderer ? selectNetwork?.orderer : 0}
        </p>
      </div>
      <div
        style={{
          width: "40%",
          height: "40%",
          border: "1px solid black",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          paddingLeft: "20px",
        }}
      >
        <p style={{ fontWeight: "bold", fontSize: "18px" }}>Peers</p>
        <p style={{ fontWeight: "normal", fontSize: "30px" }}>
          {selectNetwork?.peer ? selectNetwork?.peer : 0}
        </p>
      </div>
      <div
        style={{
          width: "40%",
          height: "40%",
          border: "1px solid black",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          paddingLeft: "20px",
        }}
      >
        <p style={{ fontWeight: "bold", fontSize: "18px" }}>Channels</p>
        <p style={{ fontWeight: "normal", fontSize: "30px" }}>
          {selectNetwork?.channel ? selectNetwork?.channel : 0}
        </p>
      </div>
      {/* <table className="tb_data">
        <tbody>
          <tr>
            <th>Organizations</th>
            <td>2</td>
            <th>Orderers</th>
            <td>1</td>
          </tr>
          <tr>
            <th>Peers</th>
            <td>1</td>
            <th>Channels</th>
            <td>1</td>
          </tr>
        </tbody>
      </table>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          paddingTop: "20px",
        }}
      >
        <GraphContainer>
          <Chart
            options={pieOptions1}
            series={networkSeries}
            type="donut"
            width="270"
          />
          ️
          <TextContainer>
            <p>Networks</p>
            <p>10/10</p>
          </TextContainer>
        </GraphContainer>
        <GraphContainer>
          <Chart
            options={pieOptions2}
            series={userSeries}
            type="donut"
            width="270"
          />
          ️
          <TextContainer>
            <p>Users</p>
            <p>29/29</p>
          </TextContainer>
        </GraphContainer>
        <GraphContainer>
          <Chart
            options={pieOptions3}
            series={contractSeries}
            type="donut"
            width="270"
          />
          ️
          <TextContainer>
            <p>Contracts</p>
            <p>29/29</p>
          </TextContainer>
        </GraphContainer>
      </div> */}
    </div>
  );
});

export default ServiceInfo;

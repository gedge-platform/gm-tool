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

const ServiceGraph = observer((props) => {
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

  const graphseries = [
    {
      name: props.name,
      data: dashboardStore.networkData,
    },
  ];

  const graphoptions = {
    chart: {
      width: "100%",
      zoom: {
        enabled: false,
      },
      events: {
        mounted: (chart) => {
          chart.windowResizeHandler();
        },
      },
      toolbar: {
        show: false,
      },
    },
    colors: ["#008FFB", "#00E396", "#118BBB"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 0.5,
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.2,
        opacityTo: 0.5,
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
    },
    xaxis: {
      categories: [0, 12, 24],
    },
  };

  return (
    <div style={{ paddingTop: "20px" }}>
      <span style={{ paddingLeft: "20px", fontSize: "15px" }}>
        {props.name}
      </span>
      <Chart
        options={graphoptions}
        series={graphseries}
        type="area"
        height={300}
      />
    </div>
  );
});

export default ServiceGraph;

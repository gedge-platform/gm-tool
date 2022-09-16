import { display, padding } from "@mui/system";
import React, { useState, useEffect, PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { observer } from "mobx-react";
import ApexCharts from "apexcharts";

import { unixToTime } from "../../Gedge/Monitoring/Utils/MetricsVariableFormatter";
import serviceAdminDashboardStore from "../../../store/ServiceAdminDashboard";

const ServiceAdminChart = observer(() => {
  const { loadProjectName, deploymentMetrics, podMetrics, allMetrics } =
    serviceAdminDashboardStore;

  let deployMetricsTable = [];
  let podMetricsTemp = [];

  deploymentMetrics.map((element) => {
    const tempMetrics = {
      time: unixToTime(element[0]),
      deployment: element[1],
      pod: podMetrics.map((pod, i) => pod[1][i]),
    };
    deployMetricsTable.push(tempMetrics);
  });

  const test = () => {
    podMetrics.map((element) => element[1]);
  };

  // podMetrics.map((element) => {
  //   const tempMetrics1 = {
  //     pod: element[1],
  //   };
  //   podMetricsTemp.push(tempMetrics1);
  // });

  console.log(deployMetricsTable);

  useEffect(() => {
    loadProjectName();
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        style={{
          paddingLeft: "20px",
          paddingTop: "10px",
          // color: "#929da5",
          color: "darkgray",
          fontWeight: "bold",
        }}
      ></div>
      <ResponsiveContainer>
        <LineChart
          data={deployMetricsTable}
          // 그래프 크기 조절
          margin={{
            top: 5,
            right: 20,
            left: -35,
            bottom: 5,
          }}
        >
          <CartesianGrid
            strokeWidth={0.3}
            vertical={false}
            strokeDasharray="2 2"
          />
          <XAxis dataKey="time" />
          <YAxis dataKey="value" domain={[0, 50]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="deployment"
            stroke="#FF5A5A"
            strokeDasharray="3 3"
            activeDot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
});

export default ServiceAdminChart;

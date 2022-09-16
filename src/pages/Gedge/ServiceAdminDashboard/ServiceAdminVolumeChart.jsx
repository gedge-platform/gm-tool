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
import { unixToTime } from "../../Gedge/Monitoring/Utils/MetricsVariableFormatter";
import serviceAdminDashboardStore from "../../../store/ServiceAdminDashboard";

const ServiceAdminVolumeChart = observer(() => {
  const { loadProjectName, volumeMetrics } = serviceAdminDashboardStore;

  let volumeMetricsArr = [];

  volumeMetrics.map((element) => {
    const tempMetrics = {
      time: unixToTime(element[0]),
      volume: element[1],
    };
    volumeMetricsArr.push(tempMetrics);
  });

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
          data={volumeMetricsArr}
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
            strokeDasharray="3 3"
          />
          <XAxis dataKey="time" />
          <YAxis dataKey="value" domain={[0, 50]} />
          <Tooltip />
          <Line
            type=""
            dataKey="volume"
            stroke="#2F9D27"
            strokeDasharray="5 5"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
});

export default ServiceAdminVolumeChart;

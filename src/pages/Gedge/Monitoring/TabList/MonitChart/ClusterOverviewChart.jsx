import { padding } from "@mui/system";
import React, { useState, useEffect, PureComponent } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { PieChart, Pie, Sector, Cell } from "recharts";
import monitoringStore from "../../../../../store/Monitoring";

// import monitoringStore from "../../../../store/Monitoring";
// import {
//     stepConverter,
//     unixCurrentTime,
//     unixStartTime,
//     combinationMetrics,
// } from "../Utils/MetricsVariableFormatter";

// import { ClusterMetricTypes, TargetTypes } from "../Utils/MetricsVariables";

const ChartCpuUsage = () => {
    const { clusterMetrics } = monitoringStore;

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <div
                style={{
                    paddingLeft: "20px",
                    paddingTop: "20px",
                    color: "#929da5",
                    fontWeight: "bold",
                }}
            >
                Cpu Util (%)
            </div>
            <ResponsiveContainer>
                <AreaChart
                    data={clusterMetrics[0]?.metrics}
                    margin={{
                        top: 20,
                        right: 30,
                        left: -15,
                        bottom: 30,
                    }}
                >
                    <CartesianGrid
                        // horizontalPoints="3 3"
                        strokeWidth={0.3}
                        vertical={false}
                        strokeDasharray="3 5"
                    />
                    <XAxis
                        interval={clusterMetrics[0]?.metrics.length / 11}
                        tickLine="false"
                        dataKey="time"
                    />
                    <YAxis />
                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#007EFF"
                        fill="#0080ff30"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

const ChartPie = () => {
    const data = [
        { name: "Group A", value: 400 },
        { name: "Group B", value: 300 },
    ];

    const COLORS = ["#4DA5FF", " #FFFFFF"];

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        startAngle={-180}
                        innerRadius={20}
                        outerRadius={30}
                        strokeWidth={0}
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

const ChartPie2 = () => {
    const data = [
        { name: "Group A", value: 400 },
        { name: "Group B", value: 300 },
    ];

    const COLORS = ["#2E374E", "#777D8B"];

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        startAngle={-180}
                        innerRadius={20}
                        outerRadius={30}
                        strokeWidth={0}
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};
export { ChartCpuUsage, ChartPie, ChartPie2 };

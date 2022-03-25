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

// import monitoringStore from "../../../../store/Monitoring";
// import {
//     stepConverter,
//     unixCurrentTime,
//     unixStartTime,
//     combinationMetrics,
// } from "../Utils/MetricsVariableFormatter";

// import { ClusterMetricTypes, TargetTypes } from "../Utils/MetricsVariables";

const ChartCpuUsage = () => {
    const data = [
        {
            name: "Page A",
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: "Page B",
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: "Page C",
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: "Page D",
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: "Page E",
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: "Page F",
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: "Page G",
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <ResponsiveContainer>
                <AreaChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid
                        // horizontalPoints="3 3"
                        strokeWidth={0.3}
                        vertical={false}
                        strokeDasharray="3 5"
                    />
                    <XAxis tickLine="false" dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey="uv"
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
        { name: "Group C", value: 300 },
        { name: "Group D", value: 200 },
    ];

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <PieChart>
                <Pie
                    data={data}
                    cx={120}
                    cy={200}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
                <Pie
                    data={data}
                    cx={420}
                    cy={200}
                    startAngle={180}
                    endAngle={0}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
            </PieChart>
        </div>
    );
};
export { ChartCpuUsage, ChartPie };

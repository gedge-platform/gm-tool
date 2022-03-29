import { display, padding } from "@mui/system";
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

const COAreaChart = ({ chartValue }) => {
    const { coPieCPU, coPieMemory, coPieDisk, coPiePod } = monitoringStore;
    let title = "";
    let metrics = [];

    switch (chartValue) {
        case "CPU":
            title = "CPU Util(%)";
            metrics = coPieCPU[2]?.metrics;
            break;
        case "MEMORY":
            title = "Memory Util(%)";
            metrics = coPieMemory[2]?.metrics;
            break;
        case "DISK":
            title = "Disk Util(%)";
            metrics = coPieDisk[2]?.metrics;
            break;
        case "POD":
            title = "Pods";
            metrics = coPiePod[2]?.metrics;
            break;

        default:
            break;
    }
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
                {title}
            </div>
            <ResponsiveContainer>
                <AreaChart
                    data={metrics}
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
                    <XAxis interval={5} tickLine="false" dataKey="time" />
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

const COPieChartCPU = ({ isOn }) => {
    const { coPieCPU } = monitoringStore;

    const data = [
        {
            value:
                Number(
                    coPieCPU[0]?.metrics[coPieCPU[0]?.metrics.length - 1].value
                ) -
                Number(
                    coPieCPU[1]?.metrics[coPieCPU[1]?.metrics.length - 1].value
                ),
        },
        {
            value: Number(
                coPieCPU[1]?.metrics[coPieCPU[1]?.metrics.length - 1].value
            ),
        },
    ];

    const COLORS = isOn ? ["#4DA5FF", " #FFFFFF"] : ["#2E374E", "#777D8B"];

    return (
        <div
            style={{ width: "100%", height: "100%" }}
            className="pointer_container"
        >
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

const COPieChartMemory = ({ isOn }) => {
    const { coPieMemory } = monitoringStore;

    const data = [
        {
            value:
                Number(
                    coPieMemory[0]?.metrics[coPieMemory[0]?.metrics.length - 1]
                        .value
                ) -
                Number(
                    coPieMemory[1]?.metrics[coPieMemory[1]?.metrics.length - 1]
                        .value
                ),
        },
        {
            value: Number(
                coPieMemory[1]?.metrics[coPieMemory[1]?.metrics.length - 1]
                    .value
            ),
        },
    ];

    const COLORS = isOn ? ["#4DA5FF", " #FFFFFF"] : ["#2E374E", "#777D8B"];

    return (
        <div
            style={{ width: "100%", height: "100%" }}
            className="pointer_container"
        >
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

const COPieChartDisk = ({ isOn }) => {
    const { coPieDisk } = monitoringStore;

    const data = [
        {
            value:
                Number(
                    coPieDisk[0]?.metrics[coPieDisk[0]?.metrics.length - 1]
                        .value
                ) -
                Number(
                    coPieDisk[1]?.metrics[coPieDisk[1]?.metrics.length - 1]
                        .value
                ),
        },
        {
            value: Number(
                coPieDisk[1]?.metrics[coPieDisk[1]?.metrics.length - 1].value
            ),
        },
    ];

    const COLORS = isOn ? ["#4DA5FF", " #FFFFFF"] : ["#2E374E", "#777D8B"];

    return (
        <div
            style={{ width: "100%", height: "100%" }}
            className="pointer_container"
        >
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

const COPieChartPod = ({ isOn }) => {
    const { coPiePod } = monitoringStore;

    const data = [
        {
            value:
                Number(
                    coPiePod[0]?.metrics[coPiePod[0]?.metrics.length - 1].value
                ) -
                Number(
                    coPiePod[1]?.metrics[coPiePod[1]?.metrics.length - 1].value
                ),
        },
        {
            value: Number(
                coPiePod[1]?.metrics[coPiePod[1]?.metrics.length - 1].value
            ),
        },
    ];

    const COLORS = isOn ? ["#4DA5FF", " #FFFFFF"] : ["#2E374E", "#777D8B"];

    return (
        <div
            style={{ width: "100%", height: "100%" }}
            className="pointer_container"
        >
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

export {
    COAreaChart,
    COPieChartCPU,
    COPieChartMemory,
    COPieChartDisk,
    COPieChartPod,
};

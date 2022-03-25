import React, { useState, useEffect, PureComponent } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import { PanelBoxM } from "@/components/styles/PanelBoxM";
import CommActionBar from "@/components/common/CommActionBar";
import { AgGrid } from "@/components/datagrids";
import { agDateColumnFilter } from "@/utils/common-utils";
import { CReflexBox } from "@/layout/Common/CReflexBox";
import { ChartCpuUsage, ChartPie } from "./MonitChart/ClusterOverviewChart";
import {
    CCreateButton,
    CSelectButton,
    CSelectButtonM,
    BtnCellRenderer,
} from "@/components/buttons";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import { useHistory } from "react-router";
import { observer } from "mobx-react";
import moment from "moment";
import axios from "axios";
import styled from "styled-components";
import monitoringStore from "../../../../store/Monitoring";
import {
    stepConverter,
    unixCurrentTime,
    unixStartTime,
    combinationMetrics,
} from "../Utils/MetricsVariableFormatter";

import { ClusterMetricTypes, TargetTypes } from "../Utils/MetricsVariables";

const ClusterOverview = observer(() => {
    const [tabvalue, setTabvalue] = useState(0);
    const [open, setOpen] = useState(false);
    const [clusterName, setClusterName] = useState("");
    const handleTabChange = (event, newValue) => {
        setTabvalue(newValue);
    };

    const { clusterNames, clusterMetrics, loadClusterNames, loadMetrics } =
        monitoringStore;

    const clusterNameActionList = clusterNames.map((item) => {
        return {
            name: item,
            onClick: () => {
                setClusterName(item);
            },
        };
    });

    useEffect(() => {
        loadClusterNames();
    }, []);

    return (
        <PanelBoxM>
            <div className="panelTitBar panelTitBar_clear">
                <div className="tit">
                    <span style={{ marginRight: "10px", color: "white " }}>
                        Select Cluster
                    </span>
                    <CSelectButtonM
                        className="none_transform"
                        items={clusterNameActionList}
                    >
                        {clusterName === "" ? clusterNames[0] : clusterName}
                    </CSelectButtonM>
                </div>
                <div className="date">
                    {moment(new Date()).format("YYYY-MM-DD HH:mm")}
                </div>
            </div>
            <PanelBox
                className="panel_graph"
                style={{ height: "453px", margin: "5px 0 5px 0" }}
            >
                <div className="panelTitBar panelTitBar_clear">
                    <div className="tit" style={{ color: "white " }}>
                        Cluster Resource Usage
                    </div>
                </div>
                <div
                    // Panels Area
                    style={{
                        display: "flex",
                        height: "400px",
                        justifyContent: "space-around",
                        alignItems: "center",
                    }}
                >
                    <div
                        // Buttons Area
                        style={{
                            width: "300px",
                            height: "375px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-around",
                            alignItems: "center",
                        }}
                    >
                        <div
                            // Button Area
                            style={{
                                width: "300px",
                                height: "87px",
                                display: "flex",
                                borderRadius: "5px",
                                backgroundColor: "#007EFF",
                                color: "white",
                                display: "flex",
                                justifyContent: "space-around",
                            }}
                        >
                            <div
                                // Circle Graph Area
                                style={{
                                    width: "49%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                PieCHart
                            </div>
                            <div
                                // Text/Value Area
                                style={{ width: "49%" }}
                            >
                                <div
                                    style={{
                                        width: "100%",
                                        height: "65%",
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                        fontSize: "14px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    CPU(Core)
                                </div>
                                <div
                                    style={{
                                        width: "100%",
                                        height: "0%",
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                    }}
                                >
                                    <p
                                        style={{
                                            fontSize: "20px",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        1.61
                                        <span style={{ fontSize: "14px" }}>
                                            /4
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div
                            // Button Area
                            style={{
                                width: "300px",
                                height: "87px",
                                display: "flex",
                                borderRadius: "5px",
                                backgroundColor: "#1C263E",
                                color: "#929da5",
                                display: "flex",
                                justifyContent: "space-around",
                            }}
                        >
                            <div
                                // Circle Graph Area
                                style={{
                                    width: "49%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                PieCHart
                            </div>
                            <div
                                // Text/Value Area
                                style={{ width: "49%" }}
                            >
                                <div
                                    style={{
                                        width: "100%",
                                        height: "50%",
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                        fontSize: "14px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    CPU Core
                                </div>
                                <div
                                    style={{
                                        width: "100%",
                                        height: "50%",
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                    }}
                                >
                                    <span>1.61</span>
                                    <span>/4</span>
                                </div>
                            </div>
                        </div>
                        <div
                            // Button Area
                            style={{
                                width: "300px",
                                height: "87px",
                                display: "flex",
                                borderRadius: "5px",
                                backgroundColor: "#1C263E",
                                color: "#929da5",
                                display: "flex",
                                justifyContent: "space-around",
                            }}
                        >
                            <div
                                // Circle Graph Area
                                style={{
                                    width: "49%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                PieCHart
                            </div>
                            <div
                                // Text/Value Area
                                style={{ width: "49%" }}
                            >
                                <div
                                    style={{
                                        width: "100%",
                                        height: "50%",
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                        fontSize: "14px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    CPU Core
                                </div>
                                <div
                                    style={{
                                        width: "100%",
                                        height: "50%",
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                    }}
                                >
                                    <span>1.61</span>
                                    <span>/4</span>
                                </div>
                            </div>
                        </div>
                        <div
                            // Button Area
                            style={{
                                width: "300px",
                                height: "87px",
                                display: "flex",
                                borderRadius: "5px",
                                backgroundColor: "#1C263E",
                                color: "#929da5",
                                display: "flex",
                                justifyContent: "space-around",
                            }}
                        >
                            <div
                                // Circle Graph Area
                                style={{
                                    width: "49%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                PieCHart
                            </div>
                            <div
                                // Text/Value Area
                                style={{ width: "49%" }}
                            >
                                <div
                                    style={{
                                        width: "100%",
                                        height: "50%",
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                        fontSize: "14px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    CPU Core
                                </div>
                                <div
                                    style={{
                                        width: "100%",
                                        height: "50%",
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                    }}
                                >
                                    <span>1.61</span>
                                    <span>/4</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        style={{
                            width: "1350px",
                            height: "375px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <div
                            style={{
                                width: "1340px",
                                height: "370px",
                                backgroundColor: "#141A30",
                            }}
                        >
                            <ChartCpuUsage />
                        </div>
                    </div>
                </div>
            </PanelBox>

            {/* <PanelBox className="panel_graph" style={{ height: "453px" }}>
                <div className="panelTitBar panelTitBar_clear">
                    <div className="tit" style={{ color: "white " }}>
                        Service Component Monitoring
                    </div>
                </div>
                <div className="panelCont"></div>
            </PanelBox> */}
        </PanelBoxM>
    );
});
export default ClusterOverview;

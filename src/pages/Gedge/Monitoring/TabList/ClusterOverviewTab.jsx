import React, { useState, useEffect, PureComponent } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import { PanelBoxM } from "@/components/styles/PanelBoxM";
import CommActionBar from "@/components/common/CommActionBar";
import { AgGrid } from "@/components/datagrids";
import { agDateColumnFilter } from "@/utils/common-utils";
import { CReflexBox } from "@/layout/Common/CReflexBox";
import { COAreaChart, COPieChart } from "./MonitChart/ClusterOverviewChart";
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
import {
    COButtonCPU,
    COButtonMemory,
    COButtonPod,
    COButtonDisk,
} from "./ClusterOverviewComponent/COButton";

const ClusterOverview = observer(() => {
    const [open1, setOpen1] = useState(true);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
    const [chartValue, setChartValue] = useState("CPU");
    const [tabvalue, setTabvalue] = useState(0);
    const [open, setOpen] = useState(false);
    // const [clusterName, setClusterName] = useState("");
    const handleTabChange = (event, newValue) => {
        setTabvalue(newValue);
    };

    const {
        clusterName,
        clusterNames,
        loadClusterNames,
        loadCoCPU,
        loadCoMemory,
        loadCoDisk,
        loadCoPod,
        setClusterName,
    } = monitoringStore;

    const changedState = (index) => {
        switch (index) {
            case 1:
                setOpen1(true);
                setOpen2(false);
                setOpen3(false);
                setOpen4(false);
                loadCoCPU(
                    TargetTypes.CLUSTER,
                    unixStartTime(60 * 6),
                    unixCurrentTime(),
                    stepConverter(5),
                    clusterName,
                    combinationMetrics(
                        ClusterMetricTypes.CPU_TOTAL,
                        ClusterMetricTypes.CPU_USAGE,
                        ClusterMetricTypes.CPU_UTIL
                    )
                );
                setChartValue("CPU");
                break;
            case 2:
                setOpen1(false);
                setOpen2(true);
                setOpen3(false);
                setOpen4(false);
                loadCoMemory(
                    TargetTypes.CLUSTER,
                    unixStartTime(60 * 6),
                    unixCurrentTime(),
                    stepConverter(5),
                    clusterName,
                    combinationMetrics(
                        ClusterMetricTypes.MEMORY_TOTAL,
                        ClusterMetricTypes.MEMORY_USAGE,
                        ClusterMetricTypes.MEMORY_UTIL
                    )
                );
                setChartValue("MEMORY");
                break;
            case 3:
                setOpen1(false);
                setOpen2(false);
                setOpen3(true);
                setOpen4(false);
                loadCoDisk(
                    TargetTypes.CLUSTER,
                    unixStartTime(60 * 6),
                    unixCurrentTime(),
                    stepConverter(5),
                    clusterName,
                    combinationMetrics(
                        ClusterMetricTypes.DISK_TOTAL,
                        ClusterMetricTypes.DISK_USAGE,
                        ClusterMetricTypes.DISK_UTIL
                    )
                );
                setChartValue("DISK");
                break;
            case 4:
                setOpen1(false);
                setOpen2(false);
                setOpen3(false);
                setOpen4(true);
                loadCoPod(
                    TargetTypes.CLUSTER,
                    unixStartTime(60 * 6),
                    unixCurrentTime(),
                    stepConverter(5),
                    clusterName,
                    combinationMetrics(
                        ClusterMetricTypes.POD_QUOTA,
                        ClusterMetricTypes.POD_RUNNING,
                        ClusterMetricTypes.POD_UTIL
                    )
                );
                setChartValue("POD");
                break;

            default:
                break;
        }
    };

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
                        {clusterName}
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

                <div className="tab1-panel-area">
                    <div className="tab1-button-area">
                        <COButtonCPU
                            isOn={open1}
                            onClick={() => changedState(1)}
                        />
                        <COButtonMemory
                            isOn={open2}
                            onClick={() => changedState(2)}
                        />
                        <COButtonDisk
                            isOn={open3}
                            onClick={() => changedState(3)}
                        />
                        <COButtonPod
                            isOn={open4}
                            onClick={() => changedState(4)}
                        />
                    </div>
                    <div className="tab1-chart-area">
                        <div className="tab-chart">
                            <COAreaChart chartValue={chartValue} />
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

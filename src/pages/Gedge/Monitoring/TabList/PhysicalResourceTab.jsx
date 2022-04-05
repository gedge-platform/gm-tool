import React, { useState, useEffect, PureComponent } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import { PanelBoxM } from "@/components/styles/PanelBoxM";
import { PrAreaChart } from "./MonitChart/PhysicalResourceChart";
import {
    CCreateButton,
    CSelectButton,
    CSelectButtonM,
    BtnCellRenderer,
} from "@/components/buttons";
import { observer } from "mobx-react";
import moment from "moment";
import monitoringStore from "../../../../store/Monitoring";
import {
    stepConverter,
    unixCurrentTime,
    unixStartTime,
    combinationMetrics,
    LastTimeList,
    IntervalList,
} from "../Utils/MetricsVariableFormatter";

import { ClusterMetricTypes, TargetTypes } from "../Utils/MetricsVariables";

const PsysicalResource = observer(() => {
    const [tabvalue, setTabvalue] = useState(0);
    const [open, setOpen] = useState(false);
    const handleTabChange = (event, newValue) => {
        setTabvalue(newValue);
    };

    const {
        clusterName,
        clusterNames,
        lastTime,
        interval,
        setLastTime,
        setInterval,
        setClusterName,
        loadAllMetrics,
    } = monitoringStore;

    const clusterNameActionList = clusterNames.map((item) => {
        return {
            name: item,
            onClick: () => {
                setClusterName(item);
                calledMetrics();
            },
        };
    });

    const lastTimeActionList = LastTimeList.map((item) => {
        return {
            name: item.name,
            onClick: () => {
                setLastTime(item);
                calledMetrics();
            },
        };
    });

    const intervalTimeActionList = IntervalList.map((item) => {
        return {
            name: item.name,
            onClick: () => {
                setInterval(item);
                calledMetrics();
            },
        };
    });

    const calledMetrics = () => {
        loadAllMetrics(
            TargetTypes.CLUSTER,
            unixCurrentTime(),
            combinationMetrics(ClusterMetricTypes.PHYSICAL_ALL)
        );
    };

    useEffect(() => {
        calledMetrics();
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
                style={{ height: "100%", margin: "5px 0 5px 0" }}
            >
                <div className="panelTitBar panelTitBar_clear">
                    <div className="tit" style={{ color: "white " }}>
                        <span style={{ marginRight: "10px", color: "white " }}>
                            Last :
                        </span>
                        <CSelectButtonM
                            className="none_transform"
                            items={lastTimeActionList}
                        >
                            {lastTime.name}
                        </CSelectButtonM>
                        <span
                            style={{
                                marginLeft: "10px",
                                marginRight: "10px",
                                color: "white ",
                            }}
                        >
                            Interval :
                        </span>
                        <CSelectButtonM
                            className="none_transform"
                            items={intervalTimeActionList}
                        >
                            {interval.name}
                        </CSelectButtonM>
                    </div>
                </div>
                <div className="tabN-chart-div-area">
                    <PanelBox className="panel_graph tabN-chart-area">
                        <div className="tab2-chart-area">
                            <div className="tab2-chart">
                                <PrAreaChart
                                    value={ClusterMetricTypes.CPU_UTIL}
                                />
                            </div>
                        </div>
                    </PanelBox>
                    <PanelBox className="panel_graph tabN-chart-area">
                        <div className="tab2-chart-area">
                            <div className="tab2-chart">
                                <PrAreaChart
                                    value={ClusterMetricTypes.MEMORY_UTIL}
                                />
                            </div>
                        </div>
                    </PanelBox>
                </div>
                <div className="tabN-chart-div-area">
                    <PanelBox className="panel_graph tabN-chart-area">
                        <div className="tab2-chart-area">
                            <div className="tab2-chart">
                                <PrAreaChart
                                    value={ClusterMetricTypes.CPU_USAGE}
                                />
                            </div>
                        </div>
                    </PanelBox>
                    <PanelBox className="panel_graph tabN-chart-area">
                        <div className="tab2-chart-area">
                            <div className="tab2-chart">
                                <PrAreaChart
                                    value={ClusterMetricTypes.MEMORY_USAGE}
                                />
                            </div>
                        </div>
                    </PanelBox>
                </div>
                <div className="tabN-chart-div-area">
                    <PanelBox className="panel_graph tabN-chart-area">
                        <div className="tab2-chart-area">
                            <div className="tab2-chart">
                                <PrAreaChart
                                    value={ClusterMetricTypes.CPU_TOTAL}
                                />
                            </div>
                        </div>
                    </PanelBox>
                    <PanelBox className="panel_graph tabN-chart-area">
                        <div className="tab2-chart-area">
                            <div className="tab2-chart">
                                <PrAreaChart
                                    value={ClusterMetricTypes.MEMORY_TOTAL}
                                />
                            </div>
                        </div>
                    </PanelBox>
                </div>
                <div className="tabN-chart-div-area">
                    <PanelBox className="panel_graph tabN-chart-area">
                        <div className="tab2-chart-area">
                            <div className="tab2-chart">
                                <PrAreaChart
                                    value={ClusterMetricTypes.DISK_UTIL}
                                />
                            </div>
                        </div>
                    </PanelBox>
                    <PanelBox className="panel_graph tabN-chart-area">
                        <div className="tab2-chart-area">
                            <div className="tab2-chart">
                                <PrAreaChart
                                    value={ClusterMetricTypes.POD_UTIL}
                                />
                            </div>
                        </div>
                    </PanelBox>
                </div>
                <div className="tabN-chart-div-area">
                    <PanelBox className="panel_graph tabN-chart-area">
                        <div className="tab2-chart-area">
                            <div className="tab2-chart">
                                <PrAreaChart
                                    value={ClusterMetricTypes.DISK_USAGE}
                                />
                            </div>
                        </div>
                    </PanelBox>
                    <PanelBox className="panel_graph tabN-chart-area">
                        <div className="tab2-chart-area">
                            <div className="tab2-chart">
                                <PrAreaChart
                                    value={ClusterMetricTypes.POD_RUNNING}
                                />
                            </div>
                        </div>
                    </PanelBox>
                </div>
                <div className="tabN-chart-div-area">
                    <PanelBox className="panel_graph tabN-chart-area">
                        <div className="tab2-chart-area">
                            <div className="tab2-chart">
                                <PrAreaChart
                                    value={ClusterMetricTypes.DISK_TOTAL}
                                />
                            </div>
                        </div>
                    </PanelBox>
                    <PanelBox className="panel_graph tabN-chart-area">
                        <div className="tab2-chart-area">
                            <div className="tab2-chart">
                                <PrAreaChart
                                    value={ClusterMetricTypes.POD_QUOTA}
                                />
                            </div>
                        </div>
                    </PanelBox>
                </div>
            </PanelBox>
        </PanelBoxM>
    );
});
export default PsysicalResource;
